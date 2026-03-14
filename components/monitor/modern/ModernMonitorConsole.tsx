"use client"

import { useState, useEffect, useRef } from "react"
import { ActiveRide } from "@/components/control-center/mock-data"
import { toast } from "sonner"
import dynamic from 'next/dynamic'
import { MapPin, Navigation } from "lucide-react"

// Key Sub-Components
import { MonitorHeader } from "./MonitorHeader"
import { VideoFeed } from "./VideoFeed"
import { AudioMonitor } from "./AudioMonitor"
import { RideInfoCard } from "./RideInfoCard"
import { SystemLogsCard } from "./SystemLogsCard"
import { ActionControls } from "./ActionControls"

interface MonitorConsoleProps {
    ride: ActiveRide
}

// Dynamic Map Import
const MapView = dynamic(() => import('../map-view'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="text-center space-y-2">
                <MapPin className="h-10 w-10 text-blue-500 mx-auto animate-bounce" />
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Locating Asset...</p>
            </div>
        </div>
    )
})

export function ModernMonitorConsole({ ride }: MonitorConsoleProps) {
    const center: [number, number] = [28.6139, 77.2090];

    const [currentStage, setCurrentStage] = useState(ride.stage)
    const [isConnected, setIsConnected] = useState(false)
    const [serverLogs, setServerLogs] = useState<string[]>([])

    // Refs for alert handling
    const alertSocketRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Layout Logic
    const showAudio = currentStage >= 1
    const showVideo = currentStage >= 2
    const showEmergency = currentStage >= 3

    // --- Alert System Logic ---
    useEffect(() => {
        const connectAlerts = () => {
            if (alertSocketRef.current?.readyState === WebSocket.OPEN) return;

            const ws = new WebSocket('ws://76.13.243.16:8000/ws')
            alertSocketRef.current = ws

            ws.onopen = () => {
                setIsConnected(true)
                setServerLogs(prev => [`[${new Date().toLocaleTimeString()}] Connected to Alert Server`, ...prev])
            }

            ws.onmessage = (event) => {
                try {
                    let data;
                    try {
                        data = JSON.parse(event.data);
                    } catch {
                        setServerLogs(prev => [`[${new Date().toLocaleTimeString()}] ${event.data}`, ...prev].slice(0, 50));
                        return;
                    }

                    if (data.message && typeof data.message === 'string') {
                        const stageMatch = data.message.match(/stage\s*(\d+)/i);
                        if (stageMatch && stageMatch[1]) {
                            const newStage = parseInt(stageMatch[1]);
                            setCurrentStage(newStage as any);
                            setServerLogs(prev => [`[${new Date().toLocaleTimeString()}] System: Escalated to Stage ${newStage}`, ...prev].slice(0, 50));
                        }
                    }

                    if (data.display) {
                        toast(data.title || "Alert System", { description: data.display });
                    }

                    const logMessage = data.display || data.message || JSON.stringify(data);
                    setServerLogs(prev => [`[${new Date().toLocaleTimeString()}] ${logMessage}`, ...prev].slice(0, 50));

                } catch (e) {
                    // console.error("Error processing alert:", e);
                }
            }

            ws.onerror = () => {
                setServerLogs(prev => [`[${new Date().toLocaleTimeString()}] Connection Failed - Retrying in 5s...`, ...prev])
            }

            ws.onclose = () => {
                setIsConnected(false)
                reconnectTimeoutRef.current = setTimeout(() => connectAlerts(), 5000)
            }
        }

        connectAlerts()

        return () => {
            if (alertSocketRef.current) {
                alertSocketRef.current.onclose = null
                alertSocketRef.current.close()
            }
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    // --- End Alert System Logic ---

    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">

            <MonitorHeader
                rideId={ride.id}
                currentStage={currentStage}
                isConnected={isConnected}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Left Column: Map & Media */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full min-h-0">

                    {/* Map View */}
                    <div className={`relative rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm ${showVideo ? "h-96 shrink-0" : "flex-1"}`}>
                        <MapView center={center} zoom={14} />
                        <div className="absolute top-6 left-6 ">
                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-lg">
                                <Navigation className="w-4 h-4 text-blue-500" />
                                <span>35 km/h • Heading N</span>
                            </div>
                        </div>
                    </div>

                    {showVideo ? <VideoFeed /> : <SystemLogsCard logs={serverLogs} />}

                </div>

                {/* Right Column: Info & Controls */}
                <div className="flex flex-col gap-6 h-full overflow-hidden">
                    <RideInfoCard ride={ride} />
                    {showAudio && (
                        <AudioMonitor />
                    )}

                    <ActionControls showEmergency={showEmergency} />
                </div>
                {showVideo && <SystemLogsCard logs={serverLogs} />}
            </div>
        </div>
    )
}

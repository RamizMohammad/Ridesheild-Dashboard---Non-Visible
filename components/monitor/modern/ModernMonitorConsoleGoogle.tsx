"use client"

import { useState, useEffect } from "react"
import { ActiveRide } from "@/components/control-center/mock-data"
import { toast } from "sonner"
import dynamic from 'next/dynamic'
import { MapPin, Navigation } from "lucide-react"
import { useMonitorStream } from "./useMonitorStream"

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
const MapView = dynamic(() => import('../GoogleMapView'), {
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

export function ModernMonitorConsoleGoogle({ ride }: MonitorConsoleProps) {
    const center: [number, number] = [28.6139, 77.2090];

    // Use custom hook for stream and socket logic
    const {
        currentStage,
        isConnected,
        serverLogs,
        showAudio,
        showVideo,
        showEmergency
    } = useMonitorStream(ride.stage)

    // --- Driver Location Polling ---
    const [driverLocation, setDriverLocation] = useState<{ lat: number, lng: number } | undefined>(undefined)

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch(`/api/rides/${ride.id}/location`)
                if (res.ok) {
                    const data = await res.json()
                    if (data.lat && data.lng) {
                        setDriverLocation({ lat: data.lat, lng: data.lng })
                    }
                }
            } catch (e) {
                console.error("Failed to fetch driver location", e)
            }
        }

        fetchLocation() // Initial fetch
        // const interval = setInterval(fetchLocation, 5000) // Poll every 5s

        // return () => clearInterval(interval)
    }, [ride.id])

    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">

            <MonitorHeader
                rideId={ride.id}
                currentStage={currentStage}
                isConnected={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Left Column: Map & Media */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full min-h-0">

                    {/* Map View */}
                    <div className={`relative rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm ${showVideo ? "h-96 shrink-0" : "flex-1"}`}>
                        <MapView
                            center={center}
                            zoom={14}
                            pickup={ride.pickupCoords}
                            dropoff={ride.dropoffCoords}
                            driverLocation={driverLocation}
                        />
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

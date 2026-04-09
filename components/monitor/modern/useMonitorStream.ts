"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"

export function useMonitorStream(initialStage: 0 | 1 | 2 | 3) {
    const [currentStage, setCurrentStage] = useState(initialStage)
    const [isConnected, setIsConnected] = useState(false)
    const [serverLogs, setServerLogs] = useState<string[]>([])

    // Refs for alert handling
    const alertSocketRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

    return {
        currentStage,
        isConnected,
        serverLogs,
        showAudio: currentStage >= 1,
        showVideo: currentStage >= 2,
        showEmergency: currentStage >= 3
    }
}

"use client"

import { ModernMonitorConsoleGoogle } from "@/components/monitor/modern/ModernMonitorConsoleGoogle"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import type { ActiveRide } from "@/components/control-center/mock-data"

export default function MonitorPage() {
    const params = useParams()
    const rideId = params.rideId as string
    const [ride, setRide] = useState<ActiveRide | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!rideId) return

        const fetchRide = async () => {
            try {
                const res = await fetch(`/api/rides/${rideId}`)
                if (!res.ok) {
                    setError(true)
                } else {
                    const data = await res.json()
                    setRide(data)
                }
            } catch (e) {
                console.error("Failed to fetch ride", e)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchRide()
    }, [rideId])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950/50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (error || !ride) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] gap-4">
                <h1 className="text-2xl font-bold">Ride Not Found</h1>
                <p className="text-muted-foreground">ID: {rideId}</p>
                <a href="/dashboard/control-center" className="text-primary hover:underline">Return to Control Center</a>
            </div>
        )
    }

    return (
        <div className="p-6  overflow-hidden bg-slate-50 dark:bg-slate-950/50">
            <ModernMonitorConsoleGoogle ride={ride} />
        </div>
    )
}

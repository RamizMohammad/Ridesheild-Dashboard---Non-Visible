"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ModernHistoryHeader } from "./ModernHistoryHeader"
import { ModernHistoryFilters } from "./ModernHistoryFilters"
import { ModernHistoryTable, Ride } from "./ModernHistoryTable"

export function ModernHistoryLayout() {
    const [rides, setRides] = useState<Ride[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("/api/rides/history")
                if (res.ok) {
                    const data = await res.json()
                    setRides(data)
                }
            } catch (error) {
                console.error("Failed to fetch history:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    return (
        <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500 pb-20">
            <ModernHistoryHeader rides={rides} />
            <div className="flex flex-col gap-6">
                <ModernHistoryFilters />
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : (
                    <ModernHistoryTable data={rides} />
                )}
            </div>
        </div>
    )
}

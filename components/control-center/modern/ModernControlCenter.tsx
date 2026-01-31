"use client"

import { useState } from "react"
import { Zap } from "lucide-react"

import { ModernActiveRidesTable } from "./ModernActiveRidesTable"
import { ModernStageFilters } from "./ModernStageFilters"
import { ModernActivityStream } from "./ModernActivityStream"
import { mockActiveRides, mockSystemLogs } from "@/components/control-center/mock-data"

export function ModernControlCenter() {
    const [activeFilter, setActiveFilter] = useState("all")

    // Filter Logic
    const filteredRides = mockActiveRides.filter((ride) => {
        if (activeFilter === "all") return true
        if (activeFilter === "emergency") return ride.status === "Emergency"
        return ride.stage.toString() === activeFilter
    })

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Header Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Control Center</h1>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest mono">System Nominal</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold mono">{filteredRides.length} ACTIVE SESSIONS</span>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {/* Main Content: Filters & Table */}
                <div className="lg:col-span-3 space-y-6">
                    <ModernStageFilters currentFilter={activeFilter} onFilterChange={setActiveFilter} />
                    <ModernActiveRidesTable data={filteredRides} />
                </div>

                {/* Side Panel: Stream */}
                <div className="lg:col-span-1 space-y-6">
                    <ModernActivityStream logs={mockSystemLogs} />
                </div>
            </div>
        </div>
    )
}

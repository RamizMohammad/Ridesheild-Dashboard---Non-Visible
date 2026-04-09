"use client"

import { Siren, AlertTriangle, ShieldAlert } from "lucide-react"

export function ModernEmergencyHeader() {
    return (
        <div className="relative overflow-hidden glass rounded-[2rem] border border-red-500/20 p-8 flex items-center justify-between">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-10 animate-pulse" />

            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-lg shadow-red-600/30 text-white animate-pulse">
                    <Siren className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        Emergency Response Log
                        <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                            Live Feed
                        </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        Critical incidents requiring immediate intervention.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Placeholder for future global controls */}
            </div>
        </div>
    )
}

"use client"

import { Activity, Clock, AlertTriangle, CheckCircle2 } from "lucide-react"

export function ModernEmergencyStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Active SOS */}
            <div className="glass p-6 rounded-[2rem] border border-red-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-50 text-red-500/20 group-hover:scale-110 transition-transform duration-500">
                    <AlertTriangle className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active SOS</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-bold text-red-600 dark:text-red-500">3</span>
                        <span className="text-xs font-bold text-red-400 animate-pulse">CRITICAL</span>
                    </div>
                </div>
            </div>

            {/* Avg Response Time */}
            <div className="glass p-6 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Avg Response</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">1m 42s</span>
                        <span className="text-xs font-bold text-green-500">-12s vs avg</span>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 text-blue-500">
                    <Clock className="w-8 h-8 opacity-50" />
                </div>
            </div>

            {/* Resolved Today */}
            <div className="glass p-6 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Resolved Today</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">12</span>
                        <span className="text-xs font-bold text-green-500">100% Rate</span>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 text-green-500">
                    <CheckCircle2 className="w-8 h-8 opacity-50" />
                </div>
            </div>

            {/* Total Events */}
            <div className="glass p-6 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Events</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">45</span>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 text-orange-500">
                    <Activity className="w-8 h-8 opacity-50" />
                </div>
            </div>

        </div>
    )
}

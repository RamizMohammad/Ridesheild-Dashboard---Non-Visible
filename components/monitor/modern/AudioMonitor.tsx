"use client"

import { Mic } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface AudioMonitorProps {
    enabled: boolean
    onToggle: (checked: boolean) => void
}

export function AudioMonitor({ enabled, onToggle }: AudioMonitorProps) {
    return (
        <div className="glass p-4 rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-4 shrink-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${enabled ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                <Mic className={`w-6 h-6 ${enabled ? "animate-pulse" : ""}`} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Cabin Audio</span>
                    <span className="text-xs font-mono text-slate-500">-42dB</span>
                </div>
                {/* Visualizer */}
                <div className="flex items-end gap-1 h-8">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-t-sm transition-all duration-75 ${enabled ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"}`}
                            style={{
                                height: enabled ? `${Math.random() * 100}%` : '10%',
                                opacity: enabled ? 1 : 0.5
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-slate-500">{enabled ? "ON" : "OFF"}</span>
                <Switch checked={enabled} onCheckedChange={onToggle} />
            </div>
        </div>
    )
}

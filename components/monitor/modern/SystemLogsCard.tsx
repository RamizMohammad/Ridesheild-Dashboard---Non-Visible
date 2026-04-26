"use client"

import { Activity } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SystemLogsCardProps {
    logs: string[]
}

export function SystemLogsCard({ logs }: SystemLogsCardProps) {
    return (
        <div className="glass rounded-[2rem] border border-black/5 dark:border-white/5 flex flex-col flex-1 min-h-[200px] overflow-hidden relative">
            <div className="p-6 pb-2 shrink-0">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4" /> System Logs
                </h3>
            </div>

            <div className="flex-1 relative w-full h-full">
                <div className="absolute inset-0 overflow-y-auto p-6 pt-2">
                    <div className="space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="text-xs font-mono p-2 rounded-lg bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 break-words border-l-2 border-blue-500/50">
                                {log}
                            </div>
                        ))}
                        {logs.length === 0 && (
                            <div className="text-center py-10 text-slate-400 text-xs italic">
                                Waiting for system events...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


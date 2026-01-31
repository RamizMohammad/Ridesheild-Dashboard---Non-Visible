"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AlertCircle, Mic, Video, ShieldAlert, CheckCircle2, Activity } from "lucide-react"
import { SystemLog } from "../mock-data"

interface ActivityStreamProps {
    logs: SystemLog[]
}

export function ModernActivityStream({ logs }: ActivityStreamProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case "dispatch": return <ShieldAlert className="h-4 w-4 text-red-500" />
            case "video": return <Video className="h-4 w-4 text-orange-500" />
            case "audio": return <Mic className="h-4 w-4 text-yellow-500" />
            case "cooldown": return <CheckCircle2 className="h-4 w-4 text-green-500" />
            default: return <AlertCircle className="h-4 w-4 text-blue-500" />
        }
    }

    return (
        <div className="glass rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col ">
            <div className="p-6 border-b border-black/5 dark:border-white/5 bg-black/1 dark:bg-white/2">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Live Activity Stream
                </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="mt-1 p-2 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5">
                                {getIcon(log.type)}
                            </div>
                            <div className="space-y-1 flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] mono font-bold text-slate-400 uppercase tracking-widest">{log.timestamp}</span>
                                    <Link href={`/dashboard/monitor/${log.rideId}`}>
                                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                                            {log.rideId}
                                        </span>
                                    </Link>
                                </div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">{log.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

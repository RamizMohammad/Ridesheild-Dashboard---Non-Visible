"use client"

import Link from "next/link"
import { ArrowLeft, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MonitorHeaderProps {
    rideId: string
    currentStage: number
    isConnected: boolean
}

export function MonitorHeader({ rideId, currentStage, isConnected }: MonitorHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link href="/dashboard/control-center">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-black/5 dark:hover:bg-white/5">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            MONITOR <span className="text-blue-600 font-mono">#{rideId}</span>
                        </h1>
                        <div className={`
              px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border
              ${currentStage === 3 ? "bg-red-500/10 text-red-600 border-red-500/20" :
                                currentStage === 2 ? "bg-orange-500/10 text-orange-600 border-orange-500/20" :
                                    currentStage === 1 ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" :
                                        "bg-green-500/10 text-green-600 border-green-500/20"}
            `}>
                            Stage {currentStage}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {isConnected ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                        <Wifi className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Online</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
                        <WifiOff className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Disconnected</span>
                    </div>
                )}
            </div>
        </div>
    )
}

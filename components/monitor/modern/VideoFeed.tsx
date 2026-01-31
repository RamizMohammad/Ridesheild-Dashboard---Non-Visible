"use client"

import { Video, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoFeed() {
    return (
        <div className="relative flex-1 bg-black rounded-[2rem] border border-black/10 overflow-hidden group  shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse" />
                        <Video className="h-16 w-16 text-white/50 relative z-10" />
                    </div>
                    <p className="text-white/50 text-sm font-mono tracking-widest">ENCRYPTED FEED ACTIVE</p>
                </div>
            </div>

            <div className="absolute top-6 right-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-lg text-white text-xs font-bold animate-pulse shadow-lg shadow-red-600/20">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    LIVE
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex justify-between items-end">
                <div className="text-white/80 font-mono text-xs">
                    CAM-01 • <span className="text-white font-bold">{new Date().toLocaleTimeString()}</span>
                </div>
                <Button size="icon" variant="secondary" className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md">
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

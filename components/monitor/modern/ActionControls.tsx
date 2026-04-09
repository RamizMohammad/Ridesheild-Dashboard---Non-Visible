"use client"

import { Phone, Volume2, ShieldAlert, Siren } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionControlsProps {
    showEmergency: boolean
}

export function ActionControls({ showEmergency }: ActionControlsProps) {
    if (showEmergency) {
        return (
            <div className="p-6 rounded-[2rem] bg-red-500 text-white shadow-xl shadow-red-500/20 shrink-0">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Siren className="w-4 h-4" /> Emergency Response
                </h3>
                <div className="space-y-3">
                    <Button className="w-full bg-white text-red-600 hover:bg-white/90 font-bold h-12 shadow-lg border-0" size="lg">
                        <ShieldAlert className="mr-2 h-5 w-5" /> DISPATCH TEAM
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white border-2 bg-transparent">
                            <Phone className="mr-2 h-4 w-4" /> Driver
                        </Button>
                        <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white border-2 bg-transparent">
                            <Phone className="mr-2 h-4 w-4" /> Rider
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="glass p-6 rounded-[2rem] border border-black/5 dark:border-white/5 shrink-0">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Actions
            </h3>
            <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start font-bold h-12 border-2 hover:bg-black/5 dark:hover:bg-white/5">
                    <Phone className="mr-2 h-4 w-4" /> Call Driver
                </Button>
                <Button variant="outline" className="w-full justify-start font-bold h-12 border-2 hover:bg-black/5 dark:hover:bg-white/5">
                    <Volume2 className="mr-2 h-4 w-4" /> Broadcast
                </Button>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold h-12 shadow-lg shadow-red-500/20">
                    <ShieldAlert className="mr-2 h-4 w-4" /> Escalate Stage
                </Button>
            </div>
        </div>
    )
}

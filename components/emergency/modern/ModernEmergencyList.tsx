"use client"

import { AlertTriangle, MapPin, Phone, Video, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const incidents = [
    {
        id: "INC-9921",
        type: "SOS Triggered",
        location: "Connaught Place, Inner Circle",
        time: "2 mins ago",
        status: "Active",
        severity: "critical",
        driver: "Suresh Thakur",
        user: "Ravi Kumar",
    },
    {
        id: "INC-3822",
        type: "Video Anomaly",
        location: "Noida Sector 18",
        time: "15 mins ago",
        status: "Investigating",
        severity: "high",
        driver: "Rajesh Mishra",
        user: "Priya Sharma",
    },
    {
        id: "INC-7731",
        type: "Audio Threshold",
        location: "Hauz Khas Village",
        time: "45 mins ago",
        status: "Resolved",
        severity: "medium",
        driver: "Vikram Singh",
        user: "Amit Verma",
    }
]

export function ModernEmergencyList() {
    return (
        <div className="glass rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden">
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Recent Incidents
                </h3>
                <Button variant="outline" size="sm">View All History</Button>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5">
                {incidents.map((incident) => (
                    <div key={incident.id} className="p-6 hover:bg-black/2 dark:hover:bg-white/5 transition-colors group">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                            {/* Icon & ID */}
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${incident.severity === 'critical' ? "bg-red-500/10 text-red-600" :
                                        incident.severity === 'high' ? "bg-orange-500/10 text-orange-600" :
                                            "bg-yellow-500/10 text-yellow-600"
                                    }`}>
                                    {incident.severity === 'critical' ? <AlertTriangle className="w-6 h-6 animate-pulse" /> :
                                        incident.severity === 'high' ? <Video className="w-6 h-6" /> :
                                            <Phone className="w-6 h-6" />}
                                </div>
                                <div>
                                    <p className="font-mono text-xs font-bold text-slate-400">{incident.id}</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{incident.type}</p>
                                </div>
                            </div>

                            {/* Location & Time */}
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {incident.location}
                                </div>
                                <p className="text-xs text-slate-400 pl-6">{incident.time} • Driver: {incident.driver}</p>
                            </div>

                            {/* Status & Actions */}
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className={`
                        ${incident.status === 'Active' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                        incident.status === 'Resolved' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                            "bg-blue-500/10 text-blue-500 border-blue-500/20"}
                    `}>
                                    {incident.status}
                                </Badge>

                                <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                    Details <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

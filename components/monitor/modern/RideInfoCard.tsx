"use client"

import { Car, Activity, MapPin, Circle, Square } from "lucide-react"
import { ActiveRide } from "@/components/control-center/mock-data"

interface RideInfoCardProps {
    ride: ActiveRide
}

export function RideInfoCard({ ride }: RideInfoCardProps) {
    return (
        <div className="glass p-6 rounded-[2rem] border border-black/5 dark:border-white/5 shrink-0">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Car className="w-4 h-4" /> Details
            </h3>
            <div className="space-y-3">
                {/* Driver Info */}
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                            <Car className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-500">Driver</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{ride.driverName || ride.driverMasked}</p>
                            {ride.driverEmail && <p className="text-[10px] text-slate-400 truncate" title={ride.driverEmail}>{ride.driverEmail}</p>}
                        </div>
                    </div>
                </div>

                {/* Passenger Info */}
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Activity className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-500">Passenger</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{ride.userName || ride.userMasked}</p>
                            {ride.userEmail && <p className="text-[10px] text-slate-400 truncate" title={ride.userEmail}>{ride.userEmail}</p>}
                        </div>
                    </div>
                </div>

                <div className="h-px bg-black/5 dark:bg-white/5 my-2" />

                {/* Route Timeline */}
                <div className="px-1 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[8.5px] top-2 bottom-8 w-0.5 bg-black/5 dark:bg-white/5" />

                    <div className="space-y-4">
                        {/* Pickup */}
                        <div className="flex gap-3 relative">
                            <Circle className="w-3 h-3 text-green-500 fill-green-500 shrink-0 mt-0.5 bg-white dark:bg-slate-900 z-10" />
                            <div className="min-w-0">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    Pickup • <span className="text-slate-500 dark:text-slate-300">{ride.startTime}</span>
                                </p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{ride.pickup}</p>
                            </div>
                        </div>

                        {/* Current Location (if moving) or just spacing */}

                        {/* Dropoff */}
                        <div className="flex gap-3 relative">
                            <Square className="w-3 h-3 text-red-500 fill-red-500 shrink-0 mt-0.5 bg-white dark:bg-slate-900 z-10" />
                            <div className="min-w-0">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    Dropoff • <span className="text-slate-500 dark:text-slate-300">{ride.endTime}</span>
                                </p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{ride.dropoff}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-black/5 dark:bg-white/5 my-2" />

                {/* Status Footer */}
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{ride.stage > 0 ? "En Route" : "Waiting"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{ride.lastEvent}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

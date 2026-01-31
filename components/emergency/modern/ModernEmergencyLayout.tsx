"use client"

import { ModernEmergencyHeader } from "./ModernEmergencyHeader"
import { ModernEmergencyStats } from "./ModernEmergencyStats"
import { ModernEmergencyList } from "./ModernEmergencyList"

export function ModernEmergencyLayout() {
    return (
        <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-500 pb-20">
            <ModernEmergencyHeader />
            <ModernEmergencyStats />
            <ModernEmergencyList />
        </div>
    )
}

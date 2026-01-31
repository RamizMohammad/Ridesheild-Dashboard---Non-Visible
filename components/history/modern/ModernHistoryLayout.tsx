"use client"

import { ModernHistoryHeader } from "./ModernHistoryHeader"
import { ModernHistoryFilters } from "./ModernHistoryFilters"
import { ModernHistoryTable } from "./ModernHistoryTable"

export function ModernHistoryLayout() {
    return (
        <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500 pb-20">
            <ModernHistoryHeader />
            <div className="flex flex-col gap-6">
                <ModernHistoryFilters />
                <ModernHistoryTable />
            </div>
        </div>
    )
}

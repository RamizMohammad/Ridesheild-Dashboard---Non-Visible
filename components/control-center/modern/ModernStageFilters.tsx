"use client"

import { Button } from "@/components/ui/button"

interface StageFiltersProps {
    currentFilter: string
    onFilterChange: (filter: string) => void
}

export function ModernStageFilters({ currentFilter, onFilterChange }: StageFiltersProps) {
    const filters = [
        { id: "all", label: "All Active", color: "text-slate-600 dark:text-slate-400" },
        { id: "0", label: "Stage 0", color: "text-green-600 dark:text-green-400" },
        { id: "1", label: "Stage 1", color: "text-yellow-600 dark:text-yellow-400" },
        { id: "2", label: "Stage 2", color: "text-orange-600 dark:text-orange-400" },
        { id: "3", label: "Stage 3", color: "text-red-600 dark:text-red-400" },
        { id: "emergency", label: "Emergency", color: "text-red-500 animate-pulse font-bold" },
    ]

    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
                const isActive = currentFilter === filter.id;
                return (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`
              px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border
              ${isActive
                                ? "bg-white dark:bg-white/10 border-black/5 dark:border-white/10 shadow-sm scale-105"
                                : "bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5 opacity-60 hover:opacity-100"}
              ${filter.color}
            `}
                    >
                        {filter.label}
                    </button>
                )
            })}
        </div>
    )
}


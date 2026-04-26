"use client"

import * as React from "react"
import { CalendarIcon, SlidersHorizontal, RefreshCw, Search } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function ModernHistoryFilters() {
    const [isOpen, setIsOpen] = React.useState(true)
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="glass-bright rounded-2xl border border-black/5 dark:border-white/6 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/4 dark:border-white/4">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <h3 className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tracking-tight">Filter & Search</h3>
                </div>

                <CollapsibleTrigger asChild>
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-black/4 dark:hover:bg-white/4">
                        <span>{isOpen ? 'Collapse' : 'Expand'}</span>
                        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Date Range */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date Range</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-medium text-[13px] rounded-xl h-10 bg-white/50 dark:bg-white/4 border-black/8 dark:border-white/8 hover:border-blue-500/40 transition-colors",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-xl border-white/10 bg-[oklch(0.135_0.018_264)]" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Ride ID Search */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Ride ID</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                placeholder="e.g. RIDE-9921"
                                className="pl-9 h-10 rounded-xl text-[13px] bg-white/50 dark:bg-white/4 border-black/8 dark:border-white/8 focus-visible:border-blue-500/50 focus-visible:ring-0 transition-colors font-medium"
                            />
                        </div>
                    </div>

                    {/* Stage Filter */}
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Max Stage</label>
                        <Select>
                            <SelectTrigger className="h-10 rounded-xl text-[13px] bg-white/50 dark:bg-white/4 border-black/8 dark:border-white/8 focus:ring-0">
                                <SelectValue placeholder="All Stages" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-[oklch(0.135_0.018_264)] border-white/10">
                                <SelectItem value="all">All Stages</SelectItem>
                                <SelectItem value="0">
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" />Normal</div>
                                </SelectItem>
                                <SelectItem value="1">
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" />Monitored</div>
                                </SelectItem>
                                <SelectItem value="2">
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500" />Video Active</div>
                                </SelectItem>
                                <SelectItem value="3">
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" />Emergency</div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Actions */}
                    <div className="flex items-end gap-2">
                        <button
                            className="flex-1 h-10 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                                boxShadow: '0 0 20px rgba(37,99,235,0.3)',
                            }}
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={() => setDate(undefined)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/50 dark:bg-white/4 border border-black/8 dark:border-white/8 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-white/20 transition-all"
                        >
                            <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                    </div>

                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

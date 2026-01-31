"use client"

import * as React from "react"
import { CalendarIcon, Filter, X, SlidersHorizontal, RefreshCw } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

export function ModernHistoryFilters() {
    const [isOpen, setIsOpen] = React.useState(true)
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 w-full glass rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden"
        >
            <div className="flex items-center justify-between p-4 px-6 bg-black/5 dark:bg-white/5">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Filter Data</h3>
                </div>

                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
                        <Filter className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <div className="p-6 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Date Range */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date Range</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 rounded-xl h-11",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Ride ID */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Ride ID</label>
                        <Input
                            placeholder="e.g. RIDE-9921"
                            className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 rounded-xl h-11"
                        />
                    </div>

                    {/* Stage Filter */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Max Stage</label>
                        <Select>
                            <SelectTrigger className="bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 rounded-xl h-11">
                                <SelectValue placeholder="All Stages" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Stages</SelectItem>
                                <SelectItem value="0">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" /> Normal
                                    </div>
                                </SelectItem>
                                <SelectItem value="1">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500" /> Monitored
                                    </div>
                                </SelectItem>
                                <SelectItem value="2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-500" /> Video Active
                                    </div>
                                </SelectItem>
                                <SelectItem value="3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500" /> Emergency
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-end gap-2">
                        <Button className="flex-1 rounded-xl h-11 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold">
                            Apply Filters
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl shrink-0" onClick={() => setDate(undefined)}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

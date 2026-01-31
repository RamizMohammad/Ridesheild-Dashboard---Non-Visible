"use client"

import * as React from "react"
import Link from "next/link"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Car, Activity, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { RideDetailSheet } from "@/components/history/ride-detail-sheet"

// Define the Ride type
export type Ride = {
    id: string
    userMasked: string
    driverMasked: string
    userName?: string
    userEmail?: string
    driverName?: string
    driverEmail?: string
    stage: 0 | 1 | 2 | 3
    duration: string
    alertSent: boolean
    completedAt: string
    location: string
    startTime: string
    endTime: string
    timeline?: { stage: number; time: string; label: string; description: string }[]
    logs?: string[]
}

// Mock Data
const data: Ride[] = [
    {
        id: "RIDE-9382",
        userMasked: "Rohan D.",
        driverMasked: "Amit S.",
        userName: "Rohan Das",
        userEmail: "rohan.das@gmail.com",
        driverName: "Amit Singh",
        driverEmail: "amit.singh@uber.com",
        stage: 0,
        duration: "24m",
        alertSent: false,
        completedAt: "2024-04-20 10:30 AM",
        location: "Connaught Place",
        startTime: "10:06 AM",
        endTime: "10:30 AM",
        timeline: [
            { stage: 0, time: "10:06 AM", label: "Ride Started", description: "Normal ride start at CP Inner Circle." },
            { stage: 0, time: "10:30 AM", label: "Ride Completed", description: "Arrived at destination safely." }
        ],
        logs: ["Ride request accepted", "Driver arrived", "Trip started", "Payment processed"]
    },
    {
        id: "RIDE-2931",
        userMasked: "Kavita S.",
        driverMasked: "Rajesh K.",
        userName: "Kavita Sharma",
        userEmail: "kavita.sharma@outlook.com",
        driverName: "Rajesh Kumar",
        driverEmail: "rajesh.k@ola.in",
        stage: 2,
        duration: "45m",
        alertSent: true,
        completedAt: "2024-04-20 11:15 AM",
        location: "Dwarka Sector 21",
        startTime: "10:30 AM",
        endTime: "11:15 AM",
        timeline: [
            { stage: 0, time: "10:30 AM", label: "Ride Started", description: "Pickup confirmed." },
            { stage: 1, time: "10:45 AM", label: "Audio Anomaly", description: "Elevated voice volume detected." },
            { stage: 2, time: "10:46 AM", label: "Video Activated", description: "System activated camera due to sustained noise." },
            { stage: 0, time: "11:15 AM", label: "Ride Completed", description: "Issue resolved, passenger dropped off." }
        ],
        logs: ["Audio threshold exceeded (85dB)", "Video stream request sent", "Operator alert triggered"]
    },
    {
        id: "RIDE-4421",
        userMasked: "Ankit M.",
        driverMasked: "Suresh Y.",
        userName: "Ankit Mehta",
        userEmail: "ankit.mehta@tech.in",
        driverName: "Suresh Yadav",
        driverEmail: "suresh.y@drive.in",
        stage: 3,
        duration: "12m",
        alertSent: true,
        completedAt: "2024-04-20 01:45 PM",
        location: "Lodi Gardens",
        startTime: "01:33 PM",
        endTime: "01:45 PM",
        timeline: [
            { stage: 0, time: "01:33 PM", label: "Ride Started", description: "Pickup confirmed." },
            { stage: 3, time: "01:40 PM", label: "Emergency Trigger", description: "SOS button pressed by passenger." },
            { stage: 3, time: "01:45 PM", label: "Police Dispatched", description: "Local authorities notified." }
        ],
        logs: ["SOS signal received", "Location tracking high-frequency mode enabled", "Emergency contact notified"]
    },
    {
        id: "RIDE-1029",
        userMasked: "Meera R.",
        driverMasked: "Vikram C.",
        userName: "Meera Rao",
        userEmail: "meera.rao@gmail.com",
        driverName: "Vikram Chopra",
        driverEmail: "vikram.c@uber.com",
        stage: 1,
        duration: "18m",
        alertSent: false,
        completedAt: "2024-04-20 12:00 PM",
        location: "IGIA T3",
        startTime: "11:42 AM",
        endTime: "12:00 PM",
        timeline: [
            { stage: 0, time: "11:42 AM", label: "Ride Started", description: "Pickup confirmed." },
            { stage: 1, time: "11:50 AM", label: "Route Deviation", description: "Driver took unexpected turn." },
            { stage: 0, time: "12:00 PM", label: "Ride Completed", description: "Arrived at terminal." }
        ],
        logs: ["GPS deviation > 500m", "Route recalculation"]
    },
    {
        id: "RIDE-5532",
        userMasked: "Vikram J.",
        driverMasked: "Dinesh P.",
        userName: "Vikram Jain",
        userEmail: "vikram.j@yahoo.com",
        driverName: "Dinesh Patel",
        driverEmail: "dinesh.p@ola.in",
        stage: 0,
        duration: "32m",
        alertSent: false,
        completedAt: "2024-04-20 02:30 PM",
        location: "South Ex II",
        startTime: "01:58 PM",
        endTime: "02:30 PM",
        timeline: [
            { stage: 0, time: "01:58 PM", label: "Ride Started", description: "Normal start." },
            { stage: 0, time: "02:30 PM", label: "Ride Completed", description: "Standard dropoff." }
        ],
        logs: ["Normal operation"]
    },
]

export function ModernHistoryTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // Sheet State
    const [selectedRide, setSelectedRide] = React.useState<Ride | null>(null)
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)

    const openRideDetails = (ride: Ride) => {
        setSelectedRide(ride)
        setIsSheetOpen(true)
    }

    const columns: ColumnDef<Ride>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Ride ID",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Car className="w-4 h-4" />
                    </div>
                    <Link href={`/dashboard/monitor/${row.getValue("id")}`} className="font-bold font-mono text-slate-700 dark:text-slate-200 hover:text-blue-500 hover:underline transition-colors">
                        {row.getValue("id")}
                    </Link>
                </div>
            ),
        },
        {
            accessorKey: "userMasked",
            header: "User",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{row.getValue("userMasked")}</span>
                    <span className="text-xs text-slate-400">Rate: 4.8</span>
                </div>
            ),
        },
        {
            accessorKey: "driverMasked",
            header: "Driver",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{row.getValue("driverMasked")}</span>
                    <span className="text-xs text-slate-400">420 Rides</span>
                </div>
            ),
        },
        {
            accessorKey: "stage",
            header: "Status",
            cell: ({ row }) => {
                const stage = row.getValue("stage") as number
                return (
                    <Badge
                        variant="outline"
                        className={
                            stage === 3 ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                stage === 2 ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                    stage === 1 ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                        "bg-green-500/10 text-green-500 border-green-500/20"
                        }
                    >
                        {stage === 3 ? "Emergency" : stage === 2 ? "Video Active" : stage === 1 ? "Monitored" : "Completed"}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "duration",
            header: "Duration",
            cell: ({ row }) => <span className="font-mono text-slate-500">{row.getValue("duration")}</span>,
        },
        {
            accessorKey: "completedAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="hover:bg-transparent pl-0 text-slate-500 font-bold"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Completed At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <span className="text-xs font-mono text-slate-500">{row.getValue("completedAt")}</span>,
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const ride = row.original
                return (
                    <Button variant="ghost" size="sm" onClick={() => openRideDetails(ride)} className="hover:bg-blue-500/10 hover:text-blue-600">
                        <Eye className="mr-2 h-4 w-4" />
                        Details
                    </Button>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full space-y-4">
            <div className="rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden glass">
                <Table>
                    <TableHeader className="bg-black/5 dark:bg-white/5">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b border-black/5 dark:border-white/5 hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-12 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-black/5 dark:border-white/5 hover:bg-black/2 dark:hover:bg-white/2 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-slate-500 italic"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground pl-2">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-xl"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-xl"
                    >
                        Next
                    </Button>
                </div>
            </div>

            <RideDetailSheet
                ride={selectedRide}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />
        </div>
    )
}

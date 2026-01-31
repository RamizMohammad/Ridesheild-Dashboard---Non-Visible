"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Eye, MapPin, AlertTriangle, ShieldCheck, Video, Activity } from "lucide-react"
import Link from "next/link"

import { ActiveRide } from "@/components/control-center/mock-data"

interface ActiveRidesTableProps {
    data: ActiveRide[]
}

export function ModernActiveRidesTable({ data }: ActiveRidesTableProps) {
    const columns: ColumnDef<ActiveRide>[] = [
        {
            accessorKey: "id",
            header: "Ride Identity",
            cell: ({ row }) => <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{row.getValue("id")}</span>,
        },
        {
            accessorKey: "userMasked",
            header: "User",
            cell: ({ row }) => <span className="text-slate-500 text-xs font-mono">{row.getValue("userMasked")}</span>,
        },
        {
            accessorKey: "driverMasked",
            header: "Driver",
            cell: ({ row }) => <span className="text-slate-500 text-xs font-mono">{row.getValue("driverMasked")}</span>,
        },
        {
            accessorKey: "stage",
            header: "Stage",
            cell: ({ row }) => {
                const stage = row.getValue("stage") as number
                return (
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stage === 3 ? "bg-red-500 animate-pulse" :
                            stage === 2 ? "bg-orange-500" :
                                stage === 1 ? "bg-yellow-500" :
                                    "bg-green-500"
                            }`} />
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Stage {stage}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 py-2">
                    <MapPin className="h-3 w-3 text-blue-500" />
                    {row.getValue("location")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <div className="flex items-center gap-2">
                        {status === "Emergency" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                        {status === "Monitoring" && <Video className="h-3 w-3 text-orange-500" />}
                        {status === "Normal" && <ShieldCheck className="h-3 w-3 text-green-500" />}
                        <span className={`text-xs font-bold uppercase tracking-wider ${status === "Emergency" ? "text-red-600" :
                            status === "Monitoring" ? "text-orange-600" :
                                "text-green-600 dark:text-green-400"
                            }`}>{status}</span>
                    </div>
                )
            }
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const ride = row.original
                const isMonitorable = ride.stage >= 1
                return (
                    <Link href={`/dashboard/monitor/${ride.id}`}>
                        <button className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
              ${isMonitorable
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-95"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"}
            `}>
                            <Eye className="w-3 h-3" />
                            {isMonitorable ? "MONITOR" : "VIEW"}
                        </button>
                    </Link>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="glass rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-black/1 dark:bg-white/2 border-b border-black/5 dark:border-white/5">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mono">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-black/2 dark:hover:bg-white/3 transition-colors group">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 italic">
                                    No active rides found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Eye, MapPin, AlertTriangle, ShieldCheck, Video, ArrowRight } from "lucide-react"
import Link from "next/link"

import { ActiveRide } from "@/components/control-center/mock-data"

interface ActiveRidesTableProps {
    data: ActiveRide[]
}

const stageConfig = [
    { label: 'Normal', color: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    { label: 'Monitoring', color: '#f59e0b', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    { label: 'Video', color: '#f97316', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    { label: 'SOS', color: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
];

export function ModernActiveRidesTable({ data }: ActiveRidesTableProps) {
    const columns: ColumnDef<ActiveRide>[] = [
        {
            accessorKey: "id",
            header: "Ride ID",
            cell: ({ row }) => (
                <span className="font-bold text-[13px] text-slate-700 dark:text-slate-200 mono">{row.getValue("id")}</span>
            ),
        },
        {
            accessorKey: "userMasked",
            header: "User",
            cell: ({ row }) => (
                <span className="text-[13px] text-slate-600 dark:text-slate-400 font-medium">{row.getValue("userMasked")}</span>
            ),
        },
        {
            accessorKey: "driverMasked",
            header: "Driver",
            cell: ({ row }) => (
                <span className="text-[13px] text-slate-600 dark:text-slate-400 font-medium">{row.getValue("driverMasked")}</span>
            ),
        },
        {
            accessorKey: "stage",
            header: "Stage",
            cell: ({ row }) => {
                const stage = row.getValue("stage") as number;
                const cfg = stageConfig[stage];
                return (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${cfg.bg} border ${cfg.border}`}>
                        <div className={`w-1.5 h-1.5 rounded-full`}
                            style={{
                                backgroundColor: cfg.color,
                                boxShadow: stage === 3 ? `0 0 6px ${cfg.color}` : 'none',
                                animation: stage === 3 ? 'glow-pulse 1s ease-in-out infinite' : 'none',
                            }} />
                        <span className={`text-[11px] font-bold mono ${cfg.text}`}>Stage {stage} · {cfg.label}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400">
                    <MapPin className="h-3 w-3 text-blue-400 shrink-0" />
                    <span className="truncate max-w-[140px]">{row.getValue("location")}</span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <div className="flex items-center gap-1.5">
                        {status === "Emergency" && <AlertTriangle className="h-3.5 w-3.5 text-red-400" />}
                        {status === "Monitoring" && <Video className="h-3.5 w-3.5 text-amber-400" />}
                        {status === "Normal" && <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />}
                        <span className={`text-[12px] font-semibold ${
                            status === "Emergency" ? "text-red-400" :
                            status === "Monitoring" ? "text-amber-400" : "text-emerald-400"
                        }`}>{status}</span>
                    </div>
                );
            }
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const ride = row.original;
                const isMonitorable = ride.stage >= 1;
                return (
                    <Link href={`/dashboard/monitor2/${ride.id}`}>
                        <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all duration-200 active:scale-95 ${
                            isMonitorable
                                ? "text-white"
                                : "bg-white/4 text-slate-500 cursor-not-allowed"
                        }`}
                        style={isMonitorable ? {
                            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                            boxShadow: '0 0 16px rgba(37,99,235,0.3)',
                        } : {}}>
                            <Eye className="w-3 h-3" />
                            {isMonitorable ? "Monitor" : "View"}
                            {isMonitorable && <ArrowRight className="w-3 h-3" />}
                        </button>
                    </Link>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="glass-bright rounded-2xl border border-black/5 dark:border-white/6 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-black/2 dark:bg-white/2 border-b border-black/5 dark:border-white/5">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mono whitespace-nowrap">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-black/4 dark:divide-white/4">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                const ride = row.original;
                                const isEmergency = ride.stage === 3;
                                return (
                                    <tr key={row.id}
                                        className="group hover:bg-black/2 dark:hover:bg-white/2 transition-colors"
                                        style={{ borderLeft: isEmergency ? '3px solid rgba(239,68,68,0.4)' : '3px solid transparent' }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-5 py-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-16 text-center text-[13px] text-slate-500 italic">
                                    No active rides at this time.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

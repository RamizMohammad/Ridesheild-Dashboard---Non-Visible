"use client"

import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const incidents = [
    { id: "RIDE-9382", description: "Critical: Stage 3", timestamp: Date.now() - 120000, priority: "CRITICAL" },
    { id: "RIDE-2931", description: "Warning: Stage 2", timestamp: Date.now() - 300000, priority: "HIGH" },
    { id: "RIDE-1029", description: "Alert: Stage 1", timestamp: Date.now() - 720000, priority: "MEDIUM" },
];

export function SecurityViolationsTable() {
    return (
        <div className="glass rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden transition-all shadow-sm dark:shadow-none">
            <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/2 dark:bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 text-red-600 dark:text-red-500 rounded-lg">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Active Security Violations</h3>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 mono tracking-widest uppercase transition-colors">
                    Open Incident Ledger <ArrowRight className="w-3 h-3" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-black/1 dark:bg-white/2">
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mono">UUID</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mono">Violation_Type</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mono">Time_Stamp</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mono">Priority</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mono">Command</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                        {incidents.map((incident) => (
                            <tr key={incident.id} className="hover:bg-black/2 dark:hover:bg-white/3 transition-colors group">
                                <td className="px-8 py-6 font-bold text-slate-700 dark:text-slate-300 mono text-sm transition-colors">{incident.id}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-bold text-sm transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
                                        {incident.description}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm text-slate-500 dark:text-slate-400 mono font-bold uppercase transition-colors">
                                    {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-500 text-[10px] font-black rounded-lg border border-red-500/20 mono">
                                        {incident.priority}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                        TAKEOVER
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

"use client"

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, AlertTriangle, Clock, Check } from 'lucide-react';

const incidents = [
    { id: "RIDE-9382", description: "Stage 3 — SOS Triggered", timestamp: Date.now() - 120000, priority: "CRITICAL", location: "Connaught Place, Delhi" },
    { id: "RIDE-2931", description: "Stage 2 — Video Anomaly", timestamp: Date.now() - 300000, priority: "HIGH", location: "Noida Sector 18" },
    { id: "RIDE-1029", description: "Stage 1 — Audio Spike", timestamp: Date.now() - 720000, priority: "MEDIUM", location: "Hauz Khas Village" },
];

const priorityConfig: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    CRITICAL: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/25', dot: 'bg-red-500' },
    HIGH:     { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/25', dot: 'bg-orange-500' },
    MEDIUM:   { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/25', dot: 'bg-amber-500' },
};

export function SecurityViolationsTable() {
    return (
        <div className="glass-bright rounded-2xl border border-black/5 dark:border-white/6 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                        style={{ boxShadow: '0 0 16px rgba(16,185,129,0.2)' }}>
                        <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-none mb-0.5">Resolved Security Issues</h3>
                        <p className="text-[12px] text-slate-500">Recent safety interventions completed successfully</p>
                    </div>
                </div>
                <Link href="/dashboard/emergency" className="flex items-center gap-2 text-[12px] font-semibold text-blue-500 hover:text-blue-400 mono tracking-wider uppercase transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-500/10">
                    Incident Ledger <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-black/2 dark:bg-white/2 border-b border-black/4 dark:border-white/4">
                            {['Ride ID', 'Violation', 'Location', 'Timestamp', 'Priority', 'Action'].map(h => (
                                <th key={h} className="px-6 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mono whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/4 dark:divide-white/4">
                        {incidents.map((incident) => {
                            const cfg = priorityConfig[incident.priority];
                            return (
                                <tr key={incident.id}
                                    className="group hover:bg-black/2 dark:hover:bg-white/2 transition-colors relative"
                                    style={{ borderLeft: incident.priority === 'CRITICAL' ? '3px solid rgba(239,68,68,0.5)' : '3px solid transparent' }}
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-[13px] text-slate-700 dark:text-slate-300 mono">{incident.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${incident.priority === 'CRITICAL' ? 'animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]' : ''}`} />
                                            <span className={`text-[13px] font-semibold ${cfg.text}`}>{incident.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[12px] text-slate-500 dark:text-slate-400">{incident.location}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3 text-slate-500" />
                                            <span className="text-[12px] mono font-medium text-slate-500">
                                                {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${cfg.bg} ${cfg.text} border ${cfg.border} text-[10px] font-bold mono tracking-wider`}>
                                            {incident.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold mono tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                                            <Check className="w-3.5 h-3.5" />
                                            RESOLVED
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

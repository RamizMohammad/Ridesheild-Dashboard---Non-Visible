"use client"

import React from 'react';
import {
    Car, ShieldCheck, ShieldAlert, Zap,
    Activity
} from 'lucide-react';

const kpis = [
    { label: 'Total Rides', value: '1,248', icon: Car, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Active Rides', value: '342', icon: Activity, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Emergency', value: '3', icon: ShieldAlert, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { label: 'Monitoring', value: '12', icon: ShieldCheck, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
];

export function KPIGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
                <div key={i} className={`glass-bright p-6 rounded-3xl border ${kpi.border} group hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 shadow-sm dark:shadow-none`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform duration-500`}>
                            <kpi.icon className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] mono font-bold text-slate-500 dark:text-slate-500 tracking-widest">
                            <Zap className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                            LIVE
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">{kpi.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

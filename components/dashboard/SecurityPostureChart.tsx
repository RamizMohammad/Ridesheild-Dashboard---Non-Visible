"use client"

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ShieldCheck } from 'lucide-react';

const stageDistribution = [
    { name: 'Normal', label: 'Stage 0', value: 320, color: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    { name: 'Monitored', label: 'Stage 1', value: 15, color: '#f59e0b', bg: 'bg-amber-500/10', text: 'text-amber-400' },
    { name: 'Video Active', label: 'Stage 2', value: 5, color: '#f97316', bg: 'bg-orange-500/10', text: 'text-orange-400' },
    { name: 'Emergency', label: 'Stage 3', value: 2, color: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-400' },
];

const total = stageDistribution.reduce((s, d) => s + d.value, 0);

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        const pct = ((item.value / total) * 100).toFixed(1);
        return (
            <div className="px-3 py-2 rounded-xl text-sm"
                style={{
                    background: 'oklch(0.135 0.018 264 / 0.97)',
                    border: '1px solid oklch(0.22 0.018 264)',
                    backdropFilter: 'blur(12px)',
                    color: 'oklch(0.92 0.008 264)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}>
                <p className="font-bold" style={{ color: item.color }}>{item.name}</p>
                <p className="text-slate-300">{item.value} rides · <span className="text-slate-500">{pct}%</span></p>
            </div>
        );
    }
    return null;
};

export function SecurityPostureChart() {
    return (
        <div className="glass-bright rounded-2xl border border-black/5 dark:border-white/6 overflow-hidden card-lift">
            {/* Header */}
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Security</p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Stage Distribution</h3>
            </div>

            {/* Donut chart */}
            <div className="h-[180px] relative mx-4">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{total.toLocaleString()}</p>
                        <p className="text-[10px] mono font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Total</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={stageDistribution}
                            innerRadius={55}
                            outerRadius={78}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {stageDistribution.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    opacity={0.85}
                                    style={{ filter: `drop-shadow(0 0 6px ${entry.color}40)` }}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="px-5 pb-5 space-y-2">
                {stageDistribution.map((s) => {
                    const pct = ((s.value / total) * 100).toFixed(1);
                    return (
                        <div key={s.label} className="flex items-center gap-3 group">
                            <div className={`w-6 h-6 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                                <div>
                                    <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{s.name}</span>
                                    <span className="text-[11px] text-slate-500 ml-1.5 mono">{s.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1 rounded-full bg-black/6 dark:bg-white/6 overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                                    </div>
                                    <span className={`text-[12px] font-bold mono w-10 text-right ${s.text}`}>{s.value}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


"use client"

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const stageDistribution = [
    { name: 'Stage 0', value: 320, color: '#10b981' },
    { name: 'Stage 1', value: 15, color: '#f59e0b' },
    { name: 'Stage 2', value: 5, color: '#f97316' },
    { name: 'Stage 3', value: 2, color: '#ef4444' },
];

export function SecurityPostureChart() {
    return (
        <div className="glass p-8 rounded-[2rem] border border-black/5 dark:border-white/5 transition-all shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 transition-colors">Security Posture</h3>
            <div className="h-64 mb-10 relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-[10px] mono text-slate-500 font-bold uppercase tracking-widest">Stage Distribution</p>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 transition-colors">Active</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={stageDistribution}
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                        >
                            {stageDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '12px',
                                color: '#0f172a',
                                backdropFilter: 'blur(12px)'
                            }}
                            itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-2">
                {Array.from({ length: Math.ceil(stageDistribution.length / 2) }).map((_, i) => (
                    <div key={i} className='flex gap-2 w-full'>
                        {stageDistribution.slice(i * 2, i * 2 + 2).map((s, j) => (
                            <div key={j} className="flex flex-1 items-center justify-between gap-2 group p-2 hover:bg-black/2 dark:hover:bg-white/3 rounded-xl transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{s.name}</span>
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white mono transition-colors">{s.value}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

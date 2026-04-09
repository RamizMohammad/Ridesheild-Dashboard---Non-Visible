"use client"

import React from 'react';
import { Globe, TrendingUp } from 'lucide-react';
import {
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const barData = [
    { name: '00:00', val: 12 }, { name: '04:00', val: 8 }, { name: '08:00', val: 32 },
    { name: '12:00', val: 45 }, { name: '16:00', val: 38 }, { name: '20:00', val: 56 },
];

export function FleetActivityChart() {
    return (
        <div className="lg:col-span-2 glass p-8 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden transition-all shadow-sm dark:shadow-none">
            {/* <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                <Globe className="w-32 h-32 text-blue-600 dark:text-blue-400 rotate-12" />
            </div> */}

            <div className="flex items-center justify-between mb-10">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Active Rides</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Real-time ride volume</p>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mono">+18.4%</span>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={barData}>
                        <defs>
                            <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" className="dark:stroke-white/3" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                        <YAxis hide />
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
                        <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={4} fill="url(#glowGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

"use client"

import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';
import {
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const ranges = ['Today', 'Week', 'Month'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="px-3 py-2 rounded-xl border text-sm"
                style={{
                    background: 'oklch(0.135 0.018 264 / 0.97)',
                    border: '1px solid oklch(0.22 0.018 264)',
                    backdropFilter: 'blur(12px)',
                    color: 'oklch(0.92 0.008 264)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}>
                <p className="font-bold text-blue-400 mb-0.5">{payload[0].value} rides</p>
                <p className="text-[11px] text-slate-500 mono">{label}</p>
            </div>
        );
    }
    return null;
};

export function FleetActivityChart() {
    const [activeRange, setActiveRange] = React.useState('Today');
    const [data, setData] = React.useState([
        { name: '15:20', val: 24 }, { name: '15:22', val: 31 }, { name: '15:24', val: 45 },
        { name: '15:26', val: 38 }, { name: '15:28', val: 56 }, { name: '15:30', val: 42 },
        { name: '15:32', val: 49 }, { name: '15:34', val: 33 }, { name: '15:36', val: 29 },
        { name: '15:38', val: 41 }, { name: '15:40', val: 52 }, { name: '15:42', val: 61 },
        { name: '15:44', val: 47 }, { name: '15:46', val: 35 }, { name: '15:48', val: 42 },
    ]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const nextData = [...prevData.slice(1)];
                const now = new Date();
                const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const newVal = Math.floor(Math.random() * 35) + 20; // 20 - 55
                nextData.push({ name: timeStr, val: newVal });
                return nextData;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="lg:col-span-2 glass-bright rounded-2xl border border-black/5 dark:border-white/6 overflow-hidden card-lift">
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <BarChart2 className="w-4 h-4 text-blue-500" />
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Fleet Activity</p>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Active Rides</h3>
                        <p className="text-[13px] text-slate-500 mt-0.5">Real-time ride volume over time</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-[11px] font-bold text-emerald-500 mono">+18.4%</span>
                        </div>
                        {/* Range selector */}
                        <div className="flex bg-black/4 dark:bg-white/4 rounded-lg p-0.5 border border-black/5 dark:border-white/5">
                            {ranges.map(r => (
                                <button
                                    key={r}
                                    onClick={() => setActiveRange(r)}
                                    className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all duration-150 ${
                                        activeRange === r
                                            ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[240px] px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                                <stop offset="80%" stopColor="#3b82f6" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(148,163,184,0.1)"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600, fontFamily: 'Source Code Pro' }}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(59,130,246,0.15)', strokeWidth: 24 }} />
                        <Area
                            type="monotone"
                            dataKey="val"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
                            fill="url(#areaGradient)"
                            dot={false}
                            activeDot={{ r: 4, fill: '#3b82f6', stroke: 'oklch(0.135 0.018 264)', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


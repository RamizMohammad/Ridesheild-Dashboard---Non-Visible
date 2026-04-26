"use client"

import React from 'react';
import { Car, ShieldCheck, ShieldAlert, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface DashboardStats {
    totalRides: number
    activeRides: number
    emergencyCount: number
    monitoringCount: number
}

const kpiConfig = [
    {
        key: 'totalRides' as keyof DashboardStats,
        label: 'Total Rides',
        icon: Car,
        accent: 'blue',
        trend: '+12.4%',
        trendUp: true,
        trendLabel: 'vs last 7d',
        borderColor: 'border-t-blue-500/60',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        glowColor: 'rgba(59,130,246,0.12)',
        sparkHeights: [30, 45, 38, 55, 48, 62, 70],
        sparkColor: '#3b82f6',
    },
    {
        key: 'activeRides' as keyof DashboardStats,
        label: 'Active Rides',
        icon: Activity,
        accent: 'emerald',
        trend: '+3.1%',
        trendUp: true,
        trendLabel: 'vs last hour',
        borderColor: 'border-t-emerald-500/60',
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        glowColor: 'rgba(16,185,129,0.12)',
        sparkHeights: [55, 48, 65, 52, 70, 60, 75],
        sparkColor: '#10b981',
    },
    {
        key: 'emergencyCount' as keyof DashboardStats,
        label: 'Emergency',
        icon: ShieldAlert,
        accent: 'red',
        trend: '-2 today',
        trendUp: false,
        trendLabel: 'resolved',
        borderColor: 'border-t-red-500/60',
        iconBg: 'bg-red-500/10',
        iconColor: 'text-red-400',
        glowColor: 'rgba(239,68,68,0.12)',
        sparkHeights: [70, 55, 45, 60, 38, 42, 30],
        sparkColor: '#ef4444',
    },
    {
        key: 'monitoringCount' as keyof DashboardStats,
        label: 'Monitoring',
        icon: ShieldCheck,
        accent: 'amber',
        trend: 'Stage 1–2',
        trendUp: null,
        trendLabel: 'elevated',
        borderColor: 'border-t-amber-500/60',
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-400',
        glowColor: 'rgba(245,158,11,0.12)',
        sparkHeights: [38, 50, 42, 58, 45, 52, 48],
        sparkColor: '#f59e0b',
    },
];

function Sparkline({ heights, color }: { heights: number[]; color: string }) {
    const max = Math.max(...heights);
    const totalWidth = 56;
    const barW = 5;
    const gap = (totalWidth - heights.length * barW) / (heights.length - 1);

    return (
        <svg width={totalWidth} height={28} viewBox={`0 0 ${totalWidth} 28`}>
            {heights.map((h, i) => {
                const barH = Math.round((h / max) * 22);
                const x = i * (barW + gap);
                const y = 28 - barH - 2;
                return (
                    <rect
                        key={i}
                        x={x} y={y}
                        width={barW} height={barH}
                        rx={2}
                        fill={color}
                        opacity={0.3 + (i / heights.length) * 0.5}
                    />
                );
            })}
        </svg>
    );
}

export function KPIGrid({ stats }: { stats?: DashboardStats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {kpiConfig.map((kpi, i) => {
                const value = stats?.[kpi.key];
                const displayValue = value !== undefined ? value.toLocaleString() : '—';

                return (
                    <div
                        key={i}
                        className={`group relative rounded-2xl border-t-2 ${kpi.borderColor} glass-bright card-lift cursor-default overflow-hidden`}
                        style={{
                            animation: 'float-up 0.5s ease both',
                            animationDelay: `${i * 0.07}s`,
                        }}
                    >
                        {/* Ambient glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                            style={{ background: `radial-gradient(circle at 50% 0%, ${kpi.glowColor} 0%, transparent 70%)` }} />

                        <div className="relative p-5">
                            {/* Top row: icon + live badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${kpi.iconBg} ${kpi.iconColor} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                                    <kpi.icon className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style={{ color: kpi.sparkColor }} />
                                    <span className="text-[10px] mono font-bold text-slate-500 dark:text-slate-500 tracking-widest uppercase">Live</span>
                                </div>
                            </div>

                            {/* Value */}
                            <div className="mb-1">
                                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                                    {displayValue}
                                </h3>
                            </div>

                            {/* Trend + Sparkline */}
                            <div className="flex items-end justify-between mt-3 pt-3 border-t border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-1.5">
                                    {kpi.trendUp === true && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                                    {kpi.trendUp === false && <TrendingDown className="w-3 h-3 text-red-400" />}
                                    {kpi.trendUp === null && <Minus className="w-3 h-3 text-slate-400" />}
                                    <span className={`text-[11px] font-semibold ${
                                        kpi.trendUp === true ? 'text-emerald-500' :
                                        kpi.trendUp === false ? 'text-red-400' : 'text-slate-400'
                                    }`}>{kpi.trend}</span>
                                    <span className="text-[10px] text-slate-500">{kpi.trendLabel}</span>
                                </div>
                                <Sparkline heights={kpi.sparkHeights} color={kpi.sparkColor} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

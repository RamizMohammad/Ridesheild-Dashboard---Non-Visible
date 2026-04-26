"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
    Shield,
    LayoutDashboard,
    MonitorPlay,
    History,
    BookOpen,
    LogOut,
    Cpu,
    Activity,
    Database,
    Globe,
    User,
    Car
} from 'lucide-react';

const navSections = [
    {
        label: 'Operations',
        items: [
            { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, description: 'Overview & KPIs' },
            { label: 'Control Center', path: '/dashboard/control-center', icon: MonitorPlay, description: 'Live ride monitoring' },
        ]
    },
    {
        label: 'Intelligence',
        items: [
            { label: 'Ride History', path: '/dashboard/history', icon: History, description: 'Past ride analytics' },
            { label: 'Emergency Logs', path: '/dashboard/emergency', icon: BookOpen, description: 'Incident ledger', badge: true },
        ]
    },
];

export default function ModernSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch { /* ignore */ }
        logout();
    };

    return (
        <aside className="w-[280px] h-screen bg-white/40 dark:bg-[oklch(0.105_0.018_264/0.5)] backdrop-blur-3xl border-r border-black/5 dark:border-white/10 shadow-[4px_0_32px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_32px_rgba(0,0,0,0.4)] flex flex-col shrink-0 z-20 transition-all duration-500 relative overflow-hidden group">
            
            {/* Subtle inner top glare */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 dark:via-white/20 to-transparent opacity-50" />

            {/* ── LOGO ── */}
            <div className="px-6 py-8 relative">
                <div className="flex items-center gap-4">
                    <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/40 shrink-0 transform group-hover:scale-105 transition-transform duration-500">
                        {/* Glow behind icon */}
                        <div className="absolute inset-0 bg-blue-400 blur-xl opacity-40 animate-pulse" />
                        <Shield className="w-5 h-5 text-white relative z-10" />
                        {/* Status dot */}
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[3px] border-white dark:border-[oklch(0.105_0.018_264)] shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none mb-1">RideShield</h1>
                        <p className="text-[10px] mono text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase">Ops Center</p>
                    </div>
                </div>
            </div>

            {/* ── NAV ── */}
            <nav className="flex-1 px-4 py-2 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {navSections.map((section) => (
                    <div key={section.label}>
                        <p className="px-2 mb-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mono flex items-center gap-2">
                            {section.label}
                            <span className="flex-1 h-px bg-linear-to-r from-black/10 to-transparent dark:from-white/5" />
                        </p>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`group/item relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 ${
                                            isActive
                                                ? 'bg-blue-600/10 dark:bg-blue-500/15 text-blue-700 dark:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 hover:translate-x-1'
                                        }`}
                                    >
                                        {/* Active gradient border effect */}
                                        {isActive && (
                                            <>
                                                <div className="absolute inset-0 border border-blue-500/30 dark:border-blue-400/30 rounded-2xl" />
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 dark:bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(37,99,235,0.8)]" />
                                            </>
                                        )}

                                        <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                            isActive
                                                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                                : 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover/item:bg-black/10 dark:group-hover/item:bg-white/10 group-hover/item:scale-110'
                                        }`}>
                                            <item.icon className="w-[18px] h-[18px]" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[13px] font-bold leading-none mb-1 transition-colors ${isActive ? 'text-blue-700 dark:text-white' : ''}`}>
                                                {item.label}
                                            </p>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-none truncate font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                        
                                        {item.badge && (
                                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse shrink-0" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* ── BOTTOM WIDGETS ── */}
            <div className="p-4 mt-auto space-y-3">
                {/* System Health */}
                <div className="p-4 rounded-2xl bg-linear-to-br from-black/5 to-black/2 dark:from-white/5 dark:to-white/2 border border-black/5 dark:border-white/5 relative overflow-hidden group/health">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover/health:translate-x-[100%] transition-transform duration-1000" />
                    
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <Activity className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest mono">System</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mono">ONLINE</span>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between px-1">
                        {[
                            { icon: Globe, label: 'API', status: 'ok', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                            { icon: Database, label: 'DB', status: 'warn', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                            { icon: Cpu, label: 'WS', status: 'ok', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                        ].map((metric) => (
                            <div key={metric.label} className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full ${metric.bg} flex items-center justify-center border ${metric.border} shadow-sm`}>
                                    <metric.icon className={`w-3.5 h-3.5 ${metric.color}`} />
                                </div>
                                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mono">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-white hover:bg-red-500 dark:hover:bg-red-500/90 hover:shadow-[0_8px_16px_rgba(239,68,68,0.25)] transition-all duration-300 group/logout"
                >
                    <div className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/5 group-hover/logout:bg-white/20 flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 group-hover/logout:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-sm font-bold">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

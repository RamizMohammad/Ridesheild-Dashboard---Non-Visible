"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Shield,
    LayoutDashboard,
    MonitorPlay, // Replaces Car
    History, // Replaces Users
    BookOpen, // Replaces AlertTriangle
    LogOut,
    Command,
    ShieldAlert
} from 'lucide-react';

export default function ModernSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const activeMonitoringCount = 0; // Mocked as dashboard doesn't have this context yet

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Control Center', path: '/dashboard/control-center', icon: MonitorPlay },
        { label: 'Ride History', path: '/dashboard/history', icon: History },
        { label: 'Emergency Logs', path: '/dashboard/emergency', icon: BookOpen, badge: true }, // Keeping badge attr, will show if count > 0
    ];

    return (
        <aside className="w-64 bg-slate-900/10 dark:bg-slate-950/40 backdrop-blur-2xl border-r border-black/5 dark:border-white/5 flex flex-col shrink-0 z-20 transition-all duration-500">
            <div className="p-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white transition-colors">RIDESHIELD</h1>
                    <p className="text-[10px] mono text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em]">ADMIN</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative ${isActive
                                ? 'bg-blue-600/10 text-blue-700 dark:text-blue-400'
                                : 'text-slate-600 dark:text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300'
                                }`}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                                <span className={`text-sm font-semibold tracking-tight ${isActive ? 'text-slate-900 dark:text-white' : ''}`}>
                                    {item.label}
                                </span>
                            </div>
                            {item.badge && activeMonitoringCount > 0 && (
                                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-lg font-black mono animate-pulse shadow-lg shadow-red-500/40">
                                    {activeMonitoringCount}
                                </span>
                            )}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 mt-auto space-y-4">
                <div className="p-4 rounded-2xl bg-slate-200 dark:bg-slate-800/40 border border-black/5 dark:border-white/5 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                        <Command className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Load</span>
                    </div>
                    <div className="h-1 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[34%] h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                </div>

                <button
                    onClick={() => router.push('/login')}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-500 transition-colors group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-semibold">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
}

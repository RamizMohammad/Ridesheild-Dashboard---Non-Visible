"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Sun, Moon, ChevronRight } from 'lucide-react';
import ModernSidebar from './ModernSidebar';
import { useAuth } from '@/lib/auth-context';

const pathLabels: Record<string, string> = {
    '/dashboard': 'Overview',
    '/dashboard/control-center': 'Control Center',
    '/dashboard/history': 'Ride History',
    '/dashboard/emergency': 'Emergency Logs',
};

function LiveClock() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return <span>{time}</span>;
}

export default function ModernLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const [isDark, setIsDark] = useState(true);
    const [hasNotifs, setHasNotifs] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const initialDark = savedTheme !== 'light';
        setIsDark(initialDark);
        if (initialDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const nextDark = !isDark;
        setIsDark(nextDark);
        localStorage.setItem('theme', nextDark ? 'dark' : 'light');
        if (nextDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const pathLabel = pathLabels[pathname] || pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview';
    const parentLabel = pathname === '/dashboard' ? null : 'Dashboard';

    return (
        <div className="flex h-screen bg-transparent overflow-hidden transition-colors duration-500 relative">
            {/* Global Backgrounds */}
            <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none z-0" />
            <div className="mesh-gradient" />

            <ModernSidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden transition-colors duration-500 relative z-10">
                {/* ── TOP HEADER ── */}
                <header className="relative z-10 h-[64px] flex items-center justify-between px-8 border-b border-white/5 dark:border-white/6 bg-white/60 dark:bg-[oklch(0.105_0.018_264/0.85)] backdrop-blur-xl shrink-0">

                    {/* LEFT: Breadcrumb + System status */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400 dark:text-slate-500 font-medium">RideShield</span>
                            {parentLabel && (
                                <>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                                    <span className="text-slate-500 dark:text-slate-500 font-medium">{parentLabel}</span>
                                </>
                            )}
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                            <span className="text-slate-800 dark:text-slate-200 font-semibold capitalize">{pathLabel}</span>
                        </div>

                        <div className="hidden lg:flex items-center gap-2 h-6 border-l border-black/10 dark:border-white/10 pl-6">
                            <div className="status-dot-green shrink-0" />
                            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mono tracking-widest uppercase">All Systems Nominal</span>
                        </div>
                    </div>

                    {/* RIGHT: Clock, Theme, Notifs, User */}
                    <div className="flex items-center gap-5">

                        {/* Live clock */}
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/6 dark:border-white/6">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="mono text-[11px] font-bold text-slate-600 dark:text-slate-400 tracking-wider">
                                <LiveClock />
                            </span>
                        </div>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/6 hover:bg-black/10 dark:hover:bg-white/10 border border-black/6 dark:border-white/6 transition-all duration-200 group"
                            aria-label="Toggle Theme"
                        >
                            <div className={`transition-transform duration-300 ${isDark ? 'rotate-0' : 'rotate-360'}`}>
                                {isDark ? (
                                    <Moon className="w-4 h-4 text-blue-400" />
                                ) : (
                                    <Sun className="w-4 h-4 text-amber-500" />
                                )}
                            </div>
                        </button>

                        {/* Notifications */}
                        <button
                            className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/6 hover:bg-black/10 dark:hover:bg-white/10 border border-black/6 dark:border-white/6 transition-all duration-200"
                            onClick={() => setHasNotifs(false)}
                            aria-label="Notifications"
                        >
                            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            {hasNotifs && (
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[oklch(0.105_0.018_264)] shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
                            )}
                        </button>

                        {/* Divider */}
                        <div className="h-8 w-px bg-black/10 dark:bg-white/10" />

                        {/* User */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-0.5">{user?.name || 'Operator'}</p>
                                <p className="text-[10px] mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">{user?.role || 'Admin'}</p>
                            </div>
                            <div className="relative">
                                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                                    {(user?.name || 'O').charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[oklch(0.105_0.018_264)] rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── PAGE CONTENT ── */}
                <div className="flex-1 overflow-y-auto relative z-10">
                    <div className="p-8">
                        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

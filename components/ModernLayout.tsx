"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    Bell,
    Sun,
    Moon
} from 'lucide-react';
import ModernSidebar from './ModernSidebar';
import { useAuth } from '@/lib/auth-context';

export default function ModernLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const [isDark, setIsDark] = useState(true);

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

    // Logic to determine header title based on current path
    const pathDetail = pathname === '/dashboard' ? 'OVERVIEW' : pathname.split('/').pop()?.toUpperCase() || 'OVERVIEW';

    return (
        <div className="flex h-screen bg-transparent overflow-hidden transition-colors duration-500">
            <ModernSidebar />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-slate-950/20 transition-colors duration-500">
                <header className="h-20 flex items-center justify-between px-10 border-b border-black/5 dark:border-white/5 backdrop-blur-md relative z-10 transition-colors">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#10b981]" />
                        <h2 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em] mono transition-colors">
                            SECURE_OPS // {pathDetail}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 transition-all duration-300 relative group overflow-hidden border border-black/5 dark:border-white/10"
                            aria-label="Toggle Theme"
                        >
                            <div className={`transition-all duration-500 transform ${isDark ? 'rotate-0' : 'rotate-180'}`}>
                                {isDark ? (
                                    <Moon className="w-5 h-5 text-blue-400" />
                                ) : (
                                    <Sun className="w-5 h-5 text-amber-600" />
                                )}
                            </div>
                        </button>

                        <div className="relative group cursor-pointer">
                            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50 dark:border-slate-950" />
                        </div>

                        <div className="flex items-center gap-4 border-l border-black/10 dark:border-white/10 pl-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight transition-colors">{user?.name || 'OPERATOR'}</p>
                                <p className="text-[10px] mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest transition-colors">{user?.role || 'USER'}</p>
                            </div>
                            <div className="relative">
                                <img src="https://picsum.photos/seed/operator/80/80" className="w-10 h-10 rounded-xl border border-black/10 dark:border-white/20 shadow-xl" alt="Operator" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-50 dark:border-slate-950 rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

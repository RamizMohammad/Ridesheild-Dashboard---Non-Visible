"use client"

import LoginForm from "@/components/auth/LoginForm"
import { useAuth } from "@/lib/auth-context"
import { Shield, Sparkles, AlertCircle, CheckCircle } from "lucide-react"

export default function LoginPage() {
    const { login } = useAuth()

    return (
        <main className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-[oklch(0.08_0.018_264)]">
            
            {/* ── LEFT PANEL: PREMIUM BRANDING ── */}
            <div className="hidden md:flex flex-1 flex-col justify-between p-12 relative overflow-hidden border-r border-white/5 bg-[radial-gradient(circle_at_30%_30%,_rgba(59,130,246,0.15),_transparent_60%)]">
                {/* Abstract moving gradients */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute w-[800px] h-[800px] rounded-full bg-linear-to-br from-indigo-600/10 to-blue-600/10 blur-3xl -top-96 -left-96 animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-linear-to-br from-purple-600/10 to-indigo-600/10 blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
                    <div className="absolute inset-0 dot-grid opacity-30" />
                </div>

                {/* Top Logo Area */}
                <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform duration-500">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-white leading-none mb-1">RideShield</h1>
                        <p className="text-[10px] font-bold text-blue-400 tracking-[0.25em] uppercase">Intelligence Node</p>
                    </div>
                </div>

                {/* Centered Value Prop */}
                <div className="relative z-10 max-w-lg mt-24 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Next-Gen Mobility Security
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
                        Protecting Every Journey <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
                            with Real-Time AI.
                        </span>
                    </h2>
                    <p className="text-slate-400 text-[15px] leading-relaxed mb-10 max-w-md">
                        Deploy active algorithmic shielding pipelines that monitor operations, mitigate threats, and sustain infrastructure reliability.
                    </p>

                    {/* Stats/Feature Badges */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-xl hover:border-white/15 transition-colors group/badge">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mb-2 group-hover/badge:scale-110 transition-transform" />
                            <p className="text-sm font-bold text-white mb-0.5">99.99% Node Uptime</p>
                            <p className="text-xs text-slate-500">Global response SLA</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-xl hover:border-white/15 transition-colors group/badge">
                            <Shield className="w-5 h-5 text-indigo-400 mb-2 group-hover/badge:scale-110 transition-transform" />
                            <p className="text-sm font-bold text-white mb-0.5">Proactive Defenses</p>
                            <p className="text-xs text-slate-500">Sub-second threat auditing</p>
                        </div>
                    </div>
                </div>

                {/* Footer Attribution */}
                <div className="relative z-10 text-slate-600 text-xs font-medium">
                    &copy; {new Date().getFullYear()} RideShield Technologies. All rights reserved.
                </div>
            </div>

            {/* ── RIGHT PANEL: INTERACTIVE LOGIN FORM ── */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
                {/* Background Blobs for Mobile View */}
                <div className="absolute inset-0 z-0 md:hidden overflow-hidden pointer-events-none">
                    <div className="absolute w-[300px] h-[300px] bg-blue-500/10 blur-3xl top-0 left-0" />
                    <div className="absolute w-[300px] h-[300px] bg-purple-500/10 blur-3xl bottom-0 right-0" />
                </div>

                <div className="relative z-10 w-full max-w-[420px]">
                    {/* Logo for mobile only */}
                    <div className="flex items-center gap-3.5 mb-8 md:hidden">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-black text-white">RideShield</span>
                    </div>

                    <LoginForm onLogin={login} />
                </div>
            </div>
        </main>
    )
}

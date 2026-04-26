"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Shield, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react"

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const result = await onLogin(email, password)
        setLoading(false)

        if (!result.success) {
            setError(result.error || "Authentication failed")
            toast.error(result.error)
        }
    }

    return (
        <div className="w-full max-w-[420px]">
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[oklch(0.135_0.018_264/0.95)] backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] p-8">

                {/* Top glow accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />

                {/* Ambient glow behind card */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-4">
                        <Shield className="w-7 h-7 text-white" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[oklch(0.135_0.018_264)] shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight leading-none mb-1">
                        RideShield
                    </h1>
                    <p className="text-[11px] mono text-blue-400 font-semibold tracking-[0.2em] uppercase">Secure Operations Center</p>
                </div>

                <div className="mb-6 text-center">
                    <h2 className="text-[15px] font-semibold text-slate-300 mb-1">Welcome back</h2>
                    <p className="text-[13px] text-slate-500">Sign in to your operator account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                id="email"
                                type="email"
                                placeholder="operator@rideshield.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 focus:border-blue-500/60 focus:ring-0 focus:outline-none focus:bg-white/7 transition-all duration-200 text-[14px] text-white placeholder-slate-600 font-medium"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 focus:border-blue-500/60 focus:ring-0 focus:outline-none focus:bg-white/7 transition-all duration-200 text-[14px] text-white placeholder-slate-600 font-medium"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] font-medium">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full py-3 px-4 rounded-xl font-semibold text-[14px] text-white overflow-hidden group transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        style={{
                            background: loading ? 'oklch(0.52 0.22 264)' : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                            boxShadow: loading ? 'none' : '0 0 24px rgba(37,99,235,0.4), 0 4px 12px rgba(0,0,0,0.3)',
                        }}
                    >
                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)' }} />

                        <span className="relative flex items-center justify-center gap-2">
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                            )}
                        </span>
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 pt-5 border-t border-white/6 text-center">
                    <p className="text-[12px] text-slate-600">
                        Access issues?{' '}
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-medium">
                            Contact your system administrator
                        </span>
                    </p>
                </div>
            </div>

            {/* Below card note */}
            <p className="mt-4 text-center text-[11px] text-slate-700 mono">
                🔒 All sessions are encrypted and audited
            </p>
        </div>
    )
}

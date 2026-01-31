"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await onLogin(email, password)
        setLoading(false)

        if (!result.success) {
            toast.error(result.error)
        }
    }

    return (
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-red from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Welcome Back
                </h1>
                <p className="text-gray-400 mt-2">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-200">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-200">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder-gray-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                        "Sign In"
                    )}
                </button>

                <div className="text-center text-sm text-gray-500">
                    <p>Don't have an account? <span className="text-blue-400 cursor-pointer hover:underline">Contact Admin</span></p>
                </div>
            </form>
        </div>
    )
}

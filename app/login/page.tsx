"use client"

import LoginForm from "@/components/auth/LoginForm"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
    const { login } = useAuth()

    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
            <LoginForm onLogin={login} />
        </main>
    )
}

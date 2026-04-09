"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem("auth_token")
            if (!token) {
                setIsLoading(false)
                return
            }

            try {
                const res = await fetch("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.ok) {
                    const user = await res.json()
                    setUser(user)
                    // Update cache
                    localStorage.setItem("mock_auth_user", JSON.stringify(user))
                } else {
                    // Invalid token
                    localStorage.removeItem("auth_token")
                    localStorage.removeItem("mock_auth_user")
                    setUser(null)
                }
            } catch (error) {
                console.error("Auth verification failed", error)
                // On network error, maybe keep the cached user but don't crash
            } finally {
                setIsLoading(false)
            }
        }

        verifySession()
    }, [])

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                return { success: false, error: data.error || "Login failed" }
            }

            const { token, user } = data
            setUser(user)
            localStorage.setItem("auth_token", token)
            localStorage.setItem("mock_auth_user", JSON.stringify(user)) // Keep user cache
            router.push("/dashboard")
            return { success: true }
        } catch (error) {
            console.error("Login error:", error)
            return { success: false, error: "Network error" }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("mock_auth_user")
        localStorage.removeItem("auth_token")
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

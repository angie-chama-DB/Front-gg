"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import * as authService from "@/services/authService"
import type { User } from "@/types/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, displayName: string, email: string, password: string, phone: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      // In a real app, you would validate the token with the backend
      // For now, we'll just set a mock user
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authService.login({ email, password })
      localStorage.setItem("access_token", response.access_token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, displayName: string, email: string, password: string, phone: string) => {
    setIsLoading(true)
    try {
      await authService.register({ name, displayName, email, password, phone })
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      localStorage.removeItem("access_token")
      localStorage.removeItem("user")
      setUser(null)
      try {
        await authService.logout()
      } catch (backendError) {
        console.log("Backend logout failed, but local logout completed")
      }
    } catch (error) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("user")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
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

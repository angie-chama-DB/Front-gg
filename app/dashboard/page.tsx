"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/Button"
import { showToast } from "@/components/Toast"
import { LogOut, Sparkles, ImageIcon, Zap } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  const handleLogout = async () => {
    try {
      await logout()
      showToast("Sesión cerrada correctamente", "success")
      router.push("/login")
    } catch (err: any) {
      showToast(err.message || "Error al cerrar sesión", "error")
    }
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PixPro
            </h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-fade-in-up">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-3">¡Bienvenido, {user?.name}! 👋</h2>
            <p className="text-xl text-muted-foreground">Tu panel de procesamiento inteligente de imágenes con IA</p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<ImageIcon className="w-8 h-8" />}
              title="Procesar Imágenes"
              description="Sube y procesa tus imágenes con IA avanzada"
              color="from-primary to-accent"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Optimización Rápida"
              description="Resultados en segundos con máxima calidad"
              color="from-accent to-primary"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Efectos IA"
              description="Aplica efectos inteligentes automáticamente"
              color="from-primary/80 to-accent/80"
            />
          </div>

          {/* User Info Card */}
          <div className="mt-12 glass-strong rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4">Información de la Cuenta</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">Nombre:</span>
                <span>{user?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">Estado:</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Activo
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group">
      <div
        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:purple-glow transition-shadow`}
      >
        <div className="text-primary-foreground">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

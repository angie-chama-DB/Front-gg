"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AuthLayout } from "@/components/AuthLayout"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Revisa tu correo</h2>
          <p className="text-muted-foreground mb-8">
            Te hemos enviado instrucciones para restablecer tu contraseña a{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
          <Link href="/login">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="animate-fade-in-up">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Link>

        <h2 className="text-3xl font-bold text-foreground mb-2">¿Olvidaste tu contraseña?</h2>
        <p className="text-muted-foreground mb-8">No te preocupes, te enviaremos instrucciones para restablecerla.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Enviar instrucciones
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}

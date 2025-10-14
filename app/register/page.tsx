"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/AuthLayout"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { useAuth } from "@/hooks/useAuth"
import { useForm } from "@/hooks/useForm"
import { showToast } from "@/components/Toast"
import { AlertCircle, Check, X } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [error, setError] = useState("")

  const { values, errors, handleChange, handleBlur, validateForm } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationRules: {
      name: (value) => {
        if (!value) return "El nombre es obligatorio"
        if (value.length < 2) return "El nombre debe tener al menos 2 caracteres"
        return ""
      },
      email: (value) => {
        if (!value) return "El correo es obligatorio"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Formato de correo inválido"
        return ""
      },
      password: (value) => {
        if (!value) return "La contraseña es obligatoria"
        if (value.length < 8) return "Mínimo 8 caracteres"
        if (!/[A-Z]/.test(value)) return "Debe contener una mayúscula"
        if (!/[a-z]/.test(value)) return "Debe contener una minúscula"
        if (!/[0-9]/.test(value)) return "Debe contener un número"
        return ""
      },
    },
  })

  // Password strength indicators
  const passwordChecks = {
    length: values.password.length >= 8,
    uppercase: /[A-Z]/.test(values.password),
    lowercase: /[a-z]/.test(values.password),
    number: /[0-9]/.test(values.password),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    try {
      await register(values.name, values.email, values.password)
      showToast("¡Registro exitoso! Ahora puedes iniciar sesión", "success")
      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Error al registrarse")
      showToast(err.message || "Error al registrarse", "error")
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">Crear Cuenta</h2>
          <p className="text-muted-foreground">Únete a PixPro hoy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Nombre completo"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            placeholder="Juan Pérez"
            autoComplete="name"
          />

          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            placeholder="tu@email.com"
            autoComplete="email"
          />

          <div>
            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="new-password"
            />

            {/* Password strength indicators */}
            {values.password && (
              <div className="mt-3 space-y-2 p-3 rounded-lg glass text-xs">
                <p className="font-medium text-muted-foreground mb-2">Requisitos de contraseña:</p>
                <div className="space-y-1.5">
                  <PasswordCheck met={passwordChecks.length} text="Mínimo 8 caracteres" />
                  <PasswordCheck met={passwordChecks.uppercase} text="Una letra mayúscula" />
                  <PasswordCheck met={passwordChecks.lowercase} text="Una letra minúscula" />
                  <PasswordCheck met={passwordChecks.number} text="Un número" />
                </div>
              </div>
            )}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Crear Cuenta
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:text-accent transition-colors font-medium">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

function PasswordCheck({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-muted-foreground" />}
      <span className={met ? "text-success" : "text-muted-foreground"}>{text}</span>
    </div>
  )
}

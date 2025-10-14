import type React from "react"
import { Sparkles } from "lucide-react"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex backdrop-blur-sm">
      {/* Left Column - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <div className="animate-fade-in-up">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center purple-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                PixPro
              </h1>
            </div>

            {/* Tagline */}
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Procesamiento inteligente de imágenes con IA
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-md">
              Rápido, elegante y seguro. Transforma tus imágenes con el poder de la inteligencia artificial.
            </p>

            {/* Features */}
            <div className="mt-12 space-y-4">
              <Feature text="Procesamiento en tiempo real" />
              <Feature text="Seguridad de nivel empresarial" />
              <Feature text="Resultados de alta calidad" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Auth Card */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PixPro
          </span>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        {/* Auth Card */}
        <div className="w-full max-w-md relative z-10">
          <div className="glass-strong rounded-3xl p-8 shadow-2xl">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
      <span>{text}</span>
    </div>
  )
}

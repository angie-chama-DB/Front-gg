"use client"

import { createContext, useState, useCallback } from "react"
import { CheckCircle2, XCircle, X } from "lucide-react"

type ToastType = "success" | "error"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType) => {
      const id = Math.random().toString(36).substring(7)
      setToasts((prev) => [...prev, { id, message, type }])

      setTimeout(() => {
        removeToast(id)
      }, 5000)
    },
    [removeToast],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              glass-strong rounded-xl p-4 shadow-2xl
              flex items-center gap-3 min-w-[300px]
              animate-fade-in-up
              ${toast.type === "success" ? "border-l-4 border-success" : "border-l-4 border-destructive"}
            `}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            )}
            <p className="flex-1 text-sm text-foreground">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function showToast(message: string, type: ToastType) {
  // This is a helper function that will be called from components
  // The actual implementation is in the context
  const event = new CustomEvent("show-toast", { detail: { message, type } })
  window.dispatchEvent(event)
}

// Update Toaster to listen for custom events
export function ToasterWithEvents() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const handleShowToast = useCallback(
    (message: string, type: ToastType) => {
      const id = Math.random().toString(36).substring(7)
      setToasts((prev) => [...prev, { id, message, type }])

      setTimeout(() => {
        removeToast(id)
      }, 5000)
    },
    [removeToast],
  )

  // Listen for custom events
  if (typeof window !== "undefined") {
    window.addEventListener("show-toast", ((e: CustomEvent) => {
      handleShowToast(e.detail.message, e.detail.type)
    }) as EventListener)
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            glass-strong rounded-xl p-4 shadow-2xl
            flex items-center gap-3 min-w-[300px]
            animate-fade-in-up
            ${toast.type === "success" ? "border-l-4 border-success" : "border-l-4 border-destructive"}
          `}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          )}
          <p className="flex-1 text-sm text-foreground">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

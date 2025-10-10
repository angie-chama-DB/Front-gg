import { type InputHTMLAttributes, forwardRef } from "react"
import { AlertCircle, Check } from "lucide-react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl
              bg-input border border-border
              text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
              transition-all duration-200
              ${error ? "border-destructive focus:ring-destructive" : ""}
              ${success ? "border-success focus:ring-success" : ""}
              ${className}
            `}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
          )}
          {success && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check className="w-5 h-5 text-success" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

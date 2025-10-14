"use client"

import { useState, type ChangeEvent, type FocusEvent } from "react"

interface UseFormProps<T> {
  initialValues: T
  validationRules: {
    [K in keyof T]?: (value: T[K]) => string
  }
}

export function useForm<T extends Record<string, any>>({ initialValues, validationRules }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate on blur
    const validator = validationRules[name as keyof T]
    if (validator) {
      const error = validator(values[name as keyof T])
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    Object.keys(validationRules).forEach((key) => {
      const validator = validationRules[key as keyof T]
      if (validator) {
        const error = validator(values[key as keyof T])
        if (error) {
          newErrors[key as keyof T] = error
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    return isValid
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  }
}

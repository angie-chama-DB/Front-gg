

import type { RegisterCredentials, LoginCredentials, LoginResponse, ApiError } from "@/types/auth"
import { apiClient } from "@/lib/api"

/**
 * Register a new user
 * Mock: Simulates 600-900ms latency and checks for existing emails
 */
export async function register(credentials: RegisterCredentials): Promise<{ success: boolean; message: string }> {
  return await apiClient.post('/auth/register', credentials)
}

/**
 * Login user
 * Mock: Validates against mock user credentials
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return await apiClient.post('/auth/login', credentials)
}

/**
 * Logout user
 * Mock: Simulates 300ms latency
 */
export async function logout(): Promise<{ success: boolean }> {
  return await apiClient.post('/auth/logout')
}

/**
 * Validate token 
 */
export async function validateToken(token: string): Promise<boolean> {
  try {
    await apiClient.post('/auth/validate', { token })
    return true
  } catch {
    return false
  }
}

export interface User {
  id: string
  name: string
  displayName: string
  email: string
  phone: string
}

export interface RegisterCredentials {
  name: string
  displayName: string
  email: string
  password: string
  phone: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface ApiError {
  code: string
  message: string
}
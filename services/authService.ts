

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: {
    name: string
    email: string
  }
}

export interface ApiError {
  code: string
  message: string
}

// Mock data
const MOCK_TAKEN_EMAILS = ["taken@example.com", "admin@pixpro.com"]
const MOCK_VALID_USER = {
  email: "user@example.com",
  password: "Password1",
  name: "Usuario Demo",
}


function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Register a new user
 * Mock: Simulates 600-900ms latency and checks for existing emails
 */
export async function register(credentials: RegisterCredentials): Promise<{ success: boolean; message: string }> {
  // Simulate network latency
  await delay(600 + Math.random() * 300)

  // Validate email not taken
  if (MOCK_TAKEN_EMAILS.includes(credentials.email.toLowerCase())) {
    throw {
      code: "EMAIL_EXISTS",
      message: "El correo ya está registrado.",
    } as ApiError
  }

  // Validate password strength (redundant with frontend, but good practice)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(credentials.password)) {
    throw {
      code: "WEAK_PASSWORD",
      message: "La contraseña no cumple con los requisitos de seguridad.",
    } as ApiError
  }

  // Success
  return {
    success: true,
    message: "Registrado correctamente",
  }
}

/**
 * Login user
 * Mock: Validates against mock user credentials
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {

  await delay(700 + Math.random() * 300)

  if (credentials.email.toLowerCase() === MOCK_VALID_USER.email && credentials.password === MOCK_VALID_USER.password) {
    return {
      access_token: "mocked-token-" + Math.random().toString(36).substring(7),
      user: {
        name: MOCK_VALID_USER.name,
        email: MOCK_VALID_USER.email,
      },
    }
  }


  throw {
    code: "INVALID_CREDENTIALS",
    message: "Email o contraseña incorrectos.",
  } as ApiError
}

/**
 * Logout user
 * Mock: Simulates 300ms latency
 */
export async function logout(): Promise<{ success: boolean }> {

  await delay(300)

  // In a real implementation
  // await fetch('/api/auth/logout', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  //   }
  // })

  return { success: true }
}

/**
 * Validate token 
 */
export async function validateToken(token: string): Promise<boolean> {
  await delay(200)
  return token.startsWith("mocked-token-")
}

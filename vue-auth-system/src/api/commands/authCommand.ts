// src/api/commands/authCommand.ts
import type { RegisterData, LoginData, AuthResponse } from '../types'
import { commandApi, withCsrf } from '../axios'
import { ROUTES } from '../routes'

// -------------------------
// Generic wrapper for commands
// -------------------------
async function executeCommand<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch (error) {
    console.error('Command failed:', error)
    return null
  }
}

// -------------------------
// Register
// -------------------------
export const registerUser = (data: RegisterData): Promise<AuthResponse | null> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.post<AuthResponse>(ROUTES.auth.register, data)
    ).then(res => res.data)
  )

// -------------------------
// Login
// -------------------------
export const loginUser = (data: LoginData): Promise<AuthResponse | null> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.post<AuthResponse>(ROUTES.auth.login, data)
    ).then(res => res.data)
  )

// -------------------------
// Logout
// -------------------------
export const logoutUser = (): Promise<boolean> =>
  executeCommand(() =>
    withCsrf(() => commandApi.post(ROUTES.auth.logout)).then(() => true)
  ).then(res => !!res)

// -------------------------
// Refresh Access Token
// -------------------------
export const refreshToken = (): Promise<AuthResponse | null> =>
  executeCommand(() =>
    commandApi.post<AuthResponse>(ROUTES.auth.refresh).then(res => res.data)
  )

// -------------------------
// Update Profile
// -------------------------
export const updateProfile = (data: Partial<RegisterData>): Promise<AuthResponse | null> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.put<AuthResponse>(ROUTES.auth.updateProfile, data)
    ).then(res => res.data)
  )

// -------------------------
// Change Password
// -------------------------
export const updateUserPassword = (payload: {
  current_password: string
  password: string
  password_confirmation: string
}): Promise<AuthResponse | null> =>
  executeCommand(() =>
    withCsrf(() =>
      commandApi.post<AuthResponse>(ROUTES.auth.changePassword, payload)
    ).then(res => res.data)
  )

/** API base URL — set after CloudFormation deploy (VITE_API_BASE_URL). */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
  /\/$/,
  '',
) ?? ''

export const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID as string | undefined
export const COGNITO_USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID as string | undefined
export const COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION as string | undefined

export const isApiEnabled = (): boolean => Boolean(API_BASE_URL)

const TOKEN_KEY = 'qa-intelligence-auth-token'

export function getAuthToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearAuthToken(): void {
  sessionStorage.removeItem(TOKEN_KEY)
}

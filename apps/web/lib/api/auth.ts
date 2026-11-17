import { apiFetch } from './client.ts'
import type { components } from './schema'
export type AuthState = components['schemas']['AuthNextState']
export type AuthSession = components['schemas']['AuthSessionResult']
export type MfaOptions = components['schemas']['MfaOptions']
export type Enrollment = components['schemas']['TotpEnrollment']
export const authApi = {
  register: (email: string, password: string) => apiFetch<components['schemas']['RegistrationResult']>('/api/v1/auth/register', { method: 'POST', body: { email, password } }),
  login: (email: string, password: string) => apiFetch<AuthSession>('/api/v1/auth/login', { method: 'POST', body: { email, password } }),
  state: (token: string) => apiFetch<AuthState>('/api/v1/auth/state', { token }),
  options: (token: string) => apiFetch<MfaOptions>('/api/v1/auth/mfa/options', { token }),
  enroll: (token: string) => apiFetch<Enrollment>('/api/v1/auth/mfa/enroll', { token, method: 'POST' }),
  removePending: (token: string, id: string) => apiFetch<void>(`/api/v1/auth/mfa/factors/${encodeURIComponent(id)}`, { token, method: 'DELETE' }),
  challenge: (token: string, factorId: string) => apiFetch<{ challengeRef: string; expiresAt: string }>('/api/v1/auth/mfa/challenges', { token, method: 'POST', body: { factorId } }),
  verify: (token: string, factorId: string, id: string, code: string) => apiFetch<AuthSession>(`/api/v1/auth/mfa/challenges/${encodeURIComponent(id)}/verify`, { token, method: 'POST', body: { factorId, code } }),
  logout: (token: string) => apiFetch<void>('/api/v1/auth/logout', { token, method: 'POST' }),
}

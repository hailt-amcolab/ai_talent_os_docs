import { createClient } from '@supabase/supabase-js'
import type { AuthProvider, AuthFactor, TokenPair, VerifiedToken } from '../../core/auth.ts'
import { AppError, unauthorized } from '../../core/errors.ts'

export function totpEnrollment(data: Record<string, unknown>) {
  const totp = data.totp as { qr_code?: unknown; secret?: unknown } | undefined
  const qr = typeof totp?.qr_code === 'string' ? totp.qr_code.trimStart().replace(/^(?:(?:<\?xml[\s\S]*?\?>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>)\s*)+/, '') : ''
  if (typeof data.id !== 'string' || !/^<svg[\s>]/.test(qr) || typeof totp?.secret !== 'string' || !totp.secret) throw new AppError('AUTH_PROVIDER_UNAVAILABLE', 503)
  return { factorId: data.id, qr: 'data:image/svg+xml;base64,' + Buffer.from(qr).toString('base64'), secret: totp.secret }
}

// User MFA uses the provider REST contract with the caller's Bearer JWT. No service key or mutable shared user session is used.
export function createAuthProvider(url: string, publishableKey: string, autoConfirmSecret?: string): AuthProvider {
  const timedFetch: typeof fetch = (input, init) => fetch(input, { ...init, signal: init?.signal ? AbortSignal.any([init.signal, AbortSignal.timeout(12_000)]) : AbortSignal.timeout(12_000) })
  const options = { global: { fetch: timedFetch }, auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  const verifier = createClient(url, publishableKey, options)
  async function request(path: string, token: string, method = 'GET', body?: object): Promise<Record<string, unknown>> {
    let res: Response
    try {
      res = await fetch(`${url}/auth/v1${path}`, {
        method, headers: { apikey: publishableKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(12_000), cache: 'no-store',
      })
    } catch { throw new AppError('AUTH_PROVIDER_UNAVAILABLE', 503) }
    const data = await res.json().catch(() => ({})) as Record<string, unknown>
    if (!res.ok) {
      if (res.status === 429) throw new AppError('RATE_LIMITED', 429)
      throw new AppError(res.status >= 500 ? 'AUTH_PROVIDER_UNAVAILABLE' : 'AUTH_INVALID', res.status >= 500 ? 503 : 401)
    }
    return data
  }
  function pair(data: Record<string, unknown>): TokenPair {
    if (typeof data.access_token !== 'string' || typeof data.refresh_token !== 'string' || typeof data.expires_in !== 'number') throw new AppError('AUTH_PROVIDER_UNAVAILABLE', 503)
    return { access_token: data.access_token, refresh_token: data.refresh_token, expires_at: Math.floor(Date.now() / 1000) + data.expires_in }
  }
  async function factors(token: string) {
    const data = await request('/user', token)
    return (Array.isArray(data.factors) ? data.factors : []) as AuthFactor[]
  }
  return {
    async register(email, password, redirectTo) {
      // Explicit dev-only option: no approval, no SMTP dependency. Never selected
      // in production; normal mode below uses native signUp/email confirmation.
      if (autoConfirmSecret) {
        const admin = createClient(url, autoConfirmSecret, options)
        const created = await admin.auth.admin.createUser({ email, password, email_confirm: true })
        if (created.error || !created.data.user) throw new AppError(created.error?.status === 429 ? 'RATE_LIMITED' : 'REGISTRATION_FAILED', created.error?.status === 429 ? 429 : 422)
        const client = createClient(url, publishableKey, options)
        const result = await client.auth.signInWithPassword({email,password})
        if (result.error || !result.data.session) throw new AppError('AUTH_PROVIDER_UNAVAILABLE', 503)
        const session = result.data.session
        return {access_token:session.access_token,refresh_token:session.refresh_token,expires_at:session.expires_at!}
      }
      const client = createClient(url, publishableKey, options)
      const { data, error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
      if (error) throw new AppError(error.status === 429 ? 'RATE_LIMITED' : error.status && error.status < 500 ? 'REGISTRATION_FAILED' : 'AUTH_PROVIDER_UNAVAILABLE', error.status === 429 ? 429 : error.status && error.status < 500 ? 422 : 503)
      return data.session ? { access_token: data.session.access_token, refresh_token: data.session.refresh_token, expires_at: data.session.expires_at! } : null
    },
    async user(token) {
      const data = await request('/user', token)
      if (typeof data.id !== 'string' || typeof data.email !== 'string') throw unauthorized()
      return { id: data.id, email: data.email, factors: (Array.isArray(data.factors) ? data.factors : []) as AuthFactor[] }
    },
    async login(email, password) {
      // Request-scoped SDK client: concurrent logins never share a mutable session.
      const client = createClient(url, publishableKey, options)
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error || !data.session) throw new AppError(error?.status === 429 ? 'RATE_LIMITED' : !error?.status || error.status >= 500 ? 'AUTH_PROVIDER_UNAVAILABLE' : 'AUTH_INVALID', error?.status === 429 ? 429 : !error?.status || error.status >= 500 ? 503 : 401)
      return { access_token: data.session.access_token, refresh_token: data.session.refresh_token, expires_at: data.session.expires_at! }
    },
    async verifyToken(token): Promise<VerifiedToken> {
      const { data, error } = await verifier.auth.getClaims(token)
      const c = data?.claims
      if (error || !c || c.iss !== `${url}/auth/v1` || c.aud !== 'authenticated' || typeof c.sub !== 'string' || typeof c.session_id !== 'string' || !['aal1', 'aal2'].includes(String(c.aal))) throw unauthorized()
      return { userId: c.sub, sessionId: c.session_id, aal: c.aal as 'aal1' | 'aal2' }
    },
    factors,
    async enroll(token) {
      const data = await request('/factors', token, 'POST', { factor_type: 'totp', friendly_name: `AI Talent OS ${crypto.randomUUID().slice(0, 8)}`, issuer: 'AI Talent OS Demo' })
      return totpEnrollment(data)
    },
    async removePending(token, factorId) {
      const factor = (await factors(token)).find(f => f.id === factorId)
      if (!factor || factor.status !== 'unverified' || factor.factor_type !== 'totp') throw new AppError('FACTOR_NOT_PENDING', 403)
      await request(`/factors/${encodeURIComponent(factorId)}`, token, 'DELETE')
    },
    async challenge(token, factorId) {
      const data = await request(`/factors/${encodeURIComponent(factorId)}/challenge`, token, 'POST', {})
      if (typeof data.id !== 'string' || typeof data.expires_at !== 'number') throw new AppError('AUTH_PROVIDER_UNAVAILABLE', 503)
      return { id: data.id, expiresAt: new Date(data.expires_at * 1000) }
    },
    async verify(token, factorId, challengeId, code) { return pair(await request(`/factors/${encodeURIComponent(factorId)}/verify`, token, 'POST', { challenge_id: challengeId, code })) },
    async signOut(token) { await request('/logout?scope=local', token, 'POST') },
  }
}

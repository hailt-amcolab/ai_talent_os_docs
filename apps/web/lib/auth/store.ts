import type { Session } from '@supabase/supabase-js'
import { authClient } from './client.ts'
import { authApi, type AuthSession, type AuthState } from '../api/auth.ts'
import { ApiError } from '../api/client.ts'
import { currentSubscription, unsubscribePush } from '../pwa/push.ts'
import { pwaApi } from '../api/pwa.ts'

type Snapshot = { status: 'loading' | 'anonymous' | 'authenticated' | 'error'; auth: AuthState | null; error: string | null }
const initial: Snapshot = { status: 'loading', auth: null, error: null }
let snapshot = initial, session: Session | null = null, initialized = false, revision = 0
const listeners = new Set<() => void>()
const emit = (next: Snapshot) => { snapshot = next; listeners.forEach(fn => fn()) }
export const authSnapshot = () => snapshot
export const serverAuthSnapshot = () => initial
export const subscribeAuth = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn) } }
export async function token() {
  const result = await authClient().auth.getSession()
  if (!result.data.session) throw new ApiError(401, 'AUTH_REQUIRED')
  session = result.data.session
  return session.access_token
}
export async function syncAuth() {
  const current = ++revision
  try {
    const result = await authClient().auth.getSession()
    session = result.data.session
    if (!session) { if (current === revision) emit({ status: 'anonymous', auth: null, error: null }); return }
    const auth = await authApi.state(session.access_token)
    if (current === revision) emit({ status: 'authenticated', auth, error: null })
  } catch (e) {
    if (current !== revision) return
    if (e instanceof ApiError && [401, 403].includes(e.status)) {
      session = null
      emit({ status: 'anonymous', auth: null, error: e.code })
    } else emit({ status: 'error', auth: null, error: e instanceof ApiError ? e.code : 'AUTH_NOT_CONFIGURED' })
  }
}
export function startAuth() {
  if (initialized) return
  initialized = true
  try {
    authClient().auth.onAuthStateChange((_event, next) => {
      session = next
      // Never await SDK methods inside its state-change callback (SDK lock).
      setTimeout(() => { void syncAuth() }, 0)
    })
    window.addEventListener('online', () => { void syncAuth() })
    window.addEventListener('offline', () => { ++revision; emit({ status: 'error', auth: null, error: 'NETWORK_ERROR' }) })
    void syncAuth()
  } catch { emit({ status: 'error', auth: null, error: 'AUTH_NOT_CONFIGURED' }) }
}
export async function acceptSession(result: AuthSession) {
  const { error } = await authClient().auth.setSession(result.session)
  if (error) throw new ApiError(401, 'AUTH_REQUIRED')
  emit({ status: 'authenticated', auth: result.auth, error: null })
}
export async function logout() {
  const jwt = await token()
  const sub = await currentSubscription()
  if (sub) await pwaApi.unsubscribe(jwt, sub.endpoint) // Server detach BEFORE browser unsubscribe/logout.
  await authApi.logout(jwt)
  await unsubscribePush()
  const { error } = await authClient().auth.signOut({ scope: 'local' })
  if (error) throw new ApiError(0, 'NETWORK_ERROR')
  session = null
  ++revision
  if ('clearAppBadge' in navigator) await navigator.clearAppBadge()
  emit({ status: 'anonymous', auth: null, error: null })
}

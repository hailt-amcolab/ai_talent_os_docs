'use client'
import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authSnapshot, serverAuthSnapshot, startAuth, subscribeAuth } from '@/lib/auth/store'
import { t } from '@/lib/messages'
export function useAuth() {
  const value = useSyncExternalStore(subscribeAuth, authSnapshot, serverAuthSnapshot)
  useEffect(() => { startAuth() }, [])
  return value
}
export function AuthBoundary({ children }: { children: ReactNode }) {
  const auth = useAuth(), router = useRouter()
  const allowed = auth.status === 'authenticated' && auth.auth?.state === 'ready'
  useEffect(() => {
    if (auth.status === 'anonymous') window.location.replace('/pwa/login')
    else if (auth.status === 'authenticated' && !allowed && auth.auth) window.location.replace(auth.auth.allowedNextRoute)
  }, [auth, allowed, router])
  if (!allowed) return <main><h1>{t.common.loading}</h1>{auth.status === 'error' && <p role="alert">{t.demo.errors[auth.error ?? ''] ?? t.common.retry}</p>}<Link href={'/pwa/login'}>{t.demo.login}</Link></main>
  return children
}

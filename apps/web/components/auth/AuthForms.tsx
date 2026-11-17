'use client'
import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { authApi } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/client'
import { acceptSession } from '@/lib/auth/store'
import { useAuth } from './AuthBoundary'
import { markBusy } from '@/lib/pwa/busy'
import { t } from '@/lib/messages'
export function errorText(error: unknown) { return error instanceof ApiError ? t.demo.errors[error.code] ?? t.common.retry : t.common.retry }
export function DemoHeader() { return <header><p className="auth-eyebrow">{t.demo.eyebrow}</p><p className="auth-warning">{t.demo.notice}</p></header> }
export function LoginForm() { return <CredentialsForm register={false} /> }
export function RegisterForm() { return <CredentialsForm register /> }
function CredentialsForm({ register }: { register: boolean }) {
  const auth = useAuth(), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState('')
  useEffect(() => { if (busy) return markBusy() }, [busy])
  useEffect(() => { if (auth.status === 'authenticated' && auth.auth) window.location.replace(auth.auth.allowedNextRoute) }, [auth])
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(''); setNotice('')
    const data = new FormData(e.currentTarget), email=String(data.get('email')), password=String(data.get('password'))
    try {
      if (register) {
        if (password !== String(data.get('confirmation'))) { setError(t.demo.passwordMismatch); return }
        const result=await authApi.register(email, password)
        if (!result.session || !result.auth) { setNotice(t.demo.confirmEmail); return }
        await acceptSession({ session: result.session, auth: result.auth }); window.location.replace(result.auth.allowedNextRoute)
      } else { const result=await authApi.login(email, password); await acceptSession(result); window.location.replace(result.auth.allowedNextRoute) }
    } catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  return <main><DemoHeader /><h1>{register ? t.demo.register : t.demo.login}</h1><p>{t.demo.loginHelp}</p><form className="card" onSubmit={submit}>
    <label htmlFor="email">{t.demo.email}</label><input id="email" name="email" type="email" autoComplete="username" required />
    <label htmlFor="password">{t.demo.password}</label><input id="password" name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 8 : 1} maxLength={256} required />
    {register && <><label htmlFor="confirmation">{t.demo.confirmation}</label><input id="confirmation" name="confirmation" type="password" autoComplete="new-password" required /><p>{t.demo.passwordHelp}</p></>}
    <button className="auth-primary" disabled={busy}>{busy ? t.common.loading : register ? t.demo.register : t.demo.login}</button></form>
    {notice && <p role="status">{notice}</p>}{error && <p role="alert" className="auth-error">{error}</p>}
    {auth.status === 'error' && <p role="alert">{t.demo.errors[auth.error ?? ''] ?? t.common.retry}</p>}
    <p><Link href={register ? '/pwa/login' : '/pwa/register'}>{register ? t.demo.login : t.demo.register}</Link></p></main>
}

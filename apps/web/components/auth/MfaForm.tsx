'use client'
import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { authApi, type Enrollment, type MfaOptions } from '@/lib/api/auth'
import { acceptSession, token, logout } from '@/lib/auth/store'
import { useAuth } from './AuthBoundary'
import { DemoHeader, errorText } from './AuthForms'
import { markBusy } from '@/lib/pwa/busy'
import { t } from '@/lib/messages'

export function MfaForm() {
  const auth = useAuth()
  const [options, setOptions] = useState<MfaOptions | null>(null), [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [selected, setSelected] = useState<{ factorId: string } | null>(null)
  const [challenge, setChallenge] = useState<string | null>(null), [manual, setManual] = useState(false)
  const [busy, setBusy] = useState(false), [error, setError] = useState('')
  useEffect(() => { if (busy) return markBusy() }, [busy])
  useEffect(() => {
    if (auth.status === 'anonymous') window.location.replace('/pwa/login')
    else if (auth.auth) { let active = true; void token().then(authApi.options).then(value => { if (active) setOptions(value) }).catch(e => { if (active) setError(errorText(e)) }); return () => { active = false } }
  }, [auth])
  useEffect(() => { const hide = () => { if (document.hidden) { setEnrollment(null); setManual(false) } }; document.addEventListener('visibilitychange', hide); return () => document.removeEventListener('visibilitychange', hide) }, [])
  async function begin() {
    setBusy(true); setError('')
    try {
      const jwt = await token()
      if (selected && challenge) { const c = await authApi.challenge(jwt, selected.factorId); setChallenge(c.challengeRef); return }
      const factor = options?.factors.find(f => f.status === 'verified')
      if (factor) { setSelected({ factorId: factor.factorId }); const c = await authApi.challenge(jwt, factor.factorId); setChallenge(c.challengeRef) }
      else { const e = await authApi.enroll(jwt); setEnrollment(e); setSelected({ factorId: e.factorId }); const c = await authApi.challenge(jwt, e.factorId); setChallenge(c.challengeRef); setOptions(await authApi.options(jwt)) }
    } catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  async function verify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!challenge) return
    const form = e.currentTarget, code = String(new FormData(form).get('code')); setBusy(true); setError('')
    try { const result = await authApi.verify(await token(), selected!.factorId, challenge, code); setEnrollment(null); setManual(false); form.reset(); await acceptSession(result); window.location.replace(result.auth.allowedNextRoute) }
    catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  async function reset(factorId: string) {
    setBusy(true); setError('')
    try { await authApi.removePending(await token(), factorId); setEnrollment(null); setManual(false); setChallenge(null); setSelected(null); setOptions(await authApi.options(await token())) }
    catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  const verified = options?.factors.some(f => f.status === 'verified')
  return <main><DemoHeader /><h1>{t.demo.mfaTitle}</h1><p>{t.demo.mfaHelp}</p>
    {options && !challenge && (verified || options.enrollmentAllowed) && <button onClick={begin} disabled={busy}>{verified ? t.demo.startChallenge : t.demo.enroll}</button>}
    {options && !verified && !options.enrollmentAllowed && <p>{t.demo.noFactor}</p>}
    {enrollment && <section className="card"><p>{t.demo.qrHelp}</p><div className="auth-qr"><Image unoptimized src={enrollment.qr} alt={t.demo.qrAlt} width={256} height={256} /></div>
      <button type="button" onClick={() => setManual(!manual)}>{manual ? t.demo.hideSecret : t.demo.showSecret}</button>{manual && <code className="auth-key">{enrollment.secret}</code>}</section>}
    {challenge && <p><button className="auth-secondary" disabled={busy} onClick={begin}>{t.demo.restartChallenge}</button></p>}
    {challenge && <form className="card" onSubmit={verify}><label htmlFor="code">{t.demo.code}</label><input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required /><button className="auth-primary" disabled={busy}>{t.demo.verify}</button></form>}
    {options?.enrollmentAllowed && options.factors.filter(f => f.status === 'unverified').map(f => <p key={f.factorId}><button className="auth-secondary" disabled={busy} onClick={() => reset(f.factorId)}>{t.demo.resetSetup}</button></p>)}
    {error && <p role="alert" className="auth-error">{error}</p>}<p><button className="auth-secondary" disabled={busy} onClick={() => logout().then(() => window.location.replace('/pwa/login')).catch(e => setError(errorText(e)))}>{t.demo.logout}</button></p>
  <p><Link href="/pwa/home">{t.demo.dashboard}</Link></p></main>
}

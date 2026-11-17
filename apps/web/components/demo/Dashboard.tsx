'use client'
import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AuthBoundary, useAuth } from '@/components/auth/AuthBoundary'
import { DemoHeader, errorText } from '@/components/auth/AuthForms'
import { InstallGuide } from '@/components/pwa/InstallGuide'
import { PushToggle } from '@/components/pwa/PushToggle'
import { token, logout } from '@/lib/auth/store'
import { pwaApi } from '@/lib/api/pwa'
import { markBusy } from '@/lib/pwa/busy'
import { t } from '@/lib/messages'
import type { components } from '@/lib/api/schema'
function Content() {
  const auth=useAuth(), [devices, setDevices]=useState<components['schemas']['PushDeviceList'] | null>(null)
  const [error,setError]=useState(''), [result,setResult]=useState<components['schemas']['PushTestResult'] | null>(null), [busy,setBusy]=useState(false)
  useEffect(() => { if (busy) return markBusy() }, [busy])
  async function load() { try { setDevices(await pwaApi.devices(await token())) } catch(e) { setError(errorText(e)) } }
  useEffect(() => { let active=true; void token().then(pwaApi.devices).then(d => { if(active) setDevices(d) }).catch(e => { if(active) setError(errorText(e)) }); return () => { active=false } }, [])
  async function send(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setError(''); setResult(null); const recipient=String(new FormData(e.currentTarget).get('recipient')); try { setResult(await pwaApi.test(await token(), recipient)) } catch(e) { setError(errorText(e)) } finally { setBusy(false) } }
  return <main><DemoHeader /><div className="notification-toolbar"><h1>{t.demo.dashboard}</h1><button onClick={() => logout().then(() => window.location.replace('/pwa/login')).catch(e => setError(errorText(e)))}>{t.demo.logout}</button></div>
    <section className="card"><p>{auth.auth?.email}</p><p>{t.demo.receiverCode}</p><code className="auth-key" id="receiver-code">{auth.auth?.userId}</code><p>{t.demo.shareReceiver}</p><p><Link href="/pwa/mfa">{auth.auth?.totpEnabled ? t.demo.mfaTitle : t.demo.enroll}</Link> · {auth.auth?.currentAal}</p></section>
    <section className="card"><h2>{t.home.installHeading}</h2><InstallGuide /></section>
    <section className="card"><h2>{t.home.pushHeading}</h2><PushToggle /><p><button onClick={load}>{t.demo.refreshDevices}</button></p>{devices?.items.map(d => <p key={d.id}>{d.label}{d.current ? t.demo.thisDevice : ''} · <time dateTime={d.updatedAt}>{new Date(d.updatedAt).toLocaleString('ja-JP')}</time></p>)}</section>
    <form className="card" onSubmit={send}><h2>{t.demo.testPush}</h2><p>{t.demo.crossDeviceHelp}</p><label htmlFor="recipient">{t.demo.recipient}</label><input id="recipient" name="recipient" defaultValue={auth.auth?.userId} required pattern="[0-9a-fA-F-]{36}" /><button className="auth-primary" disabled={busy || !devices?.configured}>{busy ? t.common.loading : t.demo.sendPush}</button></form>
    {result && <section className="card" role="status"><p>{t.demo.pushResult}: {result.accepted}/{result.targeted}</p><p>{t.demo.pushFailed}: {result.failed} · {t.demo.pushGone}: {result.gone}</p><p>{t.demo.providerAccepted}</p></section>}{error && <p role="alert" className="auth-error">{error}</p>}</main>
}
export function Dashboard() { return <AuthBoundary><Content /></AuthBoundary> }

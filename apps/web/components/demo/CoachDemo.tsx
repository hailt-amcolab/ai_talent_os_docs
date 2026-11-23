'use client'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AuthBoundary } from '@/components/auth/AuthBoundary'
import { DemoHeader, errorText } from '@/components/auth/AuthForms'
import { token } from '@/lib/auth/store'
import { coachApi, type CoachConversation } from '@/lib/api/coach'
import { t } from '@/lib/messages'

// AI Core demo (report §9.1): POST saves the message and returns at once; the worker answers later.
// The page polls with backoff while something is pending/running, and stops polling once everything is settled.
const OPEN = new Set(['pending', 'running'])

function Content() {
  const [data, setData] = useState<CoachConversation | null>(null)
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [slow, setSlow] = useState(false)
  const [simulate, setSimulate] = useState(false) // demo: no AI call
  const [notice, setNotice] = useState('')
  const pendingKey = useRef<string | null>(null) // same key if the user retries the same send after a network error

  const load = useCallback(() => token().then(coachApi.conversation).then(d => { setData(d); setError('') }).catch(e => setError(errorText(e))), [])
  useEffect(() => { void load() }, [load])

  const waiting = data?.executions.some(e => OPEN.has(e.state)) ?? false
  useEffect(() => {
    if (!waiting) return
    let delay = 1000, stopped = false, timer: ReturnType<typeof setTimeout>
    const started = Date.now()
    const tick = () => { timer = setTimeout(async () => { await load(); if (Date.now() - started > 60_000) setSlow(true); delay = Math.min(delay * 1.5, 5000); if (!stopped) tick() }, delay) }
    tick()
    return () => { stopped = true; clearTimeout(timer); setSlow(false) }
  }, [waiting, load])

  async function send(e: FormEvent) {
    e.preventDefault()
    const body = text.trim()
    if (!body) return
    setSending(true)
    pendingKey.current ??= crypto.randomUUID()
    try {
      await coachApi.send(await token(), pendingKey.current, body, simulate)
      pendingKey.current = null
      setText('')
      await load()
    } catch (err) { setError(errorText(err)) } finally { setSending(false) }
  }
  // Morning message test (coach.daily_themes): today, or tomorrow to run again on the same day. JST dates.
  async function runMorning(daysAhead: number) {
    const day = new Date(Date.now() + 9 * 3_600_000 + daysAhead * 86_400_000).toISOString().slice(0, 10)
    setError(''); setSending(true)
    try { await coachApi.runMorning(await token(), daysAhead ? day : undefined, simulate); await load() } catch (err) { setError(errorText(err)) } finally { setSending(false) }
  }
  async function resetToday() {
    if (!window.confirm(t.coach.resetConfirm)) return
    setError(''); setNotice(''); setSending(true)
    try { const r = await coachApi.resetMorning(await token()); setNotice(t.coach.resetDone(r.runs, r.themes)); await load() } catch (err) { setError(errorText(err)) } finally { setSending(false) }
  }
  async function close(id: string) {
    try { await coachApi.close(await token(), id); await load() } catch (err) { setError(errorText(err)) }
  }

  const byInput = new Map(data?.executions.map(e => [e.inputMessageId, e]) ?? [])
  return <main><DemoHeader />
    <div className="notification-toolbar"><h1>{t.coach.title}</h1><Link href="/pwa/home">{t.onedrive.back}</Link></div>
    <section className="card"><p>{t.coach.help}</p></section>
    <section className="card">
      <h2>{t.coach.morningTitle}</h2><p className="muted">{t.coach.morningHelp}</p>
      <p><label><input type="checkbox" checked={simulate} onChange={e => setSimulate(e.target.checked)} /> {t.coach.simulate}</label></p>
      <p><button disabled={sending} onClick={() => { void runMorning(0) }}>{t.coach.runToday}</button> <button disabled={sending} onClick={() => { void runMorning(1) }}>{t.coach.runTomorrow}</button> <button disabled={sending} onClick={() => { void resetToday() }}>{t.coach.reset}</button></p>
      {notice && <p className="muted" role="status">{notice}</p>}
      {(() => {
        const last = data?.executions.find(e => e.inputMessageId === null) // newest first
        if (!last || last.state === 'succeeded') return null
        return <>
          <p className="muted" role="status">{OPEN.has(last.state) ? t.coach.morningStarted : `${t.coach.state[last.state]}${last.errorCode ? ` ${t.coach.errorCode(last.errorCode)}` : ''}`}</p>
          {last.state === 'unknown' && <button onClick={() => { void close(last.id) }}>{t.coach.close}</button>}
        </>
      })()}
    </section>
    {data?.themesDay && data.themes.length > 0 && <section className="card">
      <h2>{t.coach.themesTitle(data.themesDay)}</h2>
      <ol>{data.themes.map(th => <li key={th.id}>{th.content}</li>)}</ol>
    </section>}
    {data?.messages.map(m => {
      const ex = m.sender === 'talent' ? byInput.get(m.id) : undefined
      return <section key={m.id} className="card">
        <p className="muted">{m.sender === 'talent' ? t.coach.you : t.coach.coach}</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{m.body}</p>
        {ex && ex.state !== 'succeeded' && <p className="muted" role="status">{t.coach.state[ex.state]}{ex.errorCode ? ` ${t.coach.errorCode(ex.errorCode)}` : ''}</p>}
        {ex?.state === 'unknown' && <button onClick={() => { void close(ex.id) }}>{t.coach.close}</button>}
      </section>
    })}
    {slow && <p className="muted" role="status">{t.coach.slow}</p>}
    {error && <p role="alert">{error}</p>}
    <form className="card" onSubmit={send}>
      <label htmlFor="coach-text">{t.coach.placeholder}</label>
      <textarea id="coach-text" value={text} maxLength={1000} rows={3} onChange={e => { setText(e.target.value); pendingKey.current = null }} />
      <button type="submit" disabled={sending || !text.trim()}>{sending ? t.coach.sending : t.coach.send}</button>
    </form>
  </main>
}

export function CoachDemo() { return <AuthBoundary><Content /></AuthBoundary> }

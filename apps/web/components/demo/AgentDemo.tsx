'use client'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AuthBoundary } from '@/components/auth/AuthBoundary'
import { DemoHeader, errorText } from '@/components/auth/AuthForms'
import { token } from '@/lib/auth/store'
import { agentApi, type AgentEntry, type AgentProposal, type AgentRole, type AgentRun } from '@/lib/api/agent'
import { t } from '@/lib/messages'

// Agent demo (report §10.1): POST saves the message and returns at once; the worker runs the AI. The page polls while a run
// is pending/running, stops at waiting_confirmation, and the Manager's 保存 button is the ONLY way a change gets confirmed.
const OPEN = new Set(['pending', 'running'])
const stored = (role: AgentRole) => `agent-conversation-${role}`

function Content() {
  const [role, setRole] = useState<AgentRole>('talent')
  const [conv, setConv] = useState<string | null>(null)
  const [entries, setEntries] = useState<AgentEntry[]>([])
  const [runs, setRuns] = useState<AgentRun[]>([])
  const [proposal, setProposal] = useState<AgentProposal | null>(null)
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [slow, setSlow] = useState(false)
  const pendingKey = useRef<string | null>(null) // same key if the user retries the same send after a network error

  // Promise chains (not async bodies) so no state is set synchronously inside the effects below.
  const start = useCallback((r: AgentRole, fresh = false) => token().then(tk => {
    let key = fresh ? null : localStorage.getItem(stored(r))
    if (!key) { key = crypto.randomUUID(); localStorage.setItem(stored(r), key) }
    return agentApi.conversation(tk, r, key) // same key → same conversation after a reload
  }).then(c => { setEntries([]); setRuns([]); setProposal(null); setError(''); setConv(c.conversationId) })
    .catch(e => { setConv(null); setError(errorText(e)) }), [])
  useEffect(() => { void start(role) }, [role, start])

  const load = useCallback(() => conv ? token().then(async tk => {
    const [e, r] = await Promise.all([agentApi.entries(tk, role, conv), agentApi.runs(tk, role, conv)])
    const p = role === 'manager' ? r.items[0]?.proposalId : null
    const view = p ? await agentApi.proposal(tk, p) : null
    setEntries(e.items); setRuns(r.items); setProposal(view); setError('')
  }).catch(e => setError(errorText(e))) : Promise.resolve(), [conv, role])
  useEffect(() => { void load() }, [load])

  const latest = runs[0]
  const waiting = !!latest && OPEN.has(latest.state)
  useEffect(() => {
    if (!waiting) return
    let delay = 1000, stopped = false, timer: ReturnType<typeof setTimeout>
    const started = Date.now()
    const tick = () => { timer = setTimeout(async () => { await load(); if (Date.now() - started > 30_000) setSlow(true); delay = Math.min(delay * 1.5, 5000); if (!stopped) tick() }, delay) }
    tick()
    return () => { stopped = true; clearTimeout(timer); setSlow(false) }
  }, [waiting, load])

  const act = async (fn: (tk: string) => Promise<unknown>) => {
    setBusy(true); setError('')
    try { await fn(await token()); await load() } catch (e) { setError(errorText(e)) } finally { setBusy(false) }
  }
  async function send(e: FormEvent) {
    e.preventDefault()
    const body = text.trim()
    if (!body || !conv) return
    pendingKey.current ??= crypto.randomUUID()
    await act(async tk => { await agentApi.send(tk, role, conv, pendingKey.current!, body); pendingKey.current = null; setText('') })
  }

  return <main><DemoHeader />
    <div className="notification-toolbar"><h1>{t.agent.title}</h1><Link href="/pwa/home">{t.onedrive.back}</Link></div>
    <section className="card"><p>{t.agent.help}</p>
      <p>
        <label><input type="radio" checked={role === 'talent'} onChange={() => setRole('talent')} /> {t.agent.asTalent}</label>{' '}
        <label><input type="radio" checked={role === 'manager'} onChange={() => setRole('manager')} /> {t.agent.asManager}</label>{' '}
        <button disabled={busy} onClick={() => { void start(role, true) }}>{t.agent.newChat}</button>
      </p>
    </section>
    {entries.map(m => <section key={m.id} className="card">
      <p className="muted">{m.role === 'user' ? t.agent.you : t.agent.ai}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{m.body}</p>
    </section>)}
    {latest && latest.state !== 'succeeded' && <section className="card" role="status">
      <p className="muted">{t.agent.state[latest.state]}{latest.errorCode ? ` ${t.agent.errorCode(latest.errorCode)}` : ''}</p>
      {(OPEN.has(latest.state) || latest.state === 'waiting_confirmation') && <button disabled={busy} onClick={() => { void act(tk => agentApi.cancel(tk, role, latest.id)) }}>{t.agent.cancel}</button>}
    </section>}
    {proposal && (proposal.allowedActions.length > 0 || latest?.state === 'waiting_confirmation') && <section className="card">
      <h2>{t.agent.proposal(proposal.targetLabel)}</h2>
      <table><thead><tr><th>{t.agent.field}</th><th>{t.agent.before}</th><th>{t.agent.after}</th></tr></thead>
        <tbody>{proposal.changes.map(c => <tr key={c.field}><td>{c.field}</td><td style={{ whiteSpace: 'pre-wrap' }}>{c.before ?? '—'}</td><td style={{ whiteSpace: 'pre-wrap' }}>{c.after ?? '—'}</td></tr>)}</tbody></table>
      <p className="muted">{t.agent.expires(new Date(proposal.expiresAt).toLocaleString())} · {t.agent.decided(proposal.state)}</p>
      <p>
        {proposal.allowedActions.includes('confirm') && <button disabled={busy} onClick={() => { void act(tk => agentApi.confirm(tk, proposal.proposalId, proposal.proposalHash)) }}>{t.agent.confirm}</button>}{' '}
        {proposal.allowedActions.includes('reject') && <button disabled={busy} onClick={() => { void act(tk => agentApi.reject(tk, proposal.proposalId)) }}>{t.agent.reject}</button>}
        {proposal.allowedActions.includes('commit') && <button disabled={busy} onClick={() => { void act(tk => agentApi.commit(tk, proposal.proposalId)) }}>{t.agent.commit}</button>}
      </p>
    </section>}
    {latest?.receipts.map(r => <p key={r.commandId} className="muted" role="status">{t.agent.saved(r.targetLabel, r.resourceVersion)}</p>)}
    {slow && <p className="muted" role="status">{t.agent.slow}</p>}
    {error && <p role="alert">{error}</p>}
    <form className="card" onSubmit={send}>
      <label htmlFor="agent-text">{t.agent.placeholder}</label>
      <textarea id="agent-text" value={text} maxLength={1000} rows={3} onChange={e => { setText(e.target.value); pendingKey.current = null }} />
      <button type="submit" disabled={busy || !conv || !text.trim() || waiting}>{busy ? t.agent.sending : t.agent.send}</button>
    </form>
  </main>
}

export function AgentDemo() { return <AuthBoundary><Content /></AuthBoundary> }

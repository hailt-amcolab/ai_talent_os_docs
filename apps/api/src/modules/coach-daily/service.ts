import { randomUUID } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import { ref } from '../../ai/prompts/registry.ts'
import { runTask, type TaskClient, type TaskUsage } from '../../ai/tasks/define.ts'
import { dailyTopics } from '../../ai/tasks/daily-topics.ts'
import { readTalentContext } from '../coach-config/reader.ts'

// Morning themes (UC-AI-04) as AI Task + Workflow (agent_spec/ai-core/AI_CORE_ARCHITECTURE.md §9.4). The scheduler only
// creates intent in the DB (operation + outbox + ai_task_runs, idempotent per Talent and Japan date); the worker runs it.
// ponytail: one slot per day at a fixed prep time; the morning/noon/evening bands and cadence from the AI instructions
// (KS 確認14/18/19) replace this when the coach schedule settings exist.
export const TASK_EVENT = 'ai.task.requested'
// Every AI task shares the event type and ai_task_runs: this service only ever touches its own task_key (HUONG_DAN_MO_RONG.md §3).
const TASK_KEY = 'task.daily_topics'
const LEASE_SECONDS = 120, MAX_ATTEMPTS = 3
export type DailyConfig = { prepHourJst: number; deadlineHourJst: number; model: string; timeoutMs: number; price: { inputPerMTok: number; outputPerMTok: number; currency: string } | null }
const jstDate = (d: Date) => new Date(d.getTime() + 9 * 3_600_000).toISOString().slice(0, 10)
const jstHour = (d: Date) => new Date(d.getTime() + 9 * 3_600_000).getUTCHours()

export class DailyTopicsService {
  private readonly db: Database; private readonly client: TaskClient; private readonly cfg: DailyConfig
  constructor(db: Database, client: TaskClient, cfg: DailyConfig) { this.db = db; this.client = client; this.cfg = cfg }

  // In-use Talents with a ready profile (PROFILE_NOT_READY: no themes) get one task per Japan date, after the prep hour.
  // `only`: limit to some Talents (operator re-run for one Talent; tests on a shared DB).
  async schedule(now = new Date(), only?: string[]): Promise<number> {
    const hour = jstHour(now)
    if (hour < this.cfg.prepHourJst || hour >= this.cfg.deadlineHourJst) return 0
    const date = jstDate(now)
    const due = await this.db.$queryRaw<Array<{ id: string }>>`SELECT t.id::text FROM public.talents t JOIN app_private.talent_profiles p ON p.talent_id=t.id
      WHERE t.status='in_use' AND coalesce(trim(p.profile->>'profile'),'')<>'' AND (${only ?? null}::uuid[] IS NULL OR t.id=ANY(${only ?? null}::uuid[]))
        AND NOT EXISTS (SELECT 1 FROM app_private.domain_operations o WHERE o.operation_key='ai.task:daily_topics:'||t.id::text||':'||${date})`
    let created = 0
    for (const t of due) created += await this.db.$transaction(async tx => {
      const [op] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.domain_operations(operation_key,kind,talent_id,payload_hash)
        VALUES(${`ai.task:daily_topics:${t.id}:${date}`},'ai.task',${t.id}::uuid,${'0'.repeat(64)}) ON CONFLICT (operation_key) DO NOTHING RETURNING id::text`
      if (!op) return 0
      const [ev] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,1,${TASK_EVENT}) RETURNING id::text`
      await tx.$executeRaw`INSERT INTO app_private.ai_task_runs(operation_id,event_id,task_key,talent_id,input) VALUES(${op.id}::uuid,${ev.id}::uuid,${TASK_KEY},${t.id}::uuid,${JSON.stringify({ date })}::jsonb)`
      return 1
    })
    return created
  }

  async leaseDue(limit: number) {
    return (await this.db.$queryRaw<Array<{ id: string; delivery_sequence: bigint; lease_token: string }>>`
      UPDATE app_private.outbox_events o SET state='leased',lease_token=gen_random_uuid(),lease_until=now()+interval '15 seconds',delivery_sequence=o.delivery_sequence+1,attempts=o.attempts+1,updated_at=now()
      WHERE o.id IN (SELECT o2.id FROM app_private.outbox_events o2 JOIN app_private.ai_task_runs r ON r.event_id=o2.id AND r.state='pending' AND r.task_key=${TASK_KEY}
        WHERE o2.state='pending' AND o2.event_type=${TASK_EVENT} AND o2.available_at<=now() AND o2.next_dispatch_at<=now() ORDER BY o2.next_dispatch_at,o2.id LIMIT ${limit} FOR UPDATE OF o2 SKIP LOCKED)
      RETURNING o.id::text,o.delivery_sequence,o.lease_token::text`).map(r => ({ eventId: r.id, sequence: r.delivery_sequence, token: r.lease_token }))
  }
  async releaseDispatch(eventId: string, token: string, outcome: 'enqueued' | 'failed' | 'still_queued') {
    await this.db.$executeRaw`UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,updated_at=now(),delivery_sequence=delivery_sequence-${outcome === 'still_queued' ? 1 : 0}::int,
      last_dispatched_at=CASE WHEN ${outcome === 'enqueued'} THEN now() ELSE last_dispatched_at END, next_dispatch_at=now()+(${outcome === 'failed' ? 5 : 60}::int * interval '1 second')
      WHERE id=${eventId}::uuid AND state='leased' AND lease_token=${token}::uuid`
  }

  // One job = one task run. Idempotent: a finished run is never redone; the themes insert ignores duplicates.
  async run(eventId: string, now = new Date()): Promise<string> {
    const token = randomUUID()
    const [r] = await this.db.$queryRaw<Array<{ id: string; operation_id: string; talent_id: string; input: { date: string }; attempts: number }>>`
      UPDATE app_private.ai_task_runs SET state='running',lease_token=${token}::uuid,lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),attempts=attempts+1,version=version+1
      WHERE event_id=${eventId}::uuid AND state='pending' AND task_key=${TASK_KEY} RETURNING id::text,operation_id::text,talent_id::text,input,attempts`
    if (!r) return 'nothing'
    const end = (state: 'succeeded' | 'failed' | 'pending', code: string | null, extra: { output?: unknown; usage?: TaskUsage[]; themes?: string[]; prompt?: string } = {}) => this.db.$transaction(async tx => {
      const [own] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.ai_task_runs WHERE id=${r.id}::uuid AND state='running' AND lease_token=${token}::uuid FOR UPDATE`
      if (!own) return false
      for (const u of extra.usage ?? []) await tx.$executeRaw`INSERT INTO public.ai_usage_events(talent_id,model,input_tokens,output_tokens,cost_amount,cost_currency,task_run_id,request_ref,cached_input_tokens,reasoning_tokens,payer,task_key)
        VALUES(${r.talent_id}::uuid,${this.cfg.model},${u.inputTokens},${u.outputTokens},${this.cost(u)?.amount ?? null},${this.cost(u)?.currency ?? null},${r.id}::uuid,${u.requestRef},${u.cachedTokens},${u.reasoningTokens},'adesso',${TASK_KEY})`
      for (const [i, content] of (extra.themes ?? []).entries()) await tx.$executeRaw`INSERT INTO public.theme_suggestions(talent_id,suggested_on,position,content)
        VALUES(${r.talent_id}::uuid,${r.input.date}::date,${i + 1},${content}) ON CONFLICT (talent_id,suggested_on,position) DO NOTHING`
      await tx.$executeRaw`UPDATE app_private.ai_task_runs SET state=${state},error_code=${code},output=${extra.output === undefined ? null : JSON.stringify(extra.output)}::jsonb,
        prompt_version=coalesce(${extra.prompt ?? null},prompt_version),model=${this.cfg.model},lease_token=NULL,lease_until=NULL,finished_at=CASE WHEN ${state}<>'pending' THEN now() END,version=version+1 WHERE id=${r.id}::uuid`
      const done = state !== 'pending'
      await tx.$executeRaw`UPDATE app_private.domain_operations SET state=${state === 'succeeded' ? 'completed' : done ? 'failed' : 'running'},last_error_code=${code},version=version+1,updated_at=now() WHERE id=${r.operation_id}::uuid`
      await tx.$executeRaw`UPDATE app_private.outbox_events SET state=${state === 'succeeded' ? 'done' : done ? 'failed' : 'pending'},last_error_code=${code},updated_at=now(),
        available_at=CASE WHEN ${!done} THEN now()+interval '60 seconds' ELSE available_at END WHERE id=${eventId}::uuid`
      return true
    })
    // Too late for the morning: do not send yesterday's / a late greeting (AI_CORE_ARCHITECTURE.md §9.4).
    if (jstDate(now) !== r.input.date || jstHour(now) >= this.cfg.deadlineHourJst) { await end('failed', 'MISSED_WINDOW'); return 'MISSED_WINDOW' }
    const talent = await readTalentContext(this.db, r.talent_id)
    if (!talent || !talent.profileReady) { await end('failed', 'PROFILE_NOT_READY'); return 'PROFILE_NOT_READY' }
    const recent = (await this.db.$queryRaw<Array<{ content: string }>>`SELECT content FROM public.theme_suggestions WHERE talent_id=${r.talent_id}::uuid AND suggested_on>=${r.input.date}::date-7 AND suggested_on<${r.input.date}::date ORDER BY suggested_on DESC,position`).map(x => x.content)
    try {
      const out = await runTask(this.client, dailyTopics, { talent, date: r.input.date, recentThemes: recent }, { model: this.cfg.model, timeoutMs: this.cfg.timeoutMs })
      await end('succeeded', null, { output: out.data, usage: out.usage, themes: out.data.topics.map(x => `${x.title}|${x.angle}`), prompt: ref(dailyTopics.prompt) })
      return 'succeeded'
    } catch (e) {
      const code = e instanceof AppError ? e.code : 'TASK_FAILED', usage = (e as { usage?: TaskUsage[] }).usage ?? []
      const retry = !(e instanceof AppError) && r.attempts < MAX_ATTEMPTS // provider/network: retry later; bad output/refusal: final
      await end(retry ? 'pending' : 'failed', code, { usage })
      return retry ? 'retry' : code
    }
  }

  async reconcile(): Promise<number> {
    await this.db.$executeRaw`UPDATE app_private.outbox_events o SET state='pending',lease_token=NULL,lease_until=NULL,next_dispatch_at=now(),updated_at=now()
      FROM app_private.ai_task_runs r WHERE r.event_id=o.id AND r.task_key=${TASK_KEY} AND o.state='leased' AND o.lease_until<now() AND o.event_type=${TASK_EVENT}`
    return Number(await this.db.$executeRaw`UPDATE app_private.ai_task_runs SET state='pending',lease_token=NULL,lease_until=NULL,version=version+1 WHERE state='running' AND lease_until<now() AND task_key=${TASK_KEY}`)
  }
  private cost(u: TaskUsage) { const p = this.cfg.price; return p ? { amount: (u.inputTokens * p.inputPerMTok + u.outputTokens * p.outputPerMTok) / 1_000_000, currency: p.currency } : null }
}

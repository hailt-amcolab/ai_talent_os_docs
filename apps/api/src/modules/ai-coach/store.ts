import { createHash, randomUUID } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import { DAILY_TASK, TASK, type Turn } from './coach.ts'
import type { PostResult, Results, TalentInfo, Trends } from './context.ts'

// AI Core, Postgres side (agent_spec/AI_Talent_OS_AI_Core_Architecture_Report_v2.md §4.4–§4.6).
// Tables: coach_messages, domain_operations, outbox_events, ai_executions, ai_execution_attempts, ai_usage_events.
// A coach reply is ordered right after the talent message that produced it (not by id), in the UI and in the model history.
// Lock order in every transaction: talents → domain_operations → outbox_events → ai_executions → ai_execution_attempts.
// Every write after a claim is fenced by lease_token + attempt_no + lease_until > now() (DB clock).
export type ExecState = 'pending' | 'running' | 'succeeded' | 'failed' | 'unknown' | 'cancelled'
export type Message = { id: string; sender: 'talent' | 'coach'; body: string; createdAt: Date }
export type TaskKey = typeof TASK.key | typeof DAILY_TASK.key
export type Execution = { id: string; state: ExecState; inputMessageId: string | null; outputMessageId: string | null; errorCode: string | null; attemptNo: number }
// day: JST date of a coach.daily_themes run (from its operation key). folderId: talents.onedrive_folder_id. userId: the Talent's login (push).
// simulated: demo switch "no AI call" (task_revision ends with +simulated): the worker waits like a real call and returns sample text.
export type Claim = { executionId: string; operationId: string; eventId: string; task: TaskKey; day: string | null; simulated: boolean; userId: string; folderId: string | null; talent: TalentInfo; token: string; attemptId: string; attemptNo: number; turns: Turn[] }
export type Outcome =
  // called=false: no model call (e.g. morning message without a profile). themes: the 3 theme_suggestions of a daily run.
  | { kind: 'succeeded'; text: string; inputTokens: number | undefined; outputTokens: number | undefined; requestId?: string; called?: boolean; themes?: string[]; simulated?: boolean }
  | { kind: 'failed'; code: string; usage?: { inputTokens: number | undefined; outputTokens: number | undefined }; called?: boolean } // no valid output; called=false: model never reached
  | { kind: 'unknown'; code: string } // may have reached the provider: never re-called automatically (§4.1 step 6)
export type Price = { inputPerMTok: number; outputPerMTok: number; currency: string }

export const SIMULATED = '+simulated'
const revision = (base: string, simulate: boolean) => simulate ? base + SIMULATED : base
export const LEASE_SECONDS = 30
export const DISPATCH_LEASE_SECONDS = 15
export const REDISPATCH_SECONDS = 30
const MAX_PENDING_PER_TALENT = 5 // ponytail: infrastructure backlog guard (busy state), not a rewrite cap (DEC-0001)
const HISTORY = 30 // SCD 3-1: 30 most recent messages
const BODY_MAX = 1000

type Tx = Pick<Database, '$queryRaw' | '$executeRaw'>
type ExecRow = { id: string; state: ExecState; input_message_id: bigint | null; output_message_id: bigint | null; last_error_code: string | null; attempt_no: number }
const toExec = (r: ExecRow): Execution => ({ id: r.id, state: r.state, inputMessageId: r.input_message_id === null ? null : String(r.input_message_id), outputMessageId: r.output_message_id === null ? null : String(r.output_message_id), errorCode: r.last_error_code, attemptNo: r.attempt_no })
const toMsg = (r: { id: bigint; sender: 'talent' | 'coach'; body: string; created_at: Date }): Message => ({ id: String(r.id), sender: r.sender, body: r.body, createdAt: r.created_at })
const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')

export class AiCoachStore {
  private readonly db: Database
  private readonly price: Price | null
  constructor(db: Database, price: Price | null = null) { this.db = db; this.price = price }

  // Only an in-use Talent mapped to this login may talk to the coach (report §11.4: a login is not a Talent by itself).
  private async talentOf(tx: Tx, userId: string, lock: boolean) {
    const rows = lock
      ? await tx.$queryRaw<Array<{ id: string; status: string }>>`SELECT id::text,status FROM public.talents WHERE auth_user_id=${userId}::uuid FOR UPDATE`
      : await tx.$queryRaw<Array<{ id: string; status: string }>>`SELECT id::text,status FROM public.talents WHERE auth_user_id=${userId}::uuid`
    if (!rows[0]) throw new AppError('TALENT_REQUIRED', 403)
    return rows[0]
  }

  // §4.1 step 1: message + operation + outbox event + pending execution in ONE transaction. No Redis here.
  async submit(userId: string, requestKey: string, body: string, simulate = false): Promise<Execution> {
    const text = body.trim()
    if (!text || text.length > BODY_MAX) throw new AppError('MESSAGE_INVALID', 422)
    const hash = sha256(text)
    return this.db.$transaction(async tx => {
      const talent = await this.talentOf(tx, userId, true)
      if (talent.status !== 'in_use') throw new AppError('TALENT_NOT_ACTIVE', 409)
      const key = `coach.respond:${talent.id}:${requestKey}`
      const old = await tx.$queryRaw<Array<ExecRow & { payload_hash: string }>>`
        SELECT e.id,e.state,e.input_message_id,e.output_message_id,e.last_error_code,e.attempt_no,o.payload_hash
        FROM app_private.domain_operations o JOIN app_private.ai_executions e ON e.operation_id=o.id WHERE o.operation_key=${key}`
      if (old[0]) { if (old[0].payload_hash !== hash) throw new AppError('REQUEST_KEY_REUSED', 409); return toExec(old[0]) }
      const [{ n }] = await tx.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) AS n FROM app_private.ai_executions WHERE talent_id=${talent.id}::uuid AND state='pending'`
      if (n >= MAX_PENDING_PER_TALENT) throw new AppError('AI_BUSY', 429)
      const [msg] = await tx.$queryRaw<Array<{ id: bigint }>>`INSERT INTO public.coach_messages(talent_id,sender,body) VALUES(${talent.id}::uuid,'talent',${text}) RETURNING id`
      const [op] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.domain_operations(actor_auth_user_id,operation_key,kind,talent_id,payload_hash)
        VALUES(${userId}::uuid,${key},'coach.respond',${talent.id}::uuid,${hash}) RETURNING id::text`
      const [ev] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,1,'coach.respond') RETURNING id::text`
      const [row] = await tx.$queryRaw<ExecRow[]>`
        INSERT INTO app_private.ai_executions(operation_id,event_id,talent_id,task_key,task_revision,input_message_id)
        VALUES(${op.id}::uuid,${ev.id}::uuid,${talent.id}::uuid,${TASK.key},${revision(TASK.revision, simulate)},${msg.id})
        RETURNING id::text,state,input_message_id,output_message_id,last_error_code,attempt_no`
      return toExec(row)
    })
  }

  async conversation(userId: string): Promise<{ messages: Message[]; executions: Execution[] }> {
    const talent = await this.talentOf(this.db, userId, false)
    const messages = await this.db.$queryRaw<Array<{ id: bigint; sender: 'talent' | 'coach'; body: string; created_at: Date }>>`
      SELECT * FROM (SELECT m.id,m.sender,m.body,m.created_at,COALESCE(x.input_message_id,m.id) AS turn FROM public.coach_messages m
        LEFT JOIN app_private.ai_executions x ON x.output_message_id=m.id WHERE m.talent_id=${talent.id}::uuid ORDER BY turn DESC,m.id DESC LIMIT 50) m ORDER BY turn,id`
    const executions = await this.db.$queryRaw<ExecRow[]>`
      SELECT id::text,state,input_message_id,output_message_id,last_error_code,attempt_no FROM app_private.ai_executions
      WHERE talent_id=${talent.id}::uuid ORDER BY created_at DESC LIMIT 50`
    return { messages: messages.map(toMsg), executions: executions.map(toExec) }
  }

  async execution(userId: string, id: string): Promise<Execution> {
    const talent = await this.talentOf(this.db, userId, false)
    const rows = await this.db.$queryRaw<ExecRow[]>`
      SELECT id::text,state,input_message_id,output_message_id,last_error_code,attempt_no FROM app_private.ai_executions
      WHERE id=${id}::uuid AND talent_id=${talent.id}::uuid`
    if (!rows[0]) throw new AppError('EXECUTION_NOT_FOUND', 404)
    return toExec(rows[0])
  }

  // A person closes an unknown outcome WITHOUT calling the model again (§4.6 step 6). Attempt usage stays unknown.
  async closeUnknown(userId: string, id: string): Promise<Execution> {
    const r = await this.db.$transaction(async tx => {
      const talent = await this.talentOf(tx, userId, true)
      const ids = await tx.$queryRaw<Array<{ operation_id: string; event_id: string }>>`
        SELECT operation_id::text,event_id::text FROM app_private.ai_executions WHERE id=${id}::uuid AND talent_id=${talent.id}::uuid AND state='unknown'`
      if (!ids[0]) throw new AppError('EXECUTION_NOT_UNKNOWN', 409)
      const chain = { executionId: id, operationId: ids[0].operation_id, eventId: ids[0].event_id }
      await this.lockChain(tx, chain)
      await this.finish(tx, chain, 'failed', 'UNKNOWN_CLOSED_BY_USER')
      return talent.id
    })
    await this.nudge(r)
    return this.execution(userId, id)
  }

  // ---- Dispatcher (§4.6 steps 1–2). Holds only the outbox lease; never runs the task.
  async leaseDue(limit: number): Promise<Array<{ eventId: string; sequence: bigint; token: string; task: string }>> {
    const rows = await this.db.$queryRaw<Array<{ id: string; delivery_sequence: bigint; lease_token: string; event_type: string }>>`
      UPDATE app_private.outbox_events o SET state='leased',lease_token=gen_random_uuid(),lease_until=now()+(${DISPATCH_LEASE_SECONDS}::int * interval '1 second'),
        delivery_sequence=o.delivery_sequence+1,attempts=o.attempts+1,updated_at=now()
      WHERE o.id IN (
        SELECT o2.id FROM app_private.outbox_events o2 JOIN app_private.ai_executions e ON e.event_id=o2.id AND e.state='pending'
        WHERE o2.state='pending' AND o2.event_type IN ('coach.respond','coach.daily_themes') AND o2.available_at<=now() AND o2.next_dispatch_at<=now()
        ORDER BY o2.next_dispatch_at,o2.id LIMIT ${limit} FOR UPDATE OF o2 SKIP LOCKED)
      RETURNING o.id::text,o.delivery_sequence,o.lease_token::text,o.event_type`
    return rows.map(r => ({ eventId: r.id, sequence: r.delivery_sequence, token: r.lease_token, task: r.event_type }))
  }

  // Conditional on the same lease: if the worker already finished the event, this matches nothing (no write-back).
  // enqueued: Redis accepted a new job. failed: Redis error, retry soon. still_queued: the previous job of this event is still
  // waiting/active in Redis, so no new job was added: the sequence goes back (no hand-off happened) and we look again later.
  async releaseDispatch(eventId: string, token: string, outcome: 'enqueued' | 'failed' | 'still_queued') {
    const enqueued = outcome === 'enqueued', back = outcome === 'still_queued' ? 1 : 0
    await this.db.$executeRaw`
      UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,updated_at=now(),
        delivery_sequence=delivery_sequence-${back}::int,
        last_dispatched_at=CASE WHEN ${enqueued} THEN now() ELSE last_dispatched_at END,
        next_dispatch_at=now()+(${outcome === 'failed' ? 5 : REDISPATCH_SECONDS}::int * interval '1 second')
      WHERE id=${eventId}::uuid AND state='leased' AND lease_token=${token}::uuid`
  }

  // ---- Worker (§4.6 step 3). The job says "event X"; the OLDEST pending request of that Talent runs, not Redis order.
  async claim(eventId: string): Promise<Claim | 'busy' | 'nothing'> {
    return this.db.$transaction(async tx => {
      const owner = await tx.$queryRaw<Array<{ talent_id: string }>>`SELECT talent_id::text FROM app_private.ai_executions WHERE event_id=${eventId}::uuid`
      if (!owner[0]) return 'nothing'
      const [t] = await tx.$queryRaw<Array<{ id: string; auth_user_id: string; status: string; display_name: string; minor: boolean | null; version: number; onedrive_folder_id: string | null }>>`
        SELECT id::text,auth_user_id::text,status,display_name,(birth_date > current_date - interval '18 years') AS minor,version,onedrive_folder_id
        FROM public.talents WHERE id=${owner[0].talent_id}::uuid FOR UPDATE`
      const active = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.ai_executions WHERE talent_id=${t.id}::uuid AND state IN ('running','unknown')`
      if (active.length) return 'busy'
      const next = await tx.$queryRaw<Array<{ id: string; operation_id: string; event_id: string; input_message_id: bigint | null; task_key: TaskKey; task_revision: string; operation_key: string }>>`
        SELECT e.id::text,e.operation_id::text,e.event_id::text,e.input_message_id,e.task_key,e.task_revision,o.operation_key FROM app_private.ai_executions e
        JOIN app_private.domain_operations o ON o.id=e.operation_id
        WHERE e.talent_id=${t.id}::uuid AND e.state='pending' ORDER BY e.created_at,e.id LIMIT 1`
      if (!next[0]) return 'nothing'
      const n = next[0], ids = { executionId: n.id, operationId: n.operation_id, eventId: n.event_id }
      // Re-check the business state at run time (§13): a Talent that stopped using the app gets no AI call.
      if (t.status !== 'in_use') { await this.lockChain(tx, ids); await this.finish(tx, ids, 'failed', 'TALENT_NOT_ACTIVE'); return 'nothing' }
      await this.lockChain(tx, ids)
      await tx.$executeRaw`UPDATE app_private.domain_operations SET state='running',step='claimed',version=version+1,updated_at=now() WHERE id=${ids.operationId}::uuid AND state IN ('accepted','running')`
      const token = randomUUID()
      const [ex] = await tx.$queryRaw<Array<{ attempt_no: number }>>`
        UPDATE app_private.ai_executions SET state='running',attempt_no=attempt_no+1,lease_token=${token}::uuid,
          lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),heartbeat_at=now(),version=version+1
        WHERE id=${ids.executionId}::uuid AND state='pending' RETURNING attempt_no`
      const [attempt] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.ai_execution_attempts(execution_id,talent_id,attempt_no,lease_token)
        VALUES(${ids.executionId}::uuid,${t.id}::uuid,${ex.attempt_no},${token}::uuid) RETURNING id::text`
      // Chat: history up to its own input (replies right after their question). Morning run: the latest messages.
      const history = n.input_message_id !== null
        ? await tx.$queryRaw<Array<{ sender: 'talent' | 'coach'; body: string }>>`
          SELECT m.sender,m.body FROM public.coach_messages m LEFT JOIN app_private.ai_executions x ON x.output_message_id=m.id
          WHERE m.talent_id=${t.id}::uuid AND (m.id<=${n.input_message_id} OR x.input_message_id<${n.input_message_id})
          ORDER BY COALESCE(x.input_message_id,m.id) DESC,m.id DESC LIMIT ${HISTORY}`
        : await tx.$queryRaw<Array<{ sender: 'talent' | 'coach'; body: string }>>`
          SELECT sender,body FROM public.coach_messages WHERE talent_id=${t.id}::uuid ORDER BY id DESC LIMIT ${HISTORY}`
      return {
        ...ids, task: n.task_key, simulated: n.task_revision.endsWith(SIMULATED), day: n.task_key === DAILY_TASK.key ? n.operation_key.split(':')[2] : null, userId: t.auth_user_id, folderId: t.onedrive_folder_id,
        talent: { talentId: t.id, displayName: t.display_name, isMinor: t.minor, version: t.version }, token, attemptId: attempt.id, attemptNo: ex.attempt_no, turns: history.reverse(),
      }
    })
  }

  // Heartbeat never revives an expired lease (§4.6 step 4).
  async heartbeat(c: Claim): Promise<boolean> {
    const n = await this.db.$executeRaw`
      UPDATE app_private.ai_executions SET lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),heartbeat_at=now(),version=version+1
      WHERE id=${c.executionId}::uuid AND state='running' AND lease_token=${c.token}::uuid AND attempt_no=${c.attemptNo} AND lease_until>now() AND cancel_requested_at IS NULL`
    return n === 1
  }

  // Written BEFORE the HTTP call: from here a crash means "may have called the provider" → unknown, never re-called.
  async markCalling(c: Claim, provider: string, model: string, contextRevision: string): Promise<boolean> {
    return this.db.$transaction(async tx => {
      await this.lockChain(tx, c)
      if (!await this.holds(tx, c)) return false
      await tx.$executeRaw`UPDATE app_private.domain_operations SET step='calling',version=version+1,updated_at=now() WHERE id=${c.operationId}::uuid`
      const n = await tx.$executeRaw`
        UPDATE app_private.ai_execution_attempts SET phase='calling',provider=${provider},model=${model},context_revision=${contextRevision},call_started_at=now(),usage_state='pending'
        WHERE id=${c.attemptId}::uuid AND phase='claimed'`
      return n === 1
    })
  }

  // §4.6 step 5: output, usage and every state in one fenced transaction. false = lease lost, nothing written.
  async complete(c: Claim, o: Outcome, model: string): Promise<boolean> {
    const done = await this.db.$transaction(async tx => {
      await this.lockChain(tx, c)
      if (!await this.holds(tx, c)) return false
      const usage = o.kind === 'succeeded' ? o : o.kind === 'failed' ? o.usage : undefined
      const known = usage?.inputTokens !== undefined && usage.outputTokens !== undefined
      const priced = known && this.price && !(o.kind === 'succeeded' && o.simulated) // a simulated run costs nothing: no usage row
      const notCalled = o.kind !== 'unknown' && o.called === false
      const usageState = notCalled ? 'not_called' : o.kind === 'unknown' ? 'unknown' : priced ? 'recorded' : known ? 'pending' : 'unknown'
      let output: bigint | null = null
      if (o.kind === 'succeeded') [{ id: output }] = await tx.$queryRaw<Array<{ id: bigint }>>`INSERT INTO public.coach_messages(talent_id,sender,body) VALUES(${c.talent.talentId}::uuid,'coach',${o.text}) RETURNING id`
      if (o.kind === 'succeeded' && o.themes) for (const [i, content] of o.themes.entries()) {
        await tx.$executeRaw`INSERT INTO public.theme_suggestions(talent_id,suggested_on,position,content) VALUES(${c.talent.talentId}::uuid,${c.day}::date,${i + 1},${content})`
      }
      const phase = o.kind === 'succeeded' ? 'succeeded' : o.kind
      await tx.$executeRaw`
        UPDATE app_private.ai_execution_attempts SET phase=${phase},usage_state=${usageState},error_code=${o.kind === 'succeeded' ? null : o.code},
          input_tokens=${known ? usage!.inputTokens! : null},output_tokens=${known ? usage!.outputTokens! : null},
          provider_request_id=${o.kind === 'succeeded' ? o.requestId ?? null : null},
          call_finished_at=CASE WHEN ${o.kind !== 'unknown' && !notCalled} THEN now() END,finished_at=now()
        WHERE id=${c.attemptId}::uuid`
      if (priced) {
        const cost = (usage!.inputTokens! * this.price!.inputPerMTok + usage!.outputTokens! * this.price!.outputPerMTok) / 1_000_000
        await tx.$executeRaw`
          INSERT INTO public.ai_usage_events(talent_id,model,input_tokens,output_tokens,cost_amount,cost_currency,execution_attempt_id)
          VALUES(${c.talent.talentId}::uuid,${model},${usage!.inputTokens!},${usage!.outputTokens!},${cost},${this.price!.currency},${c.attemptId}::uuid)`
      }
      await this.finish(tx, c, o.kind, o.kind === 'succeeded' ? null : o.code, output)
      return true
    })
    if (done && o.kind !== 'unknown') await this.nudge(c.talent.talentId)
    return done
  }

  // ---- coach.daily_themes. One operation per Talent per JST day (operation_key is UNIQUE), so re-running is harmless.
  // M-17: the morning time is system_settings.morning_message_time, in JST.
  async morningDue(): Promise<{ day: string; due: boolean }> {
    const [r] = await this.db.$queryRaw<Array<{ day: string; due: boolean }>>`
      SELECT to_char((now() AT TIME ZONE 'Asia/Tokyo')::date,'YYYY-MM-DD') AS day,(now() AT TIME ZONE 'Asia/Tokyo')::time >= morning_message_time AS due
      FROM public.system_settings WHERE id=1`
    return r ?? { day: '', due: false }
  }

  // Every in-use Talent (or only this login's Talent) gets the day's morning run. Returns the executions created or found.
  async scheduleDaily(day: string, userId?: string, simulate = false): Promise<Execution[]> {
    const talents = userId
      ? [await this.talentOf(this.db, userId, false)]
      : await this.db.$queryRaw<Array<{ id: string; status: string }>>`SELECT id::text,status FROM public.talents WHERE status='in_use' ORDER BY id`
    const out: Execution[] = []
    for (const t of talents) {
      if (t.status !== 'in_use') throw new AppError('TALENT_NOT_ACTIVE', 409)
      const key = `${DAILY_TASK.key}:${t.id}:${day}`
      out.push(await this.db.$transaction(async tx => {
        const [op] = await tx.$queryRaw<Array<{ id: string }>>`
          INSERT INTO app_private.domain_operations(operation_key,kind,talent_id,payload_hash) VALUES(${key},${DAILY_TASK.key},${t.id}::uuid,${sha256(key)})
          ON CONFLICT (operation_key) DO NOTHING RETURNING id::text`
        if (!op) return toExec((await tx.$queryRaw<ExecRow[]>`
          SELECT e.id::text,e.state,e.input_message_id,e.output_message_id,e.last_error_code,e.attempt_no FROM app_private.ai_executions e
          JOIN app_private.domain_operations o ON o.id=e.operation_id WHERE o.operation_key=${key}`)[0])
        const [ev] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,1,${DAILY_TASK.key}) RETURNING id::text`
        return toExec((await tx.$queryRaw<ExecRow[]>`
          INSERT INTO app_private.ai_executions(operation_id,event_id,talent_id,task_key,task_revision) VALUES(${op.id}::uuid,${ev.id}::uuid,${t.id}::uuid,${DAILY_TASK.key},${revision(DAILY_TASK.revision, simulate)})
          RETURNING id::text,state,input_message_id,output_message_id,last_error_code,attempt_no`)[0])
      }))
    }
    return out
  }

  // 3-6 / 8-7 inputs, read-only. Days are JST. Metrics are whatever numeric fields the provider snapshot holds; nothing is filled in.
  async results(talentId: string, day: string): Promise<Results> {
    // The three reads are independent: run them together (one round trip of latency instead of three).
    const [rows, followers, goals] = await Promise.all([this.db.$queryRaw<Array<{ platform: string; published_at: Date; pub_day: string; caption: string; metrics: unknown }>>`
      SELECT d.platform,d.published_at,to_char((d.published_at AT TIME ZONE 'Asia/Tokyo')::date,'YYYY-MM-DD') AS pub_day,p.caption,
        (SELECT m.metrics FROM public.post_metric_snapshots m WHERE m.post_delivery_id=d.id ORDER BY m.captured_on DESC,m.id DESC LIMIT 1) AS metrics
      FROM public.post_deliveries d JOIN public.posts p ON p.id=d.post_id
      WHERE d.talent_id=${talentId}::uuid AND d.provider_state='published'
        AND (d.published_at AT TIME ZONE 'Asia/Tokyo')::date BETWEEN ${day}::date-14 AND ${day}::date-1
      ORDER BY d.published_at DESC LIMIT 50`,
    this.db.$queryRaw<Array<{ platform: string; count: number; prev: number | null; captured_on: string }>>`
      SELECT a.platform,f.follower_count AS count,
        (SELECT g.follower_count FROM public.follower_snapshots g WHERE g.social_account_id=a.id AND g.captured_on=f.captured_on-1) AS prev,
        to_char(f.captured_on,'YYYY-MM-DD') AS captured_on
      FROM public.social_accounts a JOIN LATERAL (SELECT * FROM public.follower_snapshots s WHERE s.social_account_id=a.id AND s.captured_on<${day}::date ORDER BY s.captured_on DESC LIMIT 1) f ON true
      WHERE a.talent_id=${talentId}::uuid AND a.status='connected' ORDER BY a.platform`,
    this.db.$queryRaw<Array<{ platform: string; target_followers: number; deadline_on: string | null; achieved: boolean }>>`
      SELECT platform,target_followers,to_char(deadline_on,'YYYY-MM-DD') AS deadline_on,achieved_at IS NOT NULL AS achieved
      FROM public.follower_goals WHERE talent_id=${talentId}::uuid ORDER BY platform`])
    const numeric = (v: unknown) => v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).filter(([, x]) => typeof x === 'number' && Number.isFinite(x))) as Record<string, number> : null
    const posts = rows.map(r => ({ platform: r.platform, publishedAt: r.published_at.toISOString(), caption: r.caption, metrics: numeric(r.metrics), day: r.pub_day }))
    const shift = (n: number) => new Date(Date.parse(day + 'T00:00:00Z') - n * 86_400_000).toISOString().slice(0, 10)
    const yesterday = shift(1), weekStart = shift(8)
    const strip = ({ day: _d, ...p }: PostResult & { day: string }): PostResult => p
    const average7d: Results['average7d'] = {}
    for (const platform of new Set(posts.map(p => p.platform))) {
      const week = posts.filter(p => p.platform === platform && p.day >= weekStart && p.day < yesterday && p.metrics)
      const keys = new Set(week.flatMap(p => Object.keys(p.metrics!)))
      const avg: Record<string, number> = {}
      for (const k of keys) { const v = week.map(p => p.metrics![k]).filter(x => x !== undefined); if (v.length) avg[k] = Math.round(v.reduce((a, b) => a + b, 0) / v.length) }
      if (Object.keys(avg).length) average7d[platform] = avg
    }
    return {
      yesterday,
      goals: goals.map(g => ({ platform: g.platform, targetFollowers: g.target_followers, deadlineOn: g.deadline_on, achieved: g.achieved })),
      yesterdayPosts: posts.filter(p => p.day === yesterday).map(strip),
      average7d,
      recentPosts: posts.slice(0, 20).map(strip),
      followers: followers.map(f => ({ platform: f.platform, count: f.count, delta: f.prev === null ? null : f.count - f.prev, capturedOn: f.captured_on })),
    }
  }

  // DEMO ONLY (migration 20261123000400 grants DELETE): remove every Talent's morning run of one day so it can run again.
  // Deletes the runs, their attempts/usage, the morning messages, the day's themes, outbox events and operations.
  // Keeps app_private.ai_daily_trends (the shared search of that day is reused; a day without trends still searches next run).
  async resetDay(day: string): Promise<{ runs: number; messages: number; themes: number }> {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw new AppError('DATE_INVALID', 422)
    const key = `${DAILY_TASK.key}:%:${day}`
    return this.db.$transaction(async tx => {
      await tx.$executeRaw`DELETE FROM public.ai_usage_events u USING app_private.ai_execution_attempts a, app_private.ai_executions e, app_private.domain_operations o
        WHERE u.execution_attempt_id=a.id AND a.execution_id=e.id AND e.operation_id=o.id AND o.operation_key LIKE ${key}`
      await tx.$executeRaw`DELETE FROM app_private.ai_execution_attempts a USING app_private.ai_executions e, app_private.domain_operations o
        WHERE a.execution_id=e.id AND e.operation_id=o.id AND o.operation_key LIKE ${key}`
      // One statement: executions go first, then the messages they pointed to (FKs are checked at the end of the statement).
      const [r] = await tx.$queryRaw<Array<{ runs: number; messages: number }>>`
        WITH gone AS (DELETE FROM app_private.ai_executions e USING app_private.domain_operations o WHERE e.operation_id=o.id AND o.operation_key LIKE ${key} RETURNING e.output_message_id),
             msgs AS (DELETE FROM public.coach_messages c USING gone WHERE c.id=gone.output_message_id RETURNING 1)
        SELECT (SELECT count(*)::int FROM gone) AS runs,(SELECT count(*)::int FROM msgs) AS messages`
      const themes = await tx.$executeRaw`DELETE FROM public.theme_suggestions WHERE suggested_on=${day}::date`
      await tx.$executeRaw`DELETE FROM app_private.outbox_events v USING app_private.domain_operations o WHERE v.operation_id=o.id AND o.operation_key LIKE ${key}`
      await tx.$executeRaw`DELETE FROM app_private.domain_operations WHERE kind='coach.daily_themes' AND operation_key LIKE ${key}`
      return { ...r, themes }
    })
  }

  // Queue figures for one day (load test): states, waiting time (created → first claim) and run time (claim → finished).
  async dayStats(day: string) {
    const key = `${DAILY_TASK.key}:%:${day}`
    const [r] = await this.db.$queryRaw<Array<Record<string, number | null>>>`
      SELECT count(*)::int AS total,
        count(*) FILTER (WHERE e.state='pending')::int AS pending, count(*) FILTER (WHERE e.state='running')::int AS running,
        count(*) FILTER (WHERE e.state='succeeded')::int AS succeeded, count(*) FILTER (WHERE e.state='failed')::int AS failed,
        count(*) FILTER (WHERE e.state='unknown')::int AS unknown,
        max(e.attempt_no)::int AS max_attempts,
        round(avg(extract(epoch FROM a.started_at-e.created_at))::numeric,1)::float AS avg_wait_s,
        round(max(extract(epoch FROM a.started_at-e.created_at))::numeric,1)::float AS max_wait_s,
        round(avg(extract(epoch FROM e.finished_at-a.started_at))::numeric,1)::float AS avg_run_s,
        round(max(extract(epoch FROM e.finished_at-a.started_at))::numeric,1)::float AS max_run_s,
        round(extract(epoch FROM max(e.finished_at)-min(e.created_at))::numeric,1)::float AS total_s
      FROM app_private.ai_executions e JOIN app_private.domain_operations o ON o.id=e.operation_id
      LEFT JOIN app_private.ai_execution_attempts a ON a.execution_id=e.id AND a.attempt_no=1
      WHERE o.operation_key LIKE ${key}`
    return r
  }

  // ---- Shared daily trends (CR-05 / Q&A No.38): one row per JST day, written once (first writer wins).
  async trends(day: string): Promise<Trends | null> {
    const [r] = await this.db.$queryRaw<Array<{ content: string; sources: Array<{ url: string; title?: string }>; model: string; created_at: Date }>>`
      SELECT content,sources,model,created_at FROM app_private.ai_daily_trends WHERE day=${day}::date`
    return r ? { day, content: r.content, sources: r.sources, source: `Postgres app_private.ai_daily_trends day=${day} (web search by ${r.model} at ${r.created_at.toISOString()})` } : null
  }
  async saveTrends(day: string, t: { content: string; sources: Array<{ url: string; title?: string }>; provider: string; model: string; inputTokens?: number; outputTokens?: number }) {
    await this.db.$executeRaw`
      INSERT INTO app_private.ai_daily_trends(day,content,sources,provider,model,input_tokens,output_tokens)
      VALUES(${day}::date,${t.content},${JSON.stringify(t.sources)}::jsonb,${t.provider},${t.model},${t.inputTokens ?? null},${t.outputTokens ?? null})
      ON CONFLICT (day) DO NOTHING`
    return this.trends(day)
  }

  // The most recent day's 3 themes (T-07 今日のテーマの候補). Latest, not "today", so a test run for a later date shows too.
  async latestThemes(userId: string): Promise<{ day: string | null; themes: Array<{ id: string; position: number; content: string }> }> {
    const talent = await this.talentOf(this.db, userId, false)
    const rows = await this.db.$queryRaw<Array<{ id: string; position: number; content: string; day: string }>>`
      SELECT id::text,position::int,content,to_char(suggested_on,'YYYY-MM-DD') AS day FROM public.theme_suggestions
      WHERE talent_id=${talent.id}::uuid AND suggested_on=(SELECT max(suggested_on) FROM public.theme_suggestions WHERE talent_id=${talent.id}::uuid) ORDER BY position`
    return { day: rows[0]?.day ?? null, themes: rows.map(({ day: _d, ...t }) => t) }
  }

  // §4.6 steps 6–7. Candidates are read without locks, then each is re-checked under the normal lock order.
  async reconcile(limit = 20): Promise<{ released: number; unknown: number; dispatch: number }> {
    const dispatch = await this.db.$executeRaw`
      UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,next_dispatch_at=now(),updated_at=now()
      WHERE state='leased' AND lease_until<now() AND event_type IN ('coach.respond','coach.daily_themes')`
    const expired = await this.db.$queryRaw<Array<{ id: string; operation_id: string; event_id: string }>>`
      SELECT id::text,operation_id::text,event_id::text FROM app_private.ai_executions WHERE state='running' AND lease_until<now() ORDER BY lease_until LIMIT ${limit}`
    let released = 0, unknown = 0
    for (const e of expired) {
      await this.db.$transaction(async tx => {
        const ids = { executionId: e.id, operationId: e.operation_id, eventId: e.event_id }
        await this.lockChain(tx, ids)
        const rows = await tx.$queryRaw<Array<{ attempt_id: string; phase: string }>>`
          SELECT a.id::text AS attempt_id,a.phase FROM app_private.ai_executions x
          JOIN app_private.ai_execution_attempts a ON a.execution_id=x.id AND a.attempt_no=x.attempt_no
          WHERE x.id=${e.id}::uuid AND x.state='running' AND x.lease_until<now() FOR UPDATE OF x`
        if (!rows[0]) return
        if (rows[0].phase === 'claimed') { // never reached the provider: safe to run again with a NEW attempt
          await tx.$executeRaw`UPDATE app_private.ai_execution_attempts SET phase='failed',error_code='LEASE_EXPIRED',finished_at=now() WHERE id=${rows[0].attempt_id}::uuid`
          await tx.$executeRaw`UPDATE app_private.ai_executions SET state='pending',lease_token=NULL,lease_until=NULL,heartbeat_at=NULL,version=version+1 WHERE id=${e.id}::uuid`
          await tx.$executeRaw`UPDATE app_private.outbox_events SET next_dispatch_at=now(),updated_at=now() WHERE id=${e.event_id}::uuid AND state='pending'`
          released++
        } else {
          await tx.$executeRaw`UPDATE app_private.ai_execution_attempts SET phase='unknown',error_code='LEASE_EXPIRED_AFTER_CALL',usage_state='unknown',finished_at=now() WHERE id=${rows[0].attempt_id}::uuid`
          await this.finish(tx, ids, 'unknown', 'LEASE_EXPIRED_AFTER_CALL')
          unknown++
        }
      })
    }
    return { released, unknown, dispatch }
  }

  private async lockChain(tx: Tx, ids: { operationId: string; eventId: string; executionId: string }) {
    await tx.$queryRaw`SELECT 1 FROM app_private.domain_operations WHERE id=${ids.operationId}::uuid FOR UPDATE`
    await tx.$queryRaw`SELECT 1 FROM app_private.outbox_events WHERE id=${ids.eventId}::uuid FOR UPDATE`
    await tx.$queryRaw`SELECT 1 FROM app_private.ai_executions WHERE id=${ids.executionId}::uuid FOR UPDATE`
  }

  private async holds(tx: Tx, c: Claim): Promise<boolean> {
    const rows = await tx.$queryRaw<unknown[]>`
      SELECT 1 FROM app_private.ai_executions WHERE id=${c.executionId}::uuid AND state='running' AND lease_token=${c.token}::uuid AND attempt_no=${c.attemptNo} AND lease_until>now()`
    return rows.length === 1
  }

  // State mapping of §4.4: execution → operation / outbox. Terminal outbox rows carry no lease (CHECK).
  private async finish(tx: Tx, ids: { operationId: string; eventId: string; executionId: string }, state: 'succeeded' | 'failed' | 'unknown', code: string | null, output: bigint | null = null) {
    const op = state === 'succeeded' ? 'completed' : state
    const ev = state === 'succeeded' ? 'done' : state
    await tx.$executeRaw`UPDATE app_private.domain_operations SET state=${op},step=NULL,last_error_code=${code},version=version+1,updated_at=now() WHERE id=${ids.operationId}::uuid`
    await tx.$executeRaw`UPDATE app_private.outbox_events SET state=${ev},lease_token=NULL,lease_until=NULL,last_error_code=${code},updated_at=now() WHERE id=${ids.eventId}::uuid`
    await tx.$executeRaw`
      UPDATE app_private.ai_executions SET state=${state},output_message_id=${output},last_error_code=${code},lease_token=NULL,lease_until=NULL,heartbeat_at=NULL,
        finished_at=CASE WHEN ${state !== 'unknown'} THEN now() END,version=version+1
      WHERE id=${ids.executionId}::uuid`
  }

  // The next request of this Talent may run now instead of waiting for its redispatch time.
  private async nudge(talentId: string) {
    await this.db.$executeRaw`
      UPDATE app_private.outbox_events o SET next_dispatch_at=now(),updated_at=now() FROM app_private.ai_executions e
      WHERE e.event_id=o.id AND e.talent_id=${talentId}::uuid AND e.state='pending' AND o.state='pending' AND o.next_dispatch_at>now()`
  }
}

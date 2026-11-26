import type { Env } from './config/env.ts'
import { connectDatabase, type Database } from './infra/database/client.ts'
import { createAuthProvider } from './infra/auth/supabase.ts'
import { AuthRepository } from './modules/auth/repository.ts'
import { AuthService } from './modules/auth/service.ts'
import { PwaService } from './modules/pwa/service.ts'
import { createOneDrive, type OneDriveRuntime } from './modules/onedrive/connections.ts'
import { UploadPostClient } from './infra/upload-post/client.ts'
import { UploadPostDemo } from './modules/upload-post/service.ts'
import OpenAI from 'openai'
import { Redis } from 'ioredis'
import { ConversationStore } from './modules/coach-conversation/store.ts'
import { redisRunEvents, type RunEvents } from './modules/coach-conversation/events.ts'
import type { TaskClient } from './ai/tasks/define.ts'
import { ProposalService } from './control/proposals.ts'
import { coachConfigHandlers } from './modules/coach-config/handlers.ts'
import { appendReceipt } from './modules/coach-conversation/items.ts'
export interface AppDeps { env: Env; db: Database; auth?: AuthService; pwa?: PwaService; onedrive?: OneDriveRuntime; uploadPost?: UploadPostDemo; agent?: AgentServices; control?: ControlServices; ai?: AiServices }
// events: live text for SSE (absent without Redis → the stream route answers 503 and the UI keeps polling).
export type AgentServices = { conversations: ConversationStore; events?: RunEvents }
// Direct AI tasks from the API process (instruction sandbox). Absent when OpenAI is not configured → 503 AI_UNAVAILABLE.
export type AiServices = { client: TaskClient; model: string }
export type ControlServices = { proposals: ProposalService }
export const controlServices = (env: Env, db: Database): ControlServices => ({ proposals: new ProposalService(db, [...coachConfigHandlers], { ttlSeconds: env.AGENT_APPROVAL_TTL_SECONDS,
  // The agent's next turn reads what the Manager saved (API_DESIGN.md §3).
  afterConfirm: (tx, p, r) => p.run_id ? appendReceipt(tx, p.run_id, `[システム] マネージャーが保存しました: ${r.targetLabel}(バージョン ${r.resultVersion})`) : Promise.resolve() }) })
export const agentServices = (db: Database, env?: Env, events?: RunEvents): AgentServices =>
  ({ conversations: new ConversationStore(db, env ? { perMinute: env.AGENT_RATE_PER_MINUTE, perDay: env.AGENT_RATE_PER_DAY } : undefined), events })
export const runEventsFor = (env: Env): RunEvents | undefined => env.REDIS_URL
  ? redisRunEvents(new Redis(env.REDIS_URL, { maxRetriesPerRequest: 1 }), new Redis(env.REDIS_URL, { maxRetriesPerRequest: null }), env.AI_QUEUE_PREFIX ?? `talentos-${env.NODE_ENV}`) : undefined
export async function createContainer(env: Env): Promise<{ deps: AppDeps; dispose: () => Promise<void> }> {
  const db = await connectDatabase(env.DATABASE_URL)
  const auth = env.ENABLE_AUTH_DEMO ? new AuthService(new AuthRepository(db), createAuthProvider(env.SUPABASE_URL!.replace(/\/$/, ''), env.SUPABASE_PUBLISHABLE_KEY!, env.DEMO_AUTO_CONFIRM_EMAIL ? env.SUPABASE_SECRET_KEY : undefined)) : undefined
  const pwa = auth ? new PwaService(db, env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY && env.VAPID_SUBJECT ? { publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY, subject: env.VAPID_SUBJECT } : null) : undefined
  const onedrive = auth ? createOneDrive(env, db) : undefined
  const uploadPost = auth && env.UPLOAD_POST_API_KEY ? new UploadPostDemo(new UploadPostClient({ apiBase: 'https://api.upload-post.com', settingsBase: 'https://app.upload-post.com', apiKey: env.UPLOAD_POST_API_KEY, timeoutMs: 15_000 })) : undefined
  // ponytail: the only Auth adapter today is the demo one; the agent waits for the production Auth factory (report §11.1).
  const agent = auth && env.ENABLE_AGENT_CORE ? agentServices(db, env, runEventsFor(env)) : undefined
  const control = auth && env.ENABLE_AGENT_CORE ? controlServices(env, db) : undefined
  const ai = control && env.OPENAI_API_KEY && env.AI_COACH_MODEL ? { client: new OpenAI({ apiKey: env.OPENAI_API_KEY, baseURL: env.OPENAI_BASE_URL }) as unknown as TaskClient, model: env.AI_COACH_MODEL } : undefined
  return { deps: { env, db, auth, pwa, onedrive, uploadPost, agent, control, ai }, dispose: () => db.$disconnect() }
}

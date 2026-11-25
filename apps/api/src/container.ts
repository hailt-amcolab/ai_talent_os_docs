import type { Env } from './config/env.ts'
import { connectDatabase, type Database } from './infra/database/client.ts'
import { createAuthProvider } from './infra/auth/supabase.ts'
import { AuthRepository } from './modules/auth/repository.ts'
import { AuthService } from './modules/auth/service.ts'
import { PwaService } from './modules/pwa/service.ts'
import { createOneDrive, type OneDriveRuntime } from './modules/onedrive/connections.ts'
import { UploadPostClient } from './infra/upload-post/client.ts'
import { UploadPostDemo } from './modules/upload-post/service.ts'
import { RunStore } from './modules/ai-coach/store.ts'
import { ChangeService } from './modules/ai-coach/changes.ts'
export interface AppDeps { env: Env; db: Database; auth?: AuthService; pwa?: PwaService; onedrive?: OneDriveRuntime; uploadPost?: UploadPostDemo; agent?: AgentServices }
export type AgentServices = { store: RunStore; changes: ChangeService }
export const agentServices = (env: Env, db: Database): AgentServices => ({ store: new RunStore(db), changes: new ChangeService(db, { ttlSeconds: env.AGENT_APPROVAL_TTL_SECONDS, writes: env.ENABLE_AGENT_WRITES }) })
export async function createContainer(env: Env): Promise<{ deps: AppDeps; dispose: () => Promise<void> }> {
  const db = await connectDatabase(env.DATABASE_URL)
  const auth = env.ENABLE_AUTH_DEMO ? new AuthService(new AuthRepository(db), createAuthProvider(env.SUPABASE_URL!.replace(/\/$/, ''), env.SUPABASE_PUBLISHABLE_KEY!, env.DEMO_AUTO_CONFIRM_EMAIL ? env.SUPABASE_SECRET_KEY : undefined)) : undefined
  const pwa = auth ? new PwaService(db, env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY && env.VAPID_SUBJECT ? { publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY, subject: env.VAPID_SUBJECT } : null) : undefined
  const onedrive = auth ? createOneDrive(env, db) : undefined
  const uploadPost = auth && env.UPLOAD_POST_API_KEY ? new UploadPostDemo(new UploadPostClient({ apiBase: 'https://api.upload-post.com', settingsBase: 'https://app.upload-post.com', apiKey: env.UPLOAD_POST_API_KEY, timeoutMs: 15_000 })) : undefined
  // ponytail: the only Auth adapter today is the demo one; the agent waits for the production Auth factory (report §11.1).
  const agent = auth && env.ENABLE_AGENT_CORE ? agentServices(env, db) : undefined
  return { deps: { env, db, auth, pwa, onedrive, uploadPost, agent }, dispose: () => db.$disconnect() }
}

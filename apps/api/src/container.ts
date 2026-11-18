import type { Env } from './config/env.ts'
import { connectDatabase, type Database } from './infra/database/client.ts'
import { createAuthProvider } from './infra/auth/supabase.ts'
import { AuthRepository } from './modules/auth/repository.ts'
import { AuthService } from './modules/auth/service.ts'
import { PwaService } from './modules/pwa/service.ts'
import { createOneDrive, type OneDriveRuntime } from './modules/onedrive/connections.ts'
export interface AppDeps { env: Env; db: Database; auth?: AuthService; pwa?: PwaService; onedrive?: OneDriveRuntime }
export async function createContainer(env: Env): Promise<{ deps: AppDeps; dispose: () => Promise<void> }> {
  const db = await connectDatabase(env.DATABASE_URL)
  const auth = env.ENABLE_AUTH_DEMO ? new AuthService(new AuthRepository(db), createAuthProvider(env.SUPABASE_URL!.replace(/\/$/, ''), env.SUPABASE_PUBLISHABLE_KEY!, env.DEMO_AUTO_CONFIRM_EMAIL ? env.SUPABASE_SECRET_KEY : undefined)) : undefined
  const pwa = auth ? new PwaService(db, env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY && env.VAPID_SUBJECT ? { publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY, subject: env.VAPID_SUBJECT } : null) : undefined
  const onedrive = auth ? createOneDrive(env, db) : undefined
  return { deps: { env, db, auth, pwa, onedrive }, dispose: () => db.$disconnect() }
}

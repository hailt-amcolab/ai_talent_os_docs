import type { Env } from './config/env.ts'
import { connectDatabase, type Database } from './infra/database/client.ts'

// Composition root: nơi DUY NHẤT tạo các phụ thuộc dùng chung (DB, client dịch vụ ngoài, service).
// server.ts (và worker sau này) gọi một lần khi khởi động; module nhận phụ thuộc qua tham số, không tự import singleton.
export interface AppDeps {
  env: Env
  db: Database
}

export async function createContainer(env: Env): Promise<{ deps: AppDeps; dispose: () => Promise<void> }> {
  const db = await connectDatabase(env.DATABASE_URL)
  return {
    deps: { env, db },
    dispose: () => db.$disconnect(),
  }
}

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.ts'
import { databaseConfig } from './config.ts'

// Một PrismaClient (một pool kết nối) cho mỗi tiến trình. Không tạo client theo từng request.
export type Database = PrismaClient

export function createDatabase(connectionString: string, options: { schema?: string; max?: number } = {}): Database {
  const adapter = new PrismaPg(databaseConfig(connectionString, options), { schema: options.schema ?? 'public' })
  return new PrismaClient({ adapter, transactionOptions: { maxWait: 10_000, timeout: 15_000 } })
}

export async function connectDatabase(connectionString: string): Promise<Database> {
  const db = createDatabase(connectionString)
  try {
    await db.$connect()
    const roles = await db.$queryRaw<Array<{ allowed: boolean }>>`
      SELECT pg_has_role(current_user, 'talent_runtime', 'USAGE')
        AND NOT EXISTS (
          SELECT 1 FROM pg_roles r
          WHERE (r.rolsuper OR r.rolbypassrls OR r.rolcreaterole OR r.rolcreatedb OR r.rolreplication)
            AND pg_has_role(current_user::regrole::oid, r.oid, 'MEMBER')
        )
        AND NOT EXISTS (
          SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
          WHERE n.nspname IN ('public', 'app_private', 'auth')
            AND pg_has_role(current_user::regrole::oid, c.relowner, 'MEMBER')
        )
        AND NOT EXISTS (
          SELECT 1 FROM pg_namespace n
          WHERE n.nspname IN ('public', 'app_private', 'auth')
            AND pg_has_role(current_user::regrole::oid, n.nspowner, 'MEMBER')
        )
        AND NOT has_schema_privilege(current_user, 'public', 'CREATE')
        AND NOT has_schema_privilege(current_user, 'app_private', 'CREATE') AS allowed
    `
    if (roles[0]?.allowed) return db
  } catch {
    await db.$disconnect()
    // Lỗi của driver có thể chứa thông tin kết nối: không in ra, chỉ báo mã lỗi.
    throw new Error('DATABASE_CONNECTION_FAILED: kiểm DATABASE_URL, mật khẩu, mạng và chứng chỉ CA; chạy npm run db:check')
  }
  await db.$disconnect()
  throw new Error('DATABASE_RUNTIME_ROLE_REQUIRED: dùng LOGIN riêng kế thừa talent_runtime; không dùng owner/migration role')
}

export async function isDatabaseReachable(db: Pick<Database, '$queryRaw'>): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

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
    await db.$queryRaw`SELECT 1`
    return db
  } catch {
    await db.$disconnect()
    // Lỗi của driver có thể chứa thông tin kết nối: không in ra, chỉ báo mã lỗi.
    throw new Error('DATABASE_CONNECTION_FAILED: kiểm DATABASE_URL, mật khẩu, mạng và chứng chỉ CA; chạy npm run db:check')
  }
}

export async function isDatabaseReachable(db: Pick<Database, '$queryRaw'>): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

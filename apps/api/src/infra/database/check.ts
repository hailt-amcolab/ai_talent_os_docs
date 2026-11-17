// npm run db:check: chỉ thử kết nối, không chạy migration, không in URL hay mật khẩu.
import { createDatabase, isDatabaseReachable } from './client.ts'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
const db = createDatabase(process.env.DATABASE_URL, { max: 1 })
try {
  const connected = await isDatabaseReachable(db)
  console.log(JSON.stringify({ connected }))
  if (!connected) process.exitCode = 1
} finally {
  await db.$disconnect()
}

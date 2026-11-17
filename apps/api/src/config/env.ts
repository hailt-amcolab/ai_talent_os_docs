import { z } from 'zod'

// Đọc và kiểm biến môi trường một lần khi khởi động. Sai hoặc thiếu thì dừng ngay, không chạy nửa vời.
// Thêm biến cho tính năng mới vào đây (kèm .env.example), không đọc process.env rải rác trong mã.
const Env = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  // Các nguồn FE được gọi API, cách nhau bằng dấu phẩy.
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000,https://localhost:3000')
    .transform((value) => value.split(',').map((s) => s.trim()).filter(Boolean)),
  // Supabase Postgres qua pooler (6543). Migration dùng DIRECT_URL, chỉ Prisma CLI đọc.
  DATABASE_URL: z.string().url(),
})

export type Env = z.infer<typeof Env>

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const parsed = Env.safeParse(source)
  if (!parsed.success) throw new Error('Biến môi trường không hợp lệ:\n' + z.prettifyError(parsed.error))
  return parsed.data
}

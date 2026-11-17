import { z } from 'zod'

// Đọc và kiểm biến môi trường một lần khi khởi động. Sai hoặc thiếu thì dừng ngay, không chạy nửa vời.
// Thêm biến cho tính năng mới vào đây (kèm .env.example), không đọc process.env rải rác trong mã.
const blank = (v: unknown) => v === '' ? undefined : v
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
  ENABLE_AUTH_DEMO: z.enum(['true', 'false']).default('false').transform(v => v === 'true'),
  DEMO_AUTO_CONFIRM_EMAIL: z.enum(['true', 'false']).default('false').transform(v => v === 'true'),
  SUPABASE_URL: z.preprocess(blank, z.string().url().optional()),
  SUPABASE_PUBLISHABLE_KEY: z.preprocess(blank, z.string().min(1).optional()),
  SUPABASE_SECRET_KEY: z.preprocess(blank, z.string().min(1).optional()),
  VAPID_PUBLIC_KEY: z.string().optional(),
  VAPID_PRIVATE_KEY: z.string().optional(),
  VAPID_SUBJECT: z.string().optional(),
}).superRefine((env, ctx) => {
  if (!env.ENABLE_AUTH_DEMO) return
  if (env.NODE_ENV === 'production') ctx.addIssue({ code: 'custom', message: 'Auth demo cannot run in production' })
  if (env.DEMO_AUTO_CONFIRM_EMAIL && !env.SUPABASE_SECRET_KEY) ctx.addIssue({code: 'custom', path: ['SUPABASE_SECRET_KEY'], message: 'Required for demo auto-confirm'})
  for (const key of ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'] as const) {
    if (!env[key]) ctx.addIssue({ code: 'custom', path: [key], message: 'Required when ENABLE_AUTH_DEMO=true' })
  }
})

export type Env = z.infer<typeof Env>

export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const parsed = Env.safeParse(source)
  if (!parsed.success) throw new Error('Biến môi trường không hợp lệ: ' + parsed.error.issues.map(i => i.path.join('.') || i.message).join(', '))
  return parsed.data
}

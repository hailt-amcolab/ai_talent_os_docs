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
  // Upload-Post connect demo (/api/v1/dev/upload-post/*). Unset → 503 UPLOAD_POST_NOT_CONFIGURED. Never sent to the browser.
  UPLOAD_POST_API_KEY: z.preprocess(blank, z.string().min(1).optional()),
  // AI Core (agent_spec/AI_Talent_OS_AI_Core_Architecture_Report_v2.md). API only writes Postgres; these are read by the WORKER (src/worker.ts).
  // Redis for BullMQ: private network only, AOF + maxmemory-policy noeviction (report §11.2).
  REDIS_URL: z.preprocess(blank, z.string().url().optional()),
  // Key prefix in Redis, one per environment so dev/staging never share jobs.
  AI_QUEUE_PREFIX: z.preprocess(blank, z.string().regex(/^[a-z0-9_-]{1,40}$/).optional()),
  OPENAI_API_KEY: z.preprocess(blank, z.string().min(1).optional()),
  // Optional: OpenAI-compatible endpoint (proxy/gateway or a local fake for smoke tests). Unset = api.openai.com.
  OPENAI_BASE_URL: z.preprocess(blank, z.string().url().optional()),
  // No default model on purpose (report §5): a missing model stops the worker with a clear error.
  AI_COACH_MODEL: z.preprocess(blank, z.string().min(1).max(100).optional()),
  // Optional price per 1M tokens: set both to write ai_usage_events; unset → token counts kept, cost stays 'pending'.
  AI_PRICE_INPUT_PER_MTOK: z.preprocess(blank, z.coerce.number().nonnegative().optional()),
  AI_PRICE_OUTPUT_PER_MTOK: z.preprocess(blank, z.coerce.number().nonnegative().optional()),
  AI_PRICE_CURRENCY: z.preprocess(blank, z.string().regex(/^[A-Z]{3}$/).default('USD')),
  // Daily trends web search (CR-05), the costly call: limit where it searches and how much it reads.
  // ponytail: default domains are Japanese SNS trend aggregators picked by the team, not a client-approved list.
  AI_TRENDS_DOMAINS: z.string().default('yutura.net,endless.app,kabo.sh,twittrend.jp,weathernews.jp')
    .transform(v => v.split(',').map(s => s.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')).filter(Boolean)).pipe(z.array(z.string()).max(100)),
  AI_TRENDS_CONTEXT_SIZE: z.enum(['low', 'medium', 'high']).default('low'),
  // Model for the trends search only (e.g. a cheaper one). Unset = AI_COACH_MODEL.
  AI_TRENDS_MODEL: z.preprocess(blank, z.string().min(1).max(100).optional()),
  // Demo "no AI call" switch: fixed wait in ms instead of the measured range (chat 3–8 s, morning 6–10 s). Unset = measured range.
  AI_SIMULATED_DELAY_MS: z.preprocess(blank, z.coerce.number().int().min(0).max(60_000).optional()),
  // Jobs processed in parallel by one worker (report §9.1 starts at 1). Each Talent stays one-at-a-time in the DB whatever this is.
  AI_WORKER_CONCURRENCY: z.coerce.number().int().min(1).max(50).default(1),
  // Development only: write every coach run's inputs (value + where it was read), full prompt and raw output to files on the
  // worker machine, one folder per Talent. Holds profile and conversation text, so production refuses it.
  AI_INPUT_AUDIT: z.enum(['true', 'false']).default('false').transform(v => v === 'true'),
  AI_INPUT_AUDIT_DIR: z.preprocess(blank, z.string().min(1).default('var/ai-input-log')),
  // OneDrive demo (Microsoft Graph). Unset mode → ONEDRIVE_NOT_CONFIGURED. Modes never fall back to each other.
  //   app       = shared organization drive, client credentials (needs a Microsoft 365 tenant with SharePoint Online)
  //   delegated = each login connects its own Microsoft account (personal Outlook/Hotmail or work), auth code + PKCE
  ONEDRIVE_AUTH_MODE: z.preprocess(blank, z.enum(['app', 'delegated']).optional()),
  ONEDRIVE_CLIENT_ID: z.preprocess(blank, z.string().min(1).optional()),
  ONEDRIVE_CLIENT_SECRET: z.preprocess(blank, z.string().min(1).optional()),
  // app: the directory (tenant) ID that owns the drive, plus the drive ID.
  ONEDRIVE_TENANT_ID: z.preprocess(blank, z.string().min(1).optional()),
  ONEDRIVE_DRIVE_ID: z.preprocess(blank, z.string().min(1).optional()),
  // delegated: authority of the sign-in (common = work + personal, consumers = personal only). Not the tenant ID.
  ONEDRIVE_AUTHORITY_TENANT: z.preprocess(blank, z.string().regex(/^(common|consumers|organizations|[A-Za-z0-9.-]{1,100})$/).default('common')),
  // Must equal the Web redirect URI in Entra exactly; it is the FE page /pwa/onedrive/callback.
  ONEDRIVE_REDIRECT_URI: z.preprocess(blank, z.string().url().optional()),
  // delegated: who may connect/disconnect the ONE main Microsoft account (comma-separated login e-mails). Empty → nobody.
  // ponytail: e-mail allowlist for the demo; the real feature checks the manager role instead.
  ONEDRIVE_ADMIN_EMAILS: z.string().default('').transform(v => v.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)),
  // 32 random bytes, base64 (openssl rand -base64 32). Seals refresh/access tokens at rest.
  ONEDRIVE_TOKEN_KEY: z.preprocess(blank, z.string().optional()),
  ONEDRIVE_ROOT_FOLDER: z.preprocess(blank, z.string().min(1).default('AI_Talent_OS_dev')),
}).superRefine((env, ctx) => {
  const need = (keys: readonly (keyof typeof env)[], why: string) => { for (const key of keys) if (!env[key]) ctx.addIssue({ code: 'custom', path: [key], message: why }) }
  if (env.ONEDRIVE_AUTH_MODE === 'app') need(['ONEDRIVE_CLIENT_ID', 'ONEDRIVE_CLIENT_SECRET', 'ONEDRIVE_TENANT_ID', 'ONEDRIVE_DRIVE_ID'], 'Required when ONEDRIVE_AUTH_MODE=app')
  if (env.ONEDRIVE_AUTH_MODE === 'delegated') {
    need(['ONEDRIVE_CLIENT_ID', 'ONEDRIVE_CLIENT_SECRET', 'ONEDRIVE_REDIRECT_URI', 'ONEDRIVE_TOKEN_KEY'], 'Required when ONEDRIVE_AUTH_MODE=delegated')
    if (env.ONEDRIVE_TOKEN_KEY && Buffer.from(env.ONEDRIVE_TOKEN_KEY, 'base64').length !== 32) ctx.addIssue({ code: 'custom', path: ['ONEDRIVE_TOKEN_KEY'], message: 'Must be 32 bytes, base64' })
    if (env.ONEDRIVE_REDIRECT_URI) {
      const u = new URL(env.ONEDRIVE_REDIRECT_URI)
      if (u.pathname !== '/pwa/onedrive/callback' || u.search || u.hash || !env.CORS_ORIGINS.includes(u.origin)) ctx.addIssue({ code: 'custom', path: ['ONEDRIVE_REDIRECT_URI'], message: 'Must be <FE origin in CORS_ORIGINS>/pwa/onedrive/callback' })
    }
  }
  if (env.AI_INPUT_AUDIT && env.NODE_ENV === 'production') ctx.addIssue({ code: 'custom', path: ['AI_INPUT_AUDIT'], message: 'Input audit files contain Talent data: not allowed in production' })
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

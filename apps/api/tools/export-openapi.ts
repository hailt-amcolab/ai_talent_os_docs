import { writeFileSync } from 'node:fs'
import { createApp } from '../src/http/app.ts'
import { loadEnv } from '../src/config/env.ts'
import type { AppDeps } from '../src/container.ts'
// Pure contract export: never connects to DB/Auth or reads local secrets.
const env = loadEnv({ DATABASE_URL: 'postgresql://unused@localhost/unused', ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'contract-only', SUPABASE_SECRET_KEY: 'contract-only' })
const app = createApp({ env, db: {} as AppDeps['db'], auth: {} as NonNullable<AppDeps['auth']>, pwa: {} as NonNullable<AppDeps['pwa']>, aiCoach: {} as NonNullable<AppDeps['aiCoach']> })
const response = await app.request('/openapi.json')
if (!response.ok) throw new Error('OpenAPI export failed')
writeFileSync(new URL('../../web/lib/api/openapi.json', import.meta.url), JSON.stringify(await response.json(), null, 2) + '\n')

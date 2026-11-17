import { createClient, type SupabaseClient } from '@supabase/supabase-js'
let client: SupabaseClient | undefined
export function authClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) throw new Error('AUTH_NOT_CONFIGURED')
  client ??= createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'ai-talent-demo-auth' } })
  return client
}

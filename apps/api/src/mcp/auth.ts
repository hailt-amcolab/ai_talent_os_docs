import type { Env } from '../config/env.ts'
import type { Database } from '../infra/database/client.ts'
import type { Capability } from '../control/access.ts'

// MCP resource-server auth (agent_spec/ai-core/API_DESIGN.md §6.1, SECURITY_DESIGN.md §5). A verifier turns an access token into
// (Manager login, OAuth client); the grant in Postgres decides capabilities and is re-read on EVERY call (revoke = immediate).
// ponytail: only the dev verifier exists; the OAuth authorization server (issuer, JWKS, audience, refresh/revoke) is chosen at
// the ChatGPT POC (VT-08) and plugs in as another TokenVerifier. Supabase app sessions are NOT MCP grants.
export type VerifiedToken = { managerUserId: string; clientId: string }
export type TokenVerifier = (token: string) => Promise<VerifiedToken | null>
export type Grant = { id: string; capabilities: Capability[] }

export function devVerifier(env: Env): TokenVerifier | null {
  if (!env.MCP_DEV_TOKENS || env.NODE_ENV === 'production') return null
  const map = new Map(env.MCP_DEV_TOKENS.split(',').map(p => p.trim()).filter(Boolean).map(p => {
    const [token, rest] = p.split('='), [managerUserId, clientId] = (rest ?? '').split(':')
    return [token, { managerUserId, clientId: clientId || 'dev-client' }] as const
  }))
  return async token => map.get(token) ?? null
}

export async function activeGrant(db: Database, t: VerifiedToken): Promise<Grant | null> {
  const [g] = await db.$queryRaw<Array<{ id: string; capabilities: Capability[] }>>`SELECT id::text,capabilities FROM app_private.mcp_grants
    WHERE manager_user_id=${t.managerUserId}::uuid AND client_id=${t.clientId} AND revoked_at IS NULL AND expires_at>now()`
  return g ?? null
}

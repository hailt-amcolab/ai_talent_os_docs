/** Server-only reference; package/driver versions must be pinned and verified. */
import 'server-only'
import postgres from 'postgres'

// Shared transaction pooler baseline, not a global cap across Vercel instances.
// URL from Dashboard Connect, runtime role has reviewed minimal grants.
export const sql = postgres(process.env.DATABASE_URL!, {
  max: 1,
  prepare: false,
  ssl: 'require',
  connect_timeout: 10,
  idle_timeout: 20,
})
// Parameterized query only. Add authorization before domain calls.
// Never set tenant context outside the transaction when using transaction pooling.
// Migration client and VPS pool have independent configuration and credentials.

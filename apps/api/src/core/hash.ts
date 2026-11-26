import { createHash } from 'node:crypto'

// Canonical JSON → hashes and context_revision (report §6.1).
export const canonical = (v: unknown): string => JSON.stringify(v, (_k, x) => x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a.localeCompare(b))) : x)
export const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')

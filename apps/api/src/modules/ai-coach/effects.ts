import { profileMarkdown, TALENT_FILES } from './context.ts'
import type { RunStore } from './store.ts'

// Provider effect worker for outbox 'agent.profile.export' (report §2 "Worker effect", §6): Postgres is the source,
// OneDrive Profile.md is an export of the LATEST profile version and is never read back.
// Safe to repeat: the write replaces the same file with the same content, so a timeout (outcome unknown) is retried, not guessed.
export type ProfileExporter = (talentFolderId: string, fileName: string, markdown: string) => Promise<string>
const MAX_ATTEMPTS = 10

export async function runEffects(store: RunStore, exporter: ProfileExporter | null, limit = 5): Promise<Record<string, number>> {
  const seen: Record<string, number> = {}
  const count = (k: string) => { seen[k] = (seen[k] ?? 0) + 1 }
  for (const e of await store.leaseEffects(limit)) {
    const backoff = Math.min(2 ** e.attempts * 5, 600)
    const retry = (code: string) => e.attempts >= MAX_ATTEMPTS ? store.endEffect(e, 'failed', code) : store.endEffect(e, 'retry', code, undefined, backoff)
    const j = await store.exportJob(e.talentId)
    if (!j) { await store.endEffect(e, 'failed', 'PROFILE_MISSING'); count('failed'); continue }
    if (j.exported !== null && j.exported >= j.version) { await store.endEffect(e, 'done', 'SUPERSEDED'); count('superseded'); continue }
    // No folder yet (linked later by EP01 / ai:talent --link-onedrive) or OneDrive not configured: keep it, try again later.
    if (!j.folder) { await retry('ONEDRIVE_FOLDER_MISSING'); count('retry'); continue }
    if (!exporter) { await retry('ONEDRIVE_NOT_CONFIGURED'); count('retry'); continue }
    try {
      const itemRef = await exporter(j.folder, TALENT_FILES.profile, profileMarkdown(j.display_name, j.profile, String(j.version)))
      await store.endEffect(e, 'done', null, { version: j.version, itemRef })
      count('exported')
    } catch { await retry('ONEDRIVE_EXPORT_FAILED'); count('retry') }
  }
  return seen
}

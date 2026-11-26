import type { Database } from '../../infra/database/client.ts'
import { PROFILE_FIELDS, type Profile, type ProfileField } from './model.ts'

// One-way OneDrive export of the profile (agent_spec/ai-core/DATABASE_DESIGN.md §3.6): Postgres is the source, Profile.md is
// written from the LATEST version and never read back. Outbox 'talent_profile.export', retried with backoff, idempotent.
// OneDrive names (English since 2026-11-23), also used by the OneDrive module.
export const ONEDRIVE_FOLDERS = { talents: 'Talents', common: 'Common' } as const
export const AGENCY_FILES = ['Knowhow.md', 'Algorithm.md', 'AI_Instructions.md'] as const
export const TALENT_FILES = { profile: 'Profile.md', memo: 'AI_Memo.md' } as const
export type ContextFile = { name: string; eTag: string; text: string; source: string }
export type TalentFiles = { agency: ContextFile[]; profile: ContextFile | null; memo: ContextFile | null }
export type ProfileExporter = (talentFolderId: string, fileName: string, markdown: string) => Promise<string>
export const EXPORT_EVENT = 'talent_profile.export'
const LEASE_SECONDS = 60, MAX_ATTEMPTS = 10

export function profileMarkdown(name: string, p: Profile, version: string) {
  return [`# ${name}`, '', `<!-- AI育成OS が Postgres から書き出したファイルです(バージョン ${version})。ここを編集しても AI には反映されません。変更は管理画面か M-17 で行ってください。 -->`,
    ...Object.entries(PROFILE_FIELDS).flatMap(([k, label]) => ['', `## ${label}`, p[k as ProfileField]?.trim() || '(未入力)'])].join('\n') + '\n'
}

export async function runProfileExports(db: Database, exporter: ProfileExporter | null, limit = 5): Promise<Record<string, number>> {
  const seen: Record<string, number> = {}, count = (k: string) => { seen[k] = (seen[k] ?? 0) + 1 }
  const due = await db.$queryRaw<Array<{ id: string; lease_token: string; attempts: number; talent_id: string }>>`
    UPDATE app_private.outbox_events o SET state='leased',lease_token=gen_random_uuid(),lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),attempts=o.attempts+1,updated_at=now()
    FROM app_private.domain_operations d WHERE d.id=o.operation_id AND o.id IN (SELECT id FROM app_private.outbox_events
      WHERE state='pending' AND event_type=${EXPORT_EVENT} AND available_at<=now() ORDER BY available_at,id LIMIT ${limit} FOR UPDATE SKIP LOCKED)
    RETURNING o.id::text,o.lease_token::text,o.attempts,d.talent_id::text`
  for (const e of due) {
    const end = async (outcome: 'done' | 'retry' | 'failed', code: string | null, written?: { version: bigint; itemRef: string }) => db.$transaction(async tx => {
      if (written) await tx.$executeRaw`INSERT INTO app_private.talent_profile_exports(talent_id,version,item_ref) VALUES(${e.talent_id}::uuid,${written.version},${written.itemRef})
        ON CONFLICT (talent_id) DO UPDATE SET version=EXCLUDED.version,item_ref=EXCLUDED.item_ref,exported_at=now() WHERE talent_profile_exports.version<EXCLUDED.version`
      const backoff = Math.min(2 ** e.attempts * 5, 600)
      await tx.$executeRaw`UPDATE app_private.outbox_events SET state=${outcome === 'retry' ? 'pending' : outcome},lease_token=NULL,lease_until=NULL,last_error_code=${code},updated_at=now(),
        available_at=CASE WHEN ${outcome === 'retry'} THEN now()+(${backoff}::int * interval '1 second') ELSE available_at END
        WHERE id=${e.id}::uuid AND state='leased' AND lease_token=${e.lease_token}::uuid`
    })
    const retry = (code: string) => end(e.attempts >= MAX_ATTEMPTS ? 'failed' : 'retry', code)
    const [j] = await db.$queryRaw<Array<{ display_name: string; folder: string | null; profile: Profile; version: bigint; exported: bigint | null }>>`
      SELECT t.display_name,t.onedrive_folder_id AS folder,p.profile,p.version,x.version AS exported FROM public.talents t
      JOIN app_private.talent_profiles p ON p.talent_id=t.id LEFT JOIN app_private.talent_profile_exports x ON x.talent_id=t.id WHERE t.id=${e.talent_id}::uuid`
    if (!j) { await end('failed', 'PROFILE_MISSING'); count('failed'); continue }
    if (j.exported !== null && j.exported >= j.version) { await end('done', 'SUPERSEDED'); count('superseded'); continue }
    // No folder yet (linked later by EP01 / ai:talent --link-onedrive) or OneDrive not configured: keep it, try again later.
    if (!j.folder) { await retry('ONEDRIVE_FOLDER_MISSING'); count('retry'); continue }
    if (!exporter) { await retry('ONEDRIVE_NOT_CONFIGURED'); count('retry'); continue }
    try { await end('done', null, { version: j.version, itemRef: await exporter(j.folder, TALENT_FILES.profile, profileMarkdown(j.display_name, j.profile, String(j.version))) }); count('exported') }
    catch { await retry('ONEDRIVE_EXPORT_FAILED'); count('retry') }
  }
  return seen
}

// Reconciler: an export lease lost with its worker goes back to pending.
export const reclaimExports = (db: Database) => db.$executeRaw`UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,updated_at=now()
  WHERE state='leased' AND lease_until<now() AND event_type=${EXPORT_EVENT}`

import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { AGENCY_FILES, TALENT_FILES, type ContextFile, type Results, type TalentFiles, type Trends } from './context.ts'
import type { Claim } from './store.ts'

// Input audit file (development only, AI_INPUT_AUDIT=true): for one coach run, every input value, the exact place it was read from,
// the full prompt sent to the model and the raw output. Purpose: check by hand that each input came from the right place.
// Contains the Talent's profile and conversation, so the env check refuses it in production. Written on the worker machine only.
export type AuditInput = { name: string; source: string; value: string }
export type AuditRecord = {
  claim: Claim
  model: string
  inputs: AuditInput[]
  prompts: Record<string, string>
  output?: unknown
  message?: string
  result?: string
  notes: string[]
}

const json = (v: unknown) => JSON.stringify(v, null, 2)
const fileInput = (label: string, f: ContextFile | null, where: string): AuditInput =>
  f ? { name: label, source: f.source, value: f.text } : { name: label, source: `${where}: not found`, value: '(なし: AIには「まだありません」と渡した)' }

// Every input of a run, in the order of SCD 3-1 (+ trends for the morning run).
export function collectInputs(c: Claim, files: TalentFiles, r: Results, trends: Trends | null, folderNote: string): AuditInput[] {
  const t = c.talent, talentRow = `Postgres public.talents id=${t.talentId}`
  const day = c.day ?? '(chat: today JST)'
  const delivered = `Postgres public.post_deliveries (talent_id=${t.talentId}, provider_state='published') + latest public.post_metric_snapshots per delivery`
  return [
    { name: 'タレント名', source: `${talentRow} → display_name`, value: t.displayName },
    { name: '18歳未満', source: `${talentRow} → birth_date > current_date - 18 years`, value: String(t.isMinor) },
    { name: 'タレント情報の版', source: `${talentRow} → version`, value: String(t.version) },
    { name: '対象日', source: c.day ? `app_private.domain_operations.operation_key (coach.daily_themes:<talent>:<day>)` : 'worker clock (JST)', value: day },
    ...AGENCY_FILES.map(n => fileInput(`Common/${n}`, files.agency.find(a => a.name === n) ?? null, `OneDrive Common/${n}`)),
    fileInput(TALENT_FILES.profile, files.profile, folderNote),
    fileInput(TALENT_FILES.memo, files.memo, folderNote),
    { name: 'フォロワー目標', source: `Postgres public.follower_goals talent_id=${t.talentId}`, value: r.goals.length ? json(r.goals) : '(なし)' },
    { name: `昨日(${r.yesterday})の投稿と指標`, source: `${delivered}; published_at (JST) = ${r.yesterday}`, value: r.yesterdayPosts.length ? json(r.yesterdayPosts) : '(なし)' },
    { name: '過去7日平均', source: `computed in code from ${delivered}; published_at (JST) in the 7 days before ${r.yesterday}`, value: Object.keys(r.average7d).length ? json(r.average7d) : '(なし)' },
    { name: '直近14日の投稿', source: `${delivered}; published_at (JST) in the 14 days before the target day, newest 20`, value: r.recentPosts.length ? json(r.recentPosts) : '(なし)' },
    { name: 'フォロワー数と前日比', source: `Postgres public.social_accounts (talent_id=${t.talentId}, status='connected') + public.follower_snapshots (latest before the target day, and the day before it)`, value: r.followers.length ? json(r.followers) : '(なし)' },
    { name: '最近の会話', source: `Postgres public.coach_messages talent_id=${t.talentId}, ${c.task === 'coach.respond' ? 'up to the input message' : 'newest'} 30, oldest first`, value: c.turns.length ? c.turns.map(m => `${m.sender}: ${m.body}`).join('\n') : '(なし)' },
    ...(c.task === 'coach.daily_themes' ? [{
      name: '今日のニュース・トレンド', source: trends?.source ?? `app_private.ai_daily_trends day=${c.day}: not available`,
      value: trends ? `${trends.content}\n\n出典:\n${trends.sources.map(s => `- ${s.title ?? ''} ${s.url}`).join('\n') || '(なし)'}` : '(なし: AIには「取得できませんでした」と渡した)',
    }] : []),
  ]
}

export function renderAudit(a: AuditRecord): string {
  const c = a.claim, fence = (s: string) => '````text\n' + s + '\n````'
  return [
    `# AI入力の記録 (${c.task})`,
    '',
    `| 項目 | 値 |`, `|---|---|`,
    `| Talent | ${c.talent.displayName} (${c.talent.talentId}) |`,
    `| Login | ${c.userId} |`,
    `| 対象日 | ${c.day ?? '-'} |`,
    `| Execution / attempt | ${c.executionId} / ${c.attemptNo} |`,
    `| Model | ${a.claim.simulated ? 'simulated (AIを呼ばない模擬実行)' : a.model} |`,
    `| 結果 | ${a.result ?? '-'} |`,
    `| 記録時刻 | ${new Date().toISOString()} |`,
    '',
    ...(a.notes.length ? ['## メモ', ...a.notes.map(n => `- ${n}`), ''] : []),
    '## 1. 入力値と取得元',
    ...a.inputs.flatMap((i, n) => [`### 1.${n + 1} ${i.name}`, `取得元: ${i.source}`, '', fence(i.value), '']),
    '## 2. AIに送ったプロンプト(そのまま)',
    ...Object.entries(a.prompts).flatMap(([k, v]) => [`### ${k}`, fence(v), '']),
    '## 3. AIの出力(そのまま)',
    a.output === undefined ? '(AIは呼んでいない)' : fence(typeof a.output === 'string' ? a.output : json(a.output)),
    '',
    '## 4. 保存したメッセージ',
    a.message ? fence(a.message) : '(なし)',
    '',
  ].join('\n')
}

// <dir>/<talentId>_<name>/<day>_<task>_<execution>_a<attempt>.md ; never throws into the run.
export function fileAudit(dir: string) {
  return async (a: AuditRecord) => {
    const c = a.claim, folder = join(dir, `${c.talent.talentId}_${c.talent.displayName.replace(/[\\/:*?"<>|]/g, '_')}`)
    await mkdir(folder, { recursive: true })
    const day = c.day ?? new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10)
    await writeFile(join(folder, `${day}_${c.task}_${c.executionId}_a${c.attemptNo}.md`), renderAudit(a), 'utf8')
  }
}

import { createHash } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'

// Agent context (report §5, §6.1). Business data comes from Postgres (QA101); OneDrive only receives an export of the profile.
// Priority in the prompt: system rules → task/tool rules → Manager instructions (Talent > global per situation) → profile/goals → conversation.

// ---- OneDrive names (English since 2026-11-23). Used by the OneDrive module and the profile export.
export const ONEDRIVE_FOLDERS = { talents: 'Talents', common: 'Common' } as const
export const AGENCY_FILES = ['Knowhow.md', 'Algorithm.md', 'AI_Instructions.md'] as const
export const TALENT_FILES = { profile: 'Profile.md', memo: 'AI_Memo.md' } as const
export type ContextFile = { name: string; eTag: string; text: string; source: string }
export type TalentFiles = { agency: ContextFile[]; profile: ContextFile | null; memo: ContextFile | null }

// ---- Profile allowlist (report §7.2 profile.prepare). Labels are the Japanese headings shown to the model, the UI and OneDrive.
export const PROFILE_FIELDS = { profile: 'プロフィール', direction: '方向性', hobbiesSkills: '趣味・特技', futureGoal: '将来の目標', tone: '口調・話し方' } as const
export type ProfileField = keyof typeof PROFILE_FIELDS
export type Profile = Partial<Record<ProfileField, string>>
export const PROFILE_FIELD_MAX = 4000
export const INSTRUCTION_MAX = 1000
// The eight situations of YK3 §2-4-14 (report §7.2).
export const SITUATIONS = { daily_greeting: '毎日の声かけ', theme_suggestions: 'テーマ提案', post_writing: '投稿文の作成', post_results: '投稿結果の振り返り', challenge_suggestions: 'チャレンジの提案', media_reminder: '素材のリマインド', posting_window_frequency: '投稿の時間帯・頻度', conversation_limits: '会話の範囲' } as const
export type Situation = keyof typeof SITUATIONS

// profileReady (report §6.1): the minimum fields are not fixed by the client yet → only the main "profile" text is required.
// ponytail: one required field; replace with the confirmed minimum set when BA closes it.
export const profileReady = (p: Profile | null) => !!p?.profile?.trim()

export function profileMarkdown(name: string, p: Profile, version: string) {
  return [`# ${name}`, '', `<!-- AI育成OS が Postgres から書き出したファイルです(バージョン ${version})。ここを編集しても AI には反映されません。変更は管理画面か M-17 で行ってください。 -->`,
    ...Object.entries(PROFILE_FIELDS).flatMap(([k, label]) => ['', `## ${label}`, p[k as ProfileField]?.trim() || '(未入力)'])].join('\n') + '\n'
}

type Tx = Pick<Database, '$queryRaw'>
export type Instruction = { id: string; scope: 'global' | 'talent'; situation: Situation; text: string; version: string }
export type TalentSnapshot = {
  kind: 'talent'; talentId: string; displayName: string; isMinor: boolean
  profile: Profile | null; profileVersion: string; profileReady: boolean
  instructions: Instruction[]
  goals: Array<{ platform: string; targetFollowers: number; deadlineOn: string | null; achieved: boolean }>
}
export type ManagerSnapshot = { kind: 'manager'; today: string }
export type Snapshot = TalentSnapshot | ManagerSnapshot

// Read inside the claim transaction (short snapshot), persisted on the run as context_manifest (report §6.1).
export async function talentSnapshot(tx: Tx, talentId: string): Promise<TalentSnapshot> {
  const [t] = await tx.$queryRaw<Array<{ display_name: string; minor: boolean | null }>>`
    SELECT display_name,(birth_date > current_date - interval '18 years') AS minor FROM public.talents WHERE id=${talentId}::uuid`
  const [p] = await tx.$queryRaw<Array<{ profile: Profile; version: bigint }>>`SELECT profile,version FROM app_private.agent_talent_profiles WHERE talent_id=${talentId}::uuid`
  const instructions = await tx.$queryRaw<Array<{ id: string; scope_kind: 'global' | 'talent'; situation: Situation; text: string; version: bigint }>>`
    SELECT DISTINCT ON (situation) id::text,scope_kind,situation,text,version FROM app_private.agent_instructions
    WHERE enabled AND (scope_kind='global' OR (scope_kind='talent' AND talent_id=${talentId}::uuid))
    ORDER BY situation, (scope_kind='talent') DESC`
  const goals = await tx.$queryRaw<Array<{ platform: string; target_followers: number; deadline_on: string | null; achieved: boolean }>>`
    SELECT platform,target_followers,to_char(deadline_on,'YYYY-MM-DD') AS deadline_on,achieved_at IS NOT NULL AS achieved FROM public.follower_goals WHERE talent_id=${talentId}::uuid ORDER BY platform`
  const profile = p?.profile ?? null
  return {
    kind: 'talent', talentId, displayName: t.display_name, isMinor: !!t.minor, profile, profileVersion: String(p?.version ?? 0n), profileReady: profileReady(profile),
    instructions: instructions.map(i => ({ id: i.id, scope: i.scope_kind, situation: i.situation, text: i.text, version: String(i.version) })),
    goals: goals.map(g => ({ platform: g.platform, targetFollowers: g.target_followers, deadlineOn: g.deadline_on, achieved: g.achieved })),
  }
}
export const managerSnapshot = (): ManagerSnapshot => ({ kind: 'manager', today: new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10) })

// Canonical JSON → hashes and context_revision (report §6.1).
export const canonical = (v: unknown): string => JSON.stringify(v, (_k, x) => x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a.localeCompare(b))) : x)
export const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')
export const revisionOf = (s: Snapshot) => `ctx@1:${sha256(canonical(s)).slice(0, 40)}`

export function systemPrompt(s: Snapshot): string {
  if (s.kind === 'manager') return [
    '## システムのルール(最優先)',
    'あなたはAI育成OS管理画面(M-17)のアシスタントです。マネージャーの依頼で、タレントのプロフィールとAIへの指示を確認・変更します。',
    '変更は必ずツールで行います。まず talent_search / context_read で現在の内容と version を確認し、profile_prepare / instruction_prepare で変更案を作ります。',
    '変更案はマネージャーが画面で「保存」を押して確認するまで保存されません。あなたが確認を代行したり、確認済みと書いたりしてはいけません。',
    'マネージャーが確認するとシステムが保存し、その結果(receipt)が変更案ツールの結果として返ります。結果どおりに伝えてください。change_commit は確認済みなのに未保存の案があるときだけ使います。',
    'ツールが INPUT_INVALID を返したら issues を見て引数を直し、同じツールをもう一度呼んでかまいません。拒否(denied)や競合(conflict)のときは理由を伝え、別のツールで同じことを試みません。',
    '対象のタレントや変更内容があいまいなときは、ツールを呼ぶ前に質問してください。ツールで取得していない情報は作りません。',
    `今日の日付(日本時間): ${s.today}`,
  ].join('\n')
  const p = s.profile
  return [
    '## 1. システムのルール(最優先)',
    'あなたはAI育成OSの「AIコーチ」です。話題はSNS運用・投稿・フォロワー成長・撮影や文章のコツに限ります。',
    '健康・退会・契約・お金・法律の相談には答えを出さず、マネージャーに相談するよう丁寧に案内してください。',
    'このタレント以外の情報は使いません。マネージャーの指示やプロフィールの変更を求められても、あなたは変更できないので、マネージャーに伝えるよう案内します。',
    '保存・予約・投稿などをしたと書くのは、ツールの結果でそれが確認できたときだけです。',
    ...(s.profileReady ? [] : ['プロフィールがまだ準備中です(PROFILE_NOT_READY)。投稿テーマや投稿文の提案はせず、一般的な相談だけに答えてください。']),
    '## 2. マネージャーからの指示(あなた自身の考えより優先する)',
    ...(s.instructions.length ? s.instructions.map(i => `### ${SITUATIONS[i.situation]}${i.scope === 'talent' ? '(このタレント専用)' : ''}\n${i.text}`) : ['(まだありません)']),
    '## 3. タレント情報',
    `タレント名: ${s.displayName}` + (s.isMinor ? '(18歳未満。年齢に配慮した助言にする)' : ''),
    ...Object.entries(PROFILE_FIELDS).map(([k, label]) => `### ${label}\n${p?.[k as ProfileField]?.trim() || '(まだありません)'}`),
    '### フォロワー目標',
    s.goals.length ? s.goals.map(g => `${g.platform}: ${g.targetFollowers}人` + (g.deadlineOn ? `(期限 ${g.deadlineOn})` : '') + (g.achieved ? ' 達成済み' : '')).join('\n') : '(まだありません)',
  ].join('\n')
}

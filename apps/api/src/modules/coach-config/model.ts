// Coach Configuration vocabulary (agent_spec/ai-core/DATABASE_DESIGN.md §3.6): profile fields the AI may read and the
// eight instruction situations of YK3 §2-4-14. Owned by this module; the AI Core and the Control Plane handlers import it.

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

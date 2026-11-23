import { APICallError, generateText, Output, type LanguageModel } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { DailyOutput, type DailyOut } from './context.ts'

// Model adapters (report §3.1): ONE call per attempt, no Agent loop. The only tool is OpenAI's provider-executed web_search,
// for the shared daily trends (CR-05). Model and key come from backend env only.
export const TASK = { key: 'coach.respond', revision: 'coach.respond@2' } as const
export const DAILY_TASK = { key: 'coach.daily_themes', revision: 'coach.daily_themes@1' } as const

export type Turn = { sender: 'talent' | 'coach'; body: string }
type Usage = { inputTokens: number | undefined; outputTokens: number | undefined; requestId?: string }
export type Generate = (input: { system: string; turns: Turn[]; signal: AbortSignal }) => Promise<Usage & { text: string }>
export type GenerateDaily = (input: { system: string; prompt: string; signal: AbortSignal }) => Promise<Usage & { output: DailyOut }>
export type GenerateTrends = (input: { day: string; signal: AbortSignal }) => Promise<Usage & { content: string; sources: Array<{ url: string; title?: string }>; prompt: string }>

// CR-05 / Q&A No.38: ONE web search per JST day, shared by every Talent. No Talent data goes into this prompt.
// ponytail: the exclusion list (事件・事故・災害・政治) is an internal proposal, not a client rule.
export const trendsPrompt = (day: string) => [
  `今日は${day}です。日本のInstagram・TikTok・YouTubeで今日話題になっていること、季節の行事、流行しているものをWeb検索で調べてください。`,
  'タレントが今日の投稿テーマに使えそうなものを10項目以内で、1行ずつ「- 話題: ひとこと説明」の形で書いてください。検索は2回までにしてください。',
  '事件・事故・災害・政治・特定の個人への批判は含めないでください。確認できなかったことは書かないでください。',
].join('\n')

export type TrendsSearch = { model?: string; domains: string[]; contextSize: 'low' | 'medium' | 'high' }
export function openAiModels(apiKey: string, modelId: string, baseURL?: string, search: TrendsSearch = { domains: [], contextSize: 'low' }): { generate: Generate; generateDaily: GenerateDaily; generateTrends: GenerateTrends } {
  const openai = createOpenAI({ apiKey, baseURL }), model: LanguageModel = openai(modelId), trendsModel: LanguageModel = search.model ? openai(search.model) : model
  // maxRetries 0: a retry is a second paid call; recovery goes through the DB attempt ledger instead (§4.1 step 6).
  return {
    generate: async ({ system, turns, signal }) => {
      const r = await generateText({ model, system, abortSignal: signal, maxRetries: 0, messages: turns.map(m => ({ role: m.sender === 'talent' ? 'user' as const : 'assistant' as const, content: m.body })) })
      return { text: r.text, inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, requestId: r.response?.id }
    },
    generateDaily: async ({ system, prompt, signal }) => {
      const r = await generateText({ model, system, prompt, abortSignal: signal, maxRetries: 0, output: Output.object({ schema: DailyOutput }) })
      return { output: DailyOutput.parse(r.output), inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, requestId: r.response?.id }
    },
    generateTrends: async ({ day, signal }) => {
      const prompt = trendsPrompt(day)
      const r = await generateText({
        model: trendsModel, prompt, abortSignal: signal, maxRetries: 0,
        // Cost control: only the allowed domains, smallest search context. Empty domain list = whole web.
        tools: { web_search: openai.tools.webSearch({ searchContextSize: search.contextSize, userLocation: { type: 'approximate', country: 'JP', timezone: 'Asia/Tokyo' }, ...(search.domains.length ? { filters: { allowedDomains: search.domains } } : {}) }) },
        toolChoice: { type: 'tool', toolName: 'web_search' },
      })
      const sources = r.sources.flatMap(x => x.sourceType === 'url' ? [{ url: x.url, title: x.title }] : [])
      return { content: r.text.trim(), sources, prompt, inputTokens: r.usage.inputTokens, outputTokens: r.usage.outputTokens, requestId: r.response?.id }
    },
  }
}

export const MAX_REPLY = 4000
// Provider answered with an HTTP error → no output was produced (failed). No answer (timeout, network, abort) → unknown.
export function classifyModelError(e: unknown): { kind: 'failed' | 'unknown'; code: string } {
  if (APICallError.isInstance(e) && e.statusCode !== undefined) {
    const s = e.statusCode
    return { kind: 'failed', code: s === 401 || s === 403 ? 'MODEL_AUTH' : s === 429 ? 'MODEL_RATE_LIMITED' : s >= 500 ? 'MODEL_PROVIDER_ERROR' : 'MODEL_REJECTED' }
  }
  // The provider answered but the structured output did not match the schema: no publishable output.
  if (e instanceof Error && /NoObjectGenerated|NoOutputGenerated|TypeValidation|ZodError/.test(e.name)) return { kind: 'failed', code: 'OUTPUT_INVALID' }
  return { kind: 'unknown', code: 'MODEL_OUTCOME_UNKNOWN' }
}

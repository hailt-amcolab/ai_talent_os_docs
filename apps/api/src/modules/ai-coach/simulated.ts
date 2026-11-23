import type { Generate, GenerateDaily } from './coach.ts'

// Demo switch "no AI call": same queue, lease, heartbeat and DB path as a real run, but the model is replaced by a wait of
// about the measured call time and fixed sample text. Delays measured 2026-11-23 on Supabase dev (coach.daily_themes, 10 real
// calls: 6.3–10 s); chat has no measurement yet, 3–8 s assumed. fixedMs (AI_SIMULATED_DELAY_MS) overrides both, e.g. for load tests.
const between = (min: number, max: number) => min + Math.random() * (max - min)

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(new Error('aborted'))
    const t = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => { clearTimeout(t); reject(new Error('aborted')) }, { once: true }) // lease lost → unknown, as for a real call
  })
}

export function simulatedModels(fixedMs?: number): { generate: Generate; generateDaily: GenerateDaily } {
  return {
    generate: async ({ turns, signal }) => {
      await wait(fixedMs ?? between(3_000, 8_000), signal)
      const last = turns.filter(t => t.sender === 'talent').at(-1)?.body ?? ''
      return { text: `【模擬応答】AIを呼ばない試験用の返信です。(受け取ったメッセージ: ${last.slice(0, 40)})`, inputTokens: 0, outputTokens: 0 }
    },
    generateDaily: async ({ signal }) => {
      await wait(fixedMs ?? between(6_000, 10_000), signal)
      return {
        inputTokens: 0, outputTokens: 0,
        output: {
          comment: '【模擬応答】今日も一緒にがんばりましょう!',
          themes: [
            { title: '【模擬】今日のおすすめショット', reason: 'AIを呼ばない試験用のテーマです', source: 'profile' },
            { title: '【模擬】ファンへの質問投稿', reason: 'AIを呼ばない試験用のテーマです', source: 'agency_rule' },
            { title: '【模擬】季節の話題', reason: 'AIを呼ばない試験用のテーマです', source: 'news' },
          ],
          mission: '【模擬】ストーリーを1本投稿する',
        },
      }
    },
  }
}

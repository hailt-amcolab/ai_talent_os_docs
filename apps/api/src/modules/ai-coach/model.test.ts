import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MockLanguageModelV4 } from 'ai/test'
import { aiSdkGateway } from './model.ts'
import { continuation } from './runner.ts'
import { toolsFor } from './tools.ts'
import type { StepRow } from './store.ts'

// The real AI SDK path of ModelGateway.step (no network): tools are declared without execute, so the SDK returns the
// call and runs nothing; the persisted assistant items + ledger results form a continuation the SDK accepts.
const usage = { inputTokens: { total: 10, noCache: 10, cacheRead: 0, cacheWrite: 0 }, outputTokens: { total: 5, text: 5, reasoning: 0 } }
test('one step returns tool calls without executing them; continuation carries a result per call id', async () => {
  const prompts: unknown[] = []
  let n = 0
  const model = new MockLanguageModelV4({ doGenerate: async o => {
    prompts.push(o.prompt)
    return n++ === 0
      ? { content: [{ type: 'tool-call', toolCallId: 'c1', toolName: 'context_read', input: JSON.stringify({ sections: ['profile'] }) }], finishReason: { unified: 'tool-calls', raw: undefined }, usage, warnings: [] }
      : { content: [{ type: 'text', text: 'こんにちは' }], finishReason: { unified: 'stop', raw: undefined }, usage, warnings: [] }
  } })
  const g = aiSdkGateway(model, 'mock', 'mock-1'), signal = AbortSignal.timeout(5000)
  const first = await g.step({ system: 's', messages: [{ role: 'user', content: 'hi' }], tools: toolsFor('talent', true), signal, maxOutputTokens: 100 })
  assert.deepEqual(first.toolCalls, [{ id: 'c1', name: 'context_read', input: { sections: ['profile'] } }])
  assert.equal(first.inputTokens, 10); assert.equal(first.outputTokens, 5)
  assert.ok(first.messages.every(m => m.role === 'assistant'))
  const steps: StepRow[] = [
    { id: 'm1', sequence: 1, kind: 'model', state: 'succeeded', sourceModelStepId: null, callId: null, toolName: null, input: null, output: { messages: first.messages, text: '', toolCalls: first.toolCalls }, errorCode: null },
    { id: 't1', sequence: 2, kind: 'tool', state: 'denied', sourceModelStepId: 'm1', callId: 'c1', toolName: 'context_read', input: {}, output: { kind: 'denied', code: 'NOT_FOUND_OR_FORBIDDEN' }, errorCode: 'NOT_FOUND_OR_FORBIDDEN' },
  ]
  const second = await g.step({ system: 's', messages: continuation({ history: [{ role: 'user', body: 'hi' }] }, steps), tools: toolsFor('talent', true), signal, maxOutputTokens: 100 })
  assert.equal(second.text, 'こんにちは'); assert.deepEqual(second.toolCalls, [])
  const sent = JSON.stringify(prompts[1])
  assert.match(sent, /"toolCallId":"c1"/); assert.match(sent, /NOT_FOUND_OR_FORBIDDEN/)
})

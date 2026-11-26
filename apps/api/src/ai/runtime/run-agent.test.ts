import { test } from 'node:test'
import assert from 'node:assert/strict'
import { traceConfig } from './run-agent.ts'

// ADR-10: no prompt / tool data / model output in OpenAI traces (the SDK default is to include them).
test('agent runs trace without sensitive data, grouped by conversation', () => {
  const t = traceConfig({ channel: 'talent', conversationId: 'c1', runId: 'r1' }, 'agent.talent@1')
  assert.equal(t.traceIncludeSensitiveData, false)
  assert.deepEqual([t.workflowName, t.groupId, t.traceMetadata], ['agent.talent', 'c1', { runId: 'r1', promptVersion: 'agent.talent@1' }])
})

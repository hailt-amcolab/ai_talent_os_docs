import { Hono } from 'hono'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { z } from 'zod'
import type { AppDeps } from '../container.ts'
import { AppError } from '../core/errors.ts'
import { assertCapability } from '../control/access.ts'
import { managerActor, type ManagerActor } from '../control/actor.ts'
import { TOOLS } from '../ai/tools/index.ts'
import { toolError, type AppRunContext } from '../ai/tools/define.ts'
import { activeGrant, type TokenVerifier } from './auth.ts'

// Manager MCP for ChatGPT (agent_spec/ai-core/API_DESIGN.md §6, ADR-14): ChatGPT runs the reasoning; every MCP tool is a call into the
// same Control Plane / reader functions as the agent tools, no internal LLM. No confirm tool: the person confirms in the PWA
// (/pwa/confirm/{id}, Manager aal2 session). Stateless Streamable HTTP: one server + transport per request, JSON responses.
export function mcpModule(deps: AppDeps, verify: TokenVerifier) {
  const app = new Hono(), db = deps.db, proposals = deps.control!.proposals
  const resource = deps.env.MCP_RESOURCE_URL ?? 'http://localhost/mcp'
  const web = (deps.env.PUBLIC_WEB_URL ?? deps.env.CORS_ORIGINS[0] ?? '').replace(/\/$/, '')
  const metadataUrl = new URL('/.well-known/oauth-protected-resource', resource).toString()
  // RFC 9728 protected resource metadata: where ChatGPT gets a token for this resource.
  app.get('/.well-known/oauth-protected-resource', c => c.json({ resource, authorization_servers: deps.env.MCP_AUTH_ISSUER ? [deps.env.MCP_AUTH_ISSUER] : [], bearer_methods_supported: ['header'] }))
  const unauthorized = (code: string) => new Response(JSON.stringify({ error: code }), { status: 401, headers: { 'Content-Type': 'application/json', 'WWW-Authenticate': `Bearer resource_metadata="${metadataUrl}"` } })

  app.all('/mcp', async c => {
    const token = /^Bearer (.+)$/.exec(c.req.header('Authorization') ?? '')?.[1]
    const who = token ? await verify(token) : null
    if (!who) return unauthorized('invalid_token')
    let actor: ManagerActor
    try { actor = await managerActor(db, who.managerUserId) } catch { return unauthorized('invalid_token') } // disabled Manager = no access
    const grant = await activeGrant(db, who)
    if (!grant) return unauthorized('invalid_token')
    const ctx: AppRunContext = { actor, channel: 'manager_mcp', runId: null, conversationId: null, grantId: grant.id,
      pack: { kind: 'manager', today: new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10) }, services: { db, proposals }, events: [] }
    const server = new McpServer({ name: 'ai-talent-os', version: '1.0.0' })
    const result = (data: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(data) }], structuredContent: data as Record<string, unknown> })
    const failure = (e: unknown) => { const err = toolError(e); return { isError: true, content: [{ type: 'text' as const, text: JSON.stringify(err) }], structuredContent: err } }
    for (const d of TOOLS.filter(t => t.ready && t.channels.includes('manager_mcp') && grant.capabilities.includes(t.capability))) {
      server.registerTool(d.name, { description: d.description, inputSchema: d.parameters }, async (args: unknown) => {
        try {
          assertCapability(ctx.actor, 'manager_mcp', d.capability)
          if (!(await activeGrant(db, who))) throw new AppError('ACTION_NOT_ALLOWED', 403) // revoked during the session
          const data = await d.run(args as never, ctx) as Record<string, unknown>
          return result(d.writes && typeof data?.proposalId === 'string' ? { ...data, confirmUrl: `${web}/pwa/confirm/${data.proposalId}` } : data)
        } catch (e) { return failure(e) }
      })
    }
    server.registerTool('proposal_status', { description: '変更案の状態を読む。マネージャーが確認ページで保存すると state=consumed と receipt が返る。', inputSchema: z.object({ proposalId: z.uuid() }).strict() },
      async (args: { proposalId: string }) => { try { return result(await proposals.status(actor, args.proposalId)) } catch (e) { return failure(e) } })
    const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true })
    await server.connect(transport)
    return transport.handleRequest(c.req.raw)
  })
  return app
}

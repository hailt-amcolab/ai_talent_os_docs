# Repository Guidelines

## Project Structure & Module Organization
Full stack, layers and conventions: `agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md` (read it before adding code).
- `apps/web/`: Next.js 16 App Router PWA, **frontend only** (no API routes, no server actions). Routes in `app/`, components in `components/<feature>/`, browser code in `lib/` (`lib/api/client.ts` is the only way to call the BE; `lib/pwa/` platform code; `lib/messages.ts` holds all Japanese UI text), service worker in `public/sw.js`.
- `apps/api/`: Hono + TypeScript BE. `src/config/` env, `src/core/` shared errors, `src/infra/` adapters (database, push), `src/modules/<feature>/` routes + service, `src/http/app.ts` builds the app, `src/container.ts` is the composition root. Prisma schema/migrations in `apps/api/prisma/` (see `apps/api/PRISMA.md`). Root `docker-compose.yml` runs migrate + api + web without Caddy (see `DOCKER.md`).
- `SCD/`: feature specifications organized by EP01–EP10; `Phan_tich/`: project analysis; `agent_spec/`: implementation specifications. Consult relevant documents before changing behavior.

## Build, Test, and Development Commands
Use Node.js 22.18+ and run commands inside the relevant app directory; each app has its own npm lockfile, with no root package scripts.

- `npm ci`: install dependencies from the app's lockfile.
- `npm run dev`: start the web app on port 3000 or API on port 8080.
- `npm run dev:https` (web): enable HTTPS for local PWA and push testing.
- `npm run build` followed by `npm start`: compile and run the production app.
- `npm test`: run the app's unit tests.
- `npm run lint` (web): run Next.js ESLint rules; `npm run typecheck` (API): check TypeScript without emitting files.
- `npm run icons` (web): regenerate placeholder icons.

## Coding Style & Naming Conventions
Use strict TypeScript, two-space indentation, and surrounding file conventions; application code generally uses single quotes and omits semicolons. Name React components in PascalCase (`PushToggle.tsx`), utilities in lowercase or kebab-case (`push-client.ts`), and functions in camelCase. API relative imports include `.ts`; web imports can use `@/`. No dedicated formatter is configured.

## Testing Guidelines
Tests use `node:test` and `node:assert/strict`. API tests match `src/**/*.test.ts`; web tests match `lib/*.test.ts`. Integration tests against PostgreSQL are added per module once the schema exists (`TEST_DATABASE_URL`). Cover changed behavior and relevant failure paths; no numeric coverage threshold is configured. For PWA changes, also verify installation, offline behavior, updates, and notifications on real devices over HTTPS.

## Commit & Pull Request Guidelines
History currently contains two descriptive documentation commits, including Vietnamese text; no enforced commit format is evident. Use concise, action-oriented subjects. PRs should explain behavior changes, link relevant issues or specifications, list validation commands and results, and include screenshots for UI changes.

## Configuration & Agent Instructions
Copy each app's `.env.example` to `.env` (API) or `.env.local` (web). Keep VAPID public keys aligned and private keys out of commits; disable `ENABLE_PUSH_TEST` in production. Keep API endpoints in `apps/api`. Follow `apps/web/AGENTS.md` and read bundled Next.js documentation before editing web code.

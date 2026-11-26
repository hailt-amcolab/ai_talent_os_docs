#!/usr/bin/env bash
# One command for the automated AI Core checks on a THROWAWAY local Postgres (agent_spec/ai-core/TEST_RUNBOOK.md §2).
# Never touches Supabase: the DB lives under $TEST_ROOT and is removed at the end (KEEP_DB=1 keeps it).
#   tools/test-local.sh            # migrations replay + db:diff + 4 integration suites (runtime role) + owner suite + unit + typecheck
#   tools/test-local.sh --evals    # + the three AI evals (real model: OPENAI_API_KEY / AI_COACH_MODEL in .env, costs tokens)
#   tools/test-local.sh --smoke    # + end-to-end smoke with the real worker + Redis + OpenAI (needs redis-server)
# Env: PG_BIN (default /usr/lib/postgresql/16/bin), PG_PORT (55433), REDIS_PORT (56380), TEST_ROOT (default ${TMPDIR:-/tmp}/talentos-test).
set -euo pipefail
cd "$(dirname "$0")/.."
PG_BIN=${PG_BIN:-/usr/lib/postgresql/16/bin}; PORT=${PG_PORT:-55433}; RPORT=${REDIS_PORT:-56380}; ROOT=${TEST_ROOT:-${TMPDIR:-/tmp}/talentos-test}
case "$ROOT" in /tmp/*|"${TMPDIR:-/nonexistent}"/*) ;; *) echo "TEST_ROOT must be under /tmp or \$TMPDIR"; exit 2;; esac
EVALS=0; SMOKE=0; for a in "$@"; do case $a in --evals) EVALS=1;; --smoke) SMOKE=1;; *) echo "unknown option $a"; exit 2;; esac; done
BASE="postgresql://postgres@127.0.0.1:$PORT"; OWNER="$BASE/ai_core_test"; RUNTIME="postgresql://talent_api:local-only@127.0.0.1:$PORT/ai_core_test"
psql_() { psql -h 127.0.0.1 -p "$PORT" -U postgres -v ON_ERROR_STOP=1 -q "$@"; }
cleanup() {
  [ -n "${WORKER_PID:-}" ] && kill "$WORKER_PID" 2>/dev/null || true
  [ "$SMOKE" = 1 ] && redis-cli -p "$RPORT" shutdown nosave >/dev/null 2>&1 || true
  "$PG_BIN/pg_ctl" -D "$ROOT/data" stop -m fast >/dev/null 2>&1 || true
  [ "${KEEP_DB:-0}" = 1 ] || rm -rf -- "$ROOT"
}
trap cleanup EXIT
step() { printf '\n== %s\n' "$*"; }
newdb() { psql_ -c "create database $1"; psql_ -d "$1" -c 'create schema auth; create table auth.users(id uuid primary key);'
  DIRECT_URL=$BASE/$1 DATABASE_URL=$BASE/$1 npx prisma migrate deploy >/dev/null; }

step "throwaway Postgres on 127.0.0.1:$PORT ($ROOT)"
rm -rf -- "$ROOT"; mkdir -p "$ROOT"
"$PG_BIN/initdb" -D "$ROOT/data" -U postgres --auth=trust -E UTF8 >/dev/null
"$PG_BIN/pg_ctl" -D "$ROOT/data" -o "-p $PORT -c listen_addresses=127.0.0.1 -c unix_socket_directories=" -l "$ROOT/pg.log" start >/dev/null
for _ in $(seq 20); do psql_ -c 'select 1' >/dev/null 2>&1 && break; sleep 0.5; done
# Supabase-like prerequisites: roles the migrations reference (auth.users stub is created per DB in newdb).
psql_ -c 'create role anon nologin; create role authenticated nologin; create role service_role nologin;'

step "migrations replay (prisma migrate deploy) + schema drift check"
newdb ai_core_test
DIRECT_URL=$OWNER DATABASE_URL=$OWNER npm run -s db:diff -- --from-config-datasource --to-schema prisma/schema.prisma --exit-code >/dev/null && echo "schema.prisma == DB"
psql_ -c "create role talent_api login password 'local-only' in role talent_runtime"

step "integration suites with the runtime role (grants are tested)"
TEST_DATABASE_URL=$RUNTIME TEST_OWNER_DATABASE_URL=$OWNER node --test \
  src/control/control.integration.test.ts src/ai/runtime/agent-runtime.integration.test.ts \
  src/modules/coach-daily/daily.integration.test.ts src/mcp/mcp.integration.test.ts src/http/agent-stream.integration.test.ts

step "whole suite with the owner (repo convention; runtime-only suites skip)"
newdb ai_core_owner
TEST_DATABASE_URL=$BASE/ai_core_owner npm test

step "unit tests (no DB) + typecheck"
env -u TEST_DATABASE_URL -u TEST_OWNER_DATABASE_URL npm test
npm run -s typecheck && echo "typecheck clean"

if [ "$EVALS" = 1 ]; then
  step "AI evals (real model, synthetic data)"
  npm run -s eval -- daily_topics
  TEST_DATABASE_URL=$RUNTIME TEST_OWNER_DATABASE_URL=$OWNER npm run -s eval -- agent.talent
  TEST_DATABASE_URL=$RUNTIME TEST_OWNER_DATABASE_URL=$OWNER npm run -s eval -- agent.manager
fi

if [ "$SMOKE" = 1 ]; then
  step "end-to-end smoke: real worker + Redis + OpenAI (OneDrive off, tracing off)"
  redis-server --port "$RPORT" --save '' --appendonly no --daemonize yes --logfile "$ROOT/redis.log" >/dev/null
  DATABASE_URL=$RUNTIME REDIS_URL=redis://127.0.0.1:$RPORT ENABLE_AGENT_CORE=true ENABLE_AGENT_WRITES=true ONEDRIVE_AUTH_MODE= AI_QUEUE_PREFIX=smoke-local \
    OPENAI_AGENTS_DISABLE_TRACING=1 node --env-file=.env src/worker.ts > "$ROOT/worker.log" 2>&1 & WORKER_PID=$!
  sleep 5
  TEST_DATABASE_URL=$RUNTIME TEST_OWNER_DATABASE_URL=$OWNER node tools/agent-smoke.ts
fi
step "done"

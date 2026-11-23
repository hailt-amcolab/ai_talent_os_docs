-- CR-05 / Q&A No.38 (chốt, SP1) + [KS] 確認16 (同意): morning themes may use today's news/trends, found by the AI's web search
-- ONCE per JST day and shared by every Talent to keep the cost down (SCD 4-1 "Quyết định từ Q&A").
-- One row per day. Not tied to a Talent, so it does not go through ai_executions (which is per Talent).
BEGIN;
SET LOCAL lock_timeout='5s';
CREATE TABLE app_private.ai_daily_trends (
  day date PRIMARY KEY,                                   -- JST date
  content text NOT NULL CHECK (length(content) BETWEEN 1 AND 8000),
  sources jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(sources)='array'), -- [{url,title}] returned by the search
  provider text NOT NULL CHECK (length(provider)<=40),
  model text NOT NULL CHECK (length(model)<=100),
  input_tokens integer CHECK (input_tokens>=0),
  output_tokens integer CHECK (output_tokens>=0),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE app_private.ai_daily_trends ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.ai_daily_trends FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON app_private.ai_daily_trends TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.ai_daily_trends TO talent_runtime USING (true) WITH CHECK (true);
COMMIT;

> **Căn cứ nghiệp vụ cập nhật26/11:** [Q&A đã trả lời và phần còn mở](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md). Chỉ cập nhật tài liệu; trạng thái triển khai/DDL và các trigger chặn ghi giữ theo bằng chứng kỹ thuật hiện có. Không coi trả lời nghiệp vụ là phê duyệt schema hoặc mở ghi.

# 10. Từ điển dữ liệu đích — đề xuất kỹ thuật

> **26/11/2026 — không dùng vector:** Tập bảng đích không bổ sung embedding/vector index hoặc pipeline embedding. Memory/context tiếp tục bằng SQL; xem [quyết định](vector-decision-2026-11-26.json).

Phiên bản1.0 · 25/11/2026 · **PROPOSAL, chưa có migration/catalog đích**. Chọn phương án và transaction tại [09](09_technical_design.md). Dữ liệu máy đọc tại [contract JSON](technical-design-contracts-2026-11-25.json).

NEW là bảng đề xuất mới. EXTEND chỉ liệt kê cột bổ sung/đổi constraint trên bảng hiện có; các cột cũ vẫn theo05 và SQL migration. Không thêm các bảng này vào generator vật lý trước khi có DDL. FK đều RESTRICT; column nullable ghi rõ. UUID cho bảng mới là lựa chọn kỹ thuật, không yêu cầu khách.

Tập đề xuất: **52 bảng mới**, **10 bảng mở rộng**; đây không phải số bảng đã triển khai. Có thể chia wave, không bật đồng loạt.

## Quy ước chung

- `new_primary_key`: uuid DEFAULT gen_random_uuid()
- `timestamps`: timestamptz UTC; business day Asia/Tokyo proposal
- `mutable_version`: bigint default1; CAS expectedVersion plus trigger increment exactly1
- `foreign_keys`: ON DELETE RESTRICT unless explicitly reviewed purge detachment
- `nullable`: Explicit ? in author DSL; exported bool in columns
- `jsonb`: Strict versioned service schema plus DB type checks; no secrets; owner/ref checks via FK/trigger/transaction
- `money`: AI/provider costs numeric(20,8); billed amounts bigint minor units with currency+exponent+approved rounding
- `identity`: Existing auth_principals/roles used, no duplicate auth table
- `security`: RLS enabled; PUBLIC/anon/authenticated no direct DML; scoped backend grants; no owner/BYPASSRLS/SECURITY DEFINER shortcut

## Chỉ mục theo miền

| Miền | Bảng đề xuất mới/mở rộng |
|---|---|
| agent | `app_private.ai_executions`, `app_private.agent_steps` |
| authorization | `app_private.agent_change_proposals`, `app_private.agent_commands`, `app_private.mcp_grants`, `app_private.policy_revisions` |
| provider | `app_private.provider_effects`, `app_private.provider_effect_attempts`, `app_private.provider_callbacks`, `app_private.provider_capability_revisions` |
| registry | `app_private.categories`, `app_private.talent_category_memberships`, `app_private.talent_manager_assignments`, `app_private.agent_instructions`, `app_private.instruction_test_runs`, `app_private.talent_profile_readiness` |
| memory | `app_private.context_manifests`, `app_private.memory_observations` |
| challenge | `app_private.challenges`, `app_private.challenge_events` |
| media | `public.media_assets`, `app_private.media_asset_versions`, `app_private.media_upload_intents`, `app_private.agent_entry_resources`, `app_private.media_analyses`, `app_private.document_exports` |
| posting | `app_private.talent_posting_preferences`, `app_private.auto_post_periods`, `app_private.auto_post_period_media`, `public.posts`, `app_private.post_content_revisions`, `app_private.post_reviews`, `app_private.ng_rule_revisions`, `app_private.post_ng_checks`, `app_private.post_delivery_plans`, `public.social_accounts` |
| video | `app_private.video_proposals`, `app_private.video_cost_consents`, `public.video_generations` |
| billing | `app_private.price_revisions`, `app_private.billing_agreements`, `app_private.billing_cycles`, `app_private.video_usage_entries`, `app_private.billing_charge_lines`, `app_private.billing_invoices`, `app_private.payment_attempts`, `app_private.payment_settlements` |
| cost | `app_private.ai_price_revisions` |
| metrics | `app_private.metric_ingest_runs`, `app_private.metric_observations`, `app_private.follower_goal_revisions`, `app_private.goal_achievements` |
| notifications | `app_private.notification_events`, `app_private.manager_notification_recipients`, `app_private.email_deliveries` |
| lifecycle | `app_private.talent_status_events`, `app_private.lifecycle_actions`, `app_private.retention_cases`, `app_private.retention_receipts`, `app_private.backup_restore_runs` |
| audit | `public.activity_logs` |
| enrollment | `app_private.application_consents` |

## app_private.ai_executions

**EXTEND · agent · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `policy_revision` | `text` | Có | Policy version resolved for task |
| `cursor` | `bigint` | Có | Next durable step |
| `execution_generation` | `bigint` | Không | Distinguish explicit retry generation |

**Invariant bắt buộc:**

- Agent and legacy task profiles have separate CHECK shapes; task revision fixes ledger mode.
- Actor/channel/conversation and target scope must match; system batch has no user conversation.
- Only running owns lease; waiting releases lease; unknown blocks blind replay.
- Use existing idempotent operation and current wake event, not a second queue.

**Khóa ngoại:**

- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Existing active conversation unique; lease_until,id partial running; task_key,state,created_at

## app_private.agent_steps

**EXTEND · agent · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `tool_schema_revision` | `text` | Có | Tool contract |
| `input_hash` | `char(64)` | Có | Canonical input |
| `output_hash` | `char(64)` | Có | Stored output |
| `price_revision_id` | `uuid` | Có | Cost basis |

**Invariant bắt buộc:**

- Model/tool shape CHECK; same-run composite FKs for attempt and source step; source must be model kind (trigger).
- Unique execution+sequence and source_model_step+call_id; prepared->calling durable before HTTP.
- usage_state known does not require known price; monetary amount NULL until priced.

**Khóa ngoại:**

- `(price_revision_id)` → `app_private.ai_price_revisions(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- execution_id,sequence; provider,provider_request_ref partial not null

## app_private.agent_change_proposals

**EXTEND · authorization · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `client_id` | `text` | Có | MCP client identity |
| `grant_id` | `uuid` | Có | Inbound delegated grant |
| `policy_revision` | `text` | Có | Policy snapshot |
| `target_version_hash` | `char(64)` | Có | All resource versions covered |

**Invariant bắt buộc:**

- MCP channel requires client_id/grant_id; UI channel requires verified server session binding in command context.
- Immutable actor/scope/patch/hash/base version/policy/grant after prepared; edits create new proposal.
- DB clock expiry; only same actor confirms; consume once; verify grant again at commit.

**Khóa ngoại:**

- `(grant_id)` → `app_private.mcp_grants(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- actor_user_id,state,expires_at; grant_id

## app_private.agent_commands

**EXTEND · authorization · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `idempotency_key` | `text` | Có | Logical action identity |
| `command_state` | `text` | Có | committed or denied |
| `result` | `jsonb` | Có | Strict receipt |
| `tool_step_id` | `uuid` | Có | Source tool result |
| `policy_revision` | `text` | Có | Policy used |

**Invariant bắt buộc:**

- Widen existing proposal_id to nullable only for commands not needing Manager approval.
- Unique idempotency_key after backfill; same key+different hash returns409; proposal remains unique when present.
- Mutation, command receipt, proposal consume, tool result, audit and outbox commit together.
- Kind allowlist per command; no generic SQL mutation; MCP commands can omit execution.
- idempotency_key NOT NULL for new task revisions; legacy nullable only until explicit backfill/constraint wave.

**Khóa ngoại:**

- `(tool_step_id)` → `app_private.agent_steps(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique idempotency_key; proposal unique; execution_id; tool_step_id

## app_private.mcp_grants

**NEW · authorization · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `actor_user_id` | `uuid` | Không | Verified Manager principal |
| `client_id` | `text` | Không | OAuth client |
| `external_grant_ref` | `text` | Không | Issuer-scoped identity |
| `issuer` | `text` | Không | Trusted issuer |
| `scopes` | `jsonb` | Không | Strict capability set |
| `subject_talent_id` | `uuid` | Có | Optional narrower Talent |
| `security_version` | `bigint` | Không | Invalidate prior authority |
| `expires_at` | `timestamptz` | Không | DB check |
| `revoked_at` | `timestamptz` | Có | Revocation |

**Invariant bắt buộc:**

- Unique issuer+external_grant_ref; no bearer or refresh tokens here.
- Current Manager active + current AAL2 policy + grant scope checked at query/prepare/confirm/commit; JWT claims alone insufficient.

**Khóa ngoại:**

- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(subject_talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique issuer,external_grant_ref; actor_user_id,revoked_at,expires_at

## app_private.provider_effects

**NEW · provider · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `operation_id` | `uuid` | Không | Intent owner |
| `talent_id` | `uuid` | Có | Beneficiary |
| `provider` | `text` | Không | Adapter key |
| `provider_account_ref` | `text` | Không | Provider tenant/account scope |
| `effect_kind` | `text` | Không | Allowlisted action |
| `logical_key` | `text` | Không | Stable effect identity |
| `request_hash` | `char(64)` | Không | Canonical request |
| `payload_revision` | `text` | Không | Schema version |
| `state` | `text` | Không | planned/sending/acknowledged/succeeded/failed/unknown/cancelled |
| `lease_token` | `uuid` | Có | Effect fence |
| `lease_until` | `timestamptz` | Có | DB lease |
| `attempt_no` | `integer` | Không | Ownership counter |
| `provider_request_ref` | `text` | Có | Reconciliation ref |
| `provider_resource_ref` | `text` | Có | Created object |
| `sending_at` | `timestamptz` | Có | Commit before send |
| `resolved_at` | `timestamptz` | Có | Known terminal |
| `last_error_code` | `text` | Có | Sanitized error |

**Invariant bắt buộc:**

- Unique provider+provider_account_ref+logical_key; same key/different request_hash conflicts.
- Only sending has lease; lease loss after sending -> unknown, no blind retry.
- Provider success is assigned only by verified callback/reconciliation adapter, never model.

**Khóa ngoại:**

- `(operation_id)` → `app_private.domain_operations(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique provider,provider_account_ref,logical_key; state,lease_until partial sending; provider,provider_resource_ref

## app_private.provider_effect_attempts

**NEW · provider · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `effect_id` | `uuid` | Không | Logical effect |
| `attempt_no` | `integer` | Không | Transport attempt |
| `request_hash` | `char(64)` | Không | Exact request |
| `provider_request_ref` | `text` | Có | Returned ref |
| `outcome` | `text` | Không | succeeded/failed/unknown |
| `started_at` | `timestamptz` | Không | Call start |
| `finished_at` | `timestamptz` | Có | Call end |
| `error_code` | `text` | Có | Sanitized |

**Invariant bắt buộc:**

- Unique effect+attempt_no; append-only completed observations, in-flight state belongs to provider_effects.
- Definitive pre-send transport failure may retry same logical effect; ambiguous outcome must reconcile.

**Khóa ngoại:**

- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique effect_id,attempt_no; provider_request_ref

## app_private.provider_callbacks

**NEW · provider · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `provider` | `text` | Không | Adapter |
| `provider_account_ref` | `text` | Không | Authenticated provider scope |
| `event_key` | `text` | Không | Provider event ID or documented canonical digest |
| `payload_hash` | `char(64)` | Không | Detect collision |
| `payload` | `jsonb` | Có | Redacted normalized payload |
| `authenticated_at` | `timestamptz` | Không | Server-verified signature |
| `provider_occurred_at` | `timestamptz` | Có | External clock |
| `received_at` | `timestamptz` | Không | DB clock |
| `effect_id` | `uuid` | Có | Resolved mapping |
| `state` | `text` | Không | pending/applied/ignored/quarantined/failed |
| `processed_at` | `timestamptz` | Có | Projection transaction |
| `error_code` | `text` | Có | Reason |

**Invariant bắt buộc:**

- Unique provider+provider_account_ref+event_key; same key/different hash -> quarantine.
- Unauthenticated requests never insert accepted callbacks; unknown account mapping -> quarantine, no cross-Talent update.
- Projection monotonic by transition rules and provider version; external timestamps alone do not authorize regression.

**Khóa ngoại:**

- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique provider,provider_account_ref,event_key; state,received_at; effect_id

## app_private.provider_capability_revisions

**NEW · provider · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `provider` | `text` | Không | Adapter |
| `capability` | `text` | Không | Specific operation or metric |
| `api_revision` | `text` | Không | Version |
| `status` | `text` | Không | unverified/supported/unsupported/limited |
| `evidence_ref` | `text` | Có | POC report |
| `checked_at` | `timestamptz` | Có | Verification time |
| `checked_by` | `text` | Có | Responsible person |
| `limits` | `jsonb` | Không | Strict account/format constraints |

**Invariant bắt buộc:**

- Immutable evidence revisions; supported requires evidence_ref+checked_at+checked_by; unknown is not false proof or true support.
- No customer policy encoded as provider capability; configuration cannot override missing business approval.

**Khóa ngoại:**

- Không có FK mới riêng trong delta; vẫn giữ các FK hiện có nếu là EXTEND.

**Khóa/chỉ mục theo query:**

- provider,capability,created_at desc

## app_private.categories

**NEW · registry · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `name` | `text` | Không | Visible name |
| `color` | `text` | Không | Validated color token |
| `sort_order` | `integer` | Không | Display order |
| `retired_at` | `timestamptz` | Có | Hidden catalog entry |
| `updated_by` | `uuid` | Không | Principal |

**Invariant bắt buộc:**

- Nonblank name; sort_order>=0; unique lower(name) among non-retired.
- Delete in UI retires category, closes memberships; keep historical refs. Removal/instruction effect reviewed against UX before release.

**Khóa ngoại:**

- `(updated_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Partial unique lower(name) where retired_at null; sort_order,id

## app_private.talent_category_memberships

**NEW · registry · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject |
| `category_id` | `uuid` | Không | Category |
| `valid_from` | `timestamptz` | Không | Effective start |
| `valid_to` | `timestamptz` | Có | Effective end |
| `assigned_by` | `uuid` | Không | Manager principal |

**Invariant bắt buộc:**

- valid_to NULL or >valid_from; one current row per talent/category; serialize edits by Talent lock.
- Category cannot be newly assigned when retired.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(category_id)` → `app_private.categories(id)`, ON DELETE RESTRICT.
- `(assigned_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Partial unique talent_id,category_id where valid_to null; category_id,valid_to,talent_id

## app_private.talent_manager_assignments

**NEW · registry · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject |
| `manager_id` | `uuid` | Không | Recipient Manager |
| `valid_from` | `timestamptz` | Không | Start |
| `valid_to` | `timestamptz` | Có | End |
| `assigned_by` | `uuid` | Không | Actor |

**Invariant bắt buộc:**

- At most one current responsible Manager per Talent (technical mapping of singular assignee); history is not retroactively rewritten.
- No overlapping intervals per Talent via GiST exclusion on half-open tstzrange; btree_gist prerequisite validated.
- Manager disable never invents replacement; unresolved routing waits for policy/authorized reassignment.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(manager_id)` → `public.managers(id)`, ON DELETE RESTRICT.
- `(assigned_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Partial unique talent_id where valid_to null; manager_id,valid_to,talent_id

## app_private.agent_instructions

**EXTEND · registry · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `category_id` | `uuid` | Có | Canonical category when scope category |
| `display_name` | `text` | Có | UI label |

**Invariant bắt buộc:**

- Replace category_not_ready CHECK only after catalog and adapter complete.
- CHECK scope_kind category iff category_id non-null and scope_id=category_id; talent scope matches talent_id; global all subject IDs null.
- Existing partial unique scope+situation retained; no active duplicate instruction.

**Khóa ngoại:**

- `(category_id)` → `app_private.categories(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- category_id,situation

## app_private.instruction_test_runs

**NEW · registry · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `actor_user_id` | `uuid` | Không | Manager |
| `talent_id` | `uuid` | Không | Sandbox subject |
| `candidate_hash` | `char(64)` | Không | Unsaved input |
| `candidate` | `jsonb` | Không | Strict scope/situation/text |
| `context_manifest` | `jsonb` | Không | Source versions |
| `execution_id` | `uuid` | Có | Agent sandbox task |
| `state` | `text` | Không | pending/running/succeeded/failed/unknown |
| `result` | `jsonb` | Có | Redacted example |
| `expires_at` | `timestamptz` | Không | Technical retention limit |

**Invariant bắt buộc:**

- No live instruction mutation or publish/video/payment effects; sandbox tool allowlist read-only.
- Usage is real and counted to Adesso; test result is not confirmation for production save.

**Khóa ngoại:**

- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(execution_id)` → `app_private.ai_executions(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- actor_user_id,created_at desc; execution_id

## app_private.talent_profile_readiness

**NEW · registry · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `talent_id` | `uuid` | Không | Subject |
| `profile_version` | `bigint` | Không | Evaluated version |
| `policy_revision` | `text` | Không | Rule reference |
| `state` | `text` | Không | unassessed/ready/incomplete |
| `missing_fields` | `jsonb` | Không | Strict list |
| `evaluated_by` | `uuid` | Có | Manager or NULL system |
| `evaluated_at` | `timestamptz` | Không | As-of |

**Invariant bắt buộc:**

- Unique talent+profile_version+policy_revision; ready requires approved readiness criteria, not merely a nonempty profile.
- No ready policy while QA54/92 unresolved; editing profile requires reassessment.

**Khóa ngoại:**

- `(talent_id)` → `app_private.agent_talent_profiles(talent_id)`, ON DELETE RESTRICT.
- `(evaluated_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique talent_id,profile_version,policy_revision

## app_private.context_manifests

**NEW · memory · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `talent_id` | `uuid` | Có | NULL for Manager global |
| `scope_kind` | `text` | Không | talent/category/global |
| `scope_id` | `uuid` | Có | Resolved subject |
| `manifest` | `jsonb` | Không | Typed profile/instruction/goal/metric/memory refs |
| `manifest_hash` | `char(64)` | Không | Content identity |
| `as_of` | `timestamptz` | Không | Cutoff |
| `policy_revision` | `text` | Không | Policy used |

**Invariant bắt buộc:**

- Strict JSON schema with versioned typed refs; forbid secrets/raw signed URLs.
- Service validates every resource owner at build and consumption; hashes cannot substitute authorization.
- Execution.context_manifest stores this manifest_id/hash; existing inline manifests remain legacy.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- talent_id,as_of desc; manifest_hash

## app_private.memory_observations

**NEW · memory · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Owner |
| `observation_key` | `text` | Không | Stable logical insight |
| `revision` | `bigint` | Không | Immutable revision |
| `kind` | `text` | Không | explicit_user/manager_fact/ai_inference |
| `content` | `jsonb` | Không | Typed fact/insight |
| `source_refs` | `jsonb` | Không | Typed message/post/metric refs |
| `confidence` | `numeric(5,4)` | Có | Model assessment |
| `supersedes_id` | `uuid` | Có | Prior observation |
| `effective_from` | `timestamptz` | Không | Start |
| `invalidated_at` | `timestamptz` | Có | No longer usable |
| `invalidated_by` | `uuid` | Có | Actor |
| `source_execution_id` | `uuid` | Có | Provenance |

**Invariant bắt buộc:**

- Unique talent+observation_key+revision; immutable content/source; invalidation only mutable fields with audit.
- confidence in[0,1]; inference never overwrites Manager profile/instruction; owner validated for every source.
- No embeddings or cross-Talent corpus in this proposal.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(supersedes_id)` → `app_private.memory_observations(id)`, ON DELETE RESTRICT.
- `(invalidated_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(source_execution_id)` → `app_private.ai_executions(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique talent_id,observation_key,revision; talent_id,effective_from desc partial invalidated_at null

## app_private.challenges

**NEW · challenge · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Owner |
| `title` | `text` | Không | Task label |
| `specification` | `jsonb` | Không | Strict target/unit/timezone/evidence policy |
| `specification_hash` | `char(64)` | Không | Frozen terms |
| `starts_at` | `timestamptz` | Có | Proposed period |
| `ends_at` | `timestamptz` | Có | End |
| `source_execution_id` | `uuid` | Có | Agent proposal |
| `context_manifest_id` | `uuid` | Không | Decision context |
| `state` | `text` | Không | proposed/accepted/declined/assessment_pending/completed/cancelled |
| `assessment_policy_revision` | `text` | Có | Evidence interpretation |
| `accepted_at` | `timestamptz` | Có | Decision timestamp |
| `declined_at` | `timestamptz` | Có | Decision timestamp |
| `completed_at` | `timestamptz` | Có | Evidence-backed completion |

**Invariant bắt buộc:**

- Unique(id,talent_id); ends_at>starts_at when both known; accepted specification immutable, change requires new challenge linked in specification.
- Multiple concurrent instances allowed structurally; no invented one-active cap.
- Unknown measurement/streak/partial-SNS rules -> assessment_pending, not model-confirmed completion.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(source_execution_id)` → `app_private.ai_executions(id)`, ON DELETE RESTRICT.
- `(context_manifest_id)` → `app_private.context_manifests(id)`, ON DELETE RESTRICT.
- `(assessment_policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- talent_id,state,created_at desc; talent_id,ends_at

## app_private.challenge_events

**NEW · challenge · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `challenge_id` | `uuid` | Không | Instance |
| `talent_id` | `uuid` | Không | Owner |
| `event_key` | `text` | Không | Logical command/evidence identity |
| `kind` | `text` | Không | accepted/declined/evidence_recorded/evidence_retracted/assessed/completed/praised/cancelled |
| `actor_user_id` | `uuid` | Có | NULL for system |
| `actor_kind` | `text` | Không | talent/manager/system |
| `payload` | `jsonb` | Không | Strict evidence/result |
| `source_entry_id` | `uuid` | Có | Conversation evidence |
| `command_id` | `uuid` | Có | Mutation receipt |
| `recorded_at` | `timestamptz` | Không | DB time |

**Invariant bắt buộc:**

- Unique challenge+event_key; composite owner FK; corrections are compensating events, no overwrite/delete.
- User self-report is labeled, not equivalent to published provider evidence; only one praised event per assessment identity.
- Store ordered evidence and assessment refs; aggregate progress can rebuild from events.

**Khóa ngoại:**

- `(challenge_id,talent_id)` → `app_private.challenges(id,talent_id)`, ON DELETE RESTRICT.
- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(source_entry_id)` → `app_private.agent_entries(id)`, ON DELETE RESTRICT.
- `(command_id)` → `app_private.agent_commands(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique challenge_id,event_key; challenge_id,recorded_at,id

## public.media_assets

**EXTEND · media · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `current_revision` | `bigint` | Có | Ready metadata revision |
| `readiness` | `text` | Có | pending_upload/validating/ready/rejected/deleting/deleted |

**Invariant bắt buộc:**

- Existing source metadata preserved; file refs migrate to immutable versions.
- No signed URL as canonical reference; no publish from asset not ready or revision changed.

**Khóa ngoại:**

- Không có FK mới riêng trong delta; vẫn giữ các FK hiện có nếu là EXTEND.

**Khóa/chỉ mục theo query:**

- talent_id,readiness,created_at desc

## app_private.media_asset_versions

**NEW · media · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `asset_id` | `uuid` | Không | Logical asset |
| `talent_id` | `uuid` | Không | Owner |
| `revision` | `bigint` | Không | Immutable content |
| `storage_provider` | `text` | Không | supabase/onedrive |
| `container_ref` | `text` | Không | Bucket or drive |
| `object_ref` | `text` | Không | Key or item ID |
| `provider_version_ref` | `text` | Có | ETag/version |
| `sha256` | `char(64)` | Không | Byte checksum |
| `mime_type` | `text` | Không | Validated MIME |
| `size_bytes` | `bigint` | Không | Validated size |
| `origin` | `text` | Không | upload/ai_generated |
| `validation_result` | `jsonb` | Không | Strict scan/type results |

**Invariant bắt buộc:**

- Unique asset+revision; Unique(id,talent_id); size>0; hash valid; immutable.
- Composite asset/owner FK requires unique media_assets(id,talent_id); reuse across posts never changes owner.
- Provider ETag opaque; not assumed checksum.

**Khóa ngoại:**

- `(asset_id,talent_id)` → `public.media_assets(id,talent_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique asset_id,revision; talent_id,created_at desc; storage_provider,container_ref,object_ref

## app_private.media_upload_intents

**NEW · media · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Beneficiary |
| `actor_user_id` | `uuid` | Không | Uploader |
| `asset_id` | `uuid` | Không | Preallocated asset |
| `operation_id` | `uuid` | Không | Idempotent command |
| `state` | `text` | Không | issued/uploaded/validating/completed/rejected/expired |
| `expires_at` | `timestamptz` | Không | Ticket deadline |
| `max_bytes` | `bigint` | Không | Technical cap |
| `allowed_mime` | `jsonb` | Không | Allowlist |
| `object_ref` | `text` | Không | Server-selected key |
| `result_version_id` | `uuid` | Có | Validated version |

**Invariant bắt buộc:**

- No client chosen bucket/owner/path; complete rechecks size/type/hash; ticket is scoped and expires.
- Manager uploader distinct from subject; duplicate complete returns same version.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(asset_id)` → `public.media_assets(id)`, ON DELETE RESTRICT.
- `(operation_id)` → `app_private.domain_operations(id)`, ON DELETE RESTRICT.
- `(result_version_id)` → `app_private.media_asset_versions(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique operation_id; state,expires_at

## app_private.agent_entry_resources

**NEW · media · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `entry_id` | `uuid` | Không | Message |
| `talent_id` | `uuid` | Có | Required for Talent-owned attachment |
| `resource_kind` | `text` | Không | media/post/challenge/video/command |
| `media_version_id` | `uuid` | Có | Typed ref |
| `post_id` | `uuid` | Có | Typed ref |
| `challenge_id` | `uuid` | Có | Typed ref |
| `video_generation_id` | `uuid` | Có | Typed ref |
| `command_id` | `uuid` | Có | Typed ref |
| `position` | `integer` | Không | UI order |

**Invariant bắt buộc:**

- Exactly one typed resource ref matching kind; unique entry+position; attachment access revalidated on every read.
- Composite FKs for resource+talent where resource owned; conversation subject match via trigger/service.
- Global Manager command links may omit Talent only for command kind.

**Khóa ngoại:**

- `(entry_id)` → `app_private.agent_entries(id)`, ON DELETE RESTRICT.
- `(media_version_id,talent_id)` → `app_private.media_asset_versions(id,talent_id)`, ON DELETE RESTRICT.
- `(post_id,talent_id)` → `public.posts(id,talent_id)`, ON DELETE RESTRICT.
- `(challenge_id,talent_id)` → `app_private.challenges(id,talent_id)`, ON DELETE RESTRICT.
- `(video_generation_id,talent_id)` → `public.video_generations(id,talent_id)`, ON DELETE RESTRICT.
- `(command_id)` → `app_private.agent_commands(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique entry_id,position; media_version_id; post_id

## app_private.media_analyses

**NEW · media · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `media_version_id` | `uuid` | Không | Exact bytes |
| `talent_id` | `uuid` | Không | Owner |
| `pipeline_revision` | `text` | Không | Image/video preprocessing |
| `model` | `text` | Không | Adapter model |
| `state` | `text` | Không | pending/running/succeeded/failed/unsupported/unknown |
| `execution_id` | `uuid` | Có | Usage/checkpoint |
| `result` | `jsonb` | Có | Strict annotations |
| `result_hash` | `char(64)` | Có | Integrity |

**Invariant bắt buộc:**

- Unique media_version+pipeline_revision+model; same-owner FK; failed/unsupported never treated as successful analysis.
- Video preprocessing capability tested; metadata inference is not evidence full video read.

**Khóa ngoại:**

- `(media_version_id,talent_id)` → `app_private.media_asset_versions(id,talent_id)`, ON DELETE RESTRICT.
- `(execution_id)` → `app_private.ai_executions(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique media_version_id,pipeline_revision,model; state,created_at

## app_private.document_exports

**NEW · media · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject |
| `document_kind` | `text` | Không | profile/instructions/goals/metrics/memory |
| `source_revision_ref` | `text` | Không | DB version/hash |
| `content_hash` | `char(64)` | Không | Rendered bytes |
| `effect_id` | `uuid` | Không | Export effect |
| `container_ref` | `text` | Có | Drive |
| `item_ref` | `text` | Có | Item |
| `provider_version_ref` | `text` | Có | ETag |
| `state` | `text` | Không | pending/exported/failed/unknown |
| `exported_at` | `timestamptz` | Có | Receipt |

**Invariant bắt buộc:**

- Unique talent+document_kind+source_revision_ref; projection only, never read file back to replace authoritative DB.
- Existing agent_profile_exports remains latest-profile projection and is updated from successful receipt.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique talent_id,document_kind,source_revision_ref; state,created_at

## app_private.talent_posting_preferences

**NEW · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject |
| `review_mode` | `text` | Không | confirm/no_confirm |
| `changed_by` | `uuid` | Không | User principal |
| `policy_revision` | `text` | Không | Applicable review policy |

**Invariant bắt buộc:**

- Unique talent_id; retain history via immutable policy_snapshots in post_reviews; actor must own Talent or explicit allowed Manager capability.
- Review preference independent from post source daily/autopost/office.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(changed_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique talent_id

## app_private.auto_post_periods

**NEW · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject |
| `starts_on` | `date` | Không | Inclusive local date |
| `ends_on` | `date` | Không | Inclusive local date |
| `timezone` | `text` | Không | Default Asia/Tokyo technical choice |
| `theme` | `text` | Không | Current theme |
| `theme_revision` | `bigint` | Không | Content version |
| `instruction_manifest_id` | `uuid` | Không | Scheduling context |
| `state` | `text` | Không | planned/active/ended/cancelled |
| `ended_event_key` | `text` | Có | End notice identity |

**Invariant bắt buộc:**

- Unique(id,talent_id); end>=start; no hardcoded one-post-per-day or FIFO.
- Overlapping periods not automatically merged; branch requiring overlap policy blocked until reviewed.
- Theme edits CAS period; existing plans not silently revised while QA70/83 unresolved.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(instruction_manifest_id)` → `app_private.context_manifests(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- talent_id,state,starts_on; state,ends_on

## app_private.auto_post_period_media

**NEW · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `period_id` | `uuid` | Không | Period |
| `talent_id` | `uuid` | Không | Owner |
| `media_version_id` | `uuid` | Không | Specific bytes |
| `added_by` | `uuid` | Không | Actor |
| `removed_at` | `timestamptz` | Có | No longer candidate |

**Invariant bắt buộc:**

- Unique period+media_version; same-owner composite FKs; no destructive deletion of asset already planned.
- Selection by theme; no implicit reuse-count/FIFO business rule.

**Khóa ngoại:**

- `(period_id,talent_id)` → `app_private.auto_post_periods(id,talent_id)`, ON DELETE RESTRICT.
- `(media_version_id,talent_id)` → `app_private.media_asset_versions(id,talent_id)`, ON DELETE RESTRICT.
- `(added_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique period_id,media_version_id; period_id,removed_at

## public.posts

**EXTEND · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `current_revision_id` | `uuid` | Có | Exact editable content |
| `auto_post_period_id` | `uuid` | Có | Optional period |
| `source_kind` | `text` | Có | daily/autopost/office |
| `topic` | `text` | Có | Chosen or freeform topic |
| `topic_source_entry_id` | `uuid` | Có | Conversation choice |
| `is_work_post` | `boolean` | Có | User-declared business post |

**Invariant bắt buộc:**

- Existing id/talent owner, status and optimistic version retained; backfill legacy before enforcing new fields.
- Adopted/approved content immutable through revisions; work flag set by Talent, not model PR classification.
- Post current_revision must belong to same post and Talent; deferred FK/trigger handles insert cycle.

**Khóa ngoại:**

- `(current_revision_id)` → `app_private.post_content_revisions(id)`, ON DELETE RESTRICT.
- `(auto_post_period_id)` → `app_private.auto_post_periods(id)`, ON DELETE RESTRICT.
- `(topic_source_entry_id)` → `app_private.agent_entries(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- talent_id,created_at desc; auto_post_period_id

## app_private.post_content_revisions

**NEW · posting · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `post_id` | `uuid` | Không | Logical post |
| `talent_id` | `uuid` | Không | Owner |
| `revision` | `bigint` | Không | Immutable content version |
| `caption` | `text` | Không | Text |
| `hashtags` | `jsonb` | Không | Strict ordered string list |
| `content_hash` | `char(64)` | Không | Text+media+targets |
| `media_set` | `jsonb` | Không | Ordered media_version IDs |
| `target_platforms` | `jsonb` | Không | Strict list |
| `created_by` | `uuid` | Có | Actor or NULL system |
| `source_step_id` | `uuid` | Có | Generation step |

**Invariant bắt buộc:**

- Unique post+revision; Unique(id,post_id,talent_id); immutable; no revision overwrite.
- JSON refs validate same-owner media ready + immutable versions in transaction; materialized joins possible later, no raw URLs.
- No photo target YouTube; same text/hashtags across applicable SNS; only allowed platforms.

**Khóa ngoại:**

- `(post_id,talent_id)` → `public.posts(id,talent_id)`, ON DELETE RESTRICT.
- `(created_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(source_step_id)` → `app_private.agent_steps(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique post_id,revision; post_id,created_at desc

## app_private.post_reviews

**NEW · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `post_id` | `uuid` | Không | Logical post |
| `talent_id` | `uuid` | Không | Owner |
| `content_revision_id` | `uuid` | Không | Snapshot |
| `review_kind` | `text` | Không | talent_adopt/manager_approval |
| `round_no` | `integer` | Không | Request round |
| `state` | `text` | Không | requested/approved/returned/expired/invalidated |
| `actor_user_id` | `uuid` | Có | Actual deciding actor |
| `assignee_snapshot_id` | `uuid` | Có | Routing snapshot |
| `decision_reason` | `text` | Có | Required return |
| `decided_at` | `timestamptz` | Có | Decision |
| `deadline_at` | `timestamptz` | Có | Approval deadline |
| `policy_snapshot` | `jsonb` | Không | Mode/version and exceptions |

**Invariant bắt buộc:**

- Unique post+review_kind+round_no; FK revision/post/talent; returned requires nonblank reason; decision identity immutable.
- Manager reviews only work-post branch; office/autopost do not acquire requirement just because table exists.
- New content invalidates affected approval; NG automatic rewrite records separate policy lineage without adding Talent re-confirm.

**Khóa ngoại:**

- `(content_revision_id,post_id,talent_id)` → `app_private.post_content_revisions(id,post_id,talent_id)`, ON DELETE RESTRICT.
- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(assignee_snapshot_id)` → `app_private.talent_manager_assignments(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique post_id,review_kind,round_no; state,deadline_at; assignee_snapshot_id,state

## app_private.ng_rule_revisions

**NEW · posting · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `revision` | `bigint` | Không | Ruleset identity |
| `rules` | `jsonb` | Không | Strict snapshot |
| `rules_hash` | `char(64)` | Không | Integrity |
| `created_by` | `uuid` | Không | Manager |

**Invariant bắt buộc:**

- Unique revision; ng_words remains editable source, publish ruleset atomically on edit; no implicit retroactive rescan.

**Khóa ngoại:**

- `(created_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique revision

## app_private.post_ng_checks

**NEW · posting · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `content_revision_id` | `uuid` | Không | Exact input |
| `ruleset_id` | `uuid` | Không | Rule snapshot |
| `execution_id` | `uuid` | Có | Model check |
| `outcome` | `text` | Không | pass/rewrite_required/failed/unknown |
| `rewritten_revision_id` | `uuid` | Có | AI rewrite output |
| `policy_revision` | `text` | Không | Workflow |
| `result` | `jsonb` | Không | Redacted finding |
| `command_id` | `uuid` | Không | Logical NG check command |

**Invariant bắt buộc:**

- Immutable result; output revision same post/owner; repeat detection uses logical command idempotency.
- Recheck rewrite output before publication; unresolved cycle -> blocked NG workflow, never silent approve.

**Khóa ngoại:**

- `(content_revision_id)` → `app_private.post_content_revisions(id)`, ON DELETE RESTRICT.
- `(ruleset_id)` → `app_private.ng_rule_revisions(id)`, ON DELETE RESTRICT.
- `(execution_id)` → `app_private.ai_executions(id)`, ON DELETE RESTRICT.
- `(rewritten_revision_id)` → `app_private.post_content_revisions(id)`, ON DELETE RESTRICT.
- `(command_id)` → `app_private.agent_commands(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- content_revision_id,ruleset_id,created_at desc
- Unique command_id

## app_private.post_delivery_plans

**NEW · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `post_delivery_id` | `uuid` | Không | Logical SNS destination |
| `talent_id` | `uuid` | Không | Owner |
| `content_revision_id` | `uuid` | Không | Exact content |
| `plan_revision` | `bigint` | Không | Immutable intent |
| `planned_at` | `timestamptz` | Không | Per-SNS time |
| `connection_revision` | `bigint` | Không | Account binding |
| `context_manifest_id` | `uuid` | Không | Scheduling basis |
| `state` | `text` | Không | planned/blocked/submitting/scheduled/cancelling/cancelled/published/failed/unknown |
| `blocked_reason` | `text` | Có | Unresolved precondition |
| `effect_id` | `uuid` | Có | Schedule/publish effect |
| `cancel_effect_id` | `uuid` | Có | Cancellation effect |
| `supersedes_plan_id` | `uuid` | Có | Explicit replan |

**Invariant bắt buộc:**

- Unique delivery+plan_revision; same-owner content and delivery by composite FK/trigger.
- Logical delivery unique post/platform remains; retry new plan revision only after authorized user command, never OS auto-repost after failed.
- One current nonterminal plan per delivery by partial unique planned/blocked/submitting/scheduled/cancelling/unknown.
- Provider scheduled != published; cancel intent != cancelled ack; stale callbacks cannot resurrect superseded plan.

**Khóa ngoại:**

- `(post_delivery_id)` → `public.post_deliveries(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(content_revision_id)` → `app_private.post_content_revisions(id)`, ON DELETE RESTRICT.
- `(context_manifest_id)` → `app_private.context_manifests(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.
- `(cancel_effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.
- `(supersedes_plan_id)` → `app_private.post_delivery_plans(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique post_delivery_id,plan_revision; partial active unique post_delivery_id; state,planned_at; effect_id

## public.social_accounts

**EXTEND · posting · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `connection_revision` | `bigint` | Có | Identity revision |
| `provider_account_ref` | `text` | Có | Adapter user scope |
| `connection_state` | `text` | Có | not_connected/connected/disconnected |
| `last_verified_at` | `timestamptz` | Có | Reconcile time |

**Invariant bắt buộc:**

- Partial unique talent+platform when connected; reconnect same account retains stable logical identity.
- QA95 answered 2026-11-26: block disconnect/account switch for an SNS with scheduled posts; show related posts so Talent can cancel first. Other SNS without plans remain available. Do not reuse historical external_post binding for another account.

**Khóa ngoại:**

- Không có FK mới riêng trong delta; vẫn giữ các FK hiện có nếu là EXTEND.

**Khóa/chỉ mục theo query:**

- Partial unique talent_id,platform where connection_state connected; provider_account_ref

## app_private.video_proposals

**NEW · video · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Beneficiary |
| `scenario` | `jsonb` | Không | Strict title/scenes |
| `scenario_hash` | `char(64)` | Không | Frozen after consent |
| `model_config_revision` | `text` | Không | Provider model/format |
| `input_versions` | `jsonb` | Không | Ordered media version refs |
| `context_manifest_id` | `uuid` | Không | Basis |
| `state` | `text` | Không | editing/ready/consented/superseded |
| `source_entry_id` | `uuid` | Có | Chat origin |

**Invariant bắt buộc:**

- Ideas/revisions never create provider effect or charge; validate referenced media owner.
- New scenario/assets/model after consent require new proposal+consent; not mutation of consented row.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(context_manifest_id)` → `app_private.context_manifests(id)`, ON DELETE RESTRICT.
- `(source_entry_id)` → `app_private.agent_entries(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- talent_id,state,created_at desc

## app_private.price_revisions

**NEW · billing · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `charge_kind` | `text` | Không | monthly_fee/video_estimate/video_charge |
| `currency` | `char(3)` | Không | ISO currency |
| `minor_unit_exponent` | `smallint` | Không | Provider currency precision |
| `unit_amount_minor` | `bigint` | Không | Amount per unit |
| `effective_from` | `timestamptz` | Không | Start |
| `policy_status` | `text` | Không | proposed/approved/retired |
| `approval_ref` | `text` | Có | Authorized policy evidence |
| `created_by` | `uuid` | Không | Manager principal |

**Invariant bắt buộc:**

- Immutable price version; >=0 amounts; exponent0..6; approved requires approval_ref, not model output.
- Estimate vs actual charge separate kinds; no using estimated setting as silently approved billable price.
- Effective overlap resolved by approved agreement reference, not choosing latest timestamp in invoice query.

**Khóa ngoại:**

- `(created_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- charge_kind,currency,effective_from desc

## app_private.video_cost_consents

**NEW · video · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `talent_id` | `uuid` | Không | Beneficiary |
| `proposal_id` | `uuid` | Không | Exact scenario |
| `actor_user_id` | `uuid` | Không | Person asking generation |
| `estimate_revision_id` | `uuid` | Không | Displayed estimate |
| `disclosure_revision` | `text` | Không | Wording |
| `payload_hash` | `char(64)` | Không | Scenario+media+model+price |
| `confirmed_at` | `timestamptz` | Không | Server time |
| `expires_at` | `timestamptz` | Không | Technical expiry |
| `command_id` | `uuid` | Không | Logical request |

**Invariant bắt buộc:**

- Unique command_id; one request cannot consume same consent twice via video_generations unique consent_id.
- Manager actor beneficiary separate per CR02; revoke/change/expiry before send blocks generation.
- Price/amount disclaimer visible and recorded; plain chat intent alone not cost consent.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(proposal_id)` → `app_private.video_proposals(id)`, ON DELETE RESTRICT.
- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(estimate_revision_id)` → `app_private.price_revisions(id)`, ON DELETE RESTRICT.
- `(command_id)` → `app_private.agent_commands(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique command_id; talent_id,confirmed_at desc

## public.video_generations

**EXTEND · video · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `proposal_id` | `uuid` | Có | Frozen scenario |
| `consent_id` | `uuid` | Có | Unique consumed cost consent |
| `effect_id` | `uuid` | Có | Generation provider effect |
| `remade_from_id` | `uuid` | Có | Prior generation |
| `model_config_revision` | `text` | Có | Exact model/format |
| `disposition` | `text` | Có | unreviewed/use/discard |
| `provider_cost_amount` | `numeric(20,8)` | Có | Observed cost |
| `provider_cost_currency` | `char(3)` | Có | Cost currency |

**Invariant bắt buộc:**

- Backfill legacy before enforcing new write shape; new request requires valid same-owner consent/proposal.
- Failed/unknown costs and Talent billable usage separate; is_counted remains legacy projection.
- Output asset ready before use; use action creates post draft, never auto-publish.

**Khóa ngoại:**

- `(proposal_id)` → `app_private.video_proposals(id)`, ON DELETE RESTRICT.
- `(consent_id)` → `app_private.video_cost_consents(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.
- `(remade_from_id)` → `public.video_generations(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique consent_id partial non-null; effect_id; remade_from_id

## app_private.billing_agreements

**NEW · billing · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Paying Talent |
| `provider` | `text` | Không | Square adapter selection |
| `provider_customer_ref` | `text` | Không | External ID |
| `provider_subscription_ref` | `text` | Có | Only if provider confirmed |
| `monthly_price_id` | `uuid` | Không | Approved price |
| `anchor_at` | `timestamptz` | Không | Registration anchor |
| `timezone` | `text` | Không | Cycle calculation |
| `cycle_policy_revision` | `text` | Không | Approved boundary rules |
| `state` | `text` | Không | pending/active/ended |
| `effective_from` | `timestamptz` | Không | Start |
| `effective_to` | `timestamptz` | Có | End |
| `policy_approval_ref` | `text` | Không | Authority evidence |

**Invariant bắt buộc:**

- Office cannot have billed Talent agreement; composite owner/account-type or trigger, never infer from payer name.
- No active overlap per Talent; month-end anchor/day-roll semantics must have approved policy.
- Paused retains agreement billing eligibility; ended stops future fee generation, historical debt retained per policy.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(monthly_price_id)` → `app_private.price_revisions(id)`, ON DELETE RESTRICT.
- `(cycle_policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- talent_id,state; Unique provider,provider_customer_ref,talent_id,effective_from

## app_private.billing_cycles

**NEW · billing · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `agreement_id` | `uuid` | Không | Contract |
| `talent_id` | `uuid` | Không | Owner |
| `period_start` | `timestamptz` | Không | Inclusive |
| `period_end` | `timestamptz` | Không | Exclusive |
| `state` | `text` | Không | open/prepared/finalized/void |
| `policy_revision` | `text` | Không | Calculation rules |
| `closed_at` | `timestamptz` | Có | Finalization |

**Invariant bắt buộc:**

- Unique agreement+period_start; end>start; cycles for same agreement nonoverlap via exclusion.
- Finalized cycle immutable apart from provider projections; later changes are linked adjustment lines.
- Billing month does not assume calendar month; source charge coverage recorded separately.

**Khóa ngoại:**

- `(agreement_id)` → `app_private.billing_agreements(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique agreement_id,period_start; talent_id,period_start desc; state,period_end

## app_private.video_usage_entries

**NEW · billing · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `generation_id` | `uuid` | Không | Source request |
| `talent_id` | `uuid` | Không | Beneficiary |
| `entry_kind` | `text` | Không | requested/completed/failed/billable/adjustment |
| `event_key` | `text` | Không | Deduplication |
| `quantity` | `numeric(12,4)` | Không | Signed event units |
| `price_revision_id` | `uuid` | Có | Frozen billable price |
| `cycle_id` | `uuid` | Có | Allocation after policy approval |
| `reverses_entry_id` | `uuid` | Có | Correction |
| `policy_revision` | `text` | Có | Billability rules |
| `source_callback_id` | `uuid` | Có | Verified result |
| `recorded_at` | `timestamptz` | Không | DB time |

**Invariant bắt buộc:**

- Unique generation+event_key; immutable facts; billable/adjustment only after approved usage policy.
- Failed video is not billable under source; timing/late adjustment follows QA1/62, no default assumed.
- Office usage recorded, not invoiced through Talent billing; adjustment uses reversal reference, never mutate prior is_counted as ledger.

**Khóa ngoại:**

- `(generation_id)` → `public.video_generations(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(price_revision_id)` → `app_private.price_revisions(id)`, ON DELETE RESTRICT.
- `(cycle_id)` → `app_private.billing_cycles(id)`, ON DELETE RESTRICT.
- `(reverses_entry_id)` → `app_private.video_usage_entries(id)`, ON DELETE RESTRICT.
- `(source_callback_id)` → `app_private.provider_callbacks(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique generation_id,event_key; talent_id,recorded_at; cycle_id

## app_private.billing_charge_lines

**NEW · billing · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `cycle_id` | `uuid` | Không | Accounting cycle |
| `talent_id` | `uuid` | Không | Owner |
| `source_key` | `text` | Không | Logical monthly/video/adjustment identity |
| `charge_kind` | `text` | Không | monthly/video/adjustment |
| `usage_entry_id` | `uuid` | Có | Video basis |
| `price_revision_id` | `uuid` | Không | Actual price |
| `quantity` | `numeric(12,4)` | Không | Units |
| `amount_minor` | `bigint` | Không | Signed exact charge |
| `currency` | `char(3)` | Không | Currency |
| `reverses_line_id` | `uuid` | Có | Correction |
| `policy_revision` | `text` | Không | Computation/rounding |

**Invariant bắt buộc:**

- Unique source_key; amount sign/quantity constrained by kind; monthly/video nonnegative, adjustment signed.
- Currency/owner/cycle/price consistency checked transactionally; use decimal multiplication and explicit currency rounding once into minor units.
- Append-only; after finalize no edit/delete, add approved adjustment into eligible future cycle.

**Khóa ngoại:**

- `(cycle_id)` → `app_private.billing_cycles(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(usage_entry_id)` → `app_private.video_usage_entries(id)`, ON DELETE RESTRICT.
- `(price_revision_id)` → `app_private.price_revisions(id)`, ON DELETE RESTRICT.
- `(reverses_line_id)` → `app_private.billing_charge_lines(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique source_key; cycle_id,created_at; usage_entry_id

## app_private.billing_invoices

**NEW · billing · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `cycle_id` | `uuid` | Không | Frozen charge set |
| `talent_id` | `uuid` | Không | Owner |
| `invoice_revision` | `bigint` | Không | External send revision |
| `line_snapshot` | `jsonb` | Không | Exact line IDs/hash |
| `total_minor` | `bigint` | Không | Charge sum |
| `currency` | `char(3)` | Không | Single currency |
| `state` | `text` | Không | prepared/sending/issued/paid/failed/unknown/void |
| `provider_invoice_ref` | `text` | Có | External receipt |
| `effect_id` | `uuid` | Có | Invoice effect |

**Invariant bắt buộc:**

- Unique cycle+invoice_revision; one active payable invoice per cycle; exact sum checked with locked cycle and immutable line snapshot.
- No paid from model/browser redirect; adapter verified provider payment observations only.
- No retransmission/new invoice for unknown outcome; reconcile first.

**Khóa ngoại:**

- `(cycle_id)` → `app_private.billing_cycles(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique cycle_id,invoice_revision; effect_id; provider_invoice_ref; talent_id,created_at desc

## app_private.payment_attempts

**NEW · billing · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `invoice_id` | `uuid` | Không | Payable invoice |
| `attempt_no` | `integer` | Không | Business collection action |
| `effect_id` | `uuid` | Không | Same send identity |
| `amount_minor` | `bigint` | Không | Requested sum |
| `currency` | `char(3)` | Không | Match invoice |
| `provider_payment_ref` | `text` | Có | External payment |
| `state` | `text` | Không | planned/sending/succeeded/failed/unknown/cancelled |
| `observed_at` | `timestamptz` | Có | Verified result |

**Invariant bắt buộc:**

- Unique invoice+attempt_no; unique effect; same invoice amount/currency.
- No automatic recollection after ambiguous payment or no approved retry policy; reconcile partial/multiple payments instead of setting paid by latest callback.
- Provider payment unique within account scope on effect ledger; out-of-order failure cannot undo successful settlement.

**Khóa ngoại:**

- `(invoice_id)` → `app_private.billing_invoices(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique invoice_id,attempt_no; Unique effect_id; state,created_at

## app_private.ai_price_revisions

**NEW · cost · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `provider` | `text` | Không | Model provider |
| `model` | `text` | Không | Model ID |
| `currency` | `char(3)` | Không | Cost currency |
| `input_per_million` | `numeric(20,8)` | Không | Input rate |
| `cached_per_million` | `numeric(20,8)` | Có | Cached rate |
| `output_per_million` | `numeric(20,8)` | Không | Output rate |
| `effective_from` | `timestamptz` | Không | Valid start |
| `evidence_ref` | `text` | Không | Provider price record |
| `rounding_revision` | `text` | Không | Reporting method |

**Invariant bắt buộc:**

- All rates >=0; immutable; referenced explicitly by step, not retroactively lookup latest.
- Cached_tokens subset of input; formula excludes cached subset from uncached rate. Provider-hosted tool fees recorded from receipt separately, not invented token conversion.

**Khóa ngoại:**

- Không có FK mới riêng trong delta; vẫn giữ các FK hiện có nếu là EXTEND.

**Khóa/chỉ mục theo query:**

- provider,model,effective_from desc

## app_private.metric_ingest_runs

**NEW · metrics · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `provider` | `text` | Không | Adapter |
| `talent_id` | `uuid` | Không | Owner |
| `social_account_id` | `uuid` | Không | Account |
| `connection_revision` | `bigint` | Không | Binding |
| `capture_on` | `date` | Không | Local day |
| `state` | `text` | Không | pending/running/succeeded/partial/failed |
| `attempt_no` | `integer` | Không | Read retry counter |
| `started_at` | `timestamptz` | Có | Fetch start |
| `finished_at` | `timestamptz` | Có | Fetch end |
| `capability_revision_id` | `uuid` | Không | Provider evidence |
| `error_code` | `text` | Có | Sanitized |

**Invariant bắt buộc:**

- Unique account+connection_revision+capture_on; retries update run metadata, observations immutable per fetch.
- Read retry allowed with quota/backoff, different from forbidden automatic business repost.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(social_account_id)` → `public.social_accounts(id)`, ON DELETE RESTRICT.
- `(capability_revision_id)` → `app_private.provider_capability_revisions(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique social_account_id,connection_revision,capture_on; state,created_at

## app_private.metric_observations

**NEW · metrics · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `ingest_run_id` | `uuid` | Không | Fetch provenance |
| `talent_id` | `uuid` | Không | Owner |
| `social_account_id` | `uuid` | Không | Exact account |
| `post_delivery_id` | `uuid` | Có | NULL for follower account metric |
| `metric_name` | `text` | Không | Canonical allowlist |
| `value` | `numeric(24,6)` | Có | Observed number |
| `availability` | `text` | Không | available/missing/unsupported/error |
| `provider_observed_at` | `timestamptz` | Có | Observation time |
| `fetched_at` | `timestamptz` | Không | Receipt time |
| `source_schema_revision` | `text` | Không | Adapter mapping |
| `raw_ref` | `text` | Có | Restricted provider payload ref |

**Invariant bắt buộc:**

- Unique ingest_run+subject kind+subject ID+metric name+fetched_at with NULLS NOT DISTINCT for absent post.
- available iff value not null; nonnegative values for count metrics. Stale computed from age, not value0.
- Same-owner account/delivery validation; follower snapshots/post_metric_snapshots derived compatibility projections, never counted twice.

**Khóa ngoại:**

- `(ingest_run_id)` → `app_private.metric_ingest_runs(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(social_account_id)` → `public.social_accounts(id)`, ON DELETE RESTRICT.
- `(post_delivery_id)` → `public.post_deliveries(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- social_account_id,metric_name,fetched_at desc; post_delivery_id,metric_name,fetched_at desc; ingest_run_id

## app_private.follower_goal_revisions

**NEW · metrics · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `goal_id` | `uuid` | Không | Existing follower goal |
| `talent_id` | `uuid` | Không | Owner |
| `platform` | `text` | Không | SNS |
| `revision` | `bigint` | Không | Immutable version |
| `target_count` | `bigint` | Không | Target |
| `deadline_on` | `date` | Có | Due |
| `effective_from` | `timestamptz` | Không | Start |
| `created_by` | `uuid` | Không | Manager |

**Invariant bắt buộc:**

- Unique goal+revision; target>0; same Talent/platform as follower_goals.
- Current goal projection changes immediately; achievement records refer exact revision.

**Khóa ngoại:**

- `(goal_id)` → `public.follower_goals(id)`, ON DELETE RESTRICT.
- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(created_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique goal_id,revision; talent_id,platform,effective_from desc

## app_private.goal_achievements

**NEW · metrics · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `goal_revision_id` | `uuid` | Không | Target revision |
| `metric_observation_id` | `uuid` | Không | Evidence |
| `event_key` | `text` | Không | Notification identity |
| `achieved_at` | `timestamptz` | Không | Evidence time |

**Invariant bắt buộc:**

- Unique goal_revision; verify current account/platform, available metric>=target and effective revision before event.
- Changing goal creates revision, never rewrites prior achievement; intermediate25/50/75percent not presumed approved.

**Khóa ngoại:**

- `(goal_revision_id)` → `app_private.follower_goal_revisions(id)`, ON DELETE RESTRICT.
- `(metric_observation_id)` → `app_private.metric_observations(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique goal_revision_id; Unique event_key

## app_private.notification_events

**NEW · notifications · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `event_key` | `text` | Không | Canonical domain event |
| `talent_id` | `uuid` | Có | No Talent for application |
| `application_id` | `uuid` | Có | New application |
| `kind` | `text` | Không | Allowlist16 source triggers |
| `resource_refs` | `jsonb` | Không | Typed IDs only |
| `cause` | `text` | Không | Normalized reason classification |
| `policy_revision` | `text` | Không | Routing policy |
| `occurred_at` | `timestamptz` | Không | Domain time |

**Invariant bắt buộc:**

- Unique event_key; exactly applicable subject family; no severe-consultation kind.
- Approval request projects to approval queue; period-end to conversation; not every event creates generic inbox.
- Recipient snapshot resolves at event time; SNS/network publishing failure excludes Manager per source.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(application_id)` → `public.talent_applications(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique event_key; talent_id,occurred_at desc; application_id

## app_private.manager_notification_recipients

**NEW · notifications · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `event_id` | `uuid` | Không | Event |
| `notification_id` | `uuid` | Không | Existing Manager inbox content |
| `manager_id` | `uuid` | Không | Frozen recipient |
| `assignment_id` | `uuid` | Có | Routing source |
| `read_at` | `timestamptz` | Có | Opened |
| `handled_at` | `timestamptz` | Có | Business action |
| `handled_by` | `uuid` | Có | Actor |
| `handling_policy_revision` | `text` | Có | Decision for QA97 |
| `state` | `text` | Không | active/suppressed/routing_pending |

**Invariant bắt buộc:**

- Unique event+manager; handled fields paired; read never implies handled without approved policy.
- Disabled Manager delivery suppressed, history retained; replacement requires explicit policy, not all-manager fallback.
- manager_notifications.handled_at becomes compatibility projection only after semantics approved.

**Khóa ngoại:**

- `(event_id)` → `app_private.notification_events(id)`, ON DELETE RESTRICT.
- `(notification_id)` → `public.manager_notifications(id)`, ON DELETE RESTRICT.
- `(manager_id)` → `public.managers(id)`, ON DELETE RESTRICT.
- `(assignment_id)` → `app_private.talent_manager_assignments(id)`, ON DELETE RESTRICT.
- `(handled_by)` → `public.managers(id)`, ON DELETE RESTRICT.
- `(handling_policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique event_id,manager_id; manager_id,read_at,created_at desc; manager_id,handled_at,created_at desc

## app_private.email_deliveries

**NEW · notifications · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `event_id` | `uuid` | Không | Source |
| `manager_id` | `uuid` | Có | Manager recipient |
| `application_id` | `uuid` | Có | Applicant recipient |
| `recipient_address_ref` | `text` | Không | Restricted address reference |
| `template_revision` | `text` | Không | Approved content |
| `effect_id` | `uuid` | Không | Email send effect |
| `state` | `text` | Không | pending/sending/accepted/delivered/failed/unknown/suppressed |
| `provider_message_ref` | `text` | Có | Receipt |
| `failure_code` | `text` | Có | Sanitized |

**Invariant bắt buộc:**

- Exactly one recipient family; unique event+recipient+template revision; address/payload not put in logs/outbox.
- Accepted/delivered are transport facts, not read/handled. No repeat temporary password email just because callback lost; secret delivery contract external to this ledger.

**Khóa ngoại:**

- `(event_id)` → `app_private.notification_events(id)`, ON DELETE RESTRICT.
- `(manager_id)` → `public.managers(id)`, ON DELETE RESTRICT.
- `(application_id)` → `public.talent_applications(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- event_id; manager_id,state; effect_id

## app_private.talent_status_events

**NEW · lifecycle · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `talent_id` | `uuid` | Không | Subject |
| `from_status` | `text` | Không | Existing token |
| `to_status` | `text` | Không | before_use/in_use/paused/ended |
| `actor_user_id` | `uuid` | Không | Manager |
| `operation_id` | `uuid` | Không | Idempotent command |
| `effective_at` | `timestamptz` | Không | DB time |
| `reason` | `text` | Có | Non-sensitive note |
| `policy_revision` | `text` | Không | Capability matrix |
| `resource_version` | `bigint` | Không | New Talent version |

**Invariant bắt buộc:**

- Unique operation_id; no transition out of ended; API may display terminated but SQL token remains ended.
- Paused != posting pause != payment delinquency; payment failure does not imply ended or paused.
- State change and outbox commit together; provider cancellation completion tracked separately.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(actor_user_id)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.
- `(operation_id)` → `app_private.domain_operations(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique operation_id; talent_id,effective_at desc

## app_private.lifecycle_actions

**NEW · lifecycle · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject |
| `status_event_id` | `uuid` | Có | Termination source |
| `action_key` | `text` | Không | Idempotent saga identity |
| `action_kind` | `text` | Không | revoke_sessions/stop_reminders/cancel_plan/end_billing/purge |
| `target_ref` | `jsonb` | Không | Strict typed target |
| `effect_id` | `uuid` | Có | External effect |
| `state` | `text` | Không | pending/running/completed/failed/unknown/blocked |
| `blocked_reason` | `text` | Có | Decision/dependency |

**Invariant bắt buộc:**

- Unique action_key; cancellation unknown never declares lifecycle fully complete; identity revoke transaction separate from provider HTTP.
- No backfill publication on resume; overdue behavior remains unenabled without policy.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(status_event_id)` → `app_private.talent_status_events(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique action_key; talent_id,state; effect_id

## app_private.retention_cases

**NEW · lifecycle · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `talent_id` | `uuid` | Không | Subject until final purge |
| `subject_digest` | `char(64)` | Không | HMAC audit identity with separate retention |
| `terminated_at` | `timestamptz` | Không | Anchor |
| `eligible_at` | `timestamptz` | Không | Six calendar months proposal |
| `policy_revision` | `text` | Không | Authorized deletion scope |
| `scope_manifest` | `jsonb` | Không | Tables/objects/providers |
| `state` | `text` | Không | scheduled/blocked/running/completed/unknown |
| `hold_reason` | `text` | Có | Debt/shared asset/missing scope |
| `completed_at` | `timestamptz` | Có | All required receipts |

**Invariant bắt buộc:**

- Unique talent_id; no deletion before eligible_at; calendar-month interpretation needs policy review, not fixed180days assumption.
- Financial/audit obligations and office scope gate destructive work; no indefinite hold declared approved.
- FK to Talent intentionally RESTRICT while case active; final minimal receipt detached in same finalization transaction before removing Talent.

**Khóa ngoại:**

- `(talent_id)` → `public.talents(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique talent_id; state,eligible_at

## app_private.retention_receipts

**NEW · lifecycle · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `case_id` | `uuid` | Có | NULL only after finalized case purge |
| `subject_digest` | `char(64)` | Không | Minimal erased-subject marker |
| `resource_kind` | `text` | Không | db/storage/onedrive/provider/cache/backup |
| `resource_digest` | `char(64)` | Không | No PII path |
| `action_key` | `text` | Không | Deduplicate deletion |
| `state` | `text` | Không | pending/deleted/not_found/failed/unknown |
| `effect_id` | `uuid` | Có | External deletion |
| `checked_at` | `timestamptz` | Có | Proof time |
| `expires_at` | `timestamptz` | Không | Approved minimal marker retention |

**Invariant bắt buộc:**

- Unique action_key; no raw names/email/path in post-purge receipts; digest key retention and revocation reviewed.
- Case FK detached before case/Talent delete; original owner-independent marker allows restore re-apply deletion.
- Backup deletion means scheduled backup expiry or explicit provider receipt, never claim immediate erased historical backups.
- Detach nullable effect_id as part of approved final purge before deleting effect rows; preserve only resource digest and external evidence digest.

**Khóa ngoại:**

- `(case_id)` → `app_private.retention_cases(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique action_key; subject_digest,resource_kind; expires_at

## app_private.backup_restore_runs

**NEW · lifecycle · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `version` | `bigint` | Không | CAS; default1, tăng đúng1 mỗi UPDATE |
| `updated_at` | `timestamptz` | Không | DB clock |
| `kind` | `text` | Không | backup/restore_drill/production_restore |
| `environment` | `text` | Không | Isolated environment label |
| `provider_snapshot_ref` | `text` | Có | External backup handle |
| `storage_manifest_hash` | `char(64)` | Không | Byte/DB consistency manifest |
| `cutoff_at` | `timestamptz` | Không | Consistency point |
| `deletion_watermark` | `timestamptz` | Không | Reapplied receipts cutoff |
| `state` | `text` | Không | pending/running/validated/failed |
| `started_at` | `timestamptz` | Không | Execution |
| `finished_at` | `timestamptz` | Có | End |
| `evidence_ref` | `text` | Có | Restore drill report |

**Invariant bắt buộc:**

- Validated requires evidence_ref and consistency/deletion/effect reconciliation checks.
- Restore environment starts with outbound workers disabled; only authorized reconciliation can re-enable.
- Secrets and encryption keys backed up in controlled separate mechanism, not table fields.

**Khóa ngoại:**

- Không có FK mới riêng trong delta; vẫn giữ các FK hiện có nếu là EXTEND.

**Khóa/chỉ mục theo query:**

- kind,started_at desc; state

## public.activity_logs

**EXTEND · audit · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `operation_id` | `uuid` | Có | Domain intent |
| `execution_id` | `uuid` | Có | Agent run |
| `command_id` | `uuid` | Có | Receipt |
| `effect_id` | `uuid` | Có | External effect |
| `resource_revision` | `text` | Có | Version/hash |
| `policy_revision` | `text` | Có | Decision basis |

**Invariant bắt buộc:**

- Append-only runtime; actor true principal distinct from model actor label; audit allowlist and redaction.
- FKs before purge follow approved audit retention strategy; do not bypass append-only to perform ordinary writes.

**Khóa ngoại:**

- `(operation_id)` → `app_private.domain_operations(id)`, ON DELETE RESTRICT.
- `(execution_id)` → `app_private.ai_executions(id)`, ON DELETE RESTRICT.
- `(command_id)` → `app_private.agent_commands(id)`, ON DELETE RESTRICT.
- `(effect_id)` → `app_private.provider_effects(id)`, ON DELETE RESTRICT.
- `(policy_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- operation_id; command_id; effect_id

## app_private.application_consents

**NEW · enrollment · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `application_id` | `uuid` | Không | Submitted application |
| `terms_revision` | `text` | Không | Presented version |
| `terms_hash` | `char(64)` | Không | Exact content |
| `terms_ref` | `text` | Không | Approved location |
| `consented_at` | `timestamptz` | Không | Server receipt |
| `operation_id` | `uuid` | Không | Logical submission |

**Invariant bắt buộc:**

- Unique application+terms_revision+operation; consent true represented by record existence; no parental consent fields.
- Display location remains確認57; new terms do not automatically create re-consent obligation.

**Khóa ngoại:**

- `(application_id)` → `public.talent_applications(id)`, ON DELETE RESTRICT.
- `(operation_id)` → `app_private.domain_operations(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique application_id,terms_revision,operation_id

## app_private.payment_settlements

**NEW · billing · History/receipt bất biến; SELECT/INSERT cho writer.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `invoice_id` | `uuid` | Không | Invoice subject |
| `payment_attempt_id` | `uuid` | Có | Initiating collection |
| `provider` | `text` | Không | Adapter |
| `provider_account_ref` | `text` | Không | External merchant scope |
| `provider_transaction_ref` | `text` | Không | Unique actual money movement |
| `amount_minor` | `bigint` | Không | Signed settled amount |
| `currency` | `char(3)` | Không | Invoice currency |
| `kind` | `text` | Không | payment/reversal |
| `reverses_settlement_id` | `uuid` | Có | Original movement |
| `provider_settled_at` | `timestamptz` | Không | Observed accounting time |
| `callback_id` | `uuid` | Có | Verified receipt |
| `reconciliation_ref` | `text` | Có | Verified query evidence |

**Invariant bắt buộc:**

- Unique provider+provider_account_ref+provider_transaction_ref; immutable actual settlements, not requested attempt amount.
- Payment>0, reversal<0 and referenced original; currency and owner match invoice; reversal total cannot exceed original via locked invoice transaction.
- At least callback_id or reconciliation_ref; invoice paid projection from net settled sum and approved collection policy; overpayment quarantined, no automatic refund.

**Khóa ngoại:**

- `(invoice_id)` → `app_private.billing_invoices(id)`, ON DELETE RESTRICT.
- `(payment_attempt_id)` → `app_private.payment_attempts(id)`, ON DELETE RESTRICT.
- `(reverses_settlement_id)` → `app_private.payment_settlements(id)`, ON DELETE RESTRICT.
- `(callback_id)` → `app_private.provider_callbacks(id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique provider,provider_account_ref,provider_transaction_ref; invoice_id,provider_settled_at

## app_private.policy_revisions

**NEW · authorization · Aggregate/projection có version.

| Cột | Kiểu | NULL | Ý nghĩa |
|---|---|---|---|
| `id` | `uuid` | Không | PK, gen_random_uuid() |
| `created_at` | `timestamptz` | Không | DB clock; default now() |
| `revision` | `text` | Không | Unique immutable policy key |
| `policy_kind` | `text` | Không | Allowlisted capability/assessment/billing/routing/retention/rounding |
| `payload` | `jsonb` | Không | Strict rule schema |
| `payload_hash` | `char(64)` | Không | Exact rules |
| `authority_kind` | `text` | Không | technical/business/commercial |
| `approval_state` | `text` | Không | proposed/approved |
| `source_refs` | `jsonb` | Không | Exact source path/hash/locator/decision evidence |
| `approval_ref` | `text` | Có | Authorized approval artifact |
| `effective_from` | `timestamptz` | Có | Start of approved policy |
| `supersedes_revision` | `text` | Có | Prior revision |
| `version` | `bigint` | Không | Revocation CAS only; content and approval immutable |
| `updated_at` | `timestamptz` | Không | Revocation timestamp maintenance |
| `revoked_at` | `timestamptz` | Có | Publisher revocation; service rejects execution after this time |
| `revoked_by` | `uuid` | Có | Authorized publishing principal |

**Invariant bắt buộc:**

- Unique revision; approved requires approval_ref and effective_from plus verified authority evidence in controlled publishing workflow.
- Only policy publisher deployment role may INSERT; no API/agent/effect writer mutation or approval; immutable revisions.
- Row label alone does not establish customer approval; publisher validates source/authority/hash, unresolved business rule remains proposed and cannot execute.
- Commands resolve exact policy revision and authority kind; technical policy cannot authorize unresolved business/commercial action.
- Content/source/approval fields remain immutable; only authorized policy publisher may set revoked_at/revoked_by with audit and version CAS. Revocation fields paired.
- Service checks approved/effective/not-revoked on every commit/send; referenced historical policy can remain stored but cannot newly authorize effects.

**Khóa ngoại:**

- `(supersedes_revision)` → `app_private.policy_revisions(revision)`, ON DELETE RESTRICT.
- `(revoked_by)` → `app_private.auth_principals(auth_user_id)`, ON DELETE RESTRICT.

**Khóa/chỉ mục theo query:**

- Unique revision; policy_kind,effective_from desc

## Điều kiện chuyển sang DDL

Tên bảng/cột và state trong10 là lựa chọn kỹ thuật đề xuất, không xác nhận khách. Trước migration cần kiểm candidate key của FK kép, policy RLS/grant, backfill và transition triggers theo09. UNIQUE/partial/exclusion nêu ở đây phải được chuyển thành SQL với predicate/NULL semantics chính xác; không xem chuỗi mô tả index là SQL đã chạy. Các ref JSON được kiểm bằng schema/service/constraint trigger, không giả FK từ JSON.

Gate và bằng chứng kiểm thiết kế: [manifest](technical-design-review-2026-11-25.json).

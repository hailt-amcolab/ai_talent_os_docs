# 05. Từ điển dữ liệu

Bản 2.0 · 18/11/2026 · Bước 5. **Sinh tự động** từ catalog sau khi chạy đủ 6 migration tới `20261118000100_technology_demo` (script `gen_tu_dien.py`; đừng sửa tay phần bảng, sửa mô tả trong script hoặc trong tệp này rồi chạy lại). Nguồn đúng nhất là SQL migration ở `apps/api/prisma/migrations/`. Cột "Yêu cầu" dùng mã ở `01_confirmed_requirements.md`; "KT" là cột kỹ thuật, không có yêu cầu nghiệp vụ riêng. Phạm vi được làm: `07_implementation_scope_and_rules.md`.

Viết tắt: PK khóa chính, FK khóa ngoại (mọi khóa ngoại là ON DELETE RESTRICT trừ khi DDL ghi khác), FK kép = khóa ngoại nhiều cột (thường là `id` + `talent_id` để bảo đảm cùng chủ), UQ duy nhất, CK CHECK. "Quyền runtime" là quyền của nhóm `talent_runtime` (LOGIN `talent_api` của BE). "**Chặn ghi**" = trigger `reject_deferred_write` từ chối INSERT/UPDATE/DELETE (SQLSTATE 55000). Mọi bảng bật RLS; `anon`, `authenticated` không có quyền.

## Mục lục

- **Danh tính và phiên**: [`app_private.auth_principals`](#app_privateauth_principals), [`public.managers`](#managers), [`public.talent_applications`](#talent_applications), [`public.talents`](#talents), [`app_private.auth_session_registry`](#app_privateauth_session_registry), [`app_private.auth_challenges`](#app_privateauth_challenges), [`app_private.auth_mfa_enrollments`](#app_privateauth_mfa_enrollments), [`app_private.auth_login_identifiers`](#app_privateauth_login_identifiers), [`app_private.password_lock_state`](#app_privatepassword_lock_state), [`app_private.auth_rate_buckets`](#app_privateauth_rate_buckets)
- **Nội dung, tư liệu, AI coach**: [`public.theme_suggestions`](#theme_suggestions), [`public.posts`](#posts), [`public.post_media`](#post_media), [`public.media_assets`](#media_assets), [`public.coach_messages`](#coach_messages), [`public.ai_usage_events`](#ai_usage_events), [`public.ng_words`](#ng_words)
- **Thông báo**: [`public.talent_notifications`](#talent_notifications), [`public.push_subscriptions`](#push_subscriptions), [`app_private.push_deliveries`](#app_privatepush_deliveries), [`public.manager_notifications`](#manager_notifications)
- **Tác vụ bên ngoài (operation, outbox)**: [`app_private.domain_operations`](#app_privatedomain_operations), [`app_private.outbox_events`](#app_privateoutbox_events)
- **Cài đặt và nhật ký**: [`public.system_settings`](#system_settings), [`public.manager_view_logs`](#manager_view_logs), [`public.activity_logs`](#activity_logs)
- **Chưa chốt: bảng giữ sẵn, đang chặn ghi**: [`public.billing_accounts`](#billing_accounts), [`public.social_accounts`](#social_accounts), [`public.follower_goals`](#follower_goals), [`public.follower_snapshots`](#follower_snapshots), [`public.post_approval_decisions`](#post_approval_decisions), [`public.post_deliveries`](#post_deliveries), [`public.post_metric_snapshots`](#post_metric_snapshots), [`public.video_generations`](#video_generations), [`public.video_generation_inputs`](#video_generation_inputs)
- **Chỉ dùng cho demo công nghệ: không dùng cho tính năng thật**: [`app_private.tech_demo_sessions`](#app_privatetech_demo_sessions), [`app_private.tech_demo_push_subscriptions`](#app_privatetech_demo_push_subscriptions), [`app_private.demo_auth_deliveries`](#app_privatedemo_auth_deliveries)

---

**Danh tính và phiên**

## app_private.auth_principals

Danh tính ứng dụng: một dòng cho mỗi người dùng Supabase Auth được cấp quyền. Quyết định là quản lý hay tài năng; buộc đổi mật khẩu; `security_version` tăng thì mọi phiên cũ hết hiệu lực.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| auth_user_id | uuid | Không |  | FK `auth.users`; PK; UQ (auth_user_id, principal_kind) | Người dùng Supabase Auth (khóa ngoại tới `auth.users`) | R01-07, R01-09 |
| principal_kind | text | Không |  | CK `auth_principals_principal_kind_check`; UQ (auth_user_id, principal_kind) | `manager` hoặc `talent`; một người dùng chỉ một vai trò | R01-07, R01-09 |
| must_change_password | boolean | Không | true |  | true: phiên mở ra chỉ được đổi mật khẩu (mật khẩu tạm) | R01-07, R01-09 |
| security_version | bigint | Không | 1 | CK `auth_principals_security_version_check` | Tăng khi đổi mật khẩu, đổi MFA, vô hiệu: mọi phiên có version cũ bị từ chối | R01-07, R01-09 |
| created_at | timestamp with time zone | Không | now() |  |  | R01-07, R01-09 |
| updated_at | timestamp with time zone | Không | now() |  |  | R01-07, R01-09 |
| mfa_enrollment_allowed | boolean | Không | false |  | Cho phép đăng ký TOTP (dùng khi đặt lại MFA cho quản lý) | R01-07, R01-09 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
auth_principals_principal_kind_check: CHECK ((principal_kind = ANY (ARRAY['manager'::text, 'talent'::text])))
auth_principals_security_version_check: CHECK ((security_version > 0))
auth_principals_auth_user_id_fkey: FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE RESTRICT
auth_principals_pkey: PRIMARY KEY (auth_user_id)
auth_principals_auth_user_id_principal_kind_key: UNIQUE (auth_user_id, principal_kind)
TRIGGER trg_auth_principals_updated_at → set_updated_at()
```

</details>

## managers

Quản lý (một loại quyền duy nhất, [QA] No.5, No.21). Vô hiệu thì trigger thu hồi mọi phiên.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| auth_user_id | uuid | Không |  | FK `auth.users`; FK kép (auth_user_id, principal_kind) `app_private.auth_principals`; UQ | Người dùng Supabase Auth (khóa ngoại tới `auth.users`) | R01-09, R01-10 |
| is_active | boolean | Không | true | CK `chk_managers_deactivated` | false: không đăng nhập, không nhận thông báo | R01-09 |
| created_by_manager_id | uuid | Có |  | FK `managers` | Quản lý đã thêm người này; NULL với quản lý đầu tiên | R01-09 |
| deactivated_at | timestamp with time zone | Có |  | CK `chk_managers_deactivated` | Lúc bị vô hiệu | R01-09 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |
| principal_kind | text | Không | 'manager'::text | CK `chk_managers_principal_kind`; FK kép (auth_user_id, principal_kind) `app_private.auth_principals` | Luôn `manager`; cùng `auth_user_id` tạo khóa ngoại kép tới `auth_principals` | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_managers_deactivated: CHECK ((is_active = (deactivated_at IS NULL)))
chk_managers_principal_kind: CHECK ((principal_kind = 'manager'::text))
fk_managers_auth_user_id: FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE RESTRICT
fk_managers_created_by_manager_id: FOREIGN KEY (created_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_managers_principal: FOREIGN KEY (auth_user_id, principal_kind) REFERENCES app_private.auth_principals(auth_user_id, principal_kind) ON DELETE RESTRICT
pk_managers: PRIMARY KEY (id)
uq_managers_auth_user_id: UNIQUE (auth_user_id)
TRIGGER trg_managers_revoke_disabled → revoke_disabled_identity()
TRIGGER trg_managers_updated_at → set_updated_at()
```

</details>

## talent_applications

Đơn đăng ký tự gửi từ PWA; quản lý duyệt hoặc từ chối ([QA] No.11, CR-01).

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, status) |  | KT |
| display_name | text | Không |  | CK `chk_talent_applications_display_name` | Tên (nghệ danh hoặc tên thật) | R01-02 |
| email | text | Không |  |  | Email gửi đơn; sau khi duyệt thành email đăng nhập ở Auth. BE kiểm thêm không trùng người dùng đã có ở Auth | R01-02, R01-03 |
| birth_date | date | Không |  |  | Ngày sinh | R01-02 |
| status | text | Không | 'pending'::text | CK `chk_talent_applications_decision`; CK `chk_talent_applications_status`; UQ (id, status) | Trạng thái đơn | R01-01 |
| decided_by_manager_id | uuid | Có |  | CK `chk_talent_applications_decision`; FK `managers` | Quản lý đã duyệt hoặc từ chối | R01-01, R06-06 |
| decided_at | timestamp with time zone | Có |  | CK `chk_talent_applications_decision` | Lúc quản lý duyệt hoặc từ chối; NULL khi còn `pending` | R01-01 |
| version | integer | Không | 1 | CK `chk_talent_applications_positive_version` | Khóa lạc quan: hai quản lý cùng bấm thì chỉ một người thành công | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_talent_applications_decision: CHECK ((((status = 'pending'::text) AND (decided_by_manager_id IS NULL) AND (decided_at IS NULL)) OR ((status = ANY (ARRAY['approved'::text, 'rejected'::text])) AND (decided_by_manager_id IS NOT NULL) AND (decided_at IS NOT NULL))))
chk_talent_applications_display_name: CHECK ((btrim(display_name) <> ''::text))
chk_talent_applications_positive_version: CHECK ((version > 0))
chk_talent_applications_status: CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))
fk_talent_applications_decided_by_manager_id: FOREIGN KEY (decided_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
pk_talent_applications: PRIMARY KEY (id)
uq_applications_id_status: UNIQUE (id, status)
INDEX idx_talent_applications_status_created_at ON public.talent_applications USING btree (status, created_at DESC)
UNIQUE INDEX uq_talent_applications_email ON public.talent_applications USING btree (lower(btrim(email)))
TRIGGER trg_talent_applications_updated_at → set_updated_at()
TRIGGER trg_talent_applications_version → require_next_version()
```

</details>

## talents

Tài năng và tài khoản công ty (`account_type`). Loại `talent` phải đến từ đơn đã duyệt; `office` do quản lý tạo. Chuyển sang `ended` thì trigger thu hồi mọi phiên.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, account_type); UQ (id, auth_user_id) |  | KT |
| auth_user_id | uuid | Không |  | FK `auth.users`; FK kép (auth_user_id, principal_kind) `app_private.auth_principals`; UQ; UQ (id, auth_user_id) | Người dùng Supabase Auth (khóa ngoại tới `auth.users`) | R01-07 |
| account_type | text | Không |  | CK `chk_talents_account_type`; CK `chk_talents_birth_date`; CK `chk_talents_office_no_approval`; CK `chk_talents_origin`; UQ (id, account_type) | `talent`: người gửi đơn, trả phí. `office`: tài khoản công ty, không trả phí | R08-01, R06-14 |
| display_name | text | Không |  | CK `chk_talents_display_name` | Tên hiển thị; tìm theo tên ở danh sách | R01-02, R02-05 |
| birth_date | date | Có |  | CK `chk_talents_birth_date` | Dùng để tính vị thành niên | R01-06 |
| status | text | Không | 'before_use'::text | CK `chk_talents_status` | `before_use` 利用前 (chưa dùng), `in_use` 利用中 (đang dùng), `ended` 利用終了 (ngừng dùng) ([QA] No.10) | R01-11 |
| is_approval_required | boolean | Không | false | CK `chk_talents_office_no_approval` | Bài của tài năng này có cần duyệt không; đặt lúc duyệt đơn | R01-05, BR-20 |
| is_auto_posting_paused | boolean | Không | false |  | Dừng đăng tự động cho riêng tài năng này | R06-12 |
| application_id | uuid | Có |  | CK `chk_talents_origin`; FK `talent_applications`; FK kép (application_id, application_status) `talent_applications`; UQ | Đơn đã duyệt tạo ra tài năng | R01-01 |
| created_by_manager_id | uuid | Có |  | CK `chk_talents_origin`; FK `managers` | Quản lý đã tạo tài khoản công ty | R08-01 |
| onedrive_folder_id | text | Có |  | UQ | Mã thư mục riêng trên OneDrive | R02-01 |
| onedrive_folder_created_at | timestamp with time zone | Có |  |  | Lúc tạo thư mục OneDrive | R02-01 |
| posting_service_profile_ref | text | Có |  | UQ | Mã hồ sơ của tài năng ở Upload-Post | R06-09 |
| posting_service_registered_at | timestamp with time zone | Có |  |  | Lúc đăng ký với Upload-Post (thời điểm còn chờ S06-02) | R06-09 |
| status_changed_at | timestamp with time zone | Không | now() |  | Lần đổi trạng thái gần nhất | R01-11 |
| version | integer | Không | 1 | CK `chk_talents_positive_version` | Khóa lạc quan | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |
| application_status | text | Không | 'approved'::text | CK `chk_talents_approved_origin`; FK kép (application_id, application_status) `talent_applications` | Bản sao trạng thái đơn để khóa ngoại kép bảo đảm đơn đã `approved` | KT |
| principal_kind | text | Không | 'talent'::text | CK `chk_talents_principal_kind`; FK kép (auth_user_id, principal_kind) `app_private.auth_principals` | Luôn `talent` (kể cả tài khoản công ty) | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_talents_account_type: CHECK ((account_type = ANY (ARRAY['talent'::text, 'office'::text])))
chk_talents_approved_origin: CHECK ((application_status = 'approved'::text))
chk_talents_birth_date: CHECK (((account_type = 'office'::text) OR (birth_date IS NOT NULL)))
chk_talents_display_name: CHECK ((btrim(display_name) <> ''::text))
chk_talents_office_no_approval: CHECK (((account_type = 'talent'::text) OR (NOT is_approval_required)))
chk_talents_origin: CHECK ((((account_type = 'talent'::text) AND (application_id IS NOT NULL) AND (created_by_manager_id IS NULL)) OR ((account_type = 'office'::text) AND (application_id IS NULL) AND (created_by_manager_id IS NOT NULL))))
chk_talents_positive_version: CHECK ((version > 0))
chk_talents_principal_kind: CHECK ((principal_kind = 'talent'::text))
chk_talents_status: CHECK ((status = ANY (ARRAY['before_use'::text, 'in_use'::text, 'ended'::text])))
fk_talents_application_id: FOREIGN KEY (application_id) REFERENCES talent_applications(id) ON DELETE RESTRICT
fk_talents_approved_origin: FOREIGN KEY (application_id, application_status) REFERENCES talent_applications(id, status) ON DELETE RESTRICT
fk_talents_auth_user_id: FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE RESTRICT
fk_talents_created_by_manager_id: FOREIGN KEY (created_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_talents_principal: FOREIGN KEY (auth_user_id, principal_kind) REFERENCES app_private.auth_principals(auth_user_id, principal_kind) ON DELETE RESTRICT
pk_talents: PRIMARY KEY (id)
uq_talents_application_id: UNIQUE (application_id)
uq_talents_auth_user_id: UNIQUE (auth_user_id)
uq_talents_id_account_type: UNIQUE (id, account_type)
uq_talents_id_auth: UNIQUE (id, auth_user_id)
uq_talents_onedrive_folder_id: UNIQUE (onedrive_folder_id)
uq_talents_posting_service_profile_ref: UNIQUE (posting_service_profile_ref)
TRIGGER trg_talents_revoke_ended → revoke_disabled_identity()
TRIGGER trg_talents_updated_at → set_updated_at()
TRIGGER trg_talents_version → require_next_version()
```

</details>

## app_private.auth_session_registry

Sổ phiên: một dòng cho mỗi `session_id` trong JWT, do BE tạo lúc đăng nhập. Guard đọc bảng này mỗi request (HD-Auth §6.3).

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| session_id | uuid | Không |  | PK; UQ (session_id, auth_user_id) | `session_id` trong JWT đã xác minh chữ ký | R01-08, R01-10 |
| auth_user_id | uuid | Không |  | FK `app_private.auth_principals`; UQ (session_id, auth_user_id) | Chủ phiên | R01-08, R01-10 |
| purpose | text | Không |  | CK `auth_session_registry_purpose_check` | `full` dùng được nghiệp vụ; `first_password`/`recovery` chỉ đổi mật khẩu; `mfa_setup` chỉ đăng ký TOTP | R01-08, R01-10 |
| security_version_at_issue | bigint | Không |  | CK `auth_session_registry_security_version_at_issue_check` | Bản sao `security_version` lúc mở phiên | R01-08, R01-10 |
| auth_time | timestamp with time zone | Không |  | CK `auth_session_registry_check` | Lúc đăng nhập bằng mật khẩu (bất biến) | R01-08, R01-10 |
| absolute_expires_at | timestamp with time zone | Không |  | CK `auth_session_registry_check` | Hạn tuyệt đối của phiên (bất biến; tài năng 30 ngày) | R01-08, R01-10 |
| admin_last_activity_at | timestamp with time zone | Có |  |  | Thao tác gần nhất của quản lý; quá 30 phút thì phải đăng nhập lại | R01-08, R01-10 |
| password_verified_at | timestamp with time zone | Có |  |  | Lúc xác minh mật khẩu gần nhất trong phiên | R01-08, R01-10 |
| mfa_factor_id | text | Có |  | CK `auth_session_registry_check1` | Factor TOTP đã xác minh trong phiên | R01-08, R01-10 |
| mfa_verified_at | timestamp with time zone | Có |  | CK `auth_session_registry_check1` | Lúc xác minh TOTP | R01-08, R01-10 |
| mfa_policy_version | text | Có |  | CK `auth_session_registry_check1` | Phiên bản chính sách MFA lúc xác minh; đổi chính sách thì phải xác minh lại | R01-08, R01-10 |
| revoked_at | timestamp with time zone | Có |  |  | Lúc thu hồi; đã đặt thì không bỏ được | R01-08, R01-10 |
| created_at | timestamp with time zone | Không | now() |  |  | R01-08, R01-10 |
| updated_at | timestamp with time zone | Không | now() |  |  | R01-08, R01-10 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
auth_session_registry_check: CHECK ((absolute_expires_at > auth_time))
auth_session_registry_check1: CHECK ((((mfa_factor_id IS NULL) AND (mfa_verified_at IS NULL) AND (mfa_policy_version IS NULL)) OR ((mfa_factor_id IS NOT NULL) AND (mfa_verified_at IS NOT NULL) AND (mfa_policy_version IS NOT NULL))))
auth_session_registry_purpose_check: CHECK ((purpose = ANY (ARRAY['full'::text, 'first_password'::text, 'recovery'::text, 'mfa_setup'::text])))
auth_session_registry_security_version_at_issue_check: CHECK ((security_version_at_issue > 0))
auth_session_registry_auth_user_id_fkey: FOREIGN KEY (auth_user_id) REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT
auth_session_registry_pkey: PRIMARY KEY (session_id)
auth_session_registry_session_id_auth_user_id_key: UNIQUE (session_id, auth_user_id)
INDEX idx_auth_sessions_user ON app_private.auth_session_registry USING btree (auth_user_id, revoked_at)
TRIGGER trg_auth_session_registry_updated_at → set_updated_at()
TRIGGER trg_auth_sessions_immutable → keep_session_origin()
TRIGGER trg_sessions_detach_push → detach_revoked_push()
```

</details>

## app_private.auth_challenges

Lượt xác minh TOTP do server tạo, gắn đúng phiên, người dùng, factor.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | R01-10 |
| session_id | uuid | Không |  | FK kép (session_id, auth_user_id) `app_private.auth_session_registry` | Phiên tạo challenge | R01-10 |
| auth_user_id | uuid | Không |  | FK kép (session_id, auth_user_id) `app_private.auth_session_registry` | Chủ phiên | R01-10 |
| factor_id | text | Không |  |  | Factor TOTP được challenge | R01-10 |
| provider_challenge_id | text | Không |  | UQ | Mã challenge do Supabase Auth trả | R01-10 |
| purpose | text | Không |  | CK `auth_challenges_purpose_check` | `login`, `enrollment`, `factor_change` | R01-10 |
| state | text | Không | 'pending'::text | CK `auth_challenges_check`; CK `auth_challenges_state_check` | `pending` → `verified` / `expired` / `failed` | R01-10 |
| attempts_used | integer | Không | 0 | CK `auth_challenges_attempts_used_check` | Số lần đã thử mã | R01-10 |
| expires_at | timestamp with time zone | Không |  |  | Hạn của challenge (theo Supabase) | R01-10 |
| verified_at | timestamp with time zone | Có |  | CK `auth_challenges_check` | Lúc xác minh thành công | R01-10 |
| created_at | timestamp with time zone | Không | now() |  |  | R01-10 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
auth_challenges_attempts_used_check: CHECK ((attempts_used >= 0))
auth_challenges_check: CHECK (((state = 'verified'::text) = (verified_at IS NOT NULL)))
auth_challenges_purpose_check: CHECK ((purpose = ANY (ARRAY['login'::text, 'enrollment'::text, 'factor_change'::text])))
auth_challenges_state_check: CHECK ((state = ANY (ARRAY['pending'::text, 'verified'::text, 'expired'::text, 'failed'::text])))
auth_challenges_session_id_auth_user_id_fkey: FOREIGN KEY (session_id, auth_user_id) REFERENCES app_private.auth_session_registry(session_id, auth_user_id) ON DELETE RESTRICT
auth_challenges_pkey: PRIMARY KEY (id)
auth_challenges_provider_challenge_id_key: UNIQUE (provider_challenge_id)
INDEX idx_auth_challenges_session ON app_private.auth_challenges USING btree (session_id, auth_user_id, state)
```

</details>

## app_private.auth_mfa_enrollments

Lượt đăng ký TOTP đang dở của một phiên; chặn hai lượt cùng lúc.

Quyền runtime: SELECT, INSERT, UPDATE, DELETE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| session_id | uuid | Không |  | FK kép (session_id, auth_user_id) `app_private.auth_session_registry`; PK | Phiên đang đăng ký | R01-10 |
| auth_user_id | uuid | Không |  | FK kép (session_id, auth_user_id) `app_private.auth_session_registry`; UQ | Người đăng ký (mỗi người một lượt dở) | R01-10 |
| factor_id | text | Có |  | UQ | Factor chưa xác minh do Supabase tạo | R01-10 |
| state | text | Không |  | CK `auth_mfa_enrollments_state_check` | `creating`, `pending`, `unknown` (lỗi giữa chừng, cần đối soát) | R01-10 |
| expires_at | timestamp with time zone | Không |  |  | Hết hạn lượt đăng ký dở | R01-10 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
auth_mfa_enrollments_state_check: CHECK ((state = ANY (ARRAY['creating'::text, 'pending'::text, 'unknown'::text])))
auth_mfa_enrollments_session_id_auth_user_id_fkey: FOREIGN KEY (session_id, auth_user_id) REFERENCES app_private.auth_session_registry(session_id, auth_user_id) ON DELETE RESTRICT
auth_mfa_enrollments_pkey: PRIMARY KEY (session_id)
auth_mfa_enrollments_auth_user_id_key: UNIQUE (auth_user_id)
auth_mfa_enrollments_factor_id_key: UNIQUE (factor_id)
```

</details>

## app_private.auth_login_identifiers

Băm HMAC của email đăng nhập → người dùng; để đếm sai mật khẩu trước khi gọi Auth.

Quyền runtime: SELECT, INSERT

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| email_hash | text | Không |  | CK `auth_login_identifiers_email_hash_check`; PK | HMAC-SHA256 hex của email đã chuẩn hóa (khóa `LOGIN_HMAC_KEY`) | R01-08 |
| auth_user_id | uuid | Không |  | FK `app_private.auth_principals`; UQ | Người dùng ứng với email | R01-08 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
auth_login_identifiers_email_hash_check: CHECK ((email_hash ~ '^[0-9a-f]{64}$'::text))
auth_login_identifiers_auth_user_id_fkey: FOREIGN KEY (auth_user_id) REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT
auth_login_identifiers_pkey: PRIMARY KEY (email_hash)
auth_login_identifiers_auth_user_id_key: UNIQUE (auth_user_id)
```

</details>

## app_private.password_lock_state

Bộ đếm sai mật khẩu và thời điểm hết khóa (5 lần / 15 phút, [QA] No.25).

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| auth_user_id | uuid | Không |  | FK `app_private.auth_principals`; PK | Người dùng bị đếm | R01-08 |
| consecutive_failures | integer | Không | 0 | CK `password_lock_state_consecutive_failures_check` | Số lần sai liên tiếp | R01-08 |
| blocked_until | timestamp with time zone | Có |  |  | Hết khóa lúc này; NULL là không khóa | R01-08 |
| last_failed_at | timestamp with time zone | Có |  |  | Lần sai gần nhất | R01-08 |
| updated_at | timestamp with time zone | Không | now() |  |  | R01-08 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
password_lock_state_consecutive_failures_check: CHECK ((consecutive_failures >= 0))
password_lock_state_auth_user_id_fkey: FOREIGN KEY (auth_user_id) REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT
password_lock_state_pkey: PRIMARY KEY (auth_user_id)
TRIGGER trg_password_lock_state_updated_at → set_updated_at()
```

</details>

## app_private.auth_rate_buckets

Giới hạn tần suất theo khóa đã băm (IP, phiên, người dùng) và cửa sổ thời gian.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| bucket_key | text | Không |  | PK | Băm SHA-256 của khóa (mục đích + IP/phiên…); không chứa email thô | R01-08 |
| count | integer | Không |  | CK `auth_rate_buckets_count_check` | Số lần trong cửa sổ hiện tại | R01-08 |
| window_started_at | timestamp with time zone | Không | now() |  | Đầu cửa sổ đếm | R01-08 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
auth_rate_buckets_count_check: CHECK ((count > 0))
auth_rate_buckets_pkey: PRIMARY KEY (bucket_key)
```

</details>

---

**Nội dung, tư liệu, AI coach**

## theme_suggestions

3 chủ đề AI đề xuất mỗi ngày cho mỗi tài năng.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, talent_id) |  | KT |
| talent_id | uuid | Không |  | FK `talents`; UQ (id, talent_id); UQ (talent_id, suggested_on, position) | Tham chiếu `talents` | R04-01 |
| suggested_on | date | Không |  | UQ (talent_id, suggested_on, position) | Ngày gợi ý (giờ Nhật) | R04-01 |
| position | smallint | Không |  | CK `chk_theme_suggestions_position`; UQ (talent_id, suggested_on, position) | Thứ tự trong 3 chủ đề | BR-09 |
| content | text | Không |  |  | Nội dung chủ đề | R04-01 |
| selected_at | timestamp with time zone | Có |  |  | Lúc tài năng chọn | R04-01 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_theme_suggestions_position: CHECK ((("position" >= 1) AND ("position" <= 3)))
fk_theme_suggestions_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_theme_suggestions: PRIMARY KEY (id)
uq_theme_suggestions_id_talent: UNIQUE (id, talent_id)
uq_theme_suggestions_talent_id_suggested_on_position: UNIQUE (talent_id, suggested_on, "position")
```

</details>

## posts

Bản nháp bài đăng. Đợt 1 chỉ tạo và sửa bản nháp; trigger chặn adopt, hẹn giờ, đăng.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | CK `chk_posts_not_self_revision`; PK; UQ (id, talent_id) |  | KT |
| talent_id | uuid | Không |  | FK kép (revised_from_post_id, talent_id) `posts`; FK `talents`; FK kép (theme_suggestion_id, talent_id) `theme_suggestions`; UQ (id, talent_id) | Chủ bài (tài năng hoặc tài khoản công ty) | R04-02, R06-14 |
| theme_suggestion_id | uuid | Có |  | FK kép (theme_suggestion_id, talent_id) `theme_suggestions`; FK `theme_suggestions` | NULL khi tài năng tự nêu chủ đề | R04-01 |
| revised_from_post_id | uuid | Có |  | CK `chk_posts_not_self_revision`; FK `posts`; FK kép (revised_from_post_id, talent_id) `posts` | Bản nháp gốc khi sửa qua AI | R04-04 |
| status | text | Không | 'draft'::text | CK `chk_posts_adopted`; CK `chk_posts_awaiting_approval`; CK `chk_posts_cancelled`; CK `chk_posts_status` | `draft` 投稿案 (bản nháp), `awaiting_approval` 承認待ち (chờ duyệt), `scheduled` 予約済み (đã hẹn), `published` 投稿済み (đã đăng), `failed` 失敗 (lỗi), `cancelled` 取り消し (đã hủy). Đợt 1 runtime chỉ ghi được `draft` | R06-01 |
| caption | text | Không |  |  | Chú thích, dùng chung cho 3 mạng | R04-02, R04-03 |
| hashtags | text[] | Không | '{}'::text[] |  | Danh sách hashtag theo thứ tự | R04-02 |
| shot_guide | text | Có |  |  | Hướng dẫn chụp | R04-02 |
| video_script | text | Có |  |  | Kịch bản (bài video) | R04-02 |
| scheduled_at | timestamp with time zone | Có |  | CK `chk_posts_adopted` | Giờ đăng do hệ thống chọn | R04-09, BR-18 |
| adopted_at | timestamp with time zone | Có |  | CK `chk_posts_adopted` | Lúc chấp nhận | R04-05 |
| adopted_by_manager_id | uuid | Có |  | FK `managers` | Quản lý chấp nhận (tài khoản công ty); NULL khi tài năng tự chấp nhận | R06-14 |
| approval_requested_at | timestamp with time zone | Có |  | CK `chk_posts_awaiting_approval` | Lúc gửi duyệt | R04-06 |
| ng_detected_at | timestamp with time zone | Có |  | CK `chk_posts_ng` | Lúc AI phát hiện từ cấm; bài không được hẹn giờ | R04-07 |
| ng_detection_reason | text | Có |  | CK `chk_posts_ng` | Lý do hiện cho tài năng | R04-07 |
| cancel_reason | text | Có |  | CK `chk_posts_cancel_reason`; CK `chk_posts_cancelled` | Lý do hủy | R06-07, R06-12, R06-13, R01-12 |
| cancelled_at | timestamp with time zone | Có |  | CK `chk_posts_cancelled` | Lúc hủy; có khi và chỉ khi `status = cancelled` | R06-07 |
| version | integer | Không | 1 | CK `chk_posts_positive_version` | Khóa lạc quan cho đổi trạng thái | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_posts_adopted: CHECK (((status = ANY (ARRAY['draft'::text, 'cancelled'::text])) OR ((adopted_at IS NOT NULL) AND (scheduled_at IS NOT NULL))))
chk_posts_awaiting_approval: CHECK (((status <> 'awaiting_approval'::text) OR (approval_requested_at IS NOT NULL)))
chk_posts_cancel_reason: CHECK ((cancel_reason = ANY (ARRAY['manager_cancelled'::text, 'approval_expired'::text, 'auto_posting_paused'::text, 'talent_ended'::text])))
chk_posts_cancelled: CHECK ((((status = 'cancelled'::text) AND (cancel_reason IS NOT NULL) AND (cancelled_at IS NOT NULL)) OR ((status <> 'cancelled'::text) AND (cancel_reason IS NULL) AND (cancelled_at IS NULL))))
chk_posts_ng: CHECK (((ng_detected_at IS NULL) = (ng_detection_reason IS NULL)))
chk_posts_not_self_revision: CHECK ((revised_from_post_id IS DISTINCT FROM id))
chk_posts_positive_version: CHECK ((version > 0))
chk_posts_status: CHECK ((status = ANY (ARRAY['draft'::text, 'awaiting_approval'::text, 'scheduled'::text, 'published'::text, 'failed'::text, 'cancelled'::text])))
fk_posts_adopted_by_manager_id: FOREIGN KEY (adopted_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_posts_revised_from_post_id: FOREIGN KEY (revised_from_post_id) REFERENCES posts(id) ON DELETE RESTRICT
fk_posts_revision_owner: FOREIGN KEY (revised_from_post_id, talent_id) REFERENCES posts(id, talent_id) ON DELETE RESTRICT
fk_posts_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
fk_posts_theme_owner: FOREIGN KEY (theme_suggestion_id, talent_id) REFERENCES theme_suggestions(id, talent_id) ON DELETE RESTRICT
fk_posts_theme_suggestion_id: FOREIGN KEY (theme_suggestion_id) REFERENCES theme_suggestions(id) ON DELETE RESTRICT
pk_posts: PRIMARY KEY (id)
uq_posts_id_talent: UNIQUE (id, talent_id)
INDEX idx_posts_ng_detected_at ON public.posts USING btree (ng_detected_at) WHERE (ng_detected_at IS NOT NULL)
INDEX idx_posts_revised_from_post_id ON public.posts USING btree (revised_from_post_id)
INDEX idx_posts_scheduled_at ON public.posts USING btree (scheduled_at) WHERE (status = ANY (ARRAY['awaiting_approval'::text, 'scheduled'::text]))
INDEX idx_posts_talent_id_created_at ON public.posts USING btree (talent_id, created_at DESC)
INDEX idx_posts_talent_id_status ON public.posts USING btree (talent_id, status)
INDEX idx_posts_theme_suggestion_id ON public.posts USING btree (theme_suggestion_id)
TRIGGER trg_posts_confirmed_scope → require_draft_scope()
TRIGGER trg_posts_updated_at → set_updated_at()
TRIGGER trg_posts_version → require_next_version()
```

</details>

## post_media

Tư liệu gắn vào bài, có thứ tự.

Quyền runtime: SELECT, INSERT, UPDATE, DELETE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| post_id | uuid | Không |  | FK kép (post_id, talent_id) `posts`; FK `posts`; PK (post_id, media_asset_id); UQ (post_id, position) | Tham chiếu `posts` | R04-05 |
| media_asset_id | uuid | Không |  | FK `media_assets`; FK kép (media_asset_id, talent_id) `media_assets`; PK (post_id, media_asset_id) | Tham chiếu `media_assets` | R04-05 |
| position | smallint | Không |  | CK `chk_post_media_position`; UQ (post_id, position) | Thứ tự hiển thị | KT |
| talent_id | uuid | Không |  | FK kép (media_asset_id, talent_id) `media_assets`; FK kép (post_id, talent_id) `posts` | Chủ của bài và tư liệu; khóa ngoại kép chặn gắn tư liệu của người khác | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_post_media_position: CHECK (("position" > 0))
fk_post_media_media_asset_id: FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE RESTRICT
fk_post_media_media_owner: FOREIGN KEY (media_asset_id, talent_id) REFERENCES media_assets(id, talent_id) ON DELETE RESTRICT
fk_post_media_owner: FOREIGN KEY (post_id, talent_id) REFERENCES posts(id, talent_id) ON DELETE CASCADE
fk_post_media_post_id: FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
pk_post_media: PRIMARY KEY (post_id, media_asset_id)
uq_post_media_post_id_position: UNIQUE (post_id, "position")
INDEX idx_post_media_media_asset_id ON public.post_media USING btree (media_asset_id)
```

</details>

## media_assets

Ảnh, video của tài năng (tài năng hoặc quản lý gửi); bản tạm ở Supabase Storage rồi chuyển sang OneDrive (CR-09, CR-10).

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, talent_id) |  | KT |
| talent_id | uuid | Không |  | FK `talents`; UQ (id, talent_id) | Tham chiếu `talents` | R05-01 |
| kind | text | Không |  | CK `chk_media_assets_ai_is_video`; CK `chk_media_assets_kind` | `photo` hoặc `video` | R05-01 |
| source | text | Không |  | CK `chk_media_assets_ai_is_video`; CK `chk_media_assets_source` | Nguồn; `ai_generated` dùng để ghi nhãn AI khi đăng | R05-10 |
| uploaded_by_manager_id | uuid | Có |  | FK `managers` | Quản lý gửi thay | R05-01 |
| mime_type | text | Không |  |  | Kiểu tệp (image/jpeg, video/mp4…) | R05-04 |
| size_bytes | bigint | Không |  | CK `chk_media_assets_size` | Dung lượng (byte), > 0 | R05-04 |
| onedrive_item_id | text | Có |  | CK `chk_media_assets_location`; UQ | Mã tệp trên OneDrive sau khi chuyển | R05-02 |
| temp_object_path | text | Có |  | CK `chk_media_assets_location` | Đường dẫn bản tạm ở Supabase Storage | R05-03 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_media_assets_ai_is_video: CHECK (((source <> 'ai_generated'::text) OR (kind = 'video'::text)))
chk_media_assets_kind: CHECK ((kind = ANY (ARRAY['photo'::text, 'video'::text])))
chk_media_assets_location: CHECK (((onedrive_item_id IS NOT NULL) OR (temp_object_path IS NOT NULL)))
chk_media_assets_size: CHECK ((size_bytes > 0))
chk_media_assets_source: CHECK ((source = ANY (ARRAY['upload'::text, 'ai_generated'::text])))
fk_media_assets_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
fk_media_assets_uploaded_by_manager_id: FOREIGN KEY (uploaded_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
pk_media_assets: PRIMARY KEY (id)
uq_media_assets_id_talent: UNIQUE (id, talent_id)
uq_media_assets_onedrive_item_id: UNIQUE (onedrive_item_id)
INDEX idx_media_assets_talent_id_created_at ON public.media_assets USING btree (talent_id, created_at DESC)
TRIGGER trg_media_assets_updated_at → set_updated_at()
```

</details>

## coach_messages

Tin nhắn giữa tài năng và AI coach (chỉ thêm, không sửa).

Quyền runtime: SELECT, INSERT

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK; UQ (id, talent_id) | Tăng dần, dùng để xếp thứ tự và phân trang | KT |
| talent_id | uuid | Không |  | FK `talents`; UQ (id, talent_id) | Tham chiếu `talents` | R03-01 |
| sender | text | Không |  | CK `chk_coach_messages_sender` | Ai gửi | R03-01 |
| body | text | Không |  | CK `chk_coach_messages_body` | Nội dung (cả tin nhắn buổi sáng, tổng kết tuần của AI) | R03-01, R03-02 |
| created_at | timestamp with time zone | Không | now() |  |  | R03-01 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_coach_messages_body: CHECK ((btrim(body) <> ''::text))
chk_coach_messages_sender: CHECK ((sender = ANY (ARRAY['talent'::text, 'coach'::text])))
fk_coach_messages_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_coach_messages: PRIMARY KEY (id)
uq_coach_messages_id_talent: UNIQUE (id, talent_id)
INDEX idx_coach_messages_talent_id_id ON public.coach_messages USING btree (talent_id, id DESC)
```

</details>

## ai_usage_events

Một dòng cho mỗi lần gọi nhà cung cấp AI: token và chi phí ([QA] No.17, CR-16).

Quyền runtime: SELECT, INSERT

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK |  | KT |
| talent_id | uuid | Không |  | FK `talents` | Tham chiếu `talents` | R03-04 |
| occurred_at | timestamp with time zone | Không | now() |  | Dùng để tổng theo tháng | R03-04 |
| model | text | Không |  |  | Model AI đã gọi | R03-04 |
| input_tokens | integer | Không | 0 | CK `chk_ai_usage_events_tokens` | Token đầu vào của lần gọi | R03-04 |
| output_tokens | integer | Không | 0 | CK `chk_ai_usage_events_tokens` | Token đầu ra của lần gọi | R03-04 |
| cost_amount | numeric(14,6) | Không |  | CK `chk_ai_usage_events_cost` | Chi phí theo bảng giá của nhà cung cấp | R03-04 |
| cost_currency | character(3) | Không |  | CK `chk_ai_usage_events_currency` | Mã tiền tệ ISO 4217 | R03-04 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_ai_usage_events_cost: CHECK ((cost_amount >= (0)::numeric))
chk_ai_usage_events_currency: CHECK ((cost_currency ~ '^[A-Z]{3}$'::text))
chk_ai_usage_events_tokens: CHECK (((input_tokens >= 0) AND (output_tokens >= 0)))
fk_ai_usage_events_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_ai_usage_events: PRIMARY KEY (id)
INDEX idx_ai_usage_events_talent_id_occurred_at ON public.ai_usage_events USING btree (talent_id, occurred_at)
```

</details>

## ng_words

Danh sách từ cấm chung toàn hệ thống.

Quyền runtime: SELECT, INSERT, UPDATE, DELETE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| word | text | Không |  | CK `chk_ng_words_word` | Từ hoặc cụm từ cấm | R04-07, BR-15 |
| created_by_manager_id | uuid | Có |  | FK `managers` | NULL khi nạp từ mẫu ban đầu | R10-01 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_ng_words_word: CHECK ((btrim(word) <> ''::text))
fk_ng_words_created_by_manager_id: FOREIGN KEY (created_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
pk_ng_words: PRIMARY KEY (id)
UNIQUE INDEX uq_ng_words_word ON public.ng_words USING btree (lower(btrim(word)))
TRIGGER trg_ng_words_updated_at → set_updated_at()
```

</details>

---

**Thông báo**

## talent_notifications

Tin trong ứng dụng của tài năng (T-14 của [AG]). Ghi trước khi đẩy; `event_key` chống tạo trùng.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, talent_id) |  | KT |
| talent_id | uuid | Không |  | FK `talents`; UQ (id, talent_id); UQ (talent_id, event_key) | Tham chiếu `talents` | R09-01 |
| kind | text | Không |  |  | Loại thông báo theo 別紙A (phụ lục A của [YK2]); không có CHECK vì danh sách chưa chốt (U-11) | R09-03 |
| title | text | Không |  |  | Câu chữ do khách duyệt ([YK2] §6-13) | R09-03 |
| body | text | Không |  |  | Câu chữ do khách duyệt ([YK2] §6-13) | R09-03 |
| target_path | text | Có |  | CK `chk_talent_notifications_target_path` | Màn mở khi bấm, chỉ trong ứng dụng | R09-01 |
| event_key | text | Không |  | UQ (talent_id, event_key) | Khóa chống tạo trùng | KT |
| read_at | timestamp with time zone | Có |  |  | Lúc đọc; NULL là chưa đọc | R09-01 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_talent_notifications_target_path: CHECK (((target_path IS NULL) OR (target_path ~ '^/[^/\\]'::text)))
fk_talent_notifications_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_talent_notifications: PRIMARY KEY (id)
uq_notifications_id_talent: UNIQUE (id, talent_id)
uq_talent_notifications_talent_id_event_key: UNIQUE (talent_id, event_key)
INDEX idx_talent_notifications_talent_id_created_at ON public.talent_notifications USING btree (talent_id, created_at DESC)
INDEX idx_talent_notifications_unread ON public.talent_notifications USING btree (talent_id) WHERE (read_at IS NULL)
```

</details>

## push_subscriptions

Đăng ký thông báo đẩy của từng máy, gắn với tài năng và phiên đăng nhập tạo ra nó (HD-PWA §6.3).

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| talent_id | uuid | Không |  | FK `talents`; FK kép (talent_id, owner_auth_user_id) `talents` | Tham chiếu `talents` | R09-01 |
| endpoint | text | Không |  | CK `chk_push_subscriptions_endpoint`; UQ | Địa chỉ nhận của máy chủ đẩy | R09-01 |
| p256dh_key | text | Không |  |  | Khóa mã hóa của đăng ký Web Push | R09-01, R10-06 |
| auth_secret | text | Không |  |  | Khóa mã hóa của đăng ký Web Push | R09-01, R10-06 |
| is_active | boolean | Không | true | CK `chk_push_active_binding`; CK `chk_push_subscriptions_deactivated` | false khi đăng xuất, tắt thông báo, hoặc máy chủ đẩy trả 404/410 | R09-01 |
| last_success_at | timestamp with time zone | Có |  |  | Lần gửi thành công gần nhất | KT |
| deactivated_at | timestamp with time zone | Có |  | CK `chk_push_subscriptions_deactivated` | Lúc tắt; có khi và chỉ khi `is_active = false` | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |
| owner_session_id | uuid | Có |  | CK `chk_push_active_binding`; FK kép (owner_session_id, owner_auth_user_id) `app_private.auth_session_registry` | Phiên đăng nhập đã tạo đăng ký; thu hồi phiên thì đăng ký bị tắt (trigger) | KT |
| owner_auth_user_id | uuid | Có |  | CK `chk_push_active_binding`; FK kép (owner_session_id, owner_auth_user_id) `app_private.auth_session_registry`; FK kép (talent_id, owner_auth_user_id) `talents` | Người dùng Auth của phiên chủ; khớp với tài năng (khóa ngoại kép) | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_push_active_binding: CHECK (((NOT is_active) OR ((owner_session_id IS NOT NULL) AND (owner_auth_user_id IS NOT NULL))))
chk_push_subscriptions_deactivated: CHECK ((is_active = (deactivated_at IS NULL)))
chk_push_subscriptions_endpoint: CHECK ((endpoint ~~ 'https://%'::text))
fk_push_session_owner: FOREIGN KEY (owner_session_id, owner_auth_user_id) REFERENCES app_private.auth_session_registry(session_id, auth_user_id) ON DELETE RESTRICT
fk_push_subscriptions_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
fk_push_talent_owner: FOREIGN KEY (talent_id, owner_auth_user_id) REFERENCES talents(id, auth_user_id) ON DELETE RESTRICT
pk_push_subscriptions: PRIMARY KEY (id)
uq_push_subscriptions_endpoint: UNIQUE (endpoint)
INDEX idx_push_owner_session ON public.push_subscriptions USING btree (owner_session_id)
INDEX idx_push_subscriptions_talent_id ON public.push_subscriptions USING btree (talent_id) WHERE is_active
TRIGGER trg_push_subscriptions_updated_at → set_updated_at()
```

</details>

## app_private.push_deliveries

Một dòng cho mỗi lần gửi một sự kiện outbox tới một máy; chống gửi trùng khi worker chạy lại.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | R09-01, R09-06 |
| event_id | uuid | Không |  | FK `app_private.outbox_events`; UQ (event_id, subscription_id) | Sự kiện outbox | R09-01, R09-06 |
| subscription_id | uuid | Không |  | FK `push_subscriptions`; UQ (event_id, subscription_id) | Máy nhận | R09-01, R09-06 |
| state | text | Không | 'pending'::text | CK `push_deliveries_state_check` | `pending`, `sent`, `gone`, `failed` | R09-01, R09-06 |
| attempts | integer | Không | 0 | CK `push_deliveries_attempts_check` | Số lần thử (tối đa 3) | R09-01, R09-06 |
| last_error_code | text | Có |  |  | Mã lỗi gần nhất (không chứa nội dung) | R09-01, R09-06 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
push_deliveries_attempts_check: CHECK (((attempts >= 0) AND (attempts <= 3)))
push_deliveries_state_check: CHECK ((state = ANY (ARRAY['pending'::text, 'sent'::text, 'gone'::text, 'failed'::text])))
push_deliveries_event_id_fkey: FOREIGN KEY (event_id) REFERENCES app_private.outbox_events(id) ON DELETE RESTRICT
push_deliveries_subscription_id_fkey: FOREIGN KEY (subscription_id) REFERENCES push_subscriptions(id) ON DELETE RESTRICT
push_deliveries_pkey: PRIMARY KEY (id)
push_deliveries_event_id_subscription_id_key: UNIQUE (event_id, subscription_id)
INDEX idx_push_delivery_subscription ON app_private.push_deliveries USING btree (subscription_id)
```

</details>

## manager_notifications

Thông báo cho quản lý. Đang chặn ghi: loại thông báo và cách "đã xử lý" chưa chốt (U-10, U-11).

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| kind | text | Không |  |  | Đơn mới, yêu cầu duyệt, từ cấm, đăng lỗi, lâu không đăng, chuyện nghiêm trọng, đạt mục tiêu, thu tiền lỗi | R09-02 |
| talent_id | uuid | Có |  | CK `chk_manager_notifications_owned_subject`; CK `chk_manager_notifications_subject`; CK `chk_manager_notifications_subject_family`; FK kép (coach_message_id, talent_id) `coach_messages`; FK kép (post_id, talent_id) `posts`; FK `talents` | Tài năng liên quan | R09-02 |
| talent_application_id | uuid | Có |  | CK `chk_manager_notifications_subject`; CK `chk_manager_notifications_subject_family`; FK `talent_applications` | Với thông báo "đơn mới" | R09-02 |
| post_id | uuid | Có |  | CK `chk_manager_notifications_owned_subject`; CK `chk_manager_notifications_subject_family`; FK `posts`; FK kép (post_id, talent_id) `posts` | Với yêu cầu duyệt, từ cấm, đăng lỗi | R09-02 |
| coach_message_id | bigint | Có |  | CK `chk_manager_notifications_owned_subject`; CK `chk_manager_notifications_subject_family`; FK `coach_messages`; FK kép (coach_message_id, talent_id) `coach_messages` | Với chuyện nghiêm trọng | R03-03 |
| event_key | text | Không |  | UQ | Khóa chống tạo trùng | KT |
| handled_at | timestamp with time zone | Có |  | CK `chk_manager_notifications_handled` | Đã xử lý (dùng chung cho mọi quản lý, U-10) | R09-02 |
| handled_by_manager_id | uuid | Có |  | CK `chk_manager_notifications_handled`; FK `managers` | Tham chiếu `managers` | R09-02 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_manager_notifications_handled: CHECK (((handled_at IS NULL) = (handled_by_manager_id IS NULL)))
chk_manager_notifications_owned_subject: CHECK ((((post_id IS NULL) AND (coach_message_id IS NULL)) OR (talent_id IS NOT NULL)))
chk_manager_notifications_subject: CHECK (((talent_id IS NOT NULL) OR (talent_application_id IS NOT NULL)))
chk_manager_notifications_subject_family: CHECK (((talent_application_id IS NULL) OR ((talent_id IS NULL) AND (post_id IS NULL) AND (coach_message_id IS NULL))))
fk_manager_notifications_coach_message_id: FOREIGN KEY (coach_message_id) REFERENCES coach_messages(id) ON DELETE RESTRICT
fk_manager_notifications_handled_by_manager_id: FOREIGN KEY (handled_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_manager_notifications_message_owner: FOREIGN KEY (coach_message_id, talent_id) REFERENCES coach_messages(id, talent_id) ON DELETE RESTRICT
fk_manager_notifications_post_id: FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE RESTRICT
fk_manager_notifications_post_owner: FOREIGN KEY (post_id, talent_id) REFERENCES posts(id, talent_id) ON DELETE RESTRICT
fk_manager_notifications_talent_application_id: FOREIGN KEY (talent_application_id) REFERENCES talent_applications(id) ON DELETE RESTRICT
fk_manager_notifications_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_manager_notifications: PRIMARY KEY (id)
uq_manager_notifications_event_key: UNIQUE (event_key)
INDEX idx_manager_notifications_coach_message_id ON public.manager_notifications USING btree (coach_message_id)
INDEX idx_manager_notifications_kind_created_at ON public.manager_notifications USING btree (kind, created_at DESC)
INDEX idx_manager_notifications_post_id ON public.manager_notifications USING btree (post_id)
INDEX idx_manager_notifications_talent_application_id ON public.manager_notifications USING btree (talent_application_id)
INDEX idx_manager_notifications_talent_id ON public.manager_notifications USING btree (talent_id)
INDEX idx_manager_notifications_unhandled ON public.manager_notifications USING btree (created_at DESC) WHERE (handled_at IS NULL)
TRIGGER trg_manager_notifications_deferred → reject_deferred_write()
```

</details>

---

**Tác vụ bên ngoài (operation, outbox)**

## app_private.domain_operations

Lệnh nghiệp vụ có tác động ra ngoài (tạo tài khoản, chuyển tư liệu…): khóa idempotency, trạng thái, bước, mã tham chiếu bên ngoài.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| actor_auth_user_id | uuid | Có |  | FK `app_private.auth_principals` | Tham chiếu `app_private.auth_principals` | KT |
| operation_key | text | Không |  | CK `domain_operations_operation_key_check`; UQ | Khóa idempotency do server tạo; cùng khóa khác `payload_hash` là xung đột | KT |
| kind | text | Không |  | CK `domain_operations_check`; CK `domain_operations_kind_check` | Loại lệnh (danh sách cho phép trong CHECK) | KT |
| application_id | uuid | Có |  | CK `domain_operations_check`; FK `talent_applications` | Tham chiếu `talent_applications` | KT |
| talent_id | uuid | Có |  | CK `chk_operation_notification_owner`; FK `talents`; FK kép (notification_id, talent_id) `talent_notifications` | Tham chiếu `talents` | KT |
| payload_hash | text | Không |  | CK `domain_operations_payload_hash_check` | Băm của dữ liệu lệnh không bí mật | KT |
| state | text | Không | 'accepted'::text | CK `domain_operations_state_check` | `accepted` → `running` → `completed` / `failed` / `unknown` (cần đối soát) | KT |
| step | text | Có |  |  | Bước hiện tại của lệnh nhiều bước | KT |
| provider_ref | text | Có |  |  | Mã tham chiếu ở dịch vụ ngoài (ví dụ id người dùng Auth vừa tạo) | KT |
| version | bigint | Không | 1 | CK `domain_operations_version_check` | Khóa lạc quan; mỗi UPDATE phải tăng đúng 1 | KT |
| last_error_code | text | Có |  |  | Mã lỗi gần nhất (không chứa nội dung, bí mật) | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |
| notification_id | uuid | Có |  | CK `chk_operation_notification_owner`; FK kép (notification_id, talent_id) `talent_notifications` | Tin trong ứng dụng mà lệnh gửi push thuộc về | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_operation_notification_owner: CHECK (((notification_id IS NULL) OR (talent_id IS NOT NULL)))
domain_operations_check: CHECK (((kind <> 'application.provision'::text) OR (application_id IS NOT NULL)))
domain_operations_kind_check: CHECK ((kind = ANY (ARRAY['application.provision'::text, 'manager.provision'::text, 'office.provision'::text, 'media.transfer'::text, 'talent.notify'::text, 'coach.respond'::text])))
domain_operations_operation_key_check: CHECK ((btrim(operation_key) <> ''::text))
domain_operations_payload_hash_check: CHECK ((payload_hash ~ '^[0-9a-f]{64}$'::text))
domain_operations_state_check: CHECK ((state = ANY (ARRAY['accepted'::text, 'running'::text, 'completed'::text, 'failed'::text, 'unknown'::text])))
domain_operations_version_check: CHECK ((version > 0))
domain_operations_actor_auth_user_id_fkey: FOREIGN KEY (actor_auth_user_id) REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT
domain_operations_application_id_fkey: FOREIGN KEY (application_id) REFERENCES talent_applications(id) ON DELETE RESTRICT
domain_operations_talent_id_fkey: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
fk_operation_notification_owner: FOREIGN KEY (notification_id, talent_id) REFERENCES talent_notifications(id, talent_id) ON DELETE RESTRICT
domain_operations_pkey: PRIMARY KEY (id)
domain_operations_operation_key_key: UNIQUE (operation_key)
INDEX idx_operations_actor ON app_private.domain_operations USING btree (actor_auth_user_id)
INDEX idx_operations_talent ON app_private.domain_operations USING btree (talent_id)
UNIQUE INDEX uq_operations_application_provision ON app_private.domain_operations USING btree (application_id) WHERE (kind = 'application.provision'::text)
TRIGGER trg_domain_operations_updated_at → set_updated_at()
TRIGGER trg_operations_version → require_next_version()
```

</details>

## app_private.outbox_events

Ý định gọi dịch vụ ngoài, ghi cùng giao dịch với dữ liệu nghiệp vụ; worker lấy theo lease.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| operation_id | uuid | Không |  | FK `app_private.domain_operations`; UQ (operation_id, generation, event_type) | Lệnh sinh ra sự kiện | KT |
| generation | bigint | Không |  | CK `outbox_events_generation_check`; UQ (operation_id, generation, event_type) | Lần phát hành của cùng loại sự kiện cho một operation | KT |
| event_type | text | Không |  | CK `outbox_events_event_type_check`; UQ (operation_id, generation, event_type) | Loại sự kiện (danh sách cho phép trong CHECK) | KT |
| state | text | Không | 'pending'::text | CK `outbox_events_check`; CK `outbox_events_state_check` | `pending` → `leased` → `done` / `failed` / `unknown` | KT |
| attempts | integer | Không | 0 | CK `outbox_events_attempts_check` | Số lần đã thử | KT |
| available_at | timestamp with time zone | Không | now() |  | Sớm nhất được lấy (giãn cách thử lại) | KT |
| lease_token | uuid | Có |  | CK `outbox_events_check` | Token của worker đang giữ; hoàn tất phải khớp token | KT |
| lease_until | timestamp with time zone | Có |  | CK `outbox_events_check` | Hết hạn giữ | KT |
| last_error_code | text | Có |  |  | Mã lỗi gần nhất (không chứa nội dung, bí mật) | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
outbox_events_attempts_check: CHECK ((attempts >= 0))
outbox_events_check: CHECK ((((state = 'leased'::text) AND (lease_token IS NOT NULL) AND (lease_until IS NOT NULL)) OR ((state <> 'leased'::text) AND (lease_token IS NULL) AND (lease_until IS NULL))))
outbox_events_event_type_check: CHECK ((event_type = ANY (ARRAY['auth.provision'::text, 'media.transfer'::text, 'notification.push'::text, 'coach.respond'::text])))
outbox_events_generation_check: CHECK ((generation > 0))
outbox_events_state_check: CHECK ((state = ANY (ARRAY['pending'::text, 'leased'::text, 'done'::text, 'failed'::text, 'unknown'::text])))
outbox_events_operation_id_fkey: FOREIGN KEY (operation_id) REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT
outbox_events_pkey: PRIMARY KEY (id)
outbox_events_operation_id_generation_event_type_key: UNIQUE (operation_id, generation, event_type)
INDEX idx_outbox_due ON app_private.outbox_events USING btree (available_at, id) WHERE (state = 'pending'::text)
INDEX idx_outbox_expired_lease ON app_private.outbox_events USING btree (lease_until, id) WHERE (state = 'leased'::text)
TRIGGER trg_outbox_events_updated_at → set_updated_at()
```

</details>

---

**Cài đặt và nhật ký**

## system_settings

Một dòng cài đặt chung (giờ nhắn sáng, nhắc trước giờ đăng, số ngày không đăng, ngày tổng kết tuần, công tắc dừng đăng toàn bộ).

Quyền runtime: SELECT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | smallint | Không | 1 | CK `chk_system_settings_single_row`; PK | Bảng chỉ có một dòng | KT |
| morning_message_time | time without time zone | Không | '08:00:00'::time without time zone |  | Giờ AI nhắn buổi sáng (giờ Nhật) | R10-02 |
| media_reminder_hours_before | smallint | Không | 2 | CK `chk_system_settings_reminder` | Nhắc gửi tư liệu trước giờ đăng bao nhiêu giờ | R10-02 |
| coach_inactivity_days | smallint | Không | 3 | CK `chk_system_settings_inactivity` | Số ngày không đăng thì AI nhắn tài năng | R03-05 |
| manager_inactivity_days | smallint | Không | 7 | CK `chk_system_settings_inactivity` | Số ngày không đăng thì báo quản lý | R03-05 |
| weekly_review_weekday | smallint | Không | 1 | CK `chk_system_settings_weekday` | Thứ gửi tổng kết tuần (1 = thứ Hai) | R03-06 |
| is_auto_posting_paused | boolean | Không | false |  | Dừng đăng tự động toàn bộ | R06-12 |
| updated_by_manager_id | uuid | Có |  | FK `managers` | Tham chiếu `managers` | R10-01 |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_system_settings_inactivity: CHECK (((coach_inactivity_days > 0) AND (manager_inactivity_days > 0)))
chk_system_settings_reminder: CHECK ((media_reminder_hours_before > 0))
chk_system_settings_single_row: CHECK ((id = 1))
chk_system_settings_weekday: CHECK (((weekly_review_weekday >= 1) AND (weekly_review_weekday <= 7)))
fk_system_settings_updated_by_manager_id: FOREIGN KEY (updated_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
pk_system_settings: PRIMARY KEY (id)
TRIGGER trg_system_settings_updated_at → set_updated_at()
```

</details>

## manager_view_logs

Nhật ký quản lý xem thông tin tài năng ([YK2] §6-2 7-6). Chỉ thêm; trigger chặn sửa, xóa.

Quyền runtime: SELECT, INSERT

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK |  | KT |
| manager_id | uuid | Không |  | FK `managers` | Ai xem | R01-14 |
| talent_id | uuid | Không |  | FK `talents` | Xem của ai | R01-14 |
| screen | text | Không |  | CK `chk_manager_view_logs_screen` | Màn đã mở: thông tin, hội thoại, kết quả | R01-14 |
| viewed_at | timestamp with time zone | Không | now() |  | Lúc xem | R01-14 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_manager_view_logs_screen: CHECK ((screen = ANY (ARRAY['talent_info'::text, 'conversation'::text, 'metrics'::text])))
fk_manager_view_logs_manager_id: FOREIGN KEY (manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_manager_view_logs_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_manager_view_logs: PRIMARY KEY (id)
INDEX idx_manager_view_logs_manager_id ON public.manager_view_logs USING btree (manager_id)
INDEX idx_manager_view_logs_talent_id_viewed_at ON public.manager_view_logs USING btree (talent_id, viewed_at DESC)
INDEX idx_manager_view_logs_viewed_at ON public.manager_view_logs USING btree (viewed_at DESC)
TRIGGER trg_manager_view_logs_append_only → reject_change()
```

</details>

## activity_logs

Nhật ký thao tác và kết quả xử lý. Chỉ thêm; trigger chặn sửa, xóa.

Quyền runtime: SELECT, INSERT

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK |  | KT |
| actor_type | text | Không |  | CK `chk_activity_logs_actor`; CK `chk_activity_logs_actor_type` | Ai làm | R10-04 |
| actor_manager_id | uuid | Có |  | CK `chk_activity_logs_actor`; FK `managers` | Tham chiếu `managers` | R10-04 |
| actor_talent_id | uuid | Có |  | CK `chk_activity_logs_actor`; FK `talents` | Tham chiếu `talents` | R10-04 |
| action | text | Không |  |  | Tên hành động, ví dụ `post.approve`, `talent.status_change`, `auto_posting.pause`, `metrics.import`, `video.generate`, `billing.charge`, `onedrive.read` | R10-04, R02-07 |
| target_type | text | Có |  |  | Đối tượng (tham chiếu mềm, D-11) | R10-04 |
| target_id | text | Có |  |  | Đối tượng (tham chiếu mềm, D-11) | R10-04 |
| result | text | Có |  | CK `chk_activity_logs_result` | Kết quả của việc xử lý | R10-04 |
| details | jsonb | Có |  |  | Giá trị trước, sau; mã lỗi. Không chứa mật khẩu, token, khóa; chỉ các khóa có trong danh sách cho phép | R10-04, R10-06 |
| occurred_at | timestamp with time zone | Không | now() |  | Lúc xảy ra | R10-04 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_activity_logs_actor: CHECK ((((actor_type = 'manager'::text) AND (actor_manager_id IS NOT NULL) AND (actor_talent_id IS NULL)) OR ((actor_type = 'talent'::text) AND (actor_talent_id IS NOT NULL) AND (actor_manager_id IS NULL)) OR ((actor_type = 'system'::text) AND (actor_manager_id IS NULL) AND (actor_talent_id IS NULL))))
chk_activity_logs_actor_type: CHECK ((actor_type = ANY (ARRAY['manager'::text, 'talent'::text, 'system'::text])))
chk_activity_logs_result: CHECK ((result = ANY (ARRAY['succeeded'::text, 'failed'::text])))
fk_activity_logs_actor_manager_id: FOREIGN KEY (actor_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_activity_logs_actor_talent_id: FOREIGN KEY (actor_talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_activity_logs: PRIMARY KEY (id)
INDEX idx_activity_logs_actor_manager_id ON public.activity_logs USING btree (actor_manager_id) WHERE (actor_manager_id IS NOT NULL)
INDEX idx_activity_logs_actor_talent_id ON public.activity_logs USING btree (actor_talent_id) WHERE (actor_talent_id IS NOT NULL)
INDEX idx_activity_logs_occurred_at ON public.activity_logs USING btree (occurred_at DESC)
INDEX idx_activity_logs_target ON public.activity_logs USING btree (target_type, target_id, occurred_at DESC)
TRIGGER trg_activity_logs_append_only → reject_change()
```

</details>

---

**Chưa chốt: bảng giữ sẵn, đang chặn ghi**

## billing_accounts

Đăng ký thanh toán của tài năng (không chứa thông tin thẻ). Chặn ghi: thu phí chưa chốt ([QA] No.4, 49, 53, 62–64).

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| talent_id | uuid | Không |  | FK `talents`; FK kép (talent_id, account_type) `talents`; UQ | Chỉ tài năng loại `talent` (kiểm ở tầng dịch vụ) | R08-01, R08-02 |
| provider_member_ref | text | Không |  | UQ | Mã thành viên tại công ty thanh toán. Không có số thẻ hay thông tin thẻ | R08-02, BR-16 |
| registered_at | timestamp with time zone | Không |  |  | Lúc đăng ký thanh toán xong; mốc tạo thư mục OneDrive | R02-01, R08-02 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |
| account_type | text | Không | 'talent'::text | CK `chk_billing_accounts_talent_only`; FK kép (talent_id, account_type) `talents` | Luôn `talent`: khóa ngoại kép chặn thu phí tài khoản công ty | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_billing_accounts_talent_only: CHECK ((account_type = 'talent'::text))
fk_billing_accounts_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
fk_billing_accounts_talent_type: FOREIGN KEY (talent_id, account_type) REFERENCES talents(id, account_type) ON DELETE RESTRICT
pk_billing_accounts: PRIMARY KEY (id)
uq_billing_accounts_provider_member_ref: UNIQUE (provider_member_ref)
uq_billing_accounts_talent_id: UNIQUE (talent_id)
TRIGGER trg_billing_accounts_deferred → reject_deferred_write()
TRIGGER trg_billing_accounts_updated_at → set_updated_at()
```

</details>

## social_accounts

Tài khoản mạng xã hội đã kết nối qua Upload-Post. Chặn ghi: số tài khoản mỗi mạng chưa chốt ([QA] No.23).

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, talent_id, platform) |  | KT |
| talent_id | uuid | Không |  | FK `talents`; UQ (id, talent_id, platform) | Tham chiếu `talents` | R06-09 |
| platform | text | Không |  | CK `chk_social_accounts_platform`; UQ (id, talent_id, platform) | `instagram`, `tiktok`, `youtube` | BR-11 |
| external_account_ref | text | Có |  |  | Mã hoặc tên tài khoản do Upload-Post trả về | R06-09 |
| status | text | Không | 'connected'::text | CK `chk_social_accounts_disconnected`; CK `chk_social_accounts_status` | Hiện ở ứng dụng và màn quản trị | R06-09, [YK2] §6-10 8-6 |
| connected_at | timestamp with time zone | Không | now() |  | Lúc kết nối | R06-09 |
| disconnected_at | timestamp with time zone | Có |  | CK `chk_social_accounts_disconnected` | Lúc mất kết nối | [YK2] §6-10 8-6 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_social_accounts_disconnected: CHECK (((status = 'disconnected'::text) = (disconnected_at IS NOT NULL)))
chk_social_accounts_platform: CHECK ((platform = ANY (ARRAY['instagram'::text, 'tiktok'::text, 'youtube'::text])))
chk_social_accounts_status: CHECK ((status = ANY (ARRAY['connected'::text, 'disconnected'::text])))
fk_social_accounts_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_social_accounts: PRIMARY KEY (id)
uq_social_accounts_identity_scope: UNIQUE (id, talent_id, platform)
INDEX idx_social_accounts_talent_id_platform ON public.social_accounts USING btree (talent_id, platform)
TRIGGER trg_social_accounts_deferred → reject_deferred_write()
TRIGGER trg_social_accounts_updated_at → set_updated_at()
```

</details>

## follower_goals

Mục tiêu người theo dõi. Chặn ghi: mục tiêu tổng hay theo từng mạng chưa chốt ([QA] No.14).

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| talent_id | uuid | Không |  | FK `talents`; UQ (talent_id, platform) | Tham chiếu `talents` | R02-03 |
| platform | text | Không |  | CK `chk_follower_goals_platform`; UQ (talent_id, platform) | `instagram`, `tiktok`, `youtube` | R02-03 |
| target_followers | integer | Không | 10000 | CK `chk_follower_goals_target` | Số người theo dõi mục tiêu | R02-03, BR-10 |
| deadline_on | date | Có |  |  | Hạn đạt | R02-03 |
| achieved_at | timestamp with time zone | Có |  |  | Lúc đạt; dùng để chỉ báo một lần | R03-07 |
| updated_by_manager_id | uuid | Có |  | FK `managers` | Người sửa gần nhất | R02-03 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_follower_goals_platform: CHECK ((platform = ANY (ARRAY['instagram'::text, 'tiktok'::text, 'youtube'::text])))
chk_follower_goals_target: CHECK ((target_followers > 0))
fk_follower_goals_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
fk_follower_goals_updated_by_manager_id: FOREIGN KEY (updated_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
pk_follower_goals: PRIMARY KEY (id)
uq_follower_goals_talent_id_platform: UNIQUE (talent_id, platform)
TRIGGER trg_follower_goals_deferred → reject_deferred_write()
TRIGGER trg_follower_goals_updated_at → set_updated_at()
```

</details>

## follower_snapshots

Số người theo dõi mỗi ngày. Chặn ghi theo `social_accounts`.

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK |  | KT |
| social_account_id | uuid | Không |  | FK `social_accounts`; UQ (social_account_id, captured_on) | Tham chiếu `social_accounts` | R07-01 |
| captured_on | date | Không |  | UQ (social_account_id, captured_on) | Ngày lấy số liệu (giờ Nhật) | R07-01 |
| follower_count | integer | Không |  | CK `chk_follower_snapshots_count` | Số người theo dõi, ≥ 0 | R07-01, R07-04 |
| captured_at | timestamp with time zone | Không | now() |  | Lúc lấy số liệu | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_follower_snapshots_count: CHECK ((follower_count >= 0))
fk_follower_snapshots_social_account_id: FOREIGN KEY (social_account_id) REFERENCES social_accounts(id) ON DELETE RESTRICT
pk_follower_snapshots: PRIMARY KEY (id)
uq_follower_snapshots_social_account_id_captured_on: UNIQUE (social_account_id, captured_on)
TRIGGER trg_follower_snapshots_deferred → reject_deferred_write()
```

</details>

## post_approval_decisions

Quyết định duyệt/trả lại bài. Chặn ghi: luồng duyệt chưa chốt ([QA] No.51, 57–61).

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| post_id | uuid | Không |  | FK `posts` | Tham chiếu `posts` | R06-05 |
| manager_id | uuid | Không |  | FK `managers` | Bất kỳ quản lý nào | R06-06 |
| decision | text | Không |  | CK `chk_post_approval_decisions_decision`; CK `chk_post_approval_decisions_reason` | Duyệt hoặc trả lại | R06-05 |
| reason | text | Có |  | CK `chk_post_approval_decisions_reason` | Lý do trả lại, hiện cho tài năng | R06-05, BR-08 |
| decided_at | timestamp with time zone | Không | now() |  | Lúc quyết định | R06-05 |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_post_approval_decisions_decision: CHECK ((decision = ANY (ARRAY['approved'::text, 'returned'::text])))
chk_post_approval_decisions_reason: CHECK (((decision <> 'returned'::text) OR (btrim(COALESCE(reason, ''::text)) <> ''::text)))
fk_post_approval_decisions_manager_id: FOREIGN KEY (manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_post_approval_decisions_post_id: FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE RESTRICT
pk_post_approval_decisions: PRIMARY KEY (id)
INDEX idx_post_approval_decisions_manager_id ON public.post_approval_decisions USING btree (manager_id)
INDEX idx_post_approval_decisions_post_id_decided_at ON public.post_approval_decisions USING btree (post_id, decided_at DESC)
TRIGGER trg_post_approval_decisions_deferred → reject_deferred_write()
```

</details>

## post_deliveries

Việc đăng một bài lên một mạng. Chặn ghi: trạng thái và luồng đăng chưa chốt.

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | KT |
| post_id | uuid | Không |  | FK kép (post_id, talent_id) `posts`; FK `posts`; UQ (post_id, platform) | Tham chiếu `posts` | R06-03 |
| platform | text | Không |  | CK `chk_post_deliveries_platform`; FK kép (social_account_id, talent_id, platform) `social_accounts`; UQ (post_id, platform) | `instagram`, `tiktok`, `youtube` | BR-07, BR-11 |
| social_account_id | uuid | Không |  | FK kép (social_account_id, talent_id, platform) `social_accounts`; FK `social_accounts` | Tài khoản dùng để đăng | R06-03 |
| provider_state | text | Không | 'not_submitted'::text | CK `chk_post_deliveries_failure`; CK `chk_post_deliveries_job_ref`; CK `chk_post_deliveries_provider_state`; CK `chk_post_deliveries_published` | Vòng đời ở Upload-Post cho mạng này: not_submitted, submitted, submit_failed (gửi lịch); cancel_requested, cancelled, cancel_failed (hủy lịch); published, publish_failed (kết quả đăng) | R06-03, R06-12, R06-13, R01-12 |
| provider_state_changed_at | timestamp with time zone | Không | now() |  | Lần đổi provider_state gần nhất; việc nền dùng để đối soát | KT |
| provider_job_ref | text | Có |  | CK `chk_post_deliveries_job_ref` | Mã việc ở Upload-Post | R06-03 |
| failure_reason | text | Có |  | CK `chk_post_deliveries_failure` | Lý do lỗi, hiện cho tài năng hoặc quản lý | R06-11 |
| external_post_ref | text | Có |  |  | Mã bài trên mạng xã hội | R07-01 |
| published_at | timestamp with time zone | Có |  | CK `chk_post_deliveries_published` | Lúc đăng thành công; dùng tính số ngày không đăng | R06-03, R02-05 |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |
| talent_id | uuid | Không |  | FK kép (social_account_id, talent_id, platform) `social_accounts`; FK kép (post_id, talent_id) `posts` | Chủ của bài và tài khoản mạng xã hội | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_post_deliveries_failure: CHECK (((provider_state <> ALL (ARRAY['submit_failed'::text, 'cancel_failed'::text, 'publish_failed'::text])) OR (failure_reason IS NOT NULL)))
chk_post_deliveries_job_ref: CHECK (((provider_state = ANY (ARRAY['not_submitted'::text, 'submit_failed'::text])) OR (provider_job_ref IS NOT NULL)))
chk_post_deliveries_platform: CHECK ((platform = ANY (ARRAY['instagram'::text, 'tiktok'::text, 'youtube'::text])))
chk_post_deliveries_provider_state: CHECK ((provider_state = ANY (ARRAY['not_submitted'::text, 'submitted'::text, 'submit_failed'::text, 'cancel_requested'::text, 'cancelled'::text, 'cancel_failed'::text, 'published'::text, 'publish_failed'::text])))
chk_post_deliveries_published: CHECK (((provider_state = 'published'::text) = (published_at IS NOT NULL)))
fk_post_deliveries_account_scope: FOREIGN KEY (social_account_id, talent_id, platform) REFERENCES social_accounts(id, talent_id, platform) ON DELETE RESTRICT
fk_post_deliveries_owner: FOREIGN KEY (post_id, talent_id) REFERENCES posts(id, talent_id) ON DELETE RESTRICT
fk_post_deliveries_post_id: FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE RESTRICT
fk_post_deliveries_social_account_id: FOREIGN KEY (social_account_id) REFERENCES social_accounts(id) ON DELETE RESTRICT
pk_post_deliveries: PRIMARY KEY (id)
uq_post_deliveries_post_id_platform: UNIQUE (post_id, platform)
INDEX idx_post_deliveries_needs_attention ON public.post_deliveries USING btree (provider_state_changed_at) WHERE (provider_state = ANY (ARRAY['submit_failed'::text, 'cancel_requested'::text, 'cancel_failed'::text, 'publish_failed'::text]))
INDEX idx_post_deliveries_social_account_id_published_at ON public.post_deliveries USING btree (social_account_id, published_at DESC)
TRIGGER trg_post_deliveries_deferred → reject_deferred_write()
TRIGGER trg_post_deliveries_updated_at → set_updated_at()
```

</details>

## post_metric_snapshots

Số liệu bài theo ngày. Chặn ghi theo `post_deliveries`.

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | bigint | Không | identity | PK |  | KT |
| post_delivery_id | uuid | Không |  | FK `post_deliveries`; UQ (post_delivery_id, captured_on) | Tham chiếu `post_deliveries` | R07-01 |
| captured_on | date | Không |  | UQ (post_delivery_id, captured_on) | Ngày của số liệu (giờ Nhật) | R07-01 |
| metrics | jsonb | Không |  | CK `chk_post_metric_snapshots_metrics` | Chỉ số do Upload-Post trả về, giữ nguyên tên gốc | R07-02 |
| captured_at | timestamp with time zone | Không | now() |  | Lúc lấy số liệu | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_post_metric_snapshots_metrics: CHECK ((jsonb_typeof(metrics) = 'object'::text))
fk_post_metric_snapshots_post_delivery_id: FOREIGN KEY (post_delivery_id) REFERENCES post_deliveries(id) ON DELETE RESTRICT
pk_post_metric_snapshots: PRIMARY KEY (id)
uq_post_metric_snapshots_post_delivery_id_captured_on: UNIQUE (post_delivery_id, captured_on)
TRIGGER trg_post_metric_snapshots_deferred → reject_deferred_write()
```

</details>

## video_generations

Lượt tạo video AI. Chặn ghi: đơn giá, kỳ thu chưa chốt.

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK; UQ (id, talent_id) |  | KT |
| talent_id | uuid | Không |  | FK kép (result_media_asset_id, talent_id) `media_assets`; FK `talents`; UQ (id, talent_id) | Lượt được tính cho tài năng này (kể cả khi quản lý tạo thay) | R05-07, CR-09 |
| video_type | text | Không |  | CK `chk_video_generations_video_type` | `short` (video ngắn AI) hoặc `slide` (trình chiếu) | BR-12 |
| status | text | Không | 'requested'::text | CK `chk_video_generations_completed`; CK `chk_video_generations_result`; CK `chk_video_generations_status` | `requested` → `processing` → `succeeded` / `failed` | R05-06〜R05-09 |
| is_counted | boolean | Không | true |  | Đếm vào số lần tạo video trong tháng; false khi dịch vụ tạo video lỗi. Chỉ tính tiền khi tài năng là loại `talent` (tài khoản công ty được đếm, không thu tiền) | BR-13, R08-04, R08-07 |
| requested_by_manager_id | uuid | Có |  | FK `managers` | Quản lý tạo thay | CR-09 |
| idempotency_key | text | Không |  | UQ | Chống tạo hai lượt khi bấm lặp | KT |
| provider_job_ref | text | Có |  |  | Mã việc ở fal.ai (video ngắn) | R05-06 |
| result_media_asset_id | uuid | Có |  | CK `chk_video_generations_result`; FK `media_assets`; FK kép (result_media_asset_id, talent_id) `media_assets`; UQ | Video kết quả | R05-09 |
| failure_reason | text | Có |  |  | Lý do hiện cho tài năng | [YK2] §6-8 5-1 |
| requested_at | timestamp with time zone | Không | now() |  | Thời điểm tính lượt | R05-07 |
| completed_at | timestamp with time zone | Có |  | CK `chk_video_generations_completed` | Lúc xong; có khi `succeeded`/`failed` | KT |
| created_at | timestamp with time zone | Không | now() |  |  | KT |
| updated_at | timestamp with time zone | Không | now() |  |  | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_video_generations_completed: CHECK (((status = ANY (ARRAY['succeeded'::text, 'failed'::text])) = (completed_at IS NOT NULL)))
chk_video_generations_result: CHECK (((status = 'succeeded'::text) = (result_media_asset_id IS NOT NULL)))
chk_video_generations_status: CHECK ((status = ANY (ARRAY['requested'::text, 'processing'::text, 'succeeded'::text, 'failed'::text])))
chk_video_generations_video_type: CHECK ((video_type = ANY (ARRAY['short'::text, 'slide'::text])))
fk_video_generations_requested_by_manager_id: FOREIGN KEY (requested_by_manager_id) REFERENCES managers(id) ON DELETE RESTRICT
fk_video_generations_result_media_asset_id: FOREIGN KEY (result_media_asset_id) REFERENCES media_assets(id) ON DELETE RESTRICT
fk_video_generations_result_owner: FOREIGN KEY (result_media_asset_id, talent_id) REFERENCES media_assets(id, talent_id) ON DELETE RESTRICT
fk_video_generations_talent_id: FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE RESTRICT
pk_video_generations: PRIMARY KEY (id)
uq_video_generations_id_talent: UNIQUE (id, talent_id)
uq_video_generations_idempotency_key: UNIQUE (idempotency_key)
uq_video_generations_result_media_asset_id: UNIQUE (result_media_asset_id)
INDEX idx_video_generations_in_progress ON public.video_generations USING btree (requested_at) WHERE (status = ANY (ARRAY['requested'::text, 'processing'::text]))
INDEX idx_video_generations_talent_id_requested_at ON public.video_generations USING btree (talent_id, requested_at)
TRIGGER trg_video_generations_deferred → reject_deferred_write()
TRIGGER trg_video_generations_updated_at → set_updated_at()
```

</details>

## video_generation_inputs

Ảnh đầu vào của lượt tạo video. Chặn ghi theo `video_generations`.

Quyền runtime: không · **Chặn ghi**

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| video_generation_id | uuid | Không |  | FK kép (video_generation_id, talent_id) `video_generations`; FK `video_generations`; PK (video_generation_id, media_asset_id); UQ (video_generation_id, position) | Tham chiếu `video_generations` | R05-08 |
| media_asset_id | uuid | Không |  | FK `media_assets`; FK kép (media_asset_id, talent_id) `media_assets`; PK (video_generation_id, media_asset_id) | Ảnh nguồn | R05-08 |
| position | smallint | Không |  | CK `chk_video_generation_inputs_position`; UQ (video_generation_id, position) | Thứ tự ảnh | KT |
| talent_id | uuid | Không |  | FK kép (media_asset_id, talent_id) `media_assets`; FK kép (video_generation_id, talent_id) `video_generations` | Chủ của lượt tạo và ảnh đầu vào | KT |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
chk_video_generation_inputs_position: CHECK (("position" > 0))
fk_video_generation_inputs_media_asset_id: FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE RESTRICT
fk_video_generation_inputs_media_owner: FOREIGN KEY (media_asset_id, talent_id) REFERENCES media_assets(id, talent_id) ON DELETE RESTRICT
fk_video_generation_inputs_owner: FOREIGN KEY (video_generation_id, talent_id) REFERENCES video_generations(id, talent_id) ON DELETE CASCADE
fk_video_generation_inputs_video_generation_id: FOREIGN KEY (video_generation_id) REFERENCES video_generations(id) ON DELETE CASCADE
pk_video_generation_inputs: PRIMARY KEY (video_generation_id, media_asset_id)
uq_video_generation_inputs_video_generation_id_position: UNIQUE (video_generation_id, "position")
INDEX idx_video_generation_inputs_media_asset_id ON public.video_generation_inputs USING btree (media_asset_id)
TRIGGER trg_video_generation_inputs_deferred → reject_deferred_write()
```

</details>

---

**Chỉ dùng cho demo công nghệ: không dùng cho tính năng thật**

## app_private.tech_demo_sessions

Sổ phiên của bản demo công nghệ. Tính năng thật dùng `auth_session_registry`.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| session_id | uuid | Không |  | PK; UQ (session_id, auth_user_id) | Demo: `session_id` trong JWT | Demo |
| auth_user_id | uuid | Không |  | FK `auth.users`; UQ (session_id, auth_user_id) | Tham chiếu `auth.users` | Demo |
| revoked_at | timestamp with time zone | Có |  |  | Demo: lúc đăng xuất | Demo |
| created_at | timestamp with time zone | Không | now() |  |  | Demo |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
tech_demo_sessions_auth_user_id_fkey: FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE CASCADE
tech_demo_sessions_pkey: PRIMARY KEY (session_id)
tech_demo_sessions_session_id_auth_user_id_key: UNIQUE (session_id, auth_user_id)
INDEX idx_tech_sessions_user ON app_private.tech_demo_sessions USING btree (auth_user_id)
```

</details>

## app_private.tech_demo_push_subscriptions

Đăng ký push của bản demo. Tính năng thật dùng `public.push_subscriptions`.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| id | uuid | Không | gen_random_uuid() | PK |  | Demo |
| auth_user_id | uuid | Không |  | FK kép (session_id, auth_user_id) `app_private.tech_demo_sessions` | Demo: chủ đăng ký | Demo |
| session_id | uuid | Không |  | FK kép (session_id, auth_user_id) `app_private.tech_demo_sessions` | Demo: phiên tạo đăng ký | Demo |
| endpoint | text | Không |  | CK `tech_demo_push_subscriptions_endpoint_check`; UQ | Demo: địa chỉ máy chủ đẩy | Demo |
| p256dh_key | text | Không |  |  | Demo: khóa mã hóa nội dung | Demo |
| auth_secret | text | Không |  |  | Demo: khóa bí mật của đăng ký | Demo |
| label | text | Không | 'Browser'::text | CK `tech_demo_push_subscriptions_label_check` | Demo: tên máy hiển thị | Demo |
| is_active | boolean | Không | true |  | Demo: còn bật | Demo |
| updated_at | timestamp with time zone | Không | now() |  |  | Demo |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
tech_demo_push_subscriptions_endpoint_check: CHECK ((length(endpoint) <= 2048))
tech_demo_push_subscriptions_label_check: CHECK (((length(label) >= 1) AND (length(label) <= 80)))
tech_demo_push_subscriptions_session_id_auth_user_id_fkey: FOREIGN KEY (session_id, auth_user_id) REFERENCES app_private.tech_demo_sessions(session_id, auth_user_id) ON DELETE CASCADE
tech_demo_push_subscriptions_pkey: PRIMARY KEY (id)
tech_demo_push_subscriptions_endpoint_key: UNIQUE (endpoint)
INDEX idx_tech_push_owner ON app_private.tech_demo_push_subscriptions USING btree (auth_user_id) WHERE is_active
INDEX idx_tech_push_session ON app_private.tech_demo_push_subscriptions USING btree (session_id, auth_user_id)
```

</details>

## app_private.demo_auth_deliveries

Giao mật khẩu tạm của bản demo cũ (đã thu gọn). Không dùng.

Quyền runtime: SELECT, INSERT, UPDATE

| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |
|---|---|---|---|---|---|---|
| application_id | uuid | Không |  | FK `talent_applications`; PK | Tham chiếu `talent_applications` | Demo |
| receipt_hash | text | Không |  | CK `demo_auth_deliveries_receipt_hash_check`; UQ | Demo cũ: băm biên nhận | Demo |
| credential_ciphertext | text | Có |  | CK `demo_auth_deliveries_check`; CK `demo_auth_deliveries_check1` | Demo cũ: mật khẩu tạm đã mã hóa | Demo |
| state | text | Không | 'pending'::text | CK `demo_auth_deliveries_check`; CK `demo_auth_deliveries_check1`; CK `demo_auth_deliveries_check2`; CK `demo_auth_deliveries_state_check` | Demo cũ: trạng thái giao | Demo |
| expires_at | timestamp with time zone | Có |  | CK `demo_auth_deliveries_check1` | Demo cũ: hạn | Demo |
| claimed_at | timestamp with time zone | Có |  | CK `demo_auth_deliveries_check2` | Demo cũ: lúc nhận | Demo |

<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>

```sql
demo_auth_deliveries_check: CHECK (((state = ANY (ARRAY['pending'::text, 'available'::text])) OR (credential_ciphertext IS NULL)))
demo_auth_deliveries_check1: CHECK (((state <> 'available'::text) OR ((credential_ciphertext IS NOT NULL) AND (expires_at IS NOT NULL))))
demo_auth_deliveries_check2: CHECK (((state = 'claimed'::text) = (claimed_at IS NOT NULL)))
demo_auth_deliveries_receipt_hash_check: CHECK ((receipt_hash ~ '^[0-9a-f]{64}$'::text))
demo_auth_deliveries_state_check: CHECK ((state = ANY (ARRAY['pending'::text, 'available'::text, 'claimed'::text, 'failed'::text])))
demo_auth_deliveries_application_id_fkey: FOREIGN KEY (application_id) REFERENCES talent_applications(id) ON DELETE RESTRICT
demo_auth_deliveries_pkey: PRIMARY KEY (application_id)
demo_auth_deliveries_receipt_hash_key: UNIQUE (receipt_hash)
```

</details>

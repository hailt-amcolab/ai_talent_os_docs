# Từ điển dữ liệu bổ sung cho Auth

Thiết kế đề xuất ngày17/11/2026. Đây là đầu vào để viết migration, không tuyên bố các bảng đã tồn tại. UUID mặc định do server/DB sinh. Timestamp là timestamptz UTC; số version là bigint dương. Tất cả bảng bên dưới đặt trong app_private, không expose Data API, không cấp quyền ghi anon/authenticated. Không lưu password, OTP hoặc Phone MFA qua SMS secret.

## applications

- id UUID PK; organization_id UUID FK organizations; display_name text tối đa100; canonical_email text tối đa254 theo policy duy nhất của project; date_of_birth date; terms_version text; terms_accepted_at timestamp.
- state: pending, approved_provisioning, approved, rejected; version bigint mặc định1; decided_by UUID FK app_users nullable; decided_at timestamp nullable; created_at/updated_at timestamp.
- UNIQUE(canonical_email) theo baseline một identity/project và v2 không trùng email. Nếu cần reapply sau rejected phải chốt policy; không tự xóa record cũ để né constraint.
- Index(organization_id,state,created_at,id). DOB không tương lai kiểm server theo ngày nghiệp vụ; tuổi và guardian consent không suy từ client boolean.

## auth_provisioning

- id UUID PK; application_id UUID FK applications UNIQUE nullable nếu Manager/office; target_kind: talent,manager,office; organization_id FK; command_id UUID; actor_user_id UUID FK app_users nullable chỉ bootstrap operator có audit riêng.
- payload_hash text; state: accepted,running,completed,failed,unknown; step: decision_committed,auth_creating,auth_created,binding_created,delivery_pending,delivered,requires_review.
- auth_user_id UUID FK auth.users nullable; temporary_secret_ref text nullable chỉ reference tới secret store mã hóa; temporary_expires_at timestamp nullable; delivery_generation bigint mặc định1; version bigint mặc định1; request_id UUID; last_error_code text nullable; created_at/updated_at.
- UNIQUE(actor_user_id,target_kind,command_id) cho command có actor. Bootstrap dùng key riêng không dựa unique nullable actor vì PostgreSQL cho phép nhiều NULL. application_id là một operation dài hạn, resend có generation/command riêng.
- Không persist payload hash của request chứa password tự chọn: command ở đây chỉ quyết định/provisioning metadata. Không chứa secret trong result hoặc outbox.

## auth_flow_attempts

- id UUID PK opaque; purpose: email_login,password_recovery,temporary_activation,email_change; user_id UUID nullable; email_hmac text; email_reference UUID/reference tới dữ liệu email được bảo vệ; organization_id UUID nullable.
- state: requested,sent,delivery_unknown,verified,expired,superseded,failed; generation bigint; attempts_used integer >=0; expires_at/resend_after/created_at timestamp; verified_at timestamp nullable; request_id UUID.
- session_id UUID nullable sau Auth verify; chỉ server ghi. Không FK bắt buộc tới auth.sessions để tránh coupling với cleanup của Supabase.
- Index(email_hmac,purpose,created_at), index(expires_at) để cleanup. HMAC có pepper server; không plain SHA256 email dễ dò.
- Không tự ghi sent chỉ từ client; provider accepted và delivered là hai tín hiệu khác nhau. Response public không tiết lộ user_id hoặc email reference.

## auth_challenges

- id UUID PK là challengeRef trả UI; user_id UUID FK app_users; session_id UUID; factor_id text; provider_challenge_id text; purpose: login,enrollment,factor_change.
- state: pending,verified,expired,failed; attempts_used integer>=0; expires_at timestamp theo provider challenge; created_at/verified_at timestamp; request_id UUID.
- Index(user_id,session_id,state,expires_at). Khi verify kiểm đầy đủ user/session/factor/purpose; factorId trong request enroll/change không là quyền sở hữu.
- Phone enrollment không có QR/secret. expires_at lấy từ challenge provider; send attempt chưa rõ kết quả có thể chưa có expiry/challengeId.

## auth_rate_buckets và password_lock_state

- auth_rate_buckets: bucket_key text PK, purpose text enum, window_started_at timestamp, count integer>=0, blocked_until timestamp nullable, updated_at. Key có HMAC account/email/IP phù hợp privacy policy; không đọc client X-Forwarded-For chưa xác minh.
- password_lock_state: user_id UUID PK FK auth.users, consecutive_failures integer>=0, blocked_until timestamp nullable, last_failed_at timestamp nullable, updated_at.
- Auth password verification hook cập nhật password_lock_state atomically dưới concurrency; hook role chỉ được execute function và truy cập bảng cần thiết theo review. App limiter không thay hook.
- Phone MFA qua SMS/email OTP có counter riêng; cleanup theo retention ngắn hạn đã duyệt. Limiter phân tán không dùng biến memory Vercel làm nguồn chính.

## domain_commands

- id UUID PK; actor_user_id UUID FK; organization_id UUID FK; usecase text enum allowlist; command_id UUID; payload_hash text; state accepted/running/completed/failed/unknown; result_refs jsonb; created_at/updated_at/expires_at timestamp.
- UNIQUE(actor_user_id,usecase,command_id). result_refs chỉ ID/status an toàn, không raw session, password, OTP, QR hoặc provider credential.
- Domain update + command + outbox phải commit cùng transaction. TTL command phải dài hơn cửa sổ retry/operation lookup được UI hỗ trợ; chốt retention thay vì purge sớm làm command cũ tạo side effect lần hai.
- Auth login/OTP verify không cache raw response theo mẫu command này; dùng attempt/challenge và đối soát phiên. PasswordSet giữ secret trong request memory, không hash body để lưu như idempotency payload.

## auth_session_registry bổ sung

SQL core đã có session_id,user_id,security_version_at_issue,auth_time,absolute_expires_at,admin_last_activity_at,revoked_at. Khi triển khai thêm purpose enum full/first_password/recovery/mfa_setup, password_proof_at và mfa_proof_at nullable nếu cần recent authentication, created_at/updated_at.

Không tự cấp purpose=full vì cookie tồn tại. Chỉ session completion service đã xác minh phương thức đăng nhập và policy được tạo/upgrade. `auth_time` là mốc đăng nhập được server biết, không lấy iat của access token sau mỗi refresh để kéo dài30 ngày. Nếu schema core chưa có purpose thì không insert restricted session vào registry dùng cho domain read; giữ ở flow metadata cho tới khi được phép full.

## Audit và outbox

SQL core là mẫu tối thiểu. Khi code bổ sung audit metadata allowlist (session_id, policy_version, operation_id, previous_version,new_version), không snapshot toàn bộ request Auth. Outbox payload chỉ reference/aggregate ID và generation; worker đọc lại trạng thái hiện tại. Unique aggregate/generation/event_type chưa thay hoàn toàn inbox/provider idempotency; webhook phải có inbox key riêng theo spec tích hợp.

## Cách ghép với core reference

Không chạy bộ từ điển này như SQL. Viết migration tiếp theo cho các bảng, FK, check constraint, index, grants và role hook/repository; thêm tests cho mọi quyền mới. Không thêm function SECURITY DEFINER generic để browser sửa app_users/membership/registry. Chạy disposable Supabase và staging trước production, ghi rõ migration version thực tế.

## Bổ sung SMS

Các bảng manager_phone_bindings,sms_send_attempts và field phone-specific proof được định nghĩa tại SMS_MFA_IMPLEMENTATION_VI.md mục7. Agent cần migration tiếp theo; core reference không tự thêm chúng. Không dùng auth.users.phone thay cho approved MFA binding.

## Bản1.2 Phương thức MFA chung

Registry bổ sung last_mfa_method enum(totp,phone_sms),last_mfa_factor_id text,mfa_verified_at timestamp,mfa_policy_version text. Challenge thêm method enum tương ứng từ factor thật ở server, không client tự ghi. Phone binding/send attempt chỉ thuộc nhánh SMS; không ép user TOTP có số.

TOTP pending enrollment metadata: user/session/factorId/state/createdAt/setupExpiresAt; không QR/secret trong bảng app. MfaPolicy thuộc server config/record có version; allowed methods không rỗng, preferred phải nằm trong allowed. Không cần thêm role Manager mới. Không lưu một flag sms_verified làm điều kiện bắt buộc chung.

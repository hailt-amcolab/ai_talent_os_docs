# Hợp đồng API nội bộ Supabase Auth

Prefix /api/v1. Đây là API ứng dụng NEW trừ bootstrap/operations REUSE. Không là đường dẫn REST trực tiếp của Supabase. Error envelope theo spec §8. Auth response no-store, không JSON raw tokens; SDK/SSR adapter cập nhật cookie. Origin/CSRF cho mutation; public endpoints có limiter.

| Method | Path | Quyền | Request schema | Response | Điều kiện/lỗi |
|---|---|---|---|---|---|
| POST | /applications | public | ApplicationCreate | 202 application receipt generic | INPUT_INVALID,RATE_LIMITED; no role/password fields |
| POST | /admin/applications/{id}/decision | manager aal2 | ApplicationDecision | 202 Operation | VERSION_CONFLICT,IDENTITY_COLLISION; first-manager-wins |
| GET | /admin/auth-provisioning/{id} | manager aal2 | none | step,status,unresolved; no secret | 404 outside org |
| POST | /admin/auth-provisioning/{id}/resend | manager aal2 | Command | 202 Operation | rotate temporary secret; never resend outbox plaintext |
| POST | /auth/login | public | PasswordLogin | 200 AuthNextState + Set-Cookie | generic invalid/locked; register only allowed session. **Điểm duy nhất đăng nhập bằng mật khẩu; khóa 5 lần sai/15 phút đếm tại đây (AU05)** |
| GET | /auth/state | session restricted allowed | none | AuthNextState | no domain data for aal1/recovery/temp |
| POST | /auth/first-password | temp-password session | PasswordSet | 202 Operation or confirmed completion | PASSWORD_CHANGE_REQUIRED/ATTEMPT_EXPIRED; reconcile across Auth/DB |
| POST | /auth/mfa/enroll | manager aal1 limited or aal2 | MfaEnroll | 201 MfaEnrollmentResponse (TotpEnrollment hoặc PhoneEnrollment) | Enrollment theo method; TOTP trả QR/secret một lần, SMS trả factor pending; chưa domain access |
| GET | /auth/mfa/factors | own session | none | verified/unverified metadata, assurance | metadata factor của chính user theo từng method; không secret cũ |
| POST | /auth/mfa/challenges | own session | MfaChallenge | 201 MfaChallengeResponse hoặc202 SmsDispatchStatus (chỉ SMS) | Kiểm factorType/method/policy; SMS có sendRequestId/cooldown/budget, TOTP không gửi tin |
| POST | /auth/mfa/challenges/{id}/verify | bound own session | CodeVerify | 200 AuthNextState + refreshed cookie | MFA_INVALID_CODE,CHALLENGE_EXPIRED,RATE_LIMITED |
| DELETE | /auth/mfa/factors/{id} | own session aal2 if verified | none | 204 or operation for reset | recentauth/lastfactor policy; unverified cleanup limited |
| POST | /auth/mfa/recovery-requests | public/aal1 limited | RecoveryRequest | 202 generic receipt | does not remove factors or upgrade AAL |
| POST | /admin/users/{id}/mfa-reset | authorized manager aal2/outofband operator | MfaResetDecision | 202 Operation | app revoke before Auth reset; recovery policy CĐ |
| POST | /auth/password-reset-requests | public | EmailOnly | 202 generic | no existence leak |
| GET | /auth/callback | public purpose-bound | allowlisted code/token_hash form | 303 interstitial/limited recovery | exact PKCE/recovery mode chosen; no arbitrary redirect/type |
| POST | /auth/password-reset | verified recovery limited | PasswordSet | 202 Operation/completion | không bỏ qua bước MFA; revoke app registry |
| POST | /auth/email-change | session recentauth gated | EmailChange | 202 pending verified change | disabled default; Manager aal2 |
| POST | /auth/logout | own session | Logout | 204 or partial-revoke status | local/global/others explicit; no guaranteed JWT kill |
| GET | /me/bootstrap | app allowed session | none | owner DTO/capabilities/onboarding | REUSE PWA; Account state controls data |
| POST | /admin/users/{id}/access-state | manager aal2 | AccessStateCommand | 202 Operation | revoke app immediately, external effects async |
| GET | /operations/{id} | owner/manager same org | none | Operation | REUSE existing no secret payload |

## AuthNextState

{state: anonymous|password_change_required|enrollment_required|mfa_required|onboarding|ready|disabled,actorId?,currentAal?,nextAal?,allowedNextRoute,requestId}. allowedNextRoute là nội bộ allowlist. Không có profile/Talent list nếu chỉ ở trạng thái giới hạn. currentAal từ token/provider đã xác minh, không từ request body.

## Giới hạn của schema

API_CONTRACTS.schema.json kiểm dạng đầu vào và một số response. Application service phải kiểm ownership, version, DOB tuổi/guardian, canonical email,attempt purpose,session binding,MFAstate,OTP expiry và giá trị provider. Không cho user tùy ý truyền code type,email ở verify hoặc actorId cho role. PasswordSet không cache/log/idempotency body chứa password.

## Tên SDK cần gọi

PasswordLogin -> auth.signInWithPassword. MFAEnroll -> totp:auth.mfa.enroll(factorType=totp), SMS:auth.mfa.enroll(factorType=phone,phone=approved E.164). Challenge/verify -> auth.mfa.challenge và auth.mfa.verify. FactorList -> auth.mfa.listFactors. AAL -> auth.mfa.getAuthenticatorAssuranceLevel. Unenroll -> auth.mfa.unenroll. Recovery -> auth.resetPasswordForEmail / auth.updateUser. Admin provisioning -> auth.admin.createUser, user-management methods đúng SDK đã lock; admin resetfactor qua API MFAadmin được project hỗ trợ sau POC, không tự viết URL chưa xác minh.

Resend passwordless không dùng auth.resend(type=signup) nhầm mục đích. Đăng ký form/application không dùng auth.signUp tự cấp role. Browser SDK tự gọi Auth không thay app authorization/registry; key publishable không là bí mật ngăn bypass.

## Hợp đồng MFA bản1.2

GET /auth/mfa/options (session sau password, own-user) -> {policy:MfaPolicy,factors:[{factorId,method,status,maskedPhone?}],enrollmentAllowedMethods}. Không trả dữ liệu Talent/admin; danh sách là giao giữa policy và cấu hình provider. preferredMethod phải thuộc allowedMethods, kiểm invariant ở application service.

POST /auth/mfa/enroll nhận MfaEnroll oneOf: {method:totp,friendlyName?} hoặc {method:phone_sms,phone,friendlyName?}. Không nhận phone ở branch TOTP hoặc thiếu phone ở branch SMS. TOTP trả QR/secret một lần với no-store; SMS không QR. Không log/cache response enrollment.

POST /auth/mfa/challenges nhận MfaChallenge oneOf. TOTP {method:totp,factorId,purpose} không sendRequestId/không phát SMS; SMS thêm sendRequestId bắt buộc, reserve/cooldown trước gọi provider. Server đối chiếu factorType thật và allowedMethods, không tin nhãn client.

POST /auth/mfa/challenges/{id}/verify vẫn CodeVerify {code}; method/purpose tra từ challenge server. Sau success ghi proof đúng method/factor/session và kiểm policy hiện tại. TOTP thành công không cần SMS, SMS thành công không cần TOTP nếu cả hai allowed.

POST /auth/mfa/challenges/{challengeRef}/resend nhận SmsResend, chỉ cho challenge SMS; TOTP trả422 RESEND_NOT_APPLICABLE. TOTP hết hạn tạo challenge mới, không gọi API gửi lại SMS. GET /auth/mfa/send-attempts/{id} chỉ đọc SmsDispatchStatus, không phát tin.

Lỗi thêm: MFA_METHOD_NOT_ALLOWED403, FACTOR_METHOD_MISMATCH422, RESEND_NOT_APPLICABLE422; SMS_SEND_UNAVAILABLE503, SMS_DELIVERY_UNKNOWN202, SMS_RATE_LIMITED429, SMS_BUDGET_EXCEEDED429, PHONE_INVALID422, PHONE_NOT_APPROVED403. Không fallback email/password-only. Không yêu cầu phone proof trong TOTP route; dùng proof chung theo policy.

API options/enroll/challenge/verify đều no-store, kiểm Origin/CSRF/ownership. Cookie/session cập nhật theo SSR adapter. SDK và payload mẫu chưa chạy thật; runtime schema cần validator + integration test khi code.

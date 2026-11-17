# API nội bộ Talent PWA — đề xuất v1.1 (đối chiếu [YK2] v2, [AG])

Prefix /api/v1; auth cookie/session xác minh server. Public auth phải rate-limit/origin check; private routes yêu cầu Talent ownership. NEW là hợp đồng để implement, chưa phải API đang chạy. REUSE không được thay contract âm thầm. JSON schema không bao phủ response của mọi domain cũ: response DTO phần REUSE theo spec gốc; khi code phải xuất OpenAPI thống nhất.

Mọi list trả {items,nextCursor}; mọi view có version/updatedAt nếu versioned. Mutation 202 Operation cho việc async; mutation sync200/201 trả resource hoặc204 khi không body. Mã lỗi chung theo §3; command trả lỗi policy trước side effect.

| Nhóm | Method/path | Input | Output / xử lý đặc thù |
|---|---|---|---|
| Auth public | POST /auth/login | email,password | session SDK + bootstrap; generic401,423lock,429rate; Auth adapter phải kiểm ở mọi đường login |
| Auth public | POST /auth/password-reset-requests | email | 202 generic; không email enumeration |
| Auth | POST /auth/first-password | newPassword, managerViewAcknowledged (確認13) | Đặt mật khẩu lần đầu sau khi đăng nhập bằng mật khẩu tạm (T-03); 410 mật khẩu tạm quá hạn (7 ngày, S01-05) |
| Auth public | POST /auth/password-reset | token/code,password | auth result;410 token hết hạn/đã dùng |
| Auth private | POST /auth/logout | empty |204; revoke push binding rồi signOut; partial failure có code cần retry |
| Config public | GET /client-config | none | appVersion,minimumClientVersion,publicVapidKey,mediaLimits; không user secrets |
| Bootstrap | GET /me/bootstrap | none | actor,role,accountState,profile,capabilities,onboarding,policyVersion,timezone,locale,unreadCount,provisioning |
| Onboarding | GET/PATCH /me/onboarding | OnboardingPatch khi PATCH | progress+version; billing/social completed được server verify, không tin client tự báo |
| Apply public | POST /applications | displayName, email, birthDate, termsVersion, termsAccepted | 202 đơn chờ duyệt (T-01, [YK2] 1-4); email đã dùng (kể cả đơn bị từ chối) → không tạo đơn; rate limit IP/email |
| Consent | POST /me/consents | ConsentCreate |201 append audit;422 documentVersion không còn hợp lệ |
| Home | GET /me/home | none | T-07: việc cần xử lý, nhiệm vụ, 3 chủ đề, bản nháp hôm nay kèm giờ đăng dự kiến |
| Hub | GET /me/dashboard | none | widgets với status,value?,updatedAt và shortcuts; không all-or-nothing |
| Coach | GET /me/coach/messages | before?,limit? | items gồm id,role,text,createdAt,operationId?,nextCursor |
| Coach | POST /me/coach/messages | CoachMessageCreate |202 Operation; response thread binding; thread ownership kiểm server |
| Suggestions | GET /me/suggestions | date YYYY-MM-DD | setId,version,businessDate,status,topics[{id,title,summary}],snapshotUpdatedAt; preparing không phải404 |
| Draft | POST /me/drafts | DraftCreate |202 Operation; suggestion source cần id+version, own_idea cần idea |
| Draft | GET /drafts/{id} | none | id,version,status,currentRevision,media,validation,allowedActions,updatedAt |
| Revision | POST /drafts/{id}/revisions | DraftRevisionCreate |202 Operation;409 stale version |
| Attach | PATCH /drafts/{id}/media | DraftMediaPatch |200 draft updated;422 asset chưa ready/không hợp lệ |
| Adopt | POST /drafts/{id}/adopt | DraftAdopt |202 Operation -> postId/approval or blocked result; backend scheduling service dùng contract cũ |
| Upload | POST /me/media/upload-sessions | UploadSessionCreate |201 UploadSession;size/type policy từ config; object name không là path Graph |
| Upload | GET /me/media/upload-sessions/{id} | none | UploadSession; owner-only;410expired |
| Bytes | (Supabase Storage, TUS) | theo `UploadSession.transport` | Trình duyệt tải thẳng lên Supabase Storage, không qua API này; offset do Supabase ghi nhận |
| Complete | POST /me/media/upload-sessions/{id}/complete | UploadComplete |202 Operation -> verifying/ready; unique finalize; hash/size kiểm server |
| Abort | POST /me/media/upload-sessions/{id}/abort | Command |202 cleanup hoặc204 terminal; không tự xóa referenced asset |
| Library | GET /me/media | type?,cursor?,limit? | asset DTO id,type,status,dimensions,duration,createdAt; không raw path/grant dài hạn |
| Media | GET /media/{id} | none | detail + usage, no secret |
| Preview | POST /media/{id}/preview-grants | empty |200 {url,expiresAt}; no-store, allowlist host, owner; URL bản thân là bearer ngắn hạn |
| Delete gated | DELETE /media/{id} | If-Match version |202 operation hoặc409 in use;403 capability disabled |
| Quote | POST /me/video-quotes | VideoQuoteRequest |200 VideoQuote; estimated phải có pricingTerms hợp lệ |
| Generate | POST /me/video-generations | VideoGenerationCreate |202 Operation;410expired,409digest/terms,422entitlement |
| Video | GET /video-generations/{id} | none | id,status,assetId?,quote snapshot,billingStatus,errorCode?,updatedAt; không giả ready |
| Discard | POST /video-generations/{id}/discard | Command |200/202, không hủy charge nếu chưa có policy |
| Posts | GET /me/posts | from,to,status?,cursor?,limit? | items snapshot/state/schedule + nextCursor; bounded range server |
| Post | GET /posts/{id} | none | snapshot,approval,status,version,allowedActions,deliveries summary,updatedAt |
| Return edit | POST /posts/{id}/revision-drafts | commandId,expectedVersion |201 draftId hoặc202; chỉ returned state, snapshot cũ giữ nguyên |
| Goals | GET /me/goals | none | perplatform target,deadline,version; Talent read-only |
| Reports | GET /me/reports | type=daily/weekly,date,cursor? | report snapshots; không gọi AI từ GET |
| Inbox | GET /me/notifications | unread?,cursor?,limit? | Notification items,nextCursor,unreadCount |
| Read | POST /me/notifications/{id}/read; /me/notifications/read-all | empty; read-all {throughCreatedAt} |200 unreadCount; read-all chỉ đến watermark server valid, không mark event mới tới sau |
| Push | POST /me/push-subscriptions | PushSubscriptionBind |200 {deviceBindingId,bindingGeneration,status}; same endpoint không bind hai user |
| Push | GET /me/push-devices; DELETE /me/push-subscriptions/{id} | none | list generic device info;204 deactivate own binding |
| Billing | GET /me/billing | none | T-15: phí tháng, số lần tạo video, phí video, tổng dự kiến, trạng thái thanh toán; không có lịch sử trong app; no card PAN |
| Billing | GET /me/billing/portal-link | none | Đường dẫn ngắn hạn tới trang của GMO để đổi cách thanh toán và xem lịch sử (UC-11 前提) |
| Billing | POST /me/billing/setup-sessions | BillingSetupCreate |201 {id,redirectUrl,expiresAt}; gateway allowlist |
| Billing | GET /me/billing/setup-sessions/{id} | none | pending/verified/failed/expired/unknown; return query không đổi state |
| Profile | GET /me/profile | none | public-to-self profile; OneDrive sync state; no path/token |
| Preferences | PATCH /me/preferences | PreferencesPatch |200 preferences+version; locale không đổi schedule timezone |
| Legal public | GET /legal/{document}/{version} | allowlisted document/version | sanitized document,version,checksum; no remote path injection |
| Operation | GET /operations/{id}; /operations/by-command/{commandId} | none | Operation + result khi terminal, result DTO theo kind;404 nếu chưa nhận/khác owner;404 sau request timeout chưa chứng minh request không tới, phải theo idempotency window |

## Endpoint REUSE bắt buộc

1. Social GET /me/social-connections; POST /me/social-connections/{platform}/attempts body {}; POST /me/social-connections/attempts/{id}/confirm body {returnToken,providerOutcome?,providerPlatform?}. Disconnect/replacement chỉ cờ riêng theo Upload-Post spec.
2. POST /posts/{id}/schedule body {postVersion,scheduledAt,timezone,commandId}; dùng bởi publishing service hoặc UI chỉ sau server plan validation. GET /posts/{id}/deliveries. POST /posts/{id}/reschedule-failed body {failedDeliveryIds,scheduledAt,commandId}. Không tự thêm expectedVersion khi schema hiện tại chưa chấp nhận.
3. GET /talents/{id}/metrics với filter ngày theo Upload-Post spec; server kiểm session là owner. Admin cancellation/publishing-control không là Talent API.
4. Assets: worker chép tệp từ Supabase Storage sang OneDrive qua service OneDrive đã đặc tả; không thêm endpoint public đọc arbitrary driveId/path.

## Ví dụ và invariant không diễn tả hết bằng JSON Schema

Các example trong CONTRACT_EXAMPLES.json là payload nội bộ, không gọi mạng. Schema kiểm dạng dữ liệu; application service vẫn kiểm ownership, state, quote expiry/digest, totalBytes/offset, quota/MIME, platform limit và consent. SSR Supabase cookie là auth adapter, không nhét accessToken vào mọi domain request.

Upload: trình duyệt tải thẳng lên Supabase Storage bằng TUS theo `UploadSession.transport`; objectName do server sinh theo talent_id, policy bucket chỉ cho đúng chủ sở hữu. Complete chỉ enqueue kiểm tra sau khi Supabase báo đủ byte; hash/size kiểm ở server. Không đưa byte lớn qua hàm Vercel (file 18 mục 4, `SCD/EP05/6-3`, câu C2).

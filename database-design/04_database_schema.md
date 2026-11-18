# 04. Schema vật lý

Bản 2.0 · 18/11/2026 · Bước 4. Schema vật lý **là SQL của các migration** trong `apps/api/prisma/migrations/` (đã áp lên Supabase dev). Tài liệu này giữ quy ước, danh sách migration, bảng tổng hợp và đề xuất chờ khách. Định nghĩa đầy đủ từng cột: `05_data_dictionary.md`. Phạm vi được làm và quy tắc khi viết mã: `07_implementation_scope_and_rules.md`. Lệnh migration: `apps/api/PRISMA.md`.

Khối DDL tham khảo của bản 1.0 (25 bảng, trước khi sửa phạm vi) đã bỏ khỏi tài liệu; nó chính là migration `20261117000000_init`, các thay đổi sau đó nằm ở các migration tiếp theo.

## 1. Quy ước

| Mục | Quy ước | Ví dụ |
|---|---|---|
| DB | PostgreSQL 17 trên Supabase. `public`: dữ liệu nghiệp vụ. `app_private`: danh tính, phiên, operation, outbox, giới hạn tần suất (không bao giờ mở ra ngoài). `auth`: do Supabase quản lý, migration không được tạo/sửa/xóa gì trong đó | — |
| Bảng | snake_case, số nhiều | `talents`, `post_deliveries` |
| Cột | snake_case | `scheduled_at` |
| Khóa chính | `id`. UUID (`gen_random_uuid()`) cho dữ liệu nghiệp vụ; `bigint GENERATED ALWAYS AS IDENTITY` cho bảng chỉ thêm, nhiều dòng (nhật ký, ảnh chụp số liệu, tin nhắn) | — |
| Khóa ngoại | `<thực thể>_id`; vai trò khác thì thêm tiền tố: `created_by_manager_id`. Bảo đảm cùng chủ bằng khóa ngoại kép (`id`, `talent_id`) (D-18) | `fk_post_media_media_owner` |
| Tham chiếu tới `auth.users` | Khóa ngoại thật, ON DELETE RESTRICT. Prisma đọc được nhờ khai báo `auth.users` là bảng bên ngoài (preview `externalTables`, `tools/prisma-safe.ts`) | `fk_talents_auth_user_id` |
| Boolean | `is_`, `has_`, `can_` | `is_counted` |
| Thời gian | `timestamptz`; `created_at`, `updated_at` (trigger `set_updated_at`); ngày thuần dùng `date` | — |
| Tiền | `numeric`, không dùng `float` | `ai_usage_events.cost_amount` |
| Tên ràng buộc | `pk_<bảng>`, `fk_<bảng>_<cột>`, `uq_<bảng>_<cột>`, `chk_<bảng>_<ý nghĩa>`, `idx_<bảng>_<cột>` | — |
| Liệt kê | `text` + CHECK (D-16) | — |
| Khóa lạc quan | Cột `version`; trigger bắt mỗi UPDATE tăng đúng 1; dịch vụ vẫn phải `WHERE version = :expected` | `talents`, `posts` |
| Quyền | Mọi bảng bật RLS (trigger sự kiện `evt_enable_rls_on_new_table` tự bật cho bảng mới), không quyền cho `anon`/`authenticated`. BE dùng nhóm `talent_runtime` với GRANT + policy tường minh từng bảng | — |
| Xóa | Không xóa mềm (không có yêu cầu). Dữ liệu tài năng giữ lại khi ngừng ([YK2] §7-3); khóa ngoại tới `talents` là RESTRICT | — |
| Múi giờ | Lưu UTC (`timestamptz`). Các mốc nghiệp vụ theo ngày (chủ đề mỗi sáng, ảnh chụp số liệu) dùng ngày theo giờ Nhật (`Asia/Tokyo`), do tầng dịch vụ tính | Giả định kỹ thuật: [YK2] không nói múi giờ |

Ràng buộc được đánh dấu trong `05`/migration:
- **[NV]**: ràng buộc nghiệp vụ, có mã BR ở `01` §4.
- **[KT]**: ràng buộc kỹ thuật, giữ dữ liệu nhất quán.
- **PROPOSED**: chưa đưa vào schema vì yêu cầu chưa xác nhận hoặc tải thực tế chưa rõ (§4).

## 2. Migration hiện hành

Đã áp lên Supabase dev theo thứ tự (17–18/11/2026). Không sửa migration đã áp; thay đổi bằng migration mới (`07` §5).

| Migration | Nội dung | Còn hiệu lực |
|---|---|---|
| `20261117000000_init` | 25 bảng nghiệp vụ, CHECK, chỉ mục, trigger `updated_at`, trigger chỉ thêm cho 2 bảng nhật ký, RLS + thu hồi quyền, một dòng `system_settings` | Có |
| `20261117000100_lock_prisma_migrations` | Bật RLS, thu hồi quyền ở `_prisma_migrations` | Có |
| `20261117000200_auth_ref_by_trigger` | Bỏ khóa ngoại tới Auth, thay bằng trigger chặn xóa; bỏ quyền mặc định của `anon`/`authenticated`; trigger sự kiện tự bật RLS cho bảng mới | Một phần: trigger sự kiện và quyền mặc định còn; phần Auth bị `000300` thay |
| `20261117000300_confirmed_scope_foundation` | Khôi phục khóa ngoại thật tới `auth.users`; schema `app_private` với `auth_principals`, `auth_session_registry`, `auth_challenges`, `password_lock_state`, `domain_operations`, `outbox_events`; khóa ngoại kép theo chủ; trigger tăng `version`; trigger thu hồi phiên khi vô hiệu/ngừng; chặn ghi các bảng chưa chốt; nhóm `talent_runtime`, `talent_dispatcher` + GRANT/policy | Có |
| `20261118000000_auth_pwa_demo` | `auth_login_identifiers`, `auth_rate_buckets`, `auth_mfa_enrollments`, `push_deliveries`; gắn `push_subscriptions` với phiên (`owner_session_id`); trigger tắt push khi thu hồi phiên; `auth_principals.mfa_enrollment_allowed`; `demo_auth_deliveries` (demo cũ) | Có |
| `20261118000100_technology_demo` | `tech_demo_sessions`, `tech_demo_push_subscriptions` cho demo công nghệ | Có (chỉ demo) |
| `20261118000200_onedrive_delegated_demo` | `tech_demo_onedrive_connections` (một dòng duy nhất `slot='primary'`: kết nối tài khoản Microsoft chính dùng chung cho cả hệ thống, token đã mã hóa), `tech_demo_onedrive_oauth_states` (state + PKCE dùng một lần) cho demo OneDrive | **Chưa áp** lên Supabase dev (đã kiểm trên DB dùng một lần) |

Tổng: 38 bảng (25 ở `public`, 13 ở `app_private`), không tính `_prisma_migrations`.

## 3. Bảng tổng hợp

| Bảng | Khóa chính | Khóa ngoại tới | UNIQUE | CHECK nghiệp vụ | Ước lượng số dòng | Đợt 1 |
|---|---|---|---|---|---|---|
| `managers` | uuid | auth.users, auth_principals (FK kép), managers | auth_user_id | — | ~5 | Làm |
| `talent_applications` | uuid | managers | email | status | ≈ số người gửi đơn | Làm |
| `talents` | uuid | auth.users, auth_principals (FK kép), talent_applications (FK kép: đơn đã duyệt), managers | auth_user_id, application_id, onedrive_folder_id, posting_service_profile_ref | account_type, status, nguồn gốc, ngày sinh, công ty không duyệt | 30 → 1.000 ([YK2] §9-2) | Làm |
| `billing_accounts` | uuid | talents | talent_id, provider_member_ref | — | ≤ số tài năng | Chặn ghi |
| `social_accounts` | uuid | talents | — (P-01) | platform, status | ≈ 3 × tài năng | Chặn ghi |
| `follower_goals` | uuid | talents, managers | (talent_id, platform) | platform | 3 × tài năng | Chặn ghi |
| `coach_messages` | bigint | talents | — | sender | Lớn: hàng chục mỗi tài năng mỗi ngày | Làm |
| `ai_usage_events` | bigint | talents | — | — | Lớn: mỗi lần gọi AI một dòng | Làm |
| `theme_suggestions` | uuid | talents | (talent_id, suggested_on, position) | position 1–3 | 3 × tài năng × ngày | Làm |
| `posts` | uuid | talents, theme_suggestions, posts, managers | — | status, cancel_reason | Vài bản nháp mỗi tài năng mỗi ngày | Chỉ `draft` |
| `post_media` | (post_id, media_asset_id) | posts, media_assets | (post_id, position) | — | ≈ số bài × số tư liệu | Làm |
| `post_approval_decisions` | uuid | posts, managers | — | decision, lý do khi trả lại | Ít (chỉ bài cần duyệt) | Chặn ghi |
| `post_deliveries` | uuid | posts, social_accounts | (post_id, platform) | platform, provider_state | ≤ 3 × số bài đã chấp nhận | Chặn ghi |
| `media_assets` | uuid | talents, managers | onedrive_item_id | kind, source, AI chỉ tạo video | Vài mỗi tài năng mỗi ngày | Làm |
| `video_generations` | uuid | talents, managers, media_assets | idempotency_key, result_media_asset_id | video_type | Theo số lần tạo video | Chặn ghi |
| `video_generation_inputs` | (video_generation_id, media_asset_id) | video_generations, media_assets | (video_generation_id, position) | — | Theo số ảnh nguồn | Chặn ghi |
| `follower_snapshots` | bigint | social_accounts | (social_account_id, captured_on) | — | 3 × tài năng × ngày | Chặn ghi |
| `post_metric_snapshots` | bigint | post_deliveries | (post_delivery_id, captured_on) | — | Theo số bài × số ngày theo dõi (U-09) | Chặn ghi |
| `talent_notifications` | uuid | talents | (talent_id, event_key) | — | Vài mỗi tài năng mỗi ngày | Làm |
| `manager_notifications` | uuid | talents, talent_applications, posts, coach_messages, managers | event_key | — | Theo sự kiện | Chặn ghi |
| `push_subscriptions` | uuid | talents | endpoint | — | ≈ 1–2 × tài năng | Làm |
| `system_settings` | smallint (= 1) | managers | — | — | 1 | Làm |
| `ng_words` | uuid | managers | lower(word) | — | Vài trăm | Làm |
| `manager_view_logs` | bigint | managers, talents | — | screen; chỉ thêm | Theo số lần quản lý xem | Chỉ thêm |
| `activity_logs` | bigint | managers, talents | — | actor_type; chỉ thêm | Lớn | Chỉ thêm |
| `app_private.auth_principals` | auth_user_id | auth.users | (auth_user_id, principal_kind) | principal_kind | = số quản lý + tài năng | Làm |
| `app_private.auth_session_registry` | session_id | auth_principals | (session_id, auth_user_id) | purpose; bất biến nguồn gốc (trigger) | Mỗi lần đăng nhập một dòng | Làm |
| `app_private.auth_challenges` | uuid | auth_session_registry (FK kép) | provider_challenge_id | purpose, state | Mỗi lần xác minh TOTP | Làm |
| `app_private.auth_mfa_enrollments` | session_id | auth_session_registry (FK kép) | auth_user_id, factor_id | state | ≤ số quản lý | Làm |
| `app_private.auth_login_identifiers` | email_hash | auth_principals | auth_user_id | email_hash 64 hex | = số tài khoản | Làm |
| `app_private.password_lock_state` | auth_user_id | auth_principals | — | số lần ≥ 0 | ≤ số tài khoản | Làm |
| `app_private.auth_rate_buckets` | bucket_key | — | — | count > 0 | Theo khóa đang hoạt động | Làm |
| `app_private.domain_operations` | uuid | auth_principals, talent_applications, talents, talent_notifications (FK kép) | operation_key; một lệnh tạo tài khoản mỗi đơn | kind, state, version | Theo số lệnh | Làm |
| `app_private.outbox_events` | uuid | domain_operations | (operation_id, generation, event_type) | state, lease | Theo số lệnh | Làm |
| `app_private.push_deliveries` | uuid | outbox_events, push_subscriptions | (event_id, subscription_id) | state, attempts 0–3 | Số thông báo × số máy | Làm (cần worker) |
| `app_private.tech_demo_sessions`, `tech_demo_push_subscriptions`, `demo_auth_deliveries` | — | — | — | — | Chỉ demo | Không dùng |

Chi tiết từng cột, ràng buộc, chỉ mục, trigger và quyền runtime: `05_data_dictionary.md`. "Chặn ghi", "Chỉ `draft`": xem `07` §3.

## 4. Đề xuất chưa đưa vào schema chính thức (PROPOSED)

| Mã | Đề xuất | Lý do chưa đưa vào | Khi nào đưa vào |
|---|---|---|---|
| P-01 | UNIQUE (`talent_id`, `platform`) trên tài khoản đang kết nối | U-05: **đã chốt** một tài khoản mỗi mạng ([KS] 確認10) | [QA] No.23 đóng theo "một tài khoản" |
| P-02 | CHECK độ dài tin nhắn của tài năng ≤ 1.000 ký tự | Con số §6 là giả định (R03-02) | Khi chốt trên màn hình |
| P-03 | Cột đơn giá lúc yêu cầu ở `video_generations` | U-02 | [QA] No.2, No.62 đóng |
| P-04 | Giới hạn định dạng, dung lượng tư liệu; số tư liệu mỗi bài; số ảnh mỗi loại video | UNKNOWN (R05-04) | Khi chốt S05-01, S05-07 |
| P-05 | Giá trị `skipped` cho `post_deliveries.provider_state` | U-06 | Khi thiết kế lại luồng đăng (`07` §3) |
| P-06 | Lý do hủy `returned`, trạng thái "giữ lại khi đang dừng" | U-03, U-04 ([QA] No.51, No.58, No.60) | Khi các câu này đóng và thiết kế lại luồng đăng (`07` §3) |
| P-07 | Chỉ mục trigram trên `talents.display_name` cho tìm theo tên | R02-05 cần tìm theo tên; với ≤ 1.000 dòng, quét tuần tự vẫn nhanh | Khi số tài năng vượt vài nghìn |
| ~~P-08~~ | Khóa ngoại kép để DB tự đảm bảo cùng tài năng | **Đã làm** ở migration `20261117000300` (thêm `talent_id` vào bảng con, BR-21) | — |
| P-09 | Chia bảng theo tháng (partition) cho `coach_messages`, `ai_usage_events`, `activity_logs`, `post_metric_snapshots` | Tải thực tế chưa rõ; thời gian giữ dữ liệu chưa chốt (U-09) | Khi có số liệu tải và chính sách giữ dữ liệu |
| P-11 | `approval_round` ở `posts` và `post_approval_decisions`, UNIQUE (`post_id`, `approval_round`) | Chỉ cần nếu [QA] No.58 chốt "gửi duyệt lại là cùng bài" (U-03) | Khi [QA] No.58 đóng theo hướng đó |
| P-12 | Cách đăng: `talents.posting_mode` (`auto` / `confirm`), bảng khoảng đăng tự động (tài năng, chủ đề, ngày bắt đầu, ngày kết thúc, trạng thái, `version`), `posts.auto_post_period_id`; sửa CHECK `chk_posts_adopted` để bài tự động không cần `adopted_at`; tư liệu gắn với khoảng | [KS] 確認19, 25; chi tiết chờ U-16 (Q&A No.70, 71, 77) | Khi khách chốt luồng 自動投稿 |
| P-13 | Giới hạn nhờ AI viết lại 2 lần: đếm theo chuỗi `revised_from_post_id` ở dịch vụ, hoặc cột `rewrite_count` + CHECK ≤ 2 | [KS] 確認29 | Làm được ngay (`posts` đang ghi được ở `draft`) |
| P-14 | `system_settings`: thêm giờ khung trưa và khung tối | [KS] 確認18; giờ chờ Q&A No.73 (đề xuất 8, 12, 20 giờ) | Khi có giờ |
| P-15 | Nhóm tài năng: bảng nhóm (tên, màu, thứ tự), bảng nối tài năng – nhóm (N–N); quản lý phụ trách theo nhóm (bảng nối nhóm – quản lý) và/hoặc theo từng tài năng | [KS] 確認47, 34. Chưa rõ: cách nào (theo nhóm hay theo quản lý phụ trách từng tài năng) và khi chưa có người phụ trách thì gửi ai: chờ Q&A No.6; AMCOLAB đề xuất lấy quản lý phụ trách từng tài năng làm cơ bản (có trong báo giá No.42, 前提条件A9) | Thiết kế trước khi làm M-10 (thiết kế khách) / M-13 ([AG]) |
| P-16 | Gửi yêu cầu duyệt đúng người: bảng người nhận của thông báo quản lý (thông báo – quản lý), vì `manager_notifications` hiện dùng chung cho mọi quản lý | [KS] 確認34; U-10 | Cùng lúc mở luồng duyệt (EP06) |
| P-17 | Chỉ thị cho AI: bảng chỉ thị (phạm vi `global` / `category` / `talent`, nhóm hoặc tài năng, nội dung, phiên bản, đang dùng, người tạo) để thử, lưu, quay lại bản cũ. Thử thách: bảng thử thách (tài năng, nội dung, hạn, số lần, người đề xuất `ai` / `manager`, trạng thái `proposed` / `accepted` / `declined` / `completed` / `expired`) | [KS] 確認5, 6, 7, 8; Q&A No.72 (AMCOLAB đề xuất thử thách chỉ tính được khi đếm bằng số: ngày đăng liên tục, số bài, số người theo dõi tăng; trạng thái đề xuất / nhận / từ chối / đang làm / đạt / hết hạn; mỗi lúc một thử thách) | Chỉ thị: thiết kế ngay; thử thách: chờ khái niệm và No.72 |
| P-18 | Tài năng đã ngừng: trigger chặn `talents.status` đổi từ `ended`; việc định kỳ xóa dữ liệu khi `status = 'ended'` và `status_changed_at` quá 6 tháng (phải quyết xóa hẳn hay ẩn danh với FK RESTRICT và bảng nhật ký chỉ ghi thêm) | [KS] 確認55, 56; U-09; Q&A No.69 (phạm vi xóa, đăng ký lại trong 6 tháng) | Trigger: làm được ngay. Việc xóa: thiết kế cùng U-09 sau No.69 |
| P-19 | Quản lý làm thay chỉ cho tài khoản công ty: trigger kiểm `media_assets.uploaded_by_manager_id IS NOT NULL` thì tài năng phải có `account_type = 'office'` (tương tự cho lần tạo video do quản lý gửi) | [KS] 確認27 | Làm được ngay cho `media_assets` |
| P-20 | OneDrive: `app_private.onedrive_items`, `media_assets.sha256`, `media_assets.temp_deleted_at`, loại lệnh `storage.provision` | `agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md` §4 | Khi làm tích hợp OneDrive |
| P-10 | Mã hóa ở tầng ứng dụng cho `push_subscriptions.p256dh_key`, `auth_secret` | [YK2] §10-2 yêu cầu mã hóa dữ liệu lưu; Supabase đã mã hóa ổ đĩa. Mã hóa thêm ở ứng dụng là lựa chọn | Khi đánh giá bảo mật yêu cầu |

# 04. Schema vật lý

> **Cập nhật quyết định 25/11/2026:** Đã đồng bộ nhóm quyết định đã rõ vào nội dung tài liệu. Phân biệt yêu cầu nguồn, SQL hiện có và thiết kế đích chưa có migration. Cấu trúc repository: 13 migration/53 bảng ứng dụng; chưa kiểm DB live. Các ghi chú ngày 18/11 và 23/11 giữ vai trò lịch sử ở phần đã được thay. [Hồ sơ thay đổi](decisions-update-2026-11-25.json); [review và phần còn thiếu](08_full_review_2026-11-25.md).

> **Rà soát 23/11/2026:** Đối chiếu QA/KS hiện hành và bộ `23112026`; xem [kết quả tác động DB](06_extensibility_review.md) và [danh mục nguồn](../TAI_LIEU_NGUON.md). Tách schema trong repository, quyết định nguồn và đề xuất thiết kế. Lần rà này chỉ cập nhật tài liệu, chưa áp migration hoặc kiểm tra database đang chạy; không cấp phê duyệt nghiệp vụ, thương mại hay release.

Bản 2.0 · 18/11/2026 · Bước 4. Schema vật lý **là SQL của các migration** trong `apps/api/prisma/migrations/` (sự thật cấu trúc trong repository; trạng thái áp hiện tại chưa xác minh). Tài liệu này giữ quy ước, danh sách migration, bảng tổng hợp và đề xuất chờ khách. Định nghĩa đầy đủ từng cột: `05_data_dictionary.md`. Phạm vi được làm và quy tắc khi viết mã: `07_implementation_scope_and_rules.md`. Lệnh migration: `apps/api/PRISMA.md`.

Khối DDL tham khảo của bản 1.0 (25 bảng, trước khi sửa phạm vi) đã bỏ khỏi tài liệu; nó chính là migration `20261117000000_init`, các thay đổi sau đó nằm ở các migration tiếp theo.

## 1. Quy ước

| Mục | Quy ước | Ví dụ |
|---|---|---|
| DB | PostgreSQL 17 trên Supabase. `public`: dữ liệu nghiệp vụ. `app_private`: danh tính, phiên, runtime và nghiệp vụ agent cần bảo vệ; không mở trực tiếp ra ngoài. `auth`: do Supabase quản lý, migration không được tạo/sửa/xóa gì trong đó | — |
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

Danh sách 13 migration trong repository; trạng thái áp hiện tại chưa kiểm. Cột hiệu lực mô tả quan hệ giữa các file; thông tin áp dev bên dưới là ghi chép lịch sử 18/11, chưa kiểm lại ngày 23/11. Không sửa migration đã áp; thay đổi bằng migration mới (`07` §5).

| Migration | Nội dung | Còn hiệu lực |
|---|---|---|
| `20261117000000_init` | 25 bảng nghiệp vụ, CHECK, chỉ mục, trigger `updated_at`, trigger chỉ thêm cho 2 bảng nhật ký, RLS + thu hồi quyền, một dòng `system_settings` | Có |
| `20261117000100_lock_prisma_migrations` | Bật RLS, thu hồi quyền ở `_prisma_migrations` | Có |
| `20261117000200_auth_ref_by_trigger` | Bỏ khóa ngoại tới Auth, thay bằng trigger chặn xóa; bỏ quyền mặc định của `anon`/`authenticated`; trigger sự kiện tự bật RLS cho bảng mới | Một phần: trigger sự kiện và quyền mặc định còn; phần Auth bị `000300` thay |
| `20261117000300_confirmed_scope_foundation` | Khôi phục khóa ngoại thật tới `auth.users`; schema `app_private` với `auth_principals`, `auth_session_registry`, `auth_challenges`, `password_lock_state`, `domain_operations`, `outbox_events`; khóa ngoại kép theo chủ; trigger tăng `version`; trigger thu hồi phiên khi vô hiệu/ngừng; chặn ghi các bảng chưa chốt; nhóm `talent_runtime`, `talent_dispatcher` + GRANT/policy | Có |
| `20261118000000_auth_pwa_demo` | `auth_login_identifiers`, `auth_rate_buckets`, `auth_mfa_enrollments`, `push_deliveries`; gắn `push_subscriptions` với phiên (`owner_session_id`); trigger tắt push khi thu hồi phiên; `auth_principals.mfa_enrollment_allowed`; `demo_auth_deliveries` (demo cũ) | Có |
| `20261118000100_technology_demo` | `tech_demo_sessions`, `tech_demo_push_subscriptions` cho demo công nghệ | Có (chỉ demo) |
| `20261118000200_onedrive_delegated_demo` | `tech_demo_onedrive_connections` (một dòng duy nhất `slot='primary'`: kết nối tài khoản Microsoft chính dùng chung cho cả hệ thống, token đã mã hóa), `tech_demo_onedrive_oauth_states` (state + PKCE dùng một lần) cho demo OneDrive | Ghi chép18/11: chưa áp dev; trạng thái hiện tại chưa kiểm |
| `20261123000000_ai_core_executions` | Execution/attempt, dispatch metadata outbox và usage legacy theo attempt | Có trong SQL; chưa kiểm live |
| `20261123000100_ai_core_daily_themes` | Task daily themes và constraint task/input | Có trong SQL |
| `20261123000200_ai_core_read_follower_goals` | Runtime SELECT follower_goals; trigger chặn ghi vẫn giữ | Có trong SQL |
| `20261123000300_ai_daily_trends` | Cache xu hướng theo ngày | Có trong SQL |
| `20261123000400_ai_core_demo_reset_grant` | Quyền DELETE cho reset demo cũ | DELETE bị migration 25/11 thu hồi |
| `20261125000000_agent_core` |10 bảng agent, mở execution/attempt, profile export và ACL; thu hồi DELETE demo | Có trong working tree; chưa replay/live verify |

Tổng cấu trúc dự kiến sau 13 file:53 bảng (25 `public`,28 `app_private`), không tính `_prisma_migrations` và bảng Auth bên ngoài. Từ điển 05 là snapshot catalog cũ 38 bảng, không phải kết quả kiểm database hiện tại.

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
| P-01 | UNIQUE có điều kiện cho tài khoản đang kết nối theo (`talent_id`, `platform`) | Một tài khoản mỗi SNS đã có quyết định [KS] 確認10; không tiếp tục chờ chốt số lượng | Khi thiết kế reconnect/disconnect và xử lý dữ liệu trùng; không tự gỡ trigger chặn ghi |
| P-02 | CHECK độ dài tin nhắn của tài năng ≤ 1.000 ký tự | Con số §6 là giả định (R03-02) | Khi chốt trên màn hình |
| P-03 | Snapshot giá/consent/usage/charge ledger theo09 §8 và10 | Nơi đặt giá ước tính đã rõ; hiệu lực giá thực/adjustment cònQA62 | Thiết kế được ngay; chỉ mở billable writer khi policy/provider proof đủ |
| P-04 | Giới hạn định dạng, dung lượng tư liệu; số tư liệu mỗi bài; số ảnh mỗi loại video | UNKNOWN (R05-04) | Khi chốt S 05-01, S 05-07 |
| P-05 | Giá trị `skipped` cho `post_deliveries.provider_state` | U-06 | Khi thiết kế lại luồng đăng (`07` §3) |
| P-06 | Lý do hủy `returned`, trạng thái "giữ lại khi đang dừng" | U-03, U-04 ([QA] No.51, No.58, No.60) | Khi các câu này đóng và thiết kế lại luồng đăng (`07` §3) |
| P-07 | Chỉ mục trigram trên `talents.display_name` cho tìm theo tên | R02-05 cần tìm theo tên; với ≤ 1.000 dòng, quét tuần tự vẫn nhanh | Khi số tài năng vượt vài nghìn |
| ~~P-08~~ | Khóa ngoại kép để DB tự đảm bảo cùng tài năng | **Đã làm** ở migration `20261117000300` (thêm `talent_id` vào bảng con, BR-21) | — |
| P-09 | Chia bảng theo tháng (partition) cho `coach_messages`, `ai_usage_events`, `activity_logs`, `post_metric_snapshots` | Tải thực tế chưa rõ; thời gian giữ dữ liệu chưa chốt (U-09) | Khi có số liệu tải và chính sách giữ dữ liệu |
| P-11 | `approval_round` ở `posts` và `post_approval_decisions`, UNIQUE (`post_id`, `approval_round`) | Chỉ cần nếu [QA] No.58 chốt "gửi duyệt lại là cùng bài" (U-03) | Khi [QA] No.58 đóng theo hướng đó |
| P-12 | Tách preference confirm/no-confirm khỏi period autopost; daily/autopost có thể cùng dùng. Period có theme/version/start/end/media set; post nối period; adoption gate theo preference | YK3 P247/P436–457/P545; KS確認19/25; nhánh QA70/83 còn mở | Đội thiết kế theo §5; rút enum auto/confirm gộp hai trục. Không chờ hỏi lại luồng NG đã rõ |
| P-13 | **RÚT đề xuất giới hạn 2 lần**; không tạo rewrite_count/CHECK giới hạn | KS `確認事項!K65`20/11 và DEC-0001 xác định không giới hạn | Không có migration giới hạn 2 lần trong repository để DROP; revision/audit là nhu cầu khác P-23 |
| P-14 | `system_settings`: thêm giờ khung trưa và khung tối | [KS] 確認18; giờ chờ Q&A No.73 (đề xuất 8, 12, 20 giờ) | Khi có giờ |
| P-15 | Nhóm và membership; phân công Manager theo Talent cho yêu cầu duyệt | KS K77/K93 đã rõ nơi nhận duyệt; No.87/88 còn vận hành phân công, No.99 còn ưu tiên đa nhóm | Thiết kế cardinality, hiệu lực và thay người; không dùng nhóm Manager làm hàng rào quyền xem |
| P-16 | Người nhận thông báo; tách trạng thái read/handled khi chính sách được chốt | Yêu cầu duyệt tới người phụ trách từng Talent; các thông báo khác No.87/88, đọc/xử lý No.97 còn mở | Trước mở notification Manager/EP06; giữ lịch sử người nhận, không suy từ assignment hiện tại cho mọi sự kiện cũ |
| P-17 | Profile/instruction/history đã có SQL 25/11; bổ sung category, Challenge/progress/memory trong DB và export refs | KS K27 và F30/F31: mẫu không là danh mục đóng. Bộ trạng thái, mỗi lúc một thử thách và tiêu chí đếm là đề xuất chưa chốt | Thiết kế ranh giới nội dung/trạng thái, precedence No.99, version/audit; không tự chốt enum dự phòng |
| P-18 | Tài năng đã ngừng: trigger chặn `talents.status` đổi từ `ended`; việc định kỳ xóa dữ liệu khi `status = 'ended'` và `status_changed_at` quá 6 tháng (phải quyết xóa hẳn hay ẩn danh với FK RESTRICT và bảng nhật ký chỉ ghi thêm) | [KS] 確認55, 56; U-09; Q&A No.69 (phạm vi xóa, đăng ký lại trong 6 tháng) | Chưa triển khai trong đợt tài liệu. Kiểm cơ chế ended hiện có và thiết kế retention theo No.69/94/98, quyền/FK/log trước migration |
| P-19 | Rút đề xuất trigger office-only cho gửi media/tạo video thay Talent | YK3 P305; QA追加要件 CR02 hiện hành | Đội giữ actor và subject, kiểm quyền riêng cho adopt/đăng/duyệt; không thêm hạn chế cũ từ KS27 |
| P-20 | OneDrive: `app_private.onedrive_items`, `media_assets.sha256`, `media_assets.temp_deleted_at`, loại lệnh `storage.provision` | `agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md` §4 | Khi làm tích hợp OneDrive |
| P-10 | Mã hóa ở tầng ứng dụng cho `push_subscriptions.p256dh_key`, `auth_secret` | [YK2] §10-2 yêu cầu mã hóa dữ liệu lưu; Supabase đã mã hóa ổ đĩa. Mã hóa thêm ở ứng dụng là lựa chọn | Khi đánh giá bảo mật yêu cầu |

### Bổ sung thiết kế sau đợt 23/11 — chưa có DDL

| Mã | Đề xuất nội bộ cần đánh giá | Nguồn / giới hạn |
|---|---|---|
| P-21 | Mở rộng trạng thái Talent cho 一時停止; lịch sử hiệu lực và actor, tách khỏi autopost pause | KS K116/F32; vẫn thu phí. Tên token SQL, login, quyền chuyển và xử lý lịch đang chờ là thiết kế chưa chốt; cần kiểm dữ liệu, trigger thu hồi phiên và mọi reader trước migration |
| P-22 | Hủy lịch bởi Talent/Manager: xác minh chủ từ phiên, ghi actor/reason/operation, xử lý optimistic version và hủy provider bất đồng bộ | KS K84/F12. Không dùng cancel_reason hiện có để thay danh tính actor; callback trễ không được phục hồi lịch đã hủy |
| P-23 | Revision/review/plan/effect được thiết kế chi tiết tại09–10; từng đích SNS, từng transport observation | KS20261122 G4:I4/G20:H20 đã thay đề nghị22/11: AI sửaNG không duyệt lại, TikTok direct. Phần QA58/59/95/96 còn mở giữ đúng nhánh; chưa có migration |
| P-24 | Tham chiếu tài sản theo nơi lưu, ownership, version/readiness; ảnh chân dung và URL Adesso | QA No.8 G9/H 9; UI-M20 p 27. Không lưu public URL vĩnh viễn thay quyền; không tự fetch URL nhập vào. Chưa chốt field bắt buộc hay nơi lưu hồ sơ |
| P-25 | Không tạo bảng đồng ý phụ huynh; ranking/voice ngoài phase; so sánh liên Talent/KPI giữ đề nghị riêng | UI-M20 p 28–29; ISS22-P p 5–6/p 8–10; FND-0051/0052/0053. Cần quyết định phạm vi, quyền, mục đích dùng và retention; không dùng JSON tùy ý để né quyết định |
| P-26 | AI sửa NG rồi đặt lịch không Talent xác nhận lại; ghi phiên bản bộ NG và kết quả theo revision | QA No.96; KS K59. Hiệu lực thay đổi NG lên lịch cũ chưa chốt; không tự kiểm lại hoặc hủy toàn bộ lịch |

P-12 cần cập nhật theo KS K73/F18/F19: media có trước, chọn theo chủ đề, không FIFO hoặc tự sinh media AI; quan hệ khoảng đăng–media là thiết kế nội bộ. P-18 không cho phép tùy ý xóa/ẩn danh nhật ký: phạm vi Talent/office, ngoại lệ công nợ, bản sao và dữ liệu provider phải đối chiếu No.69/94/98 trước thiết kế dọn. P-20 là tích hợp nghiệp vụ dự kiến, khác hai bảng OneDrive demo đã có migration.

## 5. Thiết kế đích theo các quyết định đã rõ 25/11

Các trường/quan hệ sau là **PROPOSAL nội bộ, chưa có migration** trừ nơi ghi SQL hiện có. Khách đã quyết hành vi không có nghĩa SQL đã tồn tại; đội có trách nhiệm hoàn thiện DDL, không chờ khách chọn tên bảng/kiểu cột. Không dùng đoạn này thay 05/các migration để truy vấn DB hiện tại.

| Quyết định và nguồn | Mapping hiện có | Thiết kế đích cần triển khai |
|---|---|---|
| Agent/DB/backup, QA G101:H 101 |13 bảng AI tại 02 §8; operation/outbox dùng tiếp | Hoàn thiện invariant/checkpoint/ACL, context manifest và usage theo từng model call. Không tạo hệ queue nghiệp vụ thứ hai; backup policy/restore do đội thiết kế |
| Profile và instruction version, YK3 P728–744/QA101 | `agent_talent_profiles`, versions, instructions, versions, exports | DB authoritative; OneDrive export có version/receipt. Category catalog/membership N:N và scope refs còn thiếu; không mở category khi chưa có toàn vẹn tham chiếu |
| Challenge/progress, QA101/YK3 P296/P709–722 | Chưa có bảng | Instance theo Talent với nội dung/mục tiêu/period revision; quyết định nhận/từ chối; progress event có nguồn và khóa chống cộng trùng; completion/praise receipt. Model quyết theo instruction; enum/scoring là thiết kế cần review, không bịa quy tắc khách |
| Tạm dừng vẫn thu phí, YK3 P661/P667 | `talents.status` còn 3 giá trị; pause đăng là cờ riêng | Đề xuất token `paused`; status history có actor/effective time/version. Giữ eligibility phí tháng khi paused, dừng lời nhắc. Không suy login bị khóa hoặc schedule bị hủy nếu nhánh đó chưa rõ; không gộp với ended/delinquency |
| Giờ riêng từng SNS, KS20261122 G16:I 16/YK3 P250 | `posts.scheduled_at` chưa đủ; delivery hiện mỗi bài/mạng | Plan theo delivery/platform có planned_at, version, context/instruction refs; actor agent lưu plan, worker thực thi qua outbox. Đích ảnh IG/TikTok, video 3 SNS; attempts/effects và cancel ack theo từng đích |
| Review preference và autopost, YK3 P247/P436/P545 | Chưa có preference/period canonical | Preference confirm/no-confirm có version; period start/end/theme revision và media set; posts nối period nullable. Hai trục riêng, không một enum auto/confirm; autopost/office không thêm Manager approval |
| NG, KS20261122 G4:I 4 | `ng_words` và timestamp bài | Rule revision/check result theo post content revision, AI rewrite lineage. Không thêm Talent re-confirm hoặc Manager editor. Không tự quyết vòng sửa lỗi, deadline hay tác động NG mới lên lịch cũ (QA96) |
| Square, KS action No.16/G17 | `billing_accounts.provider_member_ref` | Provider adapter/ref và billing-cycle/charge/payment/adjustment ledger; không lưu thẻ. Đội kiểm capability Square, không tự gán supporting-carrier=true hoặc auto-lock sau nợ |
| Không lưu đồng ý phụ huynh, KS20261122 G18:H 18 | Không có bảng | Tiếp tục không lưu liên hệ/consent phụ huynh; điều khoản app ghi riêng theo R01-04 |
| Điều khoản app, YK3 P116/P148 | Chưa có cột | Consent time +terms version/hash/ref trên application hoặc record liên kết; nơi mở điều khoản còn確認57, không chặn thiết kế dữ liệu consent |
| Catalog thông báo YK3 phụ lục B | Inbox/push có; recipient/email chưa đủ |16 trigger: kết quả đơn/email; đơn mới; activation; media reminder; approval request/queue; approval/return; quá hạn duyệt; publish success/failure; video success/failure; SNS disconnect; payment unconfirmed; không đăng nhiều ngày; goal achieved; period ended/chat. Bỏ severe-consultation alert; read/handled còn QA97 |
| Giá video ước tính, YK3 P803–809 | `system_settings` chưa có giá video | Cài đặt giá ước tính với currency/version và actor; request chụp disclosure/consent refs. Giá thực thu/đổi giá/điều chỉnh kỳ vẫn No.62; không lấy setting hiện tại tính lại quá khứ |

Không thêm bảng ranking, voice hoặc đồng ý phụ huynh để đón đầu đề nghị 22/11. TikTok dùng hướng direct Upload-Post theo KS20261122 G20:H 20; không thiết kế inbox thành baseline. Năng lực/điều khoản provider cần kiểm riêng.

## 6. Phương án kỹ thuật chi tiết

[09](09_technical_design.md) chốt phương án đề xuất cho nhóm đội/provider; [10](10_target_data_dictionary.md) có bảng/cột/kiểu/null/FK/index; [contract JSON](technical-design-contracts-2026-11-25.json) là bản máy đọc cùng nội dung. Những hướng P-01/P-03/P-11/P-12/P-15–P-18/P-20–P-26 được chi tiết hóa tại đó; không chờ khách chọn cấu trúc bảng. Chỉ giữ mở chính sách thuộc đúngQA và năng lực provider chưa kiểm. Đây chưa là SQL migration.

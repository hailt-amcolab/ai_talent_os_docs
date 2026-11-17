# 07. Review thiết kế cơ sở dữ liệu

Bản 1.0 · 17/11/2026 · Bước 7. Review bộ `01`–`06`. SQL ở `04` **chưa được chạy thử** trên DB nào (đề bài không cho chạy SQL); cú pháp và ràng buộc mới được kiểm bằng mắt.

## 1. Kết quả theo 10 tiêu chí

| # | Tiêu chí | Kết quả | Ghi chú |
|---|---|---|---|
| 1 | Phủ yêu cầu | Đạt cho phần CONFIRMED | Mọi yêu cầu CONFIRMED có dữ liệu cần lưu đều có bảng hoặc cột (ma trận ở `01` §3). Phần không lưu DB (OneDrive, Supabase Auth, công ty thanh toán) ghi rõ ở `02` §1 |
| 2 | Toàn vẹn dữ liệu | Đạt, còn 2 điểm kiểm ở tầng dịch vụ | M-01, M-02 ở §2 |
| 3 | Chuẩn hóa | 3NF, 3 ngoại lệ có lý do | Mảng hashtag (D-07), JSONB số liệu (D-08), tham chiếu mềm của nhật ký (D-11) |
| 4 | Quy ước đặt tên | Đạt | Bảng số nhiều, snake_case, `id`, `<thực thể>_id`, `is_`, `created_at`/`updated_at`, `idx_`, `uq_` |
| 5 | Kiểu dữ liệu | Đạt | UUID và bigint identity; `timestamptz`; `numeric` cho tiền; JSONB chỉ ở hai chỗ có lý do |
| 6 | Quan hệ | Đạt | Không có chu trình bắt buộc; N:N qua bảng nối; xóa tài năng bị chặn (RESTRICT) đúng theo [YK2] §7-3 |
| 7 | Ràng buộc | Đạt | Ràng buộc nghiệp vụ chỉ lấy từ CONFIRMED và có mã BR; con số giả định của [YK2] §6 để ở PROPOSED |
| 8 | Chỉ mục | Đạt cho truy vấn đã biết | Chỉ mục cho khóa ngoại, các bộ lọc ở [YK2] §6-2 7-6, §6-4 7-1, §6-10 7-2, §6-12 7-4, và các việc nền. Chỉ mục theo tải chưa rõ để ở PROPOSED (P-07, P-09) |
| 9 | Dễ bảo trì | Đạt | 25 bảng, mỗi bảng một thực thể; không có bảng dự phòng |
| 10 | Dễ mở rộng | Đạt, một rủi ro cao | R02-04 (mục tiêu tổng 3 mạng) ở `06` §2 |

## 2. Danh sách vấn đề

| Mã | Mức | Vấn đề | Đề xuất |
|---|---|---|---|
| H-01 | HIGH | **Hóa đơn tháng chưa thiết kế được** (U-01). Thu phí là chức năng ưu tiên 高 (cao, [YK2] §6-3 1-1) | Hỏi gấp [QA] No.4, No.49, No.53. Phần đếm lượt tạo video đã sẵn sàng nên không chặn EP05 |
| H-02 | HIGH | Mục tiêu theo từng mạng có thể bị đổi thành mục tiêu tổng (R02-04); đổi muộn thì phải chuyển dữ liệu | Chốt trước khi làm 2-4, 3-10 (cột Comment của [QA] No.14) |
| M-01 | MEDIUM | Tài khoản công ty không được có đăng ký thanh toán: CHECK không nhìn được bảng khác | Kiểm ở tầng dịch vụ, có kiểm thử. Có thể thêm trigger nếu cần |
| M-02 | MEDIUM | Tư liệu gắn vào bài, ảnh nguồn của video, tài khoản đăng phải cùng tài năng với bài: khóa ngoại đơn không chặn được | Kiểm ở tầng dịch vụ trong cùng giao dịch; P-08 nếu muốn DB tự chặn |
| M-03 | HIGH → đã có quy tắc tạm | Cách tính trạng thái chung `posts.status` khi một mạng lỗi, hai mạng thành công | Quy tắc tạm ở `03` §5 (IR-02); chờ [QA] No.51 để chốt |
| M-04 | MEDIUM | "Đã xử lý" của thông báo quản lý đang dùng chung (U-10) | Chờ S09-02; đổi sang theo từng quản lý là rủi ro trung bình (`06` §2) |
| M-05 | MEDIUM | Danh sách loại thông báo mâu thuẫn giữa 別紙A và các chức năng (R09-04) | Không đặt CHECK; chốt danh sách theo A6 ở file 15 |
| L-01 | LOW | Tìm tài năng theo tên chưa có chỉ mục riêng | Đủ với ≤ 1.000 dòng; P-07 khi lớn hơn |
| L-02 | LOW | Bảng lịch sử tăng nhanh (tin nhắn, nhật ký, số liệu) | Chờ chính sách giữ dữ liệu (U-09); P-09 |
| L-03 | LOW | Múi giờ của các mốc theo ngày là giả định kỹ thuật (giờ Nhật) | Ghi vào đặc tả; [YK2] không nói |
| L-04 | LOW | Khóa Web Push lưu dạng chữ thường | Supabase đã mã hóa ổ đĩa; P-10 nếu đánh giá bảo mật yêu cầu |

Không có vấn đề mức CRITICAL.

## 3. Giao dịch và đồng thời (chỉ các nghiệp vụ đã xác nhận)

| Nghiệp vụ | Yêu cầu | Cách đảm bảo |
|---|---|---|
| Duyệt hoặc từ chối đơn: quản lý nào bấm trước thì thắng | R01-01, R06-06 | UPDATE có điều kiện `status = 'pending' AND version = :v`; 0 dòng thì báo đã có người xử lý. Tạo người dùng Auth là gọi ra ngoài, không nằm trong giao dịch DB: làm theo kiểu saga (từng bước, đối soát được) như [SUPA] |
| Chấp nhận bài: kiểm tư liệu, kiểm từ cấm, gửi duyệt hoặc hẹn giờ, tạo thông báo | R04-05〜R04-07 | Một giao dịch; khóa lạc quan theo `posts.version` |
| Duyệt hoặc trả lại bài: người bấm trước thắng | R06-05, R06-06 | UPDATE `posts` có điều kiện `status = 'awaiting_approval' AND version = :v`, rồi thêm dòng `post_approval_decisions`, cùng giao dịch |
| Dừng đăng tự động (toàn bộ, theo tài năng); chuyển tài năng sang 利用終了 | R06-12, R01-12 | Đặt cờ dừng (hoặc trạng thái 利用終了) trước, trong một giao dịch ngắn. Sau đó hủy bài theo lô: khóa theo thứ tự `id` (`SELECT … ORDER BY id FOR UPDATE`) để tránh deadlock; chuyển bài sang `cancelled` và từng mạng đã gửi lịch sang `cancel_requested`. Việc nền gọi Upload-Post, ghi `cancelled` hoặc `cancel_failed` theo từng mạng; `cancel_failed` thì báo quản lý. Việc nền gửi bài dùng `FOR UPDATE SKIP LOCKED` và kiểm lại cờ dừng ngay trước khi gửi (IR-01, IR-10) |
| Đếm lượt tạo video | R05-07 | `idempotency_key` duy nhất: bấm lặp không thành hai lượt; `is_counted` đổi về false chỉ khi dịch vụ tạo video báo lỗi |
| Thông báo không tạo trùng; nhắc gửi tư liệu 1 lần mỗi ngày | R09-01, R09-02, BR-19 | UNIQUE `event_key` |
| Tạo tài năng hoặc tài khoản công ty | R02-03 | Cùng giao dịch tạo luôn 3 dòng `follower_goals` mặc định (IR-13) |
| Đạt mục tiêu chỉ báo một lần | R03-07 | UPDATE `follower_goals SET achieved_at = now() WHERE achieved_at IS NULL`; chỉ báo khi cập nhật được 1 dòng |
| Ghi nhật ký xem trước khi trả dữ liệu | R01-14 | Thêm dòng `manager_view_logs` trước khi trả dữ liệu; không ghi được thì không trả dữ liệu (theo [SUPA]) |

## 4. Bảo mật và nhật ký

| Mục | Cách làm | Căn cứ |
|---|---|---|
| Dữ liệu nhạy cảm | Ngày sinh, email (ở Auth), hội thoại, khóa Web Push. Không có thông tin thẻ, mật khẩu, mã TOTP trong bảng ứng dụng | [YK2] §7-2, §10-2, BR-16 |
| Quyền truy cập | Mọi bảng bật RLS và thu hồi quyền `anon`, `authenticated`; chỉ BE truy cập. Tài năng chỉ thấy dữ liệu của mình: BE lọc theo `talent_id` lấy từ phiên đăng nhập | [YK2] §3-2, §10-1, R10-08 |
| Nhật ký | Xem (`manager_view_logs`), thao tác và xử lý (`activity_logs`); cả hai chỉ thêm, có trigger chặn sửa và xóa | [YK2] §9-4, BR-14 |
| Xóa mềm | Không dùng: [YK2] không yêu cầu; ngừng sử dụng là đổi trạng thái | [YK2] §6-2 7-3 |
| Giữ dữ liệu | Chưa có con số; thêm việc dọn theo lịch khi chốt | U-09, 確認55 |

## 5. Trạng thái từng module

| Module | Trạng thái | Đã thiết kế | Còn thiếu |
|---|---|---|---|
| EP01 Danh tính và quyền | **PARTIAL** | `managers`, `talent_applications`, `talents`, `manager_view_logs` | Đồng ý điều khoản (U-14); gửi lại đơn khi bị từ chối (R01-03) |
| EP02 Thông tin tài năng | **DESIGNED** | `talents.onedrive_folder_id`, `follower_goals` | Rủi ro mục tiêu tổng (H-02); hồ sơ nằm ở OneDrive |
| EP03 AI coach | **DESIGNED** | `coach_messages`, `ai_usage_events`; thông báo liên quan | Giới hạn độ dài (P-02); mốc báo tăng người theo dõi (R03-08) không cần đổi schema |
| EP04 Nội dung bài đăng | **DESIGNED** | `theme_suggestions`, `posts`, `post_media`, `ng_words` | Thời hạn bản nháp (R04-10) không cần đổi schema |
| EP05 Tư liệu và video AI | **PARTIAL** | `media_assets`, `video_generations`, `video_generation_inputs` | Đơn giá (U-02); giới hạn tệp (P-04); video tự làm hằng ngày (U-13) |
| EP06 Duyệt và đăng bài | **PARTIAL** | `post_approval_decisions`, `post_deliveries`, `social_accounts`, trạng thái bài | Gửi duyệt lại (U-03); bảng trạng thái theo mạng (U-04, U-06); số tài khoản mỗi mạng (U-05); chống khóa tài khoản (R06-15) |
| EP07 Kết quả và phân tích | **PARTIAL** | `follower_snapshots`, `post_metric_snapshots` | Danh sách chỉ số (U-07); khung giờ tương tác 8-9: **NOT STARTED** |
| EP08 Thu phí | **BLOCKED** (một phần) | `billing_accounts`; đếm lượt video ở `video_generations` | Hóa đơn tháng, kết quả thu tiền (U-01) |
| EP09 Thông báo và PWA | **DESIGNED** | `talent_notifications`, `manager_notifications`, `push_subscriptions` | "Đã xử lý" theo từng quản lý (U-10); danh sách loại (U-11) |
| EP10 Nền tảng chung | **DESIGNED** | `system_settings`, `ng_words`, `activity_logs` | Thời gian giữ dữ liệu (U-09) |
| Nhóm tài năng, chỉ thị AI theo nhóm, duyệt theo nhóm (CR-17〜CR-19) | **BLOCKED** | — | Chờ [QA] No.50 |

## 6. Sẵn sàng triển khai

**Làm được ngay** (không phụ thuộc điểm chưa xác nhận): `managers`, `talent_applications`, `talents`, `follower_goals` (nếu chấp nhận rủi ro H-02), `coach_messages`, `ai_usage_events`, `theme_suggestions`, `posts`, `post_media`, `media_assets`, `video_generations`, `video_generation_inputs`, `social_accounts`, `follower_snapshots`, `post_metric_snapshots`, `talent_notifications`, `manager_notifications`, `push_subscriptions`, `system_settings`, `ng_words`, `manager_view_logs`, `activity_logs`.

**Làm được, nhưng nên chờ một câu hỏi:** `post_approval_decisions` và đường chuyển trạng thái bài ([QA] No.58), `post_deliveries` (bảng trạng thái theo mạng, [QA] No.51), `billing_accounts` (công ty thanh toán, [QA] No.4).

**BLOCKED:** hóa đơn tháng (U-01); nhóm tài năng và các chức năng đi kèm (U-15).

Khi triển khai: khai báo bảng trong `apps/api/prisma/schema.prisma`, tạo migration bằng `npx prisma migrate dev --create-only` trên DB phát triển, rồi thêm tay vào migration các phần Prisma không sinh được (CHECK, trigger, chỉ mục theo biểu thức). RLS và quyền đã tự động (`apps/api/PRISMA.md`). Kiểm thử tích hợp mỗi module với `TEST_DATABASE_URL`, theo `agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md` §4.3.

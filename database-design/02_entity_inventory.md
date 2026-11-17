# 02. Danh mục thực thể

> **Cập nhật 17/11/2026:** Bổ sung hiện hành: tài liệu [10](10_confirmed_scope_and_remediation.md) thêm 6 bảng app_private và giới hạn scope; các bảng pending cũ được giữ nhưng chặn ghi. Không tự tạo ba follower goals khi provision đợt 1.

Bản 1.0 · 17/11/2026 · Bước 2. Mã yêu cầu (R…, BR…) và mã điểm chưa rõ (U…) theo `01_confirmed_requirements.md`.

## 1. Ranh giới dữ liệu

[YK2] §7-2 chia nơi lưu dữ liệu. DB của hệ thống **không** sao chép những gì đã có chủ ở nơi khác.

| Dữ liệu | Nơi lưu | Trong DB có gì |
|---|---|---|
| Hồ sơ, định hướng, sở thích, sở trường, mục tiêu tương lai, know-how, chỉ thị cho AI, điều AI học được, thử thách | OneDrive ([YK2] §7-1, §7-2, §7-5; R02-02, R03-09, R02-06) | Chỉ mã thư mục của tài năng (`talents.onedrive_folder_id`) |
| Bản gốc ảnh và video | OneDrive ([YK2] §6-7 6-4; R05-02) | Thông tin tệp và mã tệp trên OneDrive (`media_assets`) |
| Hội thoại với AI coach | **Hệ thống** ([YK2] §7-2; R03-01) | Toàn bộ (`coach_messages`) |
| Mục tiêu người theo dõi | Nhập ở màn quản trị ([YK2] §6-4 2-4); [YK2] §7-2 ghi cả OneDrive | Bản chính trong DB (để hiện ngay, kiểm đạt mục tiêu); bản xuất ra OneDrive cho AI đọc là việc của tích hợp |
| Số liệu bài đăng, số người theo dõi | Lấy về hệ thống rồi ghi ra OneDrive ([YK2] §6-11 8-7, 8-8) | Ảnh chụp số liệu theo ngày (`follower_snapshots`, `post_metric_snapshots`) |
| Mật khẩu, factor xác thực hai bước, phiên đăng nhập | Supabase Auth (`auth.users`, `auth.mfa_factors`) | Không lưu; bảng của ứng dụng chỉ tham chiếu `auth.users.id` |
| Thông tin thẻ, lịch sử thanh toán | Công ty thanh toán ([YK2] §6-3 1-1, §7-2; BR-16) | Chỉ mã thành viên tại công ty thanh toán (`billing_accounts`) |
| Đăng ký tài năng ở Upload-Post và quyền kết nối mạng xã hội | Upload-Post ([YK2] §6-10 8-2) | Mã hồ sơ Upload-Post, trạng thái kết nối từng mạng |

## 2. Thực thể đã thiết kế

Loại dữ liệu: **Master** (dữ liệu gốc, ít đổi), **Transactional** (phát sinh theo nghiệp vụ), **Configuration** (cài đặt), **Historical** (lịch sử, chỉ thêm).

| # | Bảng | Thực thể | Loại | Module | Căn cứ |
|---|---|---|---|---|---|
| 1 | `managers` | Quản lý | Master | EP01 | R01-09, R01-10 |
| 2 | `talent_applications` | Đơn đăng ký của tài năng | Transactional | EP01 | R01-01, R01-02, R01-03 |
| 3 | `talents` | Tài khoản dùng ứng dụng tài năng: tài năng và tài khoản công ty | Master | EP01, EP02, EP06, EP08 | R01-01, R01-05, R01-06, R01-11, R01-12, R02-01, R06-09, R06-12, R06-14, R08-01 |
| 4 | `billing_accounts` | Đăng ký thanh toán tại công ty thanh toán | Master | EP08 | R08-02, R08-03 |
| 5 | `social_accounts` | Tài khoản mạng xã hội đã kết nối | Master | EP06 | R06-09, R06-10 |
| 6 | `follower_goals` | Mục tiêu người theo dõi theo từng mạng | Master | EP02, EP03 | R02-03, R03-07 |
| 7 | `coach_messages` | Tin nhắn giữa tài năng và AI coach | Transactional | EP03 | R03-01 |
| 8 | `ai_usage_events` | Một lần dùng AI và chi phí | Historical | EP03 | R03-04 |
| 9 | `theme_suggestions` | Chủ đề gợi ý mỗi sáng | Transactional | EP04 | R04-01 |
| 10 | `posts` | Bài đăng, từ bản nháp tới khi đăng hoặc hủy | Transactional | EP04, EP06 | R04-02〜R04-07, R06-01, R06-07, R06-11〜R06-14 |
| 11 | `post_media` | Ảnh, video gắn vào bài | Transactional | EP04 | R04-05 |
| 12 | `post_approval_decisions` | Quyết định duyệt hoặc trả lại | Historical | EP06 | R06-05, R06-06 |
| 13 | `post_deliveries` | Việc đăng lên một mạng và kết quả | Transactional | EP06 | R06-03, R06-04, R06-11 |
| 14 | `media_assets` | Ảnh, video của tài năng | Master | EP05 | R05-01, R05-02, R05-10 |
| 15 | `video_generations` | Một lần yêu cầu tạo video bằng AI | Transactional | EP05, EP08 | R05-06〜R05-09, R08-04, R08-07 |
| 16 | `video_generation_inputs` | Ảnh làm nguồn cho video | Transactional | EP05 | R05-08 |
| 17 | `follower_snapshots` | Số người theo dõi theo ngày | Historical | EP07 | R07-01, R07-04 |
| 18 | `post_metric_snapshots` | Số liệu một bài trên một mạng theo ngày | Historical | EP07 | R07-01, R07-02 |
| 19 | `talent_notifications` | Thông báo cho tài năng | Transactional | EP09 | R09-01, R09-03 |
| 20 | `manager_notifications` | Thông báo cho quản lý | Transactional | EP09 | R09-02, R09-03 |
| 21 | `push_subscriptions` | Máy nhận thông báo đẩy | Master | EP09 | R09-01 |
| 22 | `system_settings` | Cài đặt chung | Configuration | EP10 | R10-01, R10-02, R06-12 |
| 23 | `ng_words` | Từ cấm | Configuration | EP04, EP10 | R04-07, R10-01 |
| 24 | `manager_view_logs` | Nhật ký quản lý xem thông tin tài năng | Historical | EP01, EP10 | R01-14, R10-04 |
| 25 | `activity_logs` | Nhật ký thao tác và xử lý | Historical | EP10 | R10-04, R02-07 |

## 3. Thuộc tính và quan hệ chính

Kiểu dữ liệu, giá trị mặc định và ràng buộc chi tiết ở `04_database_schema.md` và `05_data_dictionary.md`.

| Thực thể | Thuộc tính chính | Quan hệ |
|---|---|---|
| Quản lý | người dùng Auth, đang hoạt động hay đã vô hiệu, ai tạo | 1 người dùng Auth – 1 quản lý |
| Đơn đăng ký | tên, email, ngày sinh, trạng thái (chờ, đã duyệt, đã từ chối), ai quyết, lúc nào | 0..1 đơn – 1 tài năng (khi được duyệt); nhiều đơn – 0..1 quản lý quyết |
| Tài năng | người dùng Auth, loại (tài năng, tài khoản công ty), tên hiển thị, ngày sinh, trạng thái, có cần duyệt bài, có đang dừng đăng tự động, thư mục OneDrive, hồ sơ Upload-Post | 1 người dùng Auth – 1 tài năng; 1 tài năng – 0..1 đăng ký thanh toán, N tài khoản mạng xã hội, 3 mục tiêu, N tin nhắn, N bài, N tư liệu, N lần tạo video, N thông báo, N máy nhận push |
| Đăng ký thanh toán | mã thành viên ở công ty thanh toán, lúc đăng ký | 1 tài năng (chỉ loại `talent`) – 0..1 |
| Tài khoản mạng xã hội | mạng, mã tài khoản ở mạng, trạng thái kết nối | 1 tài năng – N (U-05: một hay nhiều trên mỗi mạng) |
| Mục tiêu | mạng, số người theo dõi mục tiêu, hạn đạt, lúc đạt | 1 tài năng – 1 mục tiêu cho mỗi mạng |
| Tin nhắn coach | người gửi (tài năng, AI), nội dung, lúc gửi | 1 tài năng – N |
| Lần dùng AI | thời điểm, model, số token, chi phí | 1 tài năng – N |
| Chủ đề gợi ý | ngày, vị trí 1–3, nội dung, lúc được chọn | 1 tài năng – 3 mỗi ngày; 1 chủ đề – N bài |
| Bài đăng | trạng thái, chú thích, hashtag, hướng dẫn chụp, kịch bản video, giờ đăng, có gửi duyệt, phát hiện từ cấm, lý do hủy | 1 tài năng – N; 0..1 chủ đề; 0..1 bài gốc (bản sửa qua AI); N tư liệu qua `post_media`; N quyết định duyệt; tối đa 1 việc đăng cho mỗi mạng |
| Quyết định duyệt | duyệt hay trả lại, lý do, quản lý, lúc quyết | 1 bài – N; 1 quản lý – N |
| Việc đăng lên một mạng | mạng, tài khoản mạng xã hội, trạng thái ở Upload-Post (gửi lịch, hủy lịch, kết quả đăng), lý do lỗi, mã bài trên mạng, lúc đăng | 1 bài – 1 cho mỗi mạng; 1 việc đăng – N ảnh chụp số liệu |
| Tư liệu | loại (ảnh, video), nguồn (tải lên, AI tạo), người tải (tài năng hay quản lý), mã tệp OneDrive, đường dẫn tạm, định dạng, dung lượng | 1 tài năng – N; N bài qua `post_media`; N lần tạo video qua `video_generation_inputs` |
| Lần tạo video | loại video, trạng thái, có được đếm không, ai yêu cầu, video kết quả | 1 tài năng – N; N ảnh nguồn; 0..1 tư liệu kết quả |
| Ảnh chụp người theo dõi | ngày, số người theo dõi | 1 tài khoản mạng xã hội – 1 mỗi ngày |
| Ảnh chụp số liệu bài | ngày, số liệu (JSONB) | 1 việc đăng – 1 mỗi ngày |
| Thông báo cho tài năng | loại, tiêu đề, nội dung, màn đích, lúc đọc, khóa chống trùng | 1 tài năng – N |
| Thông báo cho quản lý | loại, đối tượng liên quan (tài năng, đơn, bài, tin nhắn), lúc xử lý, ai xử lý, khóa chống trùng | Mỗi sự kiện một dòng, mọi quản lý cùng thấy ([YK2] §3-3) |
| Máy nhận push | địa chỉ nhận (endpoint), khóa mã hóa, đang dùng hay đã tắt | 1 tài năng – N |
| Cài đặt chung | giờ nhắn, giờ nhắc, số ngày không đăng (hai ngưỡng), thứ tổng kết tuần, dừng đăng toàn bộ | Một dòng duy nhất |
| Từ cấm | từ | Danh sách chung, không thuộc tài năng nào |
| Nhật ký xem | quản lý, tài năng, màn đã mở, lúc xem | N – 1 quản lý; N – 1 tài năng |
| Nhật ký thao tác và xử lý | ai làm (quản lý, tài năng, hệ thống), hành động, đối tượng, kết quả, chi tiết | Tham chiếu mềm tới đối tượng (xem 03 §3) |

## 4. Những thứ không thành thực thể, và lý do

| Thông tin | Vì sao không có bảng | Căn cứ |
|---|---|---|
| Vị thành niên | Tính từ ngày sinh mỗi lần hiển thị | R01-06 |
| Tiến độ hướng dẫn lần đầu (6-2) | Suy ra từ dữ liệu đã có: đăng ký thanh toán (`billing_accounts`), kết nối mạng (`social_accounts`), máy nhận push (`push_subscriptions`). Riêng bước "thêm vào màn hình chính" chỉ trình duyệt biết | R01-16 |
| Số ngày không đăng, ngày đăng liên tục | Tính từ kết quả đăng (`post_deliveries`). Cách đếm ngày đăng liên tục còn PENDING | R02-05, R03-10 |
| Lịch sử trạng thái tài năng | Ghi trong `activity_logs` (thao tác đổi trạng thái) | R10-04 |
| Thử thách, hồ sơ, know-how, chỉ thị cho AI | Nằm ở OneDrive | R02-02, R02-06 |
| Phí ChatGPT của quản lý | Thanh toán ngoài hệ thống; [YK2] chỉ yêu cầu tách khỏi phí AI coach | R03-04 |
| Liên kết kết nối mạng xã hội (hạn 48 giờ) | Tạo mỗi khi cần, không cần lưu | R06-09 |
| Thông báo qua email (kết quả đơn) | Gửi một lần lúc duyệt hoặc từ chối; kết quả gửi ghi ở `activity_logs` | 別紙A |
| Hàng đợi việc nền (gửi push, gọi dịch vụ ngoài) | Hạ tầng kỹ thuật (pg-boss theo [TECH]), không phải dữ liệu nghiệp vụ | [TECH] |

## 5. Thực thể chưa thiết kế

| Thực thể | Trạng thái | Lý do | Căn cứ |
|---|---|---|---|
| Hóa đơn tháng và kết quả thu tiền | **BLOCKED** | Chưa biết chu kỳ, ngày chốt, ngày thu, ngày bắt đầu tính phí, công ty thanh toán; không xác định được khóa và quan hệ của hóa đơn | U-01, R08-06 |
| Đơn giá video | PENDING | Nơi cài đặt và cách tính khi đổi giá giữa tháng chưa chốt | U-02 |
| Đồng ý điều khoản | PENDING | 確認1 | U-14 |
| Nhóm tài năng, chỉ thị AI theo nhóm, duyệt theo nhóm | **BLOCKED** | CR-17〜CR-19, chờ [QA] No.50 | U-15 |
| Hàng đợi video tự làm thành bản nháp | PENDING | CR-23 | U-13 |
| Khung giờ tương tác (8-9) | NOT STARTED | Ưu tiên thấp | R07-06 |
| Biện pháp chống khóa tài khoản | UNKNOWN | Nội dung chưa quyết | R06-15 |

## 6. Inventory bổ sung sau remediation (đợt 1)

| Bảng mới (schema app_private) | Vai trò | Quan hệ |
|---|---|---|
| auth_principals | Danh tính ứng dụng, bắt đổi mật khẩu, security version | PK/FK Auth user, kind manager/talent; domain dùng FK kép |
| auth_session_registry | Phiên và proof server-owned, restricted/full/revoked | N:1 principal; session_id lấy từ JWT đã verify |
| auth_challenges | Challenge gắn đúng session/user/factor/purpose | FK kép registry |
| password_lock_state | Counter/blocked_until dùng chung các process | 0..1:1 principal |
| domain_operations | Command/provisioning có idempotency và trạng thái unknown | Actor, application hoặc talent; một provisioning/application |
| outbox_events | Ý định gọi dịch vụ ngoài, lease và generation | N:1 operation; unique operation/generation/type |

Tổng: 31 bảng ứng dụng, cộng projection Auth external. Không tạo organizations, billing invoice, delivery attempts hoặc SMS tables khi chưa chốt phạm vi. Operation/outbox là dữ liệu kỹ thuật bắt buộc để domain transaction không mất side effect sau crash, không tiếp tục loại ra khỏi thiết kế như §4 cũ. Các bảng pending giữ nguyên để bảo toàn lịch sử nhưng bị chặn ghi theo tài liệu `10`.

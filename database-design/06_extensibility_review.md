# 06. Đánh giá khả năng mở rộng

> **Cập nhật 17/11/2026:** Cập nhật sau independent review: [10](10_confirmed_scope_and_remediation.md) thay thế các nhận định rủi ro thấp khi thêm billing/giá/approval; phải giữ snapshot lịch sử, revision, rollout và gate. Không coi thêm cột là tự khôi phục được dữ liệu quá khứ.

Bản 1.0 · 17/11/2026 · Bước 6. Đánh giá schema ở `04_database_schema.md` trước các thay đổi yêu cầu có thể xảy ra. Không thêm cột hay bảng dự phòng; chỉ ghi nơi sẽ đổi và mức rủi ro.

Mức rủi ro migration:
- **Thấp:** thêm cột cho phép NULL, thêm bảng, thêm hoặc nới CHECK, thêm chỉ mục. Không đụng dữ liệu cũ.
- **Trung bình:** siết ràng buộc (dữ liệu cũ phải đạt trước), đổi giá trị liệt kê, cần chạy chuyển dữ liệu.
- **Cao:** tách hoặc gộp bảng, đổi khóa, đổi quan hệ 1:N thành N:N. Phải sửa nhiều module.

## 1. Mức gắn kết của schema

| Khía cạnh | Đánh giá |
|---|---|
| Bảng trung tâm | `talents` và `posts`. Mọi dữ liệu của tài năng đi qua `talent_id`; luồng đăng bài đi qua `posts`. Đổi khóa của hai bảng này là thay đổi lớn nhất có thể có, nhưng không có yêu cầu nào đang chờ đòi đổi khóa |
| Gắn kết với dịch vụ ngoài | Chỉ là cột mã tham chiếu dạng text (`posting_service_profile_ref`, `provider_member_ref`, `provider_job_ref`, `onedrive_item_id`). Đổi nhà cung cấp chỉ đổi giá trị, không đổi cấu trúc |
| Gắn kết với Supabase Auth | `talents`, `managers` tham chiếu `auth.users(id)` không qua khóa ngoại; một trigger trên `auth.users` chặn xóa (IR-03 cách c). Nếu sau này rời Supabase Auth thì chỉ bỏ trigger đó |
| Gắn kết với giao diện | Không có bảng nào dựng theo màn hình. Mã màn hình ([AG]) không xuất hiện trong schema; `manager_view_logs.screen` dùng tên chức năng (thông tin, hội thoại, kết quả), không dùng mã màn |
| Giá trị liệt kê | `text` + CHECK (D-16): thêm giá trị bằng một lệnh đổi CHECK, rủi ro thấp. Hai cột loại thông báo không có CHECK để tránh đổi DB mỗi khi thêm loại |

## 2. Tác động của từng điểm chưa xác nhận

| Mã | Nếu khách chốt… | Bảng bị ảnh hưởng | Thay đổi schema có thể có | Rủi ro |
|---|---|---|---|---|
| U-01 | Chu kỳ thu, ngày chốt, công ty thanh toán | Mới: hóa đơn tháng, kết quả thu tiền | Thêm bảng hóa đơn (theo tài năng và kỳ thu) và bảng lần thu tiền; liên kết lượt tạo video vào kỳ thu. Cần snapshot giá/kỳ và dữ liệu bất biến trước khi phát sinh usage tính tiền; boolean hiện tại không bảo đảm tái tính lịch sử | Cao trước khi mở EP08 |
| U-02 | Đơn giá video và cách tính khi đổi giá | `video_generations`, `system_settings` hoặc bảng giá mới | Snapshot giá/rule ở thời điểm yêu cầu; dữ liệu đã phát sinh không thể suy giá cũ từ giá mới | Cao nếu đã có usage |
| U-03 | Bài xin duyệt lại là **cùng bài** ([QA] No.58) | `posts`, `post_approval_decisions` | Phải có request/round gắn content revision, một quyết định hiệu lực mỗi request | Trung bình |
| U-03 | Bài xin duyệt lại là **bài mới** (C-01 hiện tại) | `posts` | Thêm giá trị `returned` vào CHECK `cancel_reason` (P-06) | Thấp |
| U-04 | Danh sách 8 trạng thái của [QA] No.51 | `posts.status` | Thêm giá trị vào CHECK. Nếu tách trạng thái 差し戻し (trả lại) hoặc NGワードで保留 (giữ lại vì từ cấm) ra riêng thì phải chuyển dữ liệu từ cờ `ng_detected_at` hoặc từ `post_approval_decisions` sang trạng thái | Trung bình |
| U-05 | **Một** tài khoản mỗi mạng | `social_accounts` | Thêm chỉ mục UNIQUE có điều kiện (P-01). Phải kiểm dữ liệu cũ không có hai tài khoản đang kết nối | Trung bình |
| U-05 | **Nhiều** tài khoản mỗi mạng (CR-20) | `social_accounts`, `post_deliveries` | `social_accounts` đã cho phép N. Phải đổi UNIQUE (`post_id`, `platform`) của `post_deliveries` thành (`post_id`, `social_account_id`) và thêm cách chọn tài khoản đích | Trung bình |
| U-06 | Ghi cả trường hợp "bỏ qua" theo từng mạng | `post_deliveries.provider_state` | Thêm giá trị `skipped` (P-05) | Thấp |
| U-03 + IR-11 | Gửi duyệt lại là cùng bài | `posts`, `post_approval_decisions` | Thêm `approval_round` (P-11) | Thấp |
| U-09 + IR-14 | Thời hạn giữ dữ liệu tài năng đã ngừng (確認55) | Mọi bảng có `talent_id`; hai bảng nhật ký | Ưu tiên ẩn danh (xóa nội dung, giữ khóa) thay vì xóa dòng; thủ tục dọn chạy bằng role chủ sở hữu và tạm bỏ qua trigger chỉ thêm | Trung bình |
| U-07 | Danh sách chỉ số Upload-Post | `post_metric_snapshots` | Giữ JSONB; nếu cần lọc hoặc tổng hợp nhiều thì thêm cột cho chỉ số chính, chuyển dữ liệu từ JSONB | Thấp |
| U-08 | Hội thoại riêng tư (CR-24) | Không đổi bảng | Đổi quyền truy cập ở BE; nếu có "phần được chia sẻ cho quản lý" thì thêm cột đánh dấu ở `coach_messages` | Thấp |
| U-09 | Thời gian giữ dữ liệu, nhật ký | Các bảng lịch sử | Không đổi cấu trúc; thêm việc dọn theo lịch. Nếu giữ lâu và nhiều dòng thì chia bảng theo tháng (P-09) | Thấp |
| U-10 | "Đã xử lý" **theo từng quản lý** | `manager_notifications` | Chuyển `handled_at`, `handled_by_manager_id` sang bảng mới (quản lý, thông báo, lúc xử lý) | Trung bình |
| U-11 | Danh sách loại thông báo cuối cùng | `talent_notifications`, `manager_notifications` | Không đổi DB; có thể thêm CHECK khi danh sách ổn định | Thấp |
| U-12 | Giờ nhắn buổi sáng theo từng tài năng | `talents` | Thêm cột giờ cho phép NULL (NULL thì dùng giờ chung) | Thấp |
| U-13 | Video tự làm thành bản nháp mỗi ngày (CR-23) | `media_assets` | Thêm giá trị `self_made` vào `source` và cột thứ tự hàng đợi hoặc lúc đã dùng | Thấp |
| U-14 | Đồng ý điều khoản (確認1) | `talent_applications` | Thêm cột lúc đồng ý và phiên bản điều khoản (NULL cho đơn cũ) | Thấp |
| U-15 | Nhóm tài năng, chỉ thị AI theo nhóm, duyệt theo nhóm (CR-17〜CR-19) | Mới | Thêm bảng nhóm và bảng nối tài năng – nhóm (N:N, theo [P07]); duyệt theo nhóm thêm bảng quản lý phụ trách nhóm. Không phải sửa bảng hiện có | Thấp |
| R01-03 | Người bị từ chối được gửi lại bằng cùng email ([QA] No.65) | `talent_applications` | Đổi UNIQUE email thành UNIQUE có điều kiện (chỉ đơn chưa bị từ chối, hoặc chưa bị quản lý xóa) | Trung bình |
| R02-04 | Mục tiêu là **tổng 3 mạng** thay vì theo từng mạng | `follower_goals` | Đổi khóa duy nhất và ý nghĩa cột; phải chuyển dữ liệu (gộp 3 dòng thành 1) | **Cao** |
| R08-08 | Thêm trạng thái "dừng vì chưa trả tiền" ([QA] No.63) | `talents.status` | Thêm giá trị vào CHECK | Thấp |

## 3. Khả năng thêm thực thể và quan hệ

| Trường hợp | Đánh giá |
|---|---|
| Thêm thực thể thuộc về tài năng (ví dụ hóa đơn, nhóm, thử thách nếu đưa vào DB) | Thêm bảng có `talent_id` tới `talents`; không phải sửa bảng cũ |
| Thêm mạng xã hội (ví dụ X, đang ở [YK2] §13 "để xem xét sau") | Thêm giá trị vào CHECK `platform` ở 3 bảng (`social_accounts`, `follower_goals`, `post_deliveries`) và thêm một dòng mục tiêu cho mỗi tài năng. Rủi ro thấp |
| Thêm loại tài khoản (ví dụ người hâm mộ, [YK2] §13) | Thêm giá trị `account_type` và sửa CHECK `chk_talents_origin`. Rủi ro trung bình vì CHECK này ràng nguồn gốc theo loại |
| Thêm ràng buộc nghiệp vụ (giới hạn số bài mỗi ngày, dung lượng tối đa) | Thêm CHECK, hoặc kiểm ở tầng dịch vụ với giới hạn theo ngày (CHECK không đếm được). Rủi ro thấp |

## 4. Quyết định có thể gây thay đổi phá vỡ

| Quyết định | Vì sao có thể phá vỡ | Cách giảm |
|---|---|---|
| D-01: tài năng và tài khoản công ty chung một bảng | Nếu khách muốn tài khoản công ty có quy trình hoàn toàn khác (ví dụ nhiều quản lý dùng chung, xem [QA] No.66, S06-07) | Khác biệt hiện chỉ ở CHECK; thêm cột riêng cho tài khoản công ty vẫn dễ hơn tách bảng |
| D-02: bản nháp và bài đăng là một thực thể | Nếu bản nháp cần vòng đời riêng (ví dụ nhiều phiên bản, sửa trực tiếp CR-21 cần lịch sử chỉnh sửa) | `revised_from_post_id` đã giữ chuỗi phiên bản; lịch sử sửa có thể thêm bảng riêng |
| BR-10: mục tiêu theo từng mạng | Xem R02-04 ở §2 (rủi ro cao) | Chốt với khách trước khi làm 3-10 (kết hợp câu hỏi ở cột Comment của [QA] No.14) |
| BR-01: email duy nhất cho cả đơn bị từ chối | Xem R01-03 ở §2 | Chờ [QA] No.65 trước khi làm luồng từ chối |
| D-03: mỗi bài một dòng kết quả cho mỗi mạng | Phá vỡ nếu cho nhiều tài khoản trên một mạng (U-05) | Như §2 |

## 5. Rủi ro từ các câu Q&A đóng ngày 15/11

Các câu [QA] đóng ngày 15/11 là AMCOLAB tự chốt theo [YK2]; khách vẫn có thể phản đối (`01` §2). Những câu ảnh hưởng tới schema:

| [QA] | Nội dung chốt | Bảng dựa vào | Nếu khách phản đối |
|---|---|---|---|
| No.5 | Một loại quản lý | `managers` (không có cột vai trò) | Thêm cột vai trò hoặc bảng quyền. Rủi ro thấp |
| No.10 | 3 trạng thái tài năng | `talents.status` | Đổi CHECK. Rủi ro thấp |
| No.14 | Mục tiêu theo từng mạng | `follower_goals` | Rủi ro **cao** (§2, R02-04) |
| No.15 | Không tự đăng lại | `post_deliveries` | Thêm cột số lần thử, lúc thử lại. Rủi ro thấp |
| No.17 | Không trần phí AI | `ai_usage_events` | Thêm cột trần ở `system_settings` hoặc `talents`. Rủi ro thấp |
| No.21 | Lọc nhật ký xem theo thời gian và tài năng | Chỉ mục của `manager_view_logs` | Lọc theo quản lý đã có chỉ mục `idx_manager_view_logs_manager_id`. Rủi ro thấp |
| No.46 | Tháng đầu thu đủ; thu lỗi không tự dừng | Bảng hóa đơn (BLOCKED) | Ảnh hưởng thiết kế hóa đơn khi mở khóa |

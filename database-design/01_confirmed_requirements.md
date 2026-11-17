# 01. Phân loại yêu cầu và ma trận truy vết

> **Cập nhật 17/11/2026:** Phạm vi triển khai hiện hành: [10_confirmed_scope_and_remediation.md](10_confirmed_scope_and_remediation.md). Không coi nội dung chỉ có ở DOCX 0.1 là khách đã xác nhận; bảng dưới là nguồn truy vết, scope đợt 1 do tài liệu 10 quyết định.

Bản 1.0 · 17/11/2026 · Bước 1 của thiết kế cơ sở dữ liệu (DB). Chỉ là tài liệu: không có mã, không có migration, không chạy SQL.

## 1. Nguồn đã đọc

| Ký hiệu | Tài liệu | Vai trò |
|---|---|---|
| [YK2] | `AI育成OS_概要要件定義書_v2.docx` (0.1版, bản định nghĩa yêu cầu) | Nguồn chính. Đọc §1–§14 và 別紙A (phụ lục A, danh sách thông báo) |
| [QA] | `AI-Talent-OS_Q&A表.xlsx` bản 15/11/2026 (trang Q&A, 追加要件 – yêu cầu bổ sung) | Trạng thái Close/Open của từng câu; CR-01〜CR-25 |
| [C-01] | `SCD/EP10…/C-01_Bo_trang_thai.md` | Danh sách trạng thái bài đăng chép từ hình 5-1 của [YK2] (phần chữ của docx không có hình) |
| [P07] | `Phan_tich/07_Du_lieu_va_ERD.md` | Phân tích thực thể ban đầu; chỉ để đối chiếu, không làm căn cứ |
| [SUPA] | `agent_spec/AI_Talent_OS_Supabase_Database_Auth_Agent_Spec_v1/` bản 1.3 | Quyết định kỹ thuật về xác thực (không phải yêu cầu của khách) |
| [TECH] | `agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md` | Quyết định kỹ thuật: Supabase Postgres, Prisma, FE không đọc DB |

## 2. Cách phân loại

[YK2] §1-2 ghi rằng tài liệu được viết từ yêu cầu của アデッソ và giả định của bên soạn (弊社の想定). Điểm nào cần khách xác nhận thì đánh số 確認N (mục cần xác nhận); câu có dấu ※N trong thân tài liệu thuộc 確認N đó. Khách trả lời bằng 確認シート (bảng xác nhận, thư mục dự án chưa có), kết quả phản ánh vào [QA]. Từ đó:

| Trạng thái | Điều kiện |
|---|---|
| **CONFIRMED** | Câu [QA] có trạng thái Close hoặc quyết định CR đã chốt, không có comment/xung đột đặt lại nội dung |
| **SOURCE_BASELINE** | Nội dung chỉ có trong [YK2] 0.1; không gắn 確認 không tự chứng minh đã được khách xác nhận |
| **PENDING** | Nội dung gắn ※N hoặc 確認N mà [QA] chưa đóng; câu [QA] đang mở; CR-17〜CR-25 (chờ [QA] No.50) |
| **CONFLICT** | Hai nguồn nói khác nhau và chưa có quyết định |
| **UNKNOWN** | [YK2] ghi rõ là chưa quyết: "設計の中で決め" (quyết khi thiết kế), "最終版に書きます" (ghi ở bản cuối), "実際のアカウントにつないで確かめ" (thử với tài khoản thật), "決済代行会社が決まった時点で決めます" (quyết khi chọn xong công ty thanh toán) |

Các quy ước bổ sung:
1. **Con số ở [YK2] §6** (giới hạn ký tự, số lần, thời gian) đều là giả định: §6 ghi "本章の入力の制限、回数、時間などの数値は、弊社の想定です" (các con số trong chương này là giả định của bên soạn). Vì vậy **không** đưa vào ràng buộc CHECK chính thức; chỉ ghi là PROPOSED (đề xuất).
2. **Giá trị mặc định của cài đặt** ở [YK2] §5-2 cũng là giả định, nhưng §5-6 xác nhận quản lý tự đổi được. Vì vậy chúng được dùng làm DEFAULT (giá trị mặc định, sửa được), không dùng làm ràng buộc.
3. **Phải đối chiếu lại với 確認シート** (bảng xác nhận 118 dòng khách đã gửi AMCOLAB) khi nhận được: [YK2] mới là 0.1版, nên phải đối chiếu lại các dòng SOURCE_BASELINE (review `08`, IR-04).
4. **[QA] Close ngày 15/11** là AMCOLAB tự chốt theo [YK2], khách vẫn có thể phản đối ("ご意見がある場合はご連絡ください"). Chỉ dùng phần không bị comment/xung đột đặt lại trong scope 10; ghi vào rủi ro (`06_extensibility_review.md`).

## 3. Ma trận truy vết yêu cầu

Cột "Thực thể liên quan" dùng tên bảng ở `04_database_schema.md`. Mã module theo `Phan_tich/16_Chia_module_phat_trien.md` (EP01–EP10).

### EP01. Danh tính và quyền truy cập

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R01-01 | [YK2] §6-1 1-4; UC-01; [QA] No.11 (Close), CR-01 | CONFIRMED | `talent_applications`, `talents` | Tài năng tự gửi đơn trong ứng dụng; quản lý duyệt hoặc từ chối; chỉ người được duyệt mới đăng nhập |
| R01-02 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talent_applications` | Đơn gồm: tên (nghệ danh hoặc tên thật), email, ngày sinh |
| R01-03 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talent_applications` | Không gửi đơn được bằng email đã dùng. Cách gửi lại khi bị từ chối: PENDING ([QA] No.65) |
| R01-04 | [YK2] UC-01 確認1 | PENDING | — | Đồng ý điều khoản khi gửi đơn: chưa đưa cột vào schema |
| R01-05 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talents.is_approval_required` | Lúc duyệt, quản lý đặt "có cần duyệt bài không" |
| R01-06 | [YK2] §3-1; 確認2 thuộc [QA] No.18 (Close) | CONFIRMED | `talents.birth_date` | Hệ thống tính vị thành niên từ ngày sinh, chỉ hiển thị tham khảo; không lưu cờ vị thành niên |
| R01-07 | [YK2] §6-1 1-4 (đăng nhập email và mật khẩu, mật khẩu tạm, đặt lại) | SOURCE_BASELINE | Supabase `auth.users` | Mật khẩu do Supabase Auth giữ, không nằm trong bảng của ứng dụng |
| R01-08 | [YK2] §6-1 1-4 (8 ký tự, 5 lần sai khóa 15 phút, giữ 30 ngày) | PENDING (con số §6) | (xác thực ở BE) | [QA] No.25 xác nhận giữ giá trị theo §6-1 nhưng câu vẫn Open. Bảng đếm khóa thuộc thiết kế xác thực của [SUPA], ngoài phạm vi bộ này |
| R01-09 | [YK2] §6-2 1-6; [QA] No.5 (Close), CR-13 | CONFIRMED | `managers` | Một loại quyền; quản lý thêm và vô hiệu hóa quản lý; người bị vô hiệu không đăng nhập được ngay |
| R01-10 | [YK2] §6-2 1-6, §10-1 | SOURCE_BASELINE | Supabase `auth.mfa_factors` | Quản lý đăng nhập hai bước bằng ứng dụng xác thực; factor do Supabase giữ |
| R01-11 | [YK2] §6-2 7-3; [QA] No.10 (Close) | CONFIRMED | `talents.status` | Ba trạng thái 利用前・利用中・利用終了 (chưa dùng, đang dùng, đã ngừng); đưa về 利用中 được |
| R01-12 | [YK2] §6-2 7-3 | SOURCE_BASELINE | `talents`, `posts` | Chuyển sang 利用終了: dừng nhắn tin, dừng thu phí, hủy bài đã hẹn, không đăng nhập được |
| R01-13 | [QA] No.52, No.64 | PENDING | `talents.status` | Điều kiện chuyển 利用前→利用中; thu phí khi đưa về 利用中 |
| R01-14 | [YK2] §6-2 7-6, §3-2, §9-4; [QA] No.21 (Close) | CONFIRMED | `manager_view_logs` | Ghi ngày giờ, quản lý, tài năng khi quản lý mở thông tin, hội thoại, kết quả; lọc theo khoảng thời gian và tài năng; không sửa được |
| R01-15 | [YK2] §3-2 ※41 ※42; [QA] No.7 (Open), CR-24 | CONFLICT | (quyền truy cập, không phải schema) | [YK2] cho mọi quản lý xem hội thoại; ý kiến trong 確認シート No.13 muốn hội thoại riêng tư |
| R01-16 | [YK2] §6-1 6-2 | SOURCE_BASELINE | (suy ra từ `billing_accounts`, `social_accounts`, `push_subscriptions`) | Hướng dẫn lần đầu theo thứ tự, dừng giữa chừng thì lần sau tiếp tục. Không cần bảng riêng; xem 02 §4 |

### EP02. Thông tin tài năng

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R02-01 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talents.onedrive_folder_id` | Tạo thư mục OneDrive khi tài năng đăng ký thanh toán; tài khoản công ty: khi tạo |
| R02-02 | [YK2] §7-1, §7-2, §6-4 2-3; [QA] No.45 (Close) | CONFIRMED | (OneDrive, không lưu DB) | Hồ sơ, định hướng, sở thích, sở trường, mục tiêu tương lai, know-how, chỉ thị cho AI nằm ở OneDrive |
| R02-03 | [YK2] §6-4 2-4, §7-1; [QA] No.14 (Close) | CONFIRMED | `follower_goals` | Mục tiêu người theo dõi **theo từng mạng**, mặc định 10.000, có hạn đạt; quản lý nhập ở màn quản trị; hiển thị ngay |
| R02-04 | [QA] No.14 (cột Comment) | PENDING | `follower_goals` | Đội muốn kiểm lại với thiết kế アデッソ (mục tiêu tổng 3 mạng); rủi ro thay đổi |
| R02-05 | [YK2] §6-4 7-1 | SOURCE_BASELINE | `talents`, `follower_goals`, `social_accounts`, `coach_messages` | Màn chi tiết: thông tin, mục tiêu, trạng thái kết nối mạng xã hội, hội thoại. Danh sách tìm theo tên, lọc theo trạng thái và số ngày không đăng |
| R02-06 | [YK2] UC-02 確認5; CR-22 | PENDING | (OneDrive) | Thử thách (チャレンジ) ghi trong tệp OneDrive; màn theo dõi thử thách là CR-22 |
| R02-07 | [QA] No.22 (Close) | CONFIRMED | `activity_logs` | Lỗi đọc tệp OneDrive xử lý như lỗi kỹ thuật; hiện tình trạng đọc ở màn chi tiết |
| R02-08 | [QA] No.54 | PENDING | — | Cách biết quản lý đã nhập xong thông tin tài năng |

### EP03. AI coach

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R03-01 | [YK2] §6-5 3-4, §7-2 | SOURCE_BASELINE | `coach_messages` | Hội thoại lưu trong hệ thống; tài năng xem lại được; quản lý xem được (§7-2) |
| R03-02 | [YK2] §6-5 3-4 (1.000 ký tự mỗi lần nhập) | PENDING (con số §6) | `coach_messages` | Chỉ đề xuất CHECK độ dài |
| R03-03 | [YK2] §6-5 3-3, §5-5 | SOURCE_BASELINE | `manager_notifications` | Chuyện sức khỏe hoặc muốn nghỉ: tiếp tục trò chuyện và báo quản lý |
| R03-04 | [YK2] §6-5 3-5; [QA] No.17 (Close), CR-16 | CONFIRMED | `ai_usage_events` | Phí AI tổng hợp theo tài năng và theo tháng; không trần, không tự dừng; tách khỏi phí ChatGPT |
| R03-05 | [YK2] §6-5 3-9; §5-2 | SOURCE_BASELINE | `system_settings`, `talent_notifications`, `manager_notifications` | 3 ngày không đăng thì AI nhắn tài năng, 7 ngày thì báo quản lý (số ngày đổi được) |
| R03-06 | [YK2] §6-5 3-8 | SOURCE_BASELINE | `system_settings.weekly_review_weekday` | Tổng kết tuần vào thứ cấu hình được (mặc định thứ Hai) |
| R03-07 | [YK2] §6-5 3-7; [QA] No.14, No.42 (Close), CR-08 | CONFIRMED | `follower_goals.achieved_at`, `talent_notifications`, `manager_notifications` | Đạt mục tiêu: báo tài năng và quản lý |
| R03-08 | [QA] No.14 (đề xuất mốc 25/50/75%) | PENDING | — | Khách xác nhận trên màn thật |
| R03-09 | [YK2] §6-5 3-2, 3-6 | SOURCE_BASELINE | (OneDrive) | Điều AI học được ghi vào tệp OneDrive; không lưu DB |
| R03-10 | [YK2] §5-5 (nói số ngày đăng liên tục); 確認22 | PENDING | (tính từ `post_deliveries`) | Cách đếm "ngày đăng liên tục" |

### EP04. Nội dung bài đăng

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R04-01 | [YK2] §5-3, §6-6 4-1; [QA] No.9 (Close), CR-02 | CONFIRMED | `theme_suggestions` | Mỗi sáng 3 chủ đề gợi ý cho từng tài năng |
| R04-02 | [YK2] §6-6 4-1 | SOURCE_BASELINE | `posts` | Bản nháp gồm chú thích, hashtag, hướng dẫn chụp; video thì thêm kịch bản; tạo bao nhiêu tùy tài năng |
| R04-03 | [YK2] §5-3 | SOURCE_BASELINE | `posts`, `post_deliveries` | Cùng ảnh, video và chữ đăng lên cả 3 mạng |
| R04-04 | [YK2] §6-6 4-2; [QA] No.39 Open, CR-21 | SOURCE_BASELINE (sửa qua AI) / PENDING (sửa trực tiếp) | `posts.revised_from_post_id` | Sửa qua AI tạo bản nháp mới |
| R04-05 | [YK2] §6-6 4-3 | SOURCE_BASELINE | `posts`, `post_media` | Chỉ chấp nhận bản nháp có ảnh hoặc video; chấp nhận thì hẹn giờ |
| R04-06 | [YK2] §6-6 4-3, §5-3 | SOURCE_BASELINE | `posts.approval_requested_at` | Tài năng cần duyệt chọn có gửi duyệt hay không khi chấp nhận |
| R04-07 | [YK2] §6-6 4-4; [QA] No.13, No.40 (Close), CR-06 | CONFIRMED | `ng_words`, `posts.ng_detected_at` | Một danh sách từ cấm chung; AI kiểm theo ngữ cảnh khi chấp nhận; dính thì không hẹn giờ, báo quản lý; quản lý sửa chữ rồi hẹn giờ |
| R04-08 | [QA] No.57 | PENDING | `posts` | Thứ tự với việc gửi duyệt; quản lý sửa có coi như duyệt không |
| R04-09 | [YK2] §5-2; 確認30 | SOURCE_BASELINE (hệ thống quyết giờ) / PENDING (tài năng không đổi giờ) | `posts.scheduled_at` | Giờ đăng do AI quyết theo từng tài năng |
| R04-10 | [QA] No.55, No.56 | PENDING | `posts`, `theme_suggestions` | Thời hạn của chủ đề và bản nháp; giờ của bài thứ hai trong ngày |

### EP05. Tư liệu và video AI

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R05-01 | [YK2] §6-7 6-3; CR-09 | SOURCE_BASELINE | `media_assets` | Tài năng gửi ảnh, video; quản lý gửi thay được |
| R05-02 | [YK2] §6-7 6-4, §7-2; CR-10 | SOURCE_BASELINE | `media_assets.onedrive_item_id` | Tư liệu lưu ở OneDrive; tài năng xem lại và dùng sau |
| R05-03 | [QA] No.8 (Open) | PENDING | `media_assets.temp_object_path` | Có tạo được liên kết chia sẻ OneDrive không; nếu không thì dùng nơi lưu tạm |
| R05-04 | [YK2] §6-7 6-3, §9-2 | UNKNOWN | — | Định dạng, dung lượng tối đa, tổng dung lượng: "設計の中で決め" |
| R05-05 | [YK2] §6-7 6-4 ※32; [QA] No.37 (Open), CR-23 | PENDING | — | Video tự làm, mỗi ngày 1 video thành bản nháp |
| R05-06 | [YK2] §5-7, §6-8 5-1; [QA] No.36 (Close), CR-04 | CONFIRMED | `video_generations.video_type` | Hai loại: video ngắn, video trình chiếu ảnh |
| R05-07 | [YK2] §6-8 5-1, §6-3 5-4; [QA] No.1 (Close) | CONFIRMED | `video_generations.is_counted` | Đếm 1 lượt lúc gửi yêu cầu; tạo lại cũng đếm; dịch vụ tạo video lỗi thì không đếm |
| R05-08 | [YK2] §6-8 5-1 | SOURCE_BASELINE | `video_generation_inputs` | Tài năng chọn ảnh làm nguồn |
| R05-09 | [YK2] §6-8 5-3 | SOURCE_BASELINE | `video_generations`, `media_assets` | Xem video, chọn dùng, tạo lại hoặc bỏ |
| R05-10 | [YK2] §5-7, §6-8 5-5 | SOURCE_BASELINE | `media_assets.source` | Video do AI tạo phải ghi rõ khi đăng |
| R05-11 | [QA] No.2, No.62 (Open) | PENDING | — | Đơn giá, nơi cài đặt, giá khi đổi giữa tháng |

### EP06. Duyệt và đăng bài

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R06-01 | [YK2] §5-1 hình 5-1; [C-01] | SOURCE_BASELINE | `posts.status` | 6 trạng thái: 投稿案, 承認待ち, 予約済み, 投稿済み, 失敗, 取り消し |
| R06-02 | [QA] No.51 (Open) | CONFLICT | `posts.status` | AMCOLAB tạm ghép 8 trạng thái từ phần chữ, khác hình 5-1 |
| R06-03 | [YK2] §5-1, §6-10 8-3 | SOURCE_BASELINE | `post_deliveries` | Thành công hay thất bại ghi theo từng mạng |
| R06-04 | [YK2] §6-10 8-3 | SOURCE_BASELINE | `post_deliveries` | Bài không có video thì không đăng YouTube; mạng chưa kết nối thì không đăng |
| R06-05 | [YK2] §6-9 7-7; [QA] No.35 (Close), CR-03 | CONFIRMED | `post_approval_decisions` | Duyệt hoặc trả lại kèm lý do; tài năng thấy lý do |
| R06-06 | [YK2] §3-3; CR-14 | SOURCE_BASELINE | `post_approval_decisions` | Yêu cầu duyệt tới mọi quản lý; ai cũng xử lý được (không có người duyệt chỉ định) |
| R06-07 | [YK2] §6-9 7-7, §5-3 | SOURCE_BASELINE | `posts.cancel_reason` | Chưa duyệt tới giờ đăng thì không đăng; báo tài năng và quản lý |
| R06-08 | [QA] No.58 (Open) | PENDING | `posts`, `post_approval_decisions` | Xin duyệt lại là cùng một bài hay bài mới |
| R06-09 | [YK2] §6-10 8-2 | SOURCE_BASELINE | `talents.posting_service_profile_ref`, `social_accounts` | Đăng ký tài năng với dịch vụ đăng bài; tài năng tự kết nối; hiện trạng thái kết nối |
| R06-10 | [YK2] §6-10 8-2 ※10; [QA] No.23 (Open), CR-20 | PENDING | `social_accounts` | Mỗi mạng một tài khoản |
| R06-11 | [YK2] §6-10 8-5; [QA] No.15 (Close), CR-15 | CONFIRMED | `post_deliveries`, `posts` | Không tự đăng lại; tài năng hoặc quản lý hẹn lại (hình 5-1: 失敗→予約済み) |
| R06-12 | [YK2] §6-10 7-5, §5-6; [QA] No.12 (Close) | CONFIRMED | `system_settings.is_auto_posting_paused`, `talents.is_auto_posting_paused` | Dừng đăng tự động toàn bộ và theo từng tài năng; hủy cả bài đã hẹn |
| R06-13 | [YK2] §6-10 7-2; [QA] No.16 (Close) | CONFIRMED | `posts` | Quản lý lọc bài theo trạng thái và hủy bài đã hẹn; tài năng không hủy được |
| R06-14 | [YK2] §6-10 9-1, UC-12; [QA] No.20 (Close) | CONFIRMED | `talents.account_type`, `posts.adopted_by_manager_id` | Tài khoản công ty: quản lý đăng nhập lại từng tài khoản và đăng như tài năng |
| R06-15 | [YK2] §6-10 8-4, §9-5 | UNKNOWN | — | Nội dung biện pháp chống khóa tài khoản |
| R06-16 | [QA] No.59, No.60, No.61 | PENDING | `posts` | Hẹn lại bài lỗi; chấp nhận khi đang dừng; báo tài năng khi bài bị hủy |

### EP07. Kết quả và phân tích

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R07-01 | [YK2] §6-11 8-7 | SOURCE_BASELINE | `follower_snapshots`, `post_metric_snapshots` | Mỗi ngày 1 lần lấy số liệu từng bài và số người theo dõi từng mạng; lỗi thì lấy ở lần sau |
| R07-02 | [YK2] §6-11 8-7 | UNKNOWN | `post_metric_snapshots.metrics` | Lấy những chỉ số nào: thử với tài khoản thật rồi ghi ở bản cuối |
| R07-03 | [YK2] §6-11 8-8 | SOURCE_BASELINE | (OneDrive) | Ghi kết quả vào tệp OneDrive cho AI đọc |
| R07-04 | [YK2] §6-11 3-10, 6-7; [QA] No.31 (Close) | CONFIRMED | `follower_snapshots`, `follower_goals`, `post_metric_snapshots` | Hiện số liệu từng bài, ngày đăng liên tục, diễn biến người theo dõi, phần còn thiếu tới mục tiêu |
| R07-05 | [YK2] §6-11 8-1 | SOURCE_BASELINE | (tính từ số liệu) | Đủ số liệu thì AI chọn giờ đăng theo từng tài năng |
| R07-06 | [YK2] §6-11 8-9 (ưu tiên 低 – thấp) | SOURCE_BASELINE (chức năng) / NOT STARTED (thiết kế) | — | Khung giờ tương tác; ưu tiên thấp, chưa thiết kế |

### EP08. Thu phí

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R08-01 | [YK2] §5-4, §6-3 1-2; [QA] No.47, No.48 (Close), CR-11 | CONFIRMED | `talents.account_type` | Mọi tài năng gửi đơn đều trả phí; tài khoản công ty là loại riêng, không thu tiền; tài năng không tự đổi loại |
| R08-02 | [YK2] §6-3 1-1, §7-2, §10-2 | SOURCE_BASELINE | `billing_accounts` | Đăng ký thanh toán trên trang của công ty thanh toán; hệ thống không giữ thông tin thẻ |
| R08-03 | [QA] No.4 | SOURCE_BASELINE (thẻ và nhà mạng, 1 công ty) / PENDING (công ty nào, thu số tiền thay đổi được không) | `billing_accounts` | |
| R08-04 | [YK2] §5-4; [QA] No.3, No.46 (Close), CR-12 | CONFIRMED | `video_generations` | Hóa đơn tháng = phí tháng + phí tạo video; không lượt miễn phí, không trần; tháng đầu thu đủ |
| R08-05 | [YK2] §6-3 1-1; [QA] No.46 (Close) | CONFIRMED | `manager_notifications`, `talent_notifications` | Thu lỗi thì báo tài năng và quản lý; không tự dừng sử dụng |
| R08-06 | [YK2] §6-3 1-1; [QA] No.49, No.53 | UNKNOWN / PENDING | — | Ngày chốt, ngày thu, chu kỳ, ngày bắt đầu tính phí: **chặn thiết kế bảng hóa đơn** |
| R08-07 | [YK2] §6-3 5-4 | SOURCE_BASELINE | `video_generations` | Tài năng và quản lý xem số lần tạo video trong tháng; tài khoản công ty cũng hiện số lần |
| R08-08 | [QA] No.63 | PENDING | `talents.status` | Trạng thái khi dừng vì thu lỗi |

### EP09. Thông báo và PWA

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R09-01 | [YK2] §6-12 6-1 | SOURCE_BASELINE | `talent_notifications`, `push_subscriptions` | Thông báo hiện trong ứng dụng; máy đã cho phép thì đẩy; mở thì tới đúng màn |
| R09-02 | [YK2] §6-12 7-4 | SOURCE_BASELINE | `manager_notifications` | 8 loại thông báo cho quản lý; lọc theo loại và đã xử lý hay chưa; mở thì tới màn tài năng liên quan |
| R09-03 | [YK2] 別紙A, §6-13 | SOURCE_BASELINE | `talent_notifications.kind`, `manager_notifications.kind` | 17 loại thông báo |
| R09-04 | 別紙A so với §6-8 5-1 (video xong), §6-9 7-7 (quá hạn duyệt) | CONFLICT | `*_notifications.kind` | Chức năng có thông báo mà 別紙A không liệt kê (A6 ở file 15) |
| R09-05 | [YK2] 確認46; S09-02 | PENDING | `manager_notifications.handled_at` | "Đã xử lý" dùng chung hay theo từng quản lý |
| R09-06 | [YK2] §11 | SOURCE_BASELINE | — | Thông báo đẩy không đảm bảo luôn tới; luôn có danh sách trong ứng dụng |

### EP10. Nền tảng chung

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R10-01 | [YK2] §5-6; [QA] No.41 (Close), CR-07 | CONFIRMED | `system_settings`, `ng_words` | Quản lý đổi: danh sách từ cấm, giờ nhắn, giờ nhắc, số ngày không đăng, dừng đăng toàn bộ |
| R10-02 | [YK2] §5-2 | SOURCE_BASELINE (đổi được) | `system_settings` | Mặc định: 8:00, 2 giờ trước giờ đăng, 3 ngày, 7 ngày, thứ Hai |
| R10-03 | [YK2] 確認18; [QA] No.25 (Open) | PENDING | `system_settings` | Giờ nhắn buổi sáng chung hay theo từng tài năng |
| R10-04 | [YK2] §9-4 | SOURCE_BASELINE | `manager_view_logs`, `activity_logs` | Ghi: xem thông tin; thao tác (duyệt, đổi trạng thái, dừng và mở lại đăng tự động…); xử lý (đăng bài, lấy số liệu, tạo video, kết quả thu tiền) |
| R10-05 | [YK2] §9-4, §9-3, §7-3; 確認55; [QA] No.29 | UNKNOWN / PENDING | — | Thời gian giữ nhật ký, sao lưu, thời gian giữ dữ liệu tài năng đã ngừng |
| R10-06 | [YK2] §10-2 | SOURCE_BASELINE | (mọi bảng) | Mã hóa đường truyền và dữ liệu lưu; không hiện khóa API |
| R10-07 | [YK2] §10-3 | SOURCE_BASELINE | — | Không lưu bằng chứng đồng ý của phụ huynh |
| R10-08 | [TECH], [SUPA] | Quyết định kỹ thuật | (mọi bảng) | FE không đọc DB; mọi bảng bật RLS, không mở quyền cho `anon`, `authenticated` |

## 4. Quy tắc nghiệp vụ trích được (dùng cho schema)

Chỉ các quy tắc CONFIRMED. Cột "Loại" phân biệt ràng buộc nghiệp vụ (từ yêu cầu) với ràng buộc kỹ thuật (để dữ liệu nhất quán).

| Mã | Quy tắc | Nguồn | Loại | Cách thể hiện |
|---|---|---|---|---|
| BR-01 | Một email chỉ gửi đơn một lần | R01-03 | Nghiệp vụ | UNIQUE trên email đã chuẩn hóa của `talent_applications` |
| BR-02 | Tài năng (loại `talent`) luôn đến từ một đơn đã duyệt | R01-01 | Nghiệp vụ | CHECK + FK `application_id` |
| BR-03 | Tài khoản công ty do quản lý tạo | R08-01 | Nghiệp vụ | CHECK: loại `office` thì phải có `created_by_manager_id` |
| BR-04 | Tài năng có ngày sinh; tài khoản công ty không cần | R01-02, R01-06 | Nghiệp vụ | CHECK |
| BR-05 | Trạng thái tài năng chỉ gồm 3 giá trị | R01-11 | Nghiệp vụ | CHECK |
| BR-06 | Trạng thái bài đăng chỉ gồm 6 giá trị | R06-01 | Nghiệp vụ | CHECK |
| BR-07 | Kết quả đăng ghi theo từng mạng, mỗi mạng một dòng cho một bài | R06-03 | Nghiệp vụ | UNIQUE (`post_id`, `platform`) |
| BR-08 | Trả lại phải có lý do | R06-05 | Nghiệp vụ | CHECK |
| BR-09 | Mỗi tài năng, mỗi ngày 3 chủ đề | R04-01 | Nghiệp vụ | CHECK vị trí 1–3 + UNIQUE (tài năng, ngày, vị trí) |
| BR-10 | Mỗi tài năng một mục tiêu cho mỗi mạng, mặc định 10.000 | R02-03 | Nghiệp vụ | UNIQUE + DEFAULT |
| BR-11 | Mạng chỉ gồm Instagram, TikTok, YouTube | [YK2] §2, §6-10 8-3 | Nghiệp vụ | CHECK |
| BR-12 | Hai loại video | R05-06 | Nghiệp vụ | CHECK |
| BR-13 | Lượt tạo video tính lúc gửi yêu cầu; dịch vụ lỗi thì không tính; tài khoản công ty được đếm nhưng không thu tiền | R05-07, R08-07 | Nghiệp vụ | Cột `is_counted` |
| BR-14 | Nhật ký xem không sửa, không xóa được | R01-14 | Nghiệp vụ | Thu hồi quyền UPDATE, DELETE + trigger chặn |
| BR-15 | Một danh sách từ cấm chung | R04-07 | Nghiệp vụ | Bảng không có khóa tài năng; UNIQUE theo từ |
| BR-16 | Hệ thống không giữ thông tin thẻ | R08-02 | Nghiệp vụ | Không có cột thẻ; chỉ mã tham chiếu của công ty thanh toán |
| BR-17 | Một người dùng Auth chỉ gắn với một tài năng hoặc một quản lý | (kỹ thuật) | Kỹ thuật | UNIQUE `auth_user_id` |
| BR-18 | Bài đã hẹn, đang chờ duyệt, đã đăng, lỗi đều phải có giờ đăng | (kỹ thuật, nhất quán với hình 5-1) | Kỹ thuật | CHECK |
| BR-19 | Nhắc gửi tư liệu 1 lần mỗi ngày | [YK2] §6-7 6-5 | Nghiệp vụ | `talent_notifications.event_key` theo (loại, tài năng, ngày) + UNIQUE |
| BR-20 | Tài khoản công ty không duyệt bài | [QA] No.20 (Close) | Nghiệp vụ | CHECK `chk_talents_office_no_approval` |

## 5. Điểm chưa rõ ảnh hưởng tới schema

Phân nhóm theo mục 5 của đề bài: A không ảnh hưởng phần đã xác nhận; B có thể đổi schema sau này; C chưa xác định được thực thể hoặc quan hệ, nên **BLOCKED** (chặn).

| Mã | Nội dung | Nhóm | Thực thể bị ảnh hưởng |
|---|---|---|---|
| U-01 | Chu kỳ thu, ngày chốt, ngày bắt đầu tính phí, công ty thanh toán (R08-06) | C | Bảng hóa đơn tháng: **BLOCKED** |
| U-02 | Đơn giá video, giá khi đổi giữa tháng (R05-11) | B | `video_generations` (có thể thêm cột giá) |
| U-03 | Bài xin duyệt lại là cùng bài hay bài mới (R06-08) | B | `posts`, `post_approval_decisions` (cần request/revision hoặc bài mới theo quyết định; chưa phê duyệt) |
| U-04 | Danh sách trạng thái bài đăng (R06-02) | B | `posts.status` |
| U-05 | Mỗi mạng một hay nhiều tài khoản (R06-10) | B | `social_accounts` (chưa đặt UNIQUE) |
| U-06 | Giá trị kết quả theo từng mạng ngoài thành công, thất bại (bỏ qua vì chưa kết nối, không có video) | B | `post_deliveries.provider_state` |
| U-07 | Các chỉ số lấy được từ Upload-Post (R07-02) | A | `post_metric_snapshots.metrics` dùng JSONB |
| U-08 | Hội thoại riêng tư (R01-15) | A | Không đổi bảng; đổi quyền truy cập |
| U-09 | Thời gian giữ dữ liệu và nhật ký (R10-05) | B | Cần hợp đồng dọn/ẩn danh, xử lý FK và log append-only |
| U-10 | "Đã xử lý" dùng chung hay theo từng quản lý (R09-05) | B | `manager_notifications` |
| U-11 | Danh sách loại thông báo (R09-04) | B | `*_notifications.kind` (không đặt CHECK) |
| U-12 | Giờ nhắn buổi sáng theo từng tài năng (R10-03) | B | Có thể thêm cột ở `talents` |
| U-13 | Video tự làm thành bản nháp mỗi ngày (R05-05) | B | `media_assets` (giá trị `source` mới), có thể thêm thứ tự hàng đợi |
| U-14 | Đồng ý điều khoản (R01-04) | B | `talent_applications` (cột thời điểm đồng ý, phiên bản điều khoản) |
| U-15 | Nhóm tài năng, màn chỉ thị AI, duyệt theo nhóm (CR-17〜CR-19) | C | **BLOCKED**, chờ [QA] No.50 |

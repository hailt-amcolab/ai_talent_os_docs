# 01. Phân loại yêu cầu và ma trận truy vết

> **Cập nhật quyết định 25/11/2026:** Đã đồng bộ nhóm quyết định đã rõ vào nội dung tài liệu. Phân biệt yêu cầu nguồn, SQL hiện có và thiết kế đích chưa có migration. Cấu trúc repository: 13 migration/53 bảng ứng dụng; chưa kiểm DB live. Các ghi chú ngày 18/11 và 23/11 giữ vai trò lịch sử ở phần đã được thay. [Hồ sơ thay đổi](decisions-update-2026-11-25.json); [review và phần còn thiếu](08_full_review_2026-11-25.md).

> **Rà soát 23/11/2026:** Đối chiếu QA/KS hiện hành và bộ `23112026`; xem [kết quả tác động DB](06_extensibility_review.md) và [danh mục nguồn](../TAI_LIEU_NGUON.md). Tách schema trong repository, quyết định nguồn và đề xuất thiết kế. Lần rà này chỉ cập nhật tài liệu, chưa áp migration hoặc kiểm tra database đang chạy; không cấp phê duyệt nghiệp vụ, thương mại hay release.

> **Cập nhật 18/11/2026:** Phạm vi triển khai đợt 1 do [07_implementation_scope_and_rules.md](07_implementation_scope_and_rules.md) quyết định; bảng dưới là nguồn truy vết. Trạng thái CONFIRMED không có nghĩa là được làm ngay: bảng đánh dấu "(chặn ghi)" đang bị trigger chặn vì luồng chưa chốt (`07` §3). Không coi nội dung chỉ có ở DOCX 0.1 là khách đã xác nhận.

Bản 1.3 · 25/11/2026. Giữ mã R/BR/U để truy vết; các ràng buộc vật lý cũ không tự trở thành yêu cầu hiện hành. Repository có 13 migration/53 bảng ứng dụng; trạng thái áp thực tế chưa kiểm tra lại.

## 1. Nguồn đã đọc

| Ký hiệu | Tài liệu | Vai trò |
|---|---|---|
| [YK3] | `source_requiments/24112026/AI育成OS_要件定義書.docx`, bản 0.3 ngày 24/11 | Luồng và yêu cầu hiện hành; không tự thay quyết định cùng chủ đề tại QA/KS |
| [YK2] | `AI育成OS_概要要件定義書_v2.docx` (0.1版, bản định nghĩa yêu cầu) | Nguồn chính. Đọc §1–§14 và 別紙A (phụ lục A, danh sách thông báo) |
| [QA] | `AI-Talent-OS_Q&A表.xlsx` snapshot kiểm 25/11/2026, đủ 5 sheet (Q&A, yêu cầu bổ sung và các sheet liên quan) | Trạng thái Close/Open của từng câu; CR01–14 hiện hành; CR cũ chỉ dùng kèm snapshot lịch sử |
| [KS] | `要件定義確認シート_AI育成OS.xlsx` (bảng xác nhận yêu cầu), snapshot kiểm 25/11/2026, đủ 5 sheet; cột I ngày 17/11, cột K ngày 20/11 và sheet `20261120` cột F; quyết định mới chỉ thay nội dung cùng chủ đề | Câu trả lời của khách cho 確認1–56; mới hơn [QA] |
| [C-01] | `SCD/EP10…/C-01_Bo_trang_thai.md` | Danh sách trạng thái bài đăng chép từ hình 5-1 của [YK2] (phần chữ của docx không có hình) |
| [P07] | `Phan_tich/07_Du_lieu_va_ERD.md` | Phân tích thực thể ban đầu; chỉ để đối chiếu, không làm căn cứ |
| [SUPA] | `agent_spec/supabase-db-auth-spec/` bản 2.0 (thay bản 1.3) | Quyết định kỹ thuật về xác thực (không phải yêu cầu của khách) |
| [TECH] | `agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md` | Quyết định kỹ thuật: Supabase Postgres, Prisma, FE không đọc DB |

## 2. Cách phân loại

[YK2] §1-2 ghi rằng tài liệu được viết từ yêu cầu của アデッソ và giả định của bên soạn (弊社の想定). Điểm nào cần khách xác nhận thì đánh số 確認N (mục cần xác nhận); câu có dấu ※N trong thân tài liệu thuộc 確認N đó. Bảng xác nhận đã có trong thư mục Q&A; đọc trực tiếp các ô quyết định và đối chiếu toàn bộ sheet, không chỉ trạng thái Close. QA101 và KS sheet `20261122`/`アクション一覧` cập nhật các quyết định cùng chủ đề; không coi mọi mục còn Open là chưa có câu trả lời. Từ đó:

| Trạng thái | Điều kiện |
|---|---|
| **CONFIRMED** | Có phát biểu quyết định truy vết được đúng phạm vi, phiên bản và locator; đối chiếu QA/KS mới nhất không có thay thế/xung đột chưa xử lý. Close riêng lẻ không chứng minh khách duyệt; nhãn này không thay G7 hoặc phê duyệt triển khai |
| **SOURCE_BASELINE** | Nội dung chỉ có trong [YK2] 0.1; không gắn 確認 không tự chứng minh đã được khách xác nhận |
| **PENDING** | Nội dung gắn ※N hoặc 確認N mà [QA] chưa đóng; câu [QA] đang mở; CR-23 (chờ [QA] No.50); mục [KS] chỉ có ý kiến khách ở cột G, chưa có quyết định |
| **CONFLICT** | Hai nguồn nói khác nhau và chưa có quyết định |
| **UNKNOWN** | [YK2] ghi rõ là chưa quyết: "設計の中で決め" (quyết khi thiết kế), "最終版に書きます" (ghi ở bản cuối), "実際のアカウントにつないで確かめ" (thử với tài khoản thật), "決済代行会社が決まった時点で決めます" (quyết khi chọn xong công ty thanh toán) |

Các quy ước bổ sung:
1. **Con số ở [YK2] §6** (giới hạn ký tự, số lần, thời gian) đều là giả định: §6 ghi "本章の入力の制限、回数、時間などの数値は、弊社の想定です" (các con số trong chương này là giả định của bên soạn). Vì vậy **không** đưa vào ràng buộc CHECK chính thức; chỉ ghi là PROPOSED (đề xuất).
2. **Giá trị mặc định của cài đặt** ở [YK2] §5-2 cũng là giả định, nhưng §5-6 xác nhận quản lý tự đổi được. Vì vậy chúng được dùng làm DEFAULT (giá trị mặc định, sửa được), không dùng làm ràng buộc.
3. **Đã nhận KS:** đối chiếu cả cột I/K, sheet `20261120` và QA đủ 5 sheet. Nguồn UI-M20 (20/11), ISS22-D/P và ADV22 (22/11) trong đợt `23112026` là đề nghị chuẩn bị họp, không tự thay quyết định trước hoặc đóng QA. Locator mới và hash nằm ở `review-2026-11-23.json`; các nguồn SD-T18/SD-M18, SD-T19/SD-M19 dùng mã màn của chính phiên bản đó.
4. **[QA] Close ngày 15/11** là AMCOLAB tự chốt theo [YK2], khách vẫn có thể phản đối ("ご意見がある場合はご連絡ください"). Chỉ dùng phần không bị comment/xung đột đặt lại (phạm vi ở `07` §2); rủi ro ghi ở `06_extensibility_review.md` §5.

## 3. Ma trận truy vết yêu cầu

Cột "Thực thể liên quan" dùng tên bảng ở `04_database_schema.md`. Mã module theo `Phan_tich/16_Chia_module_phat_trien.md` (EP01–EP10).

### EP01. Danh tính và quyền truy cập

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R01-01 | [YK2] §6-1 1-4; UC-01; [QA] No.11 (Close), CR-01 | CONFIRMED | `talent_applications`, `talents` | Tài năng tự gửi đơn trong ứng dụng; quản lý duyệt hoặc từ chối; chỉ người được duyệt mới đăng nhập |
| R01-02 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talent_applications` | Đơn gồm: tên (nghệ danh hoặc tên thật), email, ngày sinh |
| R01-03 | [QA] `Q&A!G65:H65`; [YK3] P127 | PARTIALLY_RESOLVED | `talent_applications` | QA65 đã trả lời email chờ/từ chối báo đã tồn tại; YK3 P127 mô tả gửi lại khi chờ thì nhắc Manager. Không đổi UNIQUE hoặc coi mọi trường hợp đã đóng; tái đăng ký sau ended tiếp tụcQA69. |
| R01-04 | [YK3] P116/P136/P148; 確認57 | SOURCE_REQUIREMENT (đã rõ hành vi đồng ý) | `talent_applications` (thiết kế đích U-14) | Đơn phải ghi nhận đồng ý điều khoản. Cách mở văn bản còn確認57; không chờ việc đó để thiết kế consent time/version/ref. Chưa có cột trong SQL. |
| R01-05 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talents.is_approval_required` | Lúc duyệt, quản lý đặt "có cần duyệt bài không" |
| R01-06 | [YK2] §3-1; 確認2 thuộc [QA] No.18 (Close); [KS] 確認2 | CONFIRMED | `talents.birth_date` | Hệ thống tính tuổi từ ngày sinh và hiện nhãn **dưới 18 tuổi** để tham khảo (không dùng mốc 未成年 theo luật); không lưu cờ |
| R01-07 | [YK2] §6-1 1-4 (đăng nhập email và mật khẩu, mật khẩu tạm, đặt lại) | SOURCE_BASELINE | Supabase `auth.users`; `app_private.auth_principals.must_change_password` | Mật khẩu do Supabase Auth giữ, không nằm trong bảng của ứng dụng; cờ buộc đổi mật khẩu tạm ở `auth_principals` |
| R01-08 | [YK2] §6-1 1-4 (8 ký tự, 5 lần sai khóa 15 phút, giữ 30 ngày) | PENDING (con số §6) | `app_private.password_lock_state`, `auth_login_identifiers`, `auth_rate_buckets`, `auth_session_registry.absolute_expires_at` | [QA] No.25 xác nhận giữ giá trị theo §6-1 nhưng câu vẫn Open. Con số đặt ở cấu hình BE, không viết vào CHECK ([SUPA] §7.2) |
| R01-09 | [YK2] §6-2 1-6; [QA] No.5 (Close), CR-13 | CONFIRMED | `managers`, `app_private.auth_principals` | Một loại quyền; quản lý thêm và vô hiệu hóa quản lý; người bị vô hiệu không đăng nhập được ngay |
| R01-10 | [YK2] §6-2 1-6, §10-1 | SOURCE_BASELINE | Supabase `auth.mfa_factors`; `app_private.auth_session_registry` (bằng chứng MFA theo phiên), `auth_challenges`, `auth_mfa_enrollments` | Quản lý đăng nhập hai bước bằng ứng dụng xác thực; factor do Supabase giữ; không thao tác 30 phút phải xác thực lại |
| R01-11 | [KS] `確認事項!K116`; [YK3] P661/P667/P677 | CONFIRMED (4 trạng thái nghiệp vụ) | `talents.status` (P-21) | 利用前・利用中・一時停止・利用終了. Tạm dừng vẫn thu phí tháng, dừng lời nhắc và khôi phục khi tiếp tục. SQL còn 3 giá trị; token paused và history là thiết kế đích, chi tiết login/lịch vẫn tách riêng. |
| R01-12 | [YK2] §6-2 7-3 | SOURCE_BASELINE | `talents`, `posts` | Chuyển sang 利用終了: dừng nhắn tin, dừng thu phí, hủy bài đã hẹn, không đăng nhập được |
| R01-13 | [YK3] P158–160/P638; [QA] No.52/53/64/69 | SOURCE_REQUIREMENT (activation) / PENDING (kỳ thu, tái đăng ký) | `talents.status`, `billing_accounts` | Đăng ký phương thức thanh toán hoàn tất thì chuyển 利用中; profile chưa đủ thì chưa đề xuất bài. Không còn chờ chốt thời điểm chuyển cơ bản; provider callback/readiness do đội thiết kế, kỳ thu và tái đăng ký giữ đúng phần còn mở. |
| R01-14 | [YK2] §6-2 7-6, §3-2, §9-4; [QA] No.21 (Close) | CONFIRMED | `manager_view_logs` | Ghi ngày giờ, quản lý, tài năng khi quản lý mở thông tin, hội thoại, kết quả; lọc theo khoảng thời gian và tài năng; không sửa được |
| R01-15 | [QA] No.7 `Q&A!H8`; [KS] 確認42 | CONFIRMED (phạm vi xem) | Quyền truy cập và `manager_view_logs` | Manager xem toàn bộ hội thoại; Talent được thông báo trước. Ý kiến riêng tư cũ đã rút; không tiếp tục hỏi lại. Chưa chứng minh guard/audit đã triển khai |
| R01-16 | [YK2] §6-1 6-2 | SOURCE_BASELINE | (suy ra từ `billing_accounts` (chặn ghi), `social_accounts` (chặn ghi), `push_subscriptions`) | Hướng dẫn lần đầu theo thứ tự, dừng giữa chừng thì lần sau tiếp tục. Không cần bảng riêng; xem 02 §4 |
| R01-17 | [KS] 確認56 | CONFIRMED | `talents.status` (P-18) | `ended` (利用終了) không chuyển lại trạng thái khác |
| R01-18 | [YK3] P305; [QA] `追加要件` CR02 hiện hành; [KS] `20261120!F20` | SOURCE_REQUIREMENT / quyết định phạm vi CR02 | `media_assets.uploaded_by_manager_id`, `video_generations.requested_by_manager_id` | Manager gửi media/tạo video thay Talent theo phạm vi nguồn hiện hành. Rút giả định mọi thao tác gửi thay chỉ được office; quyền adopt/đăng/duyệt là các thao tác khác. |

### EP02. Thông tin tài năng

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R02-01 | [YK2] §6-4 2-2 | SOURCE_BASELINE | `talents.onedrive_folder_id` | Tạo thư mục OneDrive khi tài năng đăng ký thanh toán; tài khoản công ty: khi tạo |
| R02-02 | [QA] `Q&A!G101:H101` (24/11); [YK3] P728–735/P885; AI Core §6 | CONFIRMED (DB nghiệp vụ) / INTERNAL_DESIGN (export) | `agent_talent_profiles`, `agent_talent_profile_versions`, `agent_profile_exports` | Hồ sơ nghiệp vụ lưu DB, agent truy cập qua service/tool kiểm quyền; OneDrive là bản xuất theo kiến trúc hiện hành. YK3 còn mô tả OneDrive cần đồng bộ đúng chủ đề. Không suy byte media nằm trong Postgres. |
| R02-03 | [YK2] §6-4 2-4, §7-1; [QA] No.14 (Close) | CONFIRMED | `follower_goals` (chặn ghi) | Mục tiêu người theo dõi **theo từng mạng**, mặc định 10.000, có hạn đạt; quản lý nhập ở màn quản trị; hiển thị ngay |
| R02-04 | [QA] No.14 `Q&A!H15` | RESOLVED (ý tổng/theo mạng) | `follower_goals` (chặn ghi) | Phản hồi hiện hành xác định mục tiêu theo từng SNS; không giữ mâu thuẫn tổng 3 mạng làm điều kiện chặn. Ngưỡng thông báo phần trăm vẫn chưa chốt |
| R02-05 | [YK2] §6-4 7-1 | SOURCE_BASELINE | `talents`, `follower_goals` (chặn ghi), `social_accounts` (chặn ghi), `coach_messages` | Màn chi tiết: thông tin, mục tiêu, trạng thái kết nối mạng xã hội, hội thoại. Danh sách tìm theo tên, lọc theo trạng thái và số ngày không đăng |
| R02-06 | [QA] `Q&A!G101:H101`; [YK3] P296/P565/P709–722 | CONFIRMED (Challenge và tiến độ trong phạm vi) | Challenge/progress thiết kế đích (P-17) | AI đề xuất theo Talent, Talent nhận/từ chối, không cần Manager duyệt; ghi tiến độ vào DB. Còn việc đội thiết kế data contract/vòng đời và cách đo; không coi thiếu bảng là chưa duyệt chức năng. |
| R02-07 | [QA] No.22 (Close) | CONFIRMED | `activity_logs` | Lỗi đọc tệp OneDrive xử lý như lỗi kỹ thuật; hiện tình trạng đọc ở màn chi tiết |
| R02-08 | [QA] No.54 | PENDING | — | Cách biết quản lý đã nhập xong thông tin tài năng |
| R02-09 | [YK3] P728–735; [QA] No.54/92 | SOURCE_REQUIREMENT (5 trường) / PENDING (readiness) | `agent_talent_profiles`, history; P-24 | Profile, direction, hobbies/skills, future goal, tone đã được mô tả; SQL agent profile allowlist có 5 trường. Ảnh/URL từ UI-M20 là đề nghị riêng; readiness vẫn cần tiêu chí, không giữ toàn bộ trường nhập ở trạng thái chưa rõ. |
| R02-10 | [YK3] P679/P704–705/P783–797; [QA] No.99 | SOURCE_REQUIREMENT (N:N category) / PENDING (xung đột đa category) | Category/membership/assignment thiết kế đích P-15 | Một Talent có nhiều category; category có tên/màu/order. Talent > category > global; chỉ còn ưu tiên giữa các category xung đột chưa chốt. Routing theo người phụ trách không giới hạn quyền mọi Manager xem. |
| R02-11 | [QA] `Q&A!G101:H101`; [YK3] P705–707/P741–764 | CONFIRMED (phạm vi) / SOURCE_REQUIREMENT (chi tiết) | `agent_instructions`, `agent_instruction_versions`, P-15/P-17 | Ba scope global/category/Talent, tám situation, thử trước lưu, enable/history/restore. SQL đã có global/Talent và history; category bị chặn vì chưa có catalog. M-17 thuộc phạm vi; không ghi chưa có bảng toàn bộ. |

### EP03. AI coach

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R03-01 | [YK3] P284–289/P612; [QA] No.7/101 | SOURCE_REQUIREMENT / CONFIRMED (agent) | `agent_conversations`, `agent_entries`; `coach_messages` legacy | Agent dùng conversation/entry; Manager xem hội thoại Talent theo quyền và audit, Talent chỉ đọc của mình. Không ghi trùng transcript vào cả entry và coach_messages. |
| R03-02 | [YK2] §6-5 3-4 (1.000 ký tự mỗi lần nhập) | PENDING (con số §6) | `coach_messages` | Chỉ đề xuất CHECK độ dài |
| R03-03 | [KS] `20261122!G17:I17`; [YK3] P578 | CONFIRMED (không cảnh báo Manager) | Hội thoại; không tạo notification tư vấn nghiêm trọng | Không gửi cảnh báo Manager; hội thoại vẫn lưu và Manager xem được. Chỉ dẫn hỗ trợ qua instruction; không tự thêm kho nhạy cảm hoặc bảo đảm AI phát hiện đúng. QA93 chỉ giữ phần thực sự chưa được trả lời. |
| R03-04 | [QA] No.17; `Q&A!G101:H101`; AI Core §4.1 | CONFIRMED (bên chịu phí) / INTERNAL_DESIGN (ledger) | `ai_usage_events` legacy, `agent_steps` model calls | Adesso chịu phí token agent, tách ChatGPT và phí thu Talent. Hợp nhất legacy + step usage theo call, không cộng tổng attempt lần nữa; giá chưa biết là NULL, không 0. |
| R03-05 | [YK2] §6-5 3-9; §5-2 | SOURCE_BASELINE | `system_settings`, `talent_notifications`, `manager_notifications` (chặn ghi) | 3 ngày không đăng thì AI nhắn tài năng, 7 ngày thì báo quản lý (số ngày đổi được) |
| R03-06 | [YK2] §6-5 3-8 | SOURCE_BASELINE | `system_settings.weekly_review_weekday` | Tổng kết tuần vào thứ cấu hình được (mặc định thứ Hai) |
| R03-07 | [YK2] §6-5 3-7; [QA] No.14, No.42 (Close), CR-08 | CONFIRMED | `follower_goals.achieved_at` (chặn ghi), `talent_notifications`, `manager_notifications` (chặn ghi) | Đạt mục tiêu: báo tài năng và quản lý |
| R03-08 | [QA] No.14 (đề xuất mốc 25/50/75%) | PENDING | — | Khách xác nhận trên màn thật |
| R03-09 | [QA] `Q&A!G101:H101`; [YK3] P397–398; AI Core §6 | CONFIRMED (lưu DB) / INTERNAL_DESIGN (memory) | Memory/insight thiết kế đích P-17; OneDrive export | Điều học được cần provenance và dữ liệu DB của từng Talent. Không còn quy tắc cấm lưu DB; tách suy luận AI khỏi profile Manager, chưa có bảng memory canonical. |
| R03-10 | [YK2] §5-5 (nói số ngày đăng liên tục); 確認22 | PENDING | (tính từ `post_deliveries` (chặn ghi)) | Cách đếm "ngày đăng liên tục" |

### EP04. Nội dung bài đăng

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R04-01 | [YK2] §5-3, §6-6 4-1; [QA] No.9 (Close), CR-02 | CONFIRMED | `theme_suggestions` | Mỗi sáng 3 chủ đề gợi ý cho từng tài năng |
| R04-02 | [YK2] §6-6 4-1 | SOURCE_BASELINE | `posts` | Bản nháp gồm chú thích, hashtag, hướng dẫn chụp; video thì thêm kịch bản; tạo bao nhiêu tùy tài năng |
| R04-03 | [YK2] §5-3 | SOURCE_BASELINE | `posts`, `post_deliveries` (chặn ghi) | Cùng ảnh, video và chữ đăng lên cả 3 mạng |
| R04-04 | [KS] `確認事項!K65` (20/11); DEC-0001 | CONFIRMED (không giới hạn lượt) | `posts.revised_from_post_id`, `posts.caption` | Bỏ giới hạn 2 lần đã bị thay thế. Không tạo CHECK/counter giới hạn; ghi revision để truy vết là thiết kế nội bộ, phải ràng buộc nội dung được duyệt khi mở luồng đăng |
| R04-05 | [YK2] §6-6 4-3 | SOURCE_BASELINE | `posts`, `post_media` | Chỉ chấp nhận bản nháp có ảnh hoặc video; chấp nhận thì hẹn giờ |
| R04-06 | [YK2] §6-6 4-3, §5-3 | SOURCE_BASELINE | `posts.approval_requested_at` | Tài năng cần duyệt chọn có gửi duyệt hay không khi chấp nhận |
| R04-07 | [KS] `20261122!G4:I4`; [YK3] P688; [QA] No.96 | CONFIRMED (AI sửa, không duyệt lại) / PENDING (nhánh còn lại) | `ng_words`, `posts`; P-23/P-26 | AI sửa rồi đặt lịch, không Manager sửa và không Talent xác nhận lại. Không coi UI/đề nghị 22/11 là nhánh ngang quyền. Vòng sửa thất bại, tương tác duyệt công việc và NG đổi sau đặt lịch giữ riêng. |
| R04-08 | [YK3] P355–381/P688; [QA] No.57/58/96 | PARTIALLY_RESOLVED | `posts`, approval/revision thiết kế đích | Đã rõ AI sửa NG, không Manager sửa. Còn tương tác với bài công việc đã duyệt, lỗi sửa và deadline; không hỏi lại ai sửa. |
| R04-09 | [KS] `20261122!G16:I16`; [YK3] P250 | CONFIRMED (giờ theo từng SNS) | `post_deliveries` plan thiết kế đích; `posts.scheduled_at` legacy | AI chọn theo khung giờ chỉ thị/metrics, lệch vài phút giữa Talent, chia giờ theo SNS. Một timestamp ở posts chưa đủ; thuật toán/jitter và thay lịch hiện có là việc thiết kế riêng. |
| R04-10 | [QA] No.55, No.56 | PENDING | `posts`, `theme_suggestions` | Thời hạn của chủ đề và bản nháp; giờ của bài thứ hai trong ngày |
| R04-11 | [YK3] P247/P322/P436–457/P545; [KS] 確認19/25 | SOURCE_REQUIREMENT (hai trục) | Review preference + autopost period/media thiết kế đích P-12 | Daily/autopost có thể cùng dùng; confirm/no-confirm là preference riêng áp cả hai. Không dùng một enum auto/confirm thay cả hai. Không Manager duyệt autopost/office theo P359; nhánh còn mở theo QA70/83. |
| R04-12 | [KS] 確認14, 15 | CONFIRMED | (chỉ thị cho AI) | Nhịp đề xuất: hằng ngày, vài ngày một lần hoặc mỗi tuần, chỉnh qua chỉ thị cho AI |

### EP05. Tư liệu và video AI

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R05-01 | [YK2] §6-7 6-3; CR-09 | SOURCE_BASELINE | `media_assets` | Tài năng gửi ảnh, video; quản lý gửi thay được |
| R05-02 | [QA] No.8 `Q&A!G9/H9` (19/11) | CONFIRMED (hướng lưu) / PENDING (tích hợp) | `media_assets` (P-24) | Ảnh/video có thể lưu Supabase hoặc OneDrive; schema hiện thiên OneDrive cần review tham chiếu lưu trữ, quyền truy cập và vòng đời URL |
| R05-03 | [QA] No.8 `Q&A!G9/H9` | PENDING (URL/quyền) | `media_assets.temp_object_path` | Không còn quy tắc tuyệt đối Supabase chỉ là nơi tạm. URL cho provider, thời hạn, dọn tệp và quyền Microsoft cần kiểm kỹ thuật |
| R05-04 | [YK2] §6-7 6-3, §9-2 | UNKNOWN | — | Định dạng, dung lượng tối đa, tổng dung lượng: "設計の中で決め" |
| R05-05 | [KS] `確認事項!K73`; `20261120!F18:F19` | CONFIRMED (chọn theo chủ đề) | Media của khoảng đăng (P-12) | Chọn tư liệu phù hợp chủ đề, không FIFO/1 video mỗi ngày; không tự sinh ảnh/video AI trong autopost; dùng tư liệu có sẵn |
| R05-06 | [KS] `20261122!G6:I9`; [YK3] P506–509 | CONFIRMED (hướng video cơ bản) / PENDING (thông số) | `video_generations.video_type` legacy; P-04 | Một dạng cơ bản làm ảnh Talent chuyển động; video cầu kỳ làm ngoài rồi nhập. short/slide chỉ là CHECK legacy, không là danh mục đích cuối. Độ dài/chất lượng và số ảnh còn確認61/62. |
| R05-07 | [YK3] P475/P485/P644; [QA] No.1/62 | PARTIALLY_RESOLVED / CONFLICT (thời điểm ghi nhận) | `video_generations.is_counted` legacy; usage ledger đích | Đã rõ tạo lại tính lượt và video lỗi không tính. P475 còn chờ POC, P485 đếm lúc request, P644 loại lỗi; chưa chốt vòng provisional/adjustment. Không coi is_counted là ledger tài chính hoàn chỉnh. |
| R05-08 | [YK2] §6-8 5-1 | SOURCE_BASELINE | `video_generation_inputs` (chặn ghi) | Tài năng chọn ảnh làm nguồn |
| R05-09 | [YK2] §6-8 5-3 | SOURCE_BASELINE | `video_generations` (chặn ghi), `media_assets` | Xem video, chọn dùng, tạo lại hoặc bỏ |
| R05-10 | [YK2] §5-7, §6-8 5-5 | SOURCE_BASELINE | `media_assets.source` | Video do AI tạo phải ghi rõ khi đăng |
| R05-11 | [YK3] P463/P483/P643/P803–809; [QA] No.62 | SOURCE_REQUIREMENT (nơi đặt giá) / PENDING (giá lịch sử) | `system_settings` giá ước tính thiết kế đích; video price snapshot | Manager đặt giá ước tính tại cài đặt chung. Không còn chờ ai/nơi đặt; giá thực thu, hiệu lực khi đổi và điều chỉnh kỳ giữ No.62/provider. |

### EP06. Duyệt và đăng bài

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R06-01 | [YK2] §5-1 hình 5-1; [C-01] | SOURCE_BASELINE | `posts.status` | 6 trạng thái: 投稿案, 承認待ち, 予約済み, 投稿済み, 失敗, 取り消し |
| R06-02 | [QA] No.51 (Open) | CONFLICT | `posts.status` | AMCOLAB tạm ghép 8 trạng thái từ phần chữ, khác hình 5-1 |
| R06-03 | [YK2] §5-1, §6-10 8-3 | SOURCE_BASELINE | `post_deliveries` (chặn ghi) | Thành công hay thất bại ghi theo từng mạng |
| R06-04 | [YK2] §6-10 8-3 | SOURCE_BASELINE | `post_deliveries` (chặn ghi) | Bài không có video thì không đăng YouTube; mạng chưa kết nối thì không đăng |
| R06-05 | [YK2] §6-9 7-7; [QA] No.35 (Close), CR-03 | CONFIRMED | `post_approval_decisions` (chặn ghi) | Duyệt hoặc trả lại kèm lý do; tài năng thấy lý do |
| R06-06 | [KS] `確認事項!K77/K93`; `20261120!F11` | CONFIRMED (nơi nhận yêu cầu duyệt) | `post_approval_decisions`, P-15/P-16 | Yêu cầu duyệt tới Manager phụ trách từng Talent. Mọi Manager vẫn xem/cập nhật Talent; không suy ra chỉ người nhận được xử lý khi quyền xử lý chưa chốt |
| R06-07 | [YK2] §6-9 7-7, §5-3 | SOURCE_BASELINE | `posts.cancel_reason` | Chưa duyệt tới giờ đăng thì không đăng; báo tài năng và quản lý |
| R06-08 | [QA] No.58 (Open) | PENDING | `posts`, `post_approval_decisions` (chặn ghi) | Xin duyệt lại là cùng một bài hay bài mới |
| R06-09 | [YK2] §6-10 8-2 | SOURCE_BASELINE | `talents.posting_service_profile_ref`, `social_accounts` (chặn ghi) | Đăng ký tài năng với dịch vụ đăng bài; tài năng tự kết nối; hiện trạng thái kết nối |
| R06-10 | [YK2] §6-10 8-2 ※10; [QA] No.23; CR-20; [KS] 確認10 | CONFIRMED | `social_accounts` (chặn ghi) | Mỗi mạng **một** tài khoản (P-01 làm được khi mở luồng); tài khoản của nhóm (ユニット) coi là tài khoản công ty; CR-20 không làm |
| R06-11 | [YK3] P386–431; [KS] K87 | CONFIRMED (không tự đăng lại) / PENDING (đích retry) | `post_deliveries`, attempts/effects thiết kế đích P-23 | Talent/Manager có thao tác đăng lại ở màn tương ứng; OS không tự đăng lại bài failed. Lỗi SNS/mạng không báo Manager. Retry truyền tải cùng effect khác businessretry; QA59 còn đích SNS và thời điểm. |
| R06-12 | [KS] `確認事項!K85`; `20261120!F33` | CONFIRMED (bỏ nút dừng toàn bộ) | Cột global hiện có; dừng từng Talent | Không làm nút dừng autopost toàn hệ thống; vẫn dừng từng Talent. Dừng hệ thống vận hành không bảo đảm hủy job đã gửi provider; không tự DROP cột hoặc đánh đồng với 一時停止 |
| R06-13 | [KS] `確認事項!K84`; `20261120!F12` | CONFIRMED | `posts`, P-22 | Talent hủy lịch do mình đặt; Manager cũng hủy. Cần lưu người hủy, kết quả provider, chống callback trễ; chưa triển khai quyền mới qua tài liệu |
| R06-14 | [YK2] §6-10 9-1, UC-12; [QA] No.20 (Close) | CONFIRMED | `talents.account_type`, `posts.adopted_by_manager_id` | Tài khoản công ty: quản lý đăng nhập lại từng tài khoản và đăng như tài năng |
| R06-15 | [YK2] §6-10 8-4, §9-5 | UNKNOWN | — | Nội dung biện pháp chống khóa tài khoản |
| R06-16 | [QA] No.59, No.60, No.61 | PENDING | `posts` | Hẹn lại bài lỗi; chấp nhận khi đang dừng; báo tài năng khi bài bị hủy |
| R06-17 | [KS] `確認事項!K77/K93`; [QA] No.87/88 | CONFIRMED (duyệt theo Talent) / PENDING (vận hành phân công) | P-15/P-16 | Người nhận duyệt là Manager phụ trách từng Talent; cách phân công, đổi người khi vô hiệu và người nhận các loại thông báo khác còn mở |

### EP07. Kết quả và phân tích

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R07-01 | [YK2] §6-11 8-7 | SOURCE_BASELINE | `follower_snapshots` (chặn ghi), `post_metric_snapshots` (chặn ghi) | Mỗi ngày 1 lần lấy số liệu từng bài và số người theo dõi từng mạng; lỗi thì lấy ở lần sau |
| R07-02 | [YK2] §6-11 8-7 | UNKNOWN | `post_metric_snapshots.metrics` (chặn ghi) | Lấy những chỉ số nào: thử với tài khoản thật rồi ghi ở bản cuối |
| R07-03 | [QA] `Q&A!G101:H101`; [YK3] P529/P885; AI Core §6 | CONFIRMED (DB) / INTERNAL_DESIGN (export) | `follower_snapshots`, `post_metric_snapshots`; export | OS lưu số liệu chuẩn hóa DB để UI/agent dùng; export OneDrive là tích hợp, không dùng file làm nguồn ghi đè DB. |
| R07-04 | [YK2] §6-11 3-10, 6-7; [QA] No.31 (Close) | CONFIRMED | `follower_snapshots` (chặn ghi), `follower_goals` (chặn ghi), `post_metric_snapshots` (chặn ghi) | Hiện số liệu từng bài, ngày đăng liên tục, diễn biến người theo dõi, phần còn thiếu tới mục tiêu |
| R07-05 | [YK2] §6-11 8-1 | SOURCE_BASELINE | (tính từ số liệu) | Đủ số liệu thì AI chọn giờ đăng theo từng tài năng |
| R07-06 | [YK2] §6-11 8-9 (ưu tiên 低 – thấp) | SOURCE_BASELINE (chức năng) / NOT STARTED (thiết kế) | — | Khung giờ tương tác; ưu tiên thấp, chưa thiết kế |

### EP08. Thu phí

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R08-01 | [YK2] §5-4, §6-3 1-2; [QA] No.47, No.48 (Close), CR-11 | CONFIRMED | `talents.account_type` | Mọi tài năng gửi đơn đều trả phí; tài khoản công ty là loại riêng, không thu tiền; tài năng không tự đổi loại |
| R08-02 | [YK2] §6-3 1-1, §7-2, §10-2 | SOURCE_BASELINE | `billing_accounts` (chặn ghi) | Đăng ký thanh toán trên trang của công ty thanh toán; hệ thống không giữ thông tin thẻ |
| R08-03 | [KS] `アクション一覧!A17:G17` No.16; [YK3] P620/P623 | SOURCE_DECISION_REPORTED (Square) / TEAM_PROVIDER_CHECK | `billing_accounts`; adapter provider | Nguồn thuật lại khách chọn Square qua điện thoại sau họp; GMO là ứng viên cũ. Chưa chứng minh ký hợp đồng hoặc Square hỗ trợ nhà mạng/trả trước/biến phí; đội/provider kiểm, không hỏi lại chọn cổng như chưa có hướng. |
| R08-04 | [YK2] §5-4; [QA] No.3, No.46 (Close), CR-12 | CONFIRMED | `video_generations` (chặn ghi) | Hóa đơn tháng = phí tháng + phí tạo video; không lượt miễn phí, không trần; tháng đầu thu đủ |
| R08-05 | [QA] No.46; [KS] `確認事項!K104`; `20261120!F24` | PENDING (chính sách nợ) | Thanh toán, trạng thái Talent | Baseline thu lỗi không tự dừng; hướng cân nhắc dừng khi quá 1 tháng chưa trả chưa được chốt thành auto-lock. Không trộn với tạm dừng tự nguyện vẫn thu phí |
| R08-06 | [KS] `確認事項!K104`; `20261120!F24`; [QA] No.49/53/98 | CONFIRMED (hướng trả trước) / PENDING (hợp đồng kỳ) | Hóa đơn/kỳ thu (BLOCKED) | Phí tháng theo hướng trả trước; mốc kỳ, thu video, công nợ khi kết thúc và provider vẫn cần chốt. Không coi toàn bộ chu kỳ chưa có thông tin |
| R08-07 | [YK2] §6-3 5-4 | SOURCE_BASELINE | `video_generations` (chặn ghi) | Tài năng và quản lý xem số lần tạo video trong tháng; tài khoản công ty cũng hiện số lần |
| R08-08 | [QA] No.63 | PENDING | `talents.status` | Trạng thái khi dừng vì thu lỗi |

### EP09. Thông báo và PWA

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R09-01 | [YK2] §6-12 6-1 | SOURCE_BASELINE | `talent_notifications`, `push_subscriptions` | Thông báo hiện trong ứng dụng; máy đã cho phép thì đẩy; mở thì tới đúng màn |
| R09-02 | [YK3] P1277–1347; [KS] `20261122!G17:I17`; QA87/88/97 | SOURCE_REQUIREMENT (catalog/routing) / PENDING (ngoại lệ) | `manager_notifications`; recipient/email thiết kế đích P-16 | Thông báo Manager tới phụ trách Talent; bỏ alert tư vấn nghiêm trọng. Approval ở queue riêng, không generic inbox. Ngoại lệ đơn mới/Managerdisabled và read/handled còn thiết kế/quyết định. |
| R09-03 | [YK3] phụ lục B P1277–1347 | SOURCE_REQUIREMENT (16 trigger) | `*_notifications`, approval queue, `agent_entries` | Dùng 16 trigger hiện hành; không 17 loại baseline cũ. Kết thúc kỳ autopost vào chat, approval request vào queue. Mapping tại 04 §5; không suy 16 trigger=16 bảng. |
| R09-04 | [YK3] P1308–1327; phụ lục B | RESOLVED (catalog video/quá hạn duyệt) | `*_notifications.kind` | Bản 0.3 đã liệt kê video xong/lỗi và quá hạn duyệt; rút conflict do phụ lụcA cũ thiếu. Không đóng QA97 về handled. |
| R09-05 | [QA] No.97 | PENDING | `manager_notifications`, P-16 | Mở thông báo là đã đọc hay đã xử lý; dùng chung hay theo từng Manager chưa chốt. Không để một handled_at thay cả hai khái niệm |
| R09-06 | [YK2] §11 | SOURCE_BASELINE | — | Thông báo đẩy không đảm bảo luôn tới; luôn có danh sách trong ứng dụng |

### EP10. Nền tảng chung

| Mã | Nguồn | Trạng thái | Thực thể liên quan | Ghi chú |
|---|---|---|---|---|
| R10-01 | [YK2] §5-6; [KS] `確認事項!K85` | CONFIRMED (bỏ global stop) | `system_settings`, `ng_words` | Giữ cài đặt NG/giờ/ngưỡng; bỏ nút dừng toàn bộ khỏi thiết kế sản phẩm. Cột legacy còn tồn tại trong migration |
| R10-02 | [YK2] §5-2 | SOURCE_BASELINE (đổi được) | `system_settings` | Mặc định: 8:00 (khung sáng), 2 giờ trước giờ đăng, 3 ngày, 7 ngày, thứ Hai |
| R10-03 | [YK2] 確認18; [QA] No.25; [KS] 確認18 | CONFIRMED | `system_settings` (P-14) | Tin gửi theo khung sáng, trưa, tối, chung cho mọi tài năng; giờ trưa, tối chưa có; theo từng tài năng xem xét sau khi vận hành |
| R10-04 | [YK2] §9-4 | SOURCE_BASELINE | `manager_view_logs`, `activity_logs` | Ghi: xem thông tin; thao tác (duyệt, đổi trạng thái, dừng và mở lại đăng tự động…); xử lý (đăng bài, lấy số liệu, tạo video, kết quả thu tiền) |
| R10-05 | [YK2] §9-4, §9-3, §7-3; [QA] No.29; [KS] 確認55 | CONFIRMED (dữ liệu tài năng đã ngừng: giữ 6 tháng rồi tự xóa, không khôi phục) / UNKNOWN (nhật ký, sao lưu) | — (U-09, P-18) | Thời gian giữ nhật ký, sao lưu; xóa dữ liệu tài năng đã ngừng |
| R10-06 | [YK2] §10-2 | SOURCE_BASELINE | (mọi bảng) | Mã hóa đường truyền và dữ liệu lưu; không hiện khóa API |
| R10-07 | [KS] `20261122!G18:H18` | CONFIRMED (không lưu đồng ý phụ huynh) | Không tạo bảng/field đồng ý phụ huynh | Adesso lấy đồng ý khi ký với Talent, hệ thống không lưu hồ sơ. Đề nghị ISS22 đã được trả lời đúng chủ đề; consent điều khoản app là R01-04 riêng. |
| R10-08 | [TECH], [SUPA] | Quyết định kỹ thuật | (mọi bảng) | FE không đọc DB; mọi bảng bật RLS, không mở quyền cho `anon`, `authenticated` |

## 4. Quy tắc nghiệp vụ trích được (dùng cho schema)

Bao gồm quy tắc nguồn và ràng buộc vật lý để chỉ rõ khoảng lệch; không phải toàn bộ đều CONFIRMED. Cột "Loại" phân biệt ràng buộc nghiệp vụ (từ yêu cầu) với ràng buộc kỹ thuật (để dữ liệu nhất quán).

| Mã | Quy tắc | Nguồn | Loại | Cách thể hiện |
|---|---|---|---|---|
| BR-01 | UNIQUE email là ràng buộc hiện có, không chứng minh chỉ được gửi một lần suốt đời | R01-03; [QA] No.65/78 | Cần đối chiếu nghiệp vụ | Chưa nới hoặc siết UNIQUE khi chưa chốt gửi lại/tái đăng ký |
| BR-02 | Tài năng (loại `talent`) luôn đến từ một đơn đã duyệt | R01-01 | Nghiệp vụ | CHECK `chk_talents_origin` + khóa ngoại kép (`application_id`, `application_status='approved'`) |
| BR-03 | Tài khoản công ty do quản lý tạo | R08-01 | Nghiệp vụ | CHECK: loại `office` thì phải có `created_by_manager_id` |
| BR-04 | Tài năng có ngày sinh; tài khoản công ty không cần | R01-02, R01-06 | Nghiệp vụ | CHECK |
| BR-05 | 4 trạng thái nghiệp vụ; DB hiện chỉ 3 | R01-11 | Nghiệp vụ / gap | P-21; chưa sửa CHECK bằng đợt tài liệu này |
| BR-06 | 6 giá trị vật lý hiện có, không phải bộ trạng thái cuối đã duyệt | R06-01/02 | Baseline / thiết kế | Cần thiết kế EP06 trước gỡ chặn |
| BR-07 | Kết quả đăng ghi theo từng mạng, mỗi mạng một dòng cho một bài | R06-03 | Nghiệp vụ | UNIQUE (`post_id`, `platform`) |
| BR-08 | Trả lại phải có lý do | R06-05 | Nghiệp vụ | CHECK |
| BR-09 | Mỗi tài năng, mỗi ngày 3 chủ đề | R04-01 | Nghiệp vụ | CHECK vị trí 1–3 + UNIQUE (tài năng, ngày, vị trí) |
| BR-10 | Mỗi tài năng một mục tiêu cho mỗi mạng, mặc định 10.000 | R02-03 | Nghiệp vụ | UNIQUE + DEFAULT |
| BR-11 | Mạng chỉ gồm Instagram, TikTok, YouTube | [YK2] §2, §6-10 8-3 | Nghiệp vụ | CHECK |
| BR-12 | Video cơ bản một dạng theo nguồn mới; short/slide là legacy | R05-06 | Nghiệp vụ/gap | ReviewCHECK khi thiết kế video; không tự áp DDL. |
| BR-13 | Tạo lại có tính lượt; video lỗi không tính, thời điểm ghi/điều chỉnh còn chưa nhất quán | R05-07, R08-07 | Nghiệp vụ/phần còn mở | is_counted là legacy; ledger đích giữ lịch sử, không sửa lùi kỳ khóa. |
| BR-14 | Nhật ký xem không sửa, không xóa được | R01-14 | Nghiệp vụ | Thu hồi quyền UPDATE, DELETE + trigger chặn |
| BR-15 | Một danh sách từ cấm chung | R04-07 | Nghiệp vụ | Bảng không có khóa tài năng; UNIQUE theo từ |
| BR-16 | Hệ thống không giữ thông tin thẻ | R08-02 | Nghiệp vụ | Không có cột thẻ; chỉ mã tham chiếu của công ty thanh toán |
| BR-17 | Một người dùng Auth chỉ gắn với một tài năng hoặc một quản lý | (kỹ thuật) | Kỹ thuật | PK `auth_principals.auth_user_id` + khóa ngoại kép (`auth_user_id`, `principal_kind`) từ `managers`/`talents` |
| BR-18 | Bài đã hẹn, đang chờ duyệt, đã đăng, lỗi đều phải có giờ đăng | (kỹ thuật, nhất quán với hình 5-1) | Kỹ thuật | CHECK (luồng đăng đang hoãn: runtime chỉ ghi `draft`) |
| BR-19 | Nhắc gửi tư liệu 1 lần mỗi ngày | [YK2] §6-7 6-5 | Nghiệp vụ | `talent_notifications.event_key` theo (loại, tài năng, ngày) + UNIQUE |
| BR-20 | Tài khoản công ty không duyệt bài | [QA] No.20 (Close) | Nghiệp vụ | CHECK `chk_talents_office_no_approval` |
| BR-21 | Tư liệu, chủ đề, bản sửa, kết quả video, máy nhận push, đối tượng thông báo phải cùng chủ (cùng tài năng) | (kỹ thuật) | Kỹ thuật | Khóa ngoại kép (`id`, `talent_id`) |
| BR-22 | Không thu phí tài khoản công ty | R08-01 | Nghiệp vụ | Khóa ngoại kép `billing_accounts` (`talent_id`, `account_type='talent'`) |

## 5. Điểm chưa rõ ảnh hưởng tới schema

Phân nhóm theo mục 5 của đề bài: A không ảnh hưởng phần đã xác nhận; B có thể đổi schema sau này; C chưa xác định được thực thể hoặc quan hệ, nên **BLOCKED** (chặn).

| Mã | Nội dung | Nhóm | Thực thể bị ảnh hưởng |
|---|---|---|---|
| U-01 | Kỳ thu, phí video và công nợ còn chi tiết; cổng Square đã có hướng | C (phần còn mở) / TEAM_PROVIDER_CHECK | Nguồn Square: KSactionNo.16/G17. Giữ mốc đăng ký/trả trước; đội kiểm capability, QA49/53/62/98 giữ đúng phần chưa quyết. |
| U-02 | Giá ước tính doManager đặt tại cài đặt chung đã rõ; giá khithay đổi/điều chỉnh kỳ còn No.62 | B | Video price snapshot/ledger; không hỏi lại nơi cài đặt. |
| U-03 | Bài xin duyệt lại là cùng bài hay bài mới (R06-08) | B | `posts`, `post_approval_decisions` (cần request/revision hoặc bài mới theo quyết định; chưa phê duyệt) |
| U-04 | Danh sách trạng thái bài đăng (R06-02) | B | `posts.status` |
| U-05 | Mỗi mạng một tài khoản: **đã chốt** ([KS] 確認10) (R06-10) | B | `social_accounts`: thêm UNIQUE (P-01) khi mở luồng |
| U-06 | Giá trị kết quả theo từng mạng ngoài thành công, thất bại (bỏ qua vì chưa kết nối, không có video) | B | `post_deliveries.provider_state` |
| U-07 | Các chỉ số lấy được từ Upload-Post (R07-02) | A | `post_metric_snapshots.metrics` dùng JSONB |
| U-08 | Quyền xem hội thoại đã có trả lời (R01-15); không hỏi lại riêng tư/toàn bộ | A | Guard và audit cần kiểm triển khai, không còn blocker quyết định cũ |
| U-09 | Thời gian giữ dữ liệu và nhật ký (R10-05). Dữ liệu tài năng đã ngừng: **đã chốt** 6 tháng rồi tự xóa ([KS] 確認55) | B | Cần hợp đồng dọn/ẩn danh, xử lý FK và log append-only |
| U-10 | "Đã xử lý" dùng chung hay theo từng quản lý (R09-05) | B | `manager_notifications` |
| U-11 | Catalog 16 trigger đã có tại YK3 phụ lục B; còn recipient ngoại lệ/read/handled | B (thiết kế) | Mapping 04 §5; không giữ blocker thiếu catalog video/quá hạn duyệt. |
| U-12 | Giờ nhắn theo từng tài năng (R10-03): **đã trả lời**, chung theo khung giờ, theo tài năng xem xét sau ([KS] 確認18) | A | Không thêm cột lúc này |
| U-13 | Đã thay FIFO/1 video mỗi ngày bằng chọn tư liệu theo chủ đề (R05-05) | B | Liên kết media với khoảng đăng; không thiết kế hàng đợi FIFO vì baseline cũ |
| U-14 | Đồng ý điều khoản lúc nộp đơn là yêu cầu đã rõ; 確認57 còn cách mở văn bản | B (việc đội) | Thiết kế consent time/version/ref; chưa có cột SQL, không tự chốt policy đồng ý lại sau thay terms. |
| U-15 | Nhóm và chỉ thị AI; yêu cầu duyệt theo Manager phụ trách từng Talent đã rõ, No.87/88/99 còn mở | C | P-15/P-16/P-17; không gộp quyền xem với phân công hoặc tự chốt ưu tiên đa nhóm |
| U-16 | Daily/autopost và confirm/no-confirm là hai trục đã rõ; còn hết media/đổi lịch/nhánh lỗi | C (phần còn mở) / INTERNAL_DESIGN | P-12 thiết kế period/media và preference; không chờ chốt lại NG rewrite hay duyệt autopost/office. |

## 6. Hiệu lực cập nhật 25/11

FACT nguồn được ghi theo locator ở từng dòng; CONFIRMED không thay chữ kýG7/G8. SQL chưa có phần nào thì giữ nhãn thiết kế đích. QA/CR cũ vẫn giữ trong lịch sử; CR01–14 hiện hành khác nghĩa CR cũ. Không hỏi lại phần đã trả lời. Xem [hồ sơ hash và đối chiếu](decisions-update-2026-11-25.json).

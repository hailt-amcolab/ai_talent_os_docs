> **Căn cứ nghiệp vụ cập nhật26/11:** [Q&A đã trả lời và phần còn mở](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md). Chỉ cập nhật tài liệu; trạng thái triển khai/DDL và các trigger chặn ghi giữ theo bằng chứng kỹ thuật hiện có. Không coi trả lời nghiệp vụ là phê duyệt schema hoặc mở ghi.

# 02. Danh mục thực thể

> **Cập nhật quyết định 25/11/2026:** Đã đồng bộ nhóm quyết định đã rõ vào nội dung tài liệu. Phân biệt yêu cầu nguồn, SQL hiện có và thiết kế đích chưa có migration. Cấu trúc repository: 13 migration/53 bảng ứng dụng; chưa kiểm DB live. Các ghi chú ngày 18/11 và 23/11 giữ vai trò lịch sử ở phần đã được thay. [Hồ sơ thay đổi](decisions-update-2026-11-25.json); [review và phần còn thiếu](08_full_review_2026-11-25.md).

> **Rà soát 23/11/2026:** Đối chiếu QA/KS hiện hành và bộ `23112026`; xem [kết quả tác động DB](06_extensibility_review.md) và [danh mục nguồn](../TAI_LIEU_NGUON.md). Tách schema trong repository, quyết định nguồn và đề xuất thiết kế. Lần rà này chỉ cập nhật tài liệu, chưa áp migration hoặc kiểm tra database đang chạy; không cấp phê duyệt nghiệp vụ, thương mại hay release.

> **Cập nhật 18/11/2026:** Snapshot 18/11 có 7 migration/40 bảng; repository hiện có 13 migration/53 bảng (25 public +28 app_private); chưa kiểm trạng thái áp thực tế. Cột "Đợt 1" ở §2 và §6 theo `07_implementation_scope_and_rules.md`; bảng "Chặn ghi" vẫn tồn tại nhưng trigger từ chối ghi. Không tự tạo ba dòng `follower_goals` khi tạo tài khoản ở đợt 1.

Bản 1.0 · 17/11/2026 · Bước 2. Mã yêu cầu (R…, BR…) và mã điểm chưa rõ (U…) theo `01_confirmed_requirements.md`.

## 1. Ranh giới dữ liệu

Hiện hành theo QA `Q&A!G101:H101`: DB lưu dữ liệu nghiệp vụ cho agent đọc/ghi qua service có kiểm quyền. YK3 P730/P885 còn ghi OneDrive; quyết định mới chỉ thay đúng chủ đề dữ liệu agent. Kiến trúc nội bộ chọn DB là nguồn nghiệp vụ và OneDrive là bản xuất; không suy byte media được lưu trong Postgres.

| Dữ liệu | Nơi lưu | Trong DB có gì |
|---|---|---|
| Hồ sơ, định hướng, sở thích, sở trường, mục tiêu tương lai, know-how, chỉ thị cho AI, điều AI học được, thử thách | DB nghiệp vụ; OneDrive export theo contract từng loại (QA101, AI Core §6) | Profile/instruction và history đã có 10 bảng agent mới; Challenge/memory/progress còn thiết kế đích, không chờ duyệt lại chức năng. |
| Bản gốc ảnh và video | Supabase hoặc OneDrive ([QA] No.8 G9/H 9,19/11) | `media_assets` hiện thiên OneDrive; cần thiết kế tham chiếu provider/vòng đời URL, chưa sửa schema |
| Hội thoại với AI coach | Hệ thống; QA101/YK3 P612 | `agent_conversations`/`agent_entries` cho agent; `coach_messages` legacy. Không ghi trùng cùng transcript. |
| Mục tiêu người theo dõi | Nhập ở màn quản trị ([YK2] §6-4 2-4); [YK2] §7-2 ghi cả OneDrive | Bản chính trong DB (để hiện ngay, kiểm đạt mục tiêu); bản xuất ra OneDrive cho AI đọc là việc của tích hợp |
| Số liệu bài đăng, số người theo dõi | Lấy về hệ thống rồi ghi ra OneDrive ([YK2] §6-11 8-7, 8-8) | Ảnh chụp số liệu theo ngày (`follower_snapshots`, `post_metric_snapshots`) |
| Mật khẩu, factor xác thực hai bước, phiên đăng nhập | Supabase Auth (`auth.users`, `auth.mfa_factors`, `auth.sessions`) | Không lưu mật khẩu, secret TOTP, token. Ứng dụng giữ danh tính (`auth_principals`), sổ phiên do BE cấp (`auth_session_registry`) và bằng chứng MFA theo phiên; khóa ngoại thật tới `auth.users.id` |
| Thông tin thẻ, lịch sử thanh toán | Công ty thanh toán ([YK2] §6-3 1-1, §7-2; BR-16) | Chỉ mã thành viên tại công ty thanh toán (`billing_accounts`) |
| Đăng ký tài năng ở Upload-Post và quyền kết nối mạng xã hội | Upload-Post ([YK2] §6-10 8-2) | Mã hồ sơ Upload-Post, trạng thái kết nối từng mạng |

## 2. Thực thể đã thiết kế

Loại dữ liệu: **Master** (dữ liệu gốc, ít đổi), **Transactional** (phát sinh theo nghiệp vụ), **Configuration** (cài đặt), **Historical** (lịch sử, chỉ thêm).

| # | Bảng | Thực thể | Loại | Module | Căn cứ | Đợt 1 |
|---|---|---|---|---|---|---|
| 1 | `managers` | Quản lý | Master | EP01 | R01-09, R01-10 | Làm |
| 2 | `talent_applications` | Đơn đăng ký của tài năng | Transactional | EP01 | R01-01, R01-02, R01-03 | Làm |
| 3 | `talents` | Tài khoản dùng ứng dụng tài năng: tài năng và tài khoản công ty | Master | EP01, EP02, EP06, EP08 | R01-01, R01-05, R01-06, R01-11, R01-12, R02-01, R06-09, R06-12, R06-14, R08-01 | Làm |
| 4 | `billing_accounts` | Đăng ký thanh toán tại công ty thanh toán | Master | EP08 | R08-02, R08-03 | Chặn ghi |
| 5 | `social_accounts` | Tài khoản mạng xã hội đã kết nối | Master | EP06 | R06-09, R06-10 | Chặn ghi |
| 6 | `follower_goals` | Mục tiêu người theo dõi theo từng mạng | Master | EP02, EP03 | R02-03, R03-07 | Chặn ghi |
| 7 | `coach_messages` | Tin nhắn giữa tài năng và AI coach | Transactional | EP03 | R03-01 | Làm |
| 8 | `ai_usage_events` | Một lần dùng AI và chi phí | Historical | EP03 | R03-04 | Làm |
| 9 | `theme_suggestions` | Chủ đề gợi ý mỗi sáng | Transactional | EP04 | R04-01 | Làm |
| 10 | `posts` | Bài đăng, từ bản nháp tới khi đăng hoặc hủy | Transactional | EP04, EP06 | R04-02〜R04-07, R06-01, R06-07, R06-11〜R06-14 | Chỉ `draft` |
| 11 | `post_media` | Ảnh, video gắn vào bài | Transactional | EP04 | R04-05 | Làm |
| 12 | `post_approval_decisions` | Quyết định duyệt hoặc trả lại | Historical | EP06 | R06-05, R06-06 | Chặn ghi |
| 13 | `post_deliveries` | Việc đăng lên một mạng và kết quả | Transactional | EP06 | R06-03, R06-04, R06-11 | Chặn ghi |
| 14 | `media_assets` | Ảnh, video của tài năng | Master | EP05 | R05-01, R05-02, R05-10 | Làm |
| 15 | `video_generations` | Một lần yêu cầu tạo video bằng AI | Transactional | EP05, EP08 | R05-06〜R05-09, R08-04, R08-07 | Chặn ghi |
| 16 | `video_generation_inputs` | Ảnh làm nguồn cho video | Transactional | EP05 | R05-08 | Chặn ghi |
| 17 | `follower_snapshots` | Số người theo dõi theo ngày | Historical | EP07 | R07-01, R07-04 | Chặn ghi |
| 18 | `post_metric_snapshots` | Số liệu một bài trên một mạng theo ngày | Historical | EP07 | R07-01, R07-02 | Chặn ghi |
| 19 | `talent_notifications` | Thông báo cho tài năng | Transactional | EP09 | R09-01, R09-03 | Làm |
| 20 | `manager_notifications` | Thông báo cho quản lý | Transactional | EP09 | R09-02, R09-03 | Chặn ghi |
| 21 | `push_subscriptions` | Máy nhận thông báo đẩy | Master | EP09 | R09-01 | Làm |
| 22 | `system_settings` | Cài đặt chung | Configuration | EP10 | R10-01, R10-02, R06-12 | Làm |
| 23 | `ng_words` | Từ cấm | Configuration | EP04, EP10 | R04-07, R10-01 | Làm |
| 24 | `manager_view_logs` | Nhật ký quản lý xem thông tin tài năng | Historical | EP01, EP10 | R01-14, R10-04 | Làm |
| 25 | `activity_logs` | Nhật ký thao tác và xử lý | Historical | EP10 | R10-04, R02-07 | Làm |

## 3. Thuộc tính và quan hệ chính

Kiểu dữ liệu, giá trị mặc định và ràng buộc chi tiết ở `04_database_schema.md` và `05_data_dictionary.md`.

| Thực thể | Thuộc tính chính | Quan hệ |
|---|---|---|
| Quản lý | người dùng Auth, đang hoạt động hay đã vô hiệu, ai tạo | 1 người dùng Auth – 1 quản lý |
| Đơn đăng ký | tên, email, ngày sinh, trạng thái (chờ, đã duyệt, đã từ chối), ai quyết, lúc nào | 0..1 đơn – 1 tài năng (khi được duyệt); nhiều đơn – 0..1 quản lý quyết |
| Tài năng | người dùng Auth, loại (tài năng, tài khoản công ty), tên hiển thị, ngày sinh, trạng thái, có cần duyệt bài, có đang dừng đăng tự động, thư mục OneDrive, hồ sơ Upload-Post | 1 người dùng Auth – 1 tài năng; 1 tài năng – 0..1 đăng ký thanh toán, N tài khoản mạng xã hội, 3 mục tiêu, N tin nhắn, N bài, N tư liệu, N lần tạo video, N thông báo, N máy nhận push |
| Đăng ký thanh toán | mã thành viên ở công ty thanh toán, lúc đăng ký | 1 tài năng (chỉ loại `talent`) – 0..1 |
| Tài khoản mạng xã hội | mạng, mã tài khoản ở mạng, trạng thái kết nối | 1 tài năng – N (mỗi mạng một tài khoản, [KS] 確認10) |
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
| Thông báo cho quản lý | loại, đối tượng liên quan (tài năng, đơn, bài, tin nhắn), lúc xử lý, ai xử lý, khóa chống trùng | Vật lý hiện mỗi sự kiện một dòng; yêu cầu duyệt gửi Manager phụ trách Talent; các loại khác và read/handled còn No.87/88/97 |
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
| Lịch sử trạng thái tài năng | Hiện chỉ có log thao tác; kỳ tạm dừng và lịch sử tính phí cần review P-21, không coi log tự đủ để dựng lại chính sách | R10-04 |
| Nội dung hồ sơ, know-how, chỉ thị AI | Không còn thuộc nhóm “không có thực thể DB”: profile/instruction có bảng và history; memory/Challenge cần thiết kế thêm | QA101; P-17/P-24; xem §8 |
| Phí ChatGPT của quản lý | Thanh toán ngoài hệ thống; [YK2] chỉ yêu cầu tách khỏi phí AI coach | R03-04 |
| Liên kết kết nối mạng xã hội (hạn 48 giờ) | Tạo mỗi khi cần, không cần lưu | R06-09 |
| Thông báo qua email (kết quả đơn) | Gửi một lần lúc duyệt hoặc từ chối; kết quả gửi ghi ở `activity_logs` | 別紙A |
| Hàng đợi việc nền riêng (pg-boss…) | Không cần: ý định gọi dịch vụ ngoài ghi vào `domain_operations` + `outbox_events` cùng giao dịch với dữ liệu nghiệp vụ (§6, `07` §4.4). Queue vận chuyển/lập lịch phải tham chiếu operation/outbox và chịu replay/idempotency; không thành nguồn quyết định nghiệp vụ thứ hai | `07` §4.4 |

## 5. Thực thể chưa thiết kế

| Thực thể | Trạng thái | Lý do | Căn cứ |
|---|---|---|---|
| Hóa đơn tháng và kết quả thu tiền | **BLOCKED** | Đã có hướng một tháng từ đăng ký và trả trước (KS K104/F24); mốc thu video, công nợ và hợp đồng provider còn cần thiết kế/quyết định, chưa đủ mở ghi hóa đơn. | U-01, R08-06 |
| Đơn giá video | Đã rõ nơi cài đặt; còn hiệu lực giá | Manager đặt giá ước tính ở cài đặt chung theo YK3 P803–809; snapshot giá/điều chỉnh kỳ thuộc thiết kế và QA62 | U-02 |
| Đồng ý điều khoản | Yêu cầu đã rõ; chưa có DDL | YK3 P116/P136/P148; 確認57 chỉ còn cách hiển thị văn bản | U-14 |
| Nhóm tài năng, quản lý phụ trách Talent, chỉ thị AI | Category/assignment chưa có; instruction đã có một phần | SQL 25/11 có global/Talent/history; category bị chặn tới khi có catalog; nhiều category/thứ tự là hướng dự kiến ở QA99 ngày26/11, còn chờ Adesso27/11 | U-15, P-15/P-16/P-17 |
| Khoảng đăng tự động (自動投稿) | **Đã chốt, chưa có bảng** | [KS] 確認19, 25; chi tiết luồng chưa có | U-16, P-12 |
| Thử thách (チャレンジ) | Đã chốt hướng, chưa có bảng | [KS] 確認5; đã rõ hướng AI cá nhân hóa theo K27/F30/F31; còn cách đo/vòng đời | P-17 |
| Tập tư liệu của khoảng đăng | Đã rõ hướng, chưa thiết kế | Chọn theo chủ đề, không FIFO; không tự sinh media trong autopost | U-13; KS K73, F18/F19 |
| Khung giờ tương tác (8-9) | NOT STARTED | Ưu tiên thấp | R07-06 |
| Biện pháp chống khóa tài khoản | UNKNOWN | Nội dung chưa quyết | R06-15 |

## 6. Thực thể kỹ thuật (schema `app_private`)

| Bảng (schema `app_private`) | Vai trò | Quan hệ |
|---|---|---|
| auth_principals | Danh tính ứng dụng, bắt đổi mật khẩu, security version | PK/FK Auth user, kind manager/talent; domain dùng FK kép |
| auth_session_registry | Phiên và proof server-owned, restricted/full/revoked | N:1 principal; session_id lấy từ JWT đã verify |
| auth_challenges | Challenge gắn đúng session/user/factor/purpose | FK kép registry |
| password_lock_state | Bộ đếm sai mật khẩu, `blocked_until` dùng chung các tiến trình | 0..1:1 principal |
| auth_mfa_enrollments | Lượt đăng ký TOTP đang dở, chặn hai lượt cùng lúc | 0..1:1 phiên; một lượt mỗi người |
| auth_login_identifiers | Băm HMAC email → người dùng, để đếm sai trước khi gọi Auth | 1:1 principal |
| auth_rate_buckets | Giới hạn tần suất theo khóa đã băm | Không quan hệ |
| push_deliveries | Lần gửi một sự kiện outbox tới một máy; chống gửi trùng | N:1 outbox, N:1 `push_subscriptions` |
| domain_operations | Command/provisioning có idempotency và trạng thái unknown | Actor, application hoặc talent; một provisioning/application |
| outbox_events | Ý định gọi dịch vụ ngoài, lease và generation | N:1 operation; unique operation/generation/type |

Bảng chỉ cho demo công nghệ (không dùng cho tính năng thật): `tech_demo_sessions`, `tech_demo_push_subscriptions`, `demo_auth_deliveries`, `tech_demo_onedrive_connections`, `tech_demo_onedrive_oauth_states`. Hai bảng cuối thuộc migration `20261118000200_onedrive_delegated_demo`; chưa chứng minh tích hợp OneDrive nghiệp vụ đã hoàn tất.

Tổng repository hiện hành:53 bảng (25 ở `public`,28 ở `app_private`), trong 13 migration, cộng bảng Auth của Supabase khai báo bên ngoài cho Prisma. Không tạo bảng tổ chức nhiều bên hay SMS ngoài phạm vi. Hóa đơn và lần thử đăng là nhu cầu thiết kế đã nhận diện; chỉ giữ mở các chính sách còn thiếu, không đợi khách chọn cấu trúc bảng. Operation/outbox là dữ liệu kỹ thuật bắt buộc để không mất tác động ra ngoài khi tiến trình chết giữa chừng. Các bảng chưa chốt giữ nguyên nhưng bị chặn ghi (`07` §3).

## 7. Nhu cầu dữ liệu cần thiết kế sau rà soát 23/11

Các mục dưới là PROPOSED, không phải bảng đã có hoặc phạm vi đã duyệt:

| Nhóm | Dữ liệu cần đánh giá | Truy vết |
|---|---|---|
| Tạm dừng | Lịch sử trạng thái, hiệu lực, lý do/người thao tác; tách nghĩa vụ phí và cờ dừng đăng | R01-11, P-21 |
| Xuất bản | Revision, approval, kế hoạch từng SNS và attempts; TikTok tiếp tục direct theo nguồn, không chọn inbox như baseline | P-22/P-23; KS `20261122!G20:H20`; YK3 P250 |
| Thông báo | Người nhận, đã đọc, đã xử lý; snapshot người phụ trách khi gửi | P-15/P-16; No.87/88/97 |
| Tư liệu/hồ sơ | Ref tệp theo nơi lưu, phiên bản, readiness, ảnh/URL hồ sơ và quyền sở hữu | P-24; UI-M20 p 27 |
| Thu phí | Giá và hợp đồng chụp tại thời điểm phát sinh, kỳ thu, công nợ, miễn phí tài khoản công ty | U-01/U-02; KS K104/K112 |
| Chưa duyệt | Ranking/voice ngoài phase; không lưu đồng ý phụ huynh theo quyết định mới; so sánh liên Talent/KPI giữ đề nghị riêng | YK3 P62–65; KS `20261122!G18:H18`; P-25 |

## 8. Thực thể AI hiện có trong SQL 25/11

Đây là cấu trúc repository, chưa xác minh catalog live hoặc quyền production. `app_private` hiện chứa cả dữ liệu nghiệp vụ agent có bảo vệ, không chỉ bảng kỹ thuật. Các contract đích rộng hơn lát cắt demo nằm ở 04 §5 và AI Core §4/6/7.

| Bảng app_private | Vai trò và giới hạn |
|---|---|
| `ai_executions` | Run: task/revision, actor/channel/scope, conversation và lease; mở rộng từ legacy. |
| `ai_execution_attempts` | Lượt worker sở hữu lease; agent dùng step_ledger, không đồng nhất một attempt với một model call. |
| `ai_daily_trends` | Cache tin/chủ đề theo ngày; không thay provenance từng bài. |
| `agent_conversations` | Hội thoại thuộc actor; Talent có subject cố định, Manager chọn đối tượng qua tool. |
| `agent_entries` | Tin user/assistant theo sequence; attachment/action typed còn cần bổ sung. |
| `agent_talent_profiles` | Hồ sơ 5 trường allowlist trong DB, có version và người cập nhật. |
| `agent_talent_profile_versions` | Snapshot lịch sử profile theo Talent/version, append-only ở quyền runtime. |
| `agent_instructions` | Chỉ thị scope+situation, enable/version; category hiện bị CHECK chặn. |
| `agent_instruction_versions` | Lịch sử nội dung/enable theo instruction/version; restore phải tạo revision mới. |
| `agent_profile_exports` | Version profile đã xuất sang OneDrive; không là nguồn đọc ngược vào DB. |
| `agent_steps` | Checkpoint model/tool, input/output, usage và kết quả; liên kết execution/attempt. |
| `agent_change_proposals` | Đề xuất thay profile/instruction với hash/base version/expiry và xác nhận actor. |
| `agent_commands` | Receipt lệnh đã commit, unique proposal; lát cắt hiện chỉ profile.update/instruction.write. |

## 9. Danh mục thực thể đích

[10](10_target_data_dictionary.md) quản lý tập bảng NEW/EXTEND theo từng miền; [contract JSON](technical-design-contracts-2026-11-25.json) có kiểu/null/FK/invariant/index. Các bảng này chưa có migration, không cộng vào53bảng hiện có. Ưu tiên dùng lại execution/operation/outbox, bài/media và inbox; chỉ mở rộng những quan hệ còn thiếu.

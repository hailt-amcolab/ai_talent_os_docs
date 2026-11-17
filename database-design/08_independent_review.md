# 08. Review độc lập

Bản 1.0 · 17/11/2026 · Vai trò: kiến trúc sư DB chính, review độc lập bộ `01`–`07`. Không mặc định thiết kế trước là đúng; đối chiếu lại với [YK2], [QA] và cách triển khai bằng Prisma trên Supabase. Không sửa các tệp `01`–`07` trong lần review này.

Mức: **CRITICAL** (mất tiền, mất dữ liệu, sai nghiệp vụ không sửa được) · **HIGH** (phải sửa trước khi làm module liên quan) · **MEDIUM** (sửa trong lúc làm module) · **LOW** (cải thiện).

## 1. Vấn đề phát hiện

### HIGH

| Mã | Vấn đề | Bằng chứng | Ảnh hưởng | Cách sửa | Đánh đổi |
|---|---|---|---|---|---|
| IR-01 | **Thiếu vòng đời theo từng mạng cho việc gửi lịch và hủy lịch.** `post_deliveries` chỉ có `result` (succeeded, failed). Không ghi được: đã gửi lịch sang Upload-Post chưa, gửi lịch lỗi, đã yêu cầu hủy, hủy thành công hay lỗi | `04` §2 `post_deliveries`; [YK2] §6-10 7-2, 7-5 (hủy cả bài đã hẹn ở Upload-Post), §6-2 7-3 (利用終了 thì hủy bài đã hẹn), §9-4 (ghi kết quả xử lý) | `posts.status = 'cancelled'` trong DB, nhưng Upload-Post hủy lỗi ở một mạng thì bài **vẫn đăng**. Áp với cả tài năng đã ngừng và nút dừng đăng toàn bộ, nên đây là rủi ro uy tín và rủi ro bị khóa tài khoản. `07` §3 ghi "hủy làm sau, bất đồng bộ" nhưng không có chỗ lưu kết quả | Thêm cột trạng thái theo mạng `provider_state`: `not_submitted`, `submitted`, `submit_failed`, `cancel_requested`, `cancelled`, `cancel_failed`, `published`, `publish_failed`; kèm `provider_state_changed_at`. Dừng hoặc ngừng thì chuyển từng mạng sang `cancel_requested`; bài chỉ coi là đã hủy xong khi mọi mạng `cancelled` | Thêm một máy trạng thái thứ hai (theo mạng) cạnh trạng thái bài. Tách cột `result` và trạng thái theo mạng hay gộp làm một là chọn lựa; gộp thì đơn giản hơn |
| IR-02 | **Trạng thái chung của bài không suy ra được từ kết quả từng mạng** (2 mạng thành công, 1 mạng lỗi thì `posts.status` là gì?) | `07` M-03 xếp MEDIUM; [YK2] §5-1 hình 5-1 chỉ có một trạng thái cho cả bài, còn §5-1 lại ghi kết quả theo từng mạng | Màn lọc "đăng lỗi" ([YK2] §6-10 7-2), thông báo lỗi và việc hẹn lại (失敗→予約済み) dựa trên trạng thái chung. Không có quy tắc thì mỗi module tự hiểu một kiểu | Nâng lên HIGH. Hỏi khách gộp vào [QA] No.51. Trong lúc chờ: quy định trong đặc tả là "`failed` khi có ít nhất một mạng lỗi; `published` khi mọi mạng được gửi đều thành công". Hẹn lại chỉ đăng lại mạng lỗi ([QA] No.59 đang đề xuất) | Quy tắc tạm có thể phải đổi; dữ liệu theo từng mạng vẫn đúng nên đổi quy tắc không phải chuyển dữ liệu |
| IR-03 | **Khóa ngoại tới `auth.users` sẽ làm hỏng `prisma migrate dev`.** Prisma dùng DB tạm (shadow database) để tạo migration; DB tạm không có schema `auth` của Supabase | `04` §2 (`fk_managers_auth_user_id`, `fk_talents_auth_user_id`); `07` §6 khuyên dùng `prisma migrate dev` | Không tạo được migration trên máy lập trình; hoặc người làm xóa khóa ngoại cho chạy được, mất toàn vẹn | Chọn một: (a) tạo khóa ngoại trong khối `DO $$ … IF to_regclass('auth.users') IS NOT NULL … $$` để DB tạm bỏ qua; (b) dùng DB tạm là một project Supabase riêng (`shadowDatabaseUrl`); (c) không dùng khóa ngoại, kiểm ở BE và đối soát định kỳ | (a) đơn giản nhất, nhưng DB tạm và DB thật khác nhau một khóa. (b) giống thật nhất, tốn một project. (c) mất toàn vẹn ở DB |
| IR-04 | **Thiết kế dựa trên cách hiểu "không gắn 確認 là đã xác nhận"**, trong khi [YK2] vẫn là 0.1版, chưa là bản cuối | `01` §2; [YK2] §1-5 (bản cuối nộp sau khi khách trả lời 確認シート); 確認シート chưa có trong thư mục dự án | Các quy tắc lõi như trạng thái bài ([QA] No.51 mở), duyệt lại ([QA] No.58 mở), thu phí (BLOCKED) chưa được khách xác nhận rõ ràng | Xin 確認シート (85/118 dòng khách đã đánh dấu) để đối chiếu lại cột "Trạng thái" của `01` §3 trước khi chốt schema của EP06 và EP08 | Chờ tài liệu từ khách; các module khác vẫn làm được |
| IR-05 | Hóa đơn tháng BLOCKED (giữ nguyên H-01 của `07`) | `01` U-01; [QA] No.4, No.49, No.53 mở | Thu phí là chức năng ưu tiên 高 (cao) | Như `07` H-01 | — |
| IR-06 | Mục tiêu theo từng mạng có thể bị đổi (giữ nguyên H-02 của `07`) | [QA] No.14 cột Comment | Đổi muộn phải gộp dữ liệu | Như `07` H-02 | — |

### MEDIUM

| Mã | Vấn đề | Bằng chứng | Ảnh hưởng | Cách sửa | Đánh đổi |
|---|---|---|---|---|---|
| IR-07 | `talent_notifications.target_path` chỉ kiểm `LIKE '/%'`: chuỗi `//evil.example` vẫn qua | `04` `chk_talent_notifications_target_path` | Bấm thông báo có thể bị chuyển ra trang ngoài (chuyển hướng mở) | Đổi CHECK thành `target_path ~ '^/[^/\\]'`; tầng dịch vụ vẫn dùng danh sách đường dẫn cho phép | Không đáng kể |
| IR-08 | Thiếu ràng buộc "tài khoản công ty không cần duyệt bài" | [QA] No.20 (Close: 承認は行わない – không duyệt); `04` `talents` cho phép `is_approval_required = true` với `office` | Bài của tài khoản công ty có thể bị kẹt ở 承認待ち (chờ duyệt) | Thêm `CHECK (account_type = 'talent' OR NOT is_approval_required)` | Nếu khách đổi ý thì phải bỏ CHECK |
| IR-09 | `video_generations.is_billable` vừa mang nghĩa "được đếm", vừa mang nghĩa "tính tiền". Tài khoản công ty được đếm nhưng **không** tính tiền | [YK2] §6-3 5-4; `05` `is_billable` | Việc tính hóa đơn sau này có thể vô tình thu tiền tài khoản công ty nếu chỉ lọc theo `is_billable` | Đổi tên thành `is_counted`; tiền tính bằng `is_counted AND talents.account_type = 'talent'` | Đổi tên ngay bây giờ không tốn gì (chưa có mã) |
| IR-10 | Hủy hàng loạt (dừng đăng toàn bộ) cập nhật nhiều bài trong một giao dịch, cùng lúc việc nền cũng khóa bài: có thể bị deadlock | `07` §3 | Lệnh dừng lỗi giữa chừng hoặc chạy chậm | Khóa bài theo thứ tự `id` (`SELECT … ORDER BY id FOR UPDATE`); chia lô; việc nền dùng `FOR UPDATE SKIP LOCKED` và kiểm lại cờ dừng ngay trước khi gửi | Hủy chia lô thì không còn nguyên tử cho mọi bài; cờ dừng đặt trước giúp chặn bài mới |
| IR-11 | Một quyết định duyệt không biết trả lời lần gửi duyệt nào (khi cùng bài được gửi duyệt lại, U-03) | `04` `post_approval_decisions` không có tham chiếu tới lần yêu cầu | Lịch sử duyệt mơ hồ; khó kiểm "người bấm trước thắng" cho từng lần | Nếu [QA] No.58 chốt "cùng bài": thêm `approval_round` (số lần gửi duyệt) vào `posts` và quyết định, UNIQUE (`post_id`, `approval_round`) | Chỉ cần khi chốt "cùng bài" |
| IR-12 | Email đơn đăng ký duy nhất trong bảng đơn, nhưng không kiểm trùng với email đã dùng ở Supabase Auth (quản lý, tài khoản công ty) | `04` `uq_talent_applications_email`; [YK2] §6-4 2-2 | Duyệt đơn thì tạo người dùng Auth thất bại hoặc dính nhầm tài khoản | Kiểm ở BE lúc nhận đơn và lúc duyệt (bộ Supabase đã có quy tắc "trùng thì xem xét thủ công") | Không làm được bằng ràng buộc DB vì khác schema |
| IR-13 | Ba dòng mục tiêu mặc định phải có cho mỗi tài năng, nhưng không có gì bảo đảm | `04` `follower_goals`; [YK2] §6-4 2-4 (mặc định 10.000) | Thiếu dòng thì màn hiển thị không có mục tiêu | Tạo 3 dòng trong cùng giao dịch tạo tài năng; có kiểm thử | Hoặc coi "không có dòng" là mặc định 10.000, nhưng sẽ có hai cách đọc |
| IR-14 | Xóa dữ liệu theo thời hạn giữ ([YK2] §7-3, 確認55) sẽ khó: mọi khóa ngoại là RESTRICT, hai bảng nhật ký có trigger chặn xóa | `04` §1, §2 | Khi khách chốt thời hạn, phải viết thủ tục xóa theo đúng thứ tự trên khoảng 20 bảng, hoặc tạm tắt trigger | Khi chốt thời hạn: ưu tiên làm ẩn danh (xóa nội dung, giữ khóa) thay vì xóa dòng; thủ tục dọn chạy bằng role chủ sở hữu | Ẩn danh vẫn giữ số dòng; xóa thật thì phức tạp hơn |

### LOW

| Mã | Vấn đề | Cách sửa |
|---|---|---|
| IR-15 | Chỉ mục khóa giá trị cố định: `idx_post_deliveries_failed (result) WHERE result = 'failed'`, `idx_video_generations_in_progress (status) WHERE …` | Đổi khóa chỉ mục sang cột dùng để sắp xếp: `(updated_at)`, `(requested_at)` |
| IR-16 | Chỉ mục không cần ở quy mô ≤ 1.000 dòng: `idx_talents_status`, `idx_talents_created_by_manager_id` | Bỏ; thêm lại khi đo thấy chậm |
| IR-17 | Quy tắc "nhắc gửi tư liệu 1 lần mỗi ngày" ([YK2] §6-7 6-5) chưa ghi ở `01` §4 | Ghi BR mới: `event_key` theo (tài năng, ngày) làm UNIQUE chống nhắc lặp |
| IR-18 | `talents.status_changed_at` lặp thông tin với `activity_logs`; `posts.revised_from_post_id` không có yêu cầu đọc lại chuỗi phiên bản | Giữ `status_changed_at` (rẻ, dùng để sắp xếp); `revised_from_post_id` có thể bỏ nếu không màn nào dùng (thiết kế thừa nhẹ) |
| IR-19 | `talents.display_name` chép từ đơn | Chấp nhận: đơn là bản ghi lịch sử lúc gửi; tên hiển thị có thể đổi sau |
| IR-20 | `ai_usage_events.cost_currency` không có CHECK | Thêm `CHECK (cost_currency ~ '^[A-Z]{3}$')` |
| IR-21 | `activity_logs.details` có thể vô tình chứa dữ liệu cá nhân | Quy định danh sách khóa được phép ghi trong đặc tả; kiểm ở tầng ghi nhật ký |

## 2. Những điểm đã kiểm và đạt

- Không thiếu thực thể nào cho các chức năng CONFIRMED có dữ liệu cần lưu. Các thực thể ngoài DB (OneDrive, Auth, công ty thanh toán) đúng với [YK2] §7-2.
- Chuẩn hóa đạt 3NF; ba ngoại lệ (mảng hashtag, JSONB số liệu, tham chiếu mềm của nhật ký) có lý do rõ.
- Không có thiết kế thừa lớn: không bảng dự phòng, chia bảng theo tháng và mã hóa thêm chỉ để ở dạng đề xuất.
- Chống trùng (khóa `event_key`, `idempotency_key`), khóa lạc quan và quy tắc "người bấm trước thắng" đã có cho các luồng đã xác nhận.
- Quyền truy cập: FE không chạm DB, RLS bật và thu hồi quyền ở mọi bảng; không có thông tin thẻ hay mật khẩu trong bảng.

## 3. Kết luận

**APPROVED WITH CONDITIONS**, theo phạm vi:

| Phạm vi | Kết luận | Điều kiện |
|---|---|---|
| EP01, EP02, EP03, EP04, EP05, EP09, EP10 | Được bắt đầu sau khi xử lý điều kiện | **C1:** chọn cách xử lý IR-03 (khóa ngoại tới `auth.users` với DB tạm của Prisma). **C2:** sửa IR-07, IR-08, IR-09 (đều nhỏ, sửa trong `04`, `05`). **C3:** EP02 phần mục tiêu chỉ làm sau khi khách trả lời câu ở cột Comment của [QA] No.14 (IR-06) |
| EP06 Duyệt và đăng bài | **Chưa được bắt đầu** | Sửa thiết kế IR-01 (vòng đời theo từng mạng); chốt quy tắc trạng thái chung IR-02 (qua [QA] No.51) hoặc ghi quy tắc tạm vào đặc tả; xử lý IR-10 trong đặc tả hàng đợi |
| EP08 Thu phí | **Chưa được bắt đầu** | IR-05: chờ [QA] No.4, No.49, No.53 |
| Toàn bộ | Đối chiếu lại `01` §3 với 確認シート khi nhận được (IR-04) | — |

Không có vấn đề CRITICAL. Các vấn đề HIGH nằm gọn ở EP06, EP08 và khâu tạo migration. Phần còn lại của thiết kế không cần làm lại.

## 4. Tình trạng sửa (17/11/2026)

| Mã | Đã sửa ở | Cách sửa |
|---|---|---|
| IR-01 | `04`, `05`, `03` §5, `07` §3 | Thêm `post_deliveries.provider_state` (8 giá trị) và `provider_state_changed_at`; bỏ cột `result` (gộp vào `provider_state`) |
| IR-02 | `03` §5, `07` M-03 | Quy tắc tạm; vẫn chờ [QA] No.51 |
| IR-03 | `04`, `05`, `06`, migration `20261117000200_auth_ref_by_trigger` | Lúc đầu chọn cách (a). Khi triển khai thấy (a) chỉ gỡ được DB tạm: Prisma vẫn không đọc được DB thật có khóa ngoại sang schema `auth` (lỗi P4002), nên `migrate dev`, `db pull` không chạy được; (b) cũng vướng lỗi này. Đổi sang **cách (c) có chốt chặn**: bỏ khóa ngoại; trigger trên `auth.users` chặn xóa người dùng còn được tham chiếu; BE ghi đúng `id` do Auth trả về. Đã kiểm trên Supabase dev: xóa người dùng đang được tham chiếu bị chặn, `migrate dev` và `db pull` chạy thẳng được |
| IR-04 | `01` §2 | Ghi yêu cầu đối chiếu với 確認シート; **vẫn mở** cho tới khi nhận được bảng |
| IR-05, IR-06 | — | **Vẫn mở**: chờ khách |
| IR-07 | `04`, `05` | CHECK `target_path ~ '^/[^/\\]'` |
| IR-08 | `04`, `05`, `01` BR-20 | CHECK `chk_talents_office_no_approval` |
| IR-09 | Toàn bộ | Đổi `is_billable` thành `is_counted`; quy tắc tính tiền ghi ở DDL và từ điển |
| IR-10 | `07` §3 | Khóa theo thứ tự `id`, chia lô, `SKIP LOCKED`, kiểm lại cờ dừng |
| IR-11 | `04` P-11, `06` | Đề xuất `approval_round`, chờ [QA] No.58 |
| IR-12 | `04`, `05` | BE kiểm trùng với `auth.users` |
| IR-13 | `07` §3 | Tạo 3 mục tiêu trong cùng giao dịch tạo tài năng |
| IR-14 | `06` §2 | Ưu tiên ẩn danh khi chốt thời hạn giữ |
| IR-15 | `04` | Chỉ mục khóa theo `provider_state_changed_at`, `requested_at` |
| IR-16 | `04` | Bỏ `idx_talents_status`, `idx_talents_created_by_manager_id` |
| IR-17 | `01` BR-19 | |
| IR-18, IR-19 | — | Giữ nguyên (đã giải thích ở §1) |
| IR-20 | `04`, `05` | CHECK mã tiền tệ |
| IR-21 | `04`, `05` | Ghi quy định danh sách khóa cho phép |

Sau khi sửa, điều kiện C1 và C2 đã xong. **EP01–EP05, EP09, EP10 được bắt đầu**, riêng phần mục tiêu của EP02 vẫn chờ C3. EP06 đã sửa thiết kế (IR-01, IR-02 tạm), có thể bắt đầu với quy tắc tạm, nhưng phải chờ [QA] No.51 và No.58 trước khi nghiệm thu. EP08 vẫn chờ khách.

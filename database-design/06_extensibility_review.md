# 06. Tác động yêu cầu mới và khả năng mở rộng DB

> **Cập nhật quyết định 25/11/2026:** Đã đồng bộ nhóm quyết định đã rõ vào nội dung tài liệu. Phân biệt yêu cầu nguồn, SQL hiện có và thiết kế đích chưa có migration. Cấu trúc repository: 13 migration/53 bảng ứng dụng; chưa kiểm DB live. Các ghi chú ngày 18/11 và 23/11 giữ vai trò lịch sử ở phần đã được thay. [Hồ sơ thay đổi](decisions-update-2026-11-25.json); [review và phần còn thiếu](08_full_review_2026-11-25.md).

Bản 1.3 · Cập nhật 25/11/2026 · Người thực hiện: Codex (tác giả cập nhật, chưa có reviewer độc lập).

**Có ảnh hưởng đến thiết kế database.** Phần thay đổi chắc chắn ở mức quyết định nguồn gồm trạng thái tạm dừng, quyền hủy lịch, nơi nhận yêu cầu duyệt và bỏ các quy tắc cũ. Đề nghị inbox TikTok và lưu đồng ý phụ huynh đã có trả lời: giữ direct Upload-Post và không lưu hồ sơ phụ huynh. Ranking/voice ngoài phase hiện tại; không giữ ba mục này như quyết định còn chờ khách.

## 1. Phạm vi và căn cứ

Lần 23/11 đối chiếu 7 tài liệu DB,7 migration SQL; bản 25/11 bổ sung nguồn 24/11 và 13 migration. Phần kiểm kê 23/11 dưới đây là lịch sử: đối chiếu 7 tài liệu DB,7 migration SQL và Prisma schema trong repository với QA/KS tiếp nhận 23/11 và đợt `23112026`. Catalog hiện hành có 20 tệp, xem [TAI_LIEU_NGUON](../TAI_LIEU_NGUON.md), [review QA/KS](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md), [review đợt 23112026](../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md). Hash input/output và locator được ghi tại [review-2026-11-23.json](review-2026-11-23.json).

- **FACT lịch sử 23/11:** 7 migration tạo 40 bảng ứng dụng (25 public+15 app_private), chưa tính `_prisma_migrations` và Auth bên ngoài. Hai bảng tăng thêm là demo OneDrive; không chứng minh tính năng khách đã hoàn tất. Từ điển 05 giữ snapshot catalog 38 bảng và bổ sung mô tả 2 bảng từ SQL.
- **FACT về nguồn:** KS cộtK và sheet 20261120 có quyết định 20/11; QA có No.93–99 còn mở. UI-M20 lập 20/11; ISS22-D/P và ADV22 lập 22/11, chuẩn bị họp 24/11. Ngày thư mục không phải ngày duyệt.
- **INFERENCE:** các gap bên dưới cần được xử lý trước khi mở luồng tương ứng. Không suy ra code/guard/worker đã thực hiện từ việc schema có cột.
- **PROPOSAL:** P-21–P-26 và các thực thể đích là thiết kế nội bộ để review, chưa là migration hay phê duyệt khách.

Không truy cập DB đang chạy, không kiểm lại lịch sử áp migration, không chạy generator và không thay app/Prisma/agent_spec. Không tạo hoặc gửi Q&A mới.

## 2. Ma trận tác động hiện hành

Locator trang dưới đây là số trang PDF thực tế; KS/QA là ô trong workbook nguồn, không phải số dòng tài liệu phân tích.

| Chủ đề | Nguồn và trạng thái | Hiện có / khoảng lệch | Hướng cập nhật thiết kế, chưa triển khai |
|---|---|---|---|
| Tạm dừng Talent | KS `確認事項!K116`, `20261120!F32`: thêm 一時停止, vẫn trả phí | `talents.status` chỉ 3 giá trị; cờ pause đăng không cùng nghĩa | R01-11/BR-05/P-21: trạng thái và lịch sử hiệu lực; chốt ma trận chức năng/login/lịch, kiểm trigger/session và billing trước migration |
| Không giới hạn viết lại | KS K65, thay quyết định 2 lần 17/11; DEC-0001 | P-13 cũ đề nghị CHECK/counter 2 lần; SQL chưa có giới hạn này | Rút P-13; không tạo migration DROP giới hạn không tồn tại. Revision/audit vẫn cần thiết kế riêng |
| Hủy lịch | KS K84, F12: Talent hủy lịch mình đặt, Manager cũng hủy | cancel_reason hiện có chưa là bằng chứng actor/ownership/ack provider | P-22: actor từ phiên, operation, version, kết quả hủy và xử lý callback trễ; hủy không là quyền sửa nội dung |
| Bỏ dừng toàn hệ thống | KS K85, F33; dừng từng Talent còn | Cột global pause còn trong system_settings | Không làm nút sản phẩm; cột legacy chưa bị xóa. Dừng vận hành không chứng minh job đã gửi provider bị hủy |
| Người nhận duyệt | KS K77/K93, F11: Manager phụ trách từng Talent | manager_notifications hiện một dòng/sự kiện chung; chưa có recipient | P-15/P-16: phân công và recipient lịch sử. Quyền mọi Manager xem/cập nhật khác routing; No.87/88 còn mở |
| Đăng lỗi | KS K87, F13: báo Talent, Talent chờ rồi đăng lại; lỗi SNS/mạng không cần báo Adesso | Aggregate delivery không thay lịch sử từng lần thử | P-23: chống trùng, outcome unknown và đối soát; không tự chốt timer/retry tự động |
| NG và xác nhận lại | KS `20261122!G4:I4`; YK3 P688: AI sửa rồi đặt lịch, không Manager sửa, không Talent xác nhận lại | Luồng chính đã rõ; chỉ timestamp chưa đủ provenance | P-23/P-26; rút xung đột ba nhánh của snapshot 23/11. Giữ vòng sửa lỗi/tương tác duyệt và QA96 riêng. |
| Theo từng SNS và TikTok inbox | KS `20261122!G16:I16/G20:H20`; YK3 P249–250 | Giờ khác nhau theoSNS; hướng TikTok direct đã rõ, chưa có plan/attempt đầy đủ | Thiết kế plan/delivery/effect theoSNS; không tạo inbox baseline. Provider capability/tuân thủ do đội kiểm. |
| Media trước, chọn theo chủ đề | KS F8, K73, F18/F19: không FIFO hoặc tự sinh media AI trong autopost | Đề xuất hàng đợi mỗi ngày 1 video và quan hệ khoảng đăng chưa phù hợp | R05-05/P-12/U-13: tập media của khoảng đăng và bản tham chiếu khi gửi; không thêm counter FIFO |
| Lưu media | QA No.8 `Q&A!G9/H9`19/11: Supabase/OneDrive | media_assets thiên OneDrive và đường dẫn tạm | P-24: tham chiếu nơi lưu, ownership, URL có hạn, dọn tệp/đối soát; không quy định Supabase luôn chỉ tạm |
| Profile/readiness | QA101; YK3 P728–735 | Profile/history đã có SQL 25/11; readiness còn No.54/92 | DB nghiệp vụ; OneDrive export versioned. Không chờ khách duyệt lại việc lưu DB. |
| Nhóm và chỉ thị | YK3 P679/P705/P741/P783–797; QA99 | SQL đã có instruction global/Talent/history; category/membership/assignment còn thiếu | N:N category đã rõ, precedence Talent > category > global đã rõ; chỉ xung đột giữa category còn QA99. |
| Mục tiêu follower | QA No.14 `Q&A!H15`: theo từng SNS, mặc định 10000 | follower_goals đã có hướng này nhưng chặn ghi | R02-04: rút blocker tổng/theo mạng; vẫn cần version/tích hợp và reconnect No.95. Ngưỡng 25/50/75% chưa chốt |
| Hội thoại | QA No.7 `Q&A!H8`: Manager xem, Talent được báo trước | Mâu thuẫn riêng tư cũ đã rút | R01-15: không hỏi lại; kiểm guard và manager_view_logs khi triển khai |
| Tư vấn nghiêm trọng | KS F22: bỏ cảnh báo Manager; ISS22-P p 7 đề nghị hướng dẫn/ghi nhận | Catalog thông báo cũ còn loại cảnh báo | R03-03: không khôi phục alert; cách ứng xử/bản ghi tối thiểu còn No.93, không thêm bảng nhạy cảm tự động |
| Thử thách | QA `Q&A!G101:H101`; YK3 P296/P709–722 | Đã xác nhận chức năng và lưu tiến độ DB; chưa có entity | P-17: đội thiết kế instance/decision/progress/provenance/receipt; không chuyển việc chọn schema thành câu hỏi khách. |
| Thu phí | KS actionNo.16/G17 chọn Square được thuật lại; YK3 P661/P803–809/P819 | Paused vẫn thu phí; Manager đặt giá ước tính; billing ledger còn thiếu | Không chờ chọn lại cổng/nơi đặt giá. Đội kiểm Square; kỳ thu/adjustment/công nợ giữ QA49/53/62/98. |
| Đọc/xử lý thông báo | QA No.97 còn mở | handled_at dùng chung chưa trả lời read/handled hoặc per-manager | R09-05/P-16: không mặc định mở là xử lý xong; recipients và read state là quyết định khác nhau |
| Kết thúc/retention | KS 確認55/56; QA No.69/94/98 còn mở | FK RESTRICT, nhật ký append-only; quy tắc office/công nợ/bản sao còn thiếu | P-18: không tùy ý bypass trigger hoặc ẩn danh thay xóa; thiết kế phạm vi dọn và proof sau quyết định |
| Ranking | YK3 P62–65; QA100/action 15 | Ranking/reward/voice ngoài phase; đề nghị danh sách Talent nỗ lực vẫn việc đội | Không tạo bảng score/rank; không coiQA 100 Open là cho phép triển khai hoặc hỏi lại phase đã loại. |
| Đồng ý phụ huynh | KS `20261122!G18:H18` | Adesso lấy đồng ý ngoài app; hệ thống không lưu | R10-07/P-25: không tạo bảng; thay đánh giá xung đột của 23/11 đúng chủ đề. |
| So sánh liên Talent, KPI/voice/pilot | ISS22-P p 5/p 8–10: đề nghị | Không thể mở rộng quyền truy cập vì có nhu cầu chống trùng nội dung | FND-0053/P-25: giữ cách ly Talent; chưa tạo kho embedding/KPI/voice chỉ để đón đầu; pilot không tự thay phạm vi thương mại |

## 3. Thứ tự xử lý thiết kế và rủi ro

1. **Nền trạng thái:** P-21, kiểm dữ liệu cũ và reader/trigger liên quan; tách tạm dừng tự nguyện, dừng đăng, ngừng sử dụng và ngừng vì nợ. Token SQL và chính sách chuyển là thiết kế chưa duyệt.
2. **EP06:** thiết kế revision/consent/approval/cancel và từng SNS/lần thử; kiểm race giữa hủy, gửi, callback và retry. Giữ khóa chủ sở hữu, optimistic version, operation/outbox; không giữ transaction DB trong lúc gọi provider.
3. **EP08:** snapshot hợp đồng/giá/kỳ và usage bất biến trước khi tính tiền. Không suy giá quá khứ từ system_settings hiện tại; nguồn nói có trần video trong ISS22-P p 7 không tự lật QA No.3/17 và CR-12/16.
4. **Profile/notification/group:** tách dữ liệu gốc và bản đọc; quyền xem khác nơi nhận thông báo; chờ quyết định đúng QA No.87/88/95–99 cho phần còn mở.
5. **Chức năng đề nghị 22/11:** khách quyết định phạm vi; Tech Lead đánh giá thiết kế và provider. Chưa triển khai ranking/parental/crossTalent/voice.

Thêm cột nullable hoặc nới CHECK không mặc định ít rủi ro: phải xét khóa bảng, dữ liệu cũ, backfill, reader cũ, index, quyền runtime/RLS, callback và rollback. Thay provider có thể thay vòng đời consent/quota/inbox nên không chỉ đổi mã tham chiếu. Giữ khóa hiện có; chỉ thêm index theo truy vấn/đo tải thực, không tối ưu suy đoán từ 200 Talent.

## 4. Xác minh và việc còn thiếu

Đợt này ghi nhận đối chiếu của tác giả, **không đánh VERIFIED hay tự ký independent review**. Kiểm cơ học gồm 7 migration/40 bảng, giữ nguyên khối SQL trong từ điển và mã ví dụ, link nội bộ, source hashes và validator repository. Kết quả thực chạy ghi trong manifest.

G1 BLOCKED; G2–G4 STALE ở phạm vi nguồn thay đổi; G5/G6 BLOCKED, chưa có G7/G8 PASS. Không sửa gate để hợp thức hóa cập nhật DB. Cần reviewer độc lập và người duyệt đúng phạm vi; Tech Lead chịu trách nhiệm thiết kế/migration/provider, khách chịu trách nhiệm các chính sách/phạm vi còn mở. Không tạo câu hỏi trùng các QA đã có.

<details>
<summary>Lịch sử đánh giá 18/11 — không dùng thay ma trận hiện hành phía trên</summary>

Các nhận xét bên dưới được giữ làm lịch sử. Mục tiêu follower, hội thoại riêng tư,3 trạng thái, giới hạn viết lại, global stop và rủi ro migration đã được đánh giá lại phía trên; không áp dụng kết luận cũ cho nguồn 23/11.

> **Cập nhật 18/11/2026:** Các luồng thu phí, giá video, duyệt/đăng đang bị chặn ghi; trước khi mở phải thiết kế lại theo `07_implementation_scope_and_rules.md` §3 (giữ giá chụp lại, phiên bản nội dung, lần thử theo mạng), không chỉ thêm cột. Thêm cột không tự khôi phục được dữ liệu quá khứ.

Bản 1.1 · 18/11/2026 · Bước 6. Đánh giá schema hiện hành (`04`, `05`) trước các thay đổi yêu cầu có thể xảy ra. Không thêm cột hay bảng dự phòng; chỉ ghi nơi sẽ đổi và mức rủi ro.

Mức rủi ro migration:
- **Thấp:** thêm cột cho phép NULL, thêm bảng, thêm hoặc nới CHECK, thêm chỉ mục. Không đụng dữ liệu cũ.
- **Trung bình:** siết ràng buộc (dữ liệu cũ phải đạt trước), đổi giá trị liệt kê, cần chạy chuyển dữ liệu.
- **Cao:** tách hoặc gộp bảng, đổi khóa, đổi quan hệ 1:N thành N:N. Phải sửa nhiều module.

## 1. Mức gắn kết của schema

| Khía cạnh | Đánh giá |
|---|---|
| Bảng trung tâm | `talents` và `posts`. Mọi dữ liệu của tài năng đi qua `talent_id`; luồng đăng bài đi qua `posts`. Đổi khóa của hai bảng này là thay đổi lớn nhất có thể có, nhưng không có yêu cầu nào đang chờ đòi đổi khóa |
| Gắn kết với dịch vụ ngoài | Chỉ là cột mã tham chiếu dạng text (`posting_service_profile_ref`, `provider_member_ref`, `provider_job_ref`, `onedrive_item_id`). Đổi nhà cung cấp chỉ đổi giá trị, không đổi cấu trúc |
| Gắn kết với Supabase Auth | `auth_principals`, `managers`, `talents` có khóa ngoại thật tới `auth.users(id)` (RESTRICT); Prisma coi bảng Auth là bảng bên ngoài. Nếu sau này rời Supabase Auth: đổi đích của các khóa ngoại này và lớp adapter `infra/auth`, giữ nguyên `auth_principals` |
| Gắn kết với giao diện | Không có bảng nào dựng theo màn hình. Mã màn hình ([AG]) không xuất hiện trong schema; `manager_view_logs.screen` dùng tên chức năng (thông tin, hội thoại, kết quả), không dùng mã màn |
| Giá trị liệt kê | `text` + CHECK (D-16): thêm giá trị bằng một lệnh đổi CHECK, rủi ro thấp. Hai cột loại thông báo không có CHECK để tránh đổi DB mỗi khi thêm loại |

## 2. Tác động của từng điểm chưa xác nhận

| Mã | Nếu khách chốt… | Bảng bị ảnh hưởng | Thay đổi schema có thể có | Rủi ro |
|---|---|---|---|---|
| U-01 | Chu kỳ thu, ngày chốt, công ty thanh toán | Mới: hóa đơn tháng, kết quả thu tiền | Thêm bảng hóa đơn (theo tài năng và kỳ thu) và bảng lần thu tiền; liên kết lượt tạo video vào kỳ thu. Cần snapshot giá/kỳ và dữ liệu bất biến trước khi phát sinh usage tính tiền; boolean hiện tại không bảo đảm tái tính lịch sử | Cao trước khi mở EP08 |
| U-02 | Đơn giá video và cách tính khi đổi giá | `video_generations`, `system_settings` hoặc bảng giá mới | Snapshot giá/rule ở thời điểm yêu cầu; dữ liệu đã phát sinh không thể suy giá cũ từ giá mới | Cao nếu đã có usage |
| U-03 | Bài xin duyệt lại là **cùng bài** ([QA] No.58) | `posts`, `post_approval_decisions` | Phải có yêu cầu duyệt / vòng duyệt gắn phiên bản nội dung, một quyết định hiệu lực mỗi yêu cầu (P-11) | Trung bình |
| U-03 | Bài xin duyệt lại là **bài mới** (C-01 hiện tại) | `posts` | Thêm giá trị `returned` vào CHECK `cancel_reason` (P-06) | Thấp |
| U-04 | Danh sách 8 trạng thái của [QA] No.51 | `posts.status` | Thêm giá trị vào CHECK. Nếu tách trạng thái 差し戻し (trả lại) hoặc NGワードで保留 (giữ lại vì từ cấm) ra riêng thì phải chuyển dữ liệu từ cờ `ng_detected_at` hoặc từ `post_approval_decisions` sang trạng thái | Trung bình |
| U-05 | **Một** tài khoản mỗi mạng (**đã chốt**, [KS] 確認10) | `social_accounts` | Thêm chỉ mục UNIQUE có điều kiện (P-01). Phải kiểm dữ liệu cũ không có hai tài khoản đang kết nối | Trung bình |
| U-05 | **Nhiều** tài khoản mỗi mạng (CR-20) (**không làm**, [KS] 確認10) | `social_accounts`, `post_deliveries` | `social_accounts` đã cho phép N. Phải đổi UNIQUE (`post_id`, `platform`) của `post_deliveries` thành (`post_id`, `social_account_id`) và thêm cách chọn tài khoản đích | Trung bình |
| U-06 | Ghi cả trường hợp "bỏ qua" theo từng mạng | `post_deliveries.provider_state` | Thêm giá trị `skipped` (P-05) | Thấp |
| U-09 | Thời hạn giữ dữ liệu tài năng đã ngừng (確認55 (mục cần xác nhận số 55)): **đã chốt** 6 tháng rồi tự xóa ([KS]) | Mọi bảng có `talent_id`; hai bảng nhật ký | Ưu tiên ẩn danh (xóa nội dung, giữ khóa) thay vì xóa dòng; thủ tục dọn chạy bằng role chủ sở hữu và tạm bỏ qua trigger chỉ thêm | Trung bình |
| U-07 | Danh sách chỉ số Upload-Post | `post_metric_snapshots` | Giữ JSONB; nếu cần lọc hoặc tổng hợp nhiều thì thêm cột cho chỉ số chính, chuyển dữ liệu từ JSONB | Thấp |
| U-08 | Hội thoại riêng tư (CR-24) | Không đổi bảng | Đổi quyền truy cập ở BE; nếu có "phần được chia sẻ cho quản lý" thì thêm cột đánh dấu ở `coach_messages` | Thấp |
| U-09 | Thời gian giữ dữ liệu, nhật ký | Các bảng lịch sử | Không đổi cấu trúc; thêm việc dọn theo lịch. Nếu giữ lâu và nhiều dòng thì chia bảng theo tháng (P-09) | Thấp |
| U-10 | "Đã xử lý" **theo từng quản lý** | `manager_notifications` | Chuyển `handled_at`, `handled_by_manager_id` sang bảng mới (quản lý, thông báo, lúc xử lý) | Trung bình |
| U-11 | Danh sách loại thông báo cuối cùng | `talent_notifications`, `manager_notifications` | Không đổi DB; có thể thêm CHECK khi danh sách ổn định | Thấp |
| U-12 | Giờ nhắn buổi sáng theo từng tài năng | `talents` | Thêm cột giờ cho phép NULL (NULL thì dùng giờ chung) | Thấp |
| U-13 | Video tự làm thành bản nháp mỗi ngày (CR-23) | `media_assets` | Thêm giá trị `self_made` vào `source` và cột thứ tự hàng đợi hoặc lúc đã dùng | Thấp |
| U-14 | Đồng ý điều khoản (確認1) | `talent_applications` | Thêm cột lúc đồng ý và phiên bản điều khoản (NULL cho đơn cũ) | Thấp |
| U-15 | Nhóm tài năng, chỉ thị AI theo nhóm, duyệt theo nhóm (CR-17〜CR-19): **đã chốt làm** ([KS] 確認6–8, 34, 47) | Mới | Thêm bảng nhóm và bảng nối tài năng – nhóm (N:N, theo [P07]); duyệt theo nhóm thêm bảng quản lý phụ trách nhóm. Không phải sửa bảng hiện có | Thấp |
| U-16 | Cách đăng 自動投稿 ([KS] 確認19, 25) | `talents`, `posts`, bảng khoảng đăng mới | Thêm cột cách đăng, bảng khoảng, `posts.auto_post_period_id`; **sửa CHECK `chk_posts_adopted`** vì bài tự động không có `adopted_at` (P-12) | Cao: đổi ràng buộc lõi của `posts` |
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
| D-01: tài năng và tài khoản công ty chung một bảng | Nếu khách muốn tài khoản công ty có quy trình hoàn toàn khác (ví dụ nhiều quản lý dùng chung, xem [QA] No.66, S 06-07) | Khác biệt hiện chỉ ở CHECK; thêm cột riêng cho tài khoản công ty vẫn dễ hơn tách bảng |
| D-02: bản nháp và bài đăng là một thực thể | Nếu bản nháp cần vòng đời riêng (ví dụ nhiều phiên bản, sửa trực tiếp CR-21 cần lịch sử chỉnh sửa) | `revised_from_post_id` đã giữ chuỗi phiên bản; lịch sử sửa có thể thêm bảng riêng  Sửa chữ trực tiếp đã chốt ([KS] 確認28): vẫn sửa trên cùng dòng `posts`, không cần thực thể riêng. |
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

</details>

## 5. Phân tuyến hiện hành sau cập nhật 25/11

- **Đã có căn cứ nghiệp vụ:** agent/DB/backup và token doAdesso chịu; Challenge/progress/M-17 trong phạm vi; NG rewrite không xác nhận lại; direct TikTok; không lưu đồng ý phụ huynh; không trần riêng dưới 18; giờ theoSNS; paused vẫn thu phí; category N:N; giá ước tính doManager đặt. Không chờ khách trả lời lại các ý này.
- **Đội thiết kế/triển khai:** hoàn thiện data contract, constraint, ACL, snapshot/version, outbox/effect, price/usage ledger, recipient/email và backup/restore. Chưa có DDL không đồng nghĩa chưa có quyết định khách.
- **Còn mở đúng nhánh:** video確認61/62 và ghi/đảo lượt, giá lịch sử/điều chỉnh kỳ, đa category xung đột QA99, reconnectQA 95, thayNGQA 96, read/handledQA 97, công nợ QA98, purge/re-registrationQA 69/94 và các nhánh lịch cũ/thiếu media. Không tự đóng toàn bộ QA chỉ vì một phần được trả lời.
- **Trạng thái vật lý:**13 migration/53 bảng trong repository; chưa replay/live verify. SQL legacy giữ trigger hoãn tới khi module đủ thiết kế, migration và kiểm thử. G5 vẫn BLOCKED, không cấp G7/G8.

## 6. Kết quả thiết kế nhóm đội/provider

Phần đội xử lý đã có [phương án09](09_technical_design.md), [từ điển đích10](10_target_data_dictionary.md) và [12case provider](technical-provider-checks-2026-11-25.csv). Owner/schema/state/transaction/ACL/restore đã được đề xuất; providerchecks vẫn NOT_TESTED. Review này không chuyển QA hoặc G5/G8 sangPASS. Khi nguồn/providerproof đổi, reassess đúng contract và wave.

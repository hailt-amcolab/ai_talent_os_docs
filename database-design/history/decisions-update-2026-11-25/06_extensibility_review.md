# 06. Tác động yêu cầu mới và khả năng mở rộng DB

> **Review mới 25/11/2026:** Bộ này chưa đủ cho toàn phạm vi nguồn 0.3 và AI Core v2.10; các số đếm/scope bên dưới là snapshot cũ. Xem [báo cáo review đầy đủ](08_full_review_2026-11-25.md) và [coverage](review-2026-11-25-coverage.csv). SQL working tree hiện có13 migration/53 bảng ứng dụng; chưa kiểm DB live.

Bản1.2 · Rà soát23/11/2026 · Người thực hiện: Codex (tác giả cập nhật, chưa có reviewer độc lập).

**Có ảnh hưởng đến thiết kế database.** Phần thay đổi chắc chắn ở mức quyết định nguồn gồm trạng thái tạm dừng, quyền hủy lịch, nơi nhận yêu cầu duyệt và bỏ các quy tắc cũ. Inbox TikTok, ranking và lưu đồng ý phụ huynh mới là đề nghị hoặc xung đột, chưa đủ căn cứ tạo schema nghiệp vụ.

## 1. Phạm vi và căn cứ

Đối chiếu7tài liệu DB,7migration SQL và Prisma schema trong repository với QA/KS tiếp nhận23/11 và đợt `23112026`. Catalog hiện hành có20tệp, xem [TAI_LIEU_NGUON](../TAI_LIEU_NGUON.md), [review QA/KS](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md), [review đợt23112026](../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md). Hash input/output và locator được ghi tại [review-2026-11-23.json](review-2026-11-23.json).

- **FACT về repository:** 7migration tạo40bảng ứng dụng (25public+15app_private), chưa tính `_prisma_migrations` và Auth bên ngoài. Hai bảng tăng thêm là demo OneDrive; không chứng minh tính năng khách đã hoàn tất. Từ điển05 giữ snapshot catalog38bảng và bổ sung mô tả2bảng từ SQL.
- **FACT về nguồn:** KS cộtK và sheet20261120 có quyết định20/11; QA có No.93–99 còn mở. UI-M20 lập20/11; ISS22-D/P và ADV22 lập22/11, chuẩn bị họp24/11. Ngày thư mục không phải ngày duyệt.
- **INFERENCE:** các gap bên dưới cần được xử lý trước khi mở luồng tương ứng. Không suy ra code/guard/worker đã thực hiện từ việc schema có cột.
- **PROPOSAL:** P-21–P-26 và các thực thể đích là thiết kế nội bộ để review, chưa là migration hay phê duyệt khách.

Không truy cập DB đang chạy, không kiểm lại lịch sử áp migration, không chạy generator và không thay app/Prisma/agent_spec. Không tạo hoặc gửi Q&A mới.

## 2. Ma trận tác động hiện hành

Locator trang dưới đây là số trang PDF thực tế; KS/QA là ô trong workbook nguồn, không phải số dòng tài liệu phân tích.

| Chủ đề | Nguồn và trạng thái | Hiện có / khoảng lệch | Hướng cập nhật thiết kế, chưa triển khai |
|---|---|---|---|
| Tạm dừng Talent | KS `確認事項!K116`, `20261120!F32`: thêm 一時停止, vẫn trả phí | `talents.status` chỉ3giá trị; cờ pause đăng không cùng nghĩa | R01-11/BR-05/P-21: trạng thái và lịch sử hiệu lực; chốt ma trận chức năng/login/lịch, kiểm trigger/session và billing trước migration |
| Không giới hạn viết lại | KS K65, thay quyết định2lần17/11; DEC-0001 | P-13 cũ đề nghị CHECK/counter2lần; SQL chưa có giới hạn này | Rút P-13; không tạo migration DROP giới hạn không tồn tại. Revision/audit vẫn cần thiết kế riêng |
| Hủy lịch | KS K84, F12: Talent hủy lịch mình đặt, Manager cũng hủy | cancel_reason hiện có chưa là bằng chứng actor/ownership/ack provider | P-22: actor từ phiên, operation, version, kết quả hủy và xử lý callback trễ; hủy không là quyền sửa nội dung |
| Bỏ dừng toàn hệ thống | KS K85, F33; dừng từng Talent còn | Cột global pause còn trong system_settings | Không làm nút sản phẩm; cột legacy chưa bị xóa. Dừng vận hành không chứng minh job đã gửi provider bị hủy |
| Người nhận duyệt | KS K77/K93, F11: Manager phụ trách từng Talent | manager_notifications hiện một dòng/sự kiện chung; chưa có recipient | P-15/P-16: phân công và recipient lịch sử. Quyền mọi Manager xem/cập nhật khác routing; No.87/88 còn mở |
| Đăng lỗi | KS K87, F13: báo Talent, Talent chờ rồi đăng lại; lỗi SNS/mạng không cần báo Adesso | Aggregate delivery không thay lịch sử từng lần thử | P-23: chống trùng, outcome unknown và đối soát; không tự chốt timer/retry tự động |
| NG và xác nhận lại | KS K59: AI sửa rồi hẹn; UI-M20 p18: Manager sửa; ISS22-P p7: đề nghị Talent xác nhận | Ba nhánh khác nhau; timestamp NG không giữ bộ rule/revision | Giữ FND-0002/0003/0050; P-23/P-26. Hiệu lực NG mới với lịch cũ vẫn No.96; không tự chọn nhánh |
| Theo từng SNS và TikTok inbox | ISS22-P p3/p7; ADV22 p5: đề nghị | posts6state/deliveryaggregate chưa diễn tả consent/revision và người dùng hoàn tất trong TikTok | Chỉ thiết kế phương án P-23; inbox được gửi không là bài published. Kiểm provider/account riêng, không coi tài liệu công khai là POC |
| Media trước, chọn theo chủ đề | KS F8, K73, F18/F19: không FIFO hoặc tự sinh media AI trong autopost | Đề xuất hàng đợi mỗi ngày1video và quan hệ khoảng đăng chưa phù hợp | R05-05/P-12/U-13: tập media của khoảng đăng và bản tham chiếu khi gửi; không thêm counter FIFO |
| Lưu media | QA No.8 `Q&A!G9/H9`19/11: Supabase/OneDrive | media_assets thiên OneDrive và đường dẫn tạm | P-24: tham chiếu nơi lưu, ownership, URL có hạn, dọn tệp/đối soát; không quy định Supabase luôn chỉ tạm |
| Profile/readiness | UI-M20 p27 M-21: ảnh chân dung, URL Adesso, lịch sử thay đổi | Không thể tiếp tục nói chưa có đề xuất màn; cột readiness/version chưa có | R02-09/P-24: ranh giới nội dung OneDrive và metadata DB; trường bắt buộc/nơi lưu chưa chốt; không tự fetch URL |
| Nhóm và chỉ thị | UI-M20 p20 M-13/p25 M-19; QA No.99 còn mở | Chưa có bảng nhóm/assignment/chỉ thị version | P-15/P-17: chưa tự chốt precedence đa nhóm; nhóm Manager không là hàng rào truy cập |
| Mục tiêu follower | QA No.14 `Q&A!H15`: theo từngSNS, mặc định10000 | follower_goals đã có hướng này nhưng chặn ghi | R02-04: rút blocker tổng/theo mạng; vẫn cần version/tích hợp và reconnect No.95. Ngưỡng25/50/75% chưa chốt |
| Hội thoại | QA No.7 `Q&A!H8`: Manager xem, Talent được báo trước | Mâu thuẫn riêng tư cũ đã rút | R01-15: không hỏi lại; kiểm guard và manager_view_logs khi triển khai |
| Tư vấn nghiêm trọng | KS F22: bỏ cảnh báo Manager; ISS22-P p7 đề nghị hướng dẫn/ghi nhận | Catalog thông báo cũ còn loại cảnh báo | R03-03: không khôi phục alert; cách ứng xử/bản ghi tối thiểu còn No.93, không thêm bảng nhạy cảm tự động |
| Thử thách | KS K27, F30/F31: AI cá nhân hóa, mẫu không là catalog đóng | Chưa có vòng đời trạng thái cấu trúc | P-17: tách nội dung/chỉ thị OneDrive khỏi dữ liệu tiến độ; trạng thái, tiêu chí đo và giới hạn đồng thời chưa chốt |
| Thu phí | KS K104/F24: hướng trả trước; cân nhắc ngừng sau1tháng nợ; K100/F25: GMO ứng viên; K112: office miễn phí tạo video | billing_accounts/is_counted không đủ hợp đồng, giá lịch sử, kỳ thu, đối soát | U-01/U-02: hóa đơn/dòng hóa đơn/lần thu và snapshot giá trước mở EP08. Không bật auto-lock; office miễn thu không chứng minh chi phí provider bằng0 |
| Đọc/xử lý thông báo | QA No.97 còn mở | handled_at dùng chung chưa trả lời read/handled hoặc per-manager | R09-05/P-16: không mặc định mở là xử lý xong; recipients và read state là quyết định khác nhau |
| Kết thúc/retention | KS 確認55/56; QA No.69/94/98 còn mở | FK RESTRICT, nhật ký append-only; quy tắc office/công nợ/bản sao còn thiếu | P-18: không tùy ý bypass trigger hoặc ẩn danh thay xóa; thiết kế phạm vi dọn và proof sau quyết định |
| Ranking | UI-M20 p28: top3,7/30ngày; p29: trọng số cần xác nhận | Chưa có bảng; KPI nguồn khác rankingUI | FND-0051/P-25: chưa tạo score/materialized view khi công thức, đối tượng và visibility chưa duyệt; không tự đặt mãM-22 |
| Đồng ý phụ huynh | KS `確認事項!F38`: không lưu; ISS22-P p6 đề nghị lưu | Xung đột dữ liệu nhạy cảm | FND-0052/P-25: chưa thêm bảng/cột; khách quyết phạm vi, đội thiết kế quyền/retention sau |
| So sánh liên Talent, KPI/voice/pilot | ISS22-P p5/p8–10: đề nghị | Không thể mở rộng quyền truy cập vì có nhu cầu chống trùng nội dung | FND-0053/P-25: giữ cách ly Talent; chưa tạo kho embedding/KPI/voice chỉ để đón đầu; pilot không tự thay phạm vi thương mại |

## 3. Thứ tự xử lý thiết kế và rủi ro

1. **Nền trạng thái:** P-21, kiểm dữ liệu cũ và reader/trigger liên quan; tách tạm dừng tự nguyện, dừng đăng, ngừng sử dụng và ngừng vì nợ. Token SQL và chính sách chuyển là thiết kế chưa duyệt.
2. **EP06:** thiết kế revision/consent/approval/cancel và từng SNS/lần thử; kiểm race giữa hủy, gửi, callback và retry. Giữ khóa chủ sở hữu, optimistic version, operation/outbox; không giữ transaction DB trong lúc gọi provider.
3. **EP08:** snapshot hợp đồng/giá/kỳ và usage bất biến trước khi tính tiền. Không suy giá quá khứ từ system_settings hiện tại; nguồn nói có trần video trong ISS22-P p7 không tự lật QA No.3/17 và CR-12/16.
4. **Profile/notification/group:** tách dữ liệu gốc và bản đọc; quyền xem khác nơi nhận thông báo; chờ quyết định đúng QA No.87/88/95–99 cho phần còn mở.
5. **Chức năng đề nghị22/11:** khách quyết định phạm vi; Tech Lead đánh giá thiết kế và provider. Chưa triển khai ranking/parental/crossTalent/voice.

Thêm cột nullable hoặc nới CHECK không mặc định ít rủi ro: phải xét khóa bảng, dữ liệu cũ, backfill, reader cũ, index, quyền runtime/RLS, callback và rollback. Thay provider có thể thay vòng đời consent/quota/inbox nên không chỉ đổi mã tham chiếu. Giữ khóa hiện có; chỉ thêm index theo truy vấn/đo tải thực, không tối ưu suy đoán từ200Talent.

## 4. Xác minh và việc còn thiếu

Đợt này ghi nhận đối chiếu của tác giả, **không đánh VERIFIED hay tự ký independent review**. Kiểm cơ học gồm7migration/40bảng, giữ nguyên khối SQL trong từ điển và mã ví dụ, link nội bộ, source hashes và validator repository. Kết quả thực chạy ghi trong manifest.

G1 BLOCKED; G2–G4 STALE ở phạm vi nguồn thay đổi; G5/G6 BLOCKED, chưa có G7/G8 PASS. Không sửa gate để hợp thức hóa cập nhật DB. Cần reviewer độc lập và người duyệt đúng phạm vi; Tech Lead chịu trách nhiệm thiết kế/migration/provider, khách chịu trách nhiệm các chính sách/phạm vi còn mở. Không tạo câu hỏi trùng các QA đã có.

<details>
<summary>Lịch sử đánh giá18/11 — không dùng thay ma trận hiện hành phía trên</summary>

Các nhận xét bên dưới được giữ làm lịch sử. Mục tiêu follower, hội thoại riêng tư,3trạng thái, giới hạn viết lại, global stop và rủi ro migration đã được đánh giá lại phía trên; không áp dụng kết luận cũ cho nguồn23/11.

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
| D-01: tài năng và tài khoản công ty chung một bảng | Nếu khách muốn tài khoản công ty có quy trình hoàn toàn khác (ví dụ nhiều quản lý dùng chung, xem [QA] No.66, S06-07) | Khác biệt hiện chỉ ở CHECK; thêm cột riêng cho tài khoản công ty vẫn dễ hơn tách bảng |
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

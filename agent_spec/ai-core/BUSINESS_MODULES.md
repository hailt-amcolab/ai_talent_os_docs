# AI Talent OS — Ranh giới và ràng buộc các module nghiệp vụ

> **Đồng bộ Q&A26/11:** hành vi nghiệp vụ theo trả lời từng ý tại [hồ sơ cập nhật](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md); chưa tự duyệt G7/G8 hoặc thương mại.

**Bản 1.0 · 26/11/2026.** Thuộc bộ [AI Core](AI_CORE_ARCHITECTURE.md). Tài liệu này là **đầu vào** để viết đặc tả từng module (SCD `SCD/EPxx` hoặc tài liệu module), **không phải** đặc tả để giao lập trình. Một module chỉ được giao cho AI agent khi đã có đặc tả đạt hợp đồng ở §3. Cách AI Core gọi vào module (tool, task, mã lỗi) nằm ở [Runtime §2.4, §3.2](AI_RUNTIME_DESIGN.md) và [Kiến trúc §9](AI_CORE_ARCHITECTURE.md#9-luồng-chính).

**Lưu ý DB trước khi code:** các bảng `billing_accounts`, `social_accounts`, `follower_goals`, `follower_snapshots`, `post_approval_decisions`, `post_deliveries`, `post_metric_snapshots`, `video_generations`, `video_generation_inputs`, `manager_notifications` đang bị trigger `reject_deferred_write` từ chối mọi lệnh ghi (SQLSTATE 55000); `posts` chỉ cho ghi trạng thái `draft`. Mở lại theo [07 §3](../../database-design/07_implementation_scope_and_rules.md) và đề xuất P-12…P-20 trong `database-design/04`.

Nguồn chung: YK3 bản 0.3 (24/11/2026), QA và KS hiện hành, SD-T18/SD-M18 (mã màn hình dùng đúng bản). Mục chưa chốt giữ nguyên số QA/確認; tài liệu này không tự đặt luật.

## 1. Bảng module

| Module | Dữ liệu và cổng chính | Ràng buộc và nhánh lỗi bắt buộc |
|---|---|---|
| Identity & Enrollment | Đơn, đồng ý điều khoản/version, quyết định duyệt, danh tính, đổi mật khẩu, onboarding; `EnrollmentService`, `AccessPolicy` | Talent chưa duyệt không đăng nhập; Manager duyệt/từ chối, gửi email mẫu; email trùng phân biệt đang chờ và đã đăng ký; đơn không tự hết hạn; reCAPTCHA kiểm ở BE. Ngày sinh để tính tuổi tham khảo, không tự thêm sổ đồng ý phụ huynh |
| Billing & Entitlement | Customer/subscription/payment-method ref, kỳ phí, trạng thái thanh toán; `BillingGateway`, `EntitlementQuery` | Chỉ kích hoạt sau callback/webhook đã xác minh và chống trùng; redirect của trình duyệt không chứng minh hoàn tất. Không lưu số thẻ. Khi Square thu lại vẫn chưa xác nhận thanh toán: tự chuyển 支払い待ち, báo Talent/Manager, dừng AI/video/đăng nhưng vẫn thu tháng và cho login đổi thanh toán; trả thành công tự về 利用中 (QA63/86 ngày26/11, thay QA46). Ngày thu/khả năng Square còn QA4/49. Square (hướng mới, KS action 16) chưa chứng minh đáp ứng nhà mạng/phí biến đổi; giữ adapter, không tự đổi sang chỉ thẻ |
| Talent & Office Registry | Profile quản lý, category, người phụ trách, loại tài khoản, mục tiêu, trạng thái; `TalentService` | Manager một loại quyền, xem/sửa mọi Talent (QA88); grant MCP có thể hẹp hơn. Office có principal riêng, đăng nhập lại để chuyển; miễn phí tháng, usage video tách cho Adesso |
| SNS Connection | Ánh xạ Talent–provider user–tài khoản nền tảng, trạng thái, revision kết nối; `SnsConnectionService` | Một tài khoản mỗi SNS; dùng được khi chỉ nối một phần; Talent tự OAuth, không đưa mật khẩu SNS cho model; báo lỗi/kết nối lại/hủy; đổi tài khoản khi có lịch theo QA95; callback gắn owner/state, chống replay |
| Coach Configuration | Profile cho AI, chỉ thị theo tình huống/scope, version | Thuộc AI Core ([DB §3.4](DATABASE_DESIGN.md)) |
| Coach & Personalization | Chủ đề buổi sáng, lời nhắc, tổng kết, memory, Challenge, persona | Chưa có dấu 登録完了 của Manager thì chưa bắt đầu đề xuất; M-08 không trường bắt buộc (QA54/92). Không chặn mọi màn. Nội dung trong file/media/tin tức là dữ liệu không tin cậy |
| Media, Posting, Approval & Delivery | Asset, bản nháp, snapshot duyệt, approval, lịch theo SNS, delivery | Chỉ gửi tài nguyên ready của đúng owner; kiểm chế độ, media, NG, duyệt, tài khoản/trạng thái/version trước khi lập và trước khi gửi lịch. Không tự đăng lại bài thất bại (YK3 đoạn 387) |
| Video Generation | Ý tưởng/kịch bản, lựa chọn video cơ bản, báo giá, request, xem trước, dùng/bỏ/làm lại, sổ usage | Soạn ý tưởng không tính phí. Request chỉ sau khi Talent đồng ý đúng giá/asset/model revision; mỗi lần làm lại là request mới gắn request gốc; tính theo giá lúc 依頼, lỗi dịch vụ không tính; lỗi phát hiện sau tổng hợp trừ kỳ sau (QA62 ngày26/11); số tiền cụ thể còn QA2 |
| Metrics & Goals | Snapshot theo SNS/bài, độ mới, khả dụng, mục tiêu có version; `MetricsQuery` | Thiếu/không hỗ trợ/cũ khác số 0; ingestion trước khi phân tích; đổi mục tiêu phản ánh ngay. Talent chỉ thấy mình; Manager thấy tất cả |
| Notifications | Event nghiệp vụ, inbox, trạng thái đã đọc/đã xử lý, push/email; `NotificationService` | Inbox DB là căn cứ, push chỉ cố gắng. Gửi Manager phụ trách theo nguồn mới; bàn giao khi vô hiệu hóa theo QA88. Gửi push/email không có nghĩa đã đọc |
| Administration & Audit | Category CRUD/màu/thứ tự/thành viên; cài đặt chung; mời/vô hiệu hóa Manager, MFA; nhật ký xem/thao tác/xử lý | Nhật ký xem theo Manager/thời gian/Talent/màn, có lọc và phân trang; Talent không vào quản trị; phạm vi nhật ký thao tác/xử lý theo CR07 |
| Lifecycle & Retention | Trạng thái tài khoản, cổng đăng bài, workflow chấm dứt, lịch xóa, receipt từng kho | Đổi trạng thái và hủy lịch ngoài là saga có đối soát; dừng worker không hủy lịch Upload-Post; phạm vi theo CR08 |

Căn cứ: YK3 P112–238, P516–661, P679–847; QA `Q&A!G88:H88`; `追加要件!A2:N15`; KS `20261122!G18:H18`, `アクション一覧!G17`.

## 2. Ràng buộc theo chủ đề

### 2.1. Coach chủ động, memory, Challenge, persona

- **Buổi sáng:** scheduler tạo việc theo Talent/ngày/khung/settings revision; metrics cập nhật trước giờ chào; tạo ba chủ đề, lời nhắc và tổng kết hôm trước. Tin tức (nếu dùng) phải có URL, thời điểm, nguồn; model không có nguồn thì không nói đã tìm tin. Cache tin chung chỉ chứa dữ liệu công khai.
- **Gửi chủ động:** khung sáng/trưa/tối kể cả cuối tuần/ngày lễ; nhắc thiếu media trước giờ đăng; tổng kết tuần theo ngày cấu hình; nhắc không hoạt động theo bài thực đăng. Tạo event và inbox rồi mới push; mở lại vẫn thấy nội dung. Đổi/hủy lịch kiểm settings/trạng thái/kỳ lúc chạy. Autopost không tạo lời chào riêng cho từng bài.
- **Memory:** quan sát từ hội thoại và kết quả bài, có owner/nguồn/thời gian/độ tin cậy/version; suy luận của AI có nhãn riêng với dữ liệu Manager nhập; chỉ thêm, không ghi đè. Không vector/embedding; không fine-tune; AI không tự sửa chỉ thị Manager.
- **Challenge:** thuộc Talent, có mục tiêu/hạn/số lần/nguồn đề xuất; nhận/từ chối qua chat là lệnh. Tiến độ có bằng chứng (bài/delivery hoặc lời Talent tự báo có nhãn), chống cộng trùng. QA72 ngày26/11 chấp thuận chỉ tự xác định đạt cho chỉ tiêu đếm bằng số (chuỗi ngày, số bài, follower tăng); loại khác chỉ lời nhắn, không tự chúc mừng đạt. Trạng thái đề xuất/đã nhận/từ chối/đang thực hiện/đạt/hết hạn; AI đặt hạn, chỉ một thử thách đang thực hiện. Chuỗi ngày: ít nhất một bài thành công tới một SNS đã nối; có ngày trống thì lần tiếp theo về1. Prompt Nonaka vẫn chờ Adesso27/11; không chặn ba quy tắc đã chấp thuận. Lời khen dựa kết quả có căn cứ, không cần Manager duyệt.
- **Giới hạn hội thoại:** chỉ thị theo tình huống hướng về hoạt động nghệ sĩ/công việc/follower; chuyển hướng khi lạc đề. Không tạo cảnh báo "tư vấn nghiêm trọng" tới Manager (KS mới bỏ). Manager đọc hội thoại theo quyền; thông báo quyền riêng tư ở onboarding là bắt buộc.
- **Persona:** catalog nhân vật do Adesso cung cấp (CR14), Talent chọn qua UI, lưu có version; không cố định Momo; đổi tên riêng còn mở; không upload avatar tùy ý.

Căn cứ: YK3 P243–255, P289–296, P390–407, P436–442, P516–539, P574–578, P704–745, P803–809; QA No.9/14/18/38/72/73/93/101; KS `20261122!G17:I17`, `G32:H32`.

### 2.2. Video và tiền

Luồng: `idea → scenario_ready → awaiting_cost_consent → requested → generating → preview_ready / failed / unknown → adopted / rejected`; làm lại tạo request mới gắn request gốc. Chọn dùng biến output đã kiểm thành media asset để vào luồng bài, không tự đăng. Manager tạo video thay Talent dùng cùng service (actor Manager, người hưởng Talent, phí gắn Talent theo CR02); không mở qua MCP.

Mỗi request lưu asset/version, kịch bản, model/format revision, giá/báo giá revision, consent, provider ref, trạng thái, chi phí. Phân biệt số request, số thành công, failed/unknown, số lượt tính cho Talent và chi phí thật. Lỗi provider không tự coi là tính phí; ghi lượt tại 依頼 và điều chỉnh theo QA62 ngày26/11: báo lỗi dịch vụ trừ ngay; sau tổng hợp mới biết lỗi trừ kỳ sau; yêu cầu sau ngày chốt vào kỳ sau. Ngày chốt và khả năng thu Square còn QA4/49. Giá đổi không tính lại request cũ. Không tự thêm lượt miễn phí cho người dưới 18. Output dọc/âm thanh/định dạng cho ba SNS; nhãn AI theo khả năng đã kiểm; provider từ chối ảnh trẻ em thì hướng dẫn dùng video tự làm.

Căn cứ: YK3 P462–510, P617–645; QA `追加要件!A3:N3`, No.1–4/60/62; KS `20261122!G3:I10`, `G33:I34`.

### 2.3. Trạng thái tài khoản, dừng và xóa

- Vòng đời tài khoản tách khỏi `autopost_enabled`, trạng thái thanh toán, kết nối, run. Phân biệt `before_use / in_use / paused / terminated` và trạng thái Chờ thanh toán 支払い待ち được QA63/86 ngày26/11 bổ sung. Không tự gộp Chờ thanh toán vào kết thúc; mapping enum là thiết kế cần cập nhật riêng, không thay schema trong đợt tài liệu này. Terminated không khôi phục trực tiếp; đăng ký lại theo QA69.
- `LifecycleService` nhận lệnh Manager có version/xác nhận, ghi trạng thái + outbox trong transaction. Mọi điểm mở run/tạo video/lập lịch/gửi effect gọi `AccessPolicy` hiện hành. Hủy lịch ngoài timeout → `cancellation_pending/unknown`, Manager thấy được. Không tự đăng bù khi mở lại.
- Sau terminated: mốc lưu 6 tháng; `RetentionService` lập manifest DB/media/OneDrive/provider/cache; xóa có receipt từng kho, retry/đối soát, chặn tái tạo từ outbox cũ; restore backup áp lại manifest. Phạm vi tự động/thủ công theo CR08/QA29/69/94/98.
- Không có nút dừng mọi lịch của mọi Talent (KS24). Tạm dừng vẫn thu phí tháng; thanh toán lại thất bại tự sang Chờ thanh toán, dừng AI/video/đăng nhưng không chấm dứt tài khoản (QA63/86). Bài lỡ giờ trong lúc dừng không tự đăng bù.

Căn cứ: YK3 P657–674, P815–819, P888; KS `20261122!G30:H30`, `G35:I35`; QA No.10/12/29/46/63/64/69/86/94/98, `追加要件!A9:N9`.

### 2.4. Thông báo, metrics, quản trị, giao diện

- **Thông báo:** event có ID/version, Talent, loại, nguyên nhân, resource ref; inbox đúng người nhận và delivery outbox riêng cho push/email; unique theo event/người nhận/kênh. No.97/76 xác định mở dòng là 対応済み; không có hai bước đọc/xử lý nghiệp vụ riêng. Delivery email/push vẫn là trạng thái kỹ thuật riêng; người nhận ngoài duyệt và fallback còn QA87. Lỗi SNS/mạng không tự cảnh báo Manager (P388/1318). Nội dung theo mẫu Adesso; không đặt hội thoại/PII vào payload màn khóa.
- **Metrics:** ingestion theo ngày và trường provider hỗ trợ; lưu platform/post ref, thời điểm quan sát/lấy, giá trị, khả dụng. Không cộng follower ba SNS thành một mục tiêu. Mục tiêu mặc định 10.000 mỗi SNS, Manager sửa được. Event đạt mục tiêu gắn goal version và snapshot. Xếp hạng ngoài giai đoạn1; bỏ màn và nút menu/home tương ứng (QA100 trả lời25/11). Lấy lỗi giữ snapshot cũ có nhãn.
- **Quản trị:** tìm/lọc Talent theo trạng thái, không hoạt động, category, người phụ trách, office. QA99 dự kiến nhiều category và thứ tự theo Talent nhưng còn chờ Adesso27/11, chưa là chính sách được duyệt. QA54/92: Manager bấm 登録完了, M-08 không trường bắt buộc; chỉ thị AI ưu tiên nếu mâu thuẫn profile. Thử chỉ thị chạy sandbox, không tạo bài/lịch/video. Cài đặt chung và NG list là lệnh có version/audit; không tự sửa lịch cũ (QA96).
- **Giao diện:** màn hình đọc state/allowed actions/missing requirements từ API; client giữ operation ref để khôi phục khi đổi thiết bị/reload; cache tách theo tài khoản, xóa khi đăng xuất; hướng dẫn cài PWA và xin quyền push; callback SNS/thanh toán có màn quay lại và poll server. Manager PC là chính, duyệt và chỉ thị dùng được trên mobile (CR13).

Căn cứ: YK3 P203–237, P516–609, P679–847, phụ lục B P1277–1347; QA No.14/21/31/33/54/72/75/87/88/92/95–100; CR03/04/13/14.

## 3. Hợp đồng liên module (điều kiện để giao lập trình)

Module ngoài AI Core không phải dùng model/tool. Ví dụ: webhook thanh toán → BillingService → Entitlement/Registry → tạo folder + thông báo; chọn persona → PersonaService → context revision; ingestion metrics → MetricsService → task tổng kết. Đây là lệnh/event bình thường qua Business Control Plane ([Kiến trúc §7](AI_CORE_ARCHITECTURE.md#7-sơ-đồ-thành-phần)).

Mỗi module phải có đặc tả được review gồm: actor/scope; request + `expectedVersion` + `requestKey`; trạng thái và thao tác cho phép; output/receipt; lỗi và ngữ nghĩa retry; quyền DB; phụ thuộc/readiness; event và consumer; timeout/unknown/đối soát; retention; ca kiểm có nguồn.

Quy ước event dùng chung: event outbox **không mang payload**, chỉ có `operation_id`, `generation`, `event_type`; consumer đọc lại dữ liệu hiện hành qua `operation_id` trước khi tác động. Tên `<module>.<hành động>`. Không đặt token, ảnh, hội thoại trong queue.

Dữ liệu của module map vào schema canonical hiện có trước khi thêm bảng; dùng lại profile/posts/media/delivery/billing, không tạo bản sao dưới `agent_*`.

## 4. Luồng Talent từ hội thoại đến đăng SNS

1. **Chọn chủ đề:** tại T-11 hoặc từ ứng viên T-09; Posting lưu chủ đề gắn conversation/bài. Chủ đề của bài khác chủ đề kỳ autopost.
2. **Nhận tư liệu:** nút gửi ảnh/video trong hội thoại (có thể mở T-13); media API theo danh tính Talent; asset có owner/version/status; kiểm file và xác nhận ready trước khi dùng. Model chỉ nhận asset ref hoặc kết quả phân tích.
3. **Hiểu ảnh/video:** task `media_analysis` trên asset ready; kết quả gắn asset/version/nguồn; video qua khung hình nếu API không nhận video trực tiếp; chưa xong thì trả trạng thái chờ, không bịa.
4. **Tạo và sửa bài:** task `caption` từ chủ đề, chỉ thị, profile, phân tích media; Posting lưu draft/version cùng danh sách asset; T-12 xem; sửa qua `caption_rewrite` với draft ID và expected version (không giới hạn số lần theo DEC-0001 ngày20/11); Talent sửa trực tiếp phần nguồn cho phép.
5. **Xác nhận/duyệt:** chế độ 要確認 dùng thao tác adopt của Talent ở T-12; chế độ không xác nhận dùng policy đã lưu, không tạo đồng ý giả từ model. Daily và auto theo kỳ có thể chạy cùng lúc; T-08❺ xác nhận áp dụng cả hai, auto theo kỳ không Manager duyệt (QA71/84). Bài công việc do Talent tự đánh dấu để xin Manager duyệt; hệ thống không để model tự phân loại (YK3 P355, KS `20261122!G33:I33`); autopost/office theo ngoại lệ nguồn (P359).
6. **Đặt lịch:** task `post_time` đề xuất giờ trong khung chỉ thị; Posting kiểm nội dung/media/policy/quyền/tài khoản/version rồi commit kế hoạch + outbox. Bài chưa đủ duyệt không vào đường đăng; quá hạn duyệt theo nguồn.
7. **Gửi SNS:** worker effect gọi Upload-Post, lưu delivery/request ref theo từng SNS; một bài nhiều SNS có thể thành công một phần.
8. **Trả kết quả:** webhook hoặc đối soát xác định trạng thái delivery; cập nhật DB, tạo thông báo; T-16/T-17/T-18 hiển thị. Model giải thích từ dữ liệu có nguồn, không xác nhận bài đã đăng.

**Trạng thái logic:** `topic_selected → awaiting_media → media_processing → draft_ready → awaiting_talent_review / awaiting_manager_approval / ready_to_schedule → scheduled → delivery_pending → published / failed / partial / unknown`. Nhánh duyệt tính từ chế độ và loại bài. Adopt/approval tham chiếu snapshot caption + hashtag + asset version + SNS đích; đổi các trường đó thì bằng chứng cũ mất hiệu lực phần tương ứng. `posts.scheduled_at` đơn lẻ không đủ cho giờ riêng từng SNS: cần plan/delivery theo nền tảng.

**Từ cấm:** KS `20261122!G4:I4`: AI sửa từ cấm rồi đặt lịch, không cần Talent xác nhận lại. QA71 ngày26/11: AI sửa rồi đặt lịch, không báo Manager hoặc yêu cầu Talent xác nhận lại. QA96: danh sách mới chỉ dùng từ lần kiểm sau thay đổi, không quét lại lịch đã kiểm; muốn dừng Manager huỷ. Lỗi AI vẫn không sửa được là nhánh kỹ thuật cần thiết kế, không lấy đây làm lý do giữ QA96 ở trạng thái chưa trả lời. Retry kỹ thuật khác với một lần đăng nghiệp vụ mới.

**Dữ liệu dùng lại:** `posts`, `post_media`, `media_assets`, `post_approval_decisions`, `post_deliveries`, `theme_suggestions`; bổ sung liên kết conversation–topic–post và snapshot duyệt trong thiết kế DB canonical khi thiếu.

**Ca nghiệm thu luồng:** ảnh đơn/nhiều ảnh; video có phân tích hoặc báo không hỗ trợ; sửa draft trước adopt; xác nhận đúng revision; chế độ 自動投稿; bài công việc chờ duyệt/quá hạn; ảnh bỏ YouTube; video tới SNS đã nối; delivery một phần/lỗi/unknown; replay job và hủy lịch.

## 5. Ca kiểm toàn hệ thống

Ca kiểm lõi AI Core (AIC-T01–T21, T36–T41) ở [Kế hoạch §4](IMPLEMENTATION_PLAN.md#4-ánh-xạ-ca-kiểm-hồi-quy). Expected result chưa chốt giữ `POLICY_PENDING`, không viết test xác nhận giả định.

| Mã | Chuỗi kiểm | Kết quả cần có |
|---|---|---|
| AIC-T22 | Chọn chủ đề → gửi ảnh → AI tạo/sửa draft → adopt → lịch → kết quả SNS | Đúng owner/asset/version; một lệnh publish; UI có receipt và từng delivery; lời model không thay kết quả provider |
| AIC-T23 | Như trên với video, chế độ 自動投稿 và bài công việc | Phân tích media có bằng chứng; đúng nhánh duyệt; unsupported/unknown hiển thị rõ |
| AIC-T24 | Đăng ký → duyệt → mật khẩu → đăng ký thanh toán → kích hoạt | Callback xác minh/chống lặp; một account/folder/thông báo; chưa duyệt không đăng nhập; chưa có profile không sinh bài; email trùng và mất redirect có đường phục hồi |
| AIC-T25 | SNS nối một phần, hết quyền, ngắt/đổi tài khoản khi có lịch | Đúng owner/tài khoản/nền tảng; lịch cũ không gửi sang tài khoản mới; chặn ngắt/đổi đúng SNS còn lịch, hiển thị để Talent huỷ trước; SNS khác không bị chặn (QA95) |
| AIC-T26 | Tin tức + metrics → ba chủ đề → nhắc trưa/tối → ngày/tuần sau | Đúng múi giờ/hạn/cuối tuần/settings; có nguồn tin; không bịa metrics; replay không lặp tin/thông báo |
| AIC-T27 | Memory, nhận/từ chối Challenge, tiến độ, khen | Tách Talent; có nguồn/độ tin cậy; idempotent; tiêu chí số theo QA72; loại không đếm được không tự chúc mừng đạt |
| AIC-T28 | Ý tưởng video → đồng ý giá → request → xem trước → làm lại/dùng/bỏ | Không tính phí khi soạn ý tưởng; consent đúng asset/giá; sổ phân biệt failed/unknown/tính phí; dùng thì vào media |
| AIC-T29 | Phí tháng + usage video, đổi giá giữa kỳ, webhook trùng/sai thứ tự, thu lỗi | Không nhân hóa đơn/usage; giữ giá snapshot; thu lại thất bại → Chờ thanh toán, dừng AI/video/đăng; trả thành công tự mở; office miễn tháng |
| AIC-T30 | Tạm dừng/dừng/chấm dứt khi đang chạy agent và có lịch provider | Chặn lệnh mới; hủy lịch có đối soát; người dùng thấy pending/unknown |
| AIC-T31 | Xóa hết hạn, crash giữa các kho, restore rồi job cũ chạy | Manifest/receipt đúng; không hồi sinh dữ liệu hay chạy lại effect; dùng dữ liệu giả |
| AIC-T32 | Toàn bộ 16 loại thông báo phụ lục B | Đúng người nhận/kênh (§6.3); inbox còn khi push lỗi; mở là 対応済み; không có bước xử lý thủ công riêng (QA97) |
| AIC-T33 | Dashboard/category/settings/persona/thử chỉ thị/lịch sử/khôi phục | Lọc đúng; Manager xem tất cả; Talent không vào quản trị; sandbox không tác động/chi phí video; xung đột QA99 hiện rõ |
| AIC-T34 | Metrics thiếu/cũ/không hỗ trợ, đổi mục tiêu, lấy lại | UI và AI cùng snapshot; thiếu khác 0; không lặp thông báo mục tiêu; mục tiêu theo từng SNS |
| AIC-T35 | Thiết bị thật, cô lập môi trường, tải buổi sáng, gây lỗi có chủ đích | PWA/mobile phục hồi; không rò dữ liệu khi đổi tài khoản; không ảnh hưởng app DM Instagram |

## 6. Ma trận bao phủ yêu cầu

Bảng dưới là **mapping thiết kế**, không phải chứng nhận đã triển khai hay đã kiểm thử. YK3 phụ lục A có 61 dòng chức năng (gồm 1-3 là mục lịch sử).

### 6.1. Chức năng YK3 phụ lục A

| Chức năng | Module | Còn phải hoàn tất |
|---|---|---|
| 1-1, 1-2, 1-3 | Billing & Entitlement | Chính sách/provider thanh toán; 1-3 không còn chuyển paid/free cho Talent |
| 1-4…1-7 | Identity & Enrollment | Auth production, MFA/khôi phục, onboarding |
| 2-1, 2-2, 2-3 | Registry, Coach Configuration, cấp folder | Tiêu chí profile (QA54/92), hợp đồng OneDrive |
| 2-4 | Metrics & Goals | Chính sách/version mục tiêu |
| 2-5, 2-6 | Coach Configuration, MCP | QA99; OAuth và kênh xác nhận (VT-08) |
| 3-1…3-4, 3-6…3-11 | Coach, Memory, Challenge, Metrics | QA72/73 đã có trả lời26/11; QA99/prompt Nonaka còn chờ; nguồn tin/metrics cần kiểm kỹ thuật |
| 3-5 | Usage & chi phí (AI Core) | Không tự áp trần chi phí nghiệp vụ |
| 4-1…4-5 | Posting, NG, Autopost | QA56/70/71/83/84/96; CR05 sửa trực tiếp |
| 5-1…5-5 | Video, Billing, Media | 確認61/62; QA1/62; định dạng/nhãn provider |
| 6-1, 6-5 | Notifications, Scheduler | QA73/75/97; mẫu nội dung, lịch |
| 6-2, 6-8 | Onboarding, PWA | Thiết bị thật, callback, quyền thông báo |
| 6-3, 6-4, 6-6 | Media, Preview | Kho lưu/quota/định dạng/phân tích |
| 6-7 | Metrics, UI | QA72 chuỗi ngày đã chấp thuận26/11; khả dụng metrics |
| 7-1, 7-2, 7-4 | Dashboard, Query, Notifications | QA87/88/97; read model API |
| 7-3, 7-5 | Lifecycle, cổng đăng bài | CR08; QA63/69/94/98 |
| 7-6 | Nhật ký xem | Retention/lọc; khác nhật ký thao tác CR07 |
| 7-7 | Approval | Lý do trả lại/gửi lại/hạn; không sửa bài đã gửi duyệt (QA85) |
| 7-8, 7-9 | Category, Settings | QA99; không tự sửa lịch cũ |
| 8-1, 8-3 | Scheduling, Delivery | Giờ từng SNS; ảnh chỉ IG/TikTok; video ba SNS; kiểm provider thật |
| 8-2, 8-6 | SNS Connection | QA95 chặn đổi/ngắt khi còn lịch; callback/kết nối lại |
| 8-4 | Chính sách provider/giới hạn tần suất | Không bảo đảm không bị khóa tài khoản |
| 8-5 | Delivery, Notifications | Không tự đăng lại; phân loại lý do |
| 8-7, 8-8, 8-9 | Ingestion metrics, Context | QA101 DB; đồng bộ OneDrive; chỉ số theo provider |
| 9-1 | Office Registry, Posting, Usage | QA66/94; đăng nhập riêng, miễn tháng |

### 6.2. 16 luồng nghiệp vụ YK3

| Luồng / vị trí YK3 | Đường đi | Ca kiểm |
|---|---|---|
| 1 — P112–151 | Đơn → Manager quyết định → email | T24 |
| 2 — P152–215 | Auth → phương thức thanh toán → kích hoạt/folder → PWA → cổng profile | T24, T35 |
| 3 — P216–238 | Kết nối/kết nối lại/ngắt SNS → ánh xạ tài khoản | T25 |
| 4 — P239–350 | Coach/chủ đề → media → draft → duyệt/lịch | T22, T23, T26 |
| 5 — P351–381 | Đánh dấu bài công việc → Manager duyệt/trả lại → hạn | T23, T32 |
| 6 — P382–431 | Delivery → kết quả → metrics → học theo ngày/tuần | T26, T34 |
| 7 — P432–457 | Kỳ autopost/chủ đề/media → kế hoạch → chế độ duyệt → kết thúc | T22, T23, T26 |
| 8 — P458–511 | Kịch bản video → đồng ý giá → tạo → xem trước/dùng/làm lại | T28, T29 |
| 9 — P512–568 | Metrics → mục tiêu từng SNS → tiến độ/đạt | T34 |
| 10 — P569–612 | Event → inbox → đã đọc/đã xử lý → push/email | T32 |
| 11 — P613–652 | Provider thanh toán → sổ tháng/video → hóa đơn/lỗi | T29 |
| 12 — P653–682 | Manager đổi trạng thái/dừng → hủy lịch ngoài → retention | T30, T31 |
| 13 — P683–699 | Phát hiện NG → viết lại → kiểm lại → lịch | T23 (QA71/96 đã trả lời26/11; lỗi AI cần thiết kế) |
| 14 — P700–810 | Profile/chỉ thị/category/settings/M-17/MCP | T04, T14, T33 |
| 15 — P811–830 | Tạo office → folder/đăng nhập → đăng bài → usage riêng | T24, T29, T33 |
| 16 — P831–847 | Mời Manager/đăng nhập/MFA/vô hiệu hóa → nhật ký xem | T02, T14, T33 |

### 6.3. 16 loại thông báo phụ lục B

| Vị trí YK3 | Trigger | Người nhận / kênh |
|---|---|---|
| P1284–1287 | Kết quả đơn | Người đăng ký / email |
| P1288–1291 | Đơn mới | Manager / dashboard + email |
| P1292–1295 | Bắt đầu sử dụng | Manager / dashboard + email |
| P1296–1299 | Chưa có media trước giờ đăng | Talent / inbox + push |
| P1300–1303 | Xin duyệt bài công việc | Manager / hàng duyệt riêng |
| P1304–1307 | Duyệt / trả lại | Talent / inbox + push |
| P1308–1311 | Đến giờ chưa duyệt | Talent / inbox + push; Manager / dashboard + email |
| P1312–1315 | Đăng thành công | Talent / inbox + push |
| P1316–1319 | Đăng thất bại | Talent / inbox + push; Manager / dashboard + email theo phân loại, trừ lỗi SNS/mạng |
| P1320–1323 | Video hoàn tất | Talent / inbox + push |
| P1324–1327 | Video thất bại | Talent / inbox + push |
| P1328–1331 | SNS mất kết nối | Talent / inbox + push; Manager / dashboard + email |
| P1332–1335 | Không xác nhận được thanh toán | Talent / inbox + push; Manager / dashboard + email |
| P1336–1339 | Nhiều ngày không đăng | Manager / dashboard + email; nhắc Talent là lịch Coach riêng |
| P1340–1343 | Đạt mục tiêu | Talent / inbox + push; Manager / dashboard + email |
| P1344–1347 | Kết thúc kỳ autopost | Talent / tin trong hội thoại Coach |

Manager nhận theo người phụ trách (nguồn mới). Đơn chưa có Talent/người phụ trách và người phụ trách bị vô hiệu hóa cần chính sách người nhận cụ thể (QA6/87/88); không gửi cho toàn bộ Manager chỉ vì thiếu ánh xạ.

# Technical design review: khả năng đáp ứng chương 3

Ngày kiểm tra: **25/11/2026**. Người thực hiện: **Codex, tác giả review kỹ thuật**. Phạm vi yêu cầu: **3-1 đến 3-8 của AI育成OS_要件定義書, bản 0.3 ngày 24/11/2026**. Mục 2-5, Q&A và thiết kế nội bộ chỉ dùng đối chiếu. Không sửa nguồn khách hoặc mã ứng dụng.

**Kết luận:** Kiến trúc Next.js PWA + Hono + Supabase + worker BullMQ/Redis + OneDrive có thể đáp ứng phần lớn hướng yêu cầu. Code hiện tại mới thực hiện một phần và còn dùng Auth demo; chưa đủ để xác nhận production đạt chương 3. Có những cam kết cần giới hạn theo phụ thuộc thực tế, thay vì bổ sung chức năng rồi mặc nhiên coi là đạt.

Đây là đánh giá của tác giả, chưa có reviewer độc lập. Phân biệt:

- **Đã thấy:** sự kiện đọc trực tiếp từ nguồn hoặc code, không đồng nghĩa đã kiểm chứng production.
- **Đánh giá:** suy luận kỹ thuật từ bằng chứng được dẫn.
- **Cần bổ sung:** đề xuất của người review; đội và người có thẩm quyền cần chốt trước khi thành cam kết.

## 1. Cơ sở đánh giá và giới hạn

Đã mở lại các đoạn XML p899–951 của tài liệu khách; đọc thiết kế AI Core, thiết kế lưu trữ, Docker Compose và các module thực tế liên quan. `p` là thứ tự đoạn XML, tính cả đoạn trống, không phải trang in. Các tài liệu nội bộ chỉ chứng minh phương án thiết kế, không chứng minh khách đã duyệt.

| Mã bằng chứng | Tệp / vị trí đã đọc | Ý nghĩa |
|---|---|---|
| S | `source_requiments/24112026/AI育成OS_要件定義書.docx`, §3-1–3-8, p899–951 | Yêu cầu khách cần đánh giá |
| A | `agent_spec/AI_Talent_OS_AI_Core_Architecture_Report_v2.md`, §2.8–2.9, §11–13 | Kiến trúc đích, giới hạn demo và kế hoạch vận hành |
| F | `agent_spec/KIEN_TRUC_LUU_TRU_ONEDRIVE_VA_SUPABASE.md`, §6,8–10 | Phương án lưu trữ; xác nhận media Storage/registry chưa triển khai |
| D | `docker-compose.yml`; `DOCKER.md`; `apps/api/ecosystem.config.cjs` | Topology mẫu, Redis persistence, healthcheck, cách chạy HTTPS |
| C1 | `apps/api/src/config/env.ts`; `apps/api/src/container.ts`; `apps/api/src/http/app.ts` | Guard production, factory demo, mount routes |
| C2 | `apps/api/src/worker.ts`; `modules/ai-coach/runner.ts`, `model.ts`, `store.ts`, `effects.ts` | Queue hiện có, concurrency, checkpoint, timeout, unknown, export retry |
| C3 | `modules/ai-coach/access.ts`, `routes.ts`, `tools.ts`, `changes.ts`, `context.ts` | Actor, MFA Manager, quyền tool, xác nhận ghi, audit, dữ liệu gửi model |
| C4 | `infra/database/client.ts`, `config.ts`; `modules/onedrive/connections.ts`; `src/http/app.ts` | Guard DB runtime, TLS DB, AES-GCM token, lỗi/log không lộ secret |
| C5 | `apps/web/public/sw.js`; `lib/pwa/platform.ts`, `push.ts`; `apps/api/src/modules/pwa/service.ts` | PWA/push demo, offline fallback, cache, phản hồi của push provider |
| C6 | `modules/onedrive/service.ts`; `infra/onedrive/graph.ts`; `modules/upload-post/service.ts`; `infra/upload-post/client.ts` | Media upload demo, phân mảnh, retry Graph, demo kết nối SNS |

Đường dẫn API ở các dòng C2–C6 tính từ `apps/api/src/` trừ khi ghi khác. Snapshot hash các tệp đã dùng nằm trong [technical-design-review-2026-11-25.json](technical-design-review-2026-11-25.json).

**Chưa kiểm tra:** cấu hình tenant/cloud/VPS thật, gói Supabase thực trả, quota OpenAI/Upload-Post, topology app DM, cấu hình mã hóa ổ đĩa, backup thực tế, toàn bộ màn nghiệp vụ và 57 ảnh nhúng. Không chạy load test, restore, fault injection hoặc kiểm thiết bị thật. GitNexus không có index TalentOS trong danh sách hiện có; dùng tìm kiếm và đọc code trực tiếp, không dùng graph dự án khác.

## 2. Đánh giá theo từng mục của khách

### 3-1. Thiết bị và môi trường

**PWA iPhone/Android: khả thi, đã có nền tảng demo.** Code đã có service worker, hướng dẫn cài, xin quyền push từ thao tác người dùng, xử lý đổi VAPID và chặn cache API/private HTML. Tuy nhiên khi mất mạng, app hiện trả trang offline, không thực hiện nghiệp vụ offline. Khách không yêu cầu nghiệp vụ offline trong mục này, nên không cần tự thêm khả năng đó. [S p901; C5]

**Cần bổ sung để đạt:** HTTPS ổn định cho web/API; danh sách OS/browser được hỗ trợ; kiểm cài đặt, đăng nhập và push trên thiết bị thật. Trên iPhone, iOS 16.4+ chưa đủ: cần app được thêm vào màn hình chính và người dùng cấp quyền. Đây là điều kiện nền tảng theo [WebKit](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/). Docker Compose mẫu hiện chỉ xuất HTTP ở loopback; đường hầm demo không phải bằng chứng cấu hình production hoàn tất. [D; C5]

**Màn quản lý trên điện thoại: hợp lý về thiết kế, chưa đủ bằng chứng hoàn thành.** Responsive Next.js làm được; cần kiểm chính màn duyệt và màn chỉ thị AI, không suy từ việc demo mở được trên điện thoại rằng mọi màn nghiệp vụ đã đạt. Khách đã loại yêu cầu giao diện giống từng chi tiết trên mọi máy, nên không coi đó là trở ngại. [S p902; C1/C3; A §11]

**Môi trường thật/kiểm thử: khả thi, chưa chứng minh cô lập.** Có prefix queue theo môi trường và root folder demo, nhưng chúng không thay việc tách dữ liệu, credential, Redis hoặc quyền gửi tới SNS thật. Cần deployment/config riêng, kiểm không dùng nhầm dự án DB, bucket, drive và tài khoản provider. Không bắt buộc mọi thành phần phải ở máy vật lý riêng nếu chứng minh được mức cô lập phù hợp. [S p903; C1/C2; D]

**“Không ảnh hưởng app Instagram DM”: cam kết quá rộng nếu hiểu tuyệt đối.** Chưa có topology/giới hạn tài nguyên của app DM để chứng minh. Nếu cùng VPS, tenant Microsoft hoặc quota provider, chạy batch/upload có thể tranh tài nguyên. Microsoft cũng nêu throttling có thể phát sinh từ tổng request của nhiều app trong tenant. [S p904; D; A §11; [Microsoft Graph](https://learn.microsoft.com/en-us/graph/throttling)]

**Cần bổ sung:** xác định phần hạ tầng dùng chung, giới hạn CPU/RAM/I/O của service, không sửa credential/config DM, và kiểm hồi quy/tải chung. Nếu cần mức cô lập cao, tách workload hoặc máy sau khi đánh giá; chưa có căn cứ yêu cầu thêm VPS ngay. Câu cam kết nên mô tả phạm vi tài nguyên/thao tác và cách xác minh, thay vì bảo đảm không ảnh hưởng trong mọi sự cố.

### 3-2. Hiệu năng và quy mô

**30–100 người: phù hợp hướng kiến trúc, chưa có benchmark để cam kết. 200–300 và tương lai 1.000 người: không vô lý, nhưng chưa được chứng minh.** Tổng số tài khoản không cho biết số người chat đồng thời, lượt model, dung lượng media hoặc quota provider. Thiết kế tham khảo 4 vCPU/8 GB đã ghi rõ chưa benchmark; PM2 tăng số process không tự tăng quota DB/model. [S p906; A §11; D]

**Xử lý sáng trước giờ nhắn: chưa có triển khai đủ.** Worker hiện chỉ nhận `agent-interactive`, concurrency mặc định 1; effect hiện có là export hồ sơ sang OneDrive. Queue batch, tác vụ lấy thành tích/tạo chủ đề sáng và consumer tương ứng là thiết kế đích, chưa có trong worker này. Không dùng queue interactive hiện tại làm bằng chứng batch sáng đã sẵn sàng. [S p907; C1/C2; A §11.1]

**Cần bổ sung:** scheduler/batch task bền vững, tách ngân sách chat và batch, giới hạn concurrency/quota, xử lý dữ liệu thành tích thiếu/cũ, cảnh báo không kịp giờ và kiểm tải với cohort bàn giao. Công thức dự toán đơn giản `N × thời gian xử lý trung bình / số slot` chỉ giúp chọn cửa sổ chạy, không thay số đo đuôi chậm, rate limit và retry. Không có số latency thực nên đợt này không ước lượng số phút hoàn tất.

**Cam kết cần giới hạn:** “xong trước giờ” chỉ kiểm được trong điều kiện provider hoạt động và tải/quota được xác định. Không thể hứa hoàn tất trong mọi trường hợp khi OpenAI hoặc nguồn thành tích đang lỗi. Khách đã yêu cầu kiểm ở số người bắt đầu; không tự nâng nghĩa vụ thử lần đầu lên 1.000 người. Cần tách mốc 1.000 là mục tiêu mở rộng với quy mô nghiệm thu lần đầu. [S p906–907]

**Dung lượng ảnh/video: khả thi khi có ngân sách và vòng đời file.** Demo OneDrive giới hạn 300 MiB và upload theo mảnh 5 MiB; đó là giới hạn code demo, không phải khách chốt. Phương án media private trên Supabase, registry và pipeline kiểm file chưa triển khai theo tài liệu lưu trữ. [S p908; C6; F §6/10]

**Cần bổ sung:** giới hạn tệp/tổng kho, số upload đồng thời, kiểm loại/kích thước file, thời hạn URL provider, cleanup và đo egress. Dùng streaming hoặc direct/resumable upload sau kiểm quyền để tránh media chiếm RAM/băng thông VPS. Không cần chuyển mọi file sang DB hoặc mặc định lưu kép. Ước tính phí ở p909 phải dựa khối lượng/quota thực và tách video, AI, lưu trữ/egress; không thể giữ tổng phí cố định khi các đầu vào này chưa rõ.

### 3-3. Thời gian hoạt động và sự cố

**Dừng riêng chức năng có dịch vụ lỗi: chỉ đạt được có điều kiện.** Timeout và trạng thái lỗi/unknown đã có cho model; export OneDrive có retry; code agent lấy context từ Postgres nên việc export OneDrive lỗi không tự chặn mọi cuộc hội thoại. Đây là nền tảng cô lập lỗi, chưa phải fault isolation toàn hệ thống. [S p912; C2/C3]

| Thành phần lỗi | Ảnh hưởng suy ra từ thiết kế hiện tại |
|---|---|
| OpenAI | Agent không tạo được phản hồi mới; các thao tác CRUD độc lập với model có thể tiếp tục khi được triển khai |
| OneDrive | Đọc/upload file và export bị ảnh hưởng; dữ liệu agent đã lưu trong Postgres vẫn có thể dùng |
| Upload-Post | Kết nối/đăng/lấy kết quả SNS liên quan bị ảnh hưởng; không nhất thiết dừng màn quản lý độc lập |
| Redis | Agent job chưa chạy bị chậm; DB outbox cho phép giữ intent khi DB/API còn hoạt động. Chưa chứng minh trải nghiệm suy giảm hoặc giới hạn backlog production |
| Supabase DB/Auth | Xác thực, kiểm quyền, đọc/ghi và outbox phụ thuộc chung; nhiều chức năng bị ảnh hưởng |
| VPS dùng chung API/worker/Redis | Có điểm lỗi chung. Restart container hoặc Redis AOF không tạo khả năng tiếp tục phục vụ khi máy hỏng |

**Điểm cần sửa cách cam kết:** “các chức năng khác vẫn dùng” không thể áp dụng vô điều kiện cho Supabase hoặc máy dùng chung. Đề xuất ghi: cô lập lỗi trong phạm vi chức năng và phụ thuộc; lỗi hạ tầng chung áp dụng quy trình khôi phục. Nếu muốn phục vụ liên tục cả khi máy hỏng thì cần thiết kế dự phòng và ngân sách tương ứng. Khách chưa nêu SLA 24/7 hoặc zero downtime, nên không tự thêm yêu cầu đó. [S p911–912; D; A §11]

**Cần bổ sung để đạt:** bảng phụ thuộc, health/degraded state, timeout/ngắt gọi tạm thời theo adapter, giới hạn backlog, cảnh báo tới người trực và runbook. `/health` hiện kiểm DB; heartbeat worker và log JSON chưa thay monitoring/alert đầy đủ. Cần fault injection trước khi xác nhận các phần còn hoạt động. [C2; `modules/system/routes.ts`; A §11.1–11.2]

**Sao lưu: làm được, nhưng chưa có bằng chứng đáp ứng.** Có Redis AOF/volume; thiết kế yêu cầu backup ngoài host và thử restore, nhưng chưa thấy job/runbook/kết quả restore trong các tệp ứng dụng/deploy đã kiểm. Không suy cloud hiện không có backup vì chưa truy cập cấu hình thật. [S p913; D; A §11.2; F §1/10]

**Cần bổ sung:** xác nhận gói backup DB, phạm vi media/OneDrive, nơi giữ config/secret an toàn, mức mất dữ liệu và thời gian khôi phục chấp nhận được; thử restore cùng đối soát lịch/tác vụ ngoài đã xảy ra. Đặc biệt, [backup DB Supabase không chứa các object Storage](https://supabase.com/docs/guides/platform/backups), nên không được cam kết khôi phục ảnh/video chỉ dựa backup DB. Redis AOF cũng không thay backup khi mất host/volume. Không bắt buộc mua PITR nếu mức khôi phục được duyệt không cần đến nó.

### 3-4. Nhật ký thao tác và xử lý

**Khả thi, đã có một phần nhưng chưa bao phủ hết.** Commit thay đổi hồ sơ/chỉ thị ghi `activity_logs` cùng transaction; agent lưu bước gọi tool, kết quả, token và tham chiếu request. Tuy nhiên module Upload-Post hiện chỉ demo kết nối; chưa có đầy đủ luồng đăng, lấy thành tích, video và thu phí để ghi kết quả theo toàn bộ p917. Có bảng/schema không chứng minh đã có event writer và màn xem nhật ký. [S p915–918; C2/C3/C6]

**Cần bổ sung:** event writer tại các service nghiệp vụ tương ứng, audit lượt xem theo quyền đã chốt, correlation ID, quyền đọc nhật ký, tìm kiếm/xuất phục vụ vận hành và retention/cleanup được duyệt. Đây là công việc triển khai còn thiếu; yêu cầu ghi nhật ký của khách hợp lý. Không cần triển khai nền tảng log phân tán phức tạp chỉ vì có nhật ký: có thể bắt đầu với bảng audit có index và log tập trung đủ dùng.

### 3-5. Bảo mật

**Phân quyền và xác thực: kiến trúc đáp ứng được; production chưa sẵn sàng.** Có actor xác minh từ server, Manager yêu cầu AAL2, chặn tài năng chọn ID người khác, kiểm Manager còn active và ghi dữ liệu qua service có xác nhận/version. DB client chặn runtime dùng owner/role nguy hiểm. [C3/C4]

**Khoảng trống quan trọng:** `container.ts` chỉ tạo Auth khi `ENABLE_AUTH_DEMO=true`; `app.ts` cũng chỉ mount route nghiệp vụ/demo trong nhánh đó, trong khi `env.ts` cấm Auth demo ở production. Vì vậy đây là chặn release theo code đã đọc, không phải một yêu cầu mới của khách. Không khắc phục bằng việc bỏ guard demo. Cần factory Auth/session/role production, gắn lại service/route, kiểm quyền DB/API/Storage bằng đúng runtime và kiểm thu hồi phiên. [S p920; C1]

**Mã hóa đường truyền/dữ liệu lưu: khả thi nhưng chưa chứng minh xuyên hệ thống.** Đã có xác minh TLS cho kết nối Supabase và AES-256-GCM cho token OneDrive. HTTP Compose cần TLS termination; Redis AOF nằm trên volume, ledger lưu hội thoại/context trong DB, nên token đã mã hóa không chứng minh mọi nơi lưu dữ liệu đều đạt cam kết. [S p921; C4; D]

**Cần bổ sung:** liệt kê đường truyền và kho lưu, xác nhận mã hóa đĩa/backup/provider, quản lý quyền và khóa. Nếu Redis qua mạng không tin cậy phải bảo vệ đường truyền tương ứng; Redis trong mạng riêng không tự chứng minh mã hóa at rest. Không mặc định yêu cầu mã hóa riêng từng cột nếu mã hóa tầng kho đã phù hợp phạm vi được duyệt.

**Giấu API key: đã có cách làm phù hợp, cần kiểm toàn tuyến.** Key ở backend; lỗi HTTP tránh log body/token; OAuth token được seal. Tuy nhiên URL chia sẻ/signed URL cũng là quyền truy cập tạm thời và token OneDrive hiện ghi chú chưa có key rotation. Cần kiểm FE bundle, log proxy, tool output, quyền tệp secret, thu hồi và quy trình đổi khóa trước khi xác nhận đạt p922. [C4/C6]

**“Không dùng dữ liệu AI để học”: có thể đáp ứng ở OpenAI API nếu không opt-in, không đồng nghĩa không lưu dữ liệu.** Code dùng API qua gateway, nhưng còn cho phép `OPENAI_BASE_URL` tùy chọn; không thể mở rộng cam kết của OpenAI sang proxy, ChatGPT hoặc nhà cung cấp video. Gateway chưa truyền điều khiển lưu dữ liệu cụ thể trong đoạn đã đọc. Điều này chưa chứng minh vi phạm yêu cầu không huấn luyện. [S p923; C1/C2; [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data)]

**Cần bổ sung:** danh sách provider/endpoint được dùng, xác nhận không opt-in, giới hạn dữ liệu gửi, kiểm chế độ lưu phù hợp và bằng chứng theo từng dịch vụ. Context hiện có hồ sơ, mục tiêu, chỉ thị và lịch sử hội thoại; cần đánh giá dữ liệu nào thực sự cần cho từng task. Không tự nâng yêu cầu thành zero-retention nếu khách chỉ yêu cầu không huấn luyện.

### 3-6. Thông tin cá nhân

**Cơ chế khách lấy đồng ý bên ngoài: phù hợp kiến trúc.** Không cần tự thêm cổng phụ huynh hoặc bảng lưu hồ sơ đồng ý vì p927 nói hệ thống không lưu hồ sơ đó. Code không chứng minh đã có đồng ý; đây là đầu vào vận hành thuộc Adesso. [S p925–928]

**Cần bổ sung để vận hành đúng:** quy trình Adesso chỉ đưa người/dữ liệu đủ điều kiện vào hệ thống, danh sách dịch vụ nhận dữ liệu để Adesso đối chiếu phạm vi đồng ý; môi trường thử dùng dữ liệu giả và quyền truy cập riêng. Nếu muốn thêm trạng thái quản lý đồng ý trong sản phẩm, phải review phạm vi riêng, không đưa vào như yêu cầu sẵn có. Chưa kiểm dữ liệu cloud thật nên không kết luận đang dùng dữ liệu cá nhân trái phạm vi.

### 3-7. Chống khóa tài khoản SNS

**Giới hạn tần suất: làm được, chưa có publish worker/policy đầy đủ trong code đã đọc.** BullMQ hiện xử lý hội thoại, không phải hàng đợi đăng SNS có limiter theo tài khoản/provider. Demo Upload-Post không thực hiện publish. [S p930; C2/C6]

**Cần bổ sung:** policy theo SNS/tài khoản, kiểm tại thời điểm gửi, quota/Retry-After, trạng thái bị hạn chế, đối soát kết quả chưa rõ và khóa chống xử lý trùng. Không dùng retry model cho tác động đăng bài/thu phí. Nếu provider giữ lịch bên ngoài, phải phân định ai áp giới hạn và việc dừng/hủy có hiệu lực đến đâu; chỉ rate-limit lúc tạo lịch trong app chưa đủ.

**Không thể bảo đảm không bị khóa bằng thiết kế kỹ thuật.** Khách đã ghi giới hạn bảo đảm tại 3-8 nên yêu cầu này không vô lý nếu hiểu là biện pháp giảm rủi ro. Với TikTok, thêm rate limiter không sửa xung đột về UX/đồng ý/phạm vi sử dụng mà chính nguồn đã cảnh báo. [S p943]

### 3-8. Điều kiện tiên quyết và ràng buộc

**Cảnh báo push không luôn đến nơi và AI không luôn đúng: thực tế, phù hợp thiết kế.** `PwaService.notify` phân biệt provider nhận với OS hiển thị; runner dùng receipt để báo đã lưu thay vì tin lời model. Không biến miễn bảo đảm nội dung AI thành miễn sửa lỗi chương trình. [S p942–945; C2/C5]

**TikTok: có thể thử tích hợp, chưa đủ cơ sở cam kết tuân thủ hoặc vận hành bền vững theo cách hiện tại.** Tài liệu khách đã ghi khác biệt với câu trả lời TikTok. Tài liệu chính thức hiện cũng yêu cầu người dùng chọn privacy, đồng ý và kiểm soát nội dung; có giới hạn với công cụ chỉ dùng cho tài khoản nội bộ/nhóm. [S p943; [TikTok guidelines](https://developers.tiktok.com/docs/en/content-sharing-guidelines)]

**Cần bổ sung:** owner theo dõi rủi ro, bằng chứng chấp nhận mô hình cụ thể từ provider / nền tảng, kiểm status/error và phương án vận hành khi bị hạn chế. Không kết luận Upload-Post đã được duyệt thì mọi workflow của TalentOS cũng được duyệt. Giữ quyết định nguồn hiện hành, không tự đổi sang đăng nháp hoặc mở lại câu khách đã trả lời. Đây là rủi ro provider còn lại, không phải thiếu RAM hay thiếu code retry.

**Phát hiện đạt mục tiêu/số ngày không đăng bằng AI: cách giao trách nhiệm cần thu hẹp.** p945 cho phép AI phán đoán sai; nhưng số followers vượt mục tiêu hoặc đã quá bao nhiêu ngày là phép so sánh xác định khi dữ liệu và mốc thời gian đủ rõ. Đề xuất OS tính điều kiện từ snapshot có timestamp, AI diễn giải/soạn lời nhắn; dữ liệu thiếu/cũ phải báo chưa xác định, không để AI đoán số. Thiết kế A §13/ma trận T34 đã đề cập snapshot và missing, nhưng worker hiện chưa có ingestion/goal-evaluation end-to-end. Đây là đề xuất thiết kế, không tự sửa quyết định nghiệp vụ. [S p945; A §13/T34; C2/C3]

**Thanh toán qua nhà mạng: chưa kết luận khả thi.** Ghi chú KS `アクション一覧!D17:G17`, No.16, nói chọn Square sau họp; code chưa có module billing hoặc adapter Square trong app builder đã đọc. Cần đội/provider kiểm khả năng đối với hợp đồng và hình thức thu thực tế rồi cập nhật giới hạn p946. Không suy Square hỗ trợ/không hỗ trợ từ tên dịch vụ.

**Kiểm xâm phạm quyền bên thứ ba: chỉ nên cam kết quy trình kiểm tra.** Chưa có thiết kế hoặc dịch vụ kiểm quyền đầy đủ trong các module đã đọc. Đội có thể xây bước xem duyệt, xác nhận nguồn tư liệu và ghi nhận xử lý; không thể từ kiến trúc này bảo đảm tự động phát hiện mọi vi phạm. Cách làm còn phải chốt theo p950, không tự thêm hệ thống nhận diện bản quyền vào release.

**Đầu vào/chi phí/bảo trì:** danh sách Adesso chuẩn bị và bảo trì bằng hợp đồng riêng phù hợp về phân vai. Cần người phụ trách, ngày cần credential/hợp đồng, theo dõi quota/phí và đầu mối xử lý sự cố. Hợp đồng bảo trì riêng không thay nhu cầu có người vận hành ở ngày go-live. Đây là điều kiện vận hành, không tự suy khách đã trễ đầu vào hoặc bắt buộc hỗ trợ 24/7. [S p932–940,p951]

## 3. Những việc cần làm và ảnh hưởng kiến trúc

| Việc cần làm | Vì sao cần | Mức thay đổi dự kiến, chưa là ước lượng lịch |
|---|---|---|
| Auth/session/role production | Demo hiện bị chặn production | Triển khai nền tảng còn thiếu; chặn release có đăng nhập nghiệp vụ |
| Batch sáng và xử lý thành tích | Worker hiện chưa có task tương ứng | Thêm scheduler/consumer/policy; đo latency và quota |
| Tải theo cohort bàn giao | Chưa có benchmark 30/100/300/1.000 | Có thể chỉ cần tuning; chỉ tách/tăng hạ tầng khi số đo chỉ ra |
| Media pipeline và giới hạn kho | Streaming OneDrive demo khác thiết kế media đích | Thêm registry/quyền/cleanup; chưa tự đổi nơi lưu |
| Cô lập lỗi, cảnh báo và runbook | Healthcheck/log chưa đủ vận hành | Bổ sung vận hành; dự phòng nhiều máy chỉ khi mức cam kết yêu cầu |
| Backup DB/media và thử restore | DB backup không chứa byte Storage | Cấu hình/quy trình/kho bổ sung tùy mức phục hồi được duyệt |
| Event/audit cho nghiệp vụ còn thiếu | Hiện mới có một phần | Gắn vào từng service khi triển khai, cùng retention |
| Publish limiter và đối soát | Demo SNS hiện chỉ kết nối | Một phần của luồng publish còn phải xây; không bảo đảm không khóa |
| Kiểm provider AI/SNS/thanh toán | Có điều kiện ngoài khả năng app | Có thể ảnh hưởng phạm vi/release; chưa có căn cứ tính số ngày |

**Không có bằng chứng yêu cầu phải thay toàn bộ stack, thêm GPU, chuyển sang microservices hoặc mua HA ngay.** Ngược lại, cũng chưa có căn cứ nói một VPS cấu hình tham khảo sẽ đáp ứng 1.000 người trong mọi tải. Đội cần đóng các khoảng trống triển khai và đo trước khi quyết định tăng hạ tầng.

## 4. Cách diễn đạt cam kết cần thống nhất lại

Đây là đề xuất kỹ thuật, chưa sửa nguồn:

| Câu dễ bị hiểu quá rộng | Phạm vi cam kết khả thi hơn |
|---|---|
| Dịch vụ ngoài lỗi thì mọi chức năng khác vẫn dùng | Cô lập lỗi theo bảng phụ thuộc; lỗi DB/Auth/host chung áp dụng phục hồi |
| Chuẩn bị xong trước giờ mỗi sáng | Xác định cohort / cửa sổ tải, điều kiện provider và hành vi khi không kịp; kiểm ở quy mô khách yêu cầu |
| Không ảnh hưởng app DM | Xác định tài nguyên dùng chung, giới hạn và bộ kiểm hồi quy; không cam kết tuyệt đối khi chưa biết topology |
| Không dùng dữ liệu AI để học | Xác nhận theo từng dịch vụ/tài khoản; phân biệt không huấn luyện với không lưu dữ liệu |
| Có backup nên khôi phục được toàn bộ | Chốt phạm vi DB/media/config và chứng minh restore; không lấy backup DB thay backup media |
| Chống khóa bằng giới hạn tần suất | Cam kết biện pháp và kiểm xử lý hạn chế, giữ rủi ro nền tảng đã ghi; không bảo đảm không khóa |

Mục tiêu 1.000 người tự nó không vô lý. Push/AI có giới hạn bảo đảm cũng không vô lý. Vấn đề là cách hiểu cam kết và mức sẵn sàng hiện tại, không phải cứ thiếu thông số thì yêu cầu của khách sai.

## 5. Kiểm chứng đã thực hiện và điều kiện kết luận lại

Đã chạy kiểm thử cục bộ không gọi provider:

```sh
cd apps/api
node --test src/modules/ai-coach/model.test.ts src/http/app.test.ts src/modules/upload-post/service.test.ts
```

Kết quả: **3 tệp kiểm thử PASS, tiến trình exit 0**, Node 22.20.0. Đây là kiểm thử model SDK giả lập, HTTP app và demo Upload-Post, không phải kiểm thử tải, provider thật, khôi phục hoặc chứng nhận bảo mật. Không dựa kết quả này để nói chương 3 đã đạt.

Để nâng kết luận từ “khả thi” thành “đã đáp ứng”, cần Tech Lead chốt điều kiện đích, triển khai phần thiếu, QA có kết quả thử tương ứng và reviewer khác tác giả kiểm nguồn/bằng chứng. Chưa có reviewer độc lập; không tự cấp G5/G8 hoặc phê duyệt release. Không tạo Customer Q&A mới trong đợt này.

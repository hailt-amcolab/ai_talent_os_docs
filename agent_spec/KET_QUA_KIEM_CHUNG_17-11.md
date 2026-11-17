# Kết quả kiểm chứng `agent_spec` – 17/11/2026

Phạm vi: ba bộ `AI_Talent_OS_PWA_Agent_Spec_v1`, `onedrive-agent-spec`, `upload-post-agent-spec`.

Đối chiếu với:
- [YK2] = `AI育成OS_概要要件定義書_v2.docx` (tài liệu yêu cầu chính, SHA-256 `30e6533f…`).
- [AG] = `アプリ画面案_AI育成OS.pdf` (phương án màn hình mới nhất).
- File Q&A `AI-Talent-OS_Q&A表.xlsx`.
- Đặc tả trong `SCD/`.
- Tài liệu API của Upload-Post (docs.upload-post.com, tra ngày 17/11/2026).

Ký hiệu mức độ: **Phải sửa** = trái [YK2] hoặc sai sự thật, agent làm theo sẽ sai. **Nên sửa** = thiếu hoặc không thống nhất giữa các bộ. **Ghi chú** = đúng nhưng cần biết.

## 1. Kết luận chung

| Bộ | Nguồn đã dùng | Đánh giá |
|---|---|---|
| PWA | docx **v1** + 4 PDF cũ (SOURCE_MANIFEST ghi rõ "DOCX v2 chưa đọc lại"); không dùng [AG] | **Chưa giao agent được.** Kỹ thuật PWA tốt, nhưng nhiều luồng nghiệp vụ theo v1 và trái [YK2] |
| OneDrive | docx **v1** + 4 PDF cũ; không dùng v2, [AG], Q&A | **Giao được phần Graph và đồng bộ** sau khi sửa 3 điểm "phải sửa" ở mục 3. Phần Microsoft Graph kỹ lưỡng |
| Upload-Post | [YK2] v2 và file Q&A (mã băm khớp file hiện có) | **Tốt nhất trong ba bộ.** API đối chiếu với tài liệu Upload-Post thấy khớp. Cần bổ sung 5 điểm ở mục 4 |

**Bốn vấn đề chung cả ba bộ:**

1. **Hai bộ dựa trên docx v1.** Mọi chỗ ghi "YC DOCX §…" hay "R1" trong bộ PWA và OneDrive đang trỏ vào bản v1 đã bị thay thế. Phải đối chiếu lại với [YK2].
2. **Không bộ nào dùng mã màn hình [AG] (T-01〜T-15, M-01〜M-19) hay mã chức năng của khách (1-4, 6-2…).** Bộ PWA dùng F01–F20 riêng. Cần một bảng nối: F-ID ↔ mã chức năng [YK2] ↔ mã màn hình [AG] ↔ file trong `SCD/`, để agent, đặc tả và khách nói cùng một ngôn ngữ (CLAUDE.md yêu cầu ghi UC-xx và mã 6-x trong mã nguồn và PR).
3. **Ba cách tải ảnh, video khác nhau:**
   - PWA F10: trình duyệt → máy trung gian trên VPS → OneDrive.
   - OneDrive §11.1: trình duyệt PUT thẳng vào `uploadUrl` của Microsoft Graph; nếu không được thì qua worker.
   - `SCD/EP05/6-3` và file 18: trình duyệt → Supabase Storage → worker chép sang OneDrive.

   Phải chọn một cách và sửa cả ba nơi.
4. **Kết luận về MCP sai.** `CHATGPT_MCP_EVIDENCE_VI.md` và OneDrive §1 kết luận "không có căn cứ MCP trong nguồn". Thực tế, file Q&A câu số 45 trích **御見積書 (bản báo giá) 前提条件A4: 「マネージャーはChatGPT(MCP)経由でAIを調整」** (quản lý điều chỉnh AI qua ChatGPT dùng MCP). Theo [YK2] §1, báo giá đứng trên [YK2] khi mâu thuẫn. MCP vì vậy có căn cứ hợp đồng; chỉ chờ câu 45 có trả lời. Bộ PWA để `mcpConnect` mặc định tắt và bộ OneDrive gọi MCP là "tùy chọn"; cần sửa lại cách viết.

## 2. Bộ PWA

### 2.1. Phải sửa (trái [YK2] v2)

| # | Chỗ trong bộ PWA | Đang viết | [YK2] v2 / [AG] nói | Nguồn |
|---|---|---|---|---|
| P1 | §1.1 D01, F02, F03 | Mặc định là quản lý **mời** tài năng (link mời 7 ngày); tự đăng ký (`selfSignup`) tắt chờ chốt | Tài năng **tự gửi đơn** trong ứng dụng → quản lý duyệt hoặc từ chối → thư có **mật khẩu tạm** → lần đầu đăng nhập thì đặt mật khẩu mới. Đây là yêu cầu hiện hành, không phải tùy chọn | [YK2] §6-1 chức năng 1-4, UC-01; [AG] T-01, T-03, M-03; `SCD/EP01/1-4` |
| P2 | §1.1 D03, F19 | Trả phí, miễn phí là việc còn chờ chốt | Đã chốt: **không có gói miễn phí**; chỉ tài khoản công ty không bị thu phí | [YK2] §5-4, §6-3 chức năng 1-2, 1-3 |
| P3 | §4, manifest `start_url=/mypage` | Gộp trang chủ với trang của tôi; menu dưới: Trang chủ (/mypage), Momo, nút tạo, Lịch, Tài khoản | Màn đầu tiên phải cho thấy **việc hôm nay** (6-8). [AG] có **T-07 ホーム** riêng và **T-06 マイページ** riêng; menu dưới: ホーム・チャット・送る・予定・マイページ | [YK2] §6-12 chức năng 6-8, §6-14; [AG] trang 3; B13 |
| P4 | §6 state machine | 13 trạng thái; trả lại → quay về sửa (`returned → editing`) | Hình 5-1: **6 trạng thái** (投稿案・承認待ち・予約済み・投稿済み・失敗・取り消し); trả lại hoặc quá hạn duyệt → **取り消し** (đã hủy) | [YK2] §5-1 hình 5-1; `SCD/EP10/C-01` |
| P5 | F19, X05 | Chưa chọn cổng thanh toán và dịch vụ video; có màn lịch sử giao dịch trong ứng dụng (`/me/billing/transactions`) | [YK2] §8 đã ghi GMO Payment Gateway và fal.ai (Kling). Lịch sử hóa đơn **xem ở trang của GMO** qua đường dẫn, không làm trong ứng dụng | [YK2] §8, UC-11 前提 |
| P6 | F16, Q07 | Nhắc mốc 100/1.000/10.000 người theo dõi | v2 **đã bỏ** việc báo theo mốc; chỉ báo khi đạt mục tiêu | [YK2] §6-5 chức năng 3-7 |
| P7 | manifest `name: "AI Talent OS"`, màu tự chọn | Tên và màu tự đặt | Dùng **tên, logo, màu của ứng dụng アデッソ hiện có**; khách gửi logo và mã màu | [YK2] §6-14 |

### 2.2. Nên sửa (thiếu so với [YK2] / [AG])

| # | Thiếu | Nguồn |
|---|---|---|
| P8 | Màn đặt mật khẩu lần đầu và ô xác nhận "quản lý đọc được hội thoại" | [AG] T-03; 確認13 |
| P9 | Hiển thị số ngày đăng liên tục (続けて投稿 N日) và tin "đã đăng" | §6-5 chức năng 3-4; [AG] T-06 |
| P10 | Nhắc gửi ảnh, video 2 giờ trước giờ đăng | §6-7 chức năng 6-5 |
| P11 | Video tự làm: lưu, mỗi ngày thành một bản nháp. Bộ PWA để `autoLibrarySequence` tắt như không làm | §6-7 chức năng 6-4 (chờ 確認32) — nên là chức năng có cờ, không bỏ |
| P12 | Trang ご利用とお支払い (số tiền dự kiến, số lần tạo video tháng này) | [AG] T-15; §6-3 chức năng 5-4 |
| P13 | Giờ đăng dự kiến hiện trước khi chấp nhận | [AG] T-07, T-09; B1 |
| P14 | Đặt lại bài lỗi (F15) đang cho cả tài năng | [YK2] 8-5 cho "tài năng hoặc quản lý", nhưng [AG] chỉ cho quản lý; đang hỏi khách ở S06-04. Nên ghi là việc còn chờ chốt |

### 2.3. Ghi chú

- Phần kỹ thuật PWA (service worker, chính sách bộ nhớ đệm, Web Push trên iOS 16.4 trở lên cần thêm vào màn hình chính, chống gửi trùng, không lưu dữ liệu riêng ngoại tuyến) **đúng và cẩn thận**.
- Hỗ trợ tiếng Việt trong giao diện không có trong yêu cầu; không hại, nhưng không cần.
- F12 báo giá video có hạn dùng và loại giá "ước lượng/đảm bảo" là phức tạp hơn mức cần nếu khách đồng ý đơn giá cố định (B9).
- Nhắc "OTP email" không liên quan; [YK2] không có.

## 3. Bộ OneDrive

### 3.1. Phải sửa

| # | Đang viết | [YK2] v2 nói | Nguồn |
|---|---|---|---|
| O1 | Mốc tạo thư mục để ngỏ ("không hardcode trước khi đối chiếu v2") | Tài năng: **khi đăng ký thanh toán xong**. Tài khoản công ty: **khi quản lý tạo tài khoản** | [YK2] §6-4 chức năng 2-2, UC-01 前提 |
| O2 | MCP "chưa có căn cứ" | Có căn cứ trong 御見積書 前提条件A4 (Q&A số 45) | Mục 1 điểm 4 |
| O3 | **Thiếu file AI tự ghi điều đã học** | [YK2] §6-4 chức năng 2-1: "AIコーチがやり取りから分かったことを書き足すファイルも、同じように読み込みます"; §6-5 chức năng 3-2: AI ghi thêm sở thích, bài được tương tác tốt vào thư mục tài năng. Cây thư mục chỉ có `profile.md`, `coaching.md` (quản lý sửa) | `SCD/EP03/3-2` (`AIメモ.md`) |

### 3.2. Nên sửa

| # | Nội dung |
|---|---|
| O4 | Cấu trúc thư mục khác `SCD/EP02/2-2` (`00_identity/01_knowledge…` tên tiếng Anh, so với `プロフィール.md`, `目標.md`, `AIメモ.md`, `実績/`, `素材/` tên tiếng Nhật). Quản lý người Nhật mở thư mục này hằng ngày. Đề xuất: giữ khóa kỹ thuật theo mã (bộ OneDrive làm đúng), nhưng tên file và thư mục hiển thị bằng tiếng Nhật; rồi sửa một trong hai nơi cho khớp |
| O5 | `ng_words.json` xuất ra OneDrive: [YK2] không yêu cầu (danh sách từ cấm quản lý ở M-17). Có thể bỏ |
| O6 | M-07 hiện hồ sơ theo từng mục (プロフィール, 方向性, 趣味・特技, 将来の目標, チャレンジ); `profile.md` cần tiêu đề cố định để màn hình đọc được (S02-04) |
| O7 | [YK2] UC-01 前提 tả "mỗi tài năng một dự án ChatGPT". Bộ OneDrive phân tích đúng rằng dự án ChatGPT không phải ranh giới quyền; nên ghi rõ đề xuất "một GPT hoặc connector MCP dùng chung" như S02-01 |

### 3.3. Ghi chú

- Các điểm về Microsoft Graph (client credentials, `Sites.Selected` và `Files.SelectedOperations.Selected` phải thử trước, upload session chia khúc là bội số 320 KiB và dưới 60 MiB mỗi lần, tải thẳng tối đa 250 MB, subscription chỉ ở gốc ổ OneDrive for Business, delta) khớp với hiểu biết của tôi về tài liệu Microsoft. **Tôi chưa tra lại từng trang Microsoft trong lần kiểm chứng này.**
- Tách nguồn chính theo loại dữ liệu (hồ sơ ở OneDrive, mục tiêu và số liệu ở cơ sở dữ liệu rồi xuất ra file) khớp với `SCD/EP02/2-4` và `SCD/EP07/8-8`.

## 4. Bộ Upload-Post

### 4.1. Đã đối chiếu với tài liệu Upload-Post – khớp

| Nội dung trong bộ | Tài liệu Upload-Post |
|---|---|
| `POST /api/uploadposts/oauth/{platform}/start`, `state` dùng một lần, hạn **15 phút** (`expires_in: 900`), kết quả trả về qua `redirect_url` kèm `connect_status`, `error_code` | api/connect-api |
| Trang kết nối dựng sẵn (`generate-jwt`) có hạn **48 giờ** – đúng là nguồn của câu "48 giờ" trong [YK2] §6-10 chức năng 8-2 | api/user-profiles |
| Tạo, đọc, xóa profile; ngắt từng mạng (`DELETE /users/social`); 403 khi vượt số profile của gói | api/user-profiles |
| `POST /api/upload`, `/api/upload_photos`; `scheduled_date` ISO-8601; `async_upload`; `external_id` chỉ là nhãn; `request_id` do mình đặt | api/upload-video |
| `Idempotency-Key` (hoặc `X-Idempotency-Key`), hiệu lực **24 giờ**; cảnh báo không dùng `X-Request-Id` cho hai việc là **đúng** (Upload-Post nhận `X-Request-Id` vừa là mã chống trùng vừa là `request_id`) | api/upload-video, guides/rate-limits |
| Lịch: GET danh sách, GET một lịch, DELETE, PATCH `/api/uploadposts/schedule/{job_id}` | api/schedule-posts |
| `POST /api/uploadposts/posts/retry` **chỉ đăng lại mạng bị lỗi**, dùng lại tư liệu cũ | api/retry-post |
| Webhook: `upload_completed`, `social_account_connected/disconnected/reauth_required`; chữ ký `X-Upload-Post-Signature: sha256=<HMAC-SHA256>` trên `timestamp.body`; webhook tài khoản ở `app.upload-post.com`; nhật ký gửi giữ 7 ngày, gửi lại được | api/webhooks |
| Các endpoint thống kê tài khoản và từng bài | api/get-analytics |

### 4.2. Nên bổ sung

| # | Nội dung | Ảnh hưởng |
|---|---|---|
| U1 | **Giới hạn đăng theo mạng trong 24 giờ** của Upload-Post (ví dụ Instagram 50, TikTok 15) và giới hạn tốc độ gọi API theo gói (mỗi profile cộng thêm 2 lần/phút) | Cấu hình hàng đợi; chống khóa tài khoản (8-4, S06-03) |
| U2 | Nhãn AI: TikTok dùng `is_aigc` và **chỉ áp dụng Direct Post**; nhãn AI của Instagram **không gỡ được** sau khi đăng; YouTube là `containsSyntheticMedia` (`is_ai_generated` là tên thay thế dùng chung) | 5-5 (C3) |
| U3 | TikTok bị 403 trên gói Free của Upload-Post → gói phải từ Basic trở lên | Q11, chi phí |
| U4 | Trang thống kê **không liệt kê số người theo dõi cho TikTok** | 3-10, 3-7 có thể thiếu số TikTok; phải thử thật |
| U5 | Upload-Post có **Best Time to Post** và **Audience Insights** (giờ người theo dõi hoạt động) | Ảnh hưởng 8-9, 8-1: giả định S07-08 trong `SCD` ("không có số liệu theo giờ") có thể sai; cần kiểm chứng |

### 4.3. Ghi chú về cách viết

- §8.2 gọi "màn hình kết nối 48 giờ" trong [YK2] là "mô tả cũ". [YK2] v2 là tài liệu hiện hành; dùng Connect API thay trang dựng sẵn là **quyết định của đội, khác [YK2]**, nên phải hỏi khách (Q02 đã ghi). Nên đổi câu chữ cho đúng bản chất.
- Q01 (đăng ký profile lúc nào): `SCD` đề xuất khi tài năng chuyển sang 利用中 (S06-02).
- `reschedule-failed` cho cả tài năng và quản lý: khớp [YK2] 8-5 nhưng khác [AG] (S06-04).
- Giữ bài chờ duyệt ở hệ thống, chỉ gửi Upload-Post khi đã duyệt: khớp `SCD` S06-01.

## 5. Việc nên làm

1. Đối chiếu lại bộ PWA và bộ OneDrive với [YK2] v2 và [AG]; sửa P1–P7, O1–O3.
2. Chọn một cách tải ảnh, video, sửa cả ba bộ và `SCD/EP05/6-3`.
3. Thêm bảng nối F-ID ↔ mã chức năng [YK2] ↔ mã màn hình [AG] ↔ file `SCD`.
4. Sửa kết luận MCP theo 御見積書 前提条件A4.
5. Bổ sung U1–U5 vào bộ Upload-Post; đưa U5 vào `SCD/EP07/8-1`, `8-9`.

## 6. Nguồn đã tra

- https://docs.upload-post.com/api/connect-api
- https://docs.upload-post.com/api/user-profiles/
- https://docs.upload-post.com/api/upload-video/
- https://docs.upload-post.com/guides/rate-limits
- https://docs.upload-post.com/api/schedule-posts
- https://docs.upload-post.com/api/webhooks/
- https://docs.upload-post.com/api/retry-post
- https://docs.upload-post.com/api/get-analytics

## 7. Trạng thái sửa (17/11/2026)

Đã sửa theo mọi mục ở trên.

| Bộ / nơi | Đã làm |
|---|---|
| PWA (bản 1.1) | P1–P7 và P8–P14: nguồn chuyển sang [YK2] v2 và [AG]; thêm bảng nối F-ID ↔ chức năng ↔ màn ↔ SCD (mục 1.2); tự gửi đơn và mật khẩu lần đầu (F02, F03); /home là màn đầu, menu theo [AG]; trạng thái theo hình 5-1; GMO, lịch sử ở trang GMO; bỏ mốc người theo dõi; tên và màu theo ứng dụng アデッソ; cờ `talentRescheduleFailed`, `selfMadeVideoDaily`. Sinh lại 92 ca kiểm thử theo tính năng (tổng 116); ma trận tính năng–màn hình có thêm mã chức năng, màn [AG], file SCD; schema `UploadSession` đổi sang Supabase Storage (ví dụ payload hợp lệ); API_ENDPOINTS, manifest, README, SOURCE_MANIFEST, VALIDATION cập nhật |
| OneDrive (bản 1.1) | O1–O7: nguồn v2; mốc tạo thư mục theo v2; thêm `AIメモ.md`; cây thư mục tiếng Nhật thống nhất `SCD/EP02/2-2`; bỏ xuất từ cấm; tải media qua Supabase Storage; MCP là phương án chính theo báo giá (kèm mục 0 mới trong `CHATGPT_MCP_EVIDENCE_VI.md`). FOLDER_MANIFEST viết lại; 3 ca kiểm thử sửa tên; README, SOURCE_MANIFEST, VALIDATION cập nhật |
| Upload-Post (bản 1.1) | U1–U5 và các ghi chú ở 4.3: giới hạn request và giới hạn đăng 24 giờ; nhãn AI từng mạng; gói tối thiểu Basic; TikTok thiếu số người theo dõi; Audience Insights, Best Time to Post; nguồn tệp đăng là bản tạm trên Supabase; người đặt lại bài lỗi; câu chữ về trang 48 giờ; Q01 theo S06-02 |
| `SCD/` | 2-2 (cây thư mục), 2-3 (MCP theo báo giá), 3-1, 3-10 (TikTok), 5-5 (nhãn AI), 8-1, 8-9 (Best Time to Post), 8-4 (giới hạn 24 giờ); `EP02/00_Cau_hoi_cho_khach.md` (S02-01) |
| Khác | File 16 mục 1.1 điểm 4 (MCP); file 15 (S02-01, S07-08); CLAUDE.md (file Q&A, `agent_spec/`) |

Đã làm thêm (17/11, chiều):
- **Microsoft Graph:** đã tra lại các trang createUploadSession, PUT content, Selected permissions, change notifications và delta. Trang endpoint không liệt kê quyền Selected, nên POC P02 vẫn bắt buộc. Thông báo thay đổi và delta chỉ chạy ở thư mục gốc; thông báo có thể trễ tới 6 giờ. Đã ghi vào bộ OneDrive §4.2, §9.1, §11.1.
- **Upload-Post:** đã đọc trang riêng của Best Time to Post và Audience Insights.
  - Số người theo dõi TikTok lấy được qua `followers_daily`.
  - 8-9 làm được bằng `best-times`.
  - Đã ghi vào bộ Upload-Post §13.2a, SCD 3-10, 8-1, 8-9; đóng S07-08.
- **File Q&A:** đã đọc bản cập nhật 15/11. Hầu hết đã chốt theo [YK2] v2; các phần ngoài báo giá còn chờ là CR-17〜CR-25. Kết quả ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`. Theo đó PWA D08 chuyển sang "chưa làm" (CR-23).

## 8. Bộ Supabase Database và Auth (bản 1.2, kiểm chứng 17/11/2026)

Phạm vi: bỏ qua phần cấu trúc dữ liệu theo yêu cầu (§4 của đặc tả chính, `DATA_DICTIONARY_VI.md`, `sql/`, `RLS_PERMISSION_MATRIX.json`, `examples/database-client-reference.ts`, các ca kiểm thử nhóm DB). Đối chiếu với [YK2] §6-1, §6-2, [AG] M-01, Q&A bản 15/11 và tài liệu Supabase.

**Khớp nguồn:**
- MFA mặc định là ứng dụng xác thực 6 số, lần đầu đăng ký bằng QR ([YK2] §6-2 chức năng 1-6; [AG] M-01).
- Các giá trị đăng nhập: mật khẩu ≥ 8 ký tự có chữ và số, sai 5 lần khóa 15 phút, giữ đăng nhập 30 ngày, quản trị không thao tác 30 phút thì đăng nhập lại ([YK2] §6-1, §6-2).
- Luồng đăng ký: tự gửi đơn → duyệt → mật khẩu tạm → đổi mật khẩu.
- Vô hiệu hóa quản lý có hiệu lực ngay.

**Đã tra lại tài liệu Supabase:**
- Phiên mặc định không hết hạn. Time-box và inactivity timeout chỉ có từ gói Pro và chỉ kiểm khi refresh → phải giữ registry của app. Đặc tả đúng.
- Phone MFA: mỗi mã hiệu lực tối đa 5 phút; các mã gửi sau vẫn còn hiệu lực tới hết hạn. Add-on giá 75 USD/tháng cho project đầu, 10 USD/tháng cho mỗi project sau, không nằm trong Spend Cap; phí tin nhắn tính riêng. Đặc tả đúng.
- Recovery codes cần `auth.experimental.recoveryCodes: true`. Đặc tả đúng (giữ tắt).
- **Mới:** Password Verification Hook và MFA Verification Attempt Hook **chỉ có ở gói Team và Enterprise**. Ở gói Pro, quy tắc "sai 5 lần khóa 15 phút" không chặn được lời gọi thẳng tới Auth. Đã ghi vào AU05 và Q08. Đã sửa câu tương ứng trong bộ PWA (F01).

**Đã sửa:**
- Các chỗ sót lại từ bản 1.1 (SMS-only):
  - Chữ bị thay nhầm `auth.mfa.getđiện thoại nhận SMSAssuranceLevel` → `getAuthenticatorAssuranceLevel`.
  - AU10 bắt quản lý mới phải dùng SMS; §11 bước 4; các ca EM01-T05, AU07-T03, SEC11, SEC17 đòi "Phone MFA qua SMS". Đã đổi thành "một MFA được policy cho phép, mặc định TOTP".
- Tham chiếu Q&A cũ ("dòng 11, 12, 21, 26, còn nháp") đã đổi sang Q&A bản 15/11:
  - No.11 và CR-01: tự đăng ký đã chốt làm ở SP1; đóng Q01.
  - No.25: giữ các giá trị của v2.
  - No.20: tài khoản công ty đăng nhập lại từng tài khoản, không có chuyển tài khoản.
  - No.10: 3 trạng thái tài năng.
  - Hạn mật khẩu tạm đổi từ 24 giờ sang đề xuất 7 ngày của No.65, khớp bộ PWA.
  - Khôi phục MFA cho quản lý theo đề xuất No.67.
- `SOURCE_MANIFEST.json`: cập nhật hash của Q&A và Upload-Post. S17 trỏ sang thư mục PWA 1.1 (không còn tệp ZIP).
- `COMPATIBILITY_NOTES.md`: X01, X03, X04 đã đồng bộ với PWA 1.1 và OneDrive 1.1.

**Đã quyết (17/11/2026, áp dụng vào bản 1.3):** không làm OTP qua email (đã xóa EM01, EM02 và các phần liên quan); ưu tiên Authenticator TOTP, SMS giữ đặc tả để bàn với khách (câu S01-11); khóa 5 lần sai làm ở BE (AU05). Danh sách dưới đây là trạng thái trước khi quyết.

**Cần quyết định (không tự sửa):**
1. **Khóa sau 5 lần sai:** chọn gói Team, hoặc chấp nhận chỉ khóa ở BFF (Q08, I1).
2. **Module Email OTP (EM01, EM02, X07):** không có trong [YK2], [AG] hay Q&A. Đặc tả ghi là "yêu cầu mới" nhưng không rõ nguồn. Đang để mặc định tắt. Nếu không có yêu cầu thì nên bỏ khỏi phạm vi.
3. **Nhánh SMS:** chỉ có căn cứ là đoạn trích "SMS方式は要件定義でご相談" (phương thức SMS sẽ bàn trong giai đoạn định nghĩa yêu cầu). Đoạn này không có trong [YK2] lẫn [AG]. Nếu làm SMS thì tốn thêm add-on và công làm; nên hỏi khách trước khi code nhánh này.
4. **Đổi email (AU08):** v2 không có; vẫn để tắt (liên quan B11, S01-06).

Chưa chạy thật: Supabase, SMTP, SMS, kiểm thử. Các ca kiểm thử vẫn NOT_RUN.

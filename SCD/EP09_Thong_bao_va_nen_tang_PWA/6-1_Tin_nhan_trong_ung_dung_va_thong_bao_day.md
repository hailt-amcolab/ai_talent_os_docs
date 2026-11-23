# 6-1 Tin nhắn trong ứng dụng và thông báo đẩy

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**PWA: kiểm tra thông báo và phương án thay thế — PROPOSAL của nguồn:** Đề nghị hướng dẫn mở Safari, thêm màn hình chính, mở từ icon, cho phép và nhận thông báo thử; không cho phép thì báo trong app hoặc email; mở lại vẫn thấy lời nhắn. **Giới hạn:** PWA cơ bản đã có trong phạm vi; email dự phòng cho Talent và bước thử cần đối chiếu. 7:30 là ví dụ, không thay lịch cấu hình sáng/trưa/tối; tài liệu hỗ trợ WebPush không chứng minh thiết bị đã được kiểm thử. Nguồn `ISS22-P PDFtrang4; ADV22 PDFtrang3`; EV `EV-1244;EV-1254`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Thông báo trong app luôn dùng được; push khi có quyền; nhấn mở màn liên quan. Không cấp quyền push vẫn đọc trong app.

Danh mục/câu chữ cuối cần đầu mối khách duyệt; cơ chế push không bảo đảm giao nhận.

Căn cứ: `T19:24,33;BF19:14` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0576;EV-0585;EV-0626`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP09 – Thông báo và nền tảng PWA |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-12, chức năng 6-1; §6-13; 別紙A (phụ lục A); §9-1; §11 |
| Màn hình [AG] | T-14 (お知らせ), biểu tượng chuông ở T-06, T-07 |
| Tên trong mã nguồn | In-app & Push Notifications |
| Mức sẵn sàng | 🟡 Vàng – giao agent được theo đề xuất Web Push (C6) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C6, kiểm chứng iOS | ⚠ đội đề xuất | ⚠ C-05, 6-8 |

## Mục đích

Thông báo cho tài năng hiện ở màn お知らせ trong ứng dụng. Máy đã cho phép thì gửi thêm thông báo đẩy. Mở thông báo thì vào màn liên quan. Máy chưa cho phép vẫn xem được khi mở ứng dụng (§6-12 chức năng 6-1).

## Luồng chính

1. Module nào cần báo tài năng thì gọi một hàm chung `notify(talent_id, type, payload)`; `type` theo danh mục C-05.
2. Lưu thông báo (chưa đọc). Biểu tượng chuông hiện số chưa đọc.
3. Nếu tài năng có đăng ký Web Push còn hiệu lực: worker gửi thông báo đẩy kèm đường dẫn tới màn liên quan (C-05).
4. T-14: danh sách mới nhất trước; chạm vào thì đánh dấu đã đọc và mở màn liên quan (T-08, T-12, T-13, T-05, T-15…).
5. Đăng ký Web Push: tạo ở bước 2 của hướng dẫn (6-2); một tài năng có thể có nhiều máy.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Máy chưa cho phép, hoặc iPhone dưới iOS 16.4, hoặc chưa thêm vào màn hình chính | Chỉ có trong T-14 | §9-1, 確認12 (giả định) |
| Đăng ký Web Push hết hạn (máy chủ đẩy báo không còn) | Xóa đăng ký đó, không thử lại | [Đề xuất nội bộ] |
| Gửi thông báo đẩy lỗi tạm thời | Thử lại ít lần; vẫn còn trong T-14 | §11 (không cam kết luôn tới) |
| Nhiều máy | Gửi tới mọi máy; đọc ở một máy thì máy khác cũng hết số chưa đọc | [Đề xuất nội bộ] |
| Thông báo cũ | Giữ 90 ngày rồi xóa | S09-01 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Kênh | Trong ứng dụng; thêm thông báo đẩy nếu được phép | Chốt | §6-12 |
| Cơ chế đẩy | Web Push (khóa VAPID), không dùng dịch vụ ngoài | Đề xuất | C6, file 18 mục 4 |
| Danh mục loại | Theo C-05 | Chốt + đề xuất | §6-13, 別紙A, A6, A7 |
| Thời gian giữ | 90 ngày | Tham số | S09-01 |
| Thư điện tử cho tài năng | Chỉ kết quả đăng ký và đặt lại mật khẩu | Chốt | 別紙A |

## Dữ liệu [Đề xuất nội bộ]

- `talent_notifications`: `id`, `talent_id`, `type`, `title`, `body`, `link`, `read_at`, `created_at`.
- `push_subscriptions`: `talent_id`, `endpoint`, `keys`, `user_agent`, `created_at`, `last_success_at`.

## Tích hợp

Web Push qua máy chủ đẩy của Apple, Google (thư viện web-push trên worker). Kiểm chứng trên iPhone iOS 16.4 trở lên đã thêm vào màn hình chính.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng đã cho phép, thì nhận thông báo đẩy "写真・動画を送りましょう" và chạm vào mở đúng màn.
2. Cho tài năng chưa cho phép, thì vẫn thấy thông báo ở T-14.
3. Cho 3 thông báo chưa đọc, thì chuông hiện 3; đọc một cái thì còn 2.
4. Cho iPhone iOS 16.4 đã thêm vào màn hình chính, thì nhận được thông báo đẩy.

## Ngoài phạm vi của chức năng này

- Giờ yên lặng, tắt từng loại thông báo: không có trong [YK2].
- Thông báo cho quản lý (7-4).

## Phụ thuộc

C-05 (danh mục), 6-8 (service worker), 6-2 (đăng ký).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認12, 38, 39.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| C6 | Cơ chế thông báo đẩy | Không | Web Push |
| A6 | Các loại còn thiếu trong 別紙A | Không | Theo C-05 |
| S09-01 | Giữ thông báo 90 ngày | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP09: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-12 (6-1), §6-13, §9-1, §11, 別紙A, 確認12. [AG] trang 5 (T-14). [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 4.

Đặc tả kỹ thuật thông báo đẩy (VAPID, xin quyền, nhận và bấm thông báo, mã lỗi khi gửi): [`agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md`](../../agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md) mục 5–6.

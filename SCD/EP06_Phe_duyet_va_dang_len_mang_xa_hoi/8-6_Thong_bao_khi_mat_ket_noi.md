<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Ngắt hoặc đổi SNS còn lịch

Chặn ngắt kết nối hoặc đổi tài khoản của đúng SNS còn bài đã đặt lịch. Hiện danh sách bài liên quan để Talent tự huỷ trước rồi mới ngắt; không bắt buộc chỉ Manager huỷ. T-07 có nút 「接続を解除」. SNS không có lịch không chịu chặn này.

**Phần còn mở/giới hạn:** Không áp dụng thao tác người dùng này để suy cách xử lý SNS tự hết hạn/mất kết nối; cơ chế phát hiện do đội/provider.

Căn cứ: QA `Q&A!A95:J95 (No.95)`; `EV-1346` / `DEC-0030`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 8-6 Thông báo khi mất kết nối

## Đối chiếu nguồn hiện hành — 20/11/2026

Mất kết nối báo Talent và Manager; Talent tự nối lại từ T-07.

Cơ chế phát hiện và phục hồi do đội/provider.

Căn cứ: `T19:10,24;M19:6;BF19:5` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0562;EV-0576;EV-0591;EV-0617`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-10, chức năng 8-6; 別紙A (SNS の接続切れ) |
| Màn hình [AG] | T-05 (接続切れ), T-14; M-02, M-06, M-08 (biểu tượng đỏ) |
| Tên trong mã nguồn | SNS Disconnection Notification |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; cách Upload-Post báo mất kết nối phải kiểm chứng |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ✅ | ✅ | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 8-2 |

## Mục đích

Kết nối với một mạng bị mất thì báo tài năng kết nối lại, và hiện trên màn hình quản trị (§6-10 chức năng 8-6).

## Luồng chính

1. Phát hiện mất kết nối (S06-08): khi Upload-Post báo (webhook nếu có), khi kiểm tra hằng ngày cùng lúc lấy kết quả (8-7), và ngay trước khi gửi lịch đăng.
2. Trạng thái mạng chuyển sang `disconnected` (8-2).
3. Báo tài năng **một lần cho mỗi lần mất**: thông báo SNS の接続切れ, mở vào T-05.
4. Màn hình quản trị: biểu tượng đỏ ở M-06, M-08; thông báo ở M-02 ([AG] M-02 có loại này; 7-4 trong [YK2] thiếu, xem A6).
5. Tài năng kết nối lại ở T-05 (8-2), trạng thái về `connected`.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Mất rồi có lại, rồi mất tiếp | Mỗi lần mất báo một lần | [Đề xuất nội bộ] |
| Mất kết nối trước giờ đăng | Bài vẫn đăng các mạng còn lại; mạng mất ghi lỗi (8-5) | §6-10 |

## Dữ liệu

`sns_connections` (8-2) thêm `disconnected_at`, `notified_at`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho YouTube mất kết nối, thì tài năng nhận đúng một thông báo, T-05 hiện 接続切れ, M-06 có biểu tượng YouTube màu đỏ.
2. Cho kết nối lại thành công, thì biểu tượng về màu xanh.

## Phụ thuộc

8-2, 8-7, 7-4, 6-1.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-08 | Phát hiện mất kết nối lúc nào | Không | Hằng ngày và trước mỗi lần đăng |
| A6 | 7-4 thiếu loại "mất kết nối" | Không | Theo [AG] M-02 |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (8-6), §6-12 (7-4), 別紙A. [AG] trang 3 (T-05), trang 5 (T-14), trang 6 (M-02).

## Bổ sung từ tài liệu Upload-Post (17/11/2026)

- Các lỗi mất kết nối của Upload-Post chủ yếu là chuỗi chữ ("session has expired", "Token expired and refresh failed"…), chỉ TikTok có mã `tiktok_reconnect_required`. Phân loại theo mẫu chuỗi đã kiểm trong POC.
- **Instagram `account_checkpoint_required`:** chủ tài khoản phải mở Instagram để xử lý cảnh báo bảo mật; kết nối lại không giải quyết được. Câu thông báo cho tài năng phải khác với câu "kết nối lại".
- Chi tiết: bộ Upload-Post §9 (U26).

</details>

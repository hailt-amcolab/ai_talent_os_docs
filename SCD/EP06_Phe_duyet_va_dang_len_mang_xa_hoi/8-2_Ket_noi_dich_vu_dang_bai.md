# 8-2 Kết nối dịch vụ đăng bài

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**TikTok: tách gửi nháp và đăng công khai — PROPOSAL của nguồn:** Đề nghị gửi TikTok vào inbox/nháp để Talent hoàn tất trong app, thay nhánh tự động không xác nhận; nguồn đề nghị Instagram/YouTube giữ hai chế độ. **Giới hạn:** Chưa chọn phương án thay thế quyết định hai chế độ đã có. Gửi nháp chưa phải đã đăng; cần kiểm đồng ý trước khi gửi, quyền upload, ảnh/video, lịch, caption và đối soát. Draft không tự giải quyết điều kiện sử dụng cho agency. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang3; ADV22 PDFtrang5; ADV22 PDFtrang10`; EV `EV-1242;EV-1243;EV-1256;EV-1261`.

**Đồng ý và quyền riêng tư theo từng SNS — PROPOSAL của nguồn:** Đề nghị hiện tài khoản TikTok, cho người dùng chọn mức công khai không chọn sẵn, cấu hình tương tác/nội dung thương mại và ghi nhận nội dung, media, SNS, thời điểm đồng ý. **Giới hạn:** OAuth kết nối không đồng nghĩa đồng ý cho từng nội dung. Cần UI và phiên bản nội dung được xác nhận; chưa tự thêm schema/API hoặc quyền Manager xác nhận thay. Nguồn `ISS22-P PDFtrang3; ISS22-P PDFtrang7; ISS22-P PDFtrang10`; EV `EV-1243;EV-1247;EV-1250`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Mở màn login/cho phép của từng SNS, không mở giao diện dịch vụ đăng; quay về T-07. Một tài khoản mỗi SNS; business/creator Instagram; không cần nối đủ 3 SNS.

Luồng nhà cung cấp/48 h là thiết kế tích hợp phải kiểm, không hỏi khách chọn API hoặc khẳng định đã kiểm tài khoản thật.

Căn cứ: `T19:10,26;BF19:5` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0562;EV-0578;EV-0617`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 8-2; §8; UC-03, UC-08 前提 |
| Màn hình [AG] | T-05 (kết nối), T-04 (bước 4), T-06; M-06, M-07 (trạng thái kết nối) |
| Tên trong mã nguồn | Posting Service Connection |
| Mức sẵn sàng | 🔴 Đỏ – chưa kiểm chứng luồng kết nối của Upload-Post; chưa chốt lúc nào đăng ký tài năng (S06-02) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ S06-02 | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ✅ | ❌ kiểm chứng | ⚠ đội đề xuất | ⚠ 1-1 |

## Mục đích

Đăng ký tài năng với Upload-Post, rồi cho tài năng tự đăng nhập Instagram, TikTok, YouTube để kết nối qua màn kết nối riêng của Upload-Post. Trạng thái kết nối hiện ở ứng dụng và màn hình quản trị (§6-10 chức năng 8-2).

## Luồng chính

1. Tạo mapping với dịch vụ đăng theo thiết kế đội; mốc tạo profile/phí cần kiểm provider, không suy đã được khách duyệt.
2. Talent chọn nối/nối lại ở T-07 (SD-T19 trang10). Hệ thống phối hợp dịch vụ đăng qua API, mở màn đăng nhập/cho phép của chính SNS. Không mô tả Talent đăng nhập trên giao diện Upload-Post.
3. Talent cho phép SNS; quay T-07, hiển thị trạng thái hoặc lý do thất bại. Instagram cần business/creator.
4. Mỗi SNS một tài khoản; không buộc nối đủ ba; unit được coi là office.
5. Thời hạn/link riêng48giờ trong YK2 là điểm thiết kế cần đối chiếu với cơ chế mới, không đặt như hành vi khách bắt buộc ở màn19/11.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đường dẫn hết hạn | Bấm lại để tạo đường dẫn mới | §6-10 |
| Tạo hồ sơ trên Upload-Post lỗi | Thử lại qua hàng đợi; nút SNS をつなぐ tạm khóa, ghi "đang chuẩn bị" | §9-3 |
| Instagram là tài khoản cá nhân | Upload-Post báo lỗi; hiện hướng dẫn chuyển sang tài khoản doanh nghiệp hoặc nhà sáng tạo | [AG] T-05 |
| Kết nối 2 tài khoản cùng một mạng | Không cho; chỉ một tài khoản mỗi mạng | §6-10, [KS] 確認10 |
| Chỉ nối 1–2 mạng | Vẫn dùng được; chỉ đăng lên mạng đã nối | 確認11 (giả định) |
| Không đọc được trạng thái khi quay về | Hỏi lại định kỳ vài phút; nút "cập nhật" ở T-05 | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Hạn đường dẫn kết nối | 48 giờ | Chốt (giá trị của Upload-Post, kiểm chứng) | §6-10 |
| Mỗi mạng một tài khoản; tài khoản của nhóm (ユニット) coi là tài khoản công ty | — | Chốt ([KS] 確認10) | §6-10 |
| Phí Upload-Post theo số tài năng đã đăng ký | — | Chốt | UC-08 前提 |

## Dữ liệu [Đề xuất nội bộ]

`uploadpost_profiles`: `talent_id`, `profile_id`, `created_at`, `deleted_at`. `sns_connections`: `talent_id`, `platform`, `status` (`connected`, `not_connected`, `disconnected`), `account_name`, `checked_at`.

## Màn hình

T-05: ba dòng mạng kèm trạng thái, nút SNS をつなぐ, câu "đường dẫn dùng được 48 giờ" ([AG] trang 3).

## Tích hợp

Upload-Post: tạo và xóa hồ sơ, tạo đường dẫn kết nối, đọc trạng thái kết nối. Tất cả phải kiểm chứng (danh sách ở file câu hỏi).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng vừa đăng ký thanh toán, thì có hồ sơ trên Upload-Post và nút SNS をつなぐ dùng được.
2. Cho tài năng nối Instagram và TikTok, thì T-05 và M-07 hiện hai mạng 接続済み, YouTube これから.
3. Cho đường dẫn quá 48 giờ, thì bấm lại được đường dẫn mới.
4. Cho tài năng chuyển sang 利用終了, thì hồ sơ trên Upload-Post bị xóa.

## Phụ thuộc

1-1 (sự kiện thanh toán), 6-2 (bước 4 của hướng dẫn), 7-3 (利用終了).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認9, 10, 11.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-02 | Đăng ký tài năng với Upload-Post lúc nào | Có | Khi chuyển sang 利用中 |
| S01-03 | Xóa hồ sơ khi tài năng ngừng | Không | Xóa |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (8-2), §8, §9-3, UC-03, UC-08 前提, 確認9–11. [AG] trang 2 (T-04), trang 3 (T-05).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.23, CR-20: **không làm** ([KS] 確認10). Mỗi mạng một tài khoản; tài khoản của nhóm (ユニット) coi là tài khoản công ty.

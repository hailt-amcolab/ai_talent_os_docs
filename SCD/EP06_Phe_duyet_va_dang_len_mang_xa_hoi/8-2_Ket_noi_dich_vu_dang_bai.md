# 8-2 Kết nối dịch vụ đăng bài

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

1. **Đăng ký:** khi tài năng chuyển sang 利用中 (đăng ký thanh toán xong, S01-01), hoặc khi quản lý tạo tài khoản công ty, worker tạo hồ sơ tài năng trên Upload-Post, lưu mã hồ sơ (S06-02). §6-10 ghi "khi đăng ký tài năng"; đội đề xuất mốc này để không mất phí cho người chưa thanh toán.
2. **Kết nối:** tài năng bấm SNS をつなぐ ở T-05. Hệ thống xin Upload-Post đường dẫn kết nối riêng (hạn 48 giờ) và mở trong trình duyệt.
3. Tài năng đăng nhập từng mạng ngay trên trang của Upload-Post. Instagram phải là tài khoản doanh nghiệp hoặc nhà sáng tạo ([AG] T-05).
4. Quay về ứng dụng: hệ thống đọc trạng thái kết nối từng mạng từ Upload-Post và lưu lại. T-05, T-06, M-06, M-07 hiện 接続済み (đã kết nối), これから (chưa), 接続切れ (mất kết nối).
5. **Hủy đăng ký:** khi chuyển sang 利用終了 thì xóa hồ sơ trên Upload-Post (S01-03).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đường dẫn hết hạn | Bấm lại để tạo đường dẫn mới | §6-10 |
| Tạo hồ sơ trên Upload-Post lỗi | Thử lại qua hàng đợi; nút SNS をつなぐ tạm khóa, ghi "đang chuẩn bị" | §9-3 |
| Instagram là tài khoản cá nhân | Upload-Post báo lỗi; hiện hướng dẫn chuyển sang tài khoản doanh nghiệp hoặc nhà sáng tạo | [AG] T-05 |
| Kết nối 2 tài khoản cùng một mạng | Không cho; chỉ một tài khoản mỗi mạng | §6-10 (giả định 確認10) |
| Chỉ nối 1–2 mạng | Vẫn dùng được; chỉ đăng lên mạng đã nối | 確認11 (giả định) |
| Không đọc được trạng thái khi quay về | Hỏi lại định kỳ vài phút; nút "cập nhật" ở T-05 | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Hạn đường dẫn kết nối | 48 giờ | Chốt (giá trị của Upload-Post, kiểm chứng) | §6-10 |
| Mỗi mạng một tài khoản | — | Giả định (確認10) | §6-10 |
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

Các 確認 liên quan (không xử lý ở đây): 確認9, 10, 11.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-02 | Đăng ký tài năng với Upload-Post lúc nào | Có | Khi chuyển sang 利用中 |
| S01-03 | Xóa hồ sơ khi tài năng ngừng | Không | Xóa |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (8-2), §8, §9-3, UC-03, UC-08 前提, 確認9–11. [AG] trang 2 (T-04), trang 3 (T-05).

## Cập nhật theo Q&A (bản ngày 15/11/2026)

- Q&A No.23, CR-20: nhiều tài khoản trên một mạng chưa làm tới khi khách quyết. Giữ mỗi mạng một tài khoản.

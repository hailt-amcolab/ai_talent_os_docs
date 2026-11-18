# 2-4 Đăng ký mục tiêu

| Mục | Giá trị |
|---|---|
| Module | EP02 – Thông tin tài năng và nguồn dữ liệu cho AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-4, chức năng 2-4; UC-02 前提; §7-1, §7-2 |
| Màn hình [AG] | M-10 (khối フォロワー数の目標) |
| Tên trong mã nguồn | Talent Goal Management |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Hạn đạt có bắt buộc không, và có ghi ra OneDrive không, là đề xuất chờ khách (S02-05) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ✅ | ⚠ ghi OneDrive (2-2) | ⚠ đội đề xuất | ⚠ 3-10 hiển thị |

## Mục đích

Quản lý đặt mục tiêu số người theo dõi cho từng mạng của từng tài năng, kèm hạn đạt. Mục tiêu hiện ngay trên ứng dụng và màn hình quản trị (§6-4 chức năng 2-4).

## Tác nhân và quyền

- Quản lý: nhập và sửa ở M-10.
- Tài năng: chỉ xem, không sửa (UC-02 前提).

## Luồng chính

1. Khi tạo bản ghi tài năng (1-4) hoặc tài khoản công ty (1-2), hệ thống đặt mục tiêu mặc định 10.000 cho cả Instagram, TikTok, YouTube; hạn đạt để trống (§6-4).
2. Quản lý mở M-10, sửa ba con số và hạn đạt, bấm 保存する (lưu).
3. Hệ thống lưu vào cơ sở dữ liệu. Màn tiến độ của tài năng (6-7, 3-10) và màn hình quản trị (M-06, M-07) dùng giá trị mới ngay.
4. Hệ thống ghi lại `目標.md` trong thư mục tài năng để AIコーチ đọc từ sáng hôm sau (S02-05, §7-2).
5. Ghi nhật ký thao tác (C-03).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Số không hợp lệ (âm, 0, không phải số nguyên) | Báo lỗi tại ô nhập | [Đề xuất nội bộ] |
| Hạn đạt là ngày đã qua | Báo lỗi | [Đề xuất nội bộ] |
| Ghi `目標.md` lỗi | Vẫn lưu cơ sở dữ liệu. Thử lại qua hàng đợi; lô buổi sáng (2-1) cũng ghi lại file nếu thấy khác | [Đề xuất nội bộ] |
| Mục tiêu mới thấp hơn số người theo dõi hiện có | Cho lưu. Thông báo đạt mục tiêu là việc của 3-7 | [Đề xuất nội bộ] |
| Hai quản lý sửa cùng lúc | Người lưu sau thắng; nhật ký giữ cả hai lần | [Đề xuất nội bộ] |
| Quá hạn mà chưa đạt | Chỉ hiện "quá hạn" ở danh sách quản trị (đề xuất B12) | B12 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Mục tiêu mặc định | 10.000 cho mỗi mạng | Chốt | §6-4, §7-1 |
| Hạn đạt | Không bắt buộc | Đề xuất | S02-05 |
| Phản ánh | Ngay khi lưu | Chốt | §6-4 |
| Nơi lưu | Cơ sở dữ liệu là bản chính; `目標.md` là bản chép cho AI | Đề xuất | §7-2, S02-05 |

## Dữ liệu [Đề xuất nội bộ]

`talent_goals`: `talent_id`, `instagram_target`, `tiktok_target`, `youtube_target`, `deadline` (có thể trống), `updated_by`, `updated_at`.

## Màn hình

M-10: ba ô số cho Instagram, TikTok, YouTube, ô ngày 達成の期限 (hạn đạt), nút 保存する ([AG] trang 8).

## Tích hợp

Microsoft Graph: ghi `目標.md` (dùng chung với 2-2).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng mới được duyệt, thì mục tiêu là 10.000 cho cả ba mạng.
2. Cho quản lý đổi mục tiêu TikTok thành 5.000 và lưu, thì M-07 và màn tiến độ của tài năng hiện 5.000 ngay khi tải lại.
3. Cho số âm hoặc hạn đạt đã qua, thì không lưu được.
4. Cho lần lưu thành công, thì `目標.md` trong thư mục tài năng có giá trị mới (chậm nhất trước lô buổi sáng hôm sau).
5. Cho tài khoản tài năng, khi gọi API sửa mục tiêu, thì bị từ chối.

## Ngoài phạm vi của chức năng này

- Thử thách: viết trong hồ sơ (2-3), không có màn nhập riêng. Thông báo đạt mục tiêu: 3-7. Hiển thị tiến độ: 3-10, 6-7.

## Phụ thuộc

- 1-4, 1-2 (tạo bản ghi tài năng). 2-2 (thư mục để ghi `目標.md`).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認3 (mục tiêu mặc định 10.000), 確認5 (thử thách).

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S02-05 | Hạn đạt không bắt buộc; ghi mục tiêu ra `目標.md` | Không | Như đề xuất |
| B12 | Quá hạn chưa đạt thì làm gì | Không | Chỉ hiện "quá hạn" |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP02: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-4 (2-4), §7-1, §7-2, UC-02 前提, 確認3, 5.
- [AG] trang 8 (M-10). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) B12.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.14 (đã chốt): mục tiêu theo từng mạng, mặc định 10.000, có hạn đạt. Ô phần trăm mục tiêu chung trong thiết kế アデッソ sẽ chỉnh theo từng mạng khi làm định nghĩa màn hình. Đóng S02-05.

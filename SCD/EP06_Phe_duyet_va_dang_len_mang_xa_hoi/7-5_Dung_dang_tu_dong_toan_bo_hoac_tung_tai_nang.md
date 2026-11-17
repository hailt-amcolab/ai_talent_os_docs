# 7-5 Dừng đăng tự động, toàn bộ hoặc từng tài năng

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 7-5; §5-6; UC-08 前提 |
| Màn hình [AG] | M-16 (toàn bộ), M-10 (từng tài năng: 自動投稿 動作中, nút 止める) |
| Tên trong mã nguồn | Auto-posting Stop/Resume |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; hủy hàng loạt trên Upload-Post phải kiểm chứng |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ✅ | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 7-2 |

## Mục đích

Quản lý dừng hoặc chạy lại toàn bộ việc đăng tự động, hoặc riêng cho một tài năng. Khi dừng, không hẹn bài mới và hủy cả bài đã hẹn; bài đã hủy không đăng lại sau khi chạy lại (§6-10 chức năng 7-5, UC-08 前提).

## Tác nhân và quyền

Mọi quản lý (một loại quyền, 1-6).

## Luồng chính

1. **Toàn bộ (M-16):** bấm すべての自動投稿を止める, xác nhận ở hộp thoại ghi rõ hậu quả.
2. Ghi cờ dừng toàn bộ. Hủy mọi bài "đã hẹn giờ" trên Upload-Post (qua 7-2), bài sang "đã hủy".
3. M-16 hiện "đang dừng" và nút 再開する (chạy lại); bảng "lịch sử dừng và chạy lại" (ngày giờ, thao tác, người làm).
4. **Từng tài năng (M-10):** nút 止める, 再開する; hậu quả như trên nhưng chỉ cho tài năng đó.
5. Trong lúc dừng: AIコーチ vẫn nhắn và tạo bản nháp (S06-06); bài được chấp nhận giữ ở "đã chấp nhận, chưa hẹn giờ" (B6).
6. Chạy lại: bài "đã chấp nhận, chưa hẹn giờ" mà chưa quá giờ thì hẹn; quá giờ thì hủy và báo tài năng (B6). Bài đã hủy lúc dừng không đăng lại.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hủy trên Upload-Post lỗi với một số bài | Đánh dấu "hủy lỗi", thử lại; M-16 hiện số bài chưa hủy được. Không gửi bài mới trong lúc đó | [Đề xuất nội bộ] |
| Một bài đang được Upload-Post đăng đúng lúc dừng | Có thể đã đăng; ghi theo kết quả thật | [Đề xuất nội bộ] |
| Dừng toàn bộ trong khi một tài năng cũng đang dừng riêng | Chạy lại toàn bộ không chạy lại tài năng đó | [Đề xuất nội bộ] |
| Đếm ngày không đăng (3-9) | Không tính ngày đang dừng | S03-05 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Có màn xác nhận | Chốt | §6-10 |
| Dừng thì hủy cả bài đã hẹn; bài đã hủy không đăng lại | Chốt | §6-10, UC-08 前提 |
| Dừng toàn bộ và dừng từng tài năng là cài đặt quản lý chỉnh | Chốt | §5-6 |

## Dữ liệu [Đề xuất nội bộ]

`autopost_switches`: `scope` (`global`, `talent`), `talent_id`, `enabled`, `changed_by`, `changed_at`. Lịch sử thao tác ghi nhật ký (C-03) và hiện ở M-16.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho 10 bài đã hẹn, khi dừng toàn bộ, thì cả 10 bài "đã hủy" và Upload-Post không còn lịch.
2. Cho đang dừng, khi tài năng chấp nhận bài, thì bài không được hẹn.
3. Cho chạy lại, thì 10 bài đã hủy không đăng.
4. Cho dừng riêng tài năng A, thì bài của B vẫn đăng bình thường.
5. M-16 có một dòng lịch sử cho mỗi lần dừng và chạy lại, ghi người làm.

## Phụ thuộc

7-2 (hủy), 4-3, 8-3, C-03.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-06 | Khi dừng, AIコーチ vẫn nhắn và tạo bản nháp | Không | Như đề xuất |
| B6 | Bài chấp nhận trong lúc dừng | Không | Như B6 |
| A6 | Báo tài năng khi bài bị hủy do dừng | Không | Chờ A6 |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-6, §6-10 (7-5), UC-08 前提. [AG] trang 8 (M-10), trang 9 (M-16).

## Cập nhật theo Q&A (bản ngày 15/11/2026)

- Q&A No.60 (đang hỏi): khi đang dừng, AI vẫn chạy, tài năng vẫn chấp nhận được, bài ở trạng thái giữ lại; mở lại thì hẹn giờ nếu còn kịp.
- Q&A No.61 (đang hỏi): báo tài năng khi bài bị hủy; bài bị hủy về lại bản nháp.

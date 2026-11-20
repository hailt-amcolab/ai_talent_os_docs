# 7-2 Xem và hủy bài đăng

## Đối chiếu nguồn hiện hành — 20/11/2026

Manager hủy trên M-08, hệ thống hủy lịch dịch vụ; Talent xem hướng dẫn liên hệ Manager, không có nút hủy trong app.

T19 trang 31/BF19 trang 9 còn hỏi xác nhận phạm vi Talent không hủy; kênh thông báo khi Manager hủy và tái dùng bài còn No.61.

Căn cứ: `T19:22,31;M19:12;BF19:9` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0574;EV-0583;EV-0597;EV-0621`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 7-2; UC-08 前提 |
| Màn hình [AG] | M-08 (bài đăng của tài năng); T-13 (phía tài năng chỉ xem) |
| Tên trong mã nguồn | Post List & Cancellation |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; danh sách trạng thái chờ C-01 |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ✅ | ⚠ hủy qua API | ⚠ đội đề xuất | ⚠ 8-3 |

## Mục đích

Quản lý xem bài của từng tài năng, lọc theo trạng thái, và hủy bài đã hẹn ngay trên màn hình quản trị; hệ thống hủy cả lịch bên Upload-Post. Tài năng không hủy được trong ứng dụng (§6-10 chức năng 7-2).

## Luồng chính

1. M-08: danh sách bài của tài năng: giờ đăng, mạng (màu theo kết quả), trạng thái, lượt xem, lượt thích, nút thao tác.
2. Lọc theo trạng thái: 予約済み (đã hẹn), 承認待ち (chờ duyệt), 投稿済み (đã đăng), 失敗 (lỗi), cộng 使ってはいけない言葉 (dính từ cấm) như [AG].
3. Nút theo trạng thái: 承認へ (sang M-05), 取り消す (hủy), 文章を直す (sang M-11), 予約し直す (8-5).
4. Hủy: xác nhận → gọi Upload-Post hủy lịch → bài sang "đã hủy" → ghi nhật ký thao tác (C-03). Báo tài năng (chờ A6).
5. T-13 (tài năng): xem lịch và kết quả của mình, câu "muốn hủy thì liên hệ quản lý".

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hủy trên Upload-Post lỗi | Báo lỗi, bài giữ "đã hẹn"; cho thử lại | [Đề xuất nội bộ] |
| Hủy khi bài đang được đăng | Ghi theo kết quả thật | [Đề xuất nội bộ] |
| Hủy bài "chờ duyệt" | Hủy luôn, không cần gọi Upload-Post (S06-01) | S06-01 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Lọc theo trạng thái | Chốt | §6-10 |
| Chỉ quản lý hủy | Chốt | §6-10 |
| Hủy trên màn hình quản trị thì hệ thống hủy cả bên Upload-Post | Chốt | §6-10, UC-08 前提 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho lọc 失敗, thì chỉ hiện bài có ít nhất một mạng lỗi.
2. Cho hủy một bài đã hẹn, thì Upload-Post không còn lịch và bài là "đã hủy".
3. Cho tài khoản tài năng, khi gọi API hủy, thì bị từ chối.

## Phụ thuộc

8-3, 7-7, 4-4, 8-5, C-01, C-03.

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (7-2), UC-08 前提. [AG] trang 5 (T-13), trang 7 (M-08).

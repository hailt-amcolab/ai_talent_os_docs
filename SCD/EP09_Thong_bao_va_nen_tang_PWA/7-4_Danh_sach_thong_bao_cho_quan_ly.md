# 7-4 Danh sách thông báo cho quản lý

| Mục | Giá trị |
|---|---|
| Module | EP09 – Thông báo và nền tảng PWA |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-12, chức năng 7-4; 別紙A; UC-10 |
| Màn hình [AG] | M-02 (màn đầu tiên sau đăng nhập); số đếm ở menu trái; màn trên điện thoại (trang 11) |
| Tên trong mã nguồn | Manager Notification Center |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ⚠ lọc nhóm chờ 確認47 | ✅ | ⚠ đội đề xuất | ⚠ C-05 |

## Mục đích

Thông báo cho quản lý hiện ở danh sách trên màn hình quản trị, lọc theo loại và theo đã xử lý hay chưa. Mở thông báo thì vào màn của tài năng liên quan (§6-12 chức năng 7-4).

## Luồng chính

1. Module nào cần báo quản lý thì gọi `notify_managers(type, talent_id, payload)`; `type` theo C-05.
2. Một thông báo dùng chung cho mọi quản lý (§3-3).
3. M-02: cột ngày giờ, loại (nhãn màu), tài năng, nội dung, nút 対応済みにする (đánh dấu đã xử lý). Bộ lọc loại, công tắc "対応済みも表示" (hiện cả đã xử lý).
4. Chạm vào dòng thì mở màn liên quan (M-03, M-05, M-07 đến M-11).
5. Một quản lý đánh dấu đã xử lý thì **mọi quản lý** thấy đã xử lý, kèm tên người đánh dấu (S09-02).
6. Một số loại tự đánh dấu đã xử lý khi việc xong: 承認の依頼 khi đã duyệt, trả lại hoặc quá hạn; 利用の申し込み khi đã duyệt hoặc từ chối; 使ってはいけない言葉 khi đã sửa hoặc không đăng (S09-03).
7. Menu trái hiện số chưa xử lý.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hai quản lý cùng đánh dấu | Lần sau không đổi gì | [Đề xuất nội bộ] |
| Thông báo trùng (cùng tài năng, cùng loại, chưa xử lý) | Một số loại không tạo thêm (ví dụ 深刻な相談, S03-10) | C-05 |
| Danh sách dài | Phân trang; mặc định chỉ hiện chưa xử lý | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Chỉ hiện trên màn hình quản trị, không gửi thư hay thông báo đẩy cho quản lý | Giả định (確認45) | 別紙A |
| Lọc theo loại và đã xử lý | Chốt | §6-12 |
| 9 loại cho quản lý | Theo C-05 ([AG] M-02 có 9 loại; 7-4 trong [YK2] liệt kê 8, thiếu mất kết nối) | A6 |

## Dữ liệu [Đề xuất nội bộ]

`manager_notifications`: `id`, `type`, `talent_id`, `ref_id` (bài, đơn…), `body`, `handled_by`, `handled_at`, `created_at`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho có đơn xin dùng mới, thì mọi quản lý thấy một dòng 利用の申し込み ở M-02.
2. Cho quản lý A đánh dấu đã xử lý, thì quản lý B không còn thấy dòng đó khi tắt "対応済みも表示".
3. Cho bài chờ duyệt đã được duyệt, thì thông báo 承認の依頼 tương ứng tự là đã xử lý.
4. Lọc loại 投稿の失敗 thì chỉ hiện loại đó.

## Ngoài phạm vi của chức năng này

- Lọc theo nhóm tài năng (chờ 確認47). Thư điện tử hoặc thông báo đẩy cho quản lý (giả định 確認45).

## Phụ thuộc

C-05, 1-6, các module phát thông báo.

## Câu hỏi mở

Các 確認 liên quan (không xử lý ở đây): 確認45, 46, 47.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S09-02 | Đánh dấu đã xử lý áp dụng cho mọi quản lý | Không | Như đề xuất |
| S09-03 | Tự đánh dấu đã xử lý khi việc xong | Không | Như đề xuất |
| A6 | 7-4 thiếu loại mất kết nối | Không | Theo [AG] M-02 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP09: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-3, §6-12 (7-4), 別紙A, UC-10, 確認45–47. [AG] trang 6 (M-02), trang 11.

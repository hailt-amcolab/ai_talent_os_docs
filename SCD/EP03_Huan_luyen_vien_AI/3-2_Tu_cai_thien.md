# 3-2 Tự cải thiện

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-5, chức năng 3-2; §5-5; §7-5 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | AI Self-improvement |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Cấu trúc file bộ nhớ do đội quyết |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ tham số | ⚠ đội đề xuất | ✅ không cần màn | ⚠ ghi OneDrive (2-2) | ⚠ đội đề xuất | ⚠ 2-1, 8-7 |

## Mục đích

Kết quả và hội thoại đến hôm qua được dùng cho tin nhắn, chủ đề và bản nháp sáng nay. Điều AI hiểu ra (sở thích của tài năng, bài được tương tác tốt) được ghi thêm vào file trong thư mục tài năng (§6-5 chức năng 3-2).

## Luồng chính

1. Trong lô buổi sáng, trước khi tạo tin nhắn: với mỗi tài năng có hội thoại hoặc kết quả mới từ hôm qua, gọi AI để rút ra điều mới học được.
2. Cập nhật `AIメモ.md` theo mẫu cố định: `## 好み` (sở thích), `## 反応が良かった投稿` (bài được tương tác tốt), `## 避けること` (nên tránh), `## 更新履歴` (lịch sử cập nhật, ghi ngày).
3. Ghi file có kiểm tra phiên bản (eTag).
4. Dùng bản mới ngay cho tin nhắn sáng nay (3-1).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| File vượt giới hạn độ dài | AI viết lại thành bản tóm tắt gọn hơn, giữ các mục | [Đề xuất nội bộ] |
| Quản lý sửa file cùng lúc (eTag khác) | Đọc lại rồi cập nhật lại; không đè mất phần quản lý sửa | [Đề xuất nội bộ] |
| Ghi OneDrive lỗi | Giữ bản mới trong cơ sở dữ liệu, ghi lại vào lần sau | §9-3 |
| Không có gì mới | Không ghi | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Dùng dữ liệu đến hôm qua cho sáng nay | — | Chốt | §6-5, §5-5 |
| Giới hạn độ dài `AIメモ.md` | 10.000 ký tự | Tham số [Đề xuất nội bộ] | — |
| Chỉ ghi vào `AIメモ.md`, không sửa file khác | — | [Đề xuất nội bộ] | — |

## Dữ liệu

`AIメモ.md` trong thư mục tài năng (2-2). Bản đọc lưu trong `talent_context_snapshots` (2-1).

## Tích hợp

OpenAI (rút ra điều học được). Microsoft Graph (ghi file).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng nói hôm qua "ダンスの投稿が好き", thì sáng nay `AIメモ.md` có ý đó ở mục 好み.
2. Cho bài hôm qua có lượt thích cao nhất tuần, thì mục 反応が良かった投稿 có bài đó.
3. Cho quản lý sửa `AIメモ.md` lúc lô đang chạy, thì phần quản lý sửa vẫn còn sau khi AI ghi.
4. Cho file dài quá giới hạn, thì sau khi ghi độ dài nằm trong giới hạn và còn đủ 4 mục.

## Phụ thuộc

2-1, 2-2, 3-4 (hội thoại), 8-7 (kết quả).

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-5, §6-5 (3-2), §7-5, §9-3.

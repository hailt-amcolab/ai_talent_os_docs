# 3-6 Nhận xét bài hôm trước và gợi ý cải thiện

## Đối chiếu nguồn hiện hành — 20/11/2026

Mỗi sáng báo kết quả hôm trước, follower tăng,3 chủ đề và thử thách; nhắc tư liệu trong ngày; kết quả sau đăng; tổng kết tuần. Giờ chung chỉnh tại M-17.

Không chốt giờ 8/12/19 từ hình minh họa; giờ vận hành là cấu hình, số liệu SNS có thể chậm.

Căn cứ: `T19:12,13,16,27;M19:22` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0564;EV-0565;EV-0568;EV-0579;EV-0607`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-5, chức năng 3-6; 別紙A (翌日の振り返り) |
| Màn hình [AG] | T-08 (ví dụ "昨日の投稿は1,240回見られて、いいねは86でした"), T-07 |
| Tên trong mã nguồn | Daily Review |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Giờ lấy kết quả (C5) ảnh hưởng độ mới của số liệu |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ✅ | ✅ | ⚠ chỉ số Upload-Post (8-7) | ⚠ đội đề xuất | ⚠ 8-7 |

## Mục đích

Sáng sau ngày đăng bài, tin nhắn buổi sáng có số liệu cụ thể của bài hôm qua và điểm nên làm tốt hơn (§6-5 chức năng 3-6).

## Luồng chính

1. Lấy kết quả (8-7) chạy trước lô buổi sáng (C5).
2. Lô buổi sáng lấy các bài đăng thành công hôm qua của tài năng cùng số liệu (lượt xem, lượt thích… trong phạm vi Upload-Post có).
3. Gọi AI viết đoạn nhận xét: con số, so với trung bình 7 ngày, một đến hai điểm cải thiện.
4. Đưa đoạn này vào đầu tin buổi sáng (3-4).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hôm qua không đăng | Bỏ đoạn nhận xét, thay bằng một câu khích lệ ngắn | [Đề xuất nội bộ], S03-07 |
| Hôm qua đăng nhiều bài | Nhận xét từng bài, ngắn gọn | [Đề xuất nội bộ] |
| Chưa có số liệu (lấy lỗi, hoặc mạng chưa trả) | Chỉ nói "đã đăng", hẹn nhận xét ngày mai | [Đề xuất nội bộ] |
| Bài đăng lỗi trên một mạng | Chỉ nhận xét mạng đăng được | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Có con số thật của bài hôm qua | Chốt | §6-5 |
| Có điểm cải thiện | Chốt | §6-5 |
| Số liệu lấy từ hệ thống, AI không tự bịa số | [Đề xuất nội bộ] | — |

## Dữ liệu

Chỉ đọc: bài đăng (7-2, 8-3), số liệu (8-7).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bài hôm qua có 1.240 lượt xem, 86 lượt thích, thì tin buổi sáng ghi đúng hai con số đó.
2. Cho hôm qua không đăng, thì tin buổi sáng không có đoạn nhận xét số liệu.
3. Mọi con số trong đoạn nhận xét đều khớp với dữ liệu trong hệ thống (kiểm tra tự động: so con số trong câu với dữ liệu đưa vào).

## Phụ thuộc

8-7 (số liệu; dùng dữ liệu giả tới khi có), 3-4.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-07 | Hôm qua không đăng thì tin buổi sáng ghi gì | Không | Câu khích lệ ngắn |
| C5 | Lấy kết quả lúc mấy giờ | Không | Trước lô buổi sáng |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-5 (3-6), 別紙A. [AG] trang 3. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) C5.

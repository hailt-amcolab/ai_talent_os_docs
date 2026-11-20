# 3-8 Tổng kết tuần

## Đối chiếu nguồn hiện hành — 20/11/2026

Tổng kết hằng tuần; ngày gửi chọn được trên M-17. Ngày thứ Hai là đề xuất trước, không phải lịch bất biến.

Không phát sinh quyết định nghiệp vụ mới từ phần nguồn này; các đề xuất kỹ thuật cũ vẫn là đề xuất.

Căn cứ: `T19:16,27;M19:22` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0568;EV-0579;EV-0607`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-5, chức năng 3-8; §5-2; 別紙A (週次の振り返り) |
| Màn hình [AG] | T-08; M-17 (ngày trong tuần) |
| Tên trong mã nguồn | Weekly Review |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ tham số | ✅ | ✅ | ⚠ 8-7 | ⚠ đội đề xuất | ⚠ 8-7, 2-4 |

## Mục đích

Vào ngày đã cài (mặc định thứ Hai), gửi tổng kết một tuần: số bài, kết quả, mức tăng giảm người theo dõi, còn bao xa tới mục tiêu (§6-5 chức năng 3-8).

## Luồng chính

1. Vào ngày đã cài, lô buổi sáng tính cho tuần trước (thứ Hai 0:00 đến Chủ nhật 24:00, giờ Nhật): số bài đăng thành công, tổng lượt xem và lượt thích, số người theo dõi đầu tuần và cuối tuần của từng mạng, còn bao nhiêu tới mục tiêu (2-4).
2. Gọi AI viết đoạn tổng kết dựa trên các con số đó.
3. Gộp vào tin buổi sáng hôm đó (S03-06). Thông báo đẩy dùng loại 週次の振り返り.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Tài năng mới, chưa đủ một tuần | Tổng kết từ ngày bắt đầu dùng | [Đề xuất nội bộ] |
| Thiếu số liệu người theo dõi một số ngày | Dùng ngày gần nhất có số liệu | [Đề xuất nội bộ] |
| Tuần không đăng bài nào | Vẫn gửi, nói rõ số bài là 0 và khích lệ | [Đề xuất nội bộ] |
| Quản lý đổi ngày trong tuần | Áp dụng từ tuần sau | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Ngày gửi | Thứ Hai | Tham số (M-17) | §5-2 |
| Nội dung | Số bài, kết quả, tăng giảm người theo dõi, còn bao xa tới mục tiêu | Chốt | §6-5 |
| Gộp vào tin buổi sáng | — | Đề xuất | S03-06 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho thứ Hai, thì tin buổi sáng có đoạn tổng kết tuần với số bài đúng bằng số bài đăng thành công tuần trước.
2. Cho mục tiêu Instagram 10.000 và hiện có 3.100, thì đoạn tổng kết ghi còn 6.900.
3. Cho quản lý đổi ngày sang thứ Sáu, thì từ tuần sau tổng kết đến vào thứ Sáu.

## Phụ thuộc

8-7, 2-4, 3-4, C-02.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-06 | Gộp tổng kết tuần vào tin buổi sáng | Không | Gộp |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §6-5 (3-8), 別紙A.

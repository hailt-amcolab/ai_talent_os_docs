# 3-5 Quản lý chi phí AI

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-5, chức năng 3-5; §5-5 |
| Màn hình [AG] | M-10 (khối 今月のご利用, dòng "AI の利用料") |
| Tên trong mã nguồn | AI Cost Tracking |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Cách quy ra yên là đề xuất (S03-08) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ đơn giá, tỉ giá là tham số | ⚠ đội đề xuất | ✅ M-10 | ✅ OpenAI trả số token | ⚠ đội đề xuất | ✅ |

## Mục đích

Tổng hợp phí AI mà AIコーチ dùng, theo từng tài năng và từng tháng, hiện trên màn hình quản trị. Tách riêng khỏi phí tháng của ChatGPT (§6-5 chức năng 3-5).

## Luồng chính

1. Mọi lần gọi OpenAI đều đi qua một lớp gọi chung, ghi lại: tài năng, mục đích (trò chuyện, tin buổi sáng, bản nháp, kiểm tra từ cấm, phân loại, bộ nhớ…), mô hình, số token vào và ra lấy từ phản hồi của OpenAI, thời điểm.
2. Tính chi phí theo bảng đơn giá từng mô hình (tham số), quy ra yên theo tỉ giá cài đặt.
3. M-10 hiện tổng tháng này của tài năng đó ("AI の利用料 ¥…").
4. Lần gọi không thuộc tài năng nào (ví dụ đọc thư mục chung): ghi vào mục "chung".

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Phản hồi không có số token (lỗi giữa chừng) | Ghi lượt gọi với số token 0 và cờ "thiếu dữ liệu" | [Đề xuất nội bộ] |
| Đổi đơn giá hoặc tỉ giá | Chỉ áp dụng cho lượt gọi sau đó; không tính lại tháng cũ | [Đề xuất nội bộ] |
| Chi phí tăng bất thường | Cảnh báo đội vận hành (không phải thông báo nghiệp vụ) | [Đề xuất nội bộ], file 18 mục 8 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Tổng hợp theo tài năng, theo tháng | — | Chốt | §6-5 |
| Tách khỏi phí ChatGPT | Hệ thống không theo dõi phí ChatGPT; M-10 chỉ hiện phí AI của hệ thống | Chốt | §5-5, §6-5 |
| Đơn giá mô hình, tỉ giá | Đội nhập theo bảng giá OpenAI | Tham số | S03-08 |
| Mức trần chi phí | Không có | Đề xuất | S03-08 |

## Dữ liệu [Đề xuất nội bộ]

`ai_usage`: `id`, `talent_id` (có thể trống), `purpose`, `model`, `input_tokens`, `output_tokens`, `cost_usd`, `cost_jpy`, `created_at`. Chỉ thêm.

## Màn hình

M-10: dòng "AI の利用料 ¥…" trong khối 今月のご利用 ([AG] trang 8).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng A trò chuyện 10 lượt trong tháng, thì M-10 của A hiện tổng bằng tổng chi phí 10 lượt đó cộng các lần gọi khác của A.
2. Cho lần gọi của tài năng B, thì không cộng vào A.
3. Cho đầu tháng mới, thì M-10 hiện từ 0 cho tháng mới.

## Ngoài phạm vi của chức năng này

- Thu phí AI từ tài năng: không có; phí AI do アデッソ chịu.
- Màn tổng chi phí của cả công ty: [AG] không có.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-08 | Hiện ở M-10 theo yên, gồm mọi lần gọi AI của tài năng, không có mức trần | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-5, §6-5 (3-5). [AG] trang 8 (M-10).

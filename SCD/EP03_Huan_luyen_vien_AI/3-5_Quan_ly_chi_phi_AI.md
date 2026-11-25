<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### AI agent và dữ liệu

G/H ghi xác nhận24/11: AI Coach là agent đọc/ghi Supabase; nhận chỉ thị, khen, đề xuất và ghi tiến độ Challenge, nhập chỉ thị qua hội thoại M-17 trong phạm vi; dữ liệu trong DB có backup; Adesso trả token và chỉnh prompt; không bảo đảm phán đoán đúng. J101 là phân vai NỘI BỘ25/11: OS nhập dữ liệu dịch vụ ngoài; agent quyết định giờ rồi ghi lịch để OS thực thi.

**Còn mở/giới hạn:** YK3 §2-5/3-3/3-8/AC chưa đồng bộ. Không suy agent được SQL tùy ý hoặc bỏ kiểm quyền. Vị trí byte media và vai trò OneDrive chưa chốt lại toàn bộ. Căn cứ: `QA Q&A!G101:J101 (No.101)`; `EV-1311`; QA No.101;TR-2-1;TR-2-2;TR-2-3;TR-2-4;TR-3-1;TR-3-2;TR-3-5;TR-8-8.

<!-- /DELIVERY24112026 -->

# 3-5 Quản lý chi phí AI

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Trần phí và nhận định đã giải quyết thanh toán — FACT của nguồn:** Bảng hiện trạng mới ghi có trần video/tháng; phần so sánh ghi thanh toán đã giải quyết bằng thẻ. **Giới hạn:** QA No.3/17 và CR-12/16 nói không có trần video/AI tự dừng. Không dùng mô tả hồi tố để đảo chính sách. KS F25 chỉ ghi GMO là ứng viên; có phương thức thẻ không chứng minh cổng đã ký hoặc tích hợp. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang7`; EV `EV-1242;EV-1247`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Tổng hợp phí AI theo Talent/tháng và tách ChatGPT. QA No.17/CR-16 chưa đổi: chưa có trần tự dừng. Sheet chi phí mới chỉ đề xuất trần, cột trả lời trống.

Chưa xác nhận trần tiền hoặc phạm vi dừng khi chạm trần; không đưa trần hai lần viết lại đã bỏ vào tính phí.

Căn cứ: `M19:15;KS:FEE3` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0600`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

> **Chờ đối chiếu nguồn20/11:** KS sheet chi phí/quy mô C4:D4 mới đề xuất trần phí AI nhưng E4 chưa trả lời. QA No.17/CR-16 không đổi nội dung; không tự thay quyết định không có trần bằng đề xuất mới. [Phạm vi và gate](../../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md).

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
| Mức trần chi phí | Chưa có trần tự dừng theo QA No.17/CR-16; đề xuất trần mới chưa trả lời | Quyết định cũ và đề xuất mới tách riêng | KS sheet chi phí C4:E4 |

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

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.17, CR-16 (đã chốt): phí AI tổng hợp theo tài năng và theo tháng, hiện ở màn quản trị; **không có trần, không tự dừng**. Đóng S03-08.

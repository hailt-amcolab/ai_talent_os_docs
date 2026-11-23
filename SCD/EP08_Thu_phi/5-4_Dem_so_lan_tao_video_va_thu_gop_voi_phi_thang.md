# 5-4 Đếm số lần tạo video và thu gộp với phí tháng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Đồng ý phụ huynh và trần phí theo tuổi — PROPOSAL của nguồn:** Đề nghị quản lý liên hệ và ghi nhận đồng ý phụ huynh cho dưới 18 tuổi, phạm vi sử dụng media, trần phí và mục tiêu khác cho dưới 16 tuổi. **Giới hạn:** Khác KS確認事項 F38: Adesso lấy đồng ý ngoài app, hệ thống không lưu. Khách/chuyên trách cần quyết quyền, retention và chính sách tuổi; chưa xác minh toàn bộ nhận định pháp lý hoặc triển khai lưu. Nguồn `ISS22-P PDFtrang6; ISS22-P PDFtrang10; ADV22 PDFtrang3; ADV22 PDFtrang10`; EV `EV-1246;EV-1250;EV-1254;EV-1261`.

**Trần phí và nhận định đã giải quyết thanh toán — FACT của nguồn:** Bảng hiện trạng mới ghi có trần video/tháng; phần so sánh ghi thanh toán đã giải quyết bằng thẻ. **Giới hạn:** QA No.3/17 và CR-12/16 nói không có trần video/AI tự dừng. Không dùng mô tả hồi tố để đảo chính sách. KS F25 chỉ ghi GMO là ứng viên; có phương thức thẻ không chứng minh cổng đã ký hoặc tích hợp. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang7`; EV `EV-1242;EV-1247`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Trả trước và quá hạn:** Phí tháng theo hướng trả trước; nguồn ghi đang xem xét dừng sử dụng nếu1tháng chưa thanh toán. **Còn mở/giới hạn:** “検討します” chưa chốt tự khóa sau1tháng. Chu kỳ cụ thể, khả năng cổng và No.46/49/86 còn mở; không tự xây retry hay thu sau. Nguồn `KS 確認事項!K104;20261120!F24`; bằng chứng `EV-0978`.

- **Phí video office:** Nguồn quyết định20/11 ghi không tính tiền tạo video của tài khoản văn phòng. **Còn mở/giới hạn:** Không thu tiền tài khoản office không đồng nghĩa chi phí provider bằng0. Đối chiếu QA No.48 cũ về quyết toán nội bộ; chưa tự xóa thống kê lượt. Nguồn `KS 確認事項!K112`; bằng chứng `EV-0985`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

Căn cứ: `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-3, chức năng 5-4; §5-4 (hình 5-3); UC-06 前提 (tiền đề) |
| Màn hình [AG] | T-11, T-12, T-15; M-06, M-10 (今月のご利用: 動画生成回数) |
| Tên trong mã nguồn | Video Usage Billing |
| Mức sẵn sàng | 🔴 Đỏ – chưa có đơn giá; chưa rõ đơn giá cố định hay theo chi phí thật (B9); chưa có chỗ nhập đơn giá (S08-06) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ❌ đơn giá, B9 | ✅ | ⚠ S08-06 | ⚠ GMO (1-1) | ⚠ đội đề xuất | ⚠ 5-1, 1-1 |

## Mục đích

Hiện đơn giá mỗi lần tạo video trên màn tạo video. Tính một lần khi tài năng xác nhận yêu cầu; tạo lại cũng tính; dịch vụ tạo lỗi thì không tính. Cộng phí video của tháng vào phí tháng. Tài năng xem số lần và tổng tiền trong ứng dụng; quản lý xem theo từng tài năng; tài khoản công ty chỉ đếm, không thu (§6-3 chức năng 5-4).

## Luồng chính

1. 5-1 tạo một lần tạo, lưu `unit_price_jpy` tại thời điểm yêu cầu, `billable = true`.
2. Lỗi phía dịch vụ xác định không tính lượt. Timeout15phút là ngưỡng kỹ thuật đề xuất, không tự biến kết quả chưa rõ thành không tính phí; tiếp tục No.62 và đối soát đội.
3. Tổng tháng = số lần `billable` trong tháng × đơn giá đã lưu ở từng lần (B9: đơn giá cố định).
4. T-11, T-12: số lần tháng này; T-15: tổng dự kiến (phí tháng + phí video).
5. M-06, M-10: số lần và tiền tháng này của từng tài năng; tài khoản công ty hiện số lần, không có tiền phải thu.
6. Ngày thu/kỳ video và ghép phí chờ quyết định ở1-1; không mặc định thu tháng trước vào ngày1.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đổi đơn giá giữa tháng | Lần tạo trước đó giữ giá cũ | [Đề xuất nội bộ] |
| Quản lý tạo thay | Tính cho tài năng đó, ghi người bấm | B8 |
| Lần tạo bắc qua cuối tháng | Tính vào tháng của thời điểm yêu cầu | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Tính từ lần đầu, không có lượt miễn phí, không có trần tháng | — | Chốt | §5-4 |
| Tạo lại cũng tính; dịch vụ lỗi không tính | — | Chốt | §5-4, §6-3 |
| Đơn giá | アデッソ quyết | ❌ chưa có | UC-06 前提 |
| Cảnh báo "số tiền thu có thể khác" | Bỏ nếu đơn giá cố định | Đề xuất | B9 |
| Chỗ nhập đơn giá | M-17, một mức chung | Đề xuất | S08-06 |

## Dữ liệu

`video_jobs` (5-1): `billable`, `unit_price_jpy`, `requested_at`. `invoices` (1-1): `video_count`, `video_jpy`. Đơn giá: cài đặt chung (C-02).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho 3 lần tạo, 1 lần lỗi, đơn giá 500, thì T-15 hiện phí video 1.000 yên và M-10 hiện 2 lần.
2. Cho đổi đơn giá từ 500 sang 600 giữa tháng, thì lần trước giữ 500, lần sau 600.
3. Cho tài khoản công ty tạo 4 lần, thì M-06 hiện 4 lần và không có hóa đơn.

## Phụ thuộc

5-1, 1-1, C-02.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認49, 51.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| — | Đơn giá mỗi lần | Có | Hiện "¥—" |
| B9 | Đơn giá cố định, bỏ cảnh báo | Có | Cố định |
| S08-06 | Nhập đơn giá ở M-17 | Không | Như đề xuất |
| B8 | Quản lý tạo thay thì tính cho tài năng | Không | Như B8 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP08: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-4 (hình 5-3), §6-3 (5-4), UC-06 前提, 確認49, 51. [AG] trang 4 (T-11, T-12), trang 5 (T-15), trang 8 (M-10).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.1, No.3 (đã chốt): đếm lúc gửi yêu cầu, tạo lại cũng tính, lỗi phía dịch vụ không tính; không lượt miễn phí, không trần. CR-09: video quản lý tạo thay tính cho tài năng đó.
- Q&A No.62 (đang hỏi): tính theo đơn giá tại lúc gửi yêu cầu; lượt lỗi trừ ngay khi dịch vụ báo lỗi.


</details>

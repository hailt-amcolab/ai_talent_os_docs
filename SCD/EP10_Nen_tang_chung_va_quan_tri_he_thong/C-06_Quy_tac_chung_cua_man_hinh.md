# C-06 Quy tắc chung của màn hình

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Manager responsive và phạm vi tablet — PROPOSAL của nguồn:** Đề xuất PC đầy đủ, smartphone bốn tab Home/duyệt/Talent/menu, tablet có danh sách và chi tiết cạnh nhau, menu bên trái và home chia ưu tiên. **Giới hạn:** Trang 29 vẫn hỏi xác nhận bốn tab và phạm vi tablet. Giữ quyết định PC là chính, duyệt/chỉ thị AI dùng trên smartphone; chưa coi hình là UX đã duyệt hoặc chọn breakpoint. Nguồn `UI-M20 PDFtrang1; UI-M20 PDFtrang2; UI-M20 PDFtrang3; UI-M20 PDFtrang5; UI-M20 PDFtrang6; UI-M20 PDFtrang29`; EV `EV-1211;EV-1212;EV-1213;EV-1215;EV-1216;EV-1239`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Nội dung và hình minh họa:** Adesso cung cấp tài liệu hướng dẫn đăng ký/biểu thị giao dịch và câu chữ email tự động; đội chuẩn bị bảng điền theo tình huống. Nếu có đổi nhân vật thì Adesso cung cấp tranh. **Còn mở/giới hạn:** Câu điều kiện về nhân vật không tự xác nhận cho đổi tên hoặc làm chức năng mới; KS No.34 còn thiếu một phần. Nguồn `KS 20261120!F6;20261120!F35;20261120!F39`; bằng chứng `EV-0982`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

T19 có 19 màn, M19 có 21 màn; đăng nhập xong mở Mypage; thanh điều hướng 5 mục Home/AI/tư liệu/lịch/Mypage; chuông ở Home/Mypage. Số/chữ/tên trong hình là minh họa.

Mục lục các PDF và KS có số trang cũ; trích trang PDF thực tế, không dùng số màn AG/18 thay cho 19.

Căn cứ: `T19:1,32,33;M19:1,4` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0553;EV-0584;EV-0585;EV-0586;EV-0589`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-06 (mã nội bộ) |
| Mục [YK2] | §6-14; §9-1 |
| Màn hình [AG] | Toàn bộ |
| Mức sẵn sàng | 🟡 Vàng – chờ khách gửi logo, mã màu; chờ chốt bộ mã màn hình (A10) |

## Quy tắc [Chốt, §6-14]

1. Ưu tiên dễ dùng hơn đẹp. Căn cứ là định nghĩa màn hình và màn hình thật khách đã xem.
2. Tham khảo thiết kế của アデッソ. Những chỗ thiết kế còn nội dung cũ (LINE, lượt video miễn phí, trần phí tháng, không có trả lại khi duyệt, quyền dừng toàn bộ riêng) thì làm theo [YK2].
3. Ứng dụng tài năng giống Instagram; từ マイページ (trang của tôi) đi tới các màn khác. Nhân vật AIコーチ là "モモ" của アデッソ.
4. Dùng tên, logo, màu của ứng dụng アデッソ hiện có; khách gửi ảnh logo và mã màu.
5. Lỗi, không có dữ liệu, đang tải: luôn hiện rõ đang có chuyện gì.
6. Màn hình quản trị dùng trên máy tính là chính, trên điện thoại phải dễ xem (§9-1, [AG] trang 11).

## Quy ước của đội [Đề xuất nội bộ]

- **Mã màn hình:** dùng bộ mã [AG] (T-01〜T-15, M-01〜M-19) trong mã nguồn và tài liệu (A10). Bảng đối chiếu ở [file 10 mục 8.1](../../Phan_tich/10_Giao_dien.md).
- **Ngôn ngữ giao diện:** tiếng Nhật.
- **Màu, cỡ chữ:** đặt thành biến dùng chung (design token) để đổi một chỗ khi có mã màu của khách.
- **Cơ bản về khả năng tiếp cận:** nút đủ lớn để chạm, chữ đủ tương phản, ảnh có mô tả.

## Ngoài phạm vi (lần này)

- Cho tài năng chọn nhân vật khác ngoài モモ: §6-14 chỉ ghi "検討します" (sẽ xem xét), chưa phải yêu cầu (S10-03).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Mọi màn có trạng thái đang tải, lỗi, không có dữ liệu.
2. Đổi một biến màu chính thì toàn bộ ứng dụng đổi theo.
3. Màn hình quản trị dùng được ở chiều rộng 375px không phải kéo ngang.

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-14, §9-1. [AG] trang 1 (danh sách màn), trang 11. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A10.


</details>

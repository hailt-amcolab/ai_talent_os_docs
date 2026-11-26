<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Kiểm và sửa từ cấm

Kiểm từ cấm trước khi đặt lịch; phát hiện thì AI viết lại rồi đặt lịch. Không dùng nhánh Manager sửa, không thông báo Manager vì phát hiện này và không bắt Talent xác nhận lại sau AI sửa. Danh sách từ cấm mới chỉ áp dụng từ lần kiểm tiếp theo; bài đã kiểm và đặt lịch giữ nguyên, Manager muốn dừng thì huỷ lịch. Không tự quét lại toàn bộ lịch khi sửa danh sách.

**Phần còn mở/giới hạn:** Quy tắc26/11 thay đề nghị22/11 yêu cầu xác nhận lại và nhánh Manager sửa tại QA90/GJ19 trên đúng chủ đề. Số vòng tự sửa nếu vẫn không sạch/lỗi AI là thiết kế lỗi còn cần đội xác định; không tự đặt bảo đảm AI sửa luôn thành công.

Căn cứ: QA `Q&A!A57:J57 (No.57); Q&A!A71:J71 (No.71); Q&A!A96:J96 (No.96)`; `EV-1337` / `DEC-0021`.

### Đơn giá, ghi lượt và điều chỉnh phí video

Manager đặt một đơn giá video chung tại cài đặt toàn hệ thống M-18 ❺; Adesso quyết giá cụ thể sau kiểm Kling. Lượt tính theo giá tại thời điểm 依頼, đổi giá không tính lại lượt cũ. Lỗi dịch vụ trừ lượt ngay khi báo lỗi; nếu đã tổng hợp thì trừ vào kỳ sau. Yêu cầu sau ngày chốt kỳ vào kỳ sau, theo ngày 依頼. Tổng hợp phí video tháng vào cuối hoặc đầu tháng để chuyển Square.

**Phần còn mở/giới hạn:** No.2 vẫn Open về số tiền; No.4/49 còn chờ khả năng Square và ngày chốt cụ thể. Không đồng nhất đơn giá thu Talent với chi phí provider.

Căn cứ: QA `Q&A!A3:J3 (No.2); Q&A!A62:J62 (No.62)`; `EV-1342` / `DEC-0026`.

### Khung lời nhắn hằng ngày

Giờ sáng/trưa/tối chỉnh ở M-18 ❶, mặc định 8/12/20. Sáng có kết quả hôm trước, chuỗi ngày, gợi ý chủ đề và thử thách. Trưa AI quyết nội dung theo chỉ thị 毎日の声かけ, không mặc định trưa là nhắc gửi ảnh. Tối nhắc nhiều ngày không đăng và báo đạt mục tiêu. Nhắc ảnh/video theo M-18 ❷, trước giờ đăng2giờ. Bài đăng auto không có lời nhắn theo7-7.

**Phần còn mở/giới hạn:** Không diễn giải ngoại lệ lời nhắn của bài auto thành dừng mọi hội thoại hay mọi báo cáo của Talent dùng auto.

Căn cứ: QA `Q&A!A73:J73 (No.73)`; `EV-1348` / `DEC-0032`.

### Thay danh sách từ cấm sau đặt lịch

Phương án A: danh sách sửa đổi chỉ áp dụng cho lần kiểm diễn ra sau thay đổi. Bài đã kiểm và đặt lịch không bị dừng hay tự quét lại; Manager cần dừng thì huỷ lịch.

**Phần còn mở/giới hạn:** Không khôi phục nhánh Manager sửa từ cấm của No.90; quy tắc hiện hành là No.71.

Căn cứ: QA `Q&A!A96:J96 (No.96)`; `EV-1352` / `DEC-0036`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# C-02 Cài đặt do quản lý tự chỉnh

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Bỏ dừng đăng toàn hệ thống:** Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. **Còn mở/giới hạn:** Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. Nguồn `KS 確認事項!K85;20261120!F33`; bằng chứng `EV-0981`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

M-17 cấu hình giờ chung, nhắc tư liệu 2 giờ và ngày 3/7 ban đầu, ngày tổng kết; M-18 danh sách từ cấm. Mục tiêu/quyền duyệt/dừng theoTalent tại M-10.

Đơn giá video không tự đặt vào M-17 vì bản mới không có mục giá, chờ No.62.

Căn cứ: `M19:15,22,23;BF19:18` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0600;EV-0607;EV-0608;EV-0630`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-02 (mã nội bộ) |
| Mục [YK2] | §5-2, §5-6; §6-6 chức năng 4-4 |
| Màn hình [AG] | M-17 (全体の設定), M-10 (cài đặt từng tài năng) |
| Mức sẵn sàng | 🟢 Xanh – giao agent được |

## Mục đích

Những giá trị quản lý tự đổi trên màn hình quản trị mà không cần sửa mã (§5-6), cùng các tham số kỹ thuật chỉ đội vận hành đổi.

## 1. Quản lý đổi trên màn hình [Chốt, §5-6]

| Cài đặt | Mặc định | Màn | Dùng ở |
|---|---|---|---|
| Giờ AIコーチ nhắn theo khung | Sáng 8:00; trưa, tối chưa có giờ ([KS] 確認18; Q&A No.73 đề xuất 12 giờ và 20 giờ) | M-17 | 3-4 |
| Nhắc gửi tư liệu, trước giờ đăng | 2 giờ | M-17 | 6-5 |
| Số ngày không đăng thì AIコーチ hỏi han | 3 | M-17 | 3-9 |
| Số ngày không đăng thì báo quản lý | 7 | M-17 | 3-9 |
| Ngày gửi tổng kết tuần | Thứ Hai | M-17 | 3-8 |
| Danh sách từ cấm | Mẫu của đội | M-17 | 4-4 |
| Dừng toàn bộ đăng tự động | Đang chạy | M-16 | 7-5 |
| Có duyệt bài (từng tài năng) | Tắt | M-10 | 7-7 |
| Dừng đăng tự động (từng tài năng) | Đang chạy | M-10 | 7-5 |
| Mục tiêu người theo dõi (từng tài năng) | 10.000 mỗi mạng | M-10 | 2-4 |
| Đơn giá tạo video | Chưa có | M-17 (đề xuất S08-06) | 5-4 |
| Phí tháng (nếu mỗi tài năng một mức) | Chưa có | M-10 (đề xuất S08-01) | 1-1 |

## 2. Tham số kỹ thuật (không có trên màn hình) [Đề xuất nội bộ]

Ví dụ: giờ bắt đầu lô buổi sáng (5:00), giờ lấy số liệu (4:00), các giới hạn chống khóa tài khoản (8-4), giới hạn tệp (6-3), thời gian giữ thông báo và bản tạm, mô hình OpenAI. Lưu trong bảng cấu hình, đổi bởi đội vận hành, có nhật ký.

## Luồng chính

1. Quản lý sửa ở M-17 hoặc M-10, bấm 保存する (lưu).
2. Kiểm tra giá trị (giờ hợp lệ, số nguyên dương, mốc 2 lớn hơn mốc 1).
3. Lưu, ghi nhật ký thao tác (C-03): ai, giá trị cũ, giá trị mới.
4. Áp dụng từ lần chạy tiếp theo của việc liên quan; không gửi bù trong ngày (3-9, 6-5).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho đổi giờ nhắn buổi sáng thành 9:00, thì hôm sau tin buổi sáng đến lúc 9:00.
2. Cho nhập mốc báo quản lý nhỏ hơn mốc hỏi han, thì không lưu được.
3. Mỗi lần lưu có một dòng nhật ký với giá trị cũ và mới.

## Dữ liệu [Đề xuất nội bộ]

`settings`: `key`, `value`, `scope` (`ui`, `ops`), `updated_by`, `updated_at`. Cài đặt từng tài năng nằm ở `talents` và `talent_goals`.

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §5-6, §6-6 (4-4), §6-10 (7-5). [AG] trang 8 (M-10), trang 9 (M-16), trang 10 (M-17).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.41, CR-07 (đã chốt): màn cài đặt chung có giờ nhắn, giờ nhắc, số ngày không đăng, danh sách từ cấm. Q&A No.2, No.62: thêm **đơn giá video**. Q&A No.25: giờ nhắn chung theo khung sáng, trưa, tối; đổi theo từng tài năng xem xét sau khi vận hành ([KS] 確認18).


</details>

</details>

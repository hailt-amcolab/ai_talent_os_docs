<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Tài khoản office và lưu dữ liệu

Manager nhập email khi tạo office, đăng nhập app office để nối SNS; hiện trong danh sách Talent với nhãn 事務所. Manager sửa email ở quản trị, mật khẩu đặt lại qua Quên mật khẩu. Kết thúc office huỷ lịch, khoá đăng nhập, gỡ SNS. Giữ dữ liệu 6 tháng rồi tự xoá như Talent theo phương án A của No.94; FCP sẽ bổ sung yêu cầu12-4.

**Phần còn mở/giới hạn:** Office là loại riêng miễn phí tháng; không áp 支払い待ち chỉ vì các trạng thái tài khoản dùng chung. Phần dữ liệu thu tiền giữ riêng vẫn No.98.

Căn cứ: QA `Q&A!A66:J66 (No.66); Q&A!A67:J67 (No.67); Q&A!A94:J94 (No.94)`; `EV-1344` / `DEC-0028`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 9-1 Đăng bài bằng tài khoản công ty

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Manager sửa và xác nhận TikTok — PROPOSAL của nguồn:** Đề nghị chỉ Talent xác nhận bài TikTok; Manager vẫn hủy lịch được; nội dung Manager sửa hoặc xác nhận thay cần Talent đồng ý lại. **Giới hạn:** Khác GJ19§12/QA No.90 về Manager sửa rồi đi tiếp; phải xét tài khoản office. Không tự xóa các quyền Manager đã nêu trong nguồn khác. Nguồn `ISS22-P PDFtrang3; ADV22 PDFtrang6`; EV `EV-1243;EV-1257`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Phí video office:** Nguồn quyết định20/11 ghi không tính tiền tạo video của tài khoản văn phòng. **Còn mở/giới hạn:** Không thu tiền tài khoản office không đồng nghĩa chi phí provider bằng0. Đối chiếu QA No.48 cũ về quyết toán nội bộ; chưa tự xóa thống kê lượt. Nguồn `KS 確認事項!K112`; bằng chứng `EV-0985`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Office nhập tên/email ở M-12; tạo folder ngay; Manager login app Talent bằng office, tự nối SNS; không thanh toán/không phí tháng/không duyệt; phí video nội bộ. Unit là office, hiện cùng Talent list.

Vòng đời kết thúc/xóa office cần No.66; không suy ngoại lệ streak/nhắc ngày không đăng từ việc miễn phí.

Căn cứ: `T19:5,9,25,30;M19:10,17;BF19:20` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0557;EV-0561;EV-0577;EV-0582;EV-0595;EV-0602;EV-0632`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-10, chức năng 9-1; UC-12, UC-12 前提; §3-1 |
| Màn hình [AG] | M-12 (tạo, thuộc 1-2), M-06 (nhãn 事務所); dùng toàn bộ màn của ứng dụng tài năng |
| Tên trong mã nguồn | Office Account Posting |
| Mức sẵn sàng | 🔴 Đỏ – [YK2] tự mâu thuẫn về nơi thao tác (A1) và về việc duyệt (A2). Theo đề xuất của đội thì hầu như chỉ dùng lại luồng có sẵn |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ A1 | ✅ | ✅ | ✅ | ⚠ A1 | ✅ | ⚠ đội đề xuất | ⚠ 1-2, EP03–EP06 |

## Mục đích

Đăng bài lên tài khoản mạng xã hội của công ty アデッソ bằng cùng các chức năng như tài năng (§6-10 chức năng 9-1, UC-12).

## Luồng chính

1. Manager tạo office ở M-12, nhập tên/email; hệ thống tạo folder ngay (SD-M19 trang17).
2. Manager đăng nhập app Talent tại T-03 bằng ID office; mở T-08, bỏ kiểm đăng ký thanh toán.
3. Manager nối SNS tại T-07 và dùng các bước soạn/tư liệu/video/chấp nhận/đăng trong app; bài office không cần duyệt.
4. Office hiện cùng danh sách Talent; không phí tháng; video có đếm để công ty quyết toán nội bộ, không thu qua cổng.
5. Không hỏi lại chọn app hay quản trị. Vòng đời kết thúc/xóa và ngoại lệ nhắc không đăng của office chưa được tự coi giống Talent thường; tiếp tục No.66.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Quản lý quên đăng xuất tài khoản công ty trên máy cá nhân | Phiên giữ 30 ngày như tài năng (1-4); đổi mật khẩu thì mọi phiên bị đăng xuất | [Đề xuất nội bộ] |
| Nhiều quản lý dùng chung một tài khoản công ty | Cho phép; nhật ký ghi theo tài khoản công ty, không biết quản lý nào | S06-07 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Không thu phí tháng | Chốt | §3-1, UC-12 前提 |
| Phí video quyết toán nội bộ, chỉ hiện số lần | Chốt | UC-12 前提 |
| Không duyệt | Giả định (確認52), đề xuất A2 | — |
| Thao tác trong ứng dụng tài năng | Đề xuất A1 | UC-12 前提 |

## Dữ liệu

`talents.account_type = office` (1-2). Không cần bảng riêng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài khoản công ty, thì hướng dẫn lần đầu không có bước thanh toán.
2. Cho tài khoản công ty tạo video, thì số lần hiện ở M-06, M-10 và không vào hóa đơn GMO.
3. Cho tài khoản công ty chấp nhận bài, thì không có ô xin duyệt và bài được hẹn ngay.
4. Cho tài khoản công ty không đăng 7 ngày, thì không có thông báo cho quản lý.

## Ngoài phạm vi của chức năng này

- Màn hình đăng bài riêng cho tài khoản công ty trong màn hình quản trị (A1).

## Phụ thuộc

1-2, 2-2, 8-2 và toàn bộ luồng EP03–EP06.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認27, 52.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| A1 | Thao tác ở ứng dụng tài năng hay màn hình quản trị | Có | Ứng dụng tài năng |
| A2 | Có duyệt không | Không | Không duyệt |
| B10 | Nhắc và báo không đăng | Không | Không |
| S06-07 | Nhiều quản lý dùng chung tài khoản công ty | Không | Cho phép, báo khách hạn chế của nhật ký |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-1, §6-10 (9-1), §12-5, UC-12, UC-12 前提, 確認27, 52. [AG] trang 7 (M-06), trang 8 (M-12). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A1, A2, B10.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.20 (đã chốt): quản lý đăng nhập lại từng tài khoản công ty; thông tin nhập qua ChatGPT; không duyệt.
- Q&A No.66 (đang hỏi): quản lý nhập email khi tạo; hiện trong danh sách tài năng với nhãn 事務所; dùng chung 3 trạng thái.


</details>

</details>

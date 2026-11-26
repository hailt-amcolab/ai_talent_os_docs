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

# 1-2 Loại tài khoản

## Đối chiếu nguồn hiện hành — 20/11/2026

Office nhập tên/email ở M-12; tạo folder ngay; Manager login app Talent bằng office, tự nối SNS; không thanh toán/không phí tháng/không duyệt; phí video nội bộ. Unit là office, hiện cùng Talent list.

Vòng đời kết thúc/xóa office cần No.66; không suy ngoại lệ streak/nhắc ngày không đăng từ việc miễn phí.

Căn cứ: `T19:5,9,25,30;M19:10,17;BF19:20` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0557;EV-0561;EV-0577;EV-0582;EV-0595;EV-0602;EV-0632`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-3, chức năng 1-2 (tên trong [YK2]: 有償と無償の区分); §3-1; §5-4; UC-12 前提 |
| Màn hình [AG] | M-12 (tạo tài khoản công ty), M-06 (nhãn 事務所) |
| Tên trong mã nguồn | Account Type (Paid / Office) |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ✅ | ✅ | ✅ | ⚠ đội đề xuất | ⚠ 1-4, 2-2, 8-2 |

## Mục đích

Mọi người xin dùng qua ứng dụng đều là tài năng trả phí. Quản lý tạo tài khoản công ty trên màn hình quản trị: không có bước thanh toán, không thu phí tháng, dùng đủ chức năng như tài năng. Tài năng không tự chọn hay đổi loại (§6-3 chức năng 1-2, §5-4). Không có gói miễn phí.

## Luồng chính

1. Người được duyệt qua 1-4: `account_type = talent`.
2. Quản lý bấm ＋事務所アカウント ở M-06, mở M-12, nhập tên và email đăng nhập, bấm 作る (tạo).
3. Hệ thống tạo tài khoản đăng nhập (gửi thư có mật khẩu tạm như 1-4), `account_type = office`, trạng thái 利用中, tạo thư mục (2-2), đăng ký Upload-Post (8-2).
4. M-06 hiện dòng có nhãn 事務所.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Email đã dùng | Không tạo; báo lỗi | §6-4 chức năng 2-2 |
| Muốn đổi tài khoản công ty thành trả phí | Không đổi; đăng ký mới như tài năng | §5-4 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Không có phân loại trả phí và miễn phí | Chốt | §5-4, UC-11 前提 |
| Tài khoản công ty không bị thu phí tháng, phí video quyết toán nội bộ | Chốt | §3-1, UC-12 前提 |
| Tài năng không đổi loại | Chốt | §6-3 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho quản lý tạo tài khoản công ty, thì có thư mục, hồ sơ Upload-Post, nhãn 事務所 ở M-06, và hướng dẫn lần đầu không có bước thanh toán.
2. Cho tài khoản tài năng, khi gọi API đổi loại, thì bị từ chối.

## Phụ thuộc

1-4, 2-2, 8-2, 9-1.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| A1 | Tài khoản công ty thao tác ở đâu | Không (thuộc 9-1) | Ứng dụng tài năng |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP08: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-1, §5-4, §6-3 (1-2), UC-11 前提, UC-12 前提. [AG] trang 7 (M-06), trang 8 (M-12).

</details>

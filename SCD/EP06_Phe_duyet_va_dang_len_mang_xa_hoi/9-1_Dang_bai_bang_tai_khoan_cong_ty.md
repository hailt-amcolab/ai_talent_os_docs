# 9-1 Đăng bài bằng tài khoản công ty

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

## Luồng chính (theo đề xuất A1, đúng UC-12 前提 và [AG] M-12)

1. Quản lý tạo tài khoản công ty ở M-12 (1-2): tên, email đăng nhập. Hệ thống tạo thư mục (2-2) và hồ sơ Upload-Post (8-2), trạng thái 利用中.
2. Quản lý đăng nhập **ứng dụng tài năng** bằng tài khoản công ty. Có nhiều tài khoản công ty thì đăng nhập lại cho từng tài khoản (UC-12 前提).
3. Kết nối mạng xã hội của công ty (T-05), nhập thông tin và định hướng của công ty qua ChatGPT (2-3).
4. Dùng toàn bộ luồng: chủ đề, bản nháp, gửi tư liệu, tạo video, chấp nhận, đăng.
5. Khác với tài năng:
   - không có bước thanh toán (6-2), không thu phí tháng (1-2);
   - số lần tạo video chỉ đếm và hiện ở màn hình quản trị, アデッソ tự quyết toán nội bộ (5-4);
   - không có ô xin duyệt (A2);
   - không nhắc khi không đăng, không báo quản lý khi 7 ngày không đăng (B10), không nhắc gửi tư liệu (S05-04).

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

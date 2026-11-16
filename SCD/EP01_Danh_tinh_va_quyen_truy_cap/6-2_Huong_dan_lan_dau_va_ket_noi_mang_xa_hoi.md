# 6-2 Hướng dẫn lần đầu và kết nối mạng xã hội

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-1, chức năng 6-2; UC-03, UC-03 前提 |
| Màn hình [AG] | T-03 (thông báo trước khi vào hướng dẫn), T-04, T-05 |
| Tên trong mã nguồn | First-time Onboarding |
| Mức sẵn sàng | 🟡 Vàng – làm được khung hướng dẫn và bước 1, 2. Bước 3 cần 1-1, bước 4 cần 8-2 (đều đỏ), nên dùng giao diện giả |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ⚠ 確認12 | ⚠ phụ thuộc GMO, Upload-Post | ⚠ đội đề xuất | ❌ 1-1, 8-2 chưa có |

## Mục đích

Sau lần đăng nhập đầu, dẫn tài năng qua 4 bước cần thiết để bắt đầu dùng. Bỏ dở thì lần sau làm tiếp đúng chỗ dở (§6-1 chức năng 6-2).

## Tác nhân và quyền

- Tài năng (cả tài khoản công ty, trừ bước 3).

## Điều kiện trước, kết quả sau

- **Trước:** đã đặt mật khẩu và đã xác nhận "quản lý đọc được hội thoại" ở T-03 (1-4, 確認13).
- **Sau:** ứng dụng đã ở màn hình chính, đã quyết cho hay không cho thông báo, đã đăng ký thanh toán, đã kết nối ít nhất các mạng tài năng muốn dùng.

## Luồng chính (T-04)

1. **Thêm vào màn hình chính:** hướng dẫn theo loại máy (iPhone: nút chia sẻ → "thêm vào màn hình chính"; Android: nút cài đặt của trình duyệt). Bước này xong khi ứng dụng được mở ở chế độ cài đặt (standalone).
2. **Cho phép thông báo:** bấm nút để trình duyệt hỏi quyền. Cho phép thì lưu đăng ký Web Push (6-1). Từ chối vẫn được tính là xong bước và dùng tiếp được (確認12). Cách bật lại xem được trong ứng dụng.
3. **Đăng ký thanh toán** (bỏ qua với tài khoản công ty): mở trang của công ty thanh toán (1-1). Xong thì quay về T-04. Chưa xong bước này thì chưa dùng được AIコーチ ([AG] T-04).
4. **Kết nối mạng xã hội:** chuyển sang T-05 (8-2). Không bắt buộc đủ 3 mạng (確認11).
5. Nút マイページへ (vào trang của tôi) đưa sang T-06.

Mỗi bước hiện dấu xong. Đóng ứng dụng giữa chừng thì lần mở sau quay về T-04, đúng bước chưa xong.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Máy không hỗ trợ thông báo đẩy (iPhone dưới iOS 16.4, hoặc chưa thêm vào màn hình chính) | Hiện câu giải thích, cho qua bước 2 | §9-1 |
| Hủy giữa chừng ở trang thanh toán, hoặc thanh toán lỗi | Bước 3 vẫn chưa xong, hiện câu "chưa đăng ký xong" | [Đề xuất nội bộ] |
| Đường dẫn kết nối mạng xã hội hết hạn (48 giờ) | Tạo lại trong ứng dụng (chức năng 8-2) | §6-10 chức năng 8-2 |
| Tài năng vào T-06 khi chưa xong bước 3 | Cho vào, nhưng chặn các chức năng của AIコーチ và nhắc quay lại T-04 | [AG] T-04; [Đề xuất nội bộ] |
| Tài khoản công ty | Không hiện bước 3 | §6-1 chức năng 6-2, [AG] T-04 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Thứ tự 4 bước: màn hình chính → thông báo → thanh toán → mạng xã hội | Chốt | §6-1 chức năng 6-2 |
| Bỏ dở thì làm tiếp từ bước dở | Chốt | §6-1 chức năng 6-2 |
| Không cho thông báo vẫn dùng được | Giả định | 確認12 |
| Không cần nối đủ 3 mạng | Giả định | 確認11 |

## Dữ liệu [Đề xuất nội bộ]

`talent_onboarding`: `talent_id`, `home_screen_added_at`, `push_decision` (`granted`, `denied`, `unsupported`), `push_decided_at`, `payment_registered_at`. Trạng thái kết nối mạng xã hội không lưu ở đây mà đọc từ dữ liệu của 8-2. Riêng `payment_registered_at` do 1-1 ghi, đây cũng là lúc chức năng 2-2 tạo thư mục (UC-01 前提).

## Màn hình

- T-03: ô xác nhận "quản lý đọc được hội thoại" (thuộc 1-4, nằm ngay trước luồng này).
- T-04: danh sách 4 bước có dấu xong, nút mở trang thanh toán, nút "kết nối mạng xã hội", nút vào trang của tôi, câu "đóng giữa chừng thì lần sau làm tiếp".
- T-05: kết nối mạng xã hội (thuộc 8-2).

## Tích hợp

- Web Push (6-1): lưu đăng ký của trình duyệt.
- GMO (1-1) và Upload-Post (8-2): chỉ gọi qua chức năng của hai module đó. Trong lúc chưa có, dùng giao diện giả trả về "đã xong" để thử luồng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng vừa xong T-03, thì màn tiếp theo là T-04.
2. Cho tài năng đã xong bước 1 và 2 rồi đóng ứng dụng, khi mở lại, thì về T-04 và bước 1, 2 có dấu xong.
3. Cho tài năng từ chối thông báo, thì bước 2 được tính là xong và đi tiếp được.
4. Cho tài khoản công ty, thì T-04 không có bước thanh toán.
5. Cho tài năng chưa đăng ký thanh toán, khi mở trò chuyện với AIコーチ, thì bị chặn và được nhắc quay lại T-04.
6. Cho tài năng chỉ nối Instagram, thì vẫn hoàn tất hướng dẫn.

## Ngoài phạm vi của chức năng này

- Logic thanh toán (1-1), logic kết nối mạng xã hội (8-2), gửi thông báo đẩy (6-1).

## Phụ thuộc

- 1-4 (đăng nhập lần đầu). 6-8 (PWA). 6-1 (đăng ký Web Push).
- 1-1 và 8-2: đều 🔴, dùng giao diện giả tới khi có.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| 確認11 | Không nối đủ 3 mạng vẫn dùng được | Không | Đúng như [YK2] |
| 確認12 | Không cho thông báo vẫn dùng được | Không | Đúng như [YK2] |
| 確認13 | Báo quản lý đọc được hội thoại | Không | Đặt ở T-03 |
| File 04 | Bỏ qua bước kết nối thì có nhắc lại không | Không | Chưa nhắc. Trạng thái kết nối hiện ở T-06 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-1 (6-2), §9-1, UC-03, UC-03 前提, UC-01 前提, 確認11, 12, 13.
- [AG] trang 2 (T-03, T-04), trang 3 (T-05).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 1.

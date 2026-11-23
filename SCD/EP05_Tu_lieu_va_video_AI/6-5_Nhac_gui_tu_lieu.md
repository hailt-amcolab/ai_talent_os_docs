# 6-5 Nhắc gửi tư liệu

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Ngày thiếu tư liệu:** Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. **Còn mở/giới hạn:** Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. Nguồn `KS 確認事項!K62;20261120!F9`; bằng chứng `EV-0967`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Nhắc tư liệu tối đa 1 lần/ngày, ban đầu 2 giờ trước giờ đăng của từng bài; Manager chỉnh khoảng cách.

Không tự coi 2 giờ là một giờ cố định trong ngày; ngày không có tư liệu còn KS No.8.

Căn cứ: `T19:16,27;M19:22` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0568;EV-0579;EV-0607`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-7, chức năng 6-5; §5-2; 別紙A (写真・動画の催促) |
| Màn hình [AG] | T-14 (thông báo), M-17 (giờ nhắc) |
| Tên trong mã nguồn | Media Reminder |
| Mức sẵn sàng | 🟡 Vàng – giao agent được khi đã có giờ đăng dự kiến (B1) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ tham số | ✅ | ✅ | ✅ Web Push | ⚠ đội đề xuất | ❌ B1 (giờ đăng) |

## Mục đích

2 giờ trước giờ đăng (mặc định), tài năng chưa gửi ảnh hoặc video thì nhận lời nhắc. Mỗi ngày một lần; quản lý đổi được mốc giờ (§6-7 chức năng 6-5).

## Luồng chính

1. Mỗi ngày, lấy giờ đăng dự kiến của tài năng (B1) trừ mốc nhắc (mặc định 2 giờ) để có giờ nhắc.
2. Đến giờ nhắc: tài năng ở 利用中 mà hôm nay chưa có bản nháp nào gắn ảnh hoặc video thì gửi thông báo 写真・動画の催促 (ứng dụng và thông báo đẩy).
3. Nếu khách đồng ý S04-03: cũng nhắc khi đã có tư liệu nhưng chưa chấp nhận, cùng loại thông báo, câu chữ khác.
4. Ghi đã nhắc để không nhắc lần hai trong ngày.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đã có bài được hẹn giờ hôm nay | Không nhắc | [Đề xuất nội bộ] |
| Tài khoản công ty | Không nhắc | S05-04 |
| Tài năng đang bị dừng đăng tự động, hoặc dừng toàn bộ | Không nhắc | S05-04 |
| Giờ nhắc đã qua khi quản lý đổi mốc | Không gửi bù trong ngày | [Đề xuất nội bộ] |
| Gửi thông báo đẩy lỗi | Vẫn có trong danh sách thông báo của ứng dụng (6-1) | §11 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Mốc nhắc | 2 giờ trước giờ đăng | Tham số (M-17) | §5-2, §6-7 |
| Số lần | 1 lần mỗi ngày | Chốt | §6-7 |

## Dữ liệu

`reminder_log`: `talent_id`, `date`, `kind` (`media`, `adopt`), `sent_at`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho giờ đăng 19:00, chưa có tư liệu, thì 17:00 tài năng nhận đúng một lời nhắc.
2. Cho đã gửi ảnh lúc 16:00, thì 17:00 không nhắc (trừ khi S04-03 được đồng ý và chưa chấp nhận).
3. Cho quản lý đổi mốc thành 3 giờ, thì hôm sau nhắc lúc 16:00.
4. Cho tài khoản công ty, thì không có lời nhắc.

## Phụ thuộc

B1 / 8-1 (giờ đăng dự kiến), 6-1 (thông báo), C-02 (cài đặt).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B1 | Giờ đăng chốt lúc nào | Có | Chốt mỗi sáng |
| S04-03 | Nhắc khi chưa chấp nhận | Không | Chưa làm tới khi khách đồng ý |
| S05-04 | Không nhắc tài khoản công ty và tài năng đang dừng | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §6-7 (6-5), §11, 別紙A. [AG] trang 10 (M-17).


</details>

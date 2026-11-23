# 6-4 Lưu tư liệu

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Ngày thiếu tư liệu:** Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. **Còn mở/giới hạn:** Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. Nguồn `KS 確認事項!K62;20261120!F9`; bằng chứng `EV-0967`.

- **Tư liệu Manager gửi:** Talent xem bản nháp AI tạo từ tư liệu Manager gửi trong màn AI coach, có thể dùng để đăng Instagram/TikTok; không xem danh sách tư liệu Manager lưu. **Còn mở/giới hạn:** Không suy thành thư viện media chung được Talent truy cập hoặc phủ nhận video YouTube ở nhánh khác. Nguồn `KS 20261120!F20`; bằng chứng `EV-0975`.

- **Nguồn media cho tự động:** Tự động không sinh ảnh/video AI; dùng video trả phí đã tạo hoặc video tự làm đã lưu. Chọn ảnh/video hợp chủ đề thay vì thứ tự lưu. **Còn mở/giới hạn:** Không mặc định một bài/ngày hoặc dùng FIFO; tần suất tại KS No.40 còn trống. Nguồn `KS 確認事項!K73;20261120!F18:F19`; bằng chứng `EV-0974`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Dùng lại ảnh/video đã gửi; OneDrive vẫn là kho hồ sơ/chỉ thị. GJ19§14 cho phép cân nhắc kho ảnh/video khác nếu không thêm chi phí.

Không tự chuyển kho lưu. Video tự làm lần lượt 1 bài/ngày vẫn KS 20261120 No.18/QA No.37; tư liệu Manager dùng trong kỳ và quyền xem còn No.19.

Căn cứ: `T19:19;BF19:11,18;GJ19:14` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0571;EV-0623;EV-0630;EV-0647`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-7, chức năng 6-4; §7-2; UC-06 |
| Màn hình [AG] | T-10 (thẻ 送ったもの), T-07 (nút 自分で作った動画を保存する), T-06 (ô 素材) |
| Tên trong mã nguồn | Media Storage & Reuse |
| Mức sẵn sàng | 🟡 Vàng – phần lưu và dùng lại làm được ngay. Phần "video tự làm thành bản nháp mỗi ngày" chờ 確認32 và B4, tách riêng |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ B4 | ⚠ đội đề xuất | ⚠ thời gian giữ bản tạm | ⚠ đội đề xuất | ✅ | ⚠ S02-02 | ⚠ đội đề xuất | ⚠ 6-3, 2-2 |

## Mục đích

Lưu ảnh, video đã gửi vào thư mục OneDrive của tài năng. Tài năng xem danh sách trong ứng dụng và dùng lại về sau. Video tự làm được lưu thì mỗi ngày lấy một cái, theo thứ tự lưu, làm thành bản nháp (§6-7 chức năng 6-4).

## Luồng chính

**A. Lưu**
1. Nhận việc từ 6-3 (và từ 5-1 với video AI). Chép tệp từ Supabase Storage sang `素材/` trong thư mục tài năng (2-2), tên theo ngày và mã tư liệu.
2. Tạo ảnh thu nhỏ cho danh sách. Ghi `onedrive_item_id`.

**B. Dùng lại**
3. Thẻ 送ったもの ở T-10 liệt kê tư liệu mới nhất trước, có nhãn "AI" cho video AI và "自作" cho video tự làm.
4. Chọn tư liệu cũ để gắn vào bản nháp đang mở (như 6-3 bước 4), không phải tải lên lại.

**C. Video tự làm thành bản nháp (chờ 確認32, B4)**
5. Lô buổi sáng: nếu hàng chờ video tự làm còn video chưa dùng, lấy video lưu sớm nhất, gọi AI viết chú thích và hashtag (4-1), tạo một bản nháp gắn sẵn video. Hiện cạnh 3 chủ đề như một lựa chọn thêm (B4).
6. Bản nháp này vẫn phải được chấp nhận (4-3) mới đăng. Không mất phí tạo video (UC-06 前提).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Chép sang OneDrive lỗi | Thử lại qua hàng đợi; trong lúc đó dùng bản trên Supabase | §9-3 |
| Bản tạm trên Supabase | Xóa sau khi đã lưu OneDrive và bài **cuối cùng** dùng nó đã đăng xong 7 ngày; tư liệu của khoảng 自動投稿 chưa hết thì không xóa | S05-03, C2, [KS] 確認25 |
| Dùng lại tư liệu đã lâu, bản tạm đã xóa | Lấy lại từ OneDrive về Supabase khi cần đăng | [Đề xuất nội bộ] |
| Tài năng muốn xóa tư liệu | Không có trong ứng dụng; quản lý xóa trong OneDrive (S05-02) | S05-02 |
| Video tự làm trong hàng chờ bị dùng tay trước | Bỏ khỏi hàng chờ | [Đề xuất nội bộ] |
| Hết video tự làm | Không tạo bản nháp thêm; chỉ 3 chủ đề | B4 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Nơi lưu chính thức | OneDrive, thư mục tài năng | Chốt | §6-7, §7-2 |
| Ai xem được | Tài năng đó và quản lý | Chốt | §7-2 |
| Video tự làm | 1 video mỗi ngày, theo thứ tự lưu | Giả định (確認32) | §6-7 |
| Giữ bản tạm trên Supabase | 7 ngày sau khi bài cuối cùng dùng nó đăng xong | Tham số | S05-03, [KS] 確認25 |
| Giữ tư liệu sau khi tài năng ngừng | 6 tháng rồi tự xóa, kể cả trên OneDrive, không khôi phục | Chốt | §7-3, [KS] 確認55 |

## Dữ liệu [Đề xuất nội bộ]

`media` (6-3) thêm `thumbnail_path`, `temp_deleted_at`. `self_made_queue`: `talent_id`, `media_id`, `saved_at`, `used_at`.

## Màn hình

T-10 thẻ 送ったもの; T-07 nút 自分で作った動画を保存する; T-06 ô 素材.

## Tích hợp

Microsoft Graph (ghi tệp lớn bằng phiên tải lên nhiều phần). Worker tạo ảnh thu nhỏ.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho ảnh vừa gửi, thì trong vài phút có tệp trong `素材/` của tài năng trên OneDrive.
2. Cho chọn ảnh cũ ở 送ったもの, thì gắn vào bản nháp mà không tải lên lại.
3. Cho 2 video tự làm đã lưu, thì sáng mai có bản nháp với video lưu trước, sáng kia với video lưu sau.
4. Cho bản nháp từ video tự làm, thì không tăng số lần tạo video.
5. Tài năng B không thấy tư liệu của tài năng A.

## Ngoài phạm vi của chức năng này

- Tài năng xóa tư liệu trong ứng dụng (S05-02). Chỉnh sửa tư liệu.

## Phụ thuộc

6-3, 2-2 (thư mục), 4-1, 2-1 (lô buổi sáng), S02-02 (quyền Microsoft Graph).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認32, 55.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B4 | Video tự làm hiện thêm cạnh 3 chủ đề, vẫn phải chấp nhận | Có (phần C) | Như B4 |
| C2, S05-03 | Nơi lưu tạm và thời gian giữ | Không | Như đề xuất |
| S05-02 | Tài năng không xóa tư liệu trong ứng dụng | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-7 (6-4), §7-2, §7-3, UC-06, UC-06 前提, 確認32, 55. [AG] trang 3 (T-06, T-07), trang 4 (T-10).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.37, CR-23: phần **video tự làm được lưu và mỗi ngày 1 video tự thành bản nháp** là thay đổi ngoài báo giá, **chưa làm** tới khi khách quyết (No.50). Phần lưu và xem lại tư liệu vẫn làm.


</details>

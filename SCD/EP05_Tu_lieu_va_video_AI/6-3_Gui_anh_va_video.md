# 6-3 Gửi ảnh và video

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-7, chức năng 6-3; UC-05 |
| Màn hình [AG] | T-10 (gửi), T-09 (bản nháp đã gắn tư liệu), M-08 (nút 写真・動画を送る, chỉ cho tài khoản công ty, [KS] 確認27) |
| Tên trong mã nguồn | Media Upload |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Định dạng, dung lượng là tham số (S05-01); cách tải qua nơi lưu tạm chờ khách đồng ý (C2) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠ S05-01 | ⚠ đội đề xuất | ✅ M-08 chỉ cho tài khoản công ty ([KS] 確認27) | ⚠ C2 | ⚠ đội đề xuất | ⚠ 4-1, 6-4 |

## Mục đích

Tài năng chọn ảnh, video trong máy hoặc chụp ngay rồi gửi. Quá dung lượng thì báo lý do; mất mạng thì báo và cho gửi lại. Quản lý cũng gửi được từ màn hình quản trị (§6-7 chức năng 6-3).

## Tác nhân và quyền

- Tài năng: gửi cho bản nháp của mình.
- Quản lý: gửi ở M-08 (§6-7), **chỉ cho tài khoản công ty** ([KS] 確認27).

## Luồng chính

1. Từ T-09 (nút 写真・動画を送る), T-08 hoặc menu dưới (nút 送る), mở T-10 với ba thẻ: 端末から選ぶ (chọn trong máy), 撮影する (chụp ngay), 送ったもの (đã gửi, xem 6-4).
2. Chọn một hoặc nhiều tệp (ảnh cho bài nhiều ảnh, hoặc một video). Kiểm tra định dạng, dung lượng, độ dài **ngay trên máy** trước khi gửi.
3. Xin máy chủ đường dẫn tải lên có ký (signed URL); điện thoại tải **thẳng** lên Supabase Storage, video dùng kiểu tải tiếp được khi đứt mạng (C2, file 18 mục 4).
4. Tải xong: tạo bản ghi tư liệu, gắn vào bản nháp đang mở; đưa việc "lưu sang OneDrive" vào hàng đợi (6-4).
5. Ô "自分で作った動画として保存する" (lưu làm video tự làm): đánh dấu video vào hàng chờ của 6-4, không gắn vào bản nháp hôm nay.
6. Xong thì về T-09.

**Quản lý gửi thay (M-08):** cùng luồng, ghi lại người gửi là quản lý.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Sai định dạng, quá dung lượng hoặc độ dài | Báo lý do cụ thể, không gửi | §6-7 |
| Mất mạng giữa chừng | Báo, giữ tệp đã chọn, nút gửi lại; video tải tiếp từ chỗ đứt | §6-7 |
| Ảnh HEIC của iPhone | Đổi sang JPEG trên worker | [Đề xuất nội bộ] |
| Bài ảnh mà gửi thêm video, hoặc ngược lại | Hỏi tài năng muốn đổi loại bài không (4-1, B2) | [Đề xuất nội bộ] |
| Bản nháp đã chấp nhận | Không gắn thêm được (S04-09) | 4-3 |
| Lưu sang OneDrive lỗi | Vẫn dùng được bản trên Supabase để đăng; 6-4 thử lại | §9-3 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Định dạng | Ảnh: JPEG, PNG, HEIC. Video: MP4, MOV | Tham số | S05-01 |
| Dung lượng mỗi tệp | Ảnh 20 MB, video **300 MB** (Instagram Reels tối đa 300 MB) | Tham số | S05-01; bộ Upload-Post §8.4a |
| Độ dài video | **3 giây đến 3 phút** (Instagram cần ít nhất 3 giây; TikTok thường cho 3 phút) | Tham số | S05-01; bộ Upload-Post §8.4a |
| Chuẩn hóa trước khi đăng | Worker đổi ảnh HEIC sang JPEG và nén ảnh dưới 8 MB; video sang MP4 H.264 + AAC (`yuv420p`, `+faststart`). Không tự thêm viền hay cắt: Upload-Post tự làm cho Instagram, TikTok | Đề xuất nội bộ | Bộ Upload-Post §8.4a (U20, U21) |
| Số ảnh mỗi bài | Tối đa 10 | Tham số, kiểm chứng | S05-01, B2 |

§6-7 để định dạng và dung lượng "quyết khi thiết kế" nên các con số trên là đề xuất của đội.

## Dữ liệu [Đề xuất nội bộ]

`media`: `id`, `talent_id`, `kind` (`photo`, `video`), `source` (`upload`, `camera`, `ai_generated`, `self_made`), `storage_path` (Supabase), `onedrive_item_id`, `width`, `height`, `duration_sec`, `size_bytes`, `uploaded_by` (tài năng hoặc quản lý), `created_at`. `draft_media`: `draft_id`, `media_id`, `order`.

## Màn hình

T-10: ba thẻ, lưới chọn có số thứ tự, "3件を選択中", ô lưu video tự làm, nút 送る, câu "mất mạng thì báo và gửi lại được; quá dung lượng thì hiện lý do" ([AG] trang 4). M-08: nút 写真・動画を送る (khung đỏ).

## Tích hợp

Supabase Storage (đường dẫn ký sẵn, tải tiếp được). Worker đổi HEIC, đọc kích thước, độ dài.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho ảnh 25 MB, thì không gửi được và có lý do.
2. Cho video 200 MB, mất mạng ở 50%, thì khi có mạng lại tải tiếp từ chỗ đứt.
3. Cho chọn 3 ảnh và gửi, thì T-09 hiện 3 ảnh theo đúng thứ tự đã chọn.
4. Cho quản lý gửi ảnh thay tài năng A ở M-08, thì ảnh gắn vào bản nháp của A và ghi người gửi là quản lý.
5. Không có yêu cầu tải lên nào đi qua hàm của Vercel với tệp lớn hơn 4 MB.

## Ngoài phạm vi của chức năng này

- Chỉnh sửa ảnh, video trong ứng dụng (cắt, lọc màu): không có chức năng.

## Phụ thuộc

4-1 (bản nháp), 6-4 (lưu), C2 (nơi lưu tạm).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認26, 27.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S05-01 | Định dạng, dung lượng, độ dài, số ảnh | Không | Như bảng |
| C2 | Tải thẳng lên Supabase Storage | Không (chặn chạy thật) | Như C2 |
| B2 | Số ảnh tối đa mỗi bài | Không | 10 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-7 (6-3), §9-3, UC-05, 確認26, 27. [AG] trang 4 (T-10), trang 7 (M-08).
- [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 4. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) B2, C2.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- CR-09 (đã chốt làm ở SP1): quản lý gửi ảnh, video thay từ màn quản trị, dùng cùng luồng tải lên của tài năng; theo [KS] 確認27 chỉ cho tài khoản công ty.
- Q&A No.8, CR-10 (đã chốt): ảnh, video lưu ở OneDrive. Thiết kế tải lên Supabase Storage rồi chuyển sang OneDrive, fal.ai và Upload-Post lấy tệp từ bản tạm, chính là phương án B của CR-10. Không cần liên kết công khai của OneDrive.

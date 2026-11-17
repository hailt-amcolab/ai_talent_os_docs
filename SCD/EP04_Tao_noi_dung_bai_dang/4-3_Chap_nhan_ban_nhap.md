# 4-3 Chấp nhận bản nháp (採用)

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-6, chức năng 4-3; §5-3 (hình 5-2); UC-05 |
| Màn hình [AG] | T-09 (nút この案で投稿する（採用）, ô xin duyệt) |
| Tên trong mã nguồn | Draft Adoption |
| Mức sẵn sàng | 🔴 Đỏ – chưa rõ giờ đăng có từ lúc nào (B1) và chấp nhận sau giờ đăng thì làm gì (S04-01). Bộ trạng thái bài đăng chưa có (C-01) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ❌ S04-01 | ⚠ B1 | ❌ C-01 | ✅ | ⚠ hẹn giờ qua 8-3 | ⚠ đội đề xuất | ❌ 4-4, 7-7, 8-3, 7-5 |

## Mục đích

Tài năng bấm "採用" (chấp nhận) trên bản nháp đã có ảnh hoặc video. Hệ thống kiểm tra từ cấm rồi hẹn giờ đăng, hoặc chuyển sang chờ duyệt nếu tài năng xin duyệt (§6-6 chức năng 4-3, §5-3).

## Tác nhân và quyền

- Tài năng: chấp nhận bản nháp của mình. Chỉ tài năng được cài dùng duyệt bài mới thấy ô xin duyệt (7-7).
- Hệ thống: kiểm tra từ cấm, hẹn giờ.

## Luồng chính

1. Ở T-09, nút 採用 chỉ bấm được khi bản nháp đã gắn ảnh hoặc video (6-3, 5-3).
2. Nếu tài năng được cài dùng duyệt bài: hiện ô "仕事の投稿のため、マネージャーに承認を依頼する" (bài công việc, xin quản lý duyệt). AI không tự đoán bài công việc (§5-3).
3. Bấm 採用: khóa bản nháp (không sửa nữa, S04-09), chạy kiểm tra từ cấm (4-4).
4. Có từ cấm: bài sang trạng thái "dính từ cấm", không hẹn giờ; 4-4 xử lý tiếp.
5. Không có từ cấm, có xin duyệt: bài sang "chờ duyệt", báo quản lý (7-7).
6. Không có từ cấm, không xin duyệt:
   - đăng tự động đang chạy (7-5): gửi lịch sang Upload-Post với giờ đăng dự kiến của ngày (B1), bài sang "đã hẹn giờ" (8-3);
   - đăng tự động đang dừng: bài ở "đã chấp nhận, chưa hẹn giờ" (đề xuất B6).
7. Báo tài năng kết quả (đã hẹn lúc mấy giờ, hoặc đang chờ duyệt, hoặc bị chặn và lý do). T-13 hiện bài.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Chấp nhận **sau** giờ đăng dự kiến của ngày | Hẹn sau 15 phút nếu trước 22:00; sau 22:00 thì hẹn vào giờ đăng dự kiến hôm sau | S04-01 (đề xuất); file 13 Q1 |
| Đã có bài khác được hẹn trong ngày | Hẹn ở khung kế tiếp, cách bài trước ít nhất 3 giờ | S04-04 |
| Upload-Post lỗi khi hẹn giờ | Bài ở "hẹn giờ lỗi", thử lại qua hàng đợi; vẫn lỗi thì báo như đăng lỗi (8-5) | §9-3 |
| Bấm 採用 hai lần | Lần hai không làm gì (bản nháp đã khóa) | [Đề xuất nội bộ] |
| Tài năng không chấp nhận trong ngày | Không đăng. Bản nháp giữ theo S04-02. Đã gửi tư liệu mà chưa chấp nhận thì được nhắc cùng lời nhắc của 6-5 (S04-03) | 確認25 (giả định) |
| Không có ảnh, video | Không chấp nhận được | §6-6 |
| Mạng chưa kết nối | Vẫn chấp nhận; 8-3 chỉ đăng lên mạng đã kết nối | §6-10 chức năng 8-3 |
| Bài ảnh | YouTube không đăng (cần video) | §6-10 chức năng 8-3 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Phải có ảnh hoặc video | — | Chốt | §6-6 |
| Chỉ bài đã chấp nhận mới được đăng | — | Giả định (確認25) | — |
| Giờ đăng do hệ thống quyết | — | Giả định (確認30) | §5-2 |
| Thời gian chờ khi chấp nhận trễ | 15 phút | Tham số | S04-01 |
| Giờ chặn cuối ngày | 22:00 | Tham số | S04-01 |
| Khoảng cách giữa hai bài trong ngày | 3 giờ | Tham số | S04-04 |

## Dữ liệu [Đề xuất nội bộ]

`posts`: `id`, `talent_id`, `draft_id`, `draft_version`, `media_ids[]`, `approval_requested`, `status` (theo C-01; tạm: `ng_blocked`, `awaiting_approval`, `adopted_not_scheduled`, `scheduled`, `schedule_failed`, `cancelled`, `posted`, `failed`), `scheduled_at`, `uploadpost_job_id`, `adopted_at`. Kết quả từng mạng lưu ở 8-3. Mọi lần đổi trạng thái ghi nhật ký (C-03).

## Màn hình

T-09: nút この案で投稿する（採用）, ô xin duyệt (chỉ khi được cài), câu "投稿の時刻は AI育成OS が決めます" ([AG] trang 4).

## Tích hợp

Upload-Post: hẹn giờ qua chức năng 8-3. Chống hẹn trùng: khóa theo `post_id`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bản nháp chưa có ảnh, video, thì nút 採用 không bấm được.
2. Cho tài năng không được cài duyệt bài, thì không thấy ô xin duyệt.
3. Cho bản nháp sạch, không xin duyệt, đăng tự động đang chạy, thì bài ở "đã hẹn giờ" với giờ đăng dự kiến của ngày và có lịch bên Upload-Post.
4. Cho có xin duyệt, thì bài ở "chờ duyệt" và mọi quản lý có thông báo 承認の依頼.
5. Cho chú thích có từ cấm, thì bài không được hẹn giờ và tài năng thấy lý do.
6. Cho chấp nhận lúc 20:00 khi giờ dự kiến là 19:00, thì bài được hẹn khoảng 20:15.
7. Cho đăng tự động đang dừng, thì bài ở "đã chấp nhận, chưa hẹn giờ".

## Ngoài phạm vi của chức năng này

- Tài năng hủy bài đã hẹn: không có; chỉ quản lý hủy (7-2).
- Tài năng chọn giờ đăng: không có (確認30).

## Phụ thuộc

4-4, 7-7, 8-3, 7-5, 8-1 (giờ đăng), 6-3 (tư liệu), C-01 (🔴).

## Câu hỏi mở

Các 確認 liên quan (không xử lý ở đây): 確認25, 26, 30, 33.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B1 | Giờ đăng chốt lúc nào | Có | Chốt mỗi sáng |
| S04-01 | Chấp nhận sau giờ đăng | Có | Hẹn sau 15 phút, sau 22:00 thì sang hôm sau |
| C-01 | Trạng thái bài đăng | Có | Danh sách tạm ở mục Dữ liệu |
| B6 | Chấp nhận khi đang dừng đăng tự động | Không | Giữ "đã chấp nhận, chưa hẹn giờ" |
| S04-04 | Nhiều bài trong ngày | Không | Cách nhau 3 giờ |
| S04-03 | Nhắc khi đã gửi tư liệu mà chưa chấp nhận | Không | Gộp vào lời nhắc của 6-5 |
| S04-09 | Không sửa sau khi chấp nhận | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §5-3, §6-6 (4-3), §6-10 (7-2, 7-5, 8-3), UC-05, 確認25, 26, 30, 33.
- [AG] trang 4 (T-09). [File 13](../../Phan_tich/13_Qua_gio_dang_chua_chap_nhan.md) Q1. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) B1, B6.

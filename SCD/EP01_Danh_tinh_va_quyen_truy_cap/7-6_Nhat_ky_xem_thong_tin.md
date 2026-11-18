# 7-6 Nhật ký xem thông tin

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-2, chức năng 7-6; §3-2; §9-4; 確認44 |
| Màn hình [AG] | M-19. Việc ghi xảy ra khi mở M-07, M-08, M-09 |
| Tên trong mã nguồn | Access Audit Log |
| Mức sẵn sàng | 🟡 Vàng – luồng rõ. Thời gian giữ nhật ký chưa có thì để thành tham số |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠ thời gian giữ | ⚠ đội đề xuất | ✅ | ✅ không có | ⚠ đội đề xuất | ⚠ cần 1-6 |

## Mục đích

Quản lý đọc được thông tin cá nhân và hội thoại của tài năng, nên mỗi lần xem phải được ghi lại để kiểm tra về sau ai đã xem gì (§3-2, 確認44).

## Tác nhân và quyền

- Hệ thống: tự ghi.
- Quản lý: xem nhật ký ở M-19. Không ai sửa hay xóa được nhật ký.

## Luồng chính

1. Mỗi lần quản lý mở M-07 (thông tin), M-08 (bài đăng và kết quả) hoặc M-09 (hội thoại) của một tài năng, máy chủ ghi: thời điểm, quản lý, tài năng, màn hình.
2. Ở M-19, quản lý lọc theo khoảng thời gian và theo tài năng ([AG] đã đổi bộ lọc từ "người xem" sang "tài năng"), rồi xem danh sách.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Ghi nhật ký lỗi | Không hiện dữ liệu của tài năng. Không có nhật ký thì không cho xem | [Đề xuất nội bộ] |
| Tải lại trang, hoặc chuyển qua lại giữa các thẻ | Mỗi lần mở là một dòng | [Đề xuất nội bộ] |
| Xem trên điện thoại | Ghi như trên máy tính | [Đề xuất nội bộ] |
| Xem file trực tiếp trên OneDrive | Không ghi được vì không đi qua hệ thống. Ghi rõ điều này trong hướng dẫn quản lý | File 04 |
| Mở M-10 (cài đặt) hoặc M-02 (thông báo) | Không ghi | ⚠ [Đề xuất nội bộ], 確認44 chỉ nêu thông tin, hội thoại, kết quả |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Nội dung ghi | Thời điểm, quản lý, tài năng, màn hình | Chốt | §6-2, 確認44 |
| Không sửa, không xóa | — | Chốt | §6-2 |
| Thời gian giữ | ⚠ chưa có | Tham số, mặc định không xóa | §9-4 |

## Dữ liệu [Đề xuất nội bộ]

`access_logs`: `id`, `manager_id`, `talent_id`, `screen` (`info`, `posts`, `conversation`), `viewed_at`. Chỉ máy chủ được thêm dòng. Không cấp quyền sửa và xóa cho bất kỳ vai trò nào của ứng dụng; RLS chỉ cho quản lý đọc.

## Màn hình

M-19: bộ lọc khoảng thời gian và tài năng, nút 絞り込む (lọc), bảng gồm thời điểm, quản lý, màn đã xem, tài năng, câu "ghi tự động, không sửa được".

## Tích hợp

Không có.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho quản lý mở M-09 của tài năng A, thì có đúng một dòng mới ghi quản lý đó, A, màn hội thoại và thời điểm.
2. Cho mọi vai trò của ứng dụng, khi thử sửa hoặc xóa một dòng nhật ký, thì bị từ chối.
3. Cho bộ lọc khoảng 1/11 đến 12/11 và tài năng A, thì chỉ hiện các dòng của A trong khoảng đó.
4. Cho việc ghi nhật ký lỗi, thì màn M-07, M-08, M-09 không hiện dữ liệu.

## Ngoài phạm vi của chức năng này

- Nhật ký thao tác và nhật ký xử lý (C-03). Phần này chỉ ghi lượt xem.

## Phụ thuộc

- 1-6 (biết quản lý nào đang xem).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| 確認44 | Ghi thời điểm, quản lý, tài năng khi mở màn thông tin, hội thoại, kết quả | Không | Ghi M-07, M-08, M-09 |
| §9-4 | Giữ nhật ký bao lâu | Không | Không xóa tới khi có quyết định |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-2, §6-2 (7-6), §9-4, 確認44.
- [AG] trang 10 (M-19), trang 8 (M-09). File 14 (M-19 đổi bộ lọc).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 2.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.21 (đã chốt): lọc theo khoảng thời gian và tài năng. Q&A No.29: thời gian giữ nhật ký do mình thiết kế, không hỏi khách.

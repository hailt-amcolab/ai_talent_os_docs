# 7-3 Đổi trạng thái tài năng

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-2, chức năng 7-3; §5-1; §7-3; UC-13 |
| Màn hình [AG] | M-10 |
| Tên trong mã nguồn | Talent Status Management |
| Mức sẵn sàng | 🔴 Đỏ – tên và số trạng thái chưa thống nhất (A3), sơ đồ trạng thái chưa có (C-01), 4 câu 確認53–56 chưa trả lời. **Chưa giao agent toàn bộ.** Xem mục "Phần làm được ngay" |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ thiếu bước 利用前 → 利用中 | ❌ | ✅ [KS] 確認55, 56 | ❌ C-01 | ⚠ 【要確認】 trên M-10 | ⚠ hủy lịch qua Upload-Post | ⚠ đội đề xuất | ❌ 1-1, 3-9, 7-2 |

## Mục đích

Quản lý đổi trạng thái sử dụng của tài năng. Khi chuyển sang đã ngừng thì hệ thống tự dừng nhắn tin, dừng thu phí, hủy bài đã hẹn giờ và chặn đăng nhập (§6-2 chức năng 7-3).

## Tác nhân và quyền

- Quản lý: đổi trạng thái ở M-10, có màn xác nhận.
- Hệ thống: tự làm các việc đi kèm khi trạng thái đổi.
- Tài năng: không tự đổi được. Muốn ngừng thì báo quản lý (確認53).

## Trạng thái và chuyển trạng thái

[YK2] §6-2 có 3 trạng thái: 利用前 (chưa dùng), 利用中 (đang dùng), 利用終了 (đã ngừng). UC-13 và 確認53–56 lại gọi là 退会 (rời đi). Đây là câu A3.

| Từ | Sang | Ai, khi nào | Tình trạng |
|---|---|---|---|
| (mới) | 利用前 | Quản lý duyệt đơn (1-4) | Rõ ([AG] M-03) |
| 利用前 | 利用中 | ⚠ chưa rõ: tự động khi đăng ký thanh toán xong, hay quản lý chuyển tay sau khi nhập hồ sơ? | **Chặn** |
| 利用中 | 利用終了 | Quản lý, có màn xác nhận | Rõ (確認53) |
| 利用終了 | 利用中 | **Không cho phép** | Chốt ([KS] 確認56) |
| 利用前 | 利用終了 | ⚠ chưa rõ | Chưa rõ |

## Luồng chính (đã rõ)

1. Quản lý mở M-10 của tài năng, bấm 切り替える (đổi).
2. Chọn trạng thái mới, hệ thống hiện màn xác nhận ghi rõ hậu quả.
3. Khi chuyển sang 利用終了:
   - dừng AIコーチ nhắn tin (3-4, 3-9);
   - dừng thu phí (1-1);
   - hủy mọi bài đã hẹn giờ, kể cả bên Upload-Post (7-2);
   - chặn đăng nhập (確認54);
   - giữ dữ liệu 6 tháng; hết 6 tháng thì việc chạy định kỳ tự xóa (DB, Supabase Storage, thư mục OneDrive), không khôi phục (§7-3, [KS] 確認55).
4. Ghi nhật ký thao tác: ai đổi, từ đâu sang đâu, lúc nào (§9-4).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Tình trạng |
|---|---|---|
| Hủy lịch trên Upload-Post lỗi | Ghi bài là "hủy lỗi", báo quản lý, thử lại | [Đề xuất nội bộ], cần kiểm chứng Upload-Post |
| Tài năng đang đăng nhập lúc bị chuyển sang 利用終了 | Lần gọi tiếp theo bị từ chối, về T-02 | [Đề xuất nội bộ] |
| Chuyển lại 利用中: thu phí lại từ khi nào | ⚠ chưa rõ (file 04) | Chặn phần thu phí |
| Bài chờ duyệt, bản nháp chưa dùng khi ngừng | Đề xuất: hủy bài chờ duyệt, giữ bản nháp (S01-04) | Giả định |
| Xóa đăng ký của tài năng trên Upload-Post (phí tính theo số tài năng) | Đề xuất: hủy đăng ký; quay lại thì kết nối lại (S01-03) | Giả định |
| Ngừng giữa tháng thì tính phí thế nào | Thu trọn tháng (khách ghi đồng ý ở 確認50, chưa chốt) | Giả định |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Thời gian giữ dữ liệu sau khi ngừng | 6 tháng, rồi tự xóa, không khôi phục | Chốt | §7-3, [KS] 確認55 |
| Có màn xác nhận trước khi đổi | Có | Chốt | §6-2 |

## Dữ liệu [Đề xuất nội bộ]

- `talents.status`: danh sách giá trị chờ C-01 chốt. Tạm dùng `before_use`, `active`, `ended`.
- `talent_status_history`: `talent_id`, `from_status`, `to_status`, `changed_by`, `changed_at`. Chỉ thêm, không sửa, dùng làm nhật ký thao tác (C-03).

## Màn hình

M-10: dòng ステータス (trạng thái) kèm nút 切り替える, câu giải thích hậu quả, 【要確認】 確認53, 54, 56 ([AG] trang 8).

## Tích hợp

- Upload-Post: hủy lịch các bài đã đặt (qua chức năng 7-2).
- GMO: dừng thu phí (qua chức năng 1-1).

## Tiêu chí chấp nhận [Đề xuất nội bộ, phần đã rõ]

1. Cho quản lý bấm đổi trạng thái, thì luôn có màn xác nhận trước khi đổi.
2. Cho tài năng có 2 bài đã hẹn giờ, khi chuyển sang 利用終了, thì cả 2 bài ở trạng thái đã hủy và lịch bên Upload-Post đã bị xóa.
3. Cho tài năng ở 利用終了, thì sáng hôm sau không nhận tin nhắn của AIコーチ và không đăng nhập được.
4. Cho mọi lần đổi trạng thái, thì có một dòng trong lịch sử trạng thái ghi người đổi và thời điểm.

## Phần làm được ngay (giao agent được)

- Cột trạng thái, bảng lịch sử, màn xác nhận ở M-10, việc chặn đăng nhập.
- Các việc đi kèm viết dưới dạng sự kiện "trạng thái đã đổi". Module khác (1-1, 3-9, 7-2) lắng nghe sự kiện này, để khi khách trả lời thì chỉ sửa phần lắng nghe.

**Chưa làm:** bước 利用前 → 利用中, thu phí lại khi quay về 利用中, xóa dữ liệu theo thời hạn.

## Ngoài phạm vi của chức năng này

- Tài năng tự xin ngừng trong ứng dụng: không có theo 確認53.

## Phụ thuộc

- C-01 (bộ trạng thái, 🔴). 1-1 (dừng thu phí), 3-9 (dừng nhắn), 7-2 (hủy bài). 1-4 (chặn đăng nhập).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| A3 | Tên và số trạng thái: 利用終了 hay 退会 | Có | Dùng tên của §6-2 |
| C-01 | Sơ đồ trạng thái tài năng (§5-1 ghi "sẽ viết ở bản cuối") | Có | Đội viết nháp, gửi khách duyệt |
| S01-01 | Ai chuyển 利用前 sang 利用中, và lúc nào | Có | Đề xuất: tự động khi đăng ký thanh toán xong |
| S01-02 | Quay lại 利用中 thì thu phí từ khi nào | Có (phần thu phí) | Đề xuất: thu trọn tháng quay lại |
| S01-03 | Hủy đăng ký Upload-Post khi ngừng | Không | Có hủy |
| S01-04 | Bài chờ duyệt và bản nháp khi ngừng | Không | Hủy bài chờ duyệt, giữ bản nháp |
| B7 | Thu tiền lỗi thì dừng thế nào | Không | Phương án A: dùng 利用終了 |
| 確認53 | Tài năng báo quản lý, quản lý đổi trạng thái | Không | Đúng như [YK2] |
| 確認54 | Chuyển sang đã ngừng thì chặn đăng nhập ngay | Không | Đúng như [YK2] |
| 確認55 | Giữ dữ liệu bao lâu sau khi ngừng | Không | Đã chốt ([KS]): 6 tháng rồi tự xóa |
| 確認56 | Cho quay lại 利用中 | Không | Đã chốt ([KS]): không cho quay lại |
| 確認50 | Ngừng giữa tháng thì tính phí thế nào | Có (phần thu phí) | Thu trọn tháng |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-1, §6-2 (7-3), §7-3, §9-4, UC-13, 確認50, 53–56.
- [AG] trang 8 (M-10).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 2. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A3.

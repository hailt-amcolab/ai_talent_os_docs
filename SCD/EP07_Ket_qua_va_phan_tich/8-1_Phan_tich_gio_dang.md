# 8-1 Phân tích giờ đăng

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-11, chức năng 8-1; §5-2; UC-08 |
| Màn hình [AG] | Không có màn riêng; giờ đăng hiện ở T-07, T-09 |
| Tên trong mã nguồn | Posting Time Analysis |
| Mức sẵn sàng | 🔴 Đỏ – chưa định nghĩa "đủ số liệu" và cách chọn giờ (S07-06); chưa biết Upload-Post có số liệu theo khung giờ không |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ S07-06 | ⚠ | ❌ S07-06 | ✅ | ✅ | ⚠ 8-9 | ⚠ đội đề xuất | ⚠ 8-7 |

## Mục đích

Khi chưa đủ số liệu, đăng theo giờ trong chỉ dẫn thuật toán của アデッソ. Khi đủ, chọn giờ đăng cho từng tài năng theo khung giờ được tương tác tốt (§6-11 chức năng 8-1, §5-2). Upload-Post không cho số liệu thì giữ giờ theo chỉ dẫn (UC-08).

## Luồng chính (đề xuất S07-06)

1. Mỗi sáng (cùng lô buổi sáng), chốt giờ đăng dự kiến của ngày cho từng tài năng (B1).
2. Thứ tự ưu tiên:
   1. giờ riêng ghi trong `個別の指示` của tài năng (S07-07);
   2. nếu **đủ số liệu**: khung giờ có mức tương tác trung bình cao nhất trong các bài của chính tài năng;
   3. nếu chưa đủ: giờ trong `共通/アルゴリズム対策.md` (theo thứ trong tuần nếu có).
3. **Đủ số liệu** = ít nhất 20 bài đã đăng, ở ít nhất 3 khung giờ khác nhau (tham số).
4. **Mức tương tác** = (thích + bình luận) / lượt xem, tính trên các bài của tài năng, nhóm theo khung giờ đăng 1 giờ. Nếu 8-9 có số liệu theo khung giờ thì dùng thêm.
5. Áp dụng 8-4: rải ±10 phút, cách bài trước ít nhất 3 giờ.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| File chỉ dẫn không ghi giờ | Dùng giờ mặc định 19:00 (tham số) | [Đề xuất nội bộ] |
| Các khung giờ chênh nhau rất ít | Giữ giờ theo chỉ dẫn | [Đề xuất nội bộ] |
| Upload-Post không có lượt xem | Không đủ số liệu, giữ giờ theo chỉ dẫn | UC-08 |
| Upload-Post có Best Time to Post (đọc trang riêng 17/11) | Độ tin cậy trung bình hoặc cao: dùng `best_times` của 8-9. Độ tin cậy thấp, hoặc YouTube (không có giờ): so giờ đăng các bài của tài năng, rồi chỉ thị thuật toán | Bộ Upload-Post §13.2a |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Chưa đủ số liệu thì theo chỉ dẫn của アデッソ | — | Chốt | §5-2, §6-11 |
| Ngưỡng "đủ số liệu" | 20 bài, 3 khung giờ | Tham số | S07-06 |
| Tài năng không đổi giờ | AI quyết giờ theo khung giờ hiệu quả アデッソ viết trong chỉ thị cho AI | Chốt ([KS] 確認30) | — |
| Quản lý không có màn đổi giờ | Ghi giờ riêng trong hồ sơ | Đề xuất | S07-07 |

## Dữ liệu

`daily_post_plans` (4-1) thêm `time_source` (`talent_instruction`, `data`, `agency_rule`, `default`).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng mới, chỉ dẫn ghi "19:00–21:00", thì giờ dự kiến nằm trong khoảng đó.
2. Cho 25 bài, bài 12:00 có mức tương tác cao nhất rõ rệt, thì giờ dự kiến quanh 12:00.
3. Cho `個別の指示` ghi "毎日20時に投稿", thì giờ dự kiến quanh 20:00.

## Phụ thuộc

8-7, 8-9 (không bắt buộc), 4-1 (B1), 8-4.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認30.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S07-06 | "Đủ số liệu" và cách chọn giờ | Có | Như trên |
| S07-07 | Giờ riêng qua hồ sơ, không có màn đổi giờ | Không | Như đề xuất |
| B1 | Giờ đăng chốt mỗi sáng | Có | Như B1 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §6-11 (8-1), UC-08, 確認30. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) B1.

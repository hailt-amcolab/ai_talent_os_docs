# 4-1 Tự tạo bản nháp

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-6 |
| Màn hình [AG] | T-07, T-09 |
| Tên trong mã nguồn | AI Draft Generation |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Tự tạo bản nháp: chủ đề, chú thích, hashtag, danh sách cảnh quay, kịch bản video

## Tác nhân

Huấn luyện viên AI, tài năng

## Đầu vào

Thông tin ở 3-1, tin tức trong ngày ⚠ (確認16), ngày riêng của tài năng. Chủ đề tài năng chọn, hoặc chủ đề tài năng tự nói

## Điều kiện trước

Mỗi sáng. Khi tài năng đã chọn chủ đề. Quản lý đã nhập hồ sơ tài năng

## Luồng chính

1. Mỗi sáng tạo 3 chủ đề gợi ý ⚠ (確認15).
2. Tài năng chọn hoặc nói chủ đề muốn đăng.
3. Tạo chú thích, hashtag, hướng dẫn chụp, thêm kịch bản nếu là video.
4. Giữ độ dài và số hashtag trong giới hạn chung của cả 3 mạng xã hội

## Đầu ra và kết quả sau

- Đầu ra: 3 chủ đề gợi ý, bản nháp
- Kết quả mong đợi: Tài năng yêu cầu bao nhiêu bản nháp thì tạo bấy nhiêu (5-3, UC-05 前提). Mỗi bản nháp dùng được cho cả 3 mạng (確認24)

## Luồng lỗi và trường hợp biên

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Quy tắc và giá trị

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Dữ liệu

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Tích hợp

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Tiêu chí chấp nhận

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Chỗ còn thiếu

| Ai phải lấp | Nội dung |
|---|---|
| Khách | 確認15, 16, 24; A8; B1, B2, B3 |
| Kiểm chứng | Nguồn tin tức (確認16) |
| Đội | Giới hạn độ dài chung cho 3 mạng |

## Điểm chưa rõ (từ file 04)

- độ dài chú thích và số hashtag tối đa chung cho 3 mạng xã hội là bao nhiêu. Tiêu đề cho YouTube lấy từ đâu. Chủ đề và bản nháp không dùng thì có chuyển sang ngày sau không. Nhiều bản nháp được 採用 trong một ngày thì mỗi bài đăng giờ nào.

## Nguồn

- [YK2] 6-6, 5-3, UC-05, UC-05 前提, 確認15, 16, 24–30.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP04.

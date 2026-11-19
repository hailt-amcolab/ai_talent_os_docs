# Kết quả kiểm tra đầu ra extraction

- Validator workflow: PASS —12 nguồn đúng hash,9 schema CSV và các link Markdown (gồm thư mục đợt extraction).
- Validator extraction: PASS —đủ trường yêu cầu, trạng thái thuộc4 giá trị được yêu cầu, REQ/BR/EV tồn tại và liên kết đúng, nguồn thuộc source_requiments và đúng snapshot,54 chức năng YK2 và67 mục TR cũ đều có ánh xạ.
- Fixture thư mục tạm: bản sạch đạt; thay EV thành ID không tồn tại hoặc trạng thái xác nhận không hợp lệ đều bị phát hiện. Không sửa nguồn gốc khi thử lỗi.
- Hash workbook15 và ma trận24 vẫn khớp trước extraction. Không tạo hoặc sửa câu hỏi trong các workbook/SCD.

Đây là tự kiểm cấu trúc và đối chiếu nguồn của tác giả. Chưa có review độc lập và không ký G1/G2/G5/G7/G8. Hồ sơ gate chỉ ghi BLOCKED/chờ người duyệt, không phải thất bại của kiểm tra cơ học.

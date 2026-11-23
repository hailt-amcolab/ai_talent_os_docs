> **Đợt23112026:** Nguồn mới có đề nghị và 18 mục cần FCP/đội kiểm tra; không tạo câu hỏi khách mới hoặc đóng No.93–99. [Review và định tuyến](DELIVERY_23112026_REVIEW.md). Guard/transition/AC ở nhánh bị ảnh hưởng giữ STALE; chưa có review độc lập.

> **Tiếp nhận23/11/2026:** Bảng64dòng dưới đây STALE ở các nhánh phụ thuộc QA/KS. KS K116 thêm tạm dừng; K84 cho Talent hủy; K59 đổi AI tự sửa; K85 bỏ dừng toàn hệ thống. Chưa tái dựng đầy đủ guard/transition/AC, không dùng bảng cũ để triển khai các nhánh này. Xem [đối chiếu](QA_KS_UPDATE_2026-11-23.md) và [luồng cập nhật](FLOW_INDEX.md).

# Chuyển trạng thái hiện hành

64 dòng tại [state-transitions.csv](state-transitions.csv); chỉ TRANS-0009 được thu hẹp phạm vi chưa rõ thành đề xuất tự chuyển. Manager đổi bằng tay đã được YK2 P615–616/M-10 mô tả; không tự biến hoàn tất thanh toán thành tự đổi trạng thái. Bản sửa chờ review, không phải enum đã được khách duyệt.

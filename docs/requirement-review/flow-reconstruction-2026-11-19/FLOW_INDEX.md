# Flow Index — tái dựng ngày19/11/2026

Đã dựng30 flow:26 luồng sản phẩm,3 luồng hỗ trợ và1 quy trình dự án. Đây là bản chuẩn bị G3, không phải30 luồng đã đủ triển khai. Các yêu cầu dự kiến/tương lai chỉ được map làm ngữ cảnh, không chuyển thành chức năng hoạt động.

Điểm vào: [quy ước/đặc tả](BUSINESS_FLOW_SPECIFICATION.md), [bảng chuyển trạng thái](STATE_TRANSITION_TABLES.md), [báo cáo bao phủ](FLOW_COVERAGE_REPORT.md). Sổ quản lý: [business-flows.csv](../registers/business-flows.csv).

| Flow | Mục tiêu/luồng | UC/phạm vi | Loại | Số REQ liên kết | C/D/I/U/X/P của các bước |
|---|---|---|---|---|---|
| [FLOW-0001](flows/FLOW-0001.md) | Talent nộp đơn và Manager xét duyệt | UC-01 | PRODUCT_BUSINESS_FLOW | 8 | 5/2/0/4/0/0 |
| [FLOW-0002](flows/FLOW-0002.md) | Talent đăng nhập, đổi mật khẩu và khởi tạo sử dụng | UC-03; UC-13 đổi thiết bị | PRODUCT_BUSINESS_FLOW | 13 | 6/4/0/1/0/0 |
| [FLOW-0003](flows/FLOW-0003.md) | Đăng ký hoặc thay phương thức thanh toán | UC-03; UC-11 | PRODUCT_BUSINESS_FLOW | 4 | 4/0/1/3/0/0 |
| [FLOW-0004](flows/FLOW-0004.md) | Kết nối, mất kết nối và nối lại SNS | UC-03; UC-08 | PRODUCT_BUSINESS_FLOW | 6 | 3/4/0/3/1/0 |
| [FLOW-0005](flows/FLOW-0005.md) | Tạo thư mục và đăng ký hồ sơ qua ChatGPT | UC-01; UC-02 | PRODUCT_BUSINESS_FLOW | 7 | 4/1/1/3/0/0 |
| [FLOW-0006](flows/FLOW-0006.md) | Nhập và chỉnh hồ sơ trên màn M-20 | UC-02 | PRODUCT_BUSINESS_FLOW | 2 | 1/2/0/4/0/0 |
| [FLOW-0007](flows/FLOW-0007.md) | Đăng ký, sửa mục tiêu follower và theo dõi | UC-02; UC-09 | PRODUCT_BUSINESS_FLOW | 3 | 2/2/0/3/0/0 |
| [FLOW-0008](flows/FLOW-0008.md) | Quản lý category và phân loại Talent | UC-10; phần mở rộng category | PRODUCT_BUSINESS_FLOW | 1 | 1/2/0/3/0/0 |
| [FLOW-0009](flows/FLOW-0009.md) | Chỉ thị AI: soạn, thử, lưu và quay bản | UC-02; UC-10 | PRODUCT_BUSINESS_FLOW | 6 | 5/0/1/3/0/0 |
| [FLOW-0010](flows/FLOW-0010.md) | Chu kỳ AI chủ động: đọc dữ liệu, nhắn và nhắc | UC-04; UC-09 | PRODUCT_BUSINESS_FLOW | 14 | 4/2/0/4/0/0 |
| [FLOW-0011](flows/FLOW-0011.md) | Hội thoại AI và chuyển thông tin nghiêm trọng | UC-04; UC-10 | PRODUCT_BUSINESS_FLOW | 7 | 2/4/0/4/0/0 |
| [FLOW-0012](flows/FLOW-0012.md) | Đề xuất, nhận, thực hiện và ghi nhận thử thách | UC-02; UC-04; UC-09 | PRODUCT_BUSINESS_FLOW | 8 | 4/1/0/3/0/1 |
| [FLOW-0013](flows/FLOW-0013.md) | Chọn chủ đề, sửa và chấp nhận bài ở chế độ cần kiểm tra | UC-04; UC-05 | PRODUCT_BUSINESS_FLOW | 11 | 5/3/0/4/0/0 |
| [FLOW-0014](flows/FLOW-0014.md) | Gửi, lưu và dùng lại ảnh/video | UC-05; UC-06 | PRODUCT_BUSINESS_FLOW | 4 | 0/6/0/4/0/0 |
| [FLOW-0015](flows/FLOW-0015.md) | Tạo video AI và quyết định dùng kết quả | UC-06 | PRODUCT_BUSINESS_FLOW | 9 | 4/4/0/2/0/0 |
| [FLOW-0016](flows/FLOW-0016.md) | Quản lý từ cấm, phát hiện và xử lý bài bị chặn | UC-02; UC-05 | PRODUCT_BUSINESS_FLOW | 2 | 3/2/1/4/0/0 |
| [FLOW-0017](flows/FLOW-0017.md) | Yêu cầu duyệt, trả lại và quá hạn duyệt | UC-07 | PRODUCT_BUSINESS_FLOW | 4 | 4/5/0/4/0/0 |
| [FLOW-0018](flows/FLOW-0018.md) | Thiết lập và chạy đăng tự động theo kỳ | UC-05; UC-08; mở rộng tự động | PRODUCT_BUSINESS_FLOW | 3 | 3/2/0/4/0/0 |
| [FLOW-0019](flows/FLOW-0019.md) | Đặt lịch, đăng SNS và thao tác đăng lại khi lỗi | UC-08 | PRODUCT_BUSINESS_FLOW | 9 | 2/6/0/3/0/0 |
| [FLOW-0020](flows/FLOW-0020.md) | Dừng, hủy và mở lại đăng tự động | UC-08 | PRODUCT_BUSINESS_FLOW | 3 | 1/3/0/5/0/0 |
| [FLOW-0021](flows/FLOW-0021.md) | Lấy số liệu, hiển thị và phản hồi cho chu kỳ sau | UC-09 | PRODUCT_BUSINESS_FLOW | 12 | 2/5/0/3/0/0 |
| [FLOW-0022](flows/FLOW-0022.md) | Manager xem tình hình, xử lý thông báo và tra nhật ký | UC-10; UC-09 | PRODUCT_BUSINESS_FLOW | 10 | 3/4/0/2/0/0 |
| [FLOW-0023](flows/FLOW-0023.md) | Tổng hợp phí, thu theo kỳ và xử lý chưa thu được | UC-11 | PRODUCT_BUSINESS_FLOW | 12 | 2/4/0/4/0/0 |
| [FLOW-0024](flows/FLOW-0024.md) | Tạo tài khoản công ty và đăng bài cho office | UC-12 | PRODUCT_BUSINESS_FLOW | 5 | 4/1/0/2/1/0 |
| [FLOW-0025](flows/FLOW-0025.md) | Đăng nhập, thêm/vô hiệu hóa và khôi phục Manager | UC-10; UC-13 | PRODUCT_BUSINESS_FLOW | 6 | 1/5/0/3/0/0 |
| [FLOW-0026](flows/FLOW-0026.md) | Talent ngừng dùng, giữ/xóa dữ liệu và đăng ký lại | UC-13 | PRODUCT_BUSINESS_FLOW | 6 | 5/1/1/4/0/0 |
| [FLOW-0027](flows/FLOW-0027.md) | Theo dõi lượt video và chi phí AI | UC-06; UC-09; UC-11 | SUPPORTING_FLOW | 5 | 0/5/0/2/0/0 |
| [FLOW-0028](flows/FLOW-0028.md) | Vận hành và xử lý gián đoạn dịch vụ ngoài | Luồng hỗ trợ §9–11; không phải UC khách mới | SUPPORTING_FLOW | 12 | 0/4/0/4/0/0 |
| [FLOW-0029](flows/FLOW-0029.md) | Chuẩn bị dữ liệu, tài khoản ngoài và điều kiện vận hành | Luồng hỗ trợ chuẩn bị §7–12; không phải chức năng mới | SUPPORTING_FLOW | 19 | 1/5/1/1/0/0 |
| [FLOW-0030](flows/FLOW-0030.md) | Chốt phạm vi thử, nghiệm thu, phát hành và thay đổi | Luồng dự án §12–14; không đồng nghĩa sản phẩm đã sẵn sàng | PROJECT_PROCESS | 11 | 0/7/0/2/0/0 |

C=nguồn khách xác nhận đúng ý; D=nguồn mô tả; I=suy luận; U=chưa định nghĩa; X=khác biệt chưa giải quyết; P=đề xuất trong nguồn. Đếm bước không phải đếm yêu cầu độc lập.

Mã UC/TR/FL cũ được giữ; FLOW là ID truy vết nội bộ cho hồ sơ này, không phải mã yêu cầu mới của khách. Flow related là quan hệ phụ thuộc/tra cứu, không khẳng định luôn chạy tuần tự.

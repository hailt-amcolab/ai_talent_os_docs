# Danh sách thông tin còn thiếu

Có 161 dòng ghi nhận giới hạn/thiếu chi tiết trong [missing-information.csv](missing-information.csv). Đây là ghi chú theo từng mệnh đề, có thể cùng trỏ một No./vấn đề cũ; **không phải 161 thiếu sót độc lập hoặc câu hỏi mới cho khách**. Chưa thực hiện G4/G5 để xác minh phát hiện độc lập.

Các dòng CONFIRMED vẫn có thể thiếu chi tiết ngoài ý đã chốt; không vì vậy hạ quyết định có căn cứ hoặc đóng toàn feature. Không ghi đè workbook15, không sửa trạng thái No. hiện có.

| Nhóm | Thông tin thiếu / giới hạn | Nguồn và mục đang theo dõi | Bên xử lý |
|---|---|---|---|
| Đăng ký và khởi tạo | Thiếu quy tắc đăng ký lại email, hạn đơn/mật khẩu tạm, trường bổ sung và điều kiện chuyển trạng thái sử dụng. | QA No.52/53/65/69; SD-T18 trang5/21; SD-M18 trang6/24 | BA đối chiếu phần nghiệp vụ; đội xử lý thiết kế lỗi |
| Hồ sơ và đọc dữ liệu AI | Thiếu tín hiệu hồ sơ hoàn tất, mẫu file cuối, xử lý sai định dạng, trường nhập M-20 và cách đồng bộ qua ChatGPT. | QA No.22/54/74; KS tiền đề UC-02-8; SD-M18 trang23/30 | FutureCore cung cấp mẫu; BA/Tech Lead phân phần nghiệp vụ và thiết kế |
| Lời nhắn và hội thoại | Thiếu giờ cụ thể sáng/trưa/tối, loại tin theo khung, giới hạn chat và ngưỡng không đăng;3/7 ngày chưa được chốt. | QA No.73/76; KS xác nhận18/19/23 | Đầu mối nội dung và BA; đội không tự áp giá trị cũ |
| Thử thách | Thiếu định nghĩa đạt, trạng thái, hạn và logic đề xuất lại; mức khó/màn quản lý/điểm kinh nghiệm là đề xuất cần giữ riêng. | QA No.72; KS xác nhận5/G27/I27; GJ mục2; CR-22 | Khách cung cấp định hướng; BA phân phạm vi đã chốt với đề xuất |
| Đăng tự động | Thiếu ghép tư liệu–bài, số bài, thời điểm tạo, thay kỳ, hết tư liệu và quan hệ giữa hai cách chọn chế độ; không suy từ màn mới là đã chốt. | QA No.70/71; SD-T18 trang12/23 | BA/đầu mối nghiệp vụ; đội chuẩn bị phương án khi được giao |
| Lịch đăng, duyệt và từ cấm | Thiếu thời điểm chốt giờ, bài đến muộn, nhánh sau trả bài, thứ tự kiểm từ cấm với duyệt và quyền sửa bài bị chặn. | QA No.56/57/58/71 | BA xử lý ý còn mở; đội không tự thêm trạng thái/guard |
| Định tuyến người phụ trách | Thiếu lựa chọn theo category hay từng Talent, fallback khi không có/vắng người và ưu tiên giữa nhiều category. | QA No.6; KS xác nhận34/41; SD-M18 trang5/13/17/21 | BA/khách cho chính sách; Tech Lead cho thiết kế độc lập |
| Kết nối và đăng lại | Khác biệt trang kết nối48h và đi thẳng SNS chưa giải nghĩa; thiếu đích SNS lỗi, giờ/thao tác đăng lại và mất kết nối với lịch đã có. | YK2 chức năng8-2; SD-T18 trang9/18; QA No.59 | BA xác minh cơ chế được yêu cầu; đội/provider kiểm khả năng dịch vụ |
| Dừng và hủy đăng | Thiếu hành vi bài được chấp nhận lúc dừng, thông báo hủy, khôi phục; tiền đề dừng toàn bộ UC-08-6 vẫn chưa OK. | QA No.60/61/77; KS hàng85; SD-M18 trang19/32 | BA/đầu mối nghiệp vụ; không tự đóng No.77 |
| Tài khoản công ty | Đường thao tác quản trị hay app còn khác nhau; thiếu email đăng nhập, người nối SNS, trạng thái/xóa và chính sách danh sách. | QA No.20/43/66; KS tiền đề UC-12; SD-M18 trang33 | BA đối chiếu quyết định; chỉ đăng thay office đã chốt |
| Tư liệu và video | Thiếu định dạng/dung lượng, thời hạn chủ đề/nháp, xử lý tư liệu cũ, chia sẻ file và quyết định lấy video tự làm mỗi ngày. | QA No.8/37/55; GJ action9; SD-T18 trang15 | Đội/provider cho khả năng và thiết kế; BA cho phần hành vi chưa chốt |
| Đơn giá và tính phí | Thiếu đơn giá, ngày hiệu lực đổi giá, hoàn/trừ lượt lỗi, cổng chính thức, chu kỳ/ngày bắt đầu và khả năng thu biến động. | QA No.2/4/49/53/62; KS xác nhận48/49; GJ mục6 | Công ty/nhà cung cấp thanh toán; đội thiết kế đối soát |
| Thu thất bại và nghỉ giữa kỳ | Thiếu trạng thái khi Manager dừng vì nợ, nghĩa vụ kỳ tiếp theo và diễn giải thu trọn tháng theo chu kỳ mới; thời hạn xóa6 tháng đã chốt nhưng đối tượng xóa còn thiếu. | QA No.63/69/76; KS xác nhận50/55 | BA/đầu mối nghiệp vụ; không tạo trạng thái dừng giả định |
| Kết quả và tiến độ | Thiếu trường kết quả lấy được thực tế, ngưỡng đủ dữ liệu chọn giờ, cách đếm chuỗi ngày, xử lý thiếu dữ liệu;25/50/75% là đề xuất đội. | QA No.14/72; YK2 chức năng8-7/8-9; KS xác nhận22 | Đội/provider kiểm dữ liệu; BA giữ ý chưa chốt |
| Thông báo | Thiếu loại/người nhận/nội dung email Manager, bản lời nhắn cuối và ngữ nghĩa ẩn/lọc đã xử lý. | QA No.75/76; hai sheet nội dung/góp ý QA chỉ có header | BA/nội dung; đội chuẩn bị danh mục theo nguồn khi được giao |
| Quyền quản trị và vòng đời | Thiếu khôi phục Manager mất thiết bị, bảo vệ Manager cuối và sơ đồ trạng thái cuối cho bài, video, kết nối, thu tiền. | QA No.51/67/70/71; YK2 §5-1 | Tech Lead cho thiết kế bảo vệ; BA cho chính sách cần quyết định |
| Vận hành và dữ liệu | Thiếu OS/trình duyệt cuối, giới hạn hiệu năng, thời gian hoạt động, phạm vi sao lưu/thời hạn log và dữ liệu dùng thật được cho phép. | YK2 §9–11; QA No.24/29 | Tech Lead/QA/đội vận hành; không biến toàn bộ thành câu hỏi nghiệp vụ |
| Nghiệm thu và thương mại | Thiếu bản hợp đồng/SOW/báo giá độc lập, phiên bản báo giá28/10 hay29/10, AC cuối, lịch cuối, phê duyệt thay đổi/phát hành và người review. | QA No.34; bảo lưu No.50; YK2 §12–14 | Chủ dự án/đầu mối thương mại, QA và reviewer được chỉ định |

## Hai khác biệt còn giữ mở

- **REQ-0078 — Cơ chế trang kết nối và hạn dùng:** YK2 mô tả trang kết nối riêng của dịch vụ, hiệu lực 48 giờ và cấp lại khi hết hạn; SD-T18 nói không mở trang dịch vụ mà trực tiếp màn cho phép SNS. Chưa có quyết định khách giải nghĩa khác biệt cơ chế; không dùng lựa chọn Connect API trong tech spec để tự giải quyết. Bằng chứng: EV-0211;EV-0212;EV-0033.
- **REQ-0092 — Đường thao tác tài khoản công ty:** YK2 chức năng9-1 mô tả thao tác ở quản trị; KS/QA No.20 mô tả đăng nhập app riêng từng tài khoản; QA No.43 cập nhật lại dẫn No.66 cần chốt đường thao tác. SD-M18 trang33 mô tả dùng app nhưng không tự đóng No.66; không chọn thay khách. Bằng chứng: EV-0248;EV-0249;EV-0250;EV-0251;EV-0247;EV-0252;EV-0253.

## Bốn nội dung UNKNOWN

- **REQ-0020 — Điều kiện chuyển từ chưa dùng sang đang dùng:** Thiếu điều kiện và quyền thao tác ở từng trạng thái; tiếp tục QA No.52.
- **REQ-0126 — Khôi phục Manager khi mất thông tin đăng nhập:** Màn SD-M18 có liên kết quên mật khẩu nhưng không đủ giải quyết toàn bộ No.67; không tự đưa quy trình nội bộ thành yêu cầu.
- **REQ-0129 — Bộ trạng thái video, kết nối và thanh toán:** Không lấy enum từ DB/SCD để điền thiếu của khách.
- **REQ-0140 — Giờ hoạt động và sao lưu:** Đây là việc đội thiết kế và trình bày, không tạo Customer Q&A hoặc tự đặt SLA.

Đã kiểm đủ5 sheet QA: sheet góp ý thiết kế và sheet nội dung thông báo/email chỉ có tiêu đề. Có33 No. mở ở sheet chính và No.50 ở bảo lưu, tổng34 mục hiện có; xem [chỉ mục các mục mở](existing-open-items.csv). Không gửi lại các câu đó và không tạo lựa chọn hay câu hỏi mới trong đợt này.

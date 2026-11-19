# Flow Coverage Report — báo cáo bao phủ

Đã tái dựng **30 flow**, ghi **281 bước**, **118 nhánh** và **64 dòng chuyển trạng thái**. Đây là phân tích tài liệu, chưa chạy phần mềm/kiểm thử và chưa chứng minh các flow đủ triển khai.

## Phạm vi và ánh xạ

-13UC YK2 và19 trang flow của SD ngày18/11 được nối tại [source-flow-map.csv](source-flow-map.csv); không đổi nghĩa mã AG sang SD.
-175/175 dòng Requirement Register có disposition và liên kết flow; bao phủ đủ54 chức năng và67TR cũ thông qua REQ, không tạo requirement khách trùng. Các yêu cầu phi chức năng/tiến hành được ghi như điều kiện hỗ trợ/ngữ cảnh dự án; không biến chúng thành hành động sản phẩm mới.
- Các đề xuất thử thách/game và nhóm chức năng tương lai chỉ là ngữ cảnh hoặc nhánh đề xuất, không tham gia đường hoạt động được duyệt. Những capability UNKNOWN vẫn có điểm thiếu, không được gọi là đã dựng đủ chi tiết.
-90/90 BR có liên kết phù hợp nguồn dùng. Các BR chưa map tách riêng trong [rule-flow-map.csv](rule-flow-map.csv) để rà tiếp; không gán bừa theo tên module.
-84/84 scenario cũ được nối theo chức năng tại [legacy-scenario-map.csv](legacy-scenario-map.csv). Đây chỉ là tái sử dụng định danh, **không** xác nhận oracle hoặc kết quả thực thi của84 scenario.

## Phân biệt căn cứ bước

| Nhãn | Số bước |
|---|---|
| SOURCE_CONFIRMED | 81 |
| SOURCE_DESCRIBED | 96 |
| INFERENCE | 6 |
| UNDEFINED | 95 |
| CONFLICTED | 2 |
| SOURCE_PROPOSAL | 1 |

Nhãn C/D là bằng chứng về hành vi, không xác nhận toàn bộ thứ tự. Thứ tự tái dựng/điểm nối suy luận nêu tại sequence_basis. Bước U/X không được tự lấp bằng default hoặc dùng mũi tên Mermaid để vượt qua.

## Kiểm các trường hợp có liên quan

| Loại | Flow có phân tích nhánh liên quan | Số bản ghi tình huống |
|---|---|---|
| Hủy thao tác | FLOW-0001; FLOW-0003; FLOW-0004; FLOW-0005; FLOW-0006; FLOW-0007; FLOW-0008; FLOW-0009; FLOW-0011; FLOW-0012; FLOW-0013; FLOW-0014; FLOW-0015; FLOW-0016; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0024; FLOW-0025; FLOW-0026 | 21 |
| Thao tác thất bại | FLOW-0001; FLOW-0002; FLOW-0003; FLOW-0004; FLOW-0005; FLOW-0006; FLOW-0007; FLOW-0008; FLOW-0009; FLOW-0010; FLOW-0011; FLOW-0013; FLOW-0014; FLOW-0015; FLOW-0016; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0021; FLOW-0022; FLOW-0023; FLOW-0024; FLOW-0025; FLOW-0026; FLOW-0027; FLOW-0028; FLOW-0029; FLOW-0030 | 31 |
| Quá thời hạn | FLOW-0001; FLOW-0002; FLOW-0004; FLOW-0007; FLOW-0010; FLOW-0012; FLOW-0013; FLOW-0015; FLOW-0016; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0021; FLOW-0022; FLOW-0023; FLOW-0025; FLOW-0026; FLOW-0028; FLOW-0029; FLOW-0030 | 22 |
| Hành động đồng thời | FLOW-0001; FLOW-0004; FLOW-0005; FLOW-0006; FLOW-0007; FLOW-0008; FLOW-0009; FLOW-0010; FLOW-0011; FLOW-0013; FLOW-0014; FLOW-0015; FLOW-0016; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0021; FLOW-0022; FLOW-0023; FLOW-0024; FLOW-0025; FLOW-0026; FLOW-0027; FLOW-0028 | 25 |
| Trạng thái thay đổi | FLOW-0002; FLOW-0003; FLOW-0004; FLOW-0005; FLOW-0006; FLOW-0007; FLOW-0008; FLOW-0009; FLOW-0010; FLOW-0011; FLOW-0012; FLOW-0013; FLOW-0014; FLOW-0015; FLOW-0016; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0021; FLOW-0022; FLOW-0023; FLOW-0024; FLOW-0025; FLOW-0026; FLOW-0027; FLOW-0028; FLOW-0029; FLOW-0030 | 31 |
| Dịch vụ ngoài không phản hồi | FLOW-0001; FLOW-0003; FLOW-0004; FLOW-0005; FLOW-0006; FLOW-0007; FLOW-0009; FLOW-0010; FLOW-0011; FLOW-0012; FLOW-0013; FLOW-0014; FLOW-0015; FLOW-0016; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0021; FLOW-0022; FLOW-0023; FLOW-0025; FLOW-0026; FLOW-0027; FLOW-0028; FLOW-0029 | 26 |
| Thử lại | FLOW-0001; FLOW-0002; FLOW-0003; FLOW-0004; FLOW-0005; FLOW-0006; FLOW-0009; FLOW-0011; FLOW-0013; FLOW-0014; FLOW-0015; FLOW-0017; FLOW-0018; FLOW-0019; FLOW-0021; FLOW-0022; FLOW-0023; FLOW-0024; FLOW-0025; FLOW-0026; FLOW-0027; FLOW-0028 | 25 |
| Dừng/tiếp tục | FLOW-0002; FLOW-0003; FLOW-0004; FLOW-0010; FLOW-0011; FLOW-0012; FLOW-0013; FLOW-0014; FLOW-0018; FLOW-0019; FLOW-0020; FLOW-0024; FLOW-0025; FLOW-0026; FLOW-0028; FLOW-0029; FLOW-0030 | 17 |

Một nhánh có thể liên quan nhiều loại (ví dụ timeout và không phản hồi); các số không phải số yêu cầu/defect độc lập. [scenarios.csv](scenarios.csv) nêu điều kiện áp dụng, giới hạn kết luận và bên xử lý. Chưa có quyết định đẩy mọi nhánh cho khách.

Ví dụ giữ khoảng trống có kiểm soát:

- Hủy biểu mẫu không tự trở thành yêu cầu lưu nháp/xóa dữ liệu. Đóng app khi tạo video được nguồn cho phép; đóng app lúc upload không tự có cùng hành vi.
- Dịch vụ không phản hồi khác với trả lỗi rõ; không suy bài chưa đăng/tiền chưa thu/video chưa tạo rồi tự gửi lại.
- Duyệt hết hạn có quy tắc không đăng; quá hạn trả lời dự án không tự trở thành phê duyệt.
- Hai Manager/chỉ thị/đơn giá thay đổi giữa xử lý được ghi U nếu nguồn chưa phân xử; không lấy luật ghi cuối thắng hoặc ai bấm đầu thắng để lấp.
- Dừng/mở đăng không đồng nhất rời dịch vụ; mở lại không tự khôi phục lịch đã hủy.
- Hủy xem thống kê không mở thêm yêu cầu hủy job thống kê. Flow category chưa có phụ thuộc ngoài bắt buộc nên không tự tạo timeout dịch vụ. Flow bàn giao dự án không áp máy trạng thái cạnh tranh request như một API.

## Các điểm chưa khép kín

Có 97 bản ghi U/X ở cấp bước trong [flow-gaps.csv](flow-gaps.csv). Nhiều bản ghi cùng liên quan một No./REQ/MISS/RV cũ; **không** coi là97 vấn đề độc lập đã xác minh hoặc câu hỏi khách mới. Chưa thực hiện G4/G5.

- Đăng tự động: ghép tư liệu, nhịp, hết kỳ, duyệt/từ cấm, đổi/dừng giữa kỳ — No.70/71.
- Ngày/giờ đăng và nhánh sau sửa/trả/lỗi/hủy — No.51/56/57/58/59/60/61/77.
- Người phụ trách/fallback, chat/thử thách/giờ nhắn, email và hồ sơ — No.6/54/72/73/74/75/76.
- Chu kỳ/đơn giá/thu lỗi và tài khoản công ty — No.2/4/49/53/62/63/66.
- Rời dịch vụ/đăng ký lại/xóa nhiều kho và khôi phục Manager — No.65/67/69.

Các dòng source-confirmed vẫn có thể thiếu hợp đồng lỗi/kết quả ngoài. Xác định giải pháp kỹ thuật là việc đội/provider khi không làm đổi chính sách; chỉ phần hành vi/thẩm quyền/phạm vi chưa chốt mới cần đầu mối nghiệp vụ quyết định ở giai đoạn được giao.

## Giới hạn và gate

Phạm vi “toàn bộ” ở đây là175 REQ đã trích và các flow tương ứng nguồn hiện có; **không tuyên bố toàn bộ nghiệp vụ đã được khách định nghĩa**. Chưa có bảng trạng thái cuối cho video/SNS/thu tiền và trạng thái tổng bài; không dùng enum nội bộ. Hình chỉ được kiểm trực quan ở các trang ghi trong snapshot, không tuyên bố kiểm mọi connector. Nguồn lịch sử không được phục hồi thành yêu cầu hiện hành.

G1/G2 trước đó chưa ký; hồ sơ G3 này đã chuẩn bị theo lệnh người dùng nhưng chưa có người duyệt độc lập/đầu vào được thông qua. G3 ghi BLOCKED, không PASS và không xác nhận sẵn sàng triển khai. G4–G8 chưa thực hiện. Các file reviews/findings/customer-decisions/baselines giữ nguyên; không tạo Q&A, không đóng No. cũ.

Đầu ra nội dung chính:30 đặc tả Markdown và state-transitions.csv; steps/scenarios/maps/index/report là các bảng chiếu cùng đợt để tra cứu, không phải kho yêu cầu/phê duyệt mới. Khi sửa phải ra phiên bản đợt mới hoặc đồng bộ toàn bộ bảng chiếu và manifest.

Kiểm cơ học bằng `python3 docs/requirement-review/validate.py`, validator extraction hiện có và [validate_flows.py](validate_flows.py). Kết quả cơ học không thay review/nghiệm thu/gate.

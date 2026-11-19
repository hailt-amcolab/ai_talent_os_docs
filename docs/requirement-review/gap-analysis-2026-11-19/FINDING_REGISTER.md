# Finding Register — Gap & Conflict Analysis 19/11/2026

Bản phân tích của tác giả, chưa ký G4 và chưa review độc lập G5. Không phải danh sách lỗi thực tế hoặc Customer Q&A.

Sổ metadata chính: [findings.csv](../registers/findings.csv). Nội dung đầy đủ tám mục: [finding-details.csv](finding-details.csv); từng ID dưới đây là cùng hồ sơ, không phải requirement mới. Mã giữ theo [finding-keys.json](finding-keys.json), không đổi khi đổi loại/trạng thái.

| ID | Loại | Phát hiện | ID cũ | Cần hỏi khách |
|---|---|---|---|---|
| [FND-0001](findings/FND-0001.md) | MISSING_RULE | Vòng đời kỳ đăng tự động chưa đủ quy tắc | RV-13;L22-07 | FOLLOW_EXISTING |
| [FND-0002](findings/FND-0002.md) | AMBIGUITY | Quan hệ chế độ đăng, duyệt bài và kiểm từ cấm còn nhiều cách hiểu | RV-05;RV-13;B5;L22-08 | FOLLOW_EXISTING |
| [FND-0003](findings/FND-0003.md) | MISSING_FLOW | Đường xử lý sau bài bị từ cấm chưa khép kín | RV-05;B5 | FOLLOW_EXISTING |
| [FND-0004](findings/FND-0004.md) | UNDEFINED_STATE | Chưa có trạng thái tổng bài đầy đủ sau hai chế độ và kết quả từng SNS | RV-03;S10-01 | FOLLOW_EXISTING |
| [FND-0005](findings/FND-0005.md) | MISSING_RULE | Gửi duyệt lại chưa xác định quan hệ bài cũ/bài mới và giờ đăng | RV-04;L22-11 | FOLLOW_EXISTING |
| [FND-0006](findings/FND-0006.md) | MISSING_RULE | Giờ được chốt khi nào và bài đến muộn chưa rõ | RV-02;S06-03 | FOLLOW_EXISTING |
| [FND-0007](findings/FND-0007.md) | MISSING_FLOW | Đường đặt lịch lại khi đăng lỗi chưa đủ hành vi | RV-03;RV-20;S06-04;S06-05 | FOLLOW_EXISTING |
| [FND-0008](findings/FND-0008.md) | MISSING_RULE | Dừng/hủy/mở lại chưa có phạm vi và kết quả trọn vẹn | RV-19;L22-09 | FOLLOW_EXISTING |
| [FND-0009](findings/FND-0009.md) | AMBIGUITY | Phân tuyến duyệt và fallback chưa được chọn dứt điểm | RV-26;L22-02 | FOLLOW_EXISTING |
| [FND-0010](findings/FND-0010.md) | MISSING_RULE | Chưa có tiêu chí hồ sơ đủ để AI bắt đầu tạo nháp | RV-15;RV-16;S01-01;S02-07 | FOLLOW_EXISTING |
| [FND-0011](findings/FND-0011.md) | UNDEFINED_STATE | Chưa xác định điều kiện chuyển sang đang sử dụng | RV-15;S01-01 | FOLLOW_EXISTING |
| [FND-0012](findings/FND-0012.md) | MISSING_FLOW | M-20 đã có nhưng hợp đồng nhập hồ sơ chưa hoàn chỉnh | RV-31;L22-16 | FOLLOW_EXISTING |
| [FND-0013](findings/FND-0013.md) | MISSING_RULE | Chi tiết nhiều category và thay chỉ thị đối với nội dung đã tạo chưa rõ | RV-11;L22-03 | CONDITIONAL_AFTER_TEAM |
| [FND-0014](findings/FND-0014.md) | MISSING_RULE | Nội dung hạn chế hội thoại chưa đủ một cách hiểu | RV-21;S03-02;S03-03 | FOLLOW_EXISTING |
| [FND-0015](findings/FND-0015.md) | MISSING_RULE | Giờ các khung và ngưỡng nhắc chưa chốt | RV-14;S03-05;S03-06 | FOLLOW_EXISTING |
| [FND-0016](findings/FND-0016.md) | MISSING_RULE | Thử thách thiếu tiêu chí hoàn thành và vòng đời kiểm được | RV-14;B12;L22-06 | FOLLOW_EXISTING |
| [FND-0017](findings/FND-0017.md) | MISSING_RULE | Cách tính số ngày đăng liên tiếp được để lại cho vận hành | RV-14;RV-23;B12 | FOLLOW_EXISTING_DEFERRED |
| [FND-0018](findings/FND-0018.md) | MISSING_RULE | Đơn giá và giá áp dụng khi thay giữa kỳ chưa chốt | RV-06;RV-07;S08-06 | FOLLOW_EXISTING |
| [FND-0019](findings/FND-0019.md) | MISSING_EXCEPTION | Không phản hồi khi tạo video chưa có chính sách tài chính đầy đủ | RV-07;S05-08 | FOLLOW_EXISTING |
| [FND-0020](findings/FND-0020.md) | EXTERNAL_DEPENDENCY | Cổng chính thức và khả năng thu theo yêu cầu còn chờ | RV-06;RV-32;S08-02;L23-14 | FOLLOW_EXISTING |
| [FND-0021](findings/FND-0021.md) | MISSING_RULE | Mốc bắt đầu, ranh giới kỳ và kết thúc kỳ thu chưa rõ | RV-06;RV-15;S08-02 | FOLLOW_EXISTING |
| [FND-0022](findings/FND-0022.md) | UNDEFINED_STATE | Manager dừng do chưa thanh toán chưa có trạng thái/chính sách đủ | RV-06;RV-24;S08-02 | FOLLOW_EXISTING |
| [FND-0023](findings/FND-0023.md) | CONFLICT | Đường thao tác office và thông tin tài khoản còn khác nhau | RV-08;A1;L23-02 | FOLLOW_EXISTING |
| [FND-0024](findings/FND-0024.md) | MISSING_RULE | Đăng ký lại cùng email và đối tượng xóa sau nghỉ chưa chốt | RV-24;L22-14 | FOLLOW_EXISTING |
| [FND-0025](findings/FND-0025.md) | MISSING_RULE | Tạo nháp hằng ngày từ video tự làm chưa được chọn | RV-13;RV-25;S05-03 | FOLLOW_EXISTING |
| [FND-0026](findings/FND-0026.md) | MISSING_RULE | Thời hạn nháp/chủ đề và tư liệu cũ đang dùng chưa đủ | RV-25;L23-10 | FOLLOW_EXISTING |
| [FND-0027](findings/FND-0027.md) | EXTERNAL_DEPENDENCY | Bộ dữ liệu kết quả cần chốt theo khả năng tài khoản thật | RV-18;RV-23;L22-13 | CONDITIONAL_AFTER_PROVIDER |
| [FND-0028](findings/FND-0028.md) | MISSING_RULE | Email cho Manager đã được yêu cầu nhưng thiếu phạm vi | RV-26;L22-02 | FOLLOW_EXISTING |
| [FND-0029](findings/FND-0029.md) | AMBIGUITY | Đã xử lý là theo người hay dùng chung chưa rõ đầy đủ | RV-26;L22-02 | CONDITIONAL_AFTER_TEAM |
| [FND-0030](findings/FND-0030.md) | MISSING_FLOW | Khôi phục Manager và bảo vệ quyền quản trị cuối chưa chốt | RV-27;S01-07 | FOLLOW_EXISTING |
| [FND-0031](findings/FND-0031.md) | MISSING_EXCEPTION | Đơn chờ, mật khẩu tạm hết hạn và cấp lại thiếu chính sách | RV-27;S01-07 | FOLLOW_EXISTING |
| [FND-0032](findings/FND-0032.md) | EXTERNAL_DEPENDENCY | Thiếu bản hiệu lực để xác nhận phạm vi thương mại/phát hành | RV-12;RV-32;L23-05;L23-14 | FOLLOW_EXISTING |
| [FND-0033](findings/FND-0033.md) | AMBIGUITY | Trang kết nối, luồng SNS trực tiếp và thời hạn cần đối chiếu | RV-17;L23-06 | CONDITIONAL_AFTER_TEAM |
| [FND-0034](findings/FND-0034.md) | TECHNICAL_ONLY | Đối soát kết quả ngoài, chống lặp và đồng thời là việc đội tích hợp | RV-20;RV-21;L22-12;L23-08 | NO_TECHNICAL_ONLY |
| [FND-0035](findings/FND-0035.md) | TECHNICAL_ONLY | Snapshot, xung đột ghi file và phục hồi gửi/tạo tài nguyên thuộc thiết kế đội | RV-16;RV-20;RV-25;S02-07 | NO_TECHNICAL_ONLY |
| [FND-0036](findings/FND-0036.md) | TECHNICAL_ONLY | Hủy biểu mẫu, validation và lỗi trình bày cần đội thiết kế | RV-31;L22-16 | NO_TECHNICAL_ONLY |
| [FND-0037](findings/FND-0037.md) | TECHNICAL_ONLY | Giờ vận hành, backup, retention log và phục hồi là phần đội đề xuất | RV-28;RV-33;S01-09;L23-11 | NO_TECHNICAL_ONLY |
| [FND-0038](findings/FND-0038.md) | TECHNICAL_ONLY | Điều kiện tài khoản và tham số tích hợp cần kiểm với bên cung cấp | RV-17;RV-18;RV-28;RV-32;L23-14 | NO_BUSINESS_QUESTION_TECH_INPUTS |
| [FND-0039](findings/FND-0039.md) | ALREADY_ANSWERED | Đã chốt AI viết lại tối đa2 lần và Talent được sửa tay | RV-01;L23-01 | NO_ALREADY_ANSWERED |
| [FND-0040](findings/FND-0040.md) | ALREADY_ANSWERED | Đã bỏ trần số bài/ngày vì chi phí | RV-02;S06-03 | NO_ALREADY_ANSWERED |
| [FND-0041](findings/FND-0041.md) | ALREADY_ANSWERED | Đã xác nhận Manager xem hội thoại và báo trước Talent | RV-09;L23-03 | NO_ALREADY_ANSWERED |
| [FND-0042](findings/FND-0042.md) | ALREADY_ANSWERED | Đã chốt giữ6 tháng và không bật lại Talent đã nghỉ | RV-24;L22-14 | NO_ALREADY_ANSWERED |
| [FND-0043](findings/FND-0043.md) | ALREADY_ANSWERED | Đã thu hẹp đăng thay chỉ office và quyết toán video nội bộ | RV-08;L23-02 | NO_ALREADY_ANSWERED |
| [FND-0044](findings/FND-0044.md) | ALREADY_ANSWERED | Đã chốt1 tài khoản mỗi SNS và unit là office | RV-17;L23-06 | NO_ALREADY_ANSWERED |
| [FND-0045](findings/FND-0045.md) | ALREADY_ANSWERED | Đã chốt thứ tự3 cấp, thử/lưu và quay bản | RV-11;L22-03 | NO_ALREADY_ANSWERED |
| [FND-0046](findings/FND-0046.md) | ALREADY_ANSWERED | Đã quyết có hai chế độ và Talent tự chọn | RV-13;L22-07 | NO_ALREADY_ANSWERED |
| [FND-0047](findings/FND-0047.md) | ALREADY_ANSWERED | Đã xác nhận mục tiêu follower theo từng SNS | RV-22;L23-09 | NO_ALREADY_ANSWERED |

## Cách dùng

1. Đọc FACT, INFERENCE, phần còn thiếu và EV tại finding; xem nguyên ô/đoạn theo đúng phiên bản/hash trong sổ evidence.
2. Theo mã Q&A cũ được chỉ rõ; không soạn hoặc gửi câu hỏi ở bước này. CONDITIONAL_AFTER_TEAM/PROVIDER cần đội/provider kiểm trước; FOLLOW_EXISTING_DEFERRED giữ thời điểm khách đã hẹn.
3. TECHNICAL_ONLY giao đội/Tech Lead. ALREADY_ANSWERED chỉ đóng đúng ý có bằng chứng, không đóng toàn bộ RV/flow.
4. Người độc lập đọc lại nguồn, ghi review có phản biện rồi Tech Lead/người được giao duyệt gate; không dùng PASS script làm phê duyệt nghiệp vụ.

Xem [báo cáo phân tích](ANALYSIS_REPORT.md) và [đối chiếu 97 ứng viên](candidate-audit.csv).

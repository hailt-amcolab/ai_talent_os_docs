# Báo cáo phản biện Finding Register — 19/11/2026

Phạm vi: FND-0001–FND-0047 của đợt Gap & Conflict Analysis 19/11/2026; giữ nguyên Finding ID và bản Analyst. Người thực hiện: Codex, reviewer AI theo chỉ định tại tác vụ này. Đây là báo cáo review riêng, không phải phê duyệt khách hoặc ký G5 bằng người.

Đã đọc catalog/quy trình, mở nguồn QA/KS/GJ/YK2 và định nghĩa màn 18/11, đọc Business Flow trước khi mở Finding Register. Trích xuất lại từ DOCX/XLSX/PDF gốc, kiểm 12 hash nguồn; đối chiếu 5 sheet QA (hai sheet góp ý thiết kế/nội dung thông báo chỉ có tiêu đề ở snapshot này), KS, GJ, workbook15 và tracking nội bộ. Review nghiệp vụ tập trung sáu nguồn hiện hành QA/KS/GJ/YK2/SD-T18/SD-M18; không tuyên bố đã kiểm nghiệp vụ hoặc đọc mọi hình của cả 12 tài liệu.

## Kết quả

| Kết quả | Số finding | Điều kiện tiếp theo |
|---|---:|---|
| ACCEPT | 10 | Ứng viên tiếp tục No. cũ sau khi đủ gate; chưa tự chạy G6. |
| REWRITE | 16 | Analyst sửa finding, lưu phiên bản/hash mới, reviewer kiểm lại. |
| REJECT | 20 | Loại khỏi câu hỏi khách; giữ việc nội bộ/đầu vào hoặc quyết định đã có. |
| NEED_MORE_EVIDENCE | 1 | Bổ sung ví dụ/phương án và chứng minh cần thẩm quyền khách. |

**226/226 lượt trích dẫn**: nguồn tồn tại, hash đúng, vị trí tồn tại, trích đoạn EV khớp nội dung mở lại. Điều này chỉ xác nhận trích dẫn; không xác nhận suy luận Analyst đúng. [Evidence audit](evidence-audit.csv) giữ nguyên văn tại mỗi locator, checker và ngày. [Source snapshot](source-snapshot.json) định danh đúng phiên bản.

Đã xem trực quan SD-T18 p23 và SD-M18 p23/p32/p33. Chưa tự kiểm trực quan hình5-1 YK2; vì vậy FND-0004 chỉ dùng văn bản P504–507 về sáu trạng thái và kết quả từng SNS, không xác nhận từng connector trong hình. Các trang khác dùng mô tả chữ/ô nguồn; không suy từ ảnh minh họa tên/số tạm.

## Những phản biện ảnh hưởng việc viết Q&A

- FND-0007: màn18/11 đã có đường đặt lịch lại. Chỉ còn đích SNS/giờ, không hỏi lại thao tác như chưa được mô tả.
- FND-0010/0012: tiêu chí hồ sơ đủ chỉ quản lý tại FND-0010; FND-0012 còn danh sách trường M-20, không đặt lại lựa chọn “có cần màn mới”.
- FND-0017: GJ đã mô tả ngày có ít nhất một bài; phần reset được hẹn vận hành. Không biến trì hoãn có chủ đích thành yêu cầu khách trả lời ngay.
- FND-0019/0020/0027/0029/0032/0033: chưa đủ căn cứ chuyển thành quyết định requirement của khách. Giữ lần lượt việc đối soát, nhận đầu vào cổng, kiểm số liệu, thiết kế cộng tác, thu thập văn bản và làm rõ trải nghiệm kết nối cho đúng bên xử lý.
- FND-0023: SD-M18 p9/p33 đã mô tả office cùng danh sách, Manager đăng nhập app và nối SNS. Phải dùng mô tả hiện hành để giải quyết khác biệt, không tự đóng No.66 và không hỏi như chưa nhận bản màn.
- FND-0039–0047: các ý có nguồn quyết định không hỏi lại; REJECT ở đây là loại khỏi câu hỏi khách, không bác bỏ giá trị của bản ghi “đã trả lời”.

## Ranh giới chống trùng

| Nhóm | Nơi giữ quyết định chính | Phần dẫn chiếu |
|---|---|---|
| Kỳ / duyệt / từ cấm / dừng | 0001 / 0002 / 0003 / 0008 | Không hỏi một thao tác dừng hay gate hai lần |
| Hồ sơ / M-20 / trạng thái / phí | 0010 / 0012 / 0011 / 0021 | Tiêu chí đủ hồ sơ chỉ ở0010; ngày bắt đầu phí chỉ ở0021 |
| Quá giờ / duyệt lại / đăng lại / trạng thái bài | 0006 / 0005 / 0007 / 0004 | Tái dùng quy tắc giờ, không hỏi enum hoặc ID kỹ thuật |
| Đơn giá / timeout video | 0018 / 0034 | 0019 không phát sinh chính sách mới; thời điểm điều chỉnh tiếp tục No.62 |
| Thử thách / ngày liên tiếp | 0016 / 0017 | No.72(1)(2) khác No.72(3), tôn trọng mốc vận hành |
| Nghỉ / nộp lại sau từ chối / dừng vì nợ | 0024 / 0031 / 0022 | Ba điều kiện khác nhau, không phục hồi trạng thái cũ để lấp thiếu |
| Dữ liệu SNS / điều kiện tích hợp | 0038 | Công việc kiểm chứng0027 gộp vào kỹ thuật;0033 theo UP-Q02 |

## Review theo từng Finding ID

Mỗi mục dưới ghi kết luận, nguồn phản biện và phần được phép giữ. Tám phép kiểm của người dùng được lưu thành cột riêng tại [review-results.csv](review-results.csv); nội dung gốc Analyst và hash liên kết ở từng dòng. ACCEPT chỉ áp dụng đúng phần được giữ, không xác nhận toàn flow/RV/No.

### FND-0001 — REWRITE: Vòng đời kỳ đăng tự động chưa đủ quy tắc

**Phản biện/kết luận:** Khoảng trống kỳ đăng có thật, nhưng nhịp tạo bài và tạo trước/hằng ngày đang thuộc phương án FutureCore phải đề xuất; không giao toàn bộ lựa chọn triển khai cho khách.

**Nguồn đối chiếu:** GJ 合意事項 §1, アクション7; SD-T18 p12 T-08, p23; QA Q&A!E70:I70. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Chỉ giữ ghép/tái dùng tư liệu, kết quả khi hết tư liệu, đổi/kết thúc kỳ có tác động người dùng. FutureCore đưa phương án nhịp tạo trước khi yêu cầu khách chọn.

**Q&A hiện có:** No.70. **Chống trùng:** Dừng vận hành chung thuộc FND-0008; quan hệ chế độ/duyệt thuộc FND-0002.

**Bên xử lý:** FutureCore/BA lập phương án; khách chốt phần hành vi. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0002 — ACCEPT: Quan hệ chế độ đăng, duyệt bài và kiểm từ cấm còn nhiều cách hiểu

**Phản biện/kết luận:** SD-T18 mô tả cần kiểm tra trước từng bài, nhưng chưa giải thích đầy đủ bài công việc và từ cấm trên đường tự động. Các quy tắc riêng không đủ xác định tổ hợp. No.71 vẫn Open, chưa có phản hồi.

**Nguồn đối chiếu:** KS 確認事項!F59:I59,F61:I61,F74:I75; SD-T18 p12 T-08,p14 T-10,p23; QA Q&A!E71:I71. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ quyết định về quan hệ hai lựa chọn và hàng rào duyệt/từ cấm trong chế độ tự động; không hỏi lại có hai chế độ.

**Q&A hiện có:** No.71. **Chống trùng:** FND-0003 chỉ sở hữu bước sửa sau bị chặn; FND-0001 chỉ sở hữu vòng đời kỳ.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0003 — ACCEPT: Đường xử lý sau bài bị từ cấm chưa khép kín

**Phản biện/kết luận:** Manager sửa bài bị chặn đã được nêu; quyền sửa tay chung của Talent không trả lời quyền sửa đúng loại bài bị chặn hay việc xác nhận lại bản Manager sửa. Đề xuất xem sửa là đã duyệt ở No.57 chưa có câu trả lời.

**Nguồn đối chiếu:** YK2 §6-6 chức năng4-4 P705; KS F59:I59,F64:I64; SD-M18 p14 M-11; QA Q&A!E57:I57,E71:I71. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ quyền sửa và điều kiện quay về duyệt/đặt lịch sau sửa; quá giờ dẫn về FND-0006, không lặp câu.

**Q&A hiện có:** No.57; No.71 (chỉ giao điểm). **Chống trùng:** Không đếm lại quy tắc từ cấm trên đường tự động của FND-0002.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0004 — REWRITE: Chưa có trạng thái tổng bài đầy đủ sau hai chế độ và kết quả từng SNS

**Phản biện/kết luận:** No.51 giao AMCOLAB cập nhật danh sách trạng thái; nguồn đã yêu cầu lưu kết quả theo từng SNS. Thiếu enum/sơ đồ nội bộ không tự là quyết định khách.

**Nguồn đối chiếu:** YK2 §5-1 P504–507, §6-10 chức năng8-3 P748; QA Q&A!H51:I51; SD-T18 p18 T-14; SD-M18 p11 M-08. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đội lập bảng trạng thái và cách tổng hợp trước; chỉ giữ nhãn người dùng thấy và thao tác khi một phần SNS thành công/chưa rõ. Không hỏi khách thiết kế enum.

**Q&A hiện có:** No.51; No.59. **Chống trùng:** Đích đăng lại thuộc FND-0007; vòng đời kỳ thuộc FND-0001.

**Bên xử lý:** BA/Tech Lead lập bảng; khách xác nhận ý nghĩa có tác động. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0005 — REWRITE: Gửi duyệt lại chưa xác định quan hệ bài cũ/bài mới và giờ đăng

**Phản biện/kết luận:** Gửi duyệt lại đã được xác nhận, SD-M18 p8 mô tả rõ Talent sửa rồi xin duyệt lại. Cùng ID hay tạo ID mới là thiết kế; chỉ lịch sử người dùng thấy, bản nội dung được duyệt và giờ mới là quyết định nghiệp vụ.

**Nguồn đối chiếu:** KS 確認事項!F78:I78; QA Q&A!H36:I36,E58:I58; SD-M18 p8 M-05. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Bỏ yêu cầu khách chọn quan hệ ID/bản ghi; giữ lịch sử duyệt, hiệu lực duyệt trên bản sửa và quy tắc giờ sau trả lại.

**Q&A hiện có:** No.58. **Chống trùng:** Quy tắc quá giờ dùng chung FND-0006, dẫn chiếu thay vì hỏi lặp.

**Bên xử lý:** BA chuẩn bị hành vi; đội chọn định danh. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0006 — ACCEPT: Giờ được chốt khi nào và bài đến muộn chưa rõ

**Phản biện/kết luận:** Khách đã giao AI chọn giờ theo chỉ thị và bỏ trần bài/ngày, nhưng điều đó không xác định xử lý bài thứ hai hoặc tư liệu đến sau giờ. No.56 còn câu hỏi rõ và chưa được trả lời.

**Nguồn đối chiếu:** KS 確認事項!I66,I86; GJ 合意事項 §1,§7; QA Q&A!E56:I56; YK2 P780–781. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ mốc chốt giờ và quy tắc bài sau/tư liệu muộn; không hỏi lại số bài tối đa.

**Q&A hiện có:** No.56. **Chống trùng:** Là nơi chính cho quy tắc quá giờ được FND-0003/0005/0007 dẫn tới.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0007 — REWRITE: Đường đặt lịch lại khi đăng lỗi chưa đủ hành vi

**Phản biện/kết luận:** SD-T18 p18 đã mô tả nút mở T-10, Talent chấp nhận lại và hệ thống đặt giờ mới; Manager cũng đặt lại được. Không còn căn cứ nói thiếu toàn bộ thao tác/kết quả. Đích SNS và cách chọn giờ vẫn chưa rõ.

**Nguồn đối chiếu:** SD-T18 p18 T-14 mục5 và tiền đề; SD-M18 p11 M-08; YK2 P755; QA Q&A!E59:I59. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Thu hẹp thành đăng lại SNS lỗi hay tất cả và quy tắc giờ mới. Ghi nhận đường thao tác đã có trong bản màn, chưa coi đó là khách trả lời toàn No.59.

**Q&A hiện có:** No.59. **Chống trùng:** Chống lặp kỹ thuật ở FND-0034; giờ quá hạn ở FND-0006.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0008 — REWRITE: Dừng/hủy/mở lại chưa có phạm vi và kết quả trọn vẹn

**Phản biện/kết luận:** Các đường dừng/hủy đã được mô tả. Hủy lịch và không phục hồi sau mở lại vẫn mang 要確認 ở SD-M18 p32, không được đóng; song scope hiện tại gộp ba quyết định và việc đối soát kỹ thuật.

**Nguồn đối chiếu:** KS F84:I85; SD-M18 p19 M-16,p32; QA Q&A!E60:I61,E77:I77. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ từng phần riêng theo No.60 (bài mới trong lúc dừng), No.61 (báo/hủy và dùng lại), No.77 (phạm vi dừng cả kỳ). Đối soát hủy chuyển đội.

**Q&A hiện có:** No.60; No.61; No.77. **Chống trùng:** Dừng/đổi kỳ do Talent thuộc FND-0001; không tạo câu lặp cho cùng thao tác.

**Bên xử lý:** BA tách quyết định; đội kiểm kết quả hủy; khách chốt chính sách. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0009 — ACCEPT: Phân tuyến duyệt và fallback chưa được chọn dứt điểm

**Phản biện/kết luận:** Quyết định chuyển khỏi gửi mọi Manager là có thật; KS và SD vẫn giữ lựa chọn category hoặc người phụ trách. Quyền xem chung không chứng minh quyền xử lý/nhận duyệt; No.6 chưa chốt fallback.

**Nguồn đối chiếu:** KS 確認事項!G77:I77,G93:H93; SD-M18 p5 M-02,p13 M-10; QA Q&A!E7:I7. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Chỉ hỏi cách phân công cuối và người nhận/xử lý khi chưa có/vắng phụ trách; không hỏi lại quyền xem mọi Talent.

**Q&A hiện có:** No.6. **Chống trùng:** FND-0028 dùng cùng phân công, không quyết lại tuyến nhận email.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0010 — ACCEPT: Chưa có tiêu chí hồ sơ đủ để AI bắt đầu tạo nháp

**Phản biện/kết luận:** M-20 có nút lưu nhưng các trường còn 要確認; lưu file không chứng minh hồ sơ đã đủ để AI tạo bài. No.54 chưa có câu trả lời.

**Nguồn đối chiếu:** KS 確認事項!F9,F15; SD-M18 p23 M-20,p30; QA Q&A!E54:I54. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ tiêu chí nghiệp vụ hồ sơ hoàn tất và người xác nhận. Cách kiểm file/thiết kế nút do đội đề xuất.

**Q&A hiện có:** No.54. **Chống trùng:** Là finding chính cho tiêu chí đủ; bỏ phần này khỏi FND-0012. Khác FND-0011 về trạng thái sử dụng.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0011 — REWRITE: Chưa xác định điều kiện chuyển sang đang sử dụng

**Phản biện/kết luận:** YK2 P616 đã nêu Manager chọn trạng thái; KS và SD đã nêu đăng ký thanh toán xong dùng AI, chưa có hồ sơ thì chưa tạo bài. Nói quyền của Talent trước khởi tạo chưa xác định toàn bộ là quá rộng.

**Nguồn đối chiếu:** YK2 §6-2 chức năng7-3 P615–617; KS F9,F36; SD-T18 p8 T-04; QA Q&A!E52:I53. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ quan hệ giữa chuyển trạng thái bằng tay đã mô tả với đề xuất tự chuyển và mốc trạng thái hiển thị. Không hỏi lại điều kiện dùng AI/tạo nháp đã có.

**Q&A hiện có:** No.52. **Chống trùng:** Ngày tính phí thuộc FND-0021; hồ sơ đủ thuộc FND-0010.

**Bên xử lý:** BA đối chiếu trạng thái; khách chốt quan hệ sự kiện. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0012 — REWRITE: M-20 đã có nhưng hợp đồng nhập hồ sơ chưa hoàn chỉnh

**Phản biện/kết luận:** M-20 p23 và flow p30 đã mô tả hai đường nhập, lưu OneDrive và lịch sử; nghĩa hồ sơ đủ đang trùng FND-0010. No.74 còn dùng tiền đề cũ chưa có màn.

**Nguồn đối chiếu:** SD-M18 p23 M-20,p30; KS I30; QA Q&A!E74:I74,E54:I54. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ xác nhận danh sách trường trên M-20 và phạm vi màn theo nguồn 18/11; bỏ hỏi chọn ChatGPT hay thêm màn như chưa có M-20. Tiêu chí đủ chỉ dẫn FND-0010; đồng bộ do đội.

**Q&A hiện có:** No.74 (cập nhật bối cảnh); No.54 dẫn chiếu. **Chống trùng:** Trùng một phần FND-0010; kỹ thuật hai đường ghi thuộc FND-0035.

**Bên xử lý:** BA/FutureCore cập nhật nội dung; khách xác nhận trường/phạm vi. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0013 — NEED_MORE_EVIDENCE: Chi tiết nhiều category và thay chỉ thị đối với nội dung đã tạo chưa rõ

**Phản biện/kết luận:** Nhiều category là tình huống có cơ sở, nhưng chưa có ví dụ hai chỉ thị xung đột hoặc phương án FutureCore để chứng minh còn một quyết định thuộc khách. YK2 đã nêu phản ánh từ sáng hôm sau; không mặc định phải hồi tố bài đã tạo.

**Nguồn đối chiếu:** YK2 §7-5 P821; KS F28:I29; SD-M18 p17 M-14,p18 M-15,p30. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** FutureCore trình quy tắc hợp nhất cùng cấp, ví dụ đầu vào/đầu ra và ảnh hưởng lịch/bài đang có; chứng minh phần nào vượt thiết kế được giao. Chưa đủ để hỏi khách.

**Q&A hiện có:** Chưa có No. riêng; không tạo trước khi đủ bằng chứng. **Chống trùng:** Không hỏi lại thứ tự ba cấp của FND-0045; xung đột ghi file thuộc FND-0035.

**Bên xử lý:** FutureCore/Tech Lead. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0014 — ACCEPT: Nội dung hạn chế hội thoại chưa đủ một cách hiểu

**Phản biện/kết luận:** G56 ghi 制限を付ける sau câu gộp không giới hạn số lượt và hạn chế chủ đề; không đủ biết đang xác nhận riêng vế nào. SD-T18 p13 tiếp tục 要確認; No.76 chỉ có cách hiểu AMCOLAB, chưa có phản hồi.

**Nguồn đối chiếu:** KS 確認事項!F56:I56; SD-T18 p13 T-09; YK2 P670–672; QA Q&A!E76:I76. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ ý nghĩa hạn chế số lượt/chủ đề và nội dung chỉ thị công ty cần cung cấp; không hỏi cơ chế rate limit.

**Q&A hiện có:** No.76 — 確認23. **Chống trùng:** Không dùng độ dài tin/timeout làm bằng chứng chính sách hội thoại.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0015 — REWRITE: Giờ các khung và ngưỡng nhắc chưa chốt

**Phản biện/kết luận:** Giờ ba khung và ngưỡng không đăng còn mở thật. Nút tạm dừng lời nhắn trong M-10 là chức năng còn có điều kiện, không phải tiền đề để mở rộng finding về lịch.

**Nguồn đối chiếu:** GJ 合意事項 §4; KS I51:I52; SD-M18 p13 M-10; QA Q&A!E73:I73. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ giờ/loại tin và ngưỡng nhắc theo No.73/確認19. Bỏ nút tạm dừng khỏi phạm vi quyết định của finding này; không mặc định 8/12/20 hay 3/7 đã chốt.

**Q&A hiện có:** No.73; 確認19. **Chống trùng:** Quy tắc kỳ hết tư liệu dẫn FND-0001, không quyết lại toàn vòng đời kỳ.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0016 — REWRITE: Thử thách thiếu tiêu chí hoàn thành và vòng đời kiểm được

**Phản biện/kết luận:** Không được đọc I27 như đã phê duyệt mọi chi tiết G27, nhưng cũng không được bỏ qua G27: đã có hướng dùng báo cáo Talent khi thiếu dữ liệu SNS và mô tả Manager thêm/sửa. CR-22 phân biệt chỉ thị AI với màn tiến độ/game; No.72 đang đề xuất nhiều enum chưa duyệt.

**Nguồn đối chiếu:** KS 確認事項!G27:I27; GJ 合意事項 §2; QA Q&A!E72:I72; QA 追加要件!A23:J23 (CR-22). Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Trước hết đối chiếu ý tưởng đã có với phạm vi hiện tại: tiêu chí đạt nào là AI/khai báo/số liệu; nội dung nào cần màn tiến độ. Không nói hoàn toàn thiếu nguồn đo, không mặc định một thử thách/enum/hạn do Analyst đề xuất.

**Q&A hiện có:** No.72 phần(1)(2). **Chống trùng:** Cách đếm ngày liên tiếp tách FND-0017; không hỏi hai lần.

**Bên xử lý:** BA/FutureCore lập bảng phạm vi từ G27/I27; khách chốt phần chưa thống nhất. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0017 — REWRITE: Cách tính số ngày đăng liên tiếp được để lại cho vận hành

**Phản biện/kết luận:** GJ §7 đã nêu đếm ngày có ít nhất một bài; việc reset khi có ngày không đăng được để lại vận hành. KS I55 cũng nói quyết khi vận hành. Finding không được mô tả toàn bộ cách xác định ngày như chưa có hoặc buộc chốt trước baseline trái thời điểm đã hẹn.

**Nguồn đối chiếu:** GJ 合意事項 §7 dòng確認22; KS 確認事項!F55:I55; SD-T18 p10 T-06; QA Q&A!E72:I72. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Ghi nhận phần đã mô tả và phần reset còn để vận hành; lập dependency theo mốc vận hành, chỉ xin đổi mốc nếu cần có lý do/ảnh hưởng được duyệt. Không gửi lại ngay.

**Q&A hiện có:** No.72 phần(3), DEFERRED. **Chống trùng:** Tách khỏi tiêu chí hoàn thành thử thách ở FND-0016.

**Bên xử lý:** BA theo dõi; chủ vận hành/khách chốt theo mốc đã hẹn. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0018 — REWRITE: Đơn giá và giá áp dụng khi thay giữa kỳ chưa chốt

**Phản biện/kết luận:** Đơn giá và giá hiệu lực giữa kỳ là thiếu quyết định thật. Điều chỉnh lỗi/kết quả muộn đang bị gộp sang FND-0019; quyền đổi trên quản trị cần nêu rõ, không hỏi schema.

**Nguồn đối chiếu:** QA Q&A!E3:I3,E62:I62; YK2 P636–639; KS F67:F68. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ đơn giá cuối, người được đổi và giá áp dụng trước/sau đổi. Tách thời điểm điều chỉnh lượt lỗi trong No.62; không biến kết quả muộn thành chính sách mới khi chưa đối soát.

**Q&A hiện có:** No.2; No.62. **Chống trùng:** Không hỏi lại cùng vấn đề kết quả muộn của FND-0019.

**Bên xử lý:** Khách chốt giá/quyền; đội lưu dấu giá. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0019 — REJECT: Không phản hồi khi tạo video chưa có chính sách tài chính đầy đủ

**Phản biện/kết luận:** Không nhận phản hồi không phải một loại thất bại tài chính mới. Nguồn đã quy định tính khi yêu cầu, làm lại tính, dịch vụ không tạo được thì không tính. Chưa có bằng chứng đối soát không thể xác định kết quả hoặc hai chính sách tài chính đều được nguồn cho phép.

**Nguồn đối chiếu:** YK2 P636–637,P725–726; QA Q&A!G2:I2,E62:I62. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Chuyển đối soát timeout/kết quả muộn cho đội/provider (FND-0034). Chỉ phần thời điểm điều chỉnh lượt lỗi tiếp tục No.62 dưới FND-0018; không tạo câu chính sách mới.

**Q&A hiện có:** No.1 đã có hướng xử lý; No.62 còn thời điểm điều chỉnh. **Chống trùng:** Trùng phần điều chỉnh của FND-0018 và kỹ thuật FND-0034.

**Bên xử lý:** Tech Lead/provider. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0020 — REJECT: Cổng chính thức và khả năng thu theo yêu cầu còn chờ

**Phản biện/kết luận:** Đây là đầu vào và kiểm chứng nhà cung cấp đã giao khách hỏi tại GJ action1, chưa phải quyết định hành vi mới. Không có bằng chứng cổng từ chối yêu cầu để hỏi phương án thay thế.

**Nguồn đối chiếu:** GJ 合意事項 §6, アクション1; KS I104:I105; QA Q&A!H5:I5,H50:I50. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Theo dõi nhận tên cổng/kết quả kiểm qua No.4/49 với đầu mối đã giao; chỉ trình phương án thay khi có hạn chế thật và ảnh hưởng.

**Q&A hiện có:** No.4; No.49 — theo dõi đầu vào. **Chống trùng:** Không đóng FND-0021 về nghĩa ngày đăng ký; tham số tích hợp thuộc FND-0038.

**Bên xử lý:** Đầu mối Adesso lấy kết quả; đội/provider kiểm chứng. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0021 — REWRITE: Mốc bắt đầu, ranh giới kỳ và kết thúc kỳ thu chưa rõ

**Phản biện/kết luận:** Ngày đăng ký chưa rõ là có cơ sở ở No.53. Nhưng kỳ đầu/cuối, chu kỳ cổng và trạng thái nợ thuộc các chủ đề khác; nguyên tắc không chia ngày/nghỉ giữa kỳ thu đủ đã nêu rõ ở KS và SD.

**Nguồn đối chiếu:** KS I104:I105,G106; SD-T18 p20 T-16,p27; YK2 P625; QA Q&A!E53:I53,H50:I50. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ nghĩa ngày bắt đầu thu và ranh giới kỳ video so với kỳ thuê bao. Không hỏi lại thu trọn tháng; kết quả cổng trỏ FND-0020, dừng vì nợ trỏ FND-0022.

**Q&A hiện có:** No.53; No.49 chỉ phần phụ thuộc. **Chống trùng:** Không lặp trạng thái kích hoạt FND-0011, dừng vì nợ FND-0022 hay email sau nghỉ FND-0024.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0022 — ACCEPT: Manager dừng do chưa thanh toán chưa có trạng thái/chính sách đủ

**Phản biện/kết luận:** Không tự khóa khi thu lỗi và Manager quyết định đã được nêu; nhưng ngừng vì nợ chưa có hậu quả/quyền/khôi phục rõ. Quyết định không phục hồi Talent nghỉ khiến đề xuất dùng 利用終了 ở No.63 không thể mặc định là phù hợp.

**Nguồn đối chiếu:** YK2 P626,P457; KS I119; QA Q&A!E63:I63,H47:I47; GJ 合意事項 §7 確認56. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ quyền dùng, phí tiếp theo, thanh toán nợ và có được dùng lại không. Không yêu cầu khách chọn enum; đội biểu diễn theo hậu quả được chọn.

**Q&A hiện có:** No.63. **Chống trùng:** Nguyên tắc ngừng dùng vĩnh viễn đã có ở FND-0042; ngày bắt đầu phí FND-0021.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0023 — REWRITE: Đường thao tác office và thông tin tài khoản còn khác nhau

**Phản biện/kết luận:** Mâu thuẫn lịch sử app/quản trị vẫn phải ghi; SD-M18 p33 hiện đã vẽ Manager đăng nhập app và nối SNS, p9 đã nêu office cùng danh sách. Không thể hỏi lại các ý như chưa có mô tả; cũng không tự đóng No.66.

**Nguồn đối chiếu:** YK2 P767; KS F109:F110; SD-M18 p9 M-06,p15 M-12,p33; QA Q&A!H44:I44,E66:I66. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đưa bản mô tả app hiện hành để đối chiếu phần khác P767; giữ email, trạng thái/xóa và xác nhận phạm vi còn mở. Ghi nhận danh sách/ai nối đã được SD mô tả, chỉ xin xác nhận khác biệt còn cần thẩm quyền.

**Q&A hiện có:** No.66, liên kết No.43. **Chống trùng:** Đăng thay chỉ office và quyết toán nội bộ đã có FND-0043.

**Bên xử lý:** FutureCore/BA đối chiếu bản màn; khách chốt phần khác biệt. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0024 — ACCEPT: Đăng ký lại cùng email và đối tượng xóa sau nghỉ chưa chốt

**Phản biện/kết luận:** Quyết định không phục hồi trạng thái cũ không trả lời được phép nộp đơn mới bằng email cũ trong sáu tháng hay không. No.69 chưa có trả lời; phạm vi đối tượng xóa cũng chỉ là đề xuất trong E69.

**Nguồn đối chiếu:** KS I118:I119; YK2 chức năng2-2 P644; QA Q&A!E69:I69,H65:I65; GJ 合意事項 §5. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ đăng ký mới cùng email và phạm vi dữ liệu phải xóa; không hỏi lại sáu tháng hay mở lại trạng thái cũ.

**Q&A hiện có:** No.69. **Chống trùng:** Nộp lại sau bị từ chối thuộc FND-0031; backup/log kỹ thuật thuộc FND-0037.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0025 — ACCEPT: Tạo nháp hằng ngày từ video tự làm chưa được chọn

**Phản biện/kết luận:** YK2 có mô tả nhưng KS xác nhận32 chưa OK, No.37 cập nhật vẫn chờ xác nhận, SD-T18 p15 giữ 要確認. Bảng CR-23 có phương án không chứng minh khách đã chọn.

**Nguồn đối chiếu:** YK2 P717; KS 確認事項!A73:I73; QA Q&A!H38:I38; SD-T18 p15 T-11; QA 追加要件!A24:J24. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ quyết định có dùng hàng video tự làm tạo nháp mỗi ngày theo thứ tự không; không đồng nhất với quyền tải/lưu video thông thường.

**Q&A hiện có:** No.37. **Chống trùng:** Nếu được chọn, quan hệ với kỳ đăng dẫn FND-0001; không hỏi lại toàn chế độ tự động.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0026 — REWRITE: Thời hạn nháp/chủ đề và tư liệu cũ đang dùng chưa đủ

**Phản biện/kết luận:** No.55 còn mở với nháp, nhưng SD-T18 p11 đã nêu không chọn thì ngày sau ra ba chủ đề mới. GJ action9 giao đội nghiên cứu ảnh/video cũ khi đầy, không giao khách thiết kế dọn kho.

**Nguồn đối chiếu:** SD-T18 p11 T-07,p15 T-11; QA Q&A!E55:I55; GJ アクション9, 懸念事項 OneDrive. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ khả năng xem/dùng lại nháp cũ và quyền giữ/xóa ảnh đang dùng. Ghi nhận thay chủ đề ngày sau đã được mô tả; đội đưa phương án dung lượng bảo vệ tư liệu có lịch trước khi xin quyết định quyền xóa.

**Q&A hiện có:** No.55; No.8 chỉ phần quyền/phạm vi. **Chống trùng:** Sau nghỉ sáu tháng thuộc FND-0024/0042; thứ tự video thuộc FND-0025.

**Bên xử lý:** Đội đề xuất dung lượng; khách chốt quyền lưu/dùng khi cần. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0027 — REJECT: Bộ dữ liệu kết quả cần chốt theo khả năng tài khoản thật

**Phản biện/kết luận:** Phạm vi số liệu lấy được và kiểm bằng tài khoản thật đã được KS/YK2 quy định. Thiếu ma trận kiểm chứng là công việc tích hợp; chưa có bằng chứng mất dữ liệu bắt buộc dẫn tới quyết định thay phạm vi.

**Nguồn đối chiếu:** KS F88:F89; YK2 P771–774,P783; SD-T18 p18 T-14; guide Upload-Post §11. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giao đội/provider lập ma trận và thử tài khoản; chỉ mở lại phần cần khách khi kết quả thật buộc thay hành vi/phạm vi.

**Q&A hiện có:** Không có Q&A nghiệp vụ mới. **Chống trùng:** Cùng đầu việc năng lực API ở FND-0038; thiết kế dữ liệu thiếu là việc đội.

**Bên xử lý:** Tech Lead/provider. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0028 — ACCEPT: Email cho Manager đã được yêu cầu nhưng thiếu phạm vi

**Phản biện/kết luận:** Gửi thêm email đã có yêu cầu; chưa rõ loại sự kiện, người nhận và mức nội dung. SD-M18 p5/p27 còn 要確認, No.75 chưa có trả lời.

**Nguồn đối chiếu:** KS 確認事項!G97:H97,G93:H93; SD-M18 p5 M-02,p27; QA Q&A!E75:I75. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ ba ý phạm vi email; không hỏi lại có email hay không, không giao khách chọn retry/kênh giao nhận.

**Q&A hiện có:** No.75. **Chống trùng:** Phân công dùng quyết định FND-0009; tránh hỏi lại tuyến phụ trách.

**Bên xử lý:** Khách quyết định nghiệp vụ; BA chuẩn bị căn cứ. **Tình trạng chuyển bước:** Chỉ là ứng viên sau khi G1–G5 đủ điều kiện; tác vụ này chưa soạn Q&A.

### FND-0029 — REJECT: Đã xử lý là theo người hay dùng chung chưa rõ đầy đủ

**Phản biện/kết luận:** Nguồn đã mô tả gắn trạng thái xử lý vào thông báo, không phải đánh dấu đã đọc. Chưa có ví dụ nghiệp vụ cần cờ xử lý cá nhân hay sự kiện gây hại để chứng minh phải có thêm quyết định khách. No.76 chỉ hỏi cách ẩn/hiện, không hỏi dùng chung/cá nhân.

**Nguồn đối chiếu:** KS 確認事項!F98:H98; SD-M18 p5 M-02 mục2,4; QA Q&A!E76:I76 (確認46). Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đội đặc tả trạng thái xử lý và lọc theo bản màn. Nếu phát hiện nhu cầu cộng tác khác thì trình bằng chứng cụ thể, không dùng No.76 để suy rằng khách đang hỏi cờ cá nhân.

**Q&A hiện có:** No.76 không chứng minh phần dùng chung/cá nhân còn là câu khách. **Chống trùng:** Tranh chấp đồng thời thuộc FND-0034; không tạo quyết định trùng tuyến duyệt FND-0009.

**Bên xử lý:** BA/UX/Tech Lead. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0030 — REWRITE: Khôi phục Manager và bảo vệ quyền quản trị cuối chưa chốt

**Phản biện/kết luận:** Mất thiết bị xác thực cần phân rõ đầu mối/thẩm quyền khôi phục. Tuy nhiên chặn tự vô hiệu hóa/Manager cuối là biện pháp an toàn đội phải thiết kế, chưa chứng minh khách cần tự chọn biện pháp.

**Nguồn đối chiếu:** YK2 P608–611; KS F115; SD-M18 p4 M-01,p21 M-18; QA Q&A!E67:I67. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ người có thẩm quyền xác minh/cấp lại khi không còn người quản trị hợp lệ; đội đề xuất quy trình và bảo vệ Manager cuối. Không hỏi thuật toán MFA hoặc từng guard kỹ thuật.

**Q&A hiện có:** No.67. **Chống trùng:** Kỹ thuật tài khoản/gửi lại ở FND-0034/0036 không phải quyết định mới.

**Bên xử lý:** Đội an ninh/Tech Lead đề xuất; khách chỉ định đầu mối có quyền. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0031 — REWRITE: Đơn chờ, mật khẩu tạm hết hạn và cấp lại thiếu chính sách

**Phản biện/kết luận:** Nộp lại sau từ chối và quyền sửa quyết định là nghiệp vụ thật. Hạn mật khẩu tạm và cấp lại chủ yếu là thiết kế an ninh; QA H26 đã chuyển hướng 7 ngày sang No.65 nhưng chưa phải khách đã phê duyệt.

**Nguồn đối chiếu:** KS F32; QA Q&A!H12:I12,H26:I26,E65:I65; SD-M18 p6 M-03. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Tách đơn chờ/nộp lại/quyền đổi từ chối khỏi TTL/cấp lại mật khẩu. Đội đề xuất bảo mật; khách chỉ chốt phần gây mất quyền nộp/dùng hoặc yêu cầu vận hành khác.

**Q&A hiện có:** No.65. **Chống trùng:** Cùng email sau nghỉ ở FND-0024, không hỏi lại.

**Bên xử lý:** BA phụ trách đơn; đội an ninh phụ trách mật khẩu. **Tình trạng chuyển bước:** CHỜ ANALYST SỬA + REVIEW LẠI; chưa có hash bản sửa, chưa đủ điều kiện viết Q&A.

### FND-0032 — REJECT: Thiếu bản hiệu lực để xác nhận phạm vi thương mại/phát hành

**Phản biện/kết luận:** Thiếu bản ký trong repository là thiếu bằng chứng quản lý phạm vi, không chứng minh khách chưa ký hoặc cần quyết định requirement mới. No.34/bảo lưu50 đã là nơi theo dõi; CR đề xuất không thay văn bản được duyệt.

**Nguồn đối chiếu:** YK2 関連資料 P104–106, §12-1 P919–923, §14-3 P966–969; QA Q&A!H35:I35; QA 保留!E2:I2; QA 追加要件!I2:J26. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đầu mối thương mại thu thập/đối chiếu bản hiệu lực và change approval. Giữ chặn thương mại/phát hành đúng phạm vi, không đưa thành Q&A hành vi mới.

**Q&A hiện có:** No.34; 保留 No.50. **Chống trùng:** Đây là dependency quản lý, không đếm lại từng finding hành vi còn mở.

**Bên xử lý:** Chủ dự án/FutureCore/đầu mối thương mại. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0033 — REJECT: Trang kết nối, luồng SNS trực tiếp và thời hạn cần đối chiếu

**Phản biện/kết luận:** 48 giờ là hạn trang kết nối trong nguồn, 15 phút là lựa chọn tích hợp nội bộ có UP-Q02 chưa rõ. Chưa chứng minh hai hạn cùng đối tượng; cũng chưa có quyền đổi hạn người dùng đã được nguồn mô tả.

**Nguồn đối chiếu:** YK2 §6-10 chức năng8-2 P742–743; SD-T18 p9 T-05; guide Upload-Post §1 dòng Cách kết nối, §6.2, UP-Q02. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** FutureCore/đội lập map trang/link/token và giữ hành vi nguồn hoặc xin thay đổi khi đã có phương án/ảnh hưởng cụ thể. Không hỏi khách chọn Connect API hay generate-jwt.

**Q&A hiện có:** UP-Q02 nội bộ; không tạo Q&A nghiệp vụ. **Chống trùng:** Điều kiện SNS kỹ thuật thuộc FND-0038; ai nối/số tài khoản đã có FND-0044.

**Bên xử lý:** FutureCore/Tech Lead/provider. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0034 — REJECT: Đối soát kết quả ngoài, chống lặp và đồng thời là việc đội tích hợp

**Phản biện/kết luận:** Đối soát kết quả, chống lặp và tranh chấp là trách nhiệm tích hợp; guide đã có thiết kế, chưa có bằng chứng lỗi thực tế hay một lựa chọn chính sách khách chưa quyết.

**Nguồn đối chiếu:** YK2 P747–755,P725–726,P879; guide Upload-Post §10, UP-D3. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ ticket kiểm chứng kỹ thuật, không gửi khách idempotency/timeout/webhook. Nếu có thay đổi quyền/phí phải dẫn finding nghiệp vụ riêng.

**Q&A hiện có:** Không hỏi khách. **Chống trùng:** Gộp công việc đối soát của FND-0019/0007; không đóng chính sách của các finding đó.

**Bên xử lý:** Tech Lead/provider/QA. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0035 — REJECT: Snapshot, xung đột ghi file và phục hồi gửi/tạo tài nguyên thuộc thiết kế đội

**Phản biện/kết luận:** No.22 giao lỗi đọc file cho thiết kế; guide OneDrive có snapshot/eTag/phục hồi. Chưa có căn cứ biến cách lưu/ghi tài nguyên thành quyết định khách.

**Nguồn đối chiếu:** QA Q&A!H23:I23,H9:I9; KS F9; YK2 P712–713,P716; guide OneDrive mục snapshot/eTag. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Kiểm chứng thiết kế đội; tiêu chí hồ sơ đủ ở FND-0010, quyền lưu/xóa ở FND-0024/0026.

**Q&A hiện có:** No.22 đã phân việc thiết kế. **Chống trùng:** Không lặp hồ sơ đủ với FND-0010/0012.

**Bên xử lý:** Tech Lead/đội tích hợp. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0036 — REJECT: Hủy biểu mẫu, validation và lỗi trình bày cần đội thiết kế

**Phản biện/kết luận:** SD-M18 p23 đã có hủy không lưu; nguồn yêu cầu hiển thị lỗi/rỗng. Thiếu chi tiết form không chứng minh khách cần lưu nháp/thu hồi tác vụ đã gửi.

**Nguồn đối chiếu:** SD-M18 p23 M-20 mục3; SD-T18 p5 T-01; YK2 P801,P664–668. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đội đặc tả validation và hủy trong phạm vi có sẵn; không tự thêm chức năng rồi xin khách duyệt.

**Q&A hiện có:** Không hỏi khách. **Chống trùng:** Không mở rộng các finding hồ sơ/đơn bằng yêu cầu hủy từng màn.

**Bên xử lý:** UX/Tech Lead/QA. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0037 — REJECT: Giờ vận hành, backup, retention log và phục hồi là phần đội đề xuất

**Phản biện/kết luận:** Nguồn trực tiếp giao giờ vận hành, backup và thời hạn log cho thiết kế. No.29 cũng xác nhận phân việc; không có quyết định khách còn thiếu về kiến trúc backup.

**Nguồn đối chiếu:** YK2 §9-3/9-4 P878–885; QA Q&A!H30:I30; KS I118. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đội đề xuất và kiểm khôi phục, chuyển chủ dự án duyệt cam kết theo thẩm quyền; không hỏi lại khách số ngày log như chưa giao việc.

**Q&A hiện có:** No.29 đã phân công đội; No.69 chỉ phạm vi xóa. **Chống trùng:** Sáu tháng dữ liệu nghỉ đã có FND-0042; đối tượng xóa còn FND-0024.

**Bên xử lý:** Tech Lead/QA/vận hành. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0038 — REJECT: Điều kiện tài khoản và tham số tích hợp cần kiểm với bên cung cấp

**Phản biện/kết luận:** Điều kiện tài khoản/gói/quyền cần IT/provider cung cấp và kiểm; thiếu cấu hình không tự là lựa chọn nghiệp vụ. No.8/24 đã theo dõi đầu vào.

**Nguồn đối chiếu:** YK2 P752,P771,P871; QA Q&A!H9:I9,H25:I25; guide Upload-Post §1,§11. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Giữ checklist tích hợp do đội/IT chịu trách nhiệm; chỉ đưa khách quyết định khi phải thay quyền riêng tư hoặc phạm vi có bằng chứng.

**Q&A hiện có:** No.8; No.24 — đầu vào kỹ thuật. **Chống trùng:** Gộp kiểm năng lực với FND-0027; UP-Q02 ở FND-0033.

**Bên xử lý:** Tech Lead/provider/IT Adesso. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0039 — REJECT: Đã chốt AI viết lại tối đa2 lần và Talent được sửa tay

**Phản biện/kết luận:** Hai lần yêu cầu AI sửa và quyền Talent sửa tay đã có quyết định trực tiếp; không có câu hỏi mới cho đúng ý này.

**Nguồn đối chiếu:** KS I64:I65; GJ 合意事項 §1,§7; QA Q&A!H40:I40. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Đồng bộ tài liệu nội bộ nếu còn sai; không hỏi lại. Không đồng nhất retry mạng với một yêu cầu viết lại mới.

**Q&A hiện có:** No.39 đã có quyết định. **Chống trùng:** Quyền sửa bài bị từ cấm vẫn thuộc FND-0003.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0040 — REJECT: Đã bỏ trần số bài/ngày vì chi phí

**Phản biện/kết luận:** Không áp trần số bài/ngày đã được quyết ở KS/GJ; quota provider không cho phép hỏi lại trần sản phẩm.

**Nguồn đối chiếu:** KS I86; GJ 合意事項 §7 確認37; QA Q&A!H56:I56. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại trần; chỉ giữ quy tắc rải giờ còn mở.

**Q&A hiện có:** No.56 chỉ còn giờ. **Chống trùng:** Giờ nhiều bài ở FND-0006; quota ở FND-0038.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0041 — REJECT: Đã xác nhận Manager xem hội thoại và báo trước Talent

**Phản biện/kết luận:** KS xác nhận42 OK và No.7 ghi nhận bỏ ý kiến riêng tư cũ; quyền xem hội thoại và báo trước Talent đã có căn cứ.

**Nguồn đối chiếu:** KS A94,F94,F43; QA Q&A!H8:I8; SD-T18 p7 T-03. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại quyền xem hội thoại; không suy ra email có thể chứa toàn nội dung.

**Q&A hiện có:** No.7 đã trả lời đúng ý. **Chống trùng:** Nội dung email vẫn FND-0028.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0042 — REJECT: Đã chốt giữ6 tháng và không bật lại Talent đã nghỉ

**Phản biện/kết luận:** Thời hạn sáu tháng, tự xóa không khôi phục và không đưa Talent nghỉ về sử dụng đã là quyết định trực tiếp.

**Nguồn đối chiếu:** KS I118:I119; GJ 合意事項 §5,§7 確認56; QA Q&A!H11:I11,H64:I64; SD-T18 p28. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại các nguyên tắc đã chốt; chỉ kiểm dữ liệu bị xóa và đăng ký mới.

**Q&A hiện có:** No.29/64 đã có; No.69 còn phần khác. **Chống trùng:** Không đóng toàn FND-0024 hoặc FND-0022.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0043 — REJECT: Đã thu hẹp đăng thay chỉ office và quyết toán video nội bộ

**Phản biện/kết luận:** Quyết định 17/11 rút phương án đăng thay cả Talent, chỉ còn office; KS UC-12-5 nêu phí video quyết toán nội bộ.

**Nguồn đối chiếu:** KS I63,F112; GJ 合意事項 §7 確認27; QA Q&A!H44:I44,H49:I49; SD-M18 p33. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại đối tượng đăng thay hay thu phí office qua cổng.

**Q&A hiện có:** No.43/48 đã có đúng ý. **Chống trùng:** Đường thao tác/email/trạng thái còn FND-0023.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0044 — REJECT: Đã chốt1 tài khoản mỗi SNS và unit là office

**Phản biện/kết luận:** KS/GJ đã quyết mỗi SNS một tài khoản, unit là office và Talent tự kết nối. Ghi chú cũ nhiều tài khoản đã bị thay cùng chủ đề.

**Nguồn đối chiếu:** KS I39:I40; GJ 合意事項 §7 確認9/10; QA Q&A!H24:I24; SD-T18 p9 T-05. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại số tài khoản/ai kết nối.

**Q&A hiện có:** No.23 đã trả lời. **Chống trùng:** Hạn trang/link chưa giải quyết bởi quyết định này; FND-0033 xử lý nội bộ.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0045 — REJECT: Đã chốt thứ tự3 cấp, thử/lưu và quay bản

**Phản biện/kết luận:** KS xác nhận6/7 mô tả thứ tự ưu tiên và thử/lưu/quay bản; I28/I29 đồng ý đúng hướng. Bản màn cũng giữ các hành vi này, không cần hỏi lại cả ba cấp.

**Nguồn đối chiếu:** KS F28:I29; GJ 合意事項 §7 確認6/7; SD-M18 p17 M-14,p18 M-15,p30. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại thứ tự ba cấp hoặc nút thử/lưu. Không suy đã chốt phân xử nhiều category cùng cấp.

**Q&A hiện có:** No.45 đã có đúng hướng; không hỏi lại. **Chống trùng:** Phần cùng cấp ở FND-0013 cần chứng minh thêm.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0046 — REJECT: Đã quyết có hai chế độ và Talent tự chọn

**Phản biện/kết luận:** Hai chế độ và quyền Talent tự chọn đã có quyết định KS/GJ; không cần quyết lại từ đầu.

**Nguồn đối chiếu:** KS I52,I61:I62; GJ 合意事項 §1; SD-T18 p12 T-08,p23. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại có tự động hay không.

**Q&A hiện có:** No.70/71 chỉ còn chi tiết. **Chống trùng:** Vòng đời kỳ FND-0001; tổ hợp duyệt/từ cấm FND-0002.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

### FND-0047 — REJECT: Đã xác nhận mục tiêu follower theo từng SNS

**Phản biện/kết luận:** KS F25 kèm OK mô tả mục tiêu theo từng SNS, Manager đổi theo Talent; SD-T18 p10 tiếp tục cùng mô tả. Ghi chú thiết kế cũ không đủ phủ định. Ngưỡng 25/50/75% chỉ là đề xuất, không được coi đã duyệt.

**Nguồn đối chiếu:** KS A25,F25:I25,F17,G90; QA Q&A!H15:I15,H43:I43; SD-T18 p10 T-06. Phiên bản/hash tại source-snapshot; nguyên văn EV tại evidence-audit.

**Phạm vi giữ hoặc việc cần sửa:** Không hỏi lại mục tiêu từng SNS. Giữ giới hạn riêng cho milestone đề xuất, không tự đóng nó bằng finding này.

**Q&A hiện có:** No.14/42 — chỉ ý đã có nguồn. **Chống trùng:** Không dùng REJECT này để xóa phần milestone còn chờ xác nhận màn.

**Bên xử lý:** BA/đội đồng bộ đặc tả. **Tình trạng chuyển bước:** KHÔNG CHUYỂN VIẾT Q&A.

## Gate và giới hạn độc lập

G5: **BLOCKED**, không phải PASS. Các gate đầu vào G1–G4 còn BLOCKED trong hồ sơ hiện tại. Tác giả Analyst được ghi “Codex”; người thực hiện lần này cũng là Codex dưới vai trò reviewer AI được người dùng giao, chưa có bằng chứng một người chịu trách nhiệm độc lập khác tác giả đã ký. Báo cáo này là hồ sơ phản biện hỗ trợ, không tự tạo chữ ký độc lập. Căn cứ: [QUALITY_GATES.md §G5](../QUALITY_GATES.md), [RUNBOOK.md §Thao tác lưu hồ sơ mục4](../RUNBOOK.md).

Đã hoàn thành lượt review nội dung cho cả47 ID. Không sửa finding Analyst, nguồn requirement, flow, workbook15 hoặc 56 dòng xác nhận được bảo vệ. Các REWRITE mới là yêu cầu sửa có phạm vi cụ thể, chưa phải bản sửa đã kiểm lại. Chỉ ACCEPT và REWRITE đã sửa/re-review, với điều kiện gate liên quan đầy đủ, mới là đầu vào bước biên tập Q&A khi được giao. Không soạn/gửi Q&A trong tác vụ này.

Người phụ trách tiếp theo: Analyst sửa các mục REWRITE; FutureCore/Tech Lead cung cấp bằng chứng cho0013 và thực hiện các đầu việc đội/provider; chủ quy trình chỉ định người chịu trách nhiệm độc lập, kiểm các gate đầu vào và ký G5 đúng phạm vi.

Báo cáo không kết luận phần mềm đang lỗi, không kiểm giao dịch provider thật và không chứng minh thương mại đã/chưa ký ngoài repository. Mọi nhận định “chưa có trả lời” giới hạn ở đúng snapshot12 nguồn; nguồn đổi hash phải rà lại phần liên quan.

## Kiểm tra hồ sơ

`python3 docs/requirement-review/validate.py`: PASS. Validator của đợt gap cũ báo `Hash changed: docs/requirement-review/registers/reviews.csv` vì nó khóa snapshot trước G5 (sổ review khi ấy trống). Đây là đầu ra kế tiếp được giao, không sửa manifest cũ để che thay đổi. Validator riêng của đợt này kiểm toàn bộ nguồn, finding Analyst, artifact flow, workbook15 giữ nguyên, đủ47 ID/tám phép kiểm/226 trích dẫn và chặn Q&A cho REWRITE. Kiểm cơ học không thay duyệt gate.

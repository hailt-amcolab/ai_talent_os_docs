# Independent Requirement Review — Finding Register hiện hành

Người/ngày thực hiện: Codex, reviewer AI theo lệnh người dùng; 2026-11-19T13:08:37+07:00. **Review nội dung, không ký phê duyệt Quality Gate.**

## Phạm vi và kết quả

Đã review toàn bộ47 Finding ID theo canonical_ref trong [Finding Register](../registers/findings.csv):16 bản R1 ở finding-revision-2026-11-19 và31 bản gốc ở gap-analysis-2026-11-19. Không dùng bản gốc cũ để đánh lại các finding đã có R1. Mỗi kết quả dưới đây gắn đúng đường dẫn/hash bản thực đọc; giữ nguyên mọi finding và review cũ.

| Kết quả | Số finding |
|---|---:|
| ACCEPT | 24 |
| REWRITE | 0 |
| REJECT | 20 |
| NEED_MORE_EVIDENCE | 3 |

Trong24 ACCEPT, **FND-0017 là quyết định được hẹn đến vận hành, không hỏi khách ngay**.23 ACCEPT còn lại là ứng viên về nội dung, không mặc định thành23 câu hỏi hoặc23 câu đủ gửi. Những phần phải có phương án đội trước (0001/0026/0030) giữ nguyên thứ tự đó; các hành vi độc lập không bị chặn chỉ vì thiếu chữ ký hành chính cho WORKING_DRAFT.

Ba mục **NEED_MORE_EVIDENCE: FND-0004, FND-0013, FND-0016**. Chúng cần đội làm rõ phương án/đối chiếu cụ thể để chứng minh còn quyết định khách; không yêu cầu khách tự nghĩ lại thông tin đã có trong nguồn.20 REJECT bị loại khỏi tập hỏi khách vì đã có quyết định hoặc thuộc đầu vào/thiết kế/kiểm provider. REJECT không đóng việc kỹ thuật còn thiếu và không phủ định nội dung đúng của các mục “đã trả lời”.

## Đã đọc nguồn trước khi đọc Finding Register

1. Đọc AGENTS/skill và catalog hiện hành12 nguồn; Source Register, DATA_MODEL, QUALITY_GATES và RUNBOOK, gồm WCP-0001 đã áp dụng.
2. Trích xuất lại DOCX, XLSX, PDF từ source_requiments; đọc biên bản17/11, các câu trả lời QA, đủ5sheet QA, KS và nội dung màn/luồng18/11. Đọc Business Flow Specification và các bước/nhánh trong steps.csv trước khi mở register Analyst hiện hành. Tài liệu flow vẫn là tái dựng nội bộ, không thay quyết định khách.
3. Sau đó mở register47 dòng, tệp canonical từng ID và chi tiết FACT/INFERENCE/phần thiếu; kiểm ngược các trích dẫn nguồn, tìm thông tin phủ định và câu trả lời đã có. Rà workbook15 cả4sheet và tracking RV/TR/FL để tránh hỏi trùng; chúng không phải bằng chứng khách phê duyệt.
4. Sau lượt nguồn mới đối chiếu lịch sử review để bảo toàn phiên bản. Không kế thừa ACCEPT hay kết luận tác giả chỉ vì đã được kiểm ở lượt trước.

## Hồ sơ bằng chứng

Đã mở lại **237 lượt nguồn được Analyst trích**, vị trí và nội dung trích đều khớp nguồn gốc. [source-evidence.csv](source-evidence.csv) lưu từng lượt với nguồn/hash/locator/nguyên văn/checker/ngày và liên kết Finding ID. Độ rộng ô được ghi theo phần thực đọc, tránh locator A:J che các trích dẫn K/N trong bảng CR. Đã xem thêm hình5-1 nhúng tại YK2 P505 (word/media/image7.png), ghi CREV-0238; đây là quan sát hình nguồn, không phải quy tắc bổ sung mới.

Đã xem trực quan SD-T18 p23 về kỳ đăng và SD-M18 p32 dừng/mở lại. Những trang PDF khác trong lượt này dùng phần mô tả chữ, không tuyên bố kiểm mọi connector/ảnh minh họa. Các bản thiết kế lịch sử được định danh và trích xuất để tra cứu; không tuyên bố review nghiệp vụ toàn bộ12 tài liệu. [source-snapshot.json](source-snapshot.json) lưu12 hash; nguồn không thay so với snapshot review trước.

Hash/vị trí đúng chỉ chứng minh trích dẫn tồn tại. Phần suy luận vẫn phải qua các phản chứng về ngữ cảnh, quyết định đã chốt, thẩm quyền và chống trùng ở từng mục. “Open” không chứng minh mọi chi tiết còn thiếu; “Close/OK” không chứng minh toàn đề xuất hoặc thương mại đã được duyệt.

## Review từng finding

Tám kiểm tra được ghi thành cột riêng trong [review-results.csv](review-results.csv): evidence_exists, citation_accuracy, context_check, other_document_check, qa_answer_check, technical_risk_check, customer_decision_check và duplicate_check. Báo cáo dưới diễn giải kết luận, nguồn phản biện và phạm vi giữ/loại.

### FND-0001 — ACCEPT

Quy tắc ghép và dùng tư liệu khi đổi/kết thúc kỳ đăng cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0001.md), SHA-256 `3e2a48dbc25d2da1793e8479989c9907775f093dc55ba4c0bca4cc70cfea562f`. Hồ sơ REV-0064.

**Phản biện/kết luận:** Quyết định khung đăng theo kỳ không xác định việc dùng lại ảnh, hết tư liệu hay thay/kết thúc kỳ. Bản R1 đã bỏ việc bắt khách chọn cách sinh bài và phân việc FutureCore đúng GJ action7.

**Nguồn đối chiếu/phản biện:** GJ 合意事項 §1, アクション7; KS I61:I62; QA Q&A!E70:I70; SD-T18 p12 T-08,p23. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0001;CREV-0002;CREV-0003;CREV-0004;CREV-0005;CREV-0006;CREV-0007.

**Phạm vi giữ hoặc việc cần làm:** Giữ hành vi dùng tư liệu và kết quả đổi/kết thúc kỳ tại No.70; phần phụ thuộc phương án nhịp tạo chờ FutureCore trình.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.70.0

**Việc đội/provider:** FutureCore chuẩn bị nhịp tạo; không hỏi khách lựa chọn triển khai. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Đổi kỳ của Talent ở0001; dừng vận hành ở0008; duyệt ở0002.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0002 — ACCEPT

Quan hệ chế độ đăng, duyệt bài và kiểm từ cấm còn nhiều cách hiểu

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0002.md), SHA-256 `da414554169516a8dfd419ea7b84e7b8f1da1a92c95718f0ee1809f057ce7a98`. Hồ sơ REV-0065.

**Phản biện/kết luận:** SD-T18 T-08 mô tả xác nhận từng bài nhưng chưa giải nghĩa hai trục lựa chọn và bài công việc/từ cấm trên đường tự động. No.71 chưa có phản hồi cho tổ hợp này.

**Nguồn đối chiếu/phản biện:** KS F59:I59,F61:I61,F74:I75; QA Q&A!E71:I71; SD-T18 p12 T-08,p14 T-10. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0008;CREV-0009;CREV-0010;CREV-0011;CREV-0012;CREV-0013;CREV-0014.

**Phạm vi giữ hoặc việc cần làm:** Chỉ các điều kiện đăng/duyệt/từ cấm trong No.71; không hỏi lại có hai chế độ hay quyền tự chọn.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.71.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** 0003 sở hữu bước sửa sau khi bị chặn;0001 sở hữu kỳ.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0003 — ACCEPT

Đường xử lý sau bài bị từ cấm chưa khép kín

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0003.md), SHA-256 `8a1edb541b9fd70e607a22a77f20cf69fdf4409bc38ccf71a3918690f240e77e`. Hồ sơ REV-0066.

**Phản biện/kết luận:** Manager sửa bài bị chặn là hành vi có nguồn; Talent sửa tay chung không tự trả lời quyền sửa đúng loại bài này hoặc xác nhận lại bản Manager sửa. Nội dung No.57 vẫn còn đề xuất chưa được trả lời.

**Nguồn đối chiếu/phản biện:** YK2 P705; KS F59:I59,I64; QA Q&A!E57:I57,E71:I71; SD-M18 p14 M-11. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0015;CREV-0016;CREV-0017;CREV-0018;CREV-0019;CREV-0020.

**Phạm vi giữ hoặc việc cần làm:** Giữ quyền sửa/xác nhận lại và đường trở lại duyệt; quy tắc quá giờ dẫn0006.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.57.0;QA No.71.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Không hỏi lại hàng rào đường tự động của0002; không đặt quy tắc giờ riêng.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0004 — NEED_MORE_EVIDENCE

Cách hiển thị kết quả bài khi các SNS có kết quả khác nhau cần đội lập phương án

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0004.md), SHA-256 `344391ce64479b23f34769215d356a4f2e6cf532ce720b15edeeb8df6fc0306d`. Hồ sơ REV-0067.

**Phản biện/kết luận:** Có bảng trạng thái cũ và kết quả từng mạng; No.51 giao đội cập nhật sau70/71. R1 mới hẹn lập phương án tổng hợp, chưa chỉ ra phần nhãn/thao tác cụ thể mà đội không thể quyết trong thiết kế hiện có.

**Nguồn đối chiếu/phản biện:** YK2 P504–507, hình5-1 P505 và P748; QA Q&A!H51:I51,E59:I59; SD-T18 p18 T-14; SD-M18 p11 M-08. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0021;CREV-0022;CREV-0023;CREV-0024;CREV-0025;CREV-0026;CREV-0238.

**Phạm vi giữ hoặc việc cần làm:** BA/Tech Lead gắn bảng tình huống–hiển thị–thao tác và phần thay hành vi cần khách quyết; kiểm lại trước xét Q&A.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.51.0;QA No.59.0

**Việc đội/provider:** Đội lập phương án trước; thiếu bằng chứng này không giao khách tự thiết kế. **Cần khách quyết:** CHƯA CHỨNG MINH đầy đủ phần cần thẩm quyền khách.

**Trùng lặp:** Đích đăng lại ở0007; không biến enum hay thiếu sơ đồ nội bộ thành câu khách.

**Điều kiện Q&A:** BLOCKED_PENDING_EVIDENCE.

### FND-0005 — ACCEPT

Lịch sử và hiệu lực duyệt sau sửa/gửi lại cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0005.md), SHA-256 `9d643efe7b27158c25a2c146f70f9b885ed475fce59f6e5e4490572d2e59b3e8`. Hồ sơ REV-0068.

**Phản biện/kết luận:** Đã có trả bài có lý do và gửi duyệt lại; phần lịch sử người dùng thấy chưa được chốt ở No.58. R1 giữ lịch sử/bản nội dung và bỏ ID bản ghi, không cho phép bỏ lượt duyệt lại đã có nguồn.

**Nguồn đối chiếu/phản biện:** KS F78:H78; QA Q&A!G36:I36,E58:I58; SD-M18 p8 M-05. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0027;CREV-0028;CREV-0029;CREV-0030.

**Phạm vi giữ hoặc việc cần làm:** Giữ lịch sử và bản đang xin duyệt; quy tắc giờ dùng0006; không hỏi lựa chọn cùng ID hay ID mới.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.35.0;QA No.58.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Gửi lại nội dung khác với retry kỹ thuật0034; giờ không hỏi trùng0006.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0006 — ACCEPT

Giờ được chốt khi nào và bài đến muộn chưa rõ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0006.md), SHA-256 `1b81c1be9b9b0224a558aaf2a830a95d480b577c545144fbeedda2a457218c27`. Hồ sơ REV-0069.

**Phản biện/kết luận:** Khách giao AI chọn giờ theo chỉ thị và không giới hạn số bài/ngày. Hai quyết định đó chưa giải quyết tư liệu muộn, bài thứ2 và mốc chốt lịch; H56 còn hỏi các ý này.

**Nguồn đối chiếu/phản biện:** KS I66,I86; GJ 合意事項 §1,§7 確認37; QA Q&A!E56:I56; YK2 P780–781. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0031;CREV-0032;CREV-0033;CREV-0034.

**Phạm vi giữ hoặc việc cần làm:** Giữ chính sách giờ trong No.56; không hỏi lại quota sản phẩm.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.56.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Là nơi dùng chung quy tắc quá giờ cho0003/0005/0007.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0007 — ACCEPT

Đích SNS và giờ khi đặt lịch lại sau lỗi cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0007.md), SHA-256 `969677f26bdca1a5c2abeaa78c9f49d7b84f6509fb8278c91b0ffddf03582b56`. Hồ sơ REV-0070.

**Phản biện/kết luận:** T-14 đã có mở T-10, chấp nhận lại và hẹn giờ mới; No.59 chưa xác định đích chỉ mạng lỗi hay tất cả và nguyên tắc giờ. R1 đã ghi nhận phần mô tả hiện hành.

**Nguồn đối chiếu/phản biện:** YK2 P755; QA Q&A!E59:I59; SD-T18 p18 T-14 mục5; SD-M18 p11 M-08. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0035;CREV-0036;CREV-0037;CREV-0038.

**Phạm vi giữ hoặc việc cần làm:** Chỉ giữ đích SNS/giờ; bỏ hỏi lại có nút hay màn đặt lại.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.59.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Giờ quá hạn dùng0006; đối soát/chống trùng dùng0034.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0008 — ACCEPT

Phần còn mở về bài trong lúc dừng, hủy/dùng lại và dừng toàn kỳ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0008.md), SHA-256 `3d817eb90246141aeaf91251232e6170aa8914e2b3738127c5c0ee7c728fc0f4`. Hồ sơ REV-0071.

**Phản biện/kết luận:** Ba quyết định về bài mới lúc dừng, báo/dùng lại bài bị hủy và phạm vi dừng kỳ chưa được trả lời; SD-M18 p32 vẫn cần xác nhận hủy lịch và không phục hồi. Không đóng chúng chỉ vì có sơ đồ.

**Nguồn đối chiếu/phản biện:** KS F84:I85; QA Q&A!E60:I61,E77:I77; SD-M18 p19 M-16,p32. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0039;CREV-0040;CREV-0041;CREV-0042;CREV-0043;CREV-0044;CREV-0045.

**Phạm vi giữ hoặc việc cần làm:** Tiếp tục No.60/61/77 riêng; giữ cả phần bảo lưu hủy/không phục hồi của77; đội kiểm hủy thực tế.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.60.0;QA No.61.0;QA No.77.0

**Việc đội/provider:** Đội đối soát việc hủy, không giao timeout/cạnh tranh cho khách. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Dừng/đổi kỳ do Talent ở0001; không lặp lệnh dừng vận hành.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0009 — ACCEPT

Phân tuyến duyệt và fallback chưa được chọn dứt điểm

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0009.md), SHA-256 `5b81e9b4f3af0db87539cd2f94fd63903168f3b91dc24f2d67570f4d70f640e4`. Hồ sơ REV-0072.

**Phản biện/kết luận:** Phân tuyến duyệt đã chuyển khỏi gửi mọi Manager; category/người phụ trách và fallback vẫn chưa có quyết định cuối. Quyền xem mọi Talent không xác định quyền nhận/xử lý duyệt.

**Nguồn đối chiếu/phản biện:** KS G77:I77,G93:H93; GJ 合意事項 §7 確認34; QA Q&A!G7:I7; SD-M18 p5 M-02,p13 M-10. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0046;CREV-0047;CREV-0048;CREV-0049;CREV-0050;CREV-0051.

**Phạm vi giữ hoặc việc cần làm:** Giữ lựa chọn phân công và trường hợp thiếu/vắng người phụ trách theo No.6.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.6.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** 0028 dùng chung tuyến phụ trách, không hỏi lại một quyết định.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0010 — ACCEPT

Chưa có tiêu chí hồ sơ đủ để AI bắt đầu tạo nháp

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0010.md), SHA-256 `75e209537a79a8649c91c96537412842ecb3f407722ae003b0ed8c712171a679`. Hồ sơ REV-0073.

**Phản biện/kết luận:** Không có hồ sơ thì chưa tạo bài là quy tắc có nguồn. M-20 có lưu nhưng không giải nghĩa lúc nào đủ hồ sơ; No.54 chưa có trả lời, nên thiếu tiêu chí nghiệp vụ có thật.

**Nguồn đối chiếu/phản biện:** KS F9,F15; QA Q&A!E54:I54; SD-M18 p23 M-20,p30. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0052;CREV-0053;CREV-0054;CREV-0055.

**Phạm vi giữ hoặc việc cần làm:** Chỉ tiêu chí đủ và người xác nhận hoàn tất; cách kiểm file/nút là đội đề xuất.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.54.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Tiêu chí đủ chỉ ở0010; trường ở0012, trạng thái ở0011, ngày phí ở0021.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0011 — ACCEPT

Quan hệ chuyển trạng thái bằng tay và đề xuất tự chuyển cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0011.md), SHA-256 `e06119baa0815ec1fc6c7a278269f6348ca628c142872136252351a2baa4275c`. Hồ sơ REV-0074.

**Phản biện/kết luận:** YK2 đã có Manager chuyển bằng tay; No.52 đưa đề xuất tự chuyển chưa có phản hồi. Điều kiện dùng AI sau thanh toán/chưa hồ sơ không tạo nháp đã rõ, không hỏi lại toàn bộ quyền.

**Nguồn đối chiếu/phản biện:** YK2 P615–617; KS F36,F9; QA Q&A!E52:I53; SD-T18 p8 T-04. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0056;CREV-0057;CREV-0058;CREV-0059;CREV-0060.

**Phạm vi giữ hoặc việc cần làm:** Giữ quan hệ chuyển tay/tự chuyển và trạng thái hiển thị; không dùng trạng thái này để tự chốt ngày thu.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.52.0;QA No.53.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** 0010 hồ sơ đủ;0021 ngày phí; chỉ dẫn No.53.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0012 — ACCEPT

Danh sách trường và phạm vi nhập thông tin Talent trên M-20 cần xác nhận

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0012.md), SHA-256 `420db66e02c10ceee93966f404d3805ebeef3a4a5ff4675ff41eec4756935633`. Hồ sơ REV-0075.

**Phản biện/kết luận:** Khách yêu cầu màn riêng và SD có M-20; danh sách trường vẫn cần xác nhận tại p23/p30. R1 đã bỏ lựa chọn cũ ChatGPT hay thêm màn như chưa nhận bản18/11.

**Nguồn đối chiếu/phản biện:** KS I30; QA Q&A!E74:I74; SD-M18 p23 M-20,p30. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0061;CREV-0062;CREV-0063;CREV-0064;CREV-0065.

**Phạm vi giữ hoặc việc cần làm:** Chỉ xác nhận trường/phạm vi mục nhập trong màn có sẵn; No.74 cần cập nhật bối cảnh khi dùng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.74.0;QA No.54.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Không lặp hồ sơ đủ0010 hay kỹ thuật ghi đồng thời0035.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0013 — NEED_MORE_EVIDENCE

Chi tiết nhiều category và thay chỉ thị đối với nội dung đã tạo chưa rõ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0013.md), SHA-256 `7d82ceb298cab1dc0cf5eca783bb0e9c1617d8e56824d08cf7c39ae2c9a4490a`. Hồ sơ REV-0076.

**Phản biện/kết luận:** Ưu tiên ba cấp và hiệu lực sáng hôm sau đã có nguồn. Chưa có ví dụ xung đột cùng cấp/phương án hợp nhất cụ thể chứng minh còn quyết định khách; không tự yêu cầu hồi tố bài cũ.

**Nguồn đối chiếu/phản biện:** KS F28:I29; GJ 合意事項 §7 確認6; YK2 P821; SD-M18 p17 M-14,p18 M-15,p30. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0066;CREV-0067;CREV-0068;CREV-0069;CREV-0070;CREV-0071.

**Phạm vi giữ hoặc việc cần làm:** FutureCore cung cấp ví dụ cùng cấp, cách hợp nhất và tác động bài/lịch đã có; chỉ phần khác hành vi hiện hành mới trình khách.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** FutureCore/Tech Lead làm rõ cách dùng category trước. **Cần khách quyết:** CHƯA CHỨNG MINH đầy đủ phần cần thẩm quyền khách.

**Trùng lặp:** Không hỏi lại thứ tự ba cấp0045; ghi xung đột file là0035.

**Điều kiện Q&A:** BLOCKED_PENDING_EVIDENCE.

### FND-0014 — ACCEPT

Nội dung hạn chế hội thoại chưa đủ một cách hiểu

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0014.md), SHA-256 `21a6a898b70a9572783b97d82514bd48d59e0f99eda68c8399abfb660a866b93`. Hồ sơ REV-0077.

**Phản biện/kết luận:** G56 trả lời câu có hai vế giới hạn chủ đề/số lần nên phạm vi chưa duy nhất. YK2 có cách từ chối nhưng SD-T18 p13 vẫn cần xác nhận, No.76 chỉ là cách hiểu đội chưa được đáp.

**Nguồn đối chiếu/phản biện:** KS F56:I56; YK2 P670–672; SD-T18 p13 T-09; QA Q&A!E76:I76 確認23. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0072;CREV-0073;CREV-0074;CREV-0075.

**Phạm vi giữ hoặc việc cần làm:** Giữ ý nghĩa hạn chế và nội dung công ty cần cung cấp; không hỏi rate-limit hay timeout.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.76.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Không gộp hạn ký tự/timeout kỹ thuật thành giới hạn hội thoại.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0015 — ACCEPT

Giờ ba khung, loại lời nhắn và ngưỡng nhắc cần xác nhận

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0015.md), SHA-256 `145991e9e65a8391d1ea87f46c5d06b80008a504f5e2acdfd94f1fa4d91d1787`. Hồ sơ REV-0078.

**Phản biện/kết luận:** Ba khung đã chốt, giờ cá nhân để xét sau; ngưỡng nhắc KS I52 còn chờ. Các giờ8/12/20 và ngưỡng3/7 trong No.73 là đề xuất, không phải kết luận khách.

**Nguồn đối chiếu/phản biện:** GJ 合意事項 §4; KS I51:I52; QA Q&A!E73:I73; SD-T18 p13 T-09. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0076;CREV-0077;CREV-0078;CREV-0079;CREV-0080;CREV-0081.

**Phạm vi giữ hoặc việc cần làm:** Giữ giờ/loại tin/ngưỡng trong No.73; không kéo nút tạm dừng M-10 vào phạm vi này.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.73.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Hết tư liệu trong kỳ dẫn0001; không mở lại vòng đời đăng.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0016 — NEED_MORE_EVIDENCE

Tiêu chí đạt và phạm vi quản lý thử thách cần đối chiếu với ý tưởng đã có

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0016.md), SHA-256 `5f66a0c6c1abab82ffe49f3df1042033d985021223d6bbf5c4d7a01a2f3633ef`. Hồ sơ REV-0079.

**Phản biện/kết luận:** G27 đã có nguồn đo và báo cáo Talent, I27/GJ chỉ chốt một phần; CR-22 chưa phê duyệt phạm vi màn. R1 ghi sẽ đối chiếu nhưng chưa có bảng xác định ý đã đủ, ý còn đề xuất và phần nào cần khách.

**Nguồn đối chiếu/phản biện:** KS G27:I27; GJ 合意事項 §2; QA Q&A!E72:I72; 追加要件!A23:N23 CR-22; SD-T18 p13 T-09. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0082;CREV-0083;CREV-0084;CREV-0085;CREV-0086.

**Phạm vi giữ hoặc việc cần làm:** BA/FutureCore map G27/I27/GJ/CR-22 theo tiêu chí đạt, nguồn đánh giá và phạm vi màn trước khi hỏi; không tự đặt enum/một thử thách.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.72.0

**Việc đội/provider:** Đội lập đối chiếu phạm vi và chỉ rõ quyết định khách còn thiếu. **Cần khách quyết:** CHƯA CHỨNG MINH đầy đủ phần cần thẩm quyền khách.

**Trùng lặp:** Ngày liên tiếp ở0017; không bắt khách viết lại ý tưởng đã có.

**Điều kiện Q&A:** BLOCKED_PENDING_EVIDENCE.

### FND-0017 — ACCEPT

Quy tắc đặt lại ngày liên tiếp là phụ thuộc được hẹn quyết khi vận hành

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0017.md), SHA-256 `d8fc919dc8dce7102b32a2d312cca434f5c2197bb6c9c2b901502ec9d9545dc2`. Hồ sơ REV-0080.

**Phản biện/kết luận:** GJ đã mô tả ngày có ít nhất một bài, còn reset để quyết khi vận hành. R1 ghi đúng dependency tương lai, không coi trì hoãn là lỗi hoặc chặn baseline hiện tại.

**Nguồn đối chiếu/phản biện:** GJ 合意事項 §7 dòng確認22; KS F55:I55; QA Q&A!E72:I72 phần3; SD-T18 p10 T-06. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0087;CREV-0088;CREV-0089;CREV-0090.

**Phạm vi giữ hoặc việc cần làm:** Giữ theo dõi quyết định reset đến mốc vận hành; chỉ đổi mốc khi có lý do/ảnh hưởng được duyệt.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.72.0

**Việc đội/provider:** BA/chủ vận hành theo dõi mốc; khách quyết đúng mốc đã hẹn. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Không lặp tiêu chí đạt thử thách0016.

**Điều kiện Q&A:** DEFERRED — không hỏi ngay.

### FND-0018 — ACCEPT

Đơn giá video, quyền đổi và giá áp dụng trước/sau thay đổi cần xác nhận

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0018.md), SHA-256 `ae412eb8783bba5f81896e013773a7bd9a830085001b48400c97113eb3adc4d7`. Hồ sơ REV-0081.

**Phản biện/kết luận:** Giá do công ty quyết, giá cuối/quyền đổi/hiệu lực giá còn mở No.2/62; cấu hình được không thay quyết định khách. R1 đã tách kết quả muộn khỏi giá.

**Nguồn đối chiếu/phản biện:** KS F67:F68; YK2 P636–639; QA Q&A!G3:I3,E62:I62. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0091;CREV-0092;CREV-0093;CREV-0094;CREV-0095.

**Phạm vi giữ hoặc việc cần làm:** Giữ giá, người đổi và lượt trước/sau đổi; thời điểm điều chỉnh lỗi ở phần riêng No.62.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.2.0;QA No.62.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Đối soát0034; không mở lại0019 hoặc hỏi schema.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0019 — REJECT

Không phản hồi khi tạo video chưa có chính sách tài chính đầy đủ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0019.md), SHA-256 `73e276217a0d4f5d64eecf2bac280275aed889caa50654378a76686b1e23a800`. Hồ sơ REV-0082.

**Phản biện/kết luận:** Nguồn đã có nguyên tắc tính khi yêu cầu/làm lại và không tính khi dịch vụ không tạo được. Không có phản hồi chỉ là kết quả chưa rõ, chưa chứng minh cần một chính sách tài chính mới.

**Nguồn đối chiếu/phản biện:** YK2 P636–637,P725–726; QA Q&A!G2:I2,E62:I62. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0096;CREV-0097;CREV-0098;CREV-0099.

**Phạm vi giữ hoặc việc cần làm:** Đối soát với provider; thời điểm trừ lượt lỗi tiếp tục phần riêng No.62. Không đưa timeout thành câu khách.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.1.0;QA No.62.0

**Việc đội/provider:** Tech Lead/provider xác minh kết quả. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Trùng phần điều chỉnh0018 và kỹ thuật0034.

**Điều kiện Q&A:** EXCLUDED.

### FND-0020 — REJECT

Cổng chính thức và khả năng thu theo yêu cầu còn chờ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0020.md), SHA-256 `59f58e8bd579e6b1177a361160eee74ade7617d1e19a1c9f23a6c5f2cb671aa4`. Hồ sơ REV-0083.

**Phản biện/kết luận:** Tên cổng/khả năng thu là đầu vào đã giao theo GJ action1. Chưa có hạn chế provider thật khiến khách phải quyết phương án hành vi khác.

**Nguồn đối chiếu/phản biện:** GJ 合意事項 §6, アクション1; KS I104:I105; QA Q&A!H5:I5,H50:I50. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0100;CREV-0101;CREV-0102;CREV-0103;CREV-0104;CREV-0105.

**Phạm vi giữ hoặc việc cần làm:** Theo dõi nhận kết quả tại No.4/49; chỉ trình thay đổi khi có bằng chứng hạn chế và ảnh hưởng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.4.0;QA No.49.0

**Việc đội/provider:** Đầu mối Adesso/provider cung cấp kết quả; đội kiểm. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Không gộp với nghĩa ngày đăng ký0021 hoặc thông số0038.

**Điều kiện Q&A:** EXCLUDED.

### FND-0021 — ACCEPT

Nghĩa ngày bắt đầu tính phí và ranh giới kỳ video/thuê bao cần xác nhận

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0021.md), SHA-256 `96e11c07c6fe41cfbe652db9b7658130286931bcb9871379ba2898651d81c9ec`. Hồ sơ REV-0084.

**Phản biện/kết luận:** H53 còn hỏi nghĩa ngày đăng ký, chu kỳ tháng từ ngày đăng ký đang chờ provider. Không chia ngày/nghỉ giữa kỳ thu đủ đã được mô tả, R1 không đặt lại phần đó.

**Nguồn đối chiếu/phản biện:** YK2 P625,P638; KS I104,G106; GJ 合意事項 §6; QA Q&A!E53:I53,H50:I50; SD-T18 p20 T-16,p27. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0106;CREV-0107;CREV-0108;CREV-0109;CREV-0110;CREV-0111;CREV-0112;CREV-0113;CREV-0114.

**Phạm vi giữ hoặc việc cần làm:** Giữ sự kiện bắt đầu thu và kỳ cộng phí video; không hỏi lại nguyên tắc trọn tháng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.49.0;QA No.53.0;QA No.76.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Kích hoạt0011, dừng vì nợ0022, đầu vào provider0020.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0022 — ACCEPT

Manager dừng do chưa thanh toán chưa có trạng thái/chính sách đủ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0022.md), SHA-256 `dea756cbdd96e3cf8cc66e4af78059f2c1538fac96af7e801a892c2362d316f1`. Hồ sơ REV-0085.

**Phản biện/kết luận:** Đã rõ không tự dừng khi thu lỗi, nhưng hậu quả Manager dừng/quyền trả nợ/tiếp tục phí chưa rõ. Không thể mặc định dùng trạng thái nghỉ không phục hồi để giải quyết nợ.

**Nguồn đối chiếu/phản biện:** YK2 P626,P457; KS I119; QA Q&A!E63:I63,H47:I47; GJ 合意事項 §7 確認56. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0115;CREV-0116;CREV-0117;CREV-0118.

**Phạm vi giữ hoặc việc cần làm:** Giữ quyền dùng, thu kỳ tiếp theo và cách dùng lại sau trả nợ trong No.63; đội chọn cách biểu diễn trạng thái.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.63.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Không hỏi lại chính sách nghỉ0042; ngày bắt đầu0021.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0023 — ACCEPT

Khác biệt đường thao tác văn phòng và phần tài khoản còn mở cần đối chiếu bản màn mới

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0023.md), SHA-256 `97d179fd9aca9992ea41b67515cae30bbafb5960eabb85b0ab214dd1445927ee`. Hồ sơ REV-0086.

**Phản biện/kết luận:** Bản18/11 đã có app, Manager nối SNS và office cùng danh sách; P767 vẫn mô tả quản trị, H44 còn dẫn No.66. Email nhập đã có ở M-12, nên chỉ còn email vận hành/đầu mối và vòng đời, không hỏi như thiếu trường.

**Nguồn đối chiếu/phản biện:** YK2 P767; KS F109:F110,I63; QA Q&A!H44:I44,E66:I66; SD-M18 p9 M-06,p15 M-12,p33. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0119;CREV-0120;CREV-0121;CREV-0122;CREV-0123;CREV-0124;CREV-0125;CREV-0126;CREV-0127;CREV-0128;CREV-0129.

**Phạm vi giữ hoặc việc cần làm:** Đối chiếu khác biệt đường thao tác và giữ phần email vận hành/trạng thái/xóa chưa chốt; không đặt lại ai nối/có trong danh sách.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.20.0;QA No.43.0;QA No.66.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Chỉ office và quyết toán nội bộ đã ở0043.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0024 — ACCEPT

Đăng ký lại cùng email và đối tượng xóa sau nghỉ chưa chốt

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0024.md), SHA-256 `25acdc3290f7ff4e134929d4c9309fdc2827b68efac8c6f481e77f77fa233862`. Hồ sơ REV-0087.

**Phản biện/kết luận:** Không phục hồi trạng thái cũ và giữ dữ liệu6tháng chưa trả lời nộp đơn mới cùng email hay tập đối tượng xóa. E69 là phương án đội, chưa có phản hồi khách.

**Nguồn đối chiếu/phản biện:** KS I118:I119; YK2 P644; QA Q&A!E69:I69,H65:I65; GJ 合意事項 §5. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0130;CREV-0131;CREV-0132;CREV-0133;CREV-0134.

**Phạm vi giữ hoặc việc cần làm:** Giữ chính sách đăng ký mới cùng email và đối tượng xóa; đội xử lý xóa nhiều kho/callback.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.65.0;QA No.69.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Nộp lại sau bị từ chối0031; log/backup0037; không hỏi lại6tháng0042.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0025 — ACCEPT

Tạo nháp hằng ngày từ video tự làm chưa được chọn

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0025.md), SHA-256 `bfee052d1171d222802344f2c2bb0537a7c8be31fd009fdeb75e08273c652743`. Hồ sơ REV-0088.

**Phản biện/kết luận:** Lưu video và tạo nháp theo thứ tự1/ngày có mô tả YK2, nhưng KS32 chưa OK, H38 và SD-T18 p15 vẫn chờ xác nhận. CR-23 là phương án không thay quyết định.

**Nguồn đối chiếu/phản biện:** YK2 P717; KS A73:I73; QA Q&A!H38:I38; 追加要件!A24:N24; SD-T18 p15 T-11. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0135;CREV-0136;CREV-0137;CREV-0138.

**Phạm vi giữ hoặc việc cần làm:** Chỉ chọn có đưa hàng video tự làm tạo nháp theo ngày vào phạm vi hiện tại; không hỏi lại quyền gửi/lưu thông thường.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.37.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Quan hệ kỳ đăng ở0001; không xem video tự làm là toàn chế độ tự động.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0026 — ACCEPT

Khả năng dùng lại nháp cũ và quyền giữ/xóa tư liệu đang dùng cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0026.md), SHA-256 `3cd7b20045402d84ec676334f7cff4a44e9966a86151b8b9bfb77708c8d1451e`. Hồ sơ REV-0089.

**Phản biện/kết luận:** Thay ba chủ đề ngày sau đã có; quyền dùng nháp cũ và xử lý tư liệu còn hoạt động không được giải quyết bởi mốc6tháng sau nghỉ. R1 giao đội nghiên cứu dung lượng đúng action9.

**Nguồn đối chiếu/phản biện:** SD-T18 p11 T-07,p15 T-11; QA Q&A!E55:I55,H9:I9; YK2 P717; GJ アクション9. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0139;CREV-0140;CREV-0141;CREV-0142;CREV-0143;CREV-0144;CREV-0145.

**Phạm vi giữ hoặc việc cần làm:** Giữ khả năng dùng nháp cũ; quyền xóa tư liệu có lịch chỉ trình sau phương án bảo vệ của đội.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.55.0;QA No.8.0

**Việc đội/provider:** Đội trình phương án dung lượng trước phần chính sách phụ thuộc. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Sau nghỉ0024/0042; thứ tự video0025.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0027 — REJECT

Bộ dữ liệu kết quả cần chốt theo khả năng tài khoản thật

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0027.md), SHA-256 `eccee8e3f297e8b73318b00b362c89c27b9a72f450250e0d5052caa9088e48f4`. Hồ sơ REV-0090.

**Phản biện/kết luận:** KS và YK2 đã giới hạn dữ liệu theo dịch vụ và giao thử tài khoản thật. Thiếu ma trận trường/bằng chứng API là đầu việc tích hợp, chưa có tình huống bắt buộc đổi nghiệp vụ.

**Nguồn đối chiếu/phản biện:** KS F88:F89; YK2 P771–774,P783; guide Upload-Post §11. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0146;CREV-0147;CREV-0148;CREV-0149.

**Phạm vi giữ hoặc việc cần làm:** Đội/provider kiểm và ghi ma trận dữ liệu; chỉ mở việc khách khi kết quả thật làm đổi phạm vi.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** Tech Lead/provider kiểm tài khoản thật. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Gộp công việc năng lực với0038.

**Điều kiện Q&A:** EXCLUDED.

### FND-0028 — ACCEPT

Email cho Manager đã được yêu cầu nhưng thiếu phạm vi

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0028.md), SHA-256 `cd6766ddd945e65f7025543f2c592b6eb9a45e3060fcec1489712e0ee778ee85`. Hồ sơ REV-0091.

**Phản biện/kết luận:** Yêu cầu thêm email đã có nhưng chưa chọn loại sự kiện/người nhận/mức nội dung; SD-M18 p5/p27 còn cần xác nhận. Quyền xem chung không tự cho gửi nội dung nhạy cảm cho mọi người.

**Nguồn đối chiếu/phản biện:** KS G97:H97,G93:H93; QA Q&A!E75:I75; SD-M18 p5 M-02,p27. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0150;CREV-0151;CREV-0152;CREV-0153;CREV-0154.

**Phạm vi giữ hoặc việc cần làm:** Giữ phạm vi email của No.75; không hỏi lại có cần email hoặc cách gửi kỹ thuật.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.75.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Dùng tuyến phụ trách0009, không quyết lại tuyến nhận.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0029 — REJECT

Đã xử lý là theo người hay dùng chung chưa rõ đầy đủ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0029.md), SHA-256 `bbd721b78061cd917ba661ec6f063de67fd33c9505b1c193a514415dbe70dfe3`. Hồ sơ REV-0092.

**Phản biện/kết luận:** KS/SD đã mô tả đánh dấu thông báo đã xử lý và lọc. No.76 hỏi ẩn/hiện, không hỏi cờ xử lý cá nhân; chưa có trường hợp cộng tác cụ thể buộc khách chọn chung/riêng.

**Nguồn đối chiếu/phản biện:** KS F98:H98; SD-M18 p5 M-02 mục2,4; QA Q&A!E76:I76 確認46. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0155;CREV-0156;CREV-0157;CREV-0158.

**Phạm vi giữ hoặc việc cần làm:** Đội làm rõ mô hình xử lý theo màn hiện có; chỉ mở lại nếu có ví dụ thay hành vi cần khách.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.76.0

**Việc đội/provider:** BA/UX/Tech Lead. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Cạnh tranh request0034; không dùng tuyến duyệt0009 để suy cờ cá nhân.

**Điều kiện Q&A:** EXCLUDED.

### FND-0030 — ACCEPT

Thẩm quyền xác minh/cấp lại quyền quản trị khi mất phương tiện xác thực cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0030.md), SHA-256 `0b675e53815e5cbcc5fc8dd4201837c8be95d5936289bef330a1e8dfdfa7cb54`. Hồ sơ REV-0093.

**Phản biện/kết luận:** Xác thực hai bước/vô hiệu hóa và quên mật khẩu đã có, nhưng ai có quyền xác minh/cấp lại khi không còn người quản trị hợp lệ chưa rõ trong No.67. R1 tách guard/thuật toán sang đội.

**Nguồn đối chiếu/phản biện:** YK2 P608–611; KS F115; QA Q&A!E67:I67; SD-M18 p4 M-01,p21 M-18. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0159;CREV-0160;CREV-0161;CREV-0162;CREV-0163.

**Phạm vi giữ hoặc việc cần làm:** Đội đề xuất quy trình; khách chỉ định đầu mối và thẩm quyền khôi phục, không thiết kế MFA.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.67.0

**Việc đội/provider:** Đội an ninh trình quy trình/guard trước phần xác nhận phụ thuộc. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Không lặp kỹ thuật reset/retry0034/0036.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0031 — ACCEPT

Nộp lại sau từ chối và quyền thay đổi quyết định xét đơn cần làm rõ

**Phiên bản:** [R1](../../requirement-review/finding-revision-2026-11-19/findings/FND-0031.md), SHA-256 `01f6b753cd1330c772f7fdbcd495ec01a96279a862997afdc769dde1282a8514`. Hồ sơ REV-0094.

**Phản biện/kết luận:** No.65 chưa có quyết định về nộp lại sau từ chối/đổi quyết định/đơn chờ. H26 chỉ hướng đọc hạn7ngày, không phải khách duyệt; R1 đã giao TTL/cấp lại cho đội.

**Nguồn đối chiếu/phản biện:** KS F32; QA Q&A!G12:I12,H26:I26,E65:I65; SD-M18 p6 M-03. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0164;CREV-0165;CREV-0166;CREV-0167;CREV-0168;CREV-0169.

**Phạm vi giữ hoặc việc cần làm:** Giữ quyền xét/nộp lại và cách xử lý đơn chờ; không hỏi lại phương thức tự đăng ký đã chốt.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.11.0;QA No.25.0;QA No.65.0;QA No.69.0

**Việc đội/provider:** Đội triển khai thiết kế theo hành vi khách chốt. **Cần khách quyết:** CÓ — chỉ phạm vi retained_scope_or_action; không hỏi lại ý đã chốt.

**Trùng lặp:** Cùng email sau nghỉ0024/No.69; kỹ thuật mật khẩu đội xử lý.

**Điều kiện Q&A:** CONTENT_ACCEPT_CANDIDATE — chỉ xét WORKING_DRAFT khi có lệnh riêng và đủ đầu vào phần phụ thuộc.

### FND-0032 — REJECT

Thiếu bản hiệu lực để xác nhận phạm vi thương mại/phát hành

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0032.md), SHA-256 `5dc518a36d185b9a8003851f3ecfda5992392a194b8d83d11e263b73838b27e1`. Hồ sơ REV-0095.

**Phản biện/kết luận:** Không có bản ký trong bộ nguồn không chứng minh hai bên chưa ký ngoài repository. Đây là đối chiếu văn bản hiệu lực đã có nơi theo dõi, không phải câu hỏi hành vi mới.

**Nguồn đối chiếu/phản biện:** YK2 P104–106,P919–923,P966–969; QA Q&A!H35:I35; 保留!E2:I2. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0170;CREV-0171;CREV-0172;CREV-0173;CREV-0174;CREV-0175;CREV-0176.

**Phạm vi giữ hoặc việc cần làm:** Chủ dự án/FutureCore nhận và đối chiếu bản ký/change approval; không coi Close, CR hoặc màn là phê duyệt thương mại.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.34.0;QA 保留 No.50;QA No.39.0;QA No.44.0

**Việc đội/provider:** Chủ dự án/đầu mối thương mại. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Dependency thương mại chung, không nhân thành câu hỏi cho từng hành vi.

**Điều kiện Q&A:** EXCLUDED.

### FND-0033 — REJECT

Trang kết nối, luồng SNS trực tiếp và thời hạn cần đối chiếu

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0033.md), SHA-256 `130630936f1f3a3e3914dd478a792724256930e9903b282cafddebe0518871b7`. Hồ sơ REV-0096.

**Phản biện/kết luận:** 48giờ thuộc trang kết nối YK2;15phút là lựa chọn nội bộ UP-Q02. Chưa chứng minh hai hạn cùng đối tượng hoặc cần khách chọn API; bản SD đi thẳng màn SNS không tự xóa hạn nguồn.

**Nguồn đối chiếu/phản biện:** YK2 P742–743; SD-T18 p9 T-05; guide Upload-Post §1/§6/UP-Q02. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0177;CREV-0178;CREV-0179;CREV-0180.

**Phạm vi giữ hoặc việc cần làm:** Đội map trang/link/token, giữ hành vi nguồn hoặc trình thay đổi cụ thể có ảnh hưởng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** FutureCore/Tech Lead/provider. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Kiểm điều kiện SNS0038; số tài khoản/ai nối đã0044.

**Điều kiện Q&A:** EXCLUDED.

### FND-0034 — REJECT

Đối soát kết quả ngoài, chống lặp và đồng thời là việc đội tích hợp

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0034.md), SHA-256 `88a9daf1e89e60885327213365e7f918a808eae0cd6e8f74f6a65478a13a1b64`. Hồ sơ REV-0097.

**Phản biện/kết luận:** Đối soát, chống lặp và đồng thời là thiết kế tích hợp; guide đã có cơ chế và chưa có bằng chứng lỗi thực tế/chính sách mới cần khách.

**Nguồn đối chiếu/phản biện:** YK2 P747–755,P725–726,P879; guide Upload-Post §10 và UP-D3. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0181;CREV-0182;CREV-0183;CREV-0184.

**Phạm vi giữ hoặc việc cần làm:** Đội kiểm side effect/retry của từng dịch vụ; hành vi quyền/phí dùng finding nghiệp vụ tương ứng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** Tech Lead/provider/QA. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Bao gồm đối soát của0019/0007, không đóng chính sách riêng.

**Điều kiện Q&A:** EXCLUDED.

### FND-0035 — REJECT

Snapshot, xung đột ghi file và phục hồi gửi/tạo tài nguyên thuộc thiết kế đội

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0035.md), SHA-256 `bec47d6e5d676f94c9e0b406c1dbbfde20743e3da5906fa768834ac7ae4a89c4`. Hồ sơ REV-0098.

**Phản biện/kết luận:** QA22 đã giao lỗi đọc file cho thiết kế; guide OneDrive có snapshot/eTag/phục hồi. Thiếu kiểm chứng cài đặt không bắt khách chọn cách lưu/khóa/ghi file.

**Nguồn đối chiếu/phản biện:** QA Q&A!H23:I23,H9:I9; KS F9; YK2 P712–713,P716; guide OneDrive §7.3. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0185;CREV-0186;CREV-0187;CREV-0188;CREV-0189.

**Phạm vi giữ hoặc việc cần làm:** Đội kiểm cơ chế; hồ sơ đủ ở0010, quyền giữ/xóa ở0024/0026.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.22.0;QA No.8.0

**Việc đội/provider:** Tech Lead/đội tích hợp. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Không nhân tiêu chí đủ0010/0012 thành câu snapshot.

**Điều kiện Q&A:** EXCLUDED.

### FND-0036 — REJECT

Hủy biểu mẫu, validation và lỗi trình bày cần đội thiết kế

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0036.md), SHA-256 `693ee11c8875c94019a224d0d26d7b4487ea27c867a93922c24f3e17b2791887`. Hồ sơ REV-0099.

**Phản biện/kết luận:** M-20 đã mô tả hủy không lưu; nguồn có tải/rỗng/lỗi. Chưa có căn cứ yêu cầu khách chọn lưu nháp/thu hồi tác vụ đã gửi trên từng form.

**Nguồn đối chiếu/phản biện:** SD-M18 p23 M-20 mục3; SD-T18 p5 T-01; YK2 P801,P664–668. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0190;CREV-0191;CREV-0192;CREV-0193;CREV-0194.

**Phạm vi giữ hoặc việc cần làm:** Đội đặc tả tương tác/validation trong phạm vi có sẵn, không tự thêm chức năng để xin duyệt.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** UX/Tech Lead/QA. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Không kéo các finding hồ sơ/đơn thành câu hủy từng màn.

**Điều kiện Q&A:** EXCLUDED.

### FND-0037 — REJECT

Giờ vận hành, backup, retention log và phục hồi là phần đội đề xuất

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0037.md), SHA-256 `b3afaeb46d1fd14da7ffff836901440e0607479b353dea4c05835741c3e46c23`. Hồ sơ REV-0100.

**Phản biện/kết luận:** YK2 và H30 giao giờ vận hành, log, backup cho thiết kế. Việc cần cam kết kỹ thuật không biến số ngày log/kiến trúc backup thành quyết định khách còn thiếu.

**Nguồn đối chiếu/phản biện:** YK2 P878–885; QA Q&A!H30:I30; KS I118. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0195;CREV-0196;CREV-0197.

**Phạm vi giữ hoặc việc cần làm:** Đội đề xuất và kiểm khôi phục; chỉ thay quyền dữ liệu/phạm vi mới dẫn finding nghiệp vụ.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.29.0

**Việc đội/provider:** Tech Lead/QA/vận hành. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Phạm vi xóa0024; không hỏi lại6tháng0042.

**Điều kiện Q&A:** EXCLUDED.

### FND-0038 — REJECT

Điều kiện tài khoản và tham số tích hợp cần kiểm với bên cung cấp

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0038.md), SHA-256 `6b43ce3d13b2f1fd2070b8bf8a5b0148897d463fd4dbc11fd1b1d4e502ac8680`. Hồ sơ REV-0101.

**Phản biện/kết luận:** Tài khoản/gói/quyền chia sẻ và điều kiện hệ thống cũ là thông tin cần IT/provider cung cấp. Chưa có kết quả thử buộc khách đổi hành vi/quyền riêng tư.

**Nguồn đối chiếu/phản biện:** YK2 P752,P771,P871; QA Q&A!H9:I9,H25:I25; guide Upload-Post §1,§11. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0198;CREV-0199;CREV-0200;CREV-0201;CREV-0202.

**Phạm vi giữ hoặc việc cần làm:** Giữ checklist và nhận đầu vào No.8/24; trình thay đổi chỉ khi có bằng chứng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.8.0;QA No.24.0

**Việc đội/provider:** Tech Lead/provider/IT Adesso. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Năng lực dữ liệu0027, hạn kết nối0033 là cùng tuyến đội/provider.

**Điều kiện Q&A:** EXCLUDED.

### FND-0039 — REJECT

Đã chốt AI viết lại tối đa2 lần và Talent được sửa tay

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0039.md), SHA-256 `0c63e495eb18f08148c33f1e00c9dfe682478def152f0137d0851208850a8687`. Hồ sơ REV-0102.

**Phản biện/kết luận:** KS I64/I65 và GJ §1 đã quyết sửa tay/tối đa2 lần AI. Đây là ý đã trả lời, không phải câu khách mới.

**Nguồn đối chiếu/phản biện:** KS I64:I65; GJ 合意事項 §1; QA Q&A!H40:I40. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0203;CREV-0204;CREV-0205;CREV-0206.

**Phạm vi giữ hoặc việc cần làm:** Đồng bộ đặc tả nội bộ; lỗi retry mạng không tự là yêu cầu viết lại mới.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.39.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Quyền sửa bài từ cấm0003 vẫn mở đúng phạm vi.

**Điều kiện Q&A:** EXCLUDED.

### FND-0040 — REJECT

Đã bỏ trần số bài/ngày vì chi phí

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0040.md), SHA-256 `e0566e02a243b6f4a2f428c0ad0d95c5d9bd91c6954925adee38d8e858f96ff2`. Hồ sơ REV-0103.

**Phản biện/kết luận:** KS I86/GJ xác nhận37 đã bỏ trần bài/ngày vì chi phí. Quota provider không cho phép hỏi lại trần sản phẩm.

**Nguồn đối chiếu/phản biện:** KS I86; GJ 合意事項 §7 確認37; QA Q&A!H56:I56. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0207;CREV-0208;CREV-0209.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại số bài tối đa; chỉ giữ rải giờ0006 và kiểm provider.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.56.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** 0006 giờ;0038 quota.

**Điều kiện Q&A:** EXCLUDED.

### FND-0041 — REJECT

Đã xác nhận Manager xem hội thoại và báo trước Talent

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0041.md), SHA-256 `83fb1509bc043af036c151c47a807d7358b9fe6f27d22d37c1c8282d29177e7b`. Hồ sơ REV-0104.

**Phản biện/kết luận:** KS xác nhận42 OK và H8 ghi bỏ ý kiến riêng tư cũ; Talent được báo trước quyền Manager xem hội thoại. Không còn quyết định mới cho đúng ý này.

**Nguồn đối chiếu/phản biện:** KS A94,F94,F43; QA Q&A!H8:I8; SD-T18 p7 T-03. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0210;CREV-0211;CREV-0212.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại quyền xem; phạm vi email xử lý riêng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.7.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Không đóng0028 vì Manager xem được dữ liệu.

**Điều kiện Q&A:** EXCLUDED.

### FND-0042 — REJECT

Đã chốt giữ6 tháng và không bật lại Talent đã nghỉ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0042.md), SHA-256 `32b7524aa85b4714a08315bac78806ef17a77f6393434f81836488f3e44d6c5a`. Hồ sơ REV-0105.

**Phản biện/kết luận:** Sáu tháng, tự xóa không phục hồi và không đưa Talent nghỉ về đang dùng đã có quyết định nguồn; không hỏi lại toàn bộ vòng đời.

**Nguồn đối chiếu/phản biện:** KS I118:I119; GJ 合意事項 §5,§7 確認56; QA Q&A!H11:I11,H64:I64; SD-T18 p28. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0213;CREV-0214;CREV-0215;CREV-0216;CREV-0217.

**Phạm vi giữ hoặc việc cần làm:** Chỉ đối tượng xóa/nộp mới cùng email còn0024; giữ đúng ý đã chốt.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.10.0;QA No.64.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** 0024 và0022 không được tự đóng.

**Điều kiện Q&A:** EXCLUDED.

### FND-0043 — REJECT

Đã thu hẹp đăng thay chỉ office và quyết toán video nội bộ

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0043.md), SHA-256 `0c8e03cda9d0c0d9d259d4682468e85dd0890aa8632ebb5ad314ef7fa8f12d1c`. Hồ sơ REV-0106.

**Phản biện/kết luận:** Quyết định17/11 thu hẹp đăng thay chỉ office; KS UC-12-5 đã nêu phí video quyết toán nội bộ. CR cũ mô tả đăng thay Talent không vượt quyết định cùng chủ đề mới hơn.

**Nguồn đối chiếu/phản biện:** KS I63,F112; GJ 合意事項 §7 確認27; QA Q&A!H44:I44,H49:I49; SD-M18 p33. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0218;CREV-0219;CREV-0220;CREV-0221.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại đối tượng đăng thay/thu video office qua cổng.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.43.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** 0023 giữ đường thao tác/email/vòng đời.

**Điều kiện Q&A:** EXCLUDED.

### FND-0044 — REJECT

Đã chốt1 tài khoản mỗi SNS và unit là office

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0044.md), SHA-256 `2c4d44dfcce7eb3ffb598687f10871624c77459059f1bcc91f309d82d72d1444`. Hồ sơ REV-0107.

**Phản biện/kết luận:** KS I39/I40/GJ đã quyết Talent tự nối, một tài khoản mỗi SNS và unit là office. Ghi chú cũ nhiều tài khoản đã bị thay đúng chủ đề.

**Nguồn đối chiếu/phản biện:** KS I39:I40; GJ 合意事項 §7 確認9/10; QA Q&A!H24:I24; SD-T18 p9 T-05. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0222;CREV-0223;CREV-0224;CREV-0225.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại ai nối/số tài khoản.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.23.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Không kết luận hạn48giờ/15phút đã giải quyết ở0033.

**Điều kiện Q&A:** EXCLUDED.

### FND-0045 — REJECT

Đã chốt thứ tự3 cấp, thử/lưu và quay bản

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0045.md), SHA-256 `ca3e3f032e7fba19ca78512a4b2f48f4a2728fd7f9049e8c12def31474d9eae2`. Hồ sơ REV-0108.

**Phản biện/kết luận:** KS I28/I29 xác nhận đúng hướng thứ tự3cấp, thử/lưu/lịch sử/quay bản. Bản màn giữ hướng đó, không cần quyết lại từ đầu.

**Nguồn đối chiếu/phản biện:** KS F28:I29; GJ 合意事項 §7 確認6/7; SD-M18 p17 M-14,p18 M-15,p30. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0226;CREV-0227;CREV-0228;CREV-0229.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại3cấp; tình huống cùng cấp cần chứng cứ0013.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** 0013 không tự đóng vì thứ tự giữa các cấp rõ.

**Điều kiện Q&A:** EXCLUDED.

### FND-0046 — REJECT

Đã quyết có hai chế độ và Talent tự chọn

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0046.md), SHA-256 `f2a0f989db2ed452c6280fe133f79f917ee04f98d303b3c99d1fec1028034132`. Hồ sơ REV-0109.

**Phản biện/kết luận:** Hai chế độ và quyền Talent tự chọn được KS/GJ quyết rõ. Cần chi tiết vận hành không có nghĩa phải hỏi lại có chế độ tự động hay không.

**Nguồn đối chiếu/phản biện:** KS I52,I61:I62; GJ 合意事項 §1; SD-T18 p12 T-08,p23. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0230;CREV-0231;CREV-0232.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại nhu cầu khung; chi tiết kỳ/duyệt ở0001/0002.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại Chưa có No. riêng; không cấp mới trong lượt review

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** 0001 vòng đời;0002 điều kiện đăng.

**Điều kiện Q&A:** EXCLUDED.

### FND-0047 — REJECT

Đã xác nhận mục tiêu follower theo từng SNS

**Phiên bản:** [GAP_ORIGINAL](../../requirement-review/gap-analysis-2026-11-19/findings/FND-0047.md), SHA-256 `f2d33d69b5c1009c2f460fabc50e3a96b656571eea3d97a7f1073ee29b695c5d`. Hồ sơ REV-0110.

**Phản biện/kết luận:** KS F25 kèm OK, YK2 và SD-T18 đã mô tả mục tiêu từng SNS. Đề xuất25/50/75 trong H15 chưa là khách duyệt, nhưng cũng không làm mất căn cứ mục tiêu từng mạng.

**Nguồn đối chiếu/phản biện:** KS A25,F25:I25,F17,G90; QA Q&A!H15:I15,H43:I43; SD-T18 p10 T-06. Đúng phiên bản/hash ở source-snapshot và nguyên văn ở source-evidence; chứng cứ CREV-0233;CREV-0234;CREV-0235;CREV-0236;CREV-0237.

**Phạm vi giữ hoặc việc cần làm:** Không hỏi lại mục tiêu từng SNS; giữ milestone đề xuất để xác nhận đúng mốc/màn, không tự đóng toàn RV-22.

**Đã trả lời/kế thừa No.:** Đã tìm QA đủ5sheet, KS/GJ/SD và tracking nội bộ; tiếp tục đúng phần còn mở tại QA No.14.0;QA No.42.0

**Việc đội/provider:** BA/đội đồng bộ. **Cần khách quyết:** KHÔNG — đầu vào/thiết kế hoặc đã có quyết định.

**Trùng lặp:** Không gộp kết luận mục tiêu với quyết định milestone còn đề xuất.

**Điều kiện Q&A:** EXCLUDED.

## Kết luận liên finding

| Nhóm quyết định | Nơi quản lý chính | Ranh giới cần giữ |
|---|---|---|
| Kỳ đăng / chế độ / sửa từ cấm / dừng | 0001 /0002 /0003 /0008 | Không hỏi lại có chế độ; dừng kỳ do Talent khác dừng vận hành |
| Lịch sử duyệt / giờ / đăng lại / trạng thái tổng | 0005 /0006 /0007 /0004 | Tái dùng quy tắc giờ; trạng thái tổng chờ phương án, không hỏi enum |
| Hồ sơ đủ / trạng thái sử dụng / trường M-20 / ngày thu | 0010 /0011 /0012 /0021 | Không gộp thành một mốc kích hoạt hoặc hỏi cùng tiêu chí hai lần |
| Thử thách / ngày liên tiếp | 0016 /0017 | Nguồn đánh giá đã có ý tưởng; reset được hẹn vận hành |
| Giá / kết quả video chưa rõ | 0018 /0034 | 0019 không sinh chính sách tài chính mới; No.62 theo đúng phần còn mở |
| Tuyến phụ trách / phạm vi email | 0009 /0028 | Người nhận email dùng cùng tuyến; quyền xem không tự là quyền duyệt |
| Nợ / nghỉ và đăng ký mới / nộp lại sau từ chối | 0022 /0024 /0031 | Không mặc định ngừng vì nợ là nghỉ không phục hồi |
| Dữ liệu SNS / điều kiện provider | 0038, việc0027 | Kiểm thật trước; không hỏi khách chọn trường API |

## Giới hạn chuyển bước và phê duyệt

ACCEPT là kết quả nội dung cho đúng hash, không phải chữ ký ACCEPTED, G5 PASS hay khách chốt hành vi. Theo WCP-0001, có thể xét chuẩn bị WORKING_DRAFT khi có lệnh soạn riêng và đủ bằng chứng/quyết định còn mở; không đổi eligibility cũ hoặc ký gate để mở nhánh. Chỉ ACCEPT và REWRITE đã được sửa rồi ACCEPT sau kiểm lại đúng bản mới mới được xét. Trong lượt hiện hành không còn REWRITE; các bản R1 được đánh giá trực tiếp, hai bản0004/0016 vẫn cần thêm bằng chứng và0013 chưa đủ chứng minh phần khách phải quyết.

Chưa soạn/gửi Q&A trong tác vụ này; FND-0017 vẫn chờ vận hành.20 REJECT và3 NEED_MORE_EVIDENCE không vào tập soạn. APPROVED_QA/gửi ngoài giữ điều kiện và ủy quyền riêng.

Đã thêm47 dòng review mới vào reviews.csv, giữ status OPEN, không tạo chữ ký độc lập bằng người. Các bản review AI trước và tác giả Analyst cũng ghi Codex; hồ sơ này là hỗ trợ phản biện theo vai trò được giao, không tự thay người chịu trách nhiệm độc lập. Không thay gate-runs, findings/requirements, bản R1, bản gốc, nguồn khách hoặc workbook15. Các mốc gate lịch sử giữ nguyên; lượt này không tự ký PASS.

Người xử lý tiếp: BA/Tech Lead/FutureCore cung cấp phương án cho0004/0013/0016 và các đầu việc đội đã nêu; chủ vận hành giữ mốc0017; reviewer kiểm lại đúng hash phần được bổ sung. Khách chỉ quyết phần hành vi/chính sách/phạm vi thực sự còn mở.

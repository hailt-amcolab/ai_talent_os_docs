# Kiểm chứng lại 16 finding R1 sau Independent Review

Ngày/người kiểm: 2026-11-19T12:40:04+07:00; Codex — reviewer AI theo lệnh người dùng. **Chỉ review nội dung đã thay đổi, không ký hoặc đổi trạng thái Quality Gate.**

## Phạm vi và kết quả

Đối tượng là 16 tệp R1 tại [finding-revision-2026-11-19/findings](../finding-revision-2026-11-19/REVISED_FINDINGS.md), không phải 16 tệp lịch sử trong gap-analysis. Cả16 bản lưu trước sửa khớp hash được review lần trước; cả16 bản R1 có hash khác và khớp hash Analyst giao. Sổ Finding hiện trỏ R1. Không phân loại lại31 finding ngoài phạm vi; chỉ dùng tham chiếu của chúng để tránh trùng.

| Kết quả nội dung | Số |
|---|---:|
| ACCEPT | 14 |
| REWRITE | 0 |
| REJECT | 0 |
| NEED_MORE_EVIDENCE | 2 |

**14 ACCEPT** áp dụng đúng phần phạm vi được giữ sau sửa. **FND-0004 và FND-0016 cần thêm bằng chứng đối chiếu/phương án của đội**, không phải cần khách cung cấp thêm tài liệu gốc để hợp thức hóa finding. Những nguồn hiện có chứng minh chủ đề còn mở; chúng chưa chứng minh hết phần nào phải chuyển thành quyết định khách sau khi đội làm việc đã được giao.

FND-0017: ACCEPT bản ghi dependency vận hành; **không hỏi ngay và không đổi mốc vận hành đã hẹn**. Các ACCEPT khác có đầu việc đội đi trước vẫn phải giữ thứ tự đó cho phần phụ thuộc, nêu riêng từng mục. Không có kết quả ACCEPTED của người ký độc lập, G5 PASS, APPROVED_QA hoặc Customer Confirmed được tạo từ đợt này.

## Bằng chứng và cách kiểm

- Mở lại DOCX YK2 từ word/document.xml; mở lại workbook QA/KS từ XML gốc; trích lại hai PDF18/11 bằng pdftotext; mở lại biên bản GJ gốc. Kiểm hash12 nguồn trùng snapshot cũ. Không dùng “tác giả đã đọc nguồn” hoặc PASS validator làm bằng chứng kết luận nghiệp vụ.
- Kiểm96 lượt nguồn của R1 (cộng một ô nguồn bổ sung của reviewer): tệp/hash, locator và nội dung trích đều khớp. Dữ liệu mới ở [evidence-recheck.csv](evidence-recheck.csv) chứa nguyên văn mở lại, hash nguồn, checker/ngày và giới hạn; RCEV nối RWEV Analyst để truy ngược. Bổ sung đọc KS F9 (RCEV-0097) để kiểm điều kiện chưa có hồ sơ thì chưa tạo nháp của0011; nội dung được ghi rõ trong nhận xét0011, không tự lấy thiếu hồ sơ làm quyền mới.
- Đọc ngữ cảnh trả lời/đề xuất/trạng thái của các No. liên quan; rà đủ5 sheet QA. Hai sheet góp ý thiết kế và nội dung thông báo chỉ có hàng tiêu đề chứa nội dung; 保留 No.50 chưa có trả lời và các dòng CR là phân loại/đề xuất, không thay phê duyệt khách. Rà KS/GJ và các mô tả màn có thể phủ định phần thiếu. Không suy Open đồng nghĩa mọi ý của No. đều chưa được mô tả.
- Đã xem trực quan SD-M18 p23 M-20, p32 dừng/mở lại, p33 office và SD-T18 p18 T-14. Các trang khác dùng văn bản/ô nguồn. Chưa xem lại hình5-1 YK2; vì vậy0004 không có kết luận về connector/trạng thái trong hình. Tên/số minh họa không là quy tắc khách chốt.
- So sánh bản cũ–R1, comment cũ, phạm vi bị loại, thông tin thiếu, quyết định giữ lại và chống trùng. [changed-scope.csv](changed-scope.csv) và [recheck-results.csv](recheck-results.csv) lưu đúng hash bản đã kiểm. Snapshot R1 và bản review cũ giữ nguyên.

### Chỉnh độ chính xác locator trong hồ sơ kiểm lại

Một số dòng source-audit R1 ghi A:J nhưng trích thêm ô sau J (ví dụ CR-22 có K23/N23); hai dòng GJ:actions trích toàn biên bản. Nội dung trích có thật, không phải bằng chứng giả. Hồ sơ lần này ghi phạm vi ô đầy đủ và mục GJ dùng cho kết luận; không sửa source-audit R1 hoặc nguồn gốc. Không vì nội dung đúng mà coi mọi ghi chú CR đã được khách phê duyệt.

## Kết quả từng finding

### FND-0001 — ACCEPT

Quy tắc ghép và dùng tư liệu khi đổi/kết thúc kỳ đăng cần làm rõ

- Review trước: REV-0001 / REWRITE. Kiểm lại lần này: **REV-0048**.
- Bản đã kiểm: [FND-0001 R1](../finding-revision-2026-11-19/findings/FND-0001.md), SHA-256 `3e2a48dbc25d2da1793e8479989c9907775f093dc55ba4c0bca4cc70cfea562f`.
- Nhận xét cũ: Khoảng trống kỳ đăng có thật, nhưng nhịp tạo bài và tạo trước/hằng ngày đang thuộc phương án FutureCore phải đề xuất; không giao toàn bộ lựa chọn triển khai cho khách.
- Yêu cầu sửa cũ: Chỉ giữ ghép/tái dùng tư liệu, kết quả khi hết tư liệu, đổi/kết thúc kỳ có tác động người dùng. FutureCore đưa phương án nhịp tạo trước khi yêu cầu khách chọn.

**Nhận xét đã được xử lý chưa:** Đã xử lý: bỏ chọn cách sinh bài khỏi quyết định mặc định của khách; tách dừng vận hành và gate duyệt.

**Kết luận và phản chứng:** R1 giữ đúng ghép/tái dùng tư liệu, hết tư liệu và kết thúc/đổi kỳ; GJ §1/action7 giao FutureCore đề xuất nhịp sinh, còn No.70 chưa trả lời các hành vi giữ lại. Không dùng thiếu phương án sinh bài để hỏi khách thiết kế.

**Căn cứ gốc:** KS 確認事項!I61:I62; GJ 合意事項 §1, アクション7; QA Q&A!E70:I70; SD-T18 p12 T-08,p23. Lượt mở lại: RCEV-0001, RCEV-0002, RCEV-0003, RCEV-0004, RCEV-0005, RCEV-0006, RCEV-0007. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Có thể tiếp tục phần chính sách dùng tư liệu/kết quả kỳ; FutureCore vẫn phải chuẩn bị phương án nhịp tạo trước phần phụ thuộc phương án ấy.

**Chống trùng:** Dừng vận hành chung thuộc FND-0008; quan hệ chế độ/duyệt thuộc FND-0002.

**Q&A cũ:** No.70. **Bên xử lý:** FutureCore đề xuất nhịp; khách chốt cách dùng tư liệu/kết quả kỳ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0004 — NEED_MORE_EVIDENCE

Cách hiển thị kết quả bài khi các SNS có kết quả khác nhau cần đội lập phương án

- Review trước: REV-0004 / REWRITE. Kiểm lại lần này: **REV-0049**.
- Bản đã kiểm: [FND-0004 R1](../finding-revision-2026-11-19/findings/FND-0004.md), SHA-256 `344391ce64479b23f34769215d356a4f2e6cf532ce720b15edeeb8df6fc0306d`.
- Nhận xét cũ: No.51 giao AMCOLAB cập nhật danh sách trạng thái; nguồn đã yêu cầu lưu kết quả theo từng SNS. Thiếu enum/sơ đồ nội bộ không tự là quyết định khách.
- Yêu cầu sửa cũ: Đội lập bảng trạng thái và cách tổng hợp trước; chỉ giữ nhãn người dùng thấy và thao tác khi một phần SNS thành công/chưa rõ. Không hỏi khách thiết kế enum.

**Nhận xét đã được xử lý chưa:** Đã sửa diễn đạt về enum/thiếu toàn bộ trạng thái; chưa hoàn thành phần đội lập phương án và xác định quyết định khách còn lại.

**Kết luận và phản chứng:** R1 nói đội sẽ lập bảng nhưng chưa gắn một bảng tổng hợp cụ thể, tình huống đầu vào/nhãn đầu ra và phần cần khách chọn. No.51 là đầu việc cập nhật của AMCOLAB, không tự chứng minh khách phải quyết nhãn tổng. Các bảng TRANS trước đó vẫn là tái dựng có UNDEFINED, không thay được phần đối chiếu còn thiếu.

**Căn cứ gốc:** YK2 §5-1 P504–507, chức năng8-3 P748; QA Q&A!G51:I51,E59:I59; SD-T18 p18 T-14; SD-M18 p11 M-08. Lượt mở lại: RCEV-0008, RCEV-0009, RCEV-0010, RCEV-0011, RCEV-0012, RCEV-0013. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Đội lập phương án minh họa ít nhất trường hợp thành công một phần/chưa rõ; map từng thao tác đã có và tách phần khác nhau về hành vi cần thẩm quyền khách. Gắn artifact/hash để reviewer kiểm; không hỏi enum.

**Chống trùng:** Đích đăng lại thuộc FND-0007; vòng đời kỳ thuộc FND-0001.

**Q&A cũ:** No.51; giao điểm No.59. **Bên xử lý:** BA/Tech Lead lập bảng; reviewer kiểm phần còn cần khách.

**Chuyển bước nội dung:** KHÔNG xét soạn từ R1 này; chờ bằng chứng đối chiếu/phương án đội và kiểm lại nội dung.

### FND-0005 — ACCEPT

Lịch sử và hiệu lực duyệt sau sửa/gửi lại cần làm rõ

- Review trước: REV-0005 / REWRITE. Kiểm lại lần này: **REV-0050**.
- Bản đã kiểm: [FND-0005 R1](../finding-revision-2026-11-19/findings/FND-0005.md), SHA-256 `9d643efe7b27158c25a2c146f70f9b885ed475fce59f6e5e4490572d2e59b3e8`.
- Nhận xét cũ: Gửi duyệt lại đã được xác nhận, SD-M18 p8 mô tả rõ Talent sửa rồi xin duyệt lại. Cùng ID hay tạo ID mới là thiết kế; chỉ lịch sử người dùng thấy, bản nội dung được duyệt và giờ mới là quyết định nghiệp vụ.
- Yêu cầu sửa cũ: Bỏ yêu cầu khách chọn quan hệ ID/bản ghi; giữ lịch sử duyệt, hiệu lực duyệt trên bản sửa và quy tắc giờ sau trả lại.

**Nhận xét đã được xử lý chưa:** Đã xử lý: bỏ ID/bản ghi kỹ thuật; giữ lịch sử người dùng, bản được duyệt và dẫn giờ về0006.

**Kết luận và phản chứng:** KS xác nhận35 và SD-M18 p8 đã cho sửa rồi gửi duyệt lại. No.58 còn đề xuất giữ lịch sử chưa có phản hồi. R1 không hỏi lại có chức năng trả bài và không tự coi bản sửa đã được duyệt.

**Căn cứ gốc:** KS 確認事項!F78:H78; QA Q&A!G36:I36,E58:I58; SD-M18 p8 M-05. Lượt mở lại: RCEV-0014, RCEV-0015, RCEV-0016, RCEV-0017. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Chỉ giữ phạm vi lịch sử/bản nội dung được xem và duyệt; việc phải xin duyệt lại đã có, không đưa thành lựa chọn bỏ duyệt. Giờ dùng quyết định FND-0006.

**Chống trùng:** Quy tắc quá giờ dùng chung FND-0006, dẫn chiếu thay vì hỏi lặp.

**Q&A cũ:** No.58. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0007 — ACCEPT

Đích SNS và giờ khi đặt lịch lại sau lỗi cần làm rõ

- Review trước: REV-0007 / REWRITE. Kiểm lại lần này: **REV-0051**.
- Bản đã kiểm: [FND-0007 R1](../finding-revision-2026-11-19/findings/FND-0007.md), SHA-256 `969677f26bdca1a5c2abeaa78c9f49d7b84f6509fb8278c91b0ffddf03582b56`.
- Nhận xét cũ: SD-T18 p18 đã mô tả nút mở T-10, Talent chấp nhận lại và hệ thống đặt giờ mới; Manager cũng đặt lại được. Không còn căn cứ nói thiếu toàn bộ thao tác/kết quả. Đích SNS và cách chọn giờ vẫn chưa rõ.
- Yêu cầu sửa cũ: Thu hẹp thành đăng lại SNS lỗi hay tất cả và quy tắc giờ mới. Ghi nhận đường thao tác đã có trong bản màn, chưa coi đó là khách trả lời toàn No.59.

**Nhận xét đã được xử lý chưa:** Đã xử lý: công nhận đường thao tác hiện hành, chỉ giữ đích SNS/giờ.

**Kết luận và phản chứng:** SD-T18 p18 đã mô tả mở T-10, Talent chấp nhận lại và đặt giờ mới; YK2 P755 không tự đăng lại. No.59 vẫn chưa chốt chỉ mạng lỗi hay tất cả và nguyên tắc giờ; R1 giữ đúng phần đó.

**Căn cứ gốc:** YK2 chức năng8-5 P755; QA Q&A!E59:I59; SD-T18 p18 T-14 mục5; SD-M18 p11 M-08. Lượt mở lại: RCEV-0018, RCEV-0019, RCEV-0020, RCEV-0021. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Không hỏi lại nút/màn; tách khỏi chống lặp kỹ thuật, dùng quy tắc quá giờ chung0006.

**Chống trùng:** Chống lặp kỹ thuật ở FND-0034; giờ quá hạn ở FND-0006.

**Q&A cũ:** No.59. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0008 — ACCEPT

Phần còn mở về bài trong lúc dừng, hủy/dùng lại và dừng toàn kỳ

- Review trước: REV-0008 / REWRITE. Kiểm lại lần này: **REV-0052**.
- Bản đã kiểm: [FND-0008 R1](../finding-revision-2026-11-19/findings/FND-0008.md), SHA-256 `3d817eb90246141aeaf91251232e6170aa8914e2b3738127c5c0ee7c728fc0f4`.
- Nhận xét cũ: Các đường dừng/hủy đã được mô tả. Hủy lịch và không phục hồi sau mở lại vẫn mang 要確認 ở SD-M18 p32, không được đóng; song scope hiện tại gộp ba quyết định và việc đối soát kỹ thuật.
- Yêu cầu sửa cũ: Giữ từng phần riêng theo No.60 (bài mới trong lúc dừng), No.61 (báo/hủy và dùng lại), No.77 (phạm vi dừng cả kỳ). Đối soát hủy chuyển đội.

**Nhận xét đã được xử lý chưa:** Đã xử lý: chia ba phần No.60/61/77, bỏ đối soát hủy khỏi quyết định khách và tránh trùng đổi kỳ.

**Kết luận và phản chứng:** Cả ba No. còn Open và có quyết định khác nhau. KS UC-08-6 chưa OK; SD-M18 p32 vẫn đánh dấu cần xác nhận việc hủy/không phục hồi. Vì vậy không thể đóng chỉ dựa trên sơ đồ đã vẽ thao tác.

**Căn cứ gốc:** KS 確認事項!A84:J85; QA Q&A!E60:I61,E77:I77; SD-M18 p19 M-16,p32. Lượt mở lại: RCEV-0022, RCEV-0023, RCEV-0024, RCEV-0025, RCEV-0026, RCEV-0027, RCEV-0028. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Giữ ba phần riêng khi biên tập; No.77 vẫn phải bao gồm xác nhận hủy lịch và không tự phục hồi đang bảo lưu, cùng phạm vi kỳ. Đội chịu đối soát.

**Chống trùng:** Dừng/đổi kỳ do Talent thuộc FND-0001; không tạo câu lặp cho cùng thao tác.

**Q&A cũ:** No.60; No.61; No.77. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0011 — ACCEPT

Quan hệ chuyển trạng thái bằng tay và đề xuất tự chuyển cần làm rõ

- Review trước: REV-0011 / REWRITE. Kiểm lại lần này: **REV-0053**.
- Bản đã kiểm: [FND-0011 R1](../finding-revision-2026-11-19/findings/FND-0011.md), SHA-256 `e06119baa0815ec1fc6c7a278269f6348ca628c142872136252351a2baa4275c`.
- Nhận xét cũ: YK2 P616 đã nêu Manager chọn trạng thái; KS và SD đã nêu đăng ký thanh toán xong dùng AI, chưa có hồ sơ thì chưa tạo bài. Nói quyền của Talent trước khởi tạo chưa xác định toàn bộ là quá rộng.
- Yêu cầu sửa cũ: Giữ quan hệ giữa chuyển trạng thái bằng tay đã mô tả với đề xuất tự chuyển và mốc trạng thái hiển thị. Không hỏi lại điều kiện dùng AI/tạo nháp đã có.

**Nhận xét đã được xử lý chưa:** Đã xử lý: ghi rõ thao tác Manager có sẵn và điều kiện AI đã biết; tách ngày phí/hồ sơ đủ.

**Kết luận và phản chứng:** YK2 P616 đã có chuyển bằng tay; No.52 đề xuất tự chuyển và chưa được trả lời. R1 nêu đúng khác biệt cần xác nhận mà không biến đăng ký thanh toán/hồ sơ/trạng thái thành một sự kiện đã chốt.

**Căn cứ gốc:** YK2 chức năng7-3 P615–617; KS 確認事項!F36,F9; QA Q&A!E52:I53; SD-T18 p8 T-04. Lượt mở lại: RCEV-0029, RCEV-0030, RCEV-0031, RCEV-0032, RCEV-0033, RCEV-0097. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Giữ quan hệ thao tác bằng tay/tự chuyển và hiển thị trạng thái. Ngày thu chỉ dẫn0021, tiêu chí hồ sơ chỉ dẫn0010.

**Chống trùng:** Ngày tính phí thuộc FND-0021; hồ sơ đủ thuộc FND-0010.

**Q&A cũ:** No.52; No.53 chỉ dẫn chiếu. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0012 — ACCEPT

Danh sách trường và phạm vi nhập thông tin Talent trên M-20 cần xác nhận

- Review trước: REV-0012 / REWRITE. Kiểm lại lần này: **REV-0054**.
- Bản đã kiểm: [FND-0012 R1](../finding-revision-2026-11-19/findings/FND-0012.md), SHA-256 `420db66e02c10ceee93966f404d3805ebeef3a4a5ff4675ff41eec4756935633`.
- Nhận xét cũ: M-20 p23 và flow p30 đã mô tả hai đường nhập, lưu OneDrive và lịch sử; nghĩa hồ sơ đủ đang trùng FND-0010. No.74 còn dùng tiền đề cũ chưa có màn.
- Yêu cầu sửa cũ: Giữ xác nhận danh sách trường trên M-20 và phạm vi màn theo nguồn 18/11; bỏ hỏi chọn ChatGPT hay thêm màn như chưa có M-20. Tiêu chí đủ chỉ dẫn FND-0010; đồng bộ do đội.

**Nhận xét đã được xử lý chưa:** Đã xử lý: M-20 là màn hiện có; bỏ lựa chọn cũ có cần màn và bỏ tiêu chí đủ hồ sơ trùng0010.

**Kết luận và phản chứng:** SD-M18 p23/p30 mô tả lưu OneDrive/lịch sử và hai đường nhập, nhưng trường nhập vẫn ghi cần xác nhận. KS I30 yêu cầu màn riêng; No.74 chưa cập nhật tiền đề cũ và chưa có phản hồi. R1 giữ đúng phần trường.

**Căn cứ gốc:** KS 確認事項!I30; QA Q&A!E74:I74; SD-M18 p23 M-20,p30; Q&A!E54:I54 chỉ chống trùng. Lượt mở lại: RCEV-0034, RCEV-0035, RCEV-0036, RCEV-0037, RCEV-0038. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Khi tiếp tục No.74 dùng bản18/11 và chỉ trường chưa chốt; không đặt lại lựa chọn bỏ M-20. Đội xử lý ghi đồng thời.

**Chống trùng:** Trùng một phần FND-0010; kỹ thuật hai đường ghi thuộc FND-0035.

**Q&A cũ:** No.74. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0015 — ACCEPT

Giờ ba khung, loại lời nhắn và ngưỡng nhắc cần xác nhận

- Review trước: REV-0015 / REWRITE. Kiểm lại lần này: **REV-0055**.
- Bản đã kiểm: [FND-0015 R1](../finding-revision-2026-11-19/findings/FND-0015.md), SHA-256 `145991e9e65a8391d1ea87f46c5d06b80008a504f5e2acdfd94f1fa4d91d1787`.
- Nhận xét cũ: Giờ ba khung và ngưỡng không đăng còn mở thật. Nút tạm dừng lời nhắn trong M-10 là chức năng còn có điều kiện, không phải tiền đề để mở rộng finding về lịch.
- Yêu cầu sửa cũ: Giữ giờ/loại tin và ngưỡng nhắc theo No.73/確認19. Bỏ nút tạm dừng khỏi phạm vi quyết định của finding này; không mặc định 8/12/20 hay 3/7 đã chốt.

**Nhận xét đã được xử lý chưa:** Đã xử lý: loại nút tạm dừng M-10 khỏi scope lịch và không mặc định các giờ/ngưỡng.

**Kết luận và phản chứng:** GJ §4/KS I51 chốt ba khung và để giờ cá nhân xét sau; KS I52 để ngưỡng nhắc xác nhận sau. No.73 còn đề xuất8/12/20, chưa có trả lời. R1 không nâng các con số thành quyết định.

**Căn cứ gốc:** GJ 合意事項 §4; KS 確認事項!I51:I52; QA Q&A!E73:I73; SD-T18 p13 T-09. Lượt mở lại: RCEV-0039, RCEV-0040, RCEV-0041, RCEV-0042, RCEV-0043, RCEV-0044. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Chỉ giữ giờ, loại tin và ngưỡng; không mở rộng thành thêm chức năng tạm dừng.

**Chống trùng:** Quy tắc kỳ hết tư liệu dẫn FND-0001, không quyết lại toàn vòng đời kỳ.

**Q&A cũ:** No.73; 確認19. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0016 — NEED_MORE_EVIDENCE

Tiêu chí đạt và phạm vi quản lý thử thách cần đối chiếu với ý tưởng đã có

- Review trước: REV-0016 / REWRITE. Kiểm lại lần này: **REV-0056**.
- Bản đã kiểm: [FND-0016 R1](../finding-revision-2026-11-19/findings/FND-0016.md), SHA-256 `5f66a0c6c1abab82ffe49f3df1042033d985021223d6bbf5c4d7a01a2f3633ef`.
- Nhận xét cũ: Không được đọc I27 như đã phê duyệt mọi chi tiết G27, nhưng cũng không được bỏ qua G27: đã có hướng dùng báo cáo Talent khi thiếu dữ liệu SNS và mô tả Manager thêm/sửa. CR-22 phân biệt chỉ thị AI với màn tiến độ/game; No.72 đang đề xuất nhiều enum chưa duyệt.
- Yêu cầu sửa cũ: Trước hết đối chiếu ý tưởng đã có với phạm vi hiện tại: tiêu chí đạt nào là AI/khai báo/số liệu; nội dung nào cần màn tiến độ. Không nói hoàn toàn thiếu nguồn đo, không mặc định một thử thách/enum/hạn do Analyst đề xuất.

**Nhận xét đã được xử lý chưa:** Đã công nhận G27 có nguồn đánh giá và loại mặc định enum/một thử thách; chưa cung cấp kết quả đối chiếu phạm vi từng ý được yêu cầu.

**Kết luận và phản chứng:** R1 vẫn ghi “đối chiếu ... trước khi trình” thay vì gắn bảng ý tưởng–ý đã chốt–ý còn đề xuất. G27 có báo cáo Talent/hoạt động khi thiếu SNS và Manager sửa; I27/GJ §2 không chứng minh phê duyệt toàn bộ, cũng không đủ để bỏ các ý G27. CR-22 là phân loại/phương án, không phải phê duyệt thương mại. Chưa xác định phần thiếu nào phải hỏi, phần nào là nội dung chỉ thị đội/công ty chuẩn bị.

**Căn cứ gốc:** KS 確認事項!G27:I27; GJ 合意事項 §2; QA Q&A!E72:I72; QA 追加要件!A23:N23 (CR-22); SD-T18 p13 T-09. Lượt mở lại: RCEV-0045, RCEV-0046, RCEV-0047, RCEV-0048, RCEV-0049. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** BA/FutureCore map từng tiêu chí đạt/nguồn đánh giá/phạm vi màn về G27,I27,GJ,CR-22; chỉ rõ phần đã có, xung đột và quyết định cần khách. Gắn bảng/hash và kiểm lại. Không bắt khách nghĩ lại ý tưởng đã viết.

**Chống trùng:** Cách đếm ngày liên tiếp tách FND-0017; không hỏi hai lần.

**Q&A cũ:** No.72 phần(1)(2); không lặp phần(3). **Bên xử lý:** BA/FutureCore đối chiếu; reviewer kiểm; khách chỉ chốt phần chưa thống nhất.

**Chuyển bước nội dung:** KHÔNG xét soạn từ R1 này; chờ bảng đối chiếu và xác định quyết định còn thiếu.

### FND-0017 — ACCEPT

Quy tắc đặt lại ngày liên tiếp là phụ thuộc được hẹn quyết khi vận hành

- Review trước: REV-0017 / REWRITE. Kiểm lại lần này: **REV-0057**.
- Bản đã kiểm: [FND-0017 R1](../finding-revision-2026-11-19/findings/FND-0017.md), SHA-256 `d8fc919dc8dce7102b32a2d312cca434f5c2197bb6c9c2b901502ec9d9545dc2`.
- Nhận xét cũ: GJ §7 đã nêu đếm ngày có ít nhất một bài; việc reset khi có ngày không đăng được để lại vận hành. KS I55 cũng nói quyết khi vận hành. Finding không được mô tả toàn bộ cách xác định ngày như chưa có hoặc buộc chốt trước baseline trái thời điểm đã hẹn.
- Yêu cầu sửa cũ: Ghi nhận phần đã mô tả và phần reset còn để vận hành; lập dependency theo mốc vận hành, chỉ xin đổi mốc nếu cần có lý do/ảnh hưởng được duyệt. Không gửi lại ngay.

**Nhận xét đã được xử lý chưa:** Đã xử lý: công nhận ngày có ít nhất một bài, giữ reset theo mốc vận hành, bỏ chặn baseline mặc định.

**Kết luận và phản chứng:** GJ §7 dòng確認22 và KS I55 đã hẹn quyết khi vận hành. R1 ghi đây là dependency được hẹn, không coi việc hoãn là lỗi và không tự áp reset về1. Chấp nhận bản ghi theo dõi quyết định tương lai, không chấp nhận hỏi ngay.

**Căn cứ gốc:** GJ 合意事項 §7 dòng確認22; KS 確認事項!F55:I55; SD-T18 p10 T-06; QA Q&A!E72:I72 phần(3). Lượt mở lại: RCEV-0050, RCEV-0051, RCEV-0052, RCEV-0053. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Theo dõi đến mốc vận hành đã hẹn; chỉ xin đổi mốc khi có nhu cầu/ảnh hưởng cụ thể. Không mặc định tính mọi SNS thành công; chi tiết chưa chốt vẫn giữ mở.

**Chống trùng:** Tách khỏi tiêu chí hoàn thành thử thách ở FND-0016.

**Q&A cũ:** No.72 phần(3) — DEFERRED. **Bên xử lý:** BA/chủ vận hành theo dõi; khách chốt vào mốc đã hẹn.

**Chuyển bước nội dung:** CHƯA đưa vào tập hỏi ngay; ACCEPT nội dung của dependency vận hành, không đổi mốc đã hẹn.

### FND-0018 — ACCEPT

Đơn giá video, quyền đổi và giá áp dụng trước/sau thay đổi cần xác nhận

- Review trước: REV-0018 / REWRITE. Kiểm lại lần này: **REV-0058**.
- Bản đã kiểm: [FND-0018 R1](../finding-revision-2026-11-19/findings/FND-0018.md), SHA-256 `ae412eb8783bba5f81896e013773a7bd9a830085001b48400c97113eb3adc4d7`.
- Nhận xét cũ: Đơn giá và giá hiệu lực giữa kỳ là thiếu quyết định thật. Điều chỉnh lỗi/kết quả muộn đang bị gộp sang FND-0019; quyền đổi trên quản trị cần nêu rõ, không hỏi schema.
- Yêu cầu sửa cũ: Giữ đơn giá cuối, người được đổi và giá áp dụng trước/sau đổi. Tách thời điểm điều chỉnh lượt lỗi trong No.62; không biến kết quả muộn thành chính sách mới khi chưa đối soát.

**Nhận xét đã được xử lý chưa:** Đã xử lý: đơn giá/quyền/hiệu lực giá tách khỏi timeout/điều chỉnh kết quả muộn.

**Kết luận và phản chứng:** KS UC-06-1 giao công ty quyết giá, YK2 quy định đếm khi yêu cầu và loại lỗi dịch vụ. No.2/62 còn thiếu giá và hiệu lực đổi; R1 không dùng khả năng cấu hình làm phê duyệt.

**Căn cứ gốc:** KS 確認事項!F67:F68; YK2 chức năng5-4 P636–639; QA Q&A!G3:I3,E62:I62. Lượt mở lại: RCEV-0054, RCEV-0055, RCEV-0056, RCEV-0057, RCEV-0058. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Giữ đơn giá, quyền đổi và lượt trước/sau đổi; thời điểm điều chỉnh lỗi giữ phần riêng của No.62, đối soát do đội. Không hỏi schema lưu giá.

**Chống trùng:** Không hỏi lại cùng vấn đề kết quả muộn của FND-0019.

**Q&A cũ:** No.2; No.62. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0021 — ACCEPT

Nghĩa ngày bắt đầu tính phí và ranh giới kỳ video/thuê bao cần xác nhận

- Review trước: REV-0021 / REWRITE. Kiểm lại lần này: **REV-0059**.
- Bản đã kiểm: [FND-0021 R1](../finding-revision-2026-11-19/findings/FND-0021.md), SHA-256 `96e11c07c6fe41cfbe652db9b7658130286931bcb9871379ba2898651d81c9ec`.
- Nhận xét cũ: Ngày đăng ký chưa rõ là có cơ sở ở No.53. Nhưng kỳ đầu/cuối, chu kỳ cổng và trạng thái nợ thuộc các chủ đề khác; nguyên tắc không chia ngày/nghỉ giữa kỳ thu đủ đã nêu rõ ở KS và SD.
- Yêu cầu sửa cũ: Giữ nghĩa ngày bắt đầu thu và ranh giới kỳ video so với kỳ thuê bao. Không hỏi lại thu trọn tháng; kết quả cổng trỏ FND-0020, dừng vì nợ trỏ FND-0022.

**Nhận xét đã được xử lý chưa:** Đã xử lý: chỉ giữ nghĩa ngày bắt đầu và kỳ phí video; bỏ hỏi lại trọn tháng/dừng vì nợ/kích hoạt.

**Kết luận và phản chứng:** GJ §6/KS I104 chỉ cho hướng chu kỳ từ ngày đăng ký, còn provider; H53 đang hỏi đăng ký có phải thanh toán không. KS G106 và SD-T18 p20/p27 đã mô tả không chia ngày/thu trọn tháng khi nghỉ. R1 giữ đúng ranh giới.

**Căn cứ gốc:** YK2 P625,P638; KS 確認事項!I104,G106; GJ 合意事項 §6; QA Q&A!E53:I53,H50:I50; SD-T18 p20 T-16,p27. Lượt mở lại: RCEV-0059, RCEV-0060, RCEV-0061, RCEV-0062, RCEV-0063, RCEV-0064, RCEV-0065, RCEV-0066, RCEV-0067. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Chốt sự kiện bắt đầu và cách gắn kỳ video; nhận kết quả provider ở0020, không tái hỏi nghĩa vụ trọn tháng.

**Chống trùng:** Không lặp trạng thái kích hoạt FND-0011, dừng vì nợ FND-0022 hay email sau nghỉ FND-0024.

**Q&A cũ:** No.53; No.49 chỉ phần kỳ liên quan. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0023 — ACCEPT

Khác biệt đường thao tác văn phòng và phần tài khoản còn mở cần đối chiếu bản màn mới

- Review trước: REV-0023 / REWRITE. Kiểm lại lần này: **REV-0060**.
- Bản đã kiểm: [FND-0023 R1](../finding-revision-2026-11-19/findings/FND-0023.md), SHA-256 `97d179fd9aca9992ea41b67515cae30bbafb5960eabb85b0ab214dd1445927ee`.
- Nhận xét cũ: Mâu thuẫn lịch sử app/quản trị vẫn phải ghi; SD-M18 p33 hiện đã vẽ Manager đăng nhập app và nối SNS, p9 đã nêu office cùng danh sách. Không thể hỏi lại các ý như chưa có mô tả; cũng không tự đóng No.66.
- Yêu cầu sửa cũ: Đưa bản mô tả app hiện hành để đối chiếu phần khác P767; giữ email, trạng thái/xóa và xác nhận phạm vi còn mở. Ghi nhận danh sách/ai nối đã được SD mô tả, chỉ xin xác nhận khác biệt còn cần thẩm quyền.

**Nhận xét đã được xử lý chưa:** Đã xử lý: công nhận đường app, ai nối và office cùng danh sách trong SD; giữ khác biệt nguồn và vòng đời còn mở.

**Kết luận và phản chứng:** YK2 P767 khác KS UC-12-2/3 và SD-M18 p33; H44 vẫn dẫn No.66. Bản màn có email đăng nhập trên p15, không được hỏi như chưa có trường email. R1 chấp nhận trong nghĩa xác nhận email vận hành/đầu mối sở hữu và trạng thái/xóa còn mở, không phủ nhận mô tả này.

**Căn cứ gốc:** YK2 chức năng9-1 P767; KS 確認事項!F109:F110,I63; QA Q&A!H44:I44,E66:I66; SD-M18 p9 M-06,p15 M-12 mục2,p33. Lượt mở lại: RCEV-0068, RCEV-0069, RCEV-0070, RCEV-0071, RCEV-0072, RCEV-0073, RCEV-0074, RCEV-0075, RCEV-0076, RCEV-0077, RCEV-0078. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Đưa khác biệt cũ/mới để xác nhận áp dụng; dùng trường email đã có làm bối cảnh. Không hỏi lại office có trong danh sách/Manager có nối SNS hay không.

**Chống trùng:** Đăng thay chỉ office và quyết toán nội bộ đã có FND-0043.

**Q&A cũ:** No.66; No.43 dẫn chiếu. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0026 — ACCEPT

Khả năng dùng lại nháp cũ và quyền giữ/xóa tư liệu đang dùng cần làm rõ

- Review trước: REV-0026 / REWRITE. Kiểm lại lần này: **REV-0061**.
- Bản đã kiểm: [FND-0026 R1](../finding-revision-2026-11-19/findings/FND-0026.md), SHA-256 `3cd7b20045402d84ec676334f7cff4a44e9966a86151b8b9bfb77708c8d1451e`.
- Nhận xét cũ: No.55 còn mở với nháp, nhưng SD-T18 p11 đã nêu không chọn thì ngày sau ra ba chủ đề mới. GJ action9 giao đội nghiên cứu ảnh/video cũ khi đầy, không giao khách thiết kế dọn kho.
- Yêu cầu sửa cũ: Giữ khả năng xem/dùng lại nháp cũ và quyền giữ/xóa ảnh đang dùng. Ghi nhận thay chủ đề ngày sau đã được mô tả; đội đưa phương án dung lượng bảo vệ tư liệu có lịch trước khi xin quyết định quyền xóa.

**Nhận xét đã được xử lý chưa:** Đã xử lý: ghi nhận thay chủ đề ngày sau; giữ nháp cũ/quyền lưu xóa và giao đội phương án dung lượng.

**Kết luận và phản chứng:** SD-T18 p11 đã mô tả ra ba chủ đề mới. QA55 vẫn là đề xuất về nháp; mốc6tháng sau nghỉ không trả lời xử lý tư liệu còn hoạt động. GJ action9 giao đội nghiên cứu dung lượng. R1 không giao khách thiết kế dọn kho.

**Căn cứ gốc:** QA Q&A!E55:I55,H9:I9; SD-T18 p11 T-07,p15 T-11; YK2 chức năng6-4 P717; GJ アクション9, 合意事項 §5. Lượt mở lại: RCEV-0079, RCEV-0080, RCEV-0081, RCEV-0082, RCEV-0083, RCEV-0084, RCEV-0085. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Tiếp tục khả năng dùng nháp cũ; với quyền xóa ảnh có lịch, đội đưa phương án và tác động trước phần câu hỏi phụ thuộc phương án đó.

**Chống trùng:** Sau nghỉ sáu tháng thuộc FND-0024/0042; thứ tự video thuộc FND-0025.

**Q&A cũ:** No.55; No.8 chỉ phần quyền lưu/xóa. **Bên xử lý:** Đội chuẩn bị phương án dung lượng; khách chốt quyền giữ/dùng/xóa.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0030 — ACCEPT

Thẩm quyền xác minh/cấp lại quyền quản trị khi mất phương tiện xác thực cần làm rõ

- Review trước: REV-0030 / REWRITE. Kiểm lại lần này: **REV-0062**.
- Bản đã kiểm: [FND-0030 R1](../finding-revision-2026-11-19/findings/FND-0030.md), SHA-256 `0b675e53815e5cbcc5fc8dd4201837c8be95d5936289bef330a1e8dfdfa7cb54`.
- Nhận xét cũ: Mất thiết bị xác thực cần phân rõ đầu mối/thẩm quyền khôi phục. Tuy nhiên chặn tự vô hiệu hóa/Manager cuối là biện pháp an toàn đội phải thiết kế, chưa chứng minh khách cần tự chọn biện pháp.
- Yêu cầu sửa cũ: Giữ người có thẩm quyền xác minh/cấp lại khi không còn người quản trị hợp lệ; đội đề xuất quy trình và bảo vệ Manager cuối. Không hỏi thuật toán MFA hoặc từng guard kỹ thuật.

**Nhận xét đã được xử lý chưa:** Đã xử lý: tách thẩm quyền khôi phục khỏi guard Manager cuối và thuật toán xác thực.

**Kết luận và phản chứng:** YK2 P608–611/KS115 chỉ mô tả xác thực và vô hiệu hóa. No.67 chưa có trả lời về đầu mối khôi phục; liên kết quên mật khẩu không quyết được ai có quyền xác minh khi không còn người thao tác. R1 chỉ giữ trách nhiệm/thẩm quyền.

**Căn cứ gốc:** YK2 chức năng1-6 P608–611; KS 確認事項!F115; QA Q&A!E67:I67; SD-M18 p4 M-01,p21 M-18. Lượt mở lại: RCEV-0086, RCEV-0087, RCEV-0088, RCEV-0089, RCEV-0090. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Đội đề xuất quy trình/bảo vệ quản trị; khách xác nhận đầu mối có thẩm quyền. Không hỏi khách chọn guard hoặc thuật toán.

**Chống trùng:** Kỹ thuật tài khoản/gửi lại ở FND-0034/0036 không phải quyết định mới.

**Q&A cũ:** No.67. **Bên xử lý:** Tech Lead/đội an ninh đề xuất; khách chỉ định người có thẩm quyền.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

### FND-0031 — ACCEPT

Nộp lại sau từ chối và quyền thay đổi quyết định xét đơn cần làm rõ

- Review trước: REV-0031 / REWRITE. Kiểm lại lần này: **REV-0063**.
- Bản đã kiểm: [FND-0031 R1](../finding-revision-2026-11-19/findings/FND-0031.md), SHA-256 `01f6b753cd1330c772f7fdbcd495ec01a96279a862997afdc769dde1282a8514`.
- Nhận xét cũ: Nộp lại sau từ chối và quyền sửa quyết định là nghiệp vụ thật. Hạn mật khẩu tạm và cấp lại chủ yếu là thiết kế an ninh; QA H26 đã chuyển hướng 7 ngày sang No.65 nhưng chưa phải khách đã phê duyệt.
- Yêu cầu sửa cũ: Tách đơn chờ/nộp lại/quyền đổi từ chối khỏi TTL/cấp lại mật khẩu. Đội đề xuất bảo mật; khách chỉ chốt phần gây mất quyền nộp/dùng hoặc yêu cầu vận hành khác.

**Nhận xét đã được xử lý chưa:** Đã xử lý: tách đơn chờ/nộp lại/quyền đổi từ chối khỏi hạn và cấp lại mật khẩu.

**Kết luận và phản chứng:** No.65 chưa trả lời các quyền nộp lại/sửa quyết định. QA H26 nêu hướng đọc7ngày, không phải phản hồi khách đã chốt; SD-M18 p6 vẫn cần xác nhận cách hỏi thêm/giữ đơn trước từ chối. R1 không coi7ngày là yêu cầu được duyệt.

**Căn cứ gốc:** KS 確認事項!F32; QA Q&A!G12:I12,H26:I26,E65:I65; SD-M18 p6 M-03. Lượt mở lại: RCEV-0091, RCEV-0092, RCEV-0093, RCEV-0094, RCEV-0095, RCEV-0096. Hash nguồn và nguyên văn trong evidence-recheck.csv; không dùng RWEV/RCEV làm nguồn quyết định khách mới.

**Phạm vi giữ / việc còn lại:** Giữ quyền xử lý đơn/nộp lại và đơn chờ; TTL/cấp lại là đội đề xuất. Đăng ký sau nghỉ dẫn0024/No.69, không hỏi lặp.

**Chống trùng:** Cùng email sau nghỉ ở FND-0024, không hỏi lại.

**Q&A cũ:** No.65. **Bên xử lý:** BA tiếp tục No. cũ; khách chốt phần nghiệp vụ.

**Chuyển bước nội dung:** Ứng viên xét soạn WORKING_DRAFT khi có lệnh riêng; kiểm log/hash và chỉ phần còn mở.

## Đánh giá sau kiểm lại và bàn giao

| Việc | Kết luận |
|---|---|
| 14 bản sửa có ACCEPT nội dung | Dùng review ID/hash R1 trong recheck-results, không dùng hash finding cũ |
| FND-0004 | BA/Tech Lead cung cấp bảng tổng hợp/hiển thị cụ thể, thao tác và phần cần khách quyết; reviewer kiểm lại |
| FND-0016 | BA/FutureCore cung cấp đối chiếu từng ý G27/I27/GJ/CR-22 với tiêu chí và phạm vi màn; reviewer kiểm lại |
| FND-0017 | Giữ mốc vận hành, chưa đưa vào tập hỏi ngay |
| Đầu việc đội trước câu hỏi phụ thuộc | 0001: nhịp tạo;0026: phương án dung lượng bảo vệ tư liệu có lịch;0030: quy trình/guard khôi phục. Không biến ACCEPT thành chứng minh đã hoàn thành các đầu việc này |
| 31 finding ngoài phạm vi | Không review lại, không đổi kết quả hoặc metadata |
| Gate/Q&A | Không chạy, ký hoặc đổi trạng thái gate; không soạn/gửi Q&A trong lệnh kiểm lại này |

Theo WCP-0001 hiện hành, ACCEPT nội dung đúng hash là một điều kiện để xét chuẩn bị WORKING_DRAFT khi có lệnh soạn riêng; G5 BLOCKED không tự cấm nhánh chuẩn bị đó. Tuy nhiên, thiếu bằng chứng nội dung/đầu việc đội hoặc mốc đã hẹn vẫn phải được tôn trọng. Chỉ người có thẩm quyền mới quyết phê duyệt Quality Gate và APPROVED_QA theo quy trình. Không sửa eligibility lịch sử để mở nhánh soạn.

Đã thêm16 hồ sơ kiểm lại vào reviews.csv với status OPEN để lưu vết, kết quả ACCEPT/NEED_MORE_EVIDENCE nằm trong challenge và recheck-results. Không chuyển thành ACCEPTED hoặc REVIEWED, không đổi16 bản R1/recheck-list của Analyst; các hồ sơ đó giữ snapshot trước recheck. Không sửa review lịch sử, Finding Register, Requirement Register, workbook15, nguồn khách hoặc gate-runs.

Các validator lịch sử có thể báo hash reviews.csv thay đổi sau khi thêm hồ sơ kiểm lại được giao. Không cập nhật manifest cũ để che thay đổi. Validator riêng của đợt này kiểm chính xác16 bản/hash,96 trích dẫn, bản R1/lịch sử/31 finding và gate-runs giữ nguyên; kiểm cơ học không thay kiểm nội dung hoặc chữ ký gate.

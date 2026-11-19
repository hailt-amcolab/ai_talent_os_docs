# Kiểm chứng lại toàn bộ hồ sơ Requirement Review hiện hữu

**Kết luận: hồ sơ có căn cứ nguồn, nhưng chưa thể coi toàn bộ kết quả G1–G6 là chính xác về nội dung.** Tìm thấy 12 nhóm cần sửa hoặc bổ sung ngữ cảnh. Chúng ảnh hưởng trực tiếp 12 requirement, 4 business rule, 12 bước trong 8 flow và 1 dòng chuyển trạng thái; không có nghĩa phải loại toàn bộ các record này.

Đây là tự kiểm lại của Analyst/Codex theo yêu cầu người dùng, không phải chữ ký Independent Reviewer mới. Không sửa nguồn, register, finding, review, Q&A hoặc các lần PASS đã duyệt. Các đề nghị sửa nằm trong hồ sơ audit riêng, chưa được áp dụng vào bản quản lý hiện hành.

## Phạm vi đã đối chiếu

| Tập hồ sơ | Số lượng | Kết quả/đường tra cứu |
|---|---:|---|
| Tài liệu nguồn trong catalog | 12 | Mở lại từ DOCX/XLSX/PDF/Markdown; hash ổn định: [source-snapshot.csv](source-snapshot.csv) |
| Requirement Register | 175 | [requirements-results.csv](requirements-results.csv), có kết quả theo từng ID |
| Business Rules Register | 90 | [business-rules-results.csv](business-rules-results.csv) |
| Business Flow | 30 | [flow-results.csv](flow-results.csv), gồm nhận xét theo từng flow |
| Bước chính/nhánh | 281 | [steps-results.csv](steps-results.csv); đây là tổng số bước, không cộng thêm lần nữa các bước nhánh |
| Chuyển trạng thái | 64 | [state-transitions-results.csv](state-transitions-results.csv) |
| Trường hợp/ngoại lệ được lập hồ sơ | 219 | [scenario-results.csv](scenario-results.csv); kiểm liên quan, bước nối và ranh giới hỏi khách |
| Finding hiện hành | 47 | [finding-results.csv](finding-results.csv); lấy bản R1 cho 16 finding đã sửa, bản gốc cho các mục còn lại |
| Q&A hiện hành | 36 | [qa-results.csv](qa-results.csv); thuộc 21 finding ACCEPT, vẫn là bản nháp |
| ID Q&A trong lượt V3→V4 | 44 | [historical-qa-dispositions.csv](historical-qa-dispositions.csv), giữ lịch sử cả mục loại/giữ chờ |
| Evidence của extraction/flow/gap | 513 | [evidence-integrity.csv](evidence-integrity.csv), kiểm lại hash và nội dung trích |
| Đơn vị trong coverage extraction | 319 | [source-coverage-checks.csv](source-coverage-checks.csv), kiểm liên kết hiện có |

Kiểm lại91 tham chiếu document–page–screen trong register:4 trường hợp lấy mã từ chú giải, đúng các ID tại FV-002. Kết quả: [screen-reference-check.csv](screen-reference-check.csv).

Có 519 tham chiếu nguồn được mở lại và lưu nguyên văn/hash/locator tại [source-evidence.csv](source-evidence.csv). Với XLSX, dùng hàng vật lý và phạm vi ô thực tế, không mặc định số Q&A là số hàng. Đã đọc trực quan 26 hình nhúng YK2 và 21 trang PDF: toàn bộ 19 trang flow của hai bản18/11, cộng T-08 và M-20. [visual-checks.csv](visual-checks.csv) ghi chính xác trang/hình đã xem. Toàn bộ chữ trích được của hai PDF đã được dùng để đối chiếu; không tuyên bố đã kiểm trực quan mọi pixel của 62 trang.

## Những chỗ cần sửa

Danh sách đầy đủ, ID ổn định của audit, nguồn và cách xử lý: [issues.csv](issues.csv). Nội dung trước sửa và phạm vi đề nghị sau sửa: [artifact-excerpts.csv](artifact-excerpts.csv). FV là mã vấn đề kiểm chứng nội bộ, không phải finding mới để hỏi khách.

| Audit | Vấn đề xác định | Phạm vi xử lý |
|---|---|---|
| FV-001 | UNKNOWN quá rộng: nguồn đã mô tả Manager chuyển trạng thái bằng tay và xác nhận trước chuyển | REQ-0020, TRANS-0009. Phần tự chuyển theo đề xuất No.52/53 vẫn mở |
| FV-002 | T-01 ở chú giải trang flow bị gán thành mã màn requirement | screen_refs của REQ-0092, 0117, 0118, 0125. Phải tách trang flow với màn nằm trong bước |
| FV-003 | Thêm nghĩa “trang của dịch vụ” mà YK2 không nói rõ, rồi coi đó là mâu thuẫn chắc chắn với màn SNS trực tiếp | REQ-0078, BR-0060, FLOW-0004-M03. Giữ hai mô tả, đội đối chiếu cơ chế trước; không tự kết luận tương thích hoặc xung đột |
| FV-004 | “Lần/chu kỳ sau” làm mất mốc sáng hôm sau được nêu rõ trong YK2 | REQ-0094, 0169; FLOW-0021-M02, 0009-M05. Không áp mốc file cho mọi đường cập nhật khi nguồn chưa đủ |
| FV-005 | Ngữ cảnh office chưa cập nhật đủ: nguồn đã có email, danh sách và Manager vào app để nối SNS | REQ-0090, 0092, BR-0069 và các bước FLOW-0024. No.66 chưa tự đóng; riêng hình UC-12 trong YK2 cũng đã vẽ app dù P767 nói quản trị |
| FV-006 | Ghi chưa có quy tắc bỏ thay đổi, trong khi M-20 đã mô tả nút やめる: không lưu, về M-07 | FLOW-0006-E01.01. Đây là SOURCE_DESCRIBED; không tự nâng thành khách đã xác nhận |
| FV-007 | Vẫn ghi khách phải viết tổng thể thử thách dù G27 đã có ý tưởng | REQ-0120. Phân biệt đã nhận đề xuất với phần I27/GJ thực sự chốt; FND-0016 vẫn thiếu chứng cứ |
| FV-008 | Nhãn “giai đoạn sau” rộng hơn nguồn: nguồn còn nói phải bàn phạm vi/cách làm | REQ-0159. Chỉ gắn quyết định để sau cho đúng chức năng có căn cứ |
| FV-009 | Nói thứ tự kiểm/duyệt chưa rõ nhưng chưa giữ đầy đủ những đường đã được vẽ | REQ-0057, BR-0044, FLOW-0013/0016 và ngữ cảnh FND-0003. T22 có chấp nhận→kiểm từ cấm→duyệt công việc; M29 có Manager sửa→đặt lịch. Tái xác nhận sau sửa/đường tự động vẫn mở |
| FV-010 | Thiếu phần biên bản đã nêu về ngày có ít nhất một bài trong cách đếm ngày liên tiếp | BR-0031, FLOW-0021-A02.01. Giữ dependency reset hẹn quyết khi vận hành; không hỏi lại toàn bộ |
| FV-011 | “Đường cập nhật chưa chốt” quá rộng nếu đọc như chưa có đường nhập | REQ-0125, FLOW-0006-M04. M23/M30 đã mô tả quản trị và ChatGPT; danh sách trường cuối vẫn có 要確認 |
| FV-012 | Metadata flow_ids của snapshot extraction còn ghi chưa chạy G3 dù đã có map G3 | Nợ đồng bộ view hiện hành cho175REQ/90BR. Dùng222 liên kết REQ–flow và90 dòng rule–flow; không gọi toàn bộ record sai nghiệp vụ |

12 requirement cụ thể cần sửa nội dung hoặc bổ sung ngữ cảnh: **REQ-0020, 0057, 0078, 0090, 0092, 0094, 0117, 0118, 0120, 0125, 0159, 0169**. Một dòng có thể thuộc nhiều nhóm audit; không cộng số lần nhắc thành số lỗi độc lập.

4 business rule cần cập nhật: **BR-0031, 0044, 0060, 0069**. 8 flow có bước bị ảnh hưởng: **FLOW-0003, 0004, 0006, 0009, 0013, 0016, 0021, 0024**. Các đoạn còn đúng phải giữ nguyên khi sửa.

## Những phần kiểm lại vẫn có căn cứ

- T-08 chỉ có một nhóm lựa chọn: **確認しないで投稿／自動投稿** và **投稿の前に確認／要確認**. REQ-0116 và FLOW-0018-M01 giữ đúng hai chế độ. Câu WQA-071-01 cũ đã diễn giải sai giao diện; V4 không còn câu đó. WQA-071-02 hiện hỏi đúng phần xin Manager duyệt bài công việc ở đường không Talent xác nhận.
- Quy tắc AI viết lại tối đa2 lần, Talent được sửa tay; mục tiêu10.000 follower theo từng SNS; Manager xem hội thoại và báo trước Talent; chỉ đăng thay office; quá giờ chưa duyệt thì không đăng, hủy lịch và muốn đăng phải chấp nhận lại đều có nguồn tương ứng. Không hỏi lại các ý đã chốt.
- Quyết định không khôi phục Talent đã nghỉ trên quản trị và giữ6 tháng rồi xóa phải được giữ; không phục hồi hành vi cũ chỉ vì một hình/tài liệu cũ có cách diễn đạt khác.
- Các số giờ/3–7 ngày, giá dịch vụ, cấu hình kỹ thuật hoặc ý tưởng game phải giữ đúng mức đề xuất/phụ thuộc. Audit không chứng minh dịch vụ ngoài hiện đang hỗ trợ hoặc đã triển khai đúng.

513/513 evidence kiểm lại khớp phần trích tương ứng: DOCX đối chiếu đoạn, XLSX đối chiếu từng ô được trích, PDF đối chiếu đúng trang, hình trạng thái đối chiếu trực quan. **Khớp trích dẫn không chứng minh diễn giải đúng hoặc khách đã duyệt.** Chính sự khác biệt này giải thích vì sao validator trước đây PASS nhưng vẫn bỏ lọt các vấn đề trên.

## Finding, Q&A và gate

Review nội dung hiện hành vẫn là **24 ACCEPT, 20 REJECT, 3 NEED_MORE_EVIDENCE**; ba mục thiếu là FND-0004, 0013, 0016. Audit kiểm hash bản finding so với review, không đổi kết quả. FND-0017 đã ACCEPT nội dung nhưng phần reset được hẹn vận hành, không tự chuyển thành câu hỏi ngay. 20 REJECT được giữ nguyên.

36 Q&A V4 nối về21 finding ACCEPT, liên kết finding/hash/review vẫn khớp và đều **DRAFT_UNAPPROVED**. Không phát hiện lại tiền đề hai nhóm nút như WQA-071-01 cũ trong bộ hiện hành. Điều đó không thay G6: những câu có đầu vào upstream cần sửa vẫn phải được đối chiếu lại sau sửa. WQA-063-01 hỏi ý nghĩa dừng và quyền dùng liên quan cùng chính sách; Tech Lead có thể chỉnh cách trình bày khi duyệt cuối, không tự phát sinh ID mới trong audit này.

[gate-impact.csv](gate-impact.csv) giữ trạng thái ghi sổ hiện hành: **G1–G5 PASS theo lần duyệt của người dùng; G6 BLOCKED; G7/G8 chưa có lần chạy**. Audit không thu hồi hoặc sửa lịch sử đó. Tuy nhiên, các phạm vi bị chỉ ra ở G2/G3 cần sửa và review lại; thay finding/phạm vi/hash thì phê duyệt cũ không tự áp dụng cho bản mới. G5 không phải chứng nhận mọi câu hỏi viết sau đều đúng và không thay G6.

## Xử lý tiếp theo

1. Analyst sửa theo FV-001–011, giữ ID và lưu before/after, chỉ sửa phần có căn cứ. FV-012 do Workflow Engineer cung cấp view/map hiện hành rõ ràng; không viết lại snapshot cũ để ép validator PASS.
2. Cập nhật tác động đúng các bước/transition/finding liên quan, đặc biệt FND-0003 và FND-0023. Đối chiếu Q&A theo phạm vi sửa; không tạo câu hỏi để khách giải quyết lỗi phân tích nội bộ.
3. Reviewer khác tác giả kiểm lại nguồn và đúng hash bản sửa. Tech Lead quyết định phạm vi chạy lại G2–G5 và duyệt G6 cho bộ câu cuối. Giữ3 finding thiếu chứng cứ và các câu chờ đầu vào ngoài phạm vi phát hành.

Hồ sơ kiểm chứng: [VALIDATION.md](VALIDATION.md). Chạy lại kiểm cơ học bằng `python3 docs/requirement-review/full-reverification-2026-11-19/validate_reverification.py`.

## Giới hạn của kết luận

Đã so sánh toàn bộ tập record hiện hữu được liệt kê, gồm những mệnh đề có nguồn, phần chưa định nghĩa và đề xuất; có kết quả theo từng ID và nguyên văn nguồn để kiểm lại. Kết quả `NO_NEW_DISCREPANCY_IDENTIFIED_IN_THIS_COMPARISON` nghĩa là chưa phát hiện sai lệch mới ở lần so sánh này, **không phải VERIFIED độc lập, CONFIRMED hoặc PASS gate**. Các trạng thái PARTIAL/UNKNOWN/CONFLICTED gốc được bảo toàn.

319 đơn vị coverage và các map có liên kết hợp lệ không chứng minh mọi yêu cầu nguyên tử có thể rút từ mọi ô/pixel đã được trích hết. Không kiểm toàn bộ SCD/code/demo, hợp đồng ký ngoài bộ nguồn hoặc vận hành provider. Không dùng các tài liệu đó để tự bổ sung quyết định khách. Những bản QA/analysis cũ là lịch sử và dữ liệu truy ngược, không được chứng nhận lại như bản hiện hành. Không tự tạo baseline, chữ ký, Q&A mới hoặc Customer Confirmed.

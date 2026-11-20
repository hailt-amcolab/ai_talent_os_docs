# Đối chiếu toàn bộ nguồn19/11 và QA/KS20/11

**Bản hiện hành sau rà soát tác giả. Chưa phải Independent Verification hoặc phê duyệt Q&A.** Lịch sử tiếp nhận và các lần dừng trước nằm trong REPORT.md/changes.csv; không dùng chúng để kết luận nguồn chưa từng được đối chiếu.

Đã đọc biên bản FCP–AMCOLAB19/11; toàn bộ33trang SD-T19,27trang SD-M19,21trang BF19 bằng chữ và hình; QA đủ5sheet, KS đủ3sheet, hai ô sửa và19bình luận. So phiên bản workbook với HEAD đã kiểm hash. Nguồn được giữ nguyên. Đã đối chiếu175yêu cầu,90quy tắc,30luồng,47finding cũ và36ID Q&A với chủ đề nguồn mới; bản đồ và SHA-256 ở [hồ sơ tiếp nhận hiện có](new-delivery-intake.json).

## Những nội dung đã cập nhật thực chất

- **Đăng ký/khởi tạo:** đơn chờ không hết hạn, nhắc lại Manager khi nộp lại; trao đổi qua email ngoài app. Đăng ký thanh toán xong tự cho phép sử dụng/tạo folder/báo Manager, nhưng chưa suy mốc thu phí. Đặt mật khẩu xong quay lại đăng nhập; khởi tạo xong mở Mypage T-08.
- **Từ cấm:** Manager sửa, AI kiểm lại; sạch thì đặt lịch, không cần trả Talent xác nhận lại (GJ19§12, SD-M19 trang16, BF19 trang17). Quyền Talent sửa chính bài bị chặn và giao điểm duyệt tự động còn mở.
- **Duyệt:** Talent không sửa lúc đang chờ duyệt; sau trả lại có lý do thì được sửa và xin duyệt lại. Đích category/cá nhân/fallback còn No.6 và KS20261120 No.10.
- **Thông báo:** bỏ nút đánh dấu xử lý riêng; mở dòng thì đánh dấu/giảm số chưa xử lý. Yêu cầu duyệt nằm M-04 riêng. Thông báo/email tới Manager phụ trách, không gửi mọi Manager mặc định. Loại email và bộ mẫu cần rà riêng.
- **Đăng lại/dừng:** nguồn mới mô tả Manager đăng lại ngay trên M-08, bỏ giả định sau15phút; đích SNS lỗi còn No.59. BF19 trang9 còn nhánh Talent đề xuất khác màn T-17. Dừng toàn bộ có hủy lịch/không khôi phục, nhưng xác nhận khách tiếp tục KS20261120 No.32.
- **Office/hồ sơ:** office dùng app Talent, bỏ bước thanh toán/duyệt, có email đăng nhập, chung danh sách; vòng đời kết thúc/xóa còn No.66. Màn nhập hồ sơ nay là M-21 trang26, năm nhóm dự kiến, quản trị và ChatGPT đều xem/sửa được; trường bắt buộc còn No.54.
- **H65:** giữ DEC-0001 không giới hạn số lần AI viết lại, kể cả khi PDF19/11 còn ghi hai lượt. Không hỏi lại giới hạn này.
- **Thanh toán/chi phí:** không chốt GMO/Square, trả trước/sau, thu ngay kỳ đầu, ngày1 hoặc retry3ngày bằng giả định. Đề xuất trầnAI trong sheet mới chưa trả lời, không thay QA No.17/CR-16.

## Kết quả đối chiếu Q&A

Giữ36ID để truy vết; **26câu còn trong bản nháp,10câu rút khỏi tập hỏi**. Không sửa Close/Open của nhật ký khách.

| ID | Cách xử lý | Lý do/căn cứ |
|---|---|---|
| WQA-057-02 | Có nội dung trả lời trong nguồn | Không trả bản Manager sửa cho Talent; GJ19§12/SD-M19 trang16 |
| WQA-052-01 | Có nội dung trả lời trong nguồn | Tự cho phép sử dụng sau đăng ký phương thức; SD-T19 trang8–9/BF19 trang4 |
| WQA-065-01 | Có nội dung trả lời trong nguồn | Đơn chờ không hạn, trao đổi ngoài app; GJ19§3/BF19 trang3/SD-M19 trang7 |
| WQA-065-02 | Có nội dung trả lời trong nguồn | Sau từ chối nộp đơn mới, thông báo như đơn mới; SD-M19 trang7 |
| WQA-075-03 | Có nội dung trả lời trong nguồn | Email tới Manager phụ trách; SD-M19 trang1,6/BF19 trang14; phân công còn No.6 |
| WQA-074-01 | Theo dõi mục nguồn đang chờ | Năm nhóm hồ sơ đã có, KS20261120 No.39 chưa trả lời; không hỏi trùng |
| WQA-077-01 | Theo dõi mục nguồn đang chờ | Hủy lịch/không phục hồi đã mô tả; KS20261120 No.32 chưa trả lời |
| WQA-075-02 | Chuyển việc chuẩn bị/rà mẫu | FCP gom mẫu email/thông báo để khách rà, GJ19§7 |
| WQA-073-01 | Cấu hình trước vận hành | Giờ chung chỉnh ở M-17; không lấy số trong hình làm quyết định |
| WQA-073-02 | Cấu hình trước vận hành | 3/7 là giá trị ban đầu chỉnh được; việc áp cho tự động còn KS No.20 |

26câu giữ đã được đối chiếu; các câu về M-20 được sửa thành M-21, email không hỏi lại mọi Manager hay phụ trách, quyền sửa từ cấm chỉ giữ đúng phần chưa rõ, No.66 chỉ giữ vòng đời office. Tất cả là nháp chưa duyệt và chờ review bản nguồn mới. [Bản chính](../qa-drafting-2026-11-19/qa-draft.md), [CSV xuất hiện hành](../qa-drafting-2026-11-19/csv-export/qa-draft.csv).

## Điểm mới còn cần bằng chứng

- **FND-0048:** SD-T19 trang20 chỉ mô tả video ngắn, trong khi QA No.36/CR-04 trước gồm slideshow. Không có bằng chứng hủy slideshow; giữ nguyên phạm vi cũ và yêu cầu BA/Tech Lead đối chiếu với FCP trước khi đưa thành quyết định khách.
- **Sai lệch locator của nguồn:** mục lục T19/M19 và KS còn số trang cũ. Ví dụ T-11 thực tế trang16, M-21 thực tế trang26; BF19 duyệt bài trang8, tự động trang10–11, thu phí trang15. Toàn bộ CSV màn của Q&A đã đổi sang trang PDF thực tế.
- **BF19 trang10:** sơ đồ phía phải bị cắt trong chính trang PDF. Đọc phần nhìn thấy và bảng chữ trang11; không suy phần bị cắt. Chỉ chặn kết luận phụ thuộc phần không nhìn thấy.
- **Phần đang chờ:** quyết định cho39mục KS20261120 và3mục chi phí/quy mô; hợp đồng/SOW/báo giá ký; kiểm provider/tài khoản thật; nhiều category xung đột, kết quả muộn và đồng thời. Đã map42mục vào chủ đề/QA hiện có trong hồ sơ tiếp nhận, không tạo một bộ câu hỏi mới song song.

## Phạm vi tài liệu và giới hạn

Đã cập nhật phần hiện hành ở toàn bộ đặc tả chức năng SCD và tài liệu phân tích liên quan; các hồ sơ phân tích theo ngày giữ rõ nhãn lịch sử. Mười file câu hỏi module trở thành chỉ dẫn về một bản Q&A chính. Các sổ requirements/business-rules/flows/findings/evidence và CSV xuất đã đồng bộ.209bằng chứng workbook có bản kế tiếp đọc lại đúng ô/hash hiện hành, bản cũ được đánh STALE và giữ nguyên hash. Không tự viết lại review/chữ ký/manifest lịch sử.

Các gói tích hợp, báo cáo thử provider và thiết kếDB là nội bộ theo phiên bản riêng; lượt này chỉ rà tác động yêu cầu và liên kết điểm vào kỹ thuật, không kiểm lại năng lực dịch vụ, thay kiến trúc, viết SQL hoặc sửa code ứng dụng. Workbook15 giữ nguyên các dòng xác nhận được bảo vệ; cập nhật hiệu lực ở chỉ dẫn và sổ hiện hành.

**G1 kiểm toàn vẹn/định danh nguồn được đánh giá lại riêng theo phạm vi/giới hạn ghi trong gate-run. Các bản sửa G2–G4 là kết quả đối chiếu tác giả, không tự biến thành PASS độc lập. G5 chưa có reviewer khác tác giả cho bản hiện hành; G6 BLOCKED.** Thiếu chữ ký không được dùng làm lý do bỏ qua việc đọc nguồn/đồng bộ nội dung — phần đó đã thực hiện trong lượt này.


## Biên tập Q&A theo giao điểm quy tắc

Theo yêu cầu tiếp theo của người dùng, đã viết lại 26 câu thành 16 câu ưu tiên về chỗ đứt trong luồng và 10 câu bổ sung. Không thêm ID, không mở lại 10 mục đã rút. Mỗi câu nêu tình huống, điểm chưa rõ và tác động; ưu tiên tự động × duyệt, dừng × bài mới, đăng nhiều SNS × lỗi một phần, thanh toán × hồ sơ chưa sẵn sàng. Giữ nguyên quyết định H65. Các câu hỏi là phương án xin quyết định, không là kết luận khách. Chưa có content ACCEPT đúng bản hoặc Independent Verification; G5/G6 không đổi.


## Lọc trùng sau cập nhật workbook Q&A

Bản hiện hành còn 13 câu. Rút 4 câu đã có tại No.83/84/92 (vẫn mở, không đóng); 2 câu được trả lời đúng ý tại No.78/88; 1 câu phân công dựa trên mô tả chưa nhất quán No.87/88; 6 câu về giá, phí và chính sách thanh toán theo chỉ định. Chi tiết ID và lý do trong bản Q&A hiện hành và questions.csv. Giữ nguồn nguyên trạng. No.87 nói gửi thông báo mọi Manager, No.88 nói assign để nhận thông báo: giữ xung đột, không chốt. No.65/78 cũng thay đổi thông tin về email đã đăng ký, cần đối chiếu đặc tả ở lượt riêng. Nguồn mới làm G1–G4 STALE; không có Independent Verification hoặc G6 PASS mới.


**Kết quả lọc cuối, gồm cả No. cũ:** còn 2 câu bổ sung (WQA-076-01 về ngoại lệ tâm sự nghiêm trọng và WQA-066-02 chỉ về thời hạn giữ dữ liệu văn phòng). Rút 24/26 câu: 15 trùng No. gốc, 2 có trả lời đúng ý, 1 chờ đối chiếu mô tả phân công, 6 về giá/phí/thanh toán. Giữ 36 ID và 34 disposition. Các số đếm 13 câu ở bước trung gian phía trên đã được thay thế. Không đóng câu gốc còn mở.


## Bổ sung theo yêu cầu: SNS/lịch đăng và danh sách từ cấm

Đã ghi WQA-081-01/FND-0049 và WQA-013-01/FND-0050, cấp ứng viên chưa content review. Câu SNS có đề xuất chặn ngắt/đổi khi đúng SNS còn lịch; không coi đề xuất đã chốt. Câu từ cấm hỏi trọn quy trình giữ bài, người tiếp nhận, quyền sửa/hủy và điều kiện đăng tiếp; không hỏi lại Talent xác nhận bản Manager sửa. Giữ G1–G4 STALE, G5/G6 BLOCKED.

Tiếp tục tìm: (1) nhiều Manager cùng duyệt — CR-14 đã nêu người thao tác trước quyết định, không hỏi lại chính sách; chống thao tác đồng thời do team. (2) đổi chế độ với bài đã lên lịch — No.83 đã hỏi, không thêm. (3) sửa nội dung sau duyệt — No.85 đã trả lời không sửa, không hỏi lại duyệt lại. (4) chỉ thị AI mâu thuẫn hồ sơ — No.92 đã hỏi; không thêm. (5) dừng vì tư liệu hết, hết kỳ, gửi ảnh muộn — No.70/83/56 đã có. Chưa tìm thêm câu đủ khác biệt để thêm ở lượt này. Không thêm câu giá tiền.

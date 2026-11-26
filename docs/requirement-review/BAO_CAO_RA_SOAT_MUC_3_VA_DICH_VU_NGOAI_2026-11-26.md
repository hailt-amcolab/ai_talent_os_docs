# Báo cáo rà soát yêu cầu phi chức năng và dịch vụ ngoài của AI育成OS

**Bản nháp nội bộ, để xem lại trước khi phản hồi Adesso. Cập nhật ngày 26/11/2026.**

Báo cáo này xem lại ba tài liệu:

- Mục 3 "Yêu cầu phi chức năng" trong bản yêu cầu phiên bản 0.3 ngày 24/11.
- Bộ slide so sánh dịch vụ ngoài trình bày ngày 24/11.
- Đề xuất về nơi lưu ảnh, video và tệp.

Mỗi ý có ghi nguồn ở cuối để tiện tra lại.

**Đối chiếu Q&A/KS hiện tại ngày 26/11/2026:** đã đọc giá trị của cả năm sheet mỗi workbook. Báo cáo phân biệt phản hồi FCP, ghi nhận thiết kế nội bộ theo bản yêu cầu và phần còn chờ Adesso; trạng thái Close không tự xác nhận toàn bộ nội dung hoặc phê duyệt thương mại. Đây là cập nhật nội dung báo cáo, không phải ký kiểm chứng độc lập hoặc chuyển gate sang PASS. Hồ sơ nguồn và giới hạn: [cập nhật QA/KS ngày 26/11](corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).

## 1. Những điểm đã có trong bản yêu cầu nhưng cần chốt hoặc sửa

**Số Talent trong đợt đầu.** Bản yêu cầu ghi mục tiêu 200 đến 300 Talent, về lâu dài là 1.000. Bảng báo giá lại tính tối đa 150 Talent và khoảng 8 tài khoản văn phòng. Hai con số này ảnh hưởng tới thời gian xử lý buổi sáng, gói dịch vụ ngoài phải mua và chi phí máy chủ. Đội đang thiết kế theo mức 150 Talent và chờ Adesso quyết định.
*Nguồn: bảng hỏi đáp, sheet yêu cầu bổ sung, mục CR-09; bản yêu cầu mục 3-2.*

**Xóa dữ liệu khi Talent ngừng sử dụng.** Bản yêu cầu ghi giữ dữ liệu sáu tháng rồi tự động xóa. No.69 hiện đã Close; câu trả lời ngày 25/11 là ghi nhận thiết kế nội bộ theo bản yêu cầu 0.3: Talent đã ngừng sử dụng không được chuyển lại sang đang sử dụng, email còn tồn tại không đăng ký lại được, dữ liệu giữ sáu tháng rồi tự xóa (phương án A). Không tiếp tục ghi No.69 là chưa trả lời hoặc hỏi lại lựa chọn quay lại này. Ghi nhận đó không phải phản hồi mới của Adesso xác nhận mọi đối tượng xóa.

Các phần cần làm rõ còn lại:

- Nhật ký thao tác và nhật ký xem của Manager có bị xóa cùng dữ liệu Talent không; nếu giữ thì giữ trong bao lâu.
- Dữ liệu ở các dịch vụ ngoài và bản sao lưu được xử lý thế nào khi đến hạn xóa.
- Lịch sử tính tiền có cần giữ trong AI育成OS hay chỉ xem ở Square, và thời hạn giữ nếu cần. Tiếp tục theo No.98, không tạo câu hỏi trùng.

No.98 có phản hồi FCP ngày 26/11 chọn phương án A: cho ngừng sử dụng ngay, thu các khoản đã phát sinh ở kỳ thu kế tiếp rồi dừng thu. Riêng việc giữ lịch sử tính tiền trong hệ thống vẫn chờ FCP hỏi Adesso; không coi toàn bộ phương án lưu dữ liệu kế toán đã được chốt.
*Nguồn: bản yêu cầu mục 2-4-12 và 2-5; QA `Q&A!G69:J69`, `G98:H98`; KS `20261122!F37:G37` (No.36).*

**Nơi lưu dữ liệu nghiệp vụ.** No.101 ghi nhận xác nhận ngày 24/11: AI Coach đọc và ghi trực tiếp cơ sở dữ liệu hệ thống, dữ liệu được sao lưu; Adesso chịu phí AI và tự điều chỉnh chỉ dẫn. Không cam kết phán đoán của AI luôn đúng. Nội dung này cần phản ánh vào mục 2-5, 3-3, 3-8 và tiêu chí nghiệm thu; không hỏi lại quyết định dùng cơ sở dữ liệu.

Tuy nhiên, phản hồi FCP ngày 26/11 tại No.92 vẫn ghi thông tin ngoài các trường của M-08 được Manager nhập qua hội thoại M-17 rồi lưu thành tệp MD trong thư mục OneDrive của Talent. Bản yêu cầu mục 2-5 cũng còn mô tả lưu dữ liệu nghiệp vụ trên OneDrive. Chưa đủ căn cứ để viết OneDrive chỉ giữ bản xuất hoặc tài liệu nội bộ. Đội/FCP cần đối chiếu và làm rõ dữ liệu gốc nằm ở đâu, OneDrive giữ dữ liệu nào và có cần đồng bộ không; chỉ chuyển khách quyết định nếu ảnh hưởng cách vận hành, phạm vi hoặc chi phí. Tần suất sao lưu và cách khôi phục do đội đề xuất.
*Nguồn: QA `Q&A!G101:H101`, `G92:H92`; bản yêu cầu mục 2-5, 3-3 và 3-8.*

**Đầu vào cho kiểm thử nghiệm thu.** Adesso cần cho biết số tiền thu Talent cho mỗi lần tạo video trước khi bắt đầu kiểm thử nghiệm thu. FCP ngày 26/11 đã yêu cầu làm đơn giá thành giá trị Manager cài tại M-18 ❺; số tiền cuối cùng vẫn chờ Adesso quyết định dựa trên kết quả kiểm thử độ dài và chất lượng video. Không hỏi lại nơi cài đơn giá. Adesso cũng cần chuẩn bị Talent thật và tài khoản mạng xã hội để thử đăng bài. Việc này đã được nêu trong bảng xác nhận nhưng bản yêu cầu chưa ghi. Với các đầu vào khác như điều khoản sử dụng và nội dung thông báo, cần rà lại những gì còn thiếu, ai cung cấp và khi nào.
*Nguồn: bảng hỏi đáp, câu số 2; bảng xác nhận, sheet các việc cần quyết, mục 3; bản yêu cầu mục 3-8.*

## 2. Những yêu cầu phi chức năng còn thiếu trong bản yêu cầu

**Tốc độ phản hồi.** Bản yêu cầu chưa đặt mục tiêu cho:

- thời gian mở màn hình;
- thời gian AI Coach bắt đầu trả lời;
- thời gian tạo xong một video;
- độ lệch cho phép giữa giờ đăng đã đặt và giờ đăng thật.

Ngoài ra, xử lý buổi sáng hiện chỉ được kiểm tra với số người lúc bắt đầu. Nên kiểm tra theo quy mô sẽ chốt ở trên.
*Nguồn: bản yêu cầu mục 3-2.*

**Khi hệ thống gặp sự cố.** Bản yêu cầu chưa nói:

- được phép mất tối đa bao nhiêu dữ liệu, và mất bao lâu thì hệ thống chạy lại;
- có lịch bảo trì không, và báo trước cho người dùng bằng cách nào;
- khi hệ thống báo lỗi thì ai nhận cảnh báo, và ai xử lý trong giờ nào.

Việc bảo trì sau khi đưa vào dùng thuộc một hợp đồng riêng, nhưng vẫn nên ghi rõ ranh giới trách nhiệm.
*Nguồn: bản yêu cầu mục 3-3 và 3-8.*

**Bảo mật khi Manager dùng ChatGPT.** No.89 đã có phản hồi FCP ngày 26/11 về M-01: lần đăng nhập đầu, sau khi kiểm tra mật khẩu sẽ hiển thị QR đăng ký ứng dụng xác thực và ô nhập mã sáu số; FCP sẽ bổ sung định nghĩa màn. Không hỏi lại bước thiết lập xác thực này. Đây là xác thực ở M-01, chưa đủ để kết luận cách kiểm tra quyền khi đi qua ChatGPT.

Manager sẽ dùng ChatGPT để xem và sửa thông tin Talent cũng như chỉ dẫn cho AI. Bản yêu cầu chưa nói:

- Manager đăng nhập và được kiểm tra quyền thế nào khi đi qua ChatGPT;
- những dữ liệu nào được đưa sang ChatGPT, trong đó có thông tin của Talent vị thành niên;
- tài khoản ChatGPT Business phải cài đặt ra sao.

No.88 có phản hồi FCP chấp nhận chuyển Talent sang Manager khác trước khi vô hiệu hóa người phụ trách cũ. Không hỏi lại lựa chọn bàn giao này. Cách thu hồi quyền và phiên đăng nhập là việc đội cần đặc tả. Khi người phụ trách vắng mặt hoặc bỏ sót yêu cầu duyệt, cách báo cho người khác và người nhận các thông báo khác vẫn chờ Adesso theo No.87–88.

Đội cần đề xuất thời hạn phiên đăng nhập, cách quản lý khóa kết nối và phạm vi kiểm tra lỗ hổng; trình khách những lựa chọn ảnh hưởng chính sách, phạm vi hoặc chi phí. Không coi người nhận thông báo nghiệp vụ ở No.87 là người nhận cảnh báo sự cố kỹ thuật.
*Nguồn: bản yêu cầu mục 3-5; slide so sánh, trang 9; QA `Q&A!G89:H89`, `G87:H88`; KS `20261122!F36:G36` (No.35).*

**Gửi dữ liệu cá nhân ra nước ngoài.** OpenAI và fal.ai đặt ở Mỹ. Upload-Post do một công ty ở Tây Ban Nha vận hành. Theo luật bảo vệ thông tin cá nhân của Nhật, khi đưa thông tin cho bên thứ ba ở nước ngoài thì sự đồng ý của người dùng phải bao gồm việc đó. Bản yêu cầu đang ghi Adesso lấy sự đồng ý của Talent. Cần nói rõ là sự đồng ý đó phải bao gồm cả việc gửi dữ liệu ra nước ngoài.

Cần làm rõ thêm hai điểm:

- Khi xóa dữ liệu sau sáu tháng thì dữ liệu ở các dịch vụ ngoài có bị xóa theo không.
- Khi Talent tự yêu cầu xem hoặc xóa dữ liệu của mình thì xử lý thế nào.

*Nguồn: bản yêu cầu mục 3-6; bảng xác nhận, sheet ngày 22/11, mục 21.*

**Ghi rõ nội dung do AI tạo.** Slide về OpenAI có nhắc điều kiện khi dùng cho người dưới 18 tuổi: phải cho người dùng biết họ đang nói chuyện với AI và phải kiểm tra nội dung không phù hợp. Bản yêu cầu chưa có yêu cầu này. Video tạo từ ảnh người thật cũng có thể phải gắn nhãn "nội dung do AI tạo" trên TikTok, YouTube và Instagram. Đội cần đối chiếu với quy định hiện hành của từng nền tảng rồi ghi vào bản yêu cầu.
*Nguồn: slide so sánh, trang 9; bản yêu cầu mục 3-8.*

**Những thứ Adesso cần chuẩn bị nhưng chưa có trong danh sách.**

- Chính sách bảo mật thông tin cá nhân. Hiện danh sách mới có điều khoản sử dụng.
- Talent và tài khoản mạng xã hội dùng cho kiểm thử nghiệm thu.
- Môi trường thử của cổng thanh toán.
- Tên miền của hệ thống và tên miền dùng để gửi mail.
- Hợp đồng ChatGPT Business cho các Manager.

*Nguồn: bản yêu cầu mục 3-8.*

## 3. Bộ slide so sánh dịch vụ ngoài

**Cổng thanh toán.** KS danh sách việc cần làm No.16 ghi nhận sau họp 24/11 có thông tin chọn Square thay GMO. Tuy nhiên, phản hồi FCP ngày 26/11 ở QA No.4 và No.49 vẫn ghi **đang xem xét Square**; khả năng thu gộp phí video trả sau, ngày thu phí tháng và ngày tổng hợp/chuyển phí video còn chờ kiểm tra thông số dịch vụ. Báo cáo chưa coi Square là nhà cung cấp đã chốt đầy đủ.

FCP cho biết có thể dùng thanh toán di động và thẻ, nhưng có thể không dùng được thanh toán qua nhà mạng. Đội/provider cần kiểm tra khả năng thực tế; sau đó Adesso quyết định phương thức và phạm vi cần giữ. Không đồng nhất thanh toán di động với thanh toán qua nhà mạng. Tiếp tục theo No.4/49; cập nhật bản yêu cầu và slide sau khi có kết quả, ghi rõ các khoản phí thanh toán chưa nằm trong bảng ước tính.

No.63/86 còn bổ sung hành vi khi thanh toán lại vẫn thất bại: chuyển sang “Chờ thanh toán”, dừng AI Coach, tạo video và đăng bài; vẫn thu phí tháng, cho đăng nhập đổi phương thức thanh toán; khi xác nhận trả thành công thì tự khôi phục. Bài quá giờ trong lúc dừng không tự đăng bù. Cần phản ánh vào vận hành và nghiệm thu; không suy ra từ các hành vi này rằng mọi khả năng của Square đã được kiểm chứng.
*Nguồn: QA `Q&A!G5:H5` (No.4), `G50:H50` (No.49), `G63:H63`, `G86:H86`; KS danh sách việc cần làm No.16; bản yêu cầu mục 2-4-11 và 3-8.*

**Upload-Post và TikTok.** Cần sửa câu "không cần xét duyệt của mạng xã hội" cho đúng. Phải nói rõ là dự án dùng kết nối của Upload-Post, và kết nối này đã qua xét duyệt của TikTok.

Vẫn phải giữ lời cảnh báo: TikTok có thể hạn chế bài đăng hoặc tài khoản, vì hệ thống đặt lịch đăng, đăng tự động, đăng mà không cần Talent xác nhận, và không cho Talent chọn ai được xem bài.

Ngoài ra, gói Business của Upload-Post chỉ kết nối được tối đa 225 Talent. Nếu chốt quy mô 300 Talent thì phải đổi gói và tính lại chi phí.
*Nguồn: bảng xác nhận, sheet ngày 22/11, mục 19 đến 23.*

**Danh sách dịch vụ chưa đủ.** Slide 2 chỉ nêu bốn loại: máy chủ, AI, tạo video và đăng bài. Còn thiếu cổng thanh toán, dịch vụ gửi thông báo tới điện thoại, dịch vụ gửi mail, và Microsoft 365 cùng OneDrive.
*Nguồn: slide so sánh, trang 2.*

**Cách xử lý dữ liệu của từng dịch vụ.** Với mỗi dịch vụ, cần ghi rõ:

- dữ liệu nào được gửi đi;
- lưu ở đâu và trong bao lâu;
- có bị dùng để huấn luyện AI không.

Đội cũng cần kiểm tra điều kiện dành cho người dưới 18 tuổi theo đúng dịch vụ, gói và cách cài đặt sẽ dùng.
*Nguồn: slide so sánh, trang 3 đến 6 và 9 đến 12.*

**Nơi lưu ảnh và video trong slide khác với bản yêu cầu.** Slide 11 và 12 viết là ảnh, video được lưu ở Tokyo, gói tháng gồm 100GB lưu trữ và 250GB truyền dữ liệu. Như vậy slide đã ngầm chọn lưu ở Supabase. Bản yêu cầu lại ghi là lưu ở OneDrive. Cần thống nhất hai tài liệu sau khi có kết quả đo ở phần 4.
*Nguồn: slide so sánh, trang 11 và 12; bản yêu cầu mục 2-5.*

**Bảng chi phí hằng tháng.**

KS `20261122!G34:H34` (No.33) đã bổ sung ước tính theo 30/50/100/150 Talent, gồm Upload-Post, OpenAI, ChatGPT cho năm Manager và Vercel/Supabase; video tính riêng. Cột H ghi đã trình bày ngày 24/11 và nhận xác nhận không có vấn đề với mức ước tính chưa gồm video. Vì vậy, không mô tả toàn bộ chi phí là chưa được trình khách. Đây là ghi nhận về mức ước tính theo giả định, không chứng minh mọi khoản phát sinh hoặc vượt hạn mức đã được duyệt. Giới hạn dung lượng ảnh/video vẫn để thiết kế và ghi ở bản yêu cầu cuối.

Các điểm sau tiếp tục là phần cần bổ sung/đối chiếu của bộ slide:

- Cần ghi rõ mức 236 yên một lần tạo video đến từ cách tạo nào. Cần tách rõ số tiền trả cho nhà cung cấp và số tiền thu của Talent.
- Bảng tính cho 50, 100 và 150 Talent chỉ là ước tính theo kịch bản. Cần tính lại khi chốt quy mô.
- Bảng chưa gồm các khoản sau:
  - phí thanh toán;
  - phí Microsoft 365;
  - phí gửi mail;
  - phí tìm kiếm thông tin trên mạng của AI;
  - phí lưu trữ và truyền dữ liệu khi vượt mức có trong gói.
- Theo ước tính sơ bộ của đội (chưa đo), 150 Talent mỗi người một video khoảng 50MB mỗi ngày sẽ tạo ra khoảng 225GB mỗi tháng. Mức này vượt 100GB có trong gói ngay tháng đầu.
- Bảng tính một bài mỗi người mỗi ngày. Nhưng bản yêu cầu không giới hạn số bài mỗi ngày, và chế độ đăng tự động có thể đăng nhiều hơn. Cần ghi rõ đây là giả định.
- Chi phí AI chạy trong hệ thống được ước khoảng 3.000 đến 8.000 yên mỗi tháng, nhưng slide chưa nêu giả định về số lượt trò chuyện và số ảnh mỗi ngày. Vì Adesso chịu khoản này, nên ghi rõ giả định để Adesso hiểu khi nào chi phí sẽ tăng.

*Nguồn: slide so sánh, trang 5, 6 và 13.*

## 4. Đề xuất nơi lưu ảnh, video và tệp

Bản yêu cầu ghi OneDrive là nơi lưu ảnh, video và thư mục của từng Talent. No.101 đã ghi nhận AI Coach đọc/ghi DB, nhưng No.92 ngày 26/11 vẫn ghi lưu thông tin nhập qua M-17 thành MD trên OneDrive. Cần làm rõ quan hệ hai nơi lưu như phần 1; chưa coi đề xuất dưới đây là phương án đã duyệt. Nơi lưu ảnh/video/tệp gốc vẫn cần Adesso xác nhận sau khi đội trình phương án và kết quả đo.

Đội đề xuất như sau:

- Dùng **Supabase Storage** cho ảnh, video và tệp mà Talent thường xuyên tải lên hoặc xem trong ứng dụng.
- Dùng **OneDrive** cho tài liệu nội bộ mà Adesso quản lý bằng Microsoft 365.

Lợi thế dự kiến của Supabase Storage là hiện danh sách ảnh nhỏ và xem lại ảnh nhanh hơn. Cả hai dịch vụ đều cho tải tiếp file lớn khi mạng bị ngắt giữa chừng. Chênh lệch tốc độ thực tế chưa được đo.
*Nguồn: [Supabase Storage](https://supabase.com/docs/guides/storage), [tải file lớn lên OneDrive](https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession).*

Trước khi trình đề xuất, đội cần đo ba con số với cùng một bộ tệp và cùng điều kiện mạng:

- thời gian tải lên;
- thời gian hiện ảnh đầu tiên;
- thời gian tải file gốc về.

Kèm theo kết quả đo là chi phí lưu trữ, chi phí truyền dữ liệu và cách khôi phục. Nếu chọn Supabase Storage thì cần cách sao lưu file riêng, vì bản sao lưu cơ sở dữ liệu của Supabase không gồm các file trong Storage.
*Nguồn: [sao lưu của Supabase](https://supabase.com/docs/guides/platform/backups).*

## 5. Thứ tự ưu tiên khi phản hồi Adesso

1. Xin Adesso chốt ba việc trước:
   - số Talent trong đợt đầu;
   - phạm vi xóa sau sáu tháng và ngoại lệ giữ dữ liệu, nhất là lịch sử tính tiền theo No.98; không hỏi lại lựa chọn quay lại đã ghi tại No.69;
   - số tiền thu cho mỗi lần tạo video.
2. Đội/provider kiểm tra Square theo No.4/49, rồi trình Adesso chốt phương thức thanh toán và chu kỳ còn mở.
3. Đội/FCP làm rõ giao điểm DB–OneDrive tại No.92/101 trước khi sửa mô tả nơi lưu dữ liệu.
4. Đội chuẩn bị mức hiệu năng, khôi phục và phương án bảo mật ở phần 2 để trình duyệt; tiếp tục phần thông báo còn chờ Adesso dưới No.87/88.
5. Trình đề xuất nơi lưu file gốc sau khi có kết quả đo.

## Nguồn tham khảo

- Bản yêu cầu phiên bản 0.3: [AI育成OS_要件定義書.docx](../../source_requiments/24112026/AI育成OS_要件定義書.docx)
- Slide so sánh dịch vụ ngoài: [AI育成OS_外部サービスの比較_20261124.pptx](../../source_requiments/24112026/AI育成OS_外部サービスの比較_20261124.pptx)
- Bảng hỏi đáp với Adesso: [AI-Talent-OS_Q&A表.xlsx](../../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx)
- Bảng xác nhận yêu cầu: [要件定義確認シート_AI育成OS.xlsx](../../source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx)

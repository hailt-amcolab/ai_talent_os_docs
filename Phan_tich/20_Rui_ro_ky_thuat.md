<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### TikTok: giữ đăng trực tiếp

Nguồn ghi tiếp tục đăng trực tiếp qua Upload-Post, không gửi nháp; giữ lịch/autopost và không thêm ô Talent chọn phạm vi công khai từng bài. Nguồn đồng thời ghi câu trả lời TikTok và Upload-Post khác nhau.

**Còn mở/giới hạn:** Đây là hướng đi và lời thuật lại của nguồn, không chứng minh TikTok duyệt mô hình. Giữ rủi ro hạn chế bài/tài khoản và kiểm provider; không ghi tuân thủ đã xác minh. Căn cứ: `KS 20261122!G20:H24 (No.19–23)`; `EV-1320`; QA No.70;QA No.71;TR-8-2;TR-8-3;TR-8-4.

### Chi phí dịch vụ và hợp đồng

H34 ghi đã giải thích24/11 và khách thấy mức phí tháng ngoài video không vấn đề; phí video do Talent trả. Slide EXT24 p13 tách phí video khỏi tổng và tính50/100/150người.

**Còn mở/giới hạn:** Chỉ là xác nhận mức ước tính theo nguồn; không là ký hợp đồng dịch vụ, phí duy trì hoặc bảo đảm giá. Square/provider và mức lưu/truyền vẫn cần kiểm. Căn cứ: `KS 20261122!G34:H34 (No.33)`; `EV-1326`; TR-3-5;TR-5-4.

<!-- /DELIVERY24112026 -->

# Rủi ro kỹ thuật của dự án

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **8-2** — Mở màn login/cho phép của từng SNS, không mở giao diện dịch vụ đăng; quay về T-07. Một tài khoản mỗi SNS; business/creator Instagram; không cần nối đủ 3 SNS. Còn mở: Luồng nhà cung cấp/48 h là thiết kế tích hợp phải kiểm, không hỏi khách chọn API hoặc khẳng định đã kiểm tài khoản thật. Căn cứ: `T19:10,26;BF19:5`.
- **5-1** — T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước. Còn mở: CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi. Căn cứ: `T19:20;BF19:12`.
- **1-1** — Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp. Còn mở: Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày. Căn cứ: `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

Viết ngày 17/11/2026. Dựa trên các lần kiểm chứng tài liệu và đặc tả trong `agent_spec/` (xem `agent_spec/KET_QUA_KIEM_CHUNG_17-11.md`), file Q&A bản 15/11 (`Phan_tich/19_Doi_chieu_QA_bao_gia.md`) và tài liệu hạ tầng (`Phan_tich/18_Ha_tang_he_thong.md`). **Chưa rủi ro nào được thử trên môi trường thật**; mọi ca kiểm thử trong `agent_spec/` vẫn ở trạng thái NOT_RUN (chưa chạy).

File này thay phần chi tiết của `Phan_tich/11_Edge_case_va_rui_ro.md` §3.2 (T1–T9). Cột "Mã cũ" ghi ánh xạ sang mã trong file 11.

## 1. Cách đọc

| Cột | Ý nghĩa |
|---|---|
| Khả năng | Cao / Trung bình / Thấp: ước lượng của đội, không phải số đo |
| Ảnh hưởng | Cao: chặn ra mắt hoặc mất dữ liệu, tiền. Trung bình: phải đổi thiết kế hoặc tốn thêm công. Thấp: chỉ ảnh hưởng trải nghiệm |
| Phụ trách | Vai trò, không phải tên người: **Đội** (đội phát triển), **Khách** (FutureCore hoặc アデッソ), **PM** (người quản lý dự án phía mình) |
| Hạn | Đề xuất của đội, căn theo lịch: UAT (kiểm thử chấp nhận) từ giữa tháng 1/2027, ra mắt cuối tháng 2/2027 |
| Trạng thái | Mở / Đang giảm / Đã quyết |

Mốc POC (thử nghiệm kỹ thuật) đề xuất: **xong trước 01/12/2026** (2 tuần từ ngày viết).

## 2. Bảng tổng hợp

| Mã | Rủi ro | Khả năng | Ảnh hưởng | Phụ trách | Hạn | Trạng thái | Mã cũ |
|---|---|---|---|---|---|---|---|
| RT01 | Phụ thuộc Upload-Post | Trung bình | **Cao** | Đội; Khách (tài khoản thử) | POC 01/12/2026 | Mở | T1 |
| RT02 | Chuỗi ChatGPT → OneDrive → AI buổi sáng chưa chứng minh | **Cao** | **Cao** | Đội; Khách (IT Microsoft 365) | POC 01/12/2026 | Mở | T2, T6 |
| RT03 | GMO thu số tiền thay đổi hằng tháng | Trung bình | **Cao** | Khách (hợp đồng GMO); Đội | Môi trường thử trước 15/12/2026 | Mở | — |
| RT04 | Chất lượng và độ ổn định của AI | **Cao** | **Cao** | Đội; Khách (file chỉ thị) | Bộ câu thử trước UAT | Mở | T3 |
| RT05 | Tạo video: chậm, lỗi, chi phí | Trung bình | Trung bình | Đội | POC 01/12/2026 | Mở | T5 |
| RT06 | Giới hạn của PWA trên iPhone | **Cao** | Trung bình | Đội | Trước UAT | Đang giảm | T4 |
| RT07 | Giới hạn gói Supabase và một VPS duy nhất | Trung bình | **Cao** | Đội; Khách (gói, ngân sách) | Chốt gói trước 15/12/2026 | Đang giảm | T8 |
| RT08 | Đồng bộ trạng thái bài đăng và giờ giấc | **Cao** | **Cao** | Đội | Chốt C-01 trước khi làm EP04, EP06 | Mở | — |
| RT09 | Thời gian ngắn, phụ thuộc nhiều vào khách | **Cao** | **Cao** | PM; Khách | Theo dõi hằng tuần | Mở | — |
| RT10 | Ảnh hưởng ứng dụng tin nhắn Instagram đang chạy | Thấp | **Cao** | Khách; Đội | Trước POC Upload-Post | Mở | T7 |
| RT11 | Email hệ thống vào thư rác hoặc bị chặn | Trung bình | Trung bình | Khách (tên miền, DNS); Đội | Trước UAT | Mở | T9 |
| RT12 | Khóa đăng nhập chỉ chặn được ở BE | Trung bình | Trung bình | Đội | — | Đã quyết (chấp nhận) | — |
| RT13 | Quy định giao diện đăng thẳng của TikTok không khớp cách đăng tự động | Trung bình | **Cao** | Đội (hỏi Upload-Post) | POC 01/12/2026 | Mở | — |

Ưu tiên xử lý (khả năng và ảnh hưởng đều cao): **RT02, RT04, RT08, RT09**. Ngay sau đó là RT01, RT03, RT13 vì chúng chặn ra mắt nếu POC thất bại.

## 3. Chi tiết từng rủi ro

### RT01. Phụ thuộc Upload-Post

**Mô tả.** Đăng bài lên Instagram, TikTok, YouTube và lấy số liệu đều đi qua một dịch vụ bên thứ ba ([YK2] §8, 6-10).
- Chưa thử trên tài khoản thật: bước kết nối, nhãn "do AI tạo" của từng mạng, hủy bài đã hẹn, độ trễ số liệu, Best Time to Post (giờ đăng tốt) và Audience Insights (số liệu người theo dõi).
- Giới hạn mỗi tài khoản trong 24 giờ: Instagram 50 bài, TikTok 15 bài (bộ Upload-Post §12).
- Bài đang được đăng dở thì không thu hồi chắc chắn được. Dừng đăng tự động hoặc hủy bài sát giờ vẫn có thể lọt bài.
- Phí tăng theo số tài năng đăng ký với Upload-Post, không theo số bài. Ước tính theo giá công bố (bộ Upload-Post §12): khoảng 50–150 USD/tháng cho 30 tài năng, khoảng 1.200 USD/tháng cho 1.000 tài năng (gói Business + 1 USD mỗi profile thêm). Chưa rõ Connect API có cần gói có white-label (từ Professional) không.
- Upload-Post tự tạm dừng tài khoản khi mạng báo spam (Instagram 24 giờ, TikTok cấm đăng 7 ngày); trong thời gian đó tài năng không đăng được lên mạng đó.

**Dấu hiệu xảy ra.** POC kết nối thất bại; bài bị từ chối vì nhãn AI; số liệu thiếu hoặc trễ quá một ngày.

**Cách giảm.**
1. POC với 1–2 tài khoản thật ngay tuần đầu (danh sách kiểm chứng ở `SCD/EP06…/00_Cau_hoi_cho_khach.md` mục 4).
2. Bọc Upload-Post sau một lớp adapter (lớp chuyển đổi) để có thể đổi dịch vụ.
3. Đối soát kết quả đăng định kỳ; trạng thái "không rõ" phải hiện cho quản lý, không đoán là thành công.

**Phương án dự phòng.** Nếu Upload-Post không đáp ứng: đăng trực tiếp qua API của từng mạng. Việc này tốn nhiều công và cần duyệt ứng dụng với Meta, TikTok, Google, nên phải báo khách ngay khi POC thất bại.

### RT02. Chuỗi ChatGPT → OneDrive → AI buổi sáng

**Mô tả.** Quản lý nhập thông tin tài năng bằng ChatGPT (MCP – giao thức cho ChatGPT gọi công cụ bên ngoài, căn cứ: 御見積書 前提条件 A4, trích ở Q&A No.45). Thông tin ghi vào OneDrive, rồi 8:00 hệ thống đọc lại ([YK2] UC-01 前提, 7-5).
- Chưa chứng minh ChatGPT ghi vào OneDrive được (S02-01).
- Quyền Microsoft Graph: các trang tài liệu chỉ ghi quyền ở mức toàn tenant (Sites.ReadWrite.All, Files.ReadWrite.All). Quyền giới hạn theo site hoặc thư mục (Selected) chưa được xác nhận cho các thao tác cần dùng (bộ OneDrive §4.2). Bộ phận IT của khách có thể không cấp quyền toàn tenant.
- Thông báo thay đổi của OneDrive chỉ đăng ký được ở thư mục gốc và có thể trễ tới 6 giờ (bộ OneDrive §9.1).
- File viết tự do thì AI dễ đọc sai. Tài năng thiếu thông tin thì AI không đưa bản nháp.
- Thiết lập thủ công cho từng tài năng; khi lên 1.000 tài năng thì công thiết lập rất lớn.

**Dấu hiệu xảy ra.** POC P02 không đạt với quyền Selected; IT của khách từ chối quyền rộng; tỉ lệ file đọc lỗi cao.

**Cách giảm.**
1. POC P02 (quyền Graph) và POC ghi qua MCP.
2. Chốt mẫu file sớm (khách đưa mẫu, Q&A No.22).
3. Màn chi tiết tài năng hiện tình trạng đọc file (Q&A No.22).
4. Luôn đối soát trước đợt khung sáng (8:00), không chỉ dựa vào thông báo thay đổi.

**Phương án dự phòng.** Nếu quyền Selected không đủ, đề nghị khách tạo một site SharePoint riêng cho hệ thống để quyền rộng chỉ áp trên site đó. Nếu ChatGPT không ghi được, cho quản lý nhập thông tin trong màn quản trị; đây là thay đổi phạm vi, phải báo khách.

### RT03. GMO thu số tiền thay đổi hằng tháng

**Mô tả.** Tiền mỗi tháng = phí tháng + số lần tạo video × đơn giá ([YK2] 5-4).
- Chưa rõ thanh toán qua nhà mạng có thu được số tiền thay đổi hằng tháng hay không (Q&A No.4).
- SoftBank không hỗ trợ thu định kỳ (Q&A No.4, 御見積書 A18).
- Chu kỳ thu (cuối tháng hay theo ngày đăng ký) còn đang hỏi (Q&A No.49, No.53).

**Dấu hiệu xảy ra.** GMO xác nhận chỉ thu được số tiền cố định với một số phương thức.

**Cách giảm.**
1. Xin môi trường thử của GMO sớm (確認49).
2. Thử thu số tiền thay đổi với thẻ và từng nhà mạng trước khi làm EP08.

**Phương án dự phòng.** Thu phí video thành một khoản riêng, hoặc chỉ cho tạo video khi dùng thẻ. Cả hai đều phải được khách đồng ý.

### RT04. Chất lượng và độ ổn định của AI

**Mô tả.**
- Kiểm tra từ cấm bằng AI theo ngữ cảnh thì không ổn định; khách đã chấp nhận có thể bỏ sót (Q&A No.13).
- Nhận ra chuyện sức khỏe hoặc muốn nghỉ để báo quản lý cũng dựa vào AI. Có tài năng vị thành niên, nên một lần bỏ sót có thể thành vấn đề lớn. Nhãn dưới 18 tuổi chỉ để tham khảo ([KS] 確認2). Quy tắc cho vị thành niên do khách viết vào file chỉ thị (Q&A No.18).
- Các đợt trước khung sáng (8:00), trưa, tối ([KS] 確認18) cho 100 rồi 1.000 tài năng sẽ chạm giới hạn tốc độ và chi phí của OpenAI; gửi ba khung giúp rải tải nhưng tăng số đợt. Tìm tin tức mỗi sáng (CR-05) làm phí tăng thêm.
- Đổi prompt hoặc đổi model có thể làm chất lượng thay đổi mà không ai biết.

**Dấu hiệu xảy ra.** Bài dính từ cấm vẫn được hẹn giờ; đợt trước khung giờ chưa xong khi tới giờ nhắn; phí AI tháng vượt dự tính.

**Cách giảm.**
1. Kiểm từ cấm hai lớp: so khớp chuỗi với danh sách trước, AI theo ngữ cảnh sau. Lớp so khớp không thay đổi quy tắc của [YK2]; nó chỉ chặn thêm các trường hợp chắc chắn.
2. Lập bộ câu thử cố định (từ cấm, chuyện sức khỏe, câu ngoài chủ đề, tài năng vị thành niên). Chạy lại mỗi khi đổi prompt hoặc model.
3. Mỗi đợt chạy qua hàng đợi, chia nhiều đợt nhỏ và bắt đầu sớm hơn giờ của khung. Tin nhắn chỉ gửi khi tới giờ của khung.
4. Tổng hợp phí AI theo tài năng và theo tháng (3-5), có cảnh báo nội bộ khi vượt ngưỡng. Không tự dừng AI (Q&A No.17).

### RT05. Tạo video

**Mô tả.**
- Kling qua fal.ai mất vài phút mỗi video và có thể lỗi. Lượt được tính ngay lúc gửi yêu cầu; lỗi phía dịch vụ thì không tính (Q&A No.1).
- Video trình chiếu ảnh ghép trên VPS (máy chủ riêng ảo) (CR-04), tốn CPU và chạy chung VPS với các tác vụ nền khác.
- Nhãn AI trên Instagram gắn rồi thì không gỡ được (bộ Upload-Post).
- Đơn giá video chưa chốt (Q&A No.2, No.62).

**Cách giảm.**
1. Tách hàng đợi video khỏi hàng đợi đăng bài.
2. Giới hạn số video ghép cùng lúc trên VPS.
3. Đo thời gian và chi phí thật trong POC.
4. Ghi rõ lý do lỗi để phân biệt lỗi phía dịch vụ (không tính tiền) với lỗi khác.

### RT06. Giới hạn của PWA trên iPhone

**Mô tả.**
- Thông báo đẩy cần iOS 16.4 trở lên và phải cài ứng dụng ra màn hình chính ([YK2] §11).
- PWA không tải lên ở chế độ nền được: tài năng thoát ứng dụng khi đang gửi video lớn qua 4G thì việc tải bị dừng.
- Thông báo đẩy không đảm bảo luôn tới nơi.

**Cách giảm (đã đưa vào bộ PWA).**
1. Tải lên bằng TUS để tiếp tục từ chỗ dừng (Supabase Storage).
2. Luôn có danh sách thông báo trong ứng dụng làm dự phòng.
3. Hướng dẫn cài ra màn hình chính ngay sau lần đăng nhập đầu (6-2).
4. Ghi phiên bản iOS tối thiểu vào điều kiện sử dụng.

### RT07. Giới hạn gói Supabase và một VPS duy nhất

**Mô tả.**
- Password Verification Hook (hook kiểm tra mật khẩu) chỉ có ở gói Team trở lên (xem RT12).
- Giới hạn thời gian phiên cần gói Pro và chỉ được kiểm khi làm mới token.
- Video đi qua Supabase Storage nên phí băng thông ra (egress) có thể cao.
- Chỉ một VPS chạy worker (tác vụ nền): VPS hỏng là dừng đăng bài, tạo video và đợt sáng.
- Chưa chốt khu vực đặt dữ liệu và sao lưu (I7, I8).

**Cách giảm.**
1. Ước chi phí Storage theo số video mỗi tháng; xóa bản tạm theo hạn (S05-03).
2. Worker chạy bằng Docker, có giám sát và tự khởi động lại; tác vụ ghi trong hàng đợi của Supabase nên VPS chết không mất việc.
3. Viết phương án dựng lại VPS và diễn tập một lần trước UAT.
4. Chọn khu vực Tokyo; chốt gói và sao lưu với khách (I1, I7, I8).

### RT08. Đồng bộ trạng thái bài đăng và giờ giấc

**Mô tả.** Bài đăng có 6 trạng thái ([YK2] hình 5-1), cộng kết quả riêng cho từng mạng. Nhiều sự kiện có thể xảy ra cùng lúc: hết hạn duyệt, dừng đăng tự động, quản lý hủy, Upload-Post trả kết quả. Nếu không kiểm soát thì dễ đăng trùng hoặc lệch trạng thái.

Các điểm chưa thống nhất:
- Q&A No.58: bài bị trả lại vẫn là cùng một bài; `SCD/EP10…/C-01` lại cho tạo bài mới.
- Q&A No.60: có thể cần trạng thái "giữ lại vì đang dừng đăng tự động".
- Q&A No.56: giờ đăng chốt lúc nào, nhiều bài trong ngày tính giờ thế nào.

**Cách giảm.**
1. Chốt máy trạng thái C-01 (gồm No.58, No.60) trước khi làm EP04 và EP06.
2. Mọi lệnh thay đổi trạng thái có `commandId` (chống trùng) và `expectedVersion` (khóa phiên bản).
3. Lưu thời gian theo UTC, hiển thị theo giờ Nhật.
4. Viết ca kiểm thử cho từng cặp sự kiện xảy ra cùng lúc.

### RT09. Thời gian ngắn, phụ thuộc nhiều vào khách

**Mô tả.**
- Còn khoảng 2 tháng phát triển trước UAT giữa tháng 1/2027.
- 34 câu Q&A còn mở; theo bảng xác nhận 17/11, CR-17, 18, 19, 21 làm, CR-20 không làm, CR-23 còn chờ khách (Q&A No.50); CR-24 không làm (No.7), CR-25 không cần (No.68).
- Chưa rõ ai làm 画面定義書 (tài liệu định nghĩa màn hình) (No.68); chưa chọn bộ mã màn hình chuẩn (No.30).
- Nhiều thứ do khách cung cấp nằm trên đường găng (critical path – chuỗi việc quyết định ngày xong): tenant Microsoft 365, hợp đồng GMO, tài khoản Upload-Post, tên miền gửi email, mẫu file, danh sách từ cấm, file chỉ thị cho AI.

**Cách giảm.**
1. Làm trước các phần không phụ thuộc khách: đăng nhập (TOTP), khung PWA, máy trạng thái, hàng đợi.
2. Lập danh sách thứ khách phải cung cấp, mỗi thứ có hạn chót; PM theo dõi hằng tuần.
3. Gom các POC vào 2 tuần đầu.
4. Không giao agent chức năng CR-23 cho tới khi có trả lời No.50. CR-17, 18, 19, 21 giao được (tệp 21).

### RT10. Ảnh hưởng ứng dụng tin nhắn Instagram đang chạy

**Mô tả.** Hệ thống không được ảnh hưởng ứng dụng tự động trả lời tin nhắn Instagram của khách ([YK2] §9-1). Nếu ứng dụng đó dùng chung tài khoản Instagram hoặc chung ứng dụng Meta, việc đăng qua Upload-Post có thể dùng chung hạn mức gọi API hoặc làm tài khoản bị khóa. Chưa có thông tin về cấu hình của ứng dụng đó (I1, Q&A No.24).

**Cách giảm.** Hỏi khách cấu hình của ứng dụng đó trước POC Upload-Post. POC dùng tài khoản không gắn với ứng dụng đó.

### RT11. Email hệ thống vào thư rác hoặc bị chặn

**Mô tả.** Mật khẩu tạm, thư từ chối và link đặt lại mật khẩu đều gửi bằng email ([YK2] UC-01, 6-1). Danh sách dịch vụ ngoài ở [YK2] §8 chưa có dịch vụ gửi email (C1).

**Cách giảm.** Dùng dịch vụ gửi email có xác thực tên miền (SPF, DKIM, DMARC); quản lý gửi lại được mật khẩu tạm (Q&A No.65); thử gửi tới các hộp thư phổ biến ở Nhật trước UAT.

### RT12. Khóa đăng nhập chỉ chặn được ở BE

**Mô tả.** Quy tắc "sai 5 lần khóa 15 phút" ([YK2] §6-1) được làm ở BE vì hook kiểm tra mật khẩu chỉ có ở gói Team. Ai gọi thẳng Supabase Auth bằng publishable key (khóa công khai của project) thì không bị đếm.

**Đã quyết ngày 17/11/2026:** chấp nhận rủi ro này ở đợt đầu. Cách giảm đã ghi trong bộ Supabase AU05: rate limit đăng nhập chặt của Supabase, giới hạn theo IP, cảnh báo trên log Auth. Khi lên gói Team thì chuyển sang hook.

### RT13. Quy định giao diện đăng thẳng của TikTok

**Mô tả.** TikTok yêu cầu ứng dụng đăng thẳng (Direct Post) phải:
- cho người dùng tự chọn quyền riêng tư, không có giá trị mặc định;
- để các nút bình luận, Duet, Stitch mặc định tắt;
- có khai báo nội dung quảng cáo và câu đồng ý về nhạc;
- **để người dùng sửa được chữ soạn sẵn trước khi đăng.**

TikTok cũng không chấp nhận công cụ nội bộ để một nhóm đăng lên các tài khoản do nhóm đó quản lý. Hệ thống lại để AI viết chú thích, hẹn giờ tự động và cho tài năng sửa chữ trực tiếp (CR-21, đã chốt làm theo [KS] 確認28). Nếu TikTok coi cách dùng này là vi phạm, bài có thể bị xóa hoặc tài khoản bị khóa. Nguồn: TikTok Content Sharing Guidelines, tra 17/11/2026 (bộ Upload-Post §12).

Tài liệu Upload-Post (trang đăng lên TikTok, tra 17/11) cho biết họ dùng ứng dụng TikTok đã được duyệt, có tham số `privacy_level`, `disable_comment`, `disable_duet`, `disable_stitch`, `is_aigc`, nhưng **không nhắc tới các quy định giao diện này**. Vì vậy vẫn chưa rõ trách nhiệm thuộc về ai.

**Cách giảm.**
1. Trong POC, hỏi Upload-Post họ tuân thủ quy định này thế nào và mình phải hiện gì trong ứng dụng.
2. Nếu bắt buộc, thêm vào bước 採用 (chấp nhận, 4-3) cho bài có TikTok: chọn quyền riêng tư, bật hoặc tắt bình luận, khai báo quảng cáo, câu đồng ý. Việc này làm tăng phạm vi màn T-09 và phải báo khách.
3. Tài năng sửa chữ trực tiếp đã có (CR-21, [KS] 確認28), nên yêu cầu "người dùng tự soạn được nội dung" của TikTok được đáp ứng một phần; vẫn cần kiểm với điều khoản TikTok.

## 4. Kế hoạch POC đề xuất

| POC | Rủi ro | Việc cần chứng minh | Cần từ khách | Kết quả "đạt" |
|---|---|---|---|---|
| P-UP | RT01, RT10, RT13 | Kết nối, đăng 3 mạng, nhãn AI, hủy bài đã hẹn, số liệu, best-times; bài TikTok có ở chế độ công khai không; Upload-Post yêu cầu gì về giao diện đăng thẳng của TikTok | Tài khoản Upload-Post; 1–2 tài khoản mạng xã hội thử | Đăng và hủy đúng trên cả 3 mạng; có số liệu ngày hôm sau |
| P-OD | RT02 | Quyền Graph (P02), tạo thư mục, tải lên, đọc file; ChatGPT ghi qua MCP | Tenant Microsoft 365 hoặc tenant thử; người có quyền admin | Làm được mọi thao tác với quyền khách chấp nhận cấp |
| P-GMO | RT03 | Thu số tiền thay đổi với thẻ và nhà mạng | Môi trường thử GMO (確認49) | Thu đúng số tiền khác nhau qua 2 tháng giả lập |
| P-AI | RT04, RT05 | Thời gian và chi phí đợt sáng cho 100 tài năng giả lập; bộ câu thử từ cấm; 1 video Kling và 1 video ghép ảnh | Khóa OpenAI và fal.ai | Đợt sáng xong trước 8:00; ghi được chi phí mỗi tài năng mỗi ngày |

## 5. Theo dõi

- Cập nhật cột "Trạng thái" khi POC xong hoặc khi khách trả lời câu liên quan.
- Rủi ro mới thêm mã RT14 trở đi; không dùng lại mã đã có.
- Khi một rủi ro thành sự cố, ghi ngày, ảnh hưởng thực tế và cách xử lý ngay dưới mục của rủi ro đó.

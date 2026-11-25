<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### YK3: luồng và mã màn

Bản0.3 ngày24/11 có16luồng nghiệp vụ, T-01–T-19 và M-01–M-21; đây là bộ mã của YK3. Ví dụ T-08 My Page, T-10 autopost, T-11 chat, M-08 nhập Talent, M-15 danh sách chỉ thị, M-16 nhập, M-17 chat, M-21 audit.

**Còn mở/giới hạn:** Không đổi mã AG/SD18/SD19 theo số trùng. YK3 dẫn screen/flow20/11 nhưng chưa có bộ độc lập đó trong24112026. Hình nhúng chỉ xem ở mức tổng quan, không đủ ký AC chi tiết. Căn cứ: `YK3 §2-4; w:p96–110; §2-5; phụ lụcA–D`; `EV-1327`; YK3 §2-4.

<!-- /DELIVERY24112026 -->

# Luồng nghiệp vụ hiện hành — đối chiếu19/11 và QA/KS20/11

Đã đối chiếu30luồng. Mỗi mục dưới là phần cập nhật hiện hành; liên kết chi tiết cũ dùng tra lịch sử và không thay thế phần này. Bước/scenario trong các sổ hiện hành được gắn nguồn mới; nhánh chưa chốt không tự thành quyết định khách. Chưa có Independent Review cho phiên bản này.

<a id="FLOW-0001"></a>
## FLOW-0001 — Talent nộp đơn và Manager xét duyệt

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Đồng ý phụ huynh và trần phí theo tuổi. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Manager duyệt/từ chối thì tự gửi email; email duyệt có mật khẩu tạm. Adesso cung cấp câu chữ, đội chuẩn bị bảng điền. Từ chối dùng cho người ngoài nhận được link; nguồn nói không trao đổi với người bị từ chối. **Giới hạn:** Không suy từ đây quy tắc nộp lại hoặc quyền đảo quyết định; No.65/78 còn phải đối chiếu. **Nguồn:** `KS 20261120!F3:F4`; EV-0963.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Đơn chờ không có hạn; nộp lại lúc chờ thì báo đã nộp và báo Manager lần nữa. Email đã đăng ký (kể cả đang ngừng) chuyển đăng nhập, không gửi thông báo đơn mới. Đơn sau từ chối được tiếp nhận như đơn mới; trao đổi trước xét qua email ngoài app. Sau đặt mật khẩu phải quay về đăng nhập.

**Còn thiếu/phần không tự suy:** Chưa chốt đổi quyết định trên chính đơn từ chối; chưa chốt toàn bộ vòng đời đăng ký lại sau nghỉ/xóa 6 tháng. Điều khoản dùng trang ngoài còn KS 20261120 No.33.

**Nguồn:** `T19:3,5,6,7;M19:7;BF19:3`. **Bằng chứng:** `EV-0555;EV-0557;EV-0558;EV-0559;EV-0592;EV-0615`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0001.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0002"></a>
## FLOW-0002 — Talent đăng nhập, đổi mật khẩu và khởi tạo sử dụng

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** PWA: kiểm tra thông báo và phương án thay thế. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Manager duyệt/từ chối thì tự gửi email; email duyệt có mật khẩu tạm. Adesso cung cấp câu chữ, đội chuẩn bị bảng điền. Từ chối dùng cho người ngoài nhận được link; nguồn nói không trao đổi với người bị từ chối. **Giới hạn:** Không suy từ đây quy tắc nộp lại hoặc quyền đảo quyết định; No.65/78 còn phải đối chiếu. **Nguồn:** `KS 20261120!F3:F4`; EV-0963.

Đăng nhập bằng mật khẩu tạm → đổi mật khẩu → đăng ký phương thức thanh toán → thêm vào màn hình chính; hướng dẫn rõ bước tiếp theo, gồm iPhone. **Giới hạn:** Không mặc định trình duyệt có thể tự cài PWA hoặc tự nhảy vào ứng dụng. Office giữ ngoại lệ thanh toán theo nguồn hiện có. **Nguồn:** `KS 20261120!F7`; EV-0965.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán.

**Còn thiếu/phần không tự suy:** Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích.

**Nguồn:** `T19:5,6,8,9,11,26,33;BF19:4`. **Bằng chứng:** `EV-0557;EV-0558;EV-0560;EV-0561;EV-0563;EV-0578;EV-0585;EV-0616`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0002.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0003"></a>
## FLOW-0003 — Đăng ký hoặc thay phương thức thanh toán

**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Đăng nhập bằng mật khẩu tạm → đổi mật khẩu → đăng ký phương thức thanh toán → thêm vào màn hình chính; hướng dẫn rõ bước tiếp theo, gồm iPhone. **Giới hạn:** Không mặc định trình duyệt có thể tự cài PWA hoặc tự nhảy vào ứng dụng. Office giữ ngoại lệ thanh toán theo nguồn hiện có. **Nguồn:** `KS 20261120!F7`; EV-0965.

Phí tháng theo hướng trả trước; nguồn ghi đang xem xét dừng sử dụng nếu1tháng chưa thanh toán. **Giới hạn:** “検討します” chưa chốt tự khóa sau1tháng. Chu kỳ cụ thể, khả năng cổng và No.46/49/86 còn mở; không tự xây retry hay thu sau. **Nguồn:** `KS 確認事項!K104;20261120!F24`; EV-0978.

Có thanh toán nhà mạng; GMO là ứng viên, cần quyết sớm. Nhà mạng không hỗ trợ thì dùng thẻ hoặc PayPay theo nguồn. Đội tổng hợp câu hỏi cổng về trả trước, phí biến đổi, giữa kỳ và chưa thanh toán, đổi phương thức/lịch sử. **Giới hạn:** GMO chưa được chọn/ký; không suy PayPay đã được duyệt toàn bộ hoặc tích hợp đã hoạt động. **Nguồn:** `KS 確認事項!K100;確認事項!K105;20261120!F25:F27`; EV-0979.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

**Còn thiếu/phần không tự suy:** Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

**Nguồn:** `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`. **Bằng chứng:** `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0003.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0004"></a>
## FLOW-0004 — Kết nối, mất kết nối và nối lại SNS

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** TikTok: tách gửi nháp và đăng công khai; Đồng ý và quyền riêng tư theo từng SNS. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


Mở màn login/cho phép của từng SNS, không mở giao diện dịch vụ đăng; quay về T-07. Một tài khoản mỗi SNS; business/creator Instagram; không cần nối đủ 3 SNS.

**Còn thiếu/phần không tự suy:** Luồng nhà cung cấp/48 h là thiết kế tích hợp phải kiểm, không hỏi khách chọn API hoặc khẳng định đã kiểm tài khoản thật.

**Nguồn:** `T19:10,26;BF19:5`. **Bằng chứng:** `EV-0562;EV-0578;EV-0617`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0004.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0005"></a>
## FLOW-0005 — Tạo thư mục và đăng ký hồ sơ qua ChatGPT

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Ảnh chân dung và liên kết profile Adesso. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


Folder Talent tạo tự động khi đăng ký thanh toán; folder office tạo ngay khi tạo tài khoản. Chưa nhập hồ sơ thì AI không tạo bài. Hồ sơ/chỉ thị đọc từ nguồn tương ứng; không yêu cầu Manager tạo folder thủ công.

**Còn thiếu/phần không tự suy:** Định dạng, chống ghi lặp/đồng thời và khôi phục là việc đội; chưa tự thay kiến trúc OneDrive.

**Nguồn:** `T19:9;M19:7,17;BF19:4,18`. **Bằng chứng:** `EV-0561;EV-0592;EV-0602;EV-0616;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0005.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0006"></a>
## FLOW-0006 — Nhập và chỉnh hồ sơ trên màn M-20

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Ảnh chân dung và liên kết profile Adesso; Mã màn và số lượng thực tế. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


M-21 (SD-M19 trang 26) nhập hồ sơ, định hướng, sở thích/sở trường, mục tiêu tương lai, giọng văn; có lưu/hủy/lịch sử. Xem/sửa được từ quản trị và ChatGPT, không sửa trực tiếp file OneDrive.

**Còn thiếu/phần không tự suy:** Năm mục là danh sách dự kiến tại KS 20261120 No.39, chưa có trả lời; trường bắt buộc để AI chạy còn No.54. Không hỏi lại màn nhập có tồn tại không.

**Nguồn:** `M19:11,26;BF19:18`. **Bằng chứng:** `EV-0596;EV-0611;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0006.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0007"></a>
## FLOW-0007 — Đăng ký, sửa mục tiêu follower và theo dõi

Mục tiêu ban đầu 10000 mỗi SNS; Manager đổi theo Talent. Follower hiện tại có thể giảm; tổng bài là lũy kế; bài cũ xem được. Chỉ số thực tế giới hạn theo dịch vụ.

**Còn thiếu/phần không tự suy:** Streak/reset hẹn quyết khi vận hành; không tự lấy số trong hình làm giá trị khách duyệt.

**Nguồn:** `T19:11,23;M19:11,15;BF19:13`. **Bằng chứng:** `EV-0563;EV-0575;EV-0596;EV-0600;EV-0625`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0007.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0008"></a>
## FLOW-0008 — Quản lý category và phân loại Talent

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Nhiều category và phân công Manager. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


Chỉ thị toàn bộ/category/Talent, ưu tiên Talent > category > toàn bộ; mọi trường hợp vẫn kiểm từ cấm. Có thử trên Talent, lưu, lịch sử và quay một phiên bản; sửa qua quản trị hoặc ChatGPT.

**Còn thiếu/phần không tự suy:** Nhiều category xung đột và hiệu lực thay chỉ thị với bài đã tạo vẫn cần phương án đội.

**Nguồn:** `M19:19,20,27;BF19:18`. **Bằng chứng:** `EV-0604;EV-0605;EV-0612;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0008.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0009"></a>
## FLOW-0009 — Chỉ thị AI: soạn, thử, lưu và quay bản

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Chống giống nhau và phân tích chéo Talent; Nhiều category và phân công Manager. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Danh sách thử thách cũ là mẫu; AI tạo dựa trên thông tin/mục tiêu từng Talent. Manager có thể thêm thử thách qua chỉ thị AI. **Giới hạn:** Không mặc định chỉ chọn từ catalog cố định; màn riêng, độ khó/đạt/chấm điểm chưa được duyệt từ đây. **Nguồn:** `KS 確認事項!K27;20261120!F30:F31`; EV-0980.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Chỉ thị toàn bộ/category/Talent, ưu tiên Talent > category > toàn bộ; mọi trường hợp vẫn kiểm từ cấm. Có thử trên Talent, lưu, lịch sử và quay một phiên bản; sửa qua quản trị hoặc ChatGPT.

**Còn thiếu/phần không tự suy:** Nhiều category xung đột và hiệu lực thay chỉ thị với bài đã tạo vẫn cần phương án đội.

**Nguồn:** `M19:19,20,27;BF19:18`. **Bằng chứng:** `EV-0604;EV-0605;EV-0612;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0009.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0010"></a>
## FLOW-0010 — Chu kỳ AI chủ động: đọc dữ liệu, nhắn và nhắc

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** PWA: kiểm tra thông báo và phương án thay thế; Rải giờ và tối ưu theo chu kỳ 30 ngày; Chống giống nhau và phân tích chéo Talent; Nhắc tương tác sau đăng. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Thêm trạng thái 一時停止 bên cạnh trước dùng/đang dùng/kết thúc. Tạm dừng vẫn tiếp tục tính phí; dừng các chức năng như lời nhắn AI, mở lại thì khôi phục. **Giới hạn:** Chưa có ma trận quyền AI/video/đăng nhập, xử lý lịch đang có và ai được khôi phục. Tạm dừng khác kết thúc sử dụng và dừng riêng việc đăng. **Nguồn:** `KS 確認事項!K116;20261120!F5;20261120!F32`; EV-0964.

Ngày có đăng tự động được tính là ngày đã đăng; trong thời gian vẫn có bài tự động thì không nhắc hoặc báo lâu không đăng. **Giới hạn:** Không suy cả kỳ tự động đều được miễn nhắc khi thực tế không đăng; ngưỡng3/7 vẫn chưa được nguồn trả lời riêng. **Nguồn:** `KS 20261120!F21`; EV-0976.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Mỗi sáng báo kết quả hôm trước, follower tăng,3 chủ đề và thử thách; nhắc tư liệu trong ngày; kết quả sau đăng; tổng kết tuần. Giờ chung chỉnh tại M-17.

**Còn thiếu/phần không tự suy:** Không chốt giờ 8/12/19 từ hình minh họa; giờ vận hành là cấu hình, số liệu SNS có thể chậm.

**Nguồn:** `T19:12,13,16,27;M19:22`. **Bằng chứng:** `EV-0564;EV-0565;EV-0568;EV-0579;EV-0607`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0010.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0011"></a>
## FLOW-0011 — Hội thoại AI và chuyển thông tin nghiêm trọng

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Ứng xử tối thiểu với tâm sự nghiêm trọng; Thông báo: mở là xử lý và hình cảnh báo cũ. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Không làm chức năng báo Manager khi có tâm sự nghiêm trọng. Hội thoại phục vụ tăng follower, tập trung hoạt động nghệ thuật/công việc và cảm quan; không tư vấn tình yêu. Ban đầu chưa đặt ranh giới quá chi tiết. **Giới hạn:** No.93 còn Open, không tự chọn trọn phương ánB vì nguồn chỉ loại thông báo, chưa quy định đầy đủ cách tiếp nhận/chuyển hướng. Không suy số lượt chat không giới hạn từ đây. **Nguồn:** `KS 20261120!F22;確認事項!K56;20261120!F28:F29`; EV-0977.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Phạm vi hội thoại ngoài đăng bài, sức khỏe/rời công ty và thông báo tâm sự nghiêm trọng vẫn được hỏi tại KS 20261120 No.21,27,28.

**Còn thiếu/phần không tự suy:** Không dùng sự xuất hiện loại thông báo trong hình để tự chốt được tư vấn mọi chủ đề hoặc số lượt hội thoại.

**Nguồn:** `BF19:14,18;M19:6,27;T19:16`. **Bằng chứng:** `EV-0626;EV-0630;EV-0591;EV-0612;EV-0568`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0011.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0012"></a>
## FLOW-0012 — Đề xuất, nhận, thực hiện và ghi nhận thử thách

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Nhắc tương tác sau đăng; Tăng trưởng, dashboard và KPI kinh doanh; Màn Manager xếp hạng cố gắng. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Danh sách thử thách cũ là mẫu; AI tạo dựa trên thông tin/mục tiêu từng Talent. Manager có thể thêm thử thách qua chỉ thị AI. **Giới hạn:** Không mặc định chỉ chọn từ catalog cố định; màn riêng, độ khó/đạt/chấm điểm chưa được duyệt từ đây. **Nguồn:** `KS 確認事項!K27;20261120!F30:F31`; EV-0980.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Chỉ thị toàn bộ/category/Talent, ưu tiên Talent > category > toàn bộ; mọi trường hợp vẫn kiểm từ cấm. Có thử trên Talent, lưu, lịch sử và quay một phiên bản; sửa qua quản trị hoặc ChatGPT.

**Còn thiếu/phần không tự suy:** Nhiều category xung đột và hiệu lực thay chỉ thị với bài đã tạo vẫn cần phương án đội.

**Nguồn:** `M19:19,20,27;BF19:18`. **Bằng chứng:** `EV-0604;EV-0605;EV-0612;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0012.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0013"></a>
## FLOW-0013 — Chọn chủ đề, sửa và chấp nhận bài ở chế độ cần kiểm tra

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** TikTok: tách gửi nháp và đăng công khai; Đồng ý và quyền riêng tư theo từng SNS; Chống giống nhau và phân tích chéo Talent; PR và nhãn AI theo nền tảng; Xác nhận lại bài AI sửa từ cấm. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Bài ảnh đăng Instagram/TikTok, không gửi YouTube; video Talent tạo có thể đăng YouTube. **Giới hạn:** Đây là hành vi nêu trong nguồn, không phải xác minh năng lực API của nhà cung cấp. **Nguồn:** `KS 20261120!F2`; EV-0962.

Talent gửi ảnh/video trước; AI đọc tư liệu rồi tạo văn bản và hashtag. Có ảnh hợp chủ đề thì dùng, nếu không thì dùng tư liệu đang có. **Giới hạn:** Không dùng luồng cũ tạo chữ trước như mặc định cho cùng nhánh. **Nguồn:** `KS 確認事項!K60;20261120!F8`; EV-0966.

Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. **Giới hạn:** Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. **Nguồn:** `KS 確認事項!K62;20261120!F9`; EV-0967.

Chỉ bài liên quan công việc cần Manager duyệt. Với tự động, không thêm bước duyệt để phòng dùng nhầm ảnh công việc. **Giới hạn:** Giữ hai phạm vi riêng; không suy mọi bài công việc được tự động bỏ duyệt. No.71/84 cần phản ánh ngoại lệ đã ghi; nhận diện bài công việc và chuyển nhánh chưa đủ chi tiết. **Nguồn:** `KS 確認事項!K74;20261120!F10;20261120!F15`; EV-0968.

Nguồn tiếp tục nêu có đăng trước xác nhận và đăng không cần xác nhận từng bài. **Giới hạn:** Câu về quy định SNS là lời ghi trong nguồn, chưa phải kiểm chứng điều khoản nền tảng. **Nguồn:** `KS 20261120!F14`; EV-0972.

Không giới hạn số lượt nhờ AI viết lại; nguồn ghi rõ đổi quyết định2lần ngày17/11. **Giới hạn:** Khớp DEC-0001 đã có; không cấp quyết định trùng, không dùng số2cũ ở PDF/QA để chặn. **Nguồn:** `KS 確認事項!K65`; EV-0984.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Chấp nhận yêu cầu có ảnh/video; xin duyệt chỉ hiện cho Talent bật tính năng. Đang chờ Manager duyệt thì không sửa; trả lại có lý do thì sửa rồi xin duyệt lại.

**Còn thiếu/phần không tự suy:** Thiếu tư liệu trong chế độ kiểm tra còn KS No.8; bài đến muộn còn No.56; không chốt mọi giao điểm duyệt/từ cấm cho tự động.

**Nguồn:** `T19:17,18,22,30;BF19:7,8`. **Bằng chứng:** `EV-0569;EV-0570;EV-0574;EV-0582;EV-0619;EV-0620`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0013.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0014"></a>
## FLOW-0014 — Gửi, lưu và dùng lại ảnh/video

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Ảnh chân dung và liên kết profile Adesso. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Talent gửi ảnh/video trước; AI đọc tư liệu rồi tạo văn bản và hashtag. Có ảnh hợp chủ đề thì dùng, nếu không thì dùng tư liệu đang có. **Giới hạn:** Không dùng luồng cũ tạo chữ trước như mặc định cho cùng nhánh. **Nguồn:** `KS 確認事項!K60;20261120!F8`; EV-0966.

Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. **Giới hạn:** Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. **Nguồn:** `KS 確認事項!K62;20261120!F9`; EV-0967.

Tự động không sinh ảnh/video AI; dùng video trả phí đã tạo hoặc video tự làm đã lưu. Chọn ảnh/video hợp chủ đề thay vì thứ tự lưu. **Giới hạn:** Không mặc định một bài/ngày hoặc dùng FIFO; tần suất tại KS No.40 còn trống. **Nguồn:** `KS 確認事項!K73;20261120!F18:F19`; EV-0974.

Talent xem bản nháp AI tạo từ tư liệu Manager gửi trong màn AI coach, có thể dùng để đăng Instagram/TikTok; không xem danh sách tư liệu Manager lưu. **Giới hạn:** Không suy thành thư viện media chung được Talent truy cập hoặc phủ nhận video YouTube ở nhánh khác. **Nguồn:** `KS 20261120!F20`; EV-0975.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Dùng lại ảnh/video đã gửi; OneDrive vẫn là kho hồ sơ/chỉ thị. GJ19§14 cho phép cân nhắc kho ảnh/video khác nếu không thêm chi phí.

**Còn thiếu/phần không tự suy:** Không tự chuyển kho lưu. Video tự làm lần lượt 1 bài/ngày vẫn KS 20261120 No.18/QA No.37; tư liệu Manager dùng trong kỳ và quyền xem còn No.19.

**Nguồn:** `T19:19;BF19:11,18;GJ19:14`. **Bằng chứng:** `EV-0571;EV-0623;EV-0630;EV-0647`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0014.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0015"></a>
## FLOW-0015 — Tạo video AI và quyết định dùng kết quả

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Âm nhạc và hoàn tất trong ứng dụng SNS; PR và nhãn AI theo nền tảng. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Câu hỏi/đề xuất chỉnh còn video ngắn, bỏ mô tả chọn slideshow và ước tính chi phí slideshow. **Giới hạn:** Đây là cột đề xuấtF, chưa có quyết địnhK cho việc xóa slideshow. Giữ khác biệt với QA No.36/CR-04; không ghi giảm phạm vi đã chốt. **Nguồn:** `KS 確認事項!F72;確認事項!F86`; EV-0986.

**Mô tả trước cập nhật (giữ để đối chiếu):**

T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước.

**Còn thiếu/phần không tự suy:** CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi.

**Nguồn:** `T19:20;BF19:12`. **Bằng chứng:** `EV-0572;EV-0624`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0015.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0016"></a>
## FLOW-0016 — Quản lý từ cấm, phát hiện và xử lý bài bị chặn

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Manager sửa và xác nhận TikTok; Xác nhận lại bài AI sửa từ cấm. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Phát hiện từ cấm thì AI viết lại và đặt lịch; không theo luồng Manager tự sửa. **Giới hạn:** Thay vai trò sửa ở GJ19§12/QA No.40/90/CR-06. Chưa chốt số lượt tự sửa, trường hợp không sạch, duyệt công việc và quá giờ. No.96 chỉ hỏi hiệu lực danh sách đổi sau kiểm, không tự cho quét lại hàng loạt. **Nguồn:** `KS 確認事項!K59`; EV-0983.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12.

**Còn thiếu/phần không tự suy:** Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57.

**Nguồn:** `M19:16,23;BF19:17;GJ19:12`. **Bằng chứng:** `EV-0601;EV-0608;EV-0629;EV-0645`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0016.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0017"></a>
## FLOW-0017 — Yêu cầu duyệt, trả lại và quá hạn duyệt

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Manager sửa và xác nhận TikTok; Xác nhận lại bài AI sửa từ cấm; Manager responsive và phạm vi tablet; Nhiều category và phân công Manager. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Chỉ bài liên quan công việc cần Manager duyệt. Với tự động, không thêm bước duyệt để phòng dùng nhầm ảnh công việc. **Giới hạn:** Giữ hai phạm vi riêng; không suy mọi bài công việc được tự động bỏ duyệt. No.71/84 cần phản ánh ngoại lệ đã ghi; nhận diện bài công việc và chuyển nhánh chưa đủ chi tiết. **Nguồn:** `KS 確認事項!K74;20261120!F10;20261120!F15`; EV-0968.

Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. **Nguồn:** `KS 確認事項!K77;確認事項!K93;20261120!F11`; EV-0969.

Phát hiện từ cấm thì AI viết lại và đặt lịch; không theo luồng Manager tự sửa. **Giới hạn:** Thay vai trò sửa ở GJ19§12/QA No.40/90/CR-06. Chưa chốt số lượt tự sửa, trường hợp không sạch, duyệt công việc và quá giờ. No.96 chỉ hỏi hiệu lực danh sách đổi sau kiểm, không tự cho quét lại hàng loạt. **Nguồn:** `KS 確認事項!K59`; EV-0983.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Duyệt bài công việc khi Talent xin duyệt; trả lại phải có lý do; chờ duyệt không sửa theoGJ19§13. Quá giờ chưa duyệt thì không đăng/hủy và báo cả hai bên.

**Còn thiếu/phần không tự suy:** Bật tính năng có áp mọi bài không, đích category/cá nhân và phê duyệt trên đường tự động vẫn KS 20261120 No.9,10,14.

**Nguồn:** `T19:18,22,30;M19:8,9;BF19:8`. **Bằng chứng:** `EV-0570;EV-0574;EV-0582;EV-0593;EV-0594;EV-0620`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0017.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0018"></a>
## FLOW-0018 — Thiết lập và chạy đăng tự động theo kỳ

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** TikTok: tách gửi nháp và đăng công khai; Rải giờ và tối ưu theo chu kỳ 30 ngày; Chống giống nhau và phân tích chéo Talent; Xác nhận lại bài AI sửa từ cấm. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Bài ảnh đăng Instagram/TikTok, không gửi YouTube; video Talent tạo có thể đăng YouTube. **Giới hạn:** Đây là hành vi nêu trong nguồn, không phải xác minh năng lực API của nhà cung cấp. **Nguồn:** `KS 20261120!F2`; EV-0962.

Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. **Giới hạn:** Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. **Nguồn:** `KS 確認事項!K62;20261120!F9`; EV-0967.

Chỉ bài liên quan công việc cần Manager duyệt. Với tự động, không thêm bước duyệt để phòng dùng nhầm ảnh công việc. **Giới hạn:** Giữ hai phạm vi riêng; không suy mọi bài công việc được tự động bỏ duyệt. No.71/84 cần phản ánh ngoại lệ đã ghi; nhận diện bài công việc và chuyển nhánh chưa đủ chi tiết. **Nguồn:** `KS 確認事項!K74;20261120!F10;20261120!F15`; EV-0968.

Nguồn tiếp tục nêu có đăng trước xác nhận và đăng không cần xác nhận từng bài. **Giới hạn:** Câu về quy định SNS là lời ghi trong nguồn, chưa phải kiểm chứng điều khoản nền tảng. **Nguồn:** `KS 20261120!F14`; EV-0972.

Talent chọn chủ đề qua hội thoại AI, được đổi giữa kỳ; chỉ định ngày bắt đầu/kết thúc, có thể bắt đầu trong tương lai; hết kỳ AI báo Talent. **Giới hạn:** Chưa chốt bài đã tạo/đặt lịch khi đổi chủ đề hoặc đổi chế độ; giữ QA No.70/83, không tạo câu hỏi thay thế. **Nguồn:** `KS 20261120!F16:F17`; EV-0973.

Tự động không sinh ảnh/video AI; dùng video trả phí đã tạo hoặc video tự làm đã lưu. Chọn ảnh/video hợp chủ đề thay vì thứ tự lưu. **Giới hạn:** Không mặc định một bài/ngày hoặc dùng FIFO; tần suất tại KS No.40 còn trống. **Nguồn:** `KS 確認事項!K73;20261120!F18:F19`; EV-0974.

Talent xem bản nháp AI tạo từ tư liệu Manager gửi trong màn AI coach, có thể dùng để đăng Instagram/TikTok; không xem danh sách tư liệu Manager lưu. **Giới hạn:** Không suy thành thư viện media chung được Talent truy cập hoặc phủ nhận video YouTube ở nhánh khác. **Nguồn:** `KS 20261120!F20`; EV-0975.

Ngày có đăng tự động được tính là ngày đã đăng; trong thời gian vẫn có bài tự động thì không nhắc hoặc báo lâu không đăng. **Giới hạn:** Không suy cả kỳ tự động đều được miễn nhắc khi thực tế không đăng; ngưỡng3/7 vẫn chưa được nguồn trả lời riêng. **Nguồn:** `KS 20261120!F21`; EV-0976.

Phát hiện từ cấm thì AI viết lại và đặt lịch; không theo luồng Manager tự sửa. **Giới hạn:** Thay vai trò sửa ở GJ19§12/QA No.40/90/CR-06. Chưa chốt số lượt tự sửa, trường hợp không sạch, duyệt công việc và quá giờ. No.96 chỉ hỏi hiệu lực danh sách đổi sau kiểm, không tự cho quét lại hàng loạt. **Nguồn:** `KS 確認事項!K59`; EV-0983.

**Mô tả trước cập nhật (giữ để đối chiếu):**

AI tạo chữ/hashtag, dùng ảnh/video Talent gửi; không tự biến ảnh thành slideshow trong luồng bài thường. Bài ảnh không đăng YouTube.

**Còn thiếu/phần không tự suy:** Thứ tự ảnh→chữ hay chữ→ảnh còn KS 20261120 No.7; hiển thị kịch bản/video-idea còn No.35,36, không coi giá hiển thị là đã tạo video.

**Nguồn:** `T19:12,13,17,18,27,30;BF19:6,7`. **Bằng chứng:** `EV-0564;EV-0565;EV-0569;EV-0570;EV-0579;EV-0582;EV-0618;EV-0619`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0018.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0019"></a>
## FLOW-0019 — Đặt lịch, đăng SNS và thao tác đăng lại khi lỗi

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** TikTok: tách gửi nháp và đăng công khai; Đồng ý và quyền riêng tư theo từng SNS; Manager sửa và xác nhận TikTok; Audit TikTok và quota YouTube; Âm nhạc và hoàn tất trong ứng dụng SNS; Rải giờ và tối ưu theo chu kỳ 30 ngày; PR và nhãn AI theo nền tảng; Hàng đợi, chống trùng và ghi thao tác. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Bài ảnh đăng Instagram/TikTok, không gửi YouTube; video Talent tạo có thể đăng YouTube. **Giới hạn:** Đây là hành vi nêu trong nguồn, không phải xác minh năng lực API của nhà cung cấp. **Nguồn:** `KS 20261120!F2`; EV-0962.

Talent được hủy bài mình đã đặt lịch; Manager cũng kiểm tra và hủy trên quản trị; phải hủy lịch tương ứng ở dịch vụ đăng. **Giới hạn:** Thay quy tắc cũ chỉ Manager hủy. Thời điểm không thể hủy, bài đang gửi và thông báo/tái dùng còn No.61 và thiết kế đội. **Nguồn:** `KS 確認事項!K84;20261120!F12`; EV-0970.

Lỗi lúc tới giờ đăng thì thông báo Talent; Talent đợi rồi đăng lại. Lỗi SNS hoặc mạng của Talent không cần thông báo Adesso. **Giới hạn:** Không đồng nhất Adesso với mọi tài khoản Manager nếu chưa rõ. Không tự đặt thời gian chờ, số lần thử hoặc đích SNS; No.59 còn mở. Quyền Manager đăng lại trong bản19/11 chưa bị xóa bằng suy luận. **Nguồn:** `KS 確認事項!K87;20261120!F13`; EV-0971.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Manager thao tác đăng lại tại M-08; nguồn mới mô tả đăng lại ngay, không có màn chọn giờ. Không tự động thử lại khi lỗi.

**Còn thiếu/phần không tự suy:** BF19 trang 9 vẫn có nhánh Talent đăng lại dưới nhãn đề xuất, trong khi màn T17 không có nút; ghi khác biệt tác nhân. Đích SNS lỗi vẫn No.59; bỏ giả định hẹn sau 15 phút.

**Nguồn:** `M19:12;BF19:9;GJ19:17`. **Bằng chứng:** `EV-0597;EV-0621;EV-0650`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0019.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0020"></a>
## FLOW-0020 — Dừng, hủy và mở lại đăng tự động

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Dừng hệ thống và lịch bên dịch vụ. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Thêm trạng thái 一時停止 bên cạnh trước dùng/đang dùng/kết thúc. Tạm dừng vẫn tiếp tục tính phí; dừng các chức năng như lời nhắn AI, mở lại thì khôi phục. **Giới hạn:** Chưa có ma trận quyền AI/video/đăng nhập, xử lý lịch đang có và ai được khôi phục. Tạm dừng khác kết thúc sử dụng và dừng riêng việc đăng. **Nguồn:** `KS 確認事項!K116;20261120!F5;20261120!F32`; EV-0964.

Talent được hủy bài mình đã đặt lịch; Manager cũng kiểm tra và hủy trên quản trị; phải hủy lịch tương ứng ở dịch vụ đăng. **Giới hạn:** Thay quy tắc cũ chỉ Manager hủy. Thời điểm không thể hủy, bài đang gửi và thông báo/tái dùng còn No.61 và thiết kế đội. **Nguồn:** `KS 確認事項!K84;20261120!F12`; EV-0970.

Talent chọn chủ đề qua hội thoại AI, được đổi giữa kỳ; chỉ định ngày bắt đầu/kết thúc, có thể bắt đầu trong tương lai; hết kỳ AI báo Talent. **Giới hạn:** Chưa chốt bài đã tạo/đặt lịch khi đổi chủ đề hoặc đổi chế độ; giữ QA No.70/83, không tạo câu hỏi thay thế. **Nguồn:** `KS 20261120!F16:F17`; EV-0973.

Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. **Giới hạn:** Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. **Nguồn:** `KS 確認事項!K85;20261120!F33`; EV-0981.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Dừng riêng hoặc toàn bộ ngăn lịch mới và hủy lịch đã có; chạy lại không phục hồi bài đã hủy; tự làm video cũng dừng theo BF19 trang 19.

**Còn thiếu/phần không tự suy:** Phần này có mô tả rõ nhưng KS 20261120 No.32 vẫn chưa trả lời; tiếp tục theo dõi tại đó, không tạo câu hỏi trùng. Bài mới trong lúc dừng còn No.60.

**Nguồn:** `M19:15,21;BF19:19;KS:20261120:32`. **Bằng chứng:** `EV-0600;EV-0606;EV-0631`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0020.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0021"></a>
## FLOW-0021 — Lấy số liệu, hiển thị và phản hồi cho chu kỳ sau

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Rải giờ và tối ưu theo chu kỳ 30 ngày; Nhắc tương tác sau đăng; Tăng trưởng, dashboard và KPI kinh doanh; Màn Manager xếp hạng cố gắng. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Ngày có đăng tự động được tính là ngày đã đăng; trong thời gian vẫn có bài tự động thì không nhắc hoặc báo lâu không đăng. **Giới hạn:** Không suy cả kỳ tự động đều được miễn nhắc khi thực tế không đăng; ngưỡng3/7 vẫn chưa được nguồn trả lời riêng. **Nguồn:** `KS 20261120!F21`; EV-0976.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Lấy số liệu/follower 1 lần ngày trong phạm vi dịch vụ; ghi kết quả vào file Talent, sáng hôm sau AI dùng.

**Còn thiếu/phần không tự suy:** Phải kiểm tài khoản provider thật; lịch chạy số liệu/khung giờ là thiết kế, không tự xác nhận khả năng từ tài liệu nguồn.

**Nguồn:** `T19:23,27;M19:12;BF19:9,13`. **Bằng chứng:** `EV-0575;EV-0579;EV-0597;EV-0621;EV-0625`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0021.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0022"></a>
## FLOW-0022 — Manager xem tình hình, xử lý thông báo và tra nhật ký

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** PWA: kiểm tra thông báo và phương án thay thế; Nhắc tương tác sau đăng; Ứng xử tối thiểu với tâm sự nghiêm trọng; Tăng trưởng, dashboard và KPI kinh doanh; Manager responsive và phạm vi tablet; Thông báo: mở là xử lý và hình cảnh báo cũ; Màn Manager xếp hạng cố gắng; Mã màn và số lượng thực tế. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. **Nguồn:** `KS 確認事項!K77;確認事項!K93;20261120!F11`; EV-0969.

Lỗi lúc tới giờ đăng thì thông báo Talent; Talent đợi rồi đăng lại. Lỗi SNS hoặc mạng của Talent không cần thông báo Adesso. **Giới hạn:** Không đồng nhất Adesso với mọi tài khoản Manager nếu chưa rõ. Không tự đặt thời gian chờ, số lần thử hoặc đích SNS; No.59 còn mở. Quyền Manager đăng lại trong bản19/11 chưa bị xóa bằng suy luận. **Nguồn:** `KS 確認事項!K87;20261120!F13`; EV-0971.

Không làm chức năng báo Manager khi có tâm sự nghiêm trọng. Hội thoại phục vụ tăng follower, tập trung hoạt động nghệ thuật/công việc và cảm quan; không tư vấn tình yêu. Ban đầu chưa đặt ranh giới quá chi tiết. **Giới hạn:** No.93 còn Open, không tự chọn trọn phương ánB vì nguồn chỉ loại thông báo, chưa quy định đầy đủ cách tiếp nhận/chuyển hướng. Không suy số lượt chat không giới hạn từ đây. **Nguồn:** `KS 20261120!F22;確認事項!K56;20261120!F28:F29`; EV-0977.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người.

**Còn thiếu/phần không tự suy:** Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager.

**Nguồn:** `M19:6,8;BF19:14;GJ19:6,7`. **Bằng chứng:** `EV-0591;EV-0593;EV-0626;EV-0639;EV-0640`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0022.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0023"></a>
## FLOW-0023 — Tổng hợp phí, thu theo kỳ và xử lý chưa thu được

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Đồng ý phụ huynh và trần phí theo tuổi; Trần phí và nhận định đã giải quyết thanh toán. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Thêm trạng thái 一時停止 bên cạnh trước dùng/đang dùng/kết thúc. Tạm dừng vẫn tiếp tục tính phí; dừng các chức năng như lời nhắn AI, mở lại thì khôi phục. **Giới hạn:** Chưa có ma trận quyền AI/video/đăng nhập, xử lý lịch đang có và ai được khôi phục. Tạm dừng khác kết thúc sử dụng và dừng riêng việc đăng. **Nguồn:** `KS 確認事項!K116;20261120!F5;20261120!F32`; EV-0964.

Phí tháng theo hướng trả trước; nguồn ghi đang xem xét dừng sử dụng nếu1tháng chưa thanh toán. **Giới hạn:** “検討します” chưa chốt tự khóa sau1tháng. Chu kỳ cụ thể, khả năng cổng và No.46/49/86 còn mở; không tự xây retry hay thu sau. **Nguồn:** `KS 確認事項!K104;20261120!F24`; EV-0978.

Có thanh toán nhà mạng; GMO là ứng viên, cần quyết sớm. Nhà mạng không hỗ trợ thì dùng thẻ hoặc PayPay theo nguồn. Đội tổng hợp câu hỏi cổng về trả trước, phí biến đổi, giữa kỳ và chưa thanh toán, đổi phương thức/lịch sử. **Giới hạn:** GMO chưa được chọn/ký; không suy PayPay đã được duyệt toàn bộ hoặc tích hợp đã hoạt động. **Nguồn:** `KS 確認事項!K100;確認事項!K105;20261120!F25:F27`; EV-0979.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

**Còn thiếu/phần không tự suy:** Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

**Nguồn:** `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`. **Bằng chứng:** `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0023.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0024"></a>
## FLOW-0024 — Tạo tài khoản công ty và đăng bài cho office

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Manager sửa và xác nhận TikTok. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Nguồn quyết định20/11 ghi không tính tiền tạo video của tài khoản văn phòng. **Giới hạn:** Không thu tiền tài khoản office không đồng nghĩa chi phí provider bằng0. Đối chiếu QA No.48 cũ về quyết toán nội bộ; chưa tự xóa thống kê lượt. **Nguồn:** `KS 確認事項!K112`; EV-0985.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Office nhập tên/email ở M-12; tạo folder ngay; Manager login app Talent bằng office, tự nối SNS; không thanh toán/không phí tháng/không duyệt; phí video nội bộ. Unit là office, hiện cùng Talent list.

**Còn thiếu/phần không tự suy:** Vòng đời kết thúc/xóa office cần No.66; không suy ngoại lệ streak/nhắc ngày không đăng từ việc miễn phí.

**Nguồn:** `T19:5,9,25,30;M19:10,17;BF19:20`. **Bằng chứng:** `EV-0557;EV-0561;EV-0577;EV-0582;EV-0595;EV-0602;EV-0632`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0024.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0025"></a>
## FLOW-0025 — Đăng nhập, thêm/vô hiệu hóa và khôi phục Manager

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Nhiều category và phân công Manager. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. **Nguồn:** `KS 確認事項!K77;確認事項!K93;20261120!F11`; EV-0969.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Manager dùng ứng dụng mã 6 số như Google Authenticator; đăng ký QR lần đầu. Thêm tên/email; vô hiệu hóa chặn đăng nhập và ngừng nhận thông báo.

**Còn thiếu/phần không tự suy:** Khôi phục mất phương tiện 2FA và bảo vệ Manager cuối vẫn là No.67; không tự duyệt quy trình khôi phục.

**Nguồn:** `M19:5,24`. **Bằng chứng:** `EV-0590;EV-0609`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0025.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0026"></a>
## FLOW-0026 — Talent ngừng dùng, giữ/xóa dữ liệu và đăng ký lại

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Đồng ý phụ huynh và trần phí theo tuổi. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Thêm trạng thái 一時停止 bên cạnh trước dùng/đang dùng/kết thúc. Tạm dừng vẫn tiếp tục tính phí; dừng các chức năng như lời nhắn AI, mở lại thì khôi phục. **Giới hạn:** Chưa có ma trận quyền AI/video/đăng nhập, xử lý lịch đang có và ai được khôi phục. Tạm dừng khác kết thúc sử dụng và dừng riêng việc đăng. **Nguồn:** `KS 確認事項!K116;20261120!F5;20261120!F32`; EV-0964.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Ba trạng thái nguồn mô tả: chưa dùng/đang dùng/đã kết thúc. Kết thúc dừng lời nhắn/thu phí/hủy lịch/chặn login; không trở lại đang dùng; giữ 6 tháng rồi xóa. Thanh toán đăng ký xong tự chuyển có thể dùng theo T19 trang 8–9.

**Còn thiếu/phần không tự suy:** Tạm dừng vì nợ và ảnh hưởng thu phí chưa được trả lời; không đồng nhất dừng đăng với kết thúc sử dụng.

**Nguồn:** `M19:14,15;BF19:3,16`. **Bằng chứng:** `EV-0599;EV-0600;EV-0615;EV-0628`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0026.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0027"></a>
## FLOW-0027 — Theo dõi lượt video và chi phí AI

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Audit TikTok và quota YouTube; Trần phí và nhận định đã giải quyết thanh toán. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Nguồn quyết định20/11 ghi không tính tiền tạo video của tài khoản văn phòng. **Giới hạn:** Không thu tiền tài khoản office không đồng nghĩa chi phí provider bằng0. Đối chiếu QA No.48 cũ về quyết toán nội bộ; chưa tự xóa thống kê lượt. **Nguồn:** `KS 確認事項!K112`; EV-0985.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

**Còn thiếu/phần không tự suy:** Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

**Nguồn:** `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`. **Bằng chứng:** `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0027.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0028"></a>
## FLOW-0028 — Vận hành và xử lý gián đoạn dịch vụ ngoài

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Hàng đợi, chống trùng và ghi thao tác; Dừng hệ thống và lịch bên dịch vụ. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. **Giới hạn:** Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. **Nguồn:** `KS 確認事項!K85;20261120!F33`; EV-0981.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Lỗi video hiển thị câu dễ hiểu cố định, không mã lỗi provider; mọi ngoại lệ và vận hành lỗi cần đội rà thành yêu cầu phi chức năng.

**Còn thiếu/phần không tự suy:** Timeout/retry/kết quả muộn và đối soát chưa được nguồn chốt; không phát triển nội dung khách suy diễn.

**Nguồn:** `GJ19:18;T19:21;BF19:9`. **Bằng chứng:** `EV-0651;EV-0573;EV-0621`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0028.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0029"></a>
## FLOW-0029 — Chuẩn bị dữ liệu, tài khoản ngoài và điều kiện vận hành

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Điều kiện phát triển và mục tiêu Momo; Audit TikTok và quota YouTube; Đồng ý phụ huynh và trần phí theo tuổi; Trần phí và nhận định đã giải quyết thanh toán; Pilot 10–20 người, mở 200 và hội thoại giọng nói. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Có thanh toán nhà mạng; GMO là ứng viên, cần quyết sớm. Nhà mạng không hỗ trợ thì dùng thẻ hoặc PayPay theo nguồn. Đội tổng hợp câu hỏi cổng về trả trước, phí biến đổi, giữa kỳ và chưa thanh toán, đổi phương thức/lịch sử. **Giới hạn:** GMO chưa được chọn/ký; không suy PayPay đã được duyệt toàn bộ hoặc tích hợp đã hoạt động. **Nguồn:** `KS 確認事項!K100;確認事項!K105;20261120!F25:F27`; EV-0979.

Adesso cung cấp tài liệu hướng dẫn đăng ký/biểu thị giao dịch và câu chữ email tự động; đội chuẩn bị bảng điền theo tình huống. Nếu có đổi nhân vật thì Adesso cung cấp tranh. **Giới hạn:** Câu điều kiện về nhân vật không tự xác nhận cho đổi tên hoặc làm chức năng mới; KS No.34 còn thiếu một phần. **Nguồn:** `KS 20261120!F6;20261120!F35;20261120!F39`; EV-0982.

Sheet mới nêu3việc: chốt cổng/đăng ký xét duyệt; đội trình so sánh dịch vụ dự kiến24/11 rồi Adesso ký sau đồng ý; chốt người/SNS/số bài và tài khoản thử cho UAT. **Giới hạn:** Cột trả lời E2:E4 trống. Dự kiến họp24/11 và mục tiêu cuối2/2027 không là lịch được duyệt mới. Sheet chi phí/quy mô cũ đã bỏ không có nghĩa quy mô/trầnAI đã được quyết. **Nguồn:** `KS プロジェクトを進めるために決める事項!A2:E4`; EV-0987.

**Mô tả trước cập nhật (giữ để đối chiếu):**

Lỗi video hiển thị câu dễ hiểu cố định, không mã lỗi provider; mọi ngoại lệ và vận hành lỗi cần đội rà thành yêu cầu phi chức năng.

**Còn thiếu/phần không tự suy:** Timeout/retry/kết quả muộn và đối soát chưa được nguồn chốt; không phát triển nội dung khách suy diễn.

**Nguồn:** `GJ19:18;T19:21;BF19:9`. **Bằng chứng:** `EV-0651;EV-0573;EV-0621`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0029.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0030"></a>
## FLOW-0030 — Chốt phạm vi thử, nghiệm thu, phát hành và thay đổi

**Đợt23112026 — yêu cầu/đề nghị chưa chốt thay thế:** Điều kiện phát triển và mục tiêu Momo; Tăng trưởng, dashboard và KPI kinh doanh; Pilot 10–20 người, mở 200 và hội thoại giọng nói; Manager responsive và phạm vi tablet; Màn Manager xếp hạng cố gắng; Mã màn và số lượng thực tế. Xem [nguồn, giới hạn và phân tuyến](DELIVERY_23112026_REVIEW.md). Không dùng đề nghị này làm expected result đã được khách phê duyệt.


**Cập nhật nguồn tiếp nhận23/11/2026 — phần dưới đây ưu tiên hơn mô tả20/11 cho cùng chủ đề:**

Sheet mới nêu3việc: chốt cổng/đăng ký xét duyệt; đội trình so sánh dịch vụ dự kiến24/11 rồi Adesso ký sau đồng ý; chốt người/SNS/số bài và tài khoản thử cho UAT. **Giới hạn:** Cột trả lời E2:E4 trống. Dự kiến họp24/11 và mục tiêu cuối2/2027 không là lịch được duyệt mới. Sheet chi phí/quy mô cũ đã bỏ không có nghĩa quy mô/trầnAI đã được quyết. **Nguồn:** `KS プロジェクトを進めるために決める事項!A2:E4`; EV-0987.

**Mô tả trước cập nhật (giữ để đối chiếu):**

T19 có 19 màn, M19 có 21 màn; đăng nhập xong mở Mypage; thanh điều hướng 5 mục Home/AI/tư liệu/lịch/Mypage; chuông ở Home/Mypage. Số/chữ/tên trong hình là minh họa.

**Còn thiếu/phần không tự suy:** Mục lục các PDF và KS có số trang cũ; trích trang PDF thực tế, không dùng số màn AG/18 thay cho 19.

**Nguồn:** `T19:1,32,33;M19:1,4`. **Bằng chứng:** `EV-0553;EV-0584;EV-0585;EV-0586;EV-0589`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0030.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

# Luồng nghiệp vụ hiện hành — đối chiếu19/11 và QA/KS20/11

Đã đối chiếu30luồng. Mỗi mục dưới là phần cập nhật hiện hành; liên kết chi tiết cũ dùng tra lịch sử và không thay thế phần này. Bước/scenario trong các sổ hiện hành được gắn nguồn mới; nhánh chưa chốt không tự thành quyết định khách. Chưa có Independent Review cho phiên bản này.

<a id="FLOW-0001"></a>
## FLOW-0001 — Talent nộp đơn và Manager xét duyệt

Đơn chờ không có hạn; nộp lại lúc chờ thì báo đã nộp và báo Manager lần nữa. Email đã đăng ký (kể cả đang ngừng) chuyển đăng nhập, không gửi thông báo đơn mới. Đơn sau từ chối được tiếp nhận như đơn mới; trao đổi trước xét qua email ngoài app. Sau đặt mật khẩu phải quay về đăng nhập.

**Còn thiếu/phần không tự suy:** Chưa chốt đổi quyết định trên chính đơn từ chối; chưa chốt toàn bộ vòng đời đăng ký lại sau nghỉ/xóa 6 tháng. Điều khoản dùng trang ngoài còn KS 20261120 No.33.

**Nguồn:** `T19:3,5,6,7;M19:7;BF19:3`. **Bằng chứng:** `EV-0555;EV-0557;EV-0558;EV-0559;EV-0592;EV-0615`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0001.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0002"></a>
## FLOW-0002 — Talent đăng nhập, đổi mật khẩu và khởi tạo sử dụng

Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán.

**Còn thiếu/phần không tự suy:** Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích.

**Nguồn:** `T19:5,6,8,9,11,26,33;BF19:4`. **Bằng chứng:** `EV-0557;EV-0558;EV-0560;EV-0561;EV-0563;EV-0578;EV-0585;EV-0616`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0002.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0003"></a>
## FLOW-0003 — Đăng ký hoặc thay phương thức thanh toán

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

**Còn thiếu/phần không tự suy:** Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

**Nguồn:** `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`. **Bằng chứng:** `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0003.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0004"></a>
## FLOW-0004 — Kết nối, mất kết nối và nối lại SNS

Mở màn login/cho phép của từng SNS, không mở giao diện dịch vụ đăng; quay về T-07. Một tài khoản mỗi SNS; business/creator Instagram; không cần nối đủ 3 SNS.

**Còn thiếu/phần không tự suy:** Luồng nhà cung cấp/48 h là thiết kế tích hợp phải kiểm, không hỏi khách chọn API hoặc khẳng định đã kiểm tài khoản thật.

**Nguồn:** `T19:10,26;BF19:5`. **Bằng chứng:** `EV-0562;EV-0578;EV-0617`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0004.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0005"></a>
## FLOW-0005 — Tạo thư mục và đăng ký hồ sơ qua ChatGPT

Folder Talent tạo tự động khi đăng ký thanh toán; folder office tạo ngay khi tạo tài khoản. Chưa nhập hồ sơ thì AI không tạo bài. Hồ sơ/chỉ thị đọc từ nguồn tương ứng; không yêu cầu Manager tạo folder thủ công.

**Còn thiếu/phần không tự suy:** Định dạng, chống ghi lặp/đồng thời và khôi phục là việc đội; chưa tự thay kiến trúc OneDrive.

**Nguồn:** `T19:9;M19:7,17;BF19:4,18`. **Bằng chứng:** `EV-0561;EV-0592;EV-0602;EV-0616;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0005.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0006"></a>
## FLOW-0006 — Nhập và chỉnh hồ sơ trên màn M-20

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

Chỉ thị toàn bộ/category/Talent, ưu tiên Talent > category > toàn bộ; mọi trường hợp vẫn kiểm từ cấm. Có thử trên Talent, lưu, lịch sử và quay một phiên bản; sửa qua quản trị hoặc ChatGPT.

**Còn thiếu/phần không tự suy:** Nhiều category xung đột và hiệu lực thay chỉ thị với bài đã tạo vẫn cần phương án đội.

**Nguồn:** `M19:19,20,27;BF19:18`. **Bằng chứng:** `EV-0604;EV-0605;EV-0612;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0008.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0009"></a>
## FLOW-0009 — Chỉ thị AI: soạn, thử, lưu và quay bản

Chỉ thị toàn bộ/category/Talent, ưu tiên Talent > category > toàn bộ; mọi trường hợp vẫn kiểm từ cấm. Có thử trên Talent, lưu, lịch sử và quay một phiên bản; sửa qua quản trị hoặc ChatGPT.

**Còn thiếu/phần không tự suy:** Nhiều category xung đột và hiệu lực thay chỉ thị với bài đã tạo vẫn cần phương án đội.

**Nguồn:** `M19:19,20,27;BF19:18`. **Bằng chứng:** `EV-0604;EV-0605;EV-0612;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0009.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0010"></a>
## FLOW-0010 — Chu kỳ AI chủ động: đọc dữ liệu, nhắn và nhắc

Mỗi sáng báo kết quả hôm trước, follower tăng,3 chủ đề và thử thách; nhắc tư liệu trong ngày; kết quả sau đăng; tổng kết tuần. Giờ chung chỉnh tại M-17.

**Còn thiếu/phần không tự suy:** Không chốt giờ 8/12/19 từ hình minh họa; giờ vận hành là cấu hình, số liệu SNS có thể chậm.

**Nguồn:** `T19:12,13,16,27;M19:22`. **Bằng chứng:** `EV-0564;EV-0565;EV-0568;EV-0579;EV-0607`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0010.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0011"></a>
## FLOW-0011 — Hội thoại AI và chuyển thông tin nghiêm trọng

Phạm vi hội thoại ngoài đăng bài, sức khỏe/rời công ty và thông báo tâm sự nghiêm trọng vẫn được hỏi tại KS 20261120 No.21,27,28.

**Còn thiếu/phần không tự suy:** Không dùng sự xuất hiện loại thông báo trong hình để tự chốt được tư vấn mọi chủ đề hoặc số lượt hội thoại.

**Nguồn:** `BF19:14,18;M19:6,27;T19:16`. **Bằng chứng:** `EV-0626;EV-0630;EV-0591;EV-0612;EV-0568`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0011.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0012"></a>
## FLOW-0012 — Đề xuất, nhận, thực hiện và ghi nhận thử thách

Chỉ thị toàn bộ/category/Talent, ưu tiên Talent > category > toàn bộ; mọi trường hợp vẫn kiểm từ cấm. Có thử trên Talent, lưu, lịch sử và quay một phiên bản; sửa qua quản trị hoặc ChatGPT.

**Còn thiếu/phần không tự suy:** Nhiều category xung đột và hiệu lực thay chỉ thị với bài đã tạo vẫn cần phương án đội.

**Nguồn:** `M19:19,20,27;BF19:18`. **Bằng chứng:** `EV-0604;EV-0605;EV-0612;EV-0630`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0012.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0013"></a>
## FLOW-0013 — Chọn chủ đề, sửa và chấp nhận bài ở chế độ cần kiểm tra

Chấp nhận yêu cầu có ảnh/video; xin duyệt chỉ hiện cho Talent bật tính năng. Đang chờ Manager duyệt thì không sửa; trả lại có lý do thì sửa rồi xin duyệt lại.

**Còn thiếu/phần không tự suy:** Thiếu tư liệu trong chế độ kiểm tra còn KS No.8; bài đến muộn còn No.56; không chốt mọi giao điểm duyệt/từ cấm cho tự động.

**Nguồn:** `T19:17,18,22,30;BF19:7,8`. **Bằng chứng:** `EV-0569;EV-0570;EV-0574;EV-0582;EV-0619;EV-0620`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0013.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0014"></a>
## FLOW-0014 — Gửi, lưu và dùng lại ảnh/video

Dùng lại ảnh/video đã gửi; OneDrive vẫn là kho hồ sơ/chỉ thị. GJ19§14 cho phép cân nhắc kho ảnh/video khác nếu không thêm chi phí.

**Còn thiếu/phần không tự suy:** Không tự chuyển kho lưu. Video tự làm lần lượt 1 bài/ngày vẫn KS 20261120 No.18/QA No.37; tư liệu Manager dùng trong kỳ và quyền xem còn No.19.

**Nguồn:** `T19:19;BF19:11,18;GJ19:14`. **Bằng chứng:** `EV-0571;EV-0623;EV-0630;EV-0647`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0014.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0015"></a>
## FLOW-0015 — Tạo video AI và quyết định dùng kết quả

T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước.

**Còn thiếu/phần không tự suy:** CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi.

**Nguồn:** `T19:20;BF19:12`. **Bằng chứng:** `EV-0572;EV-0624`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0015.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0016"></a>
## FLOW-0016 — Quản lý từ cấm, phát hiện và xử lý bài bị chặn

Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12.

**Còn thiếu/phần không tự suy:** Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57.

**Nguồn:** `M19:16,23;BF19:17;GJ19:12`. **Bằng chứng:** `EV-0601;EV-0608;EV-0629;EV-0645`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0016.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0017"></a>
## FLOW-0017 — Yêu cầu duyệt, trả lại và quá hạn duyệt

Duyệt bài công việc khi Talent xin duyệt; trả lại phải có lý do; chờ duyệt không sửa theoGJ19§13. Quá giờ chưa duyệt thì không đăng/hủy và báo cả hai bên.

**Còn thiếu/phần không tự suy:** Bật tính năng có áp mọi bài không, đích category/cá nhân và phê duyệt trên đường tự động vẫn KS 20261120 No.9,10,14.

**Nguồn:** `T19:18,22,30;M19:8,9;BF19:8`. **Bằng chứng:** `EV-0570;EV-0574;EV-0582;EV-0593;EV-0594;EV-0620`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0017.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0018"></a>
## FLOW-0018 — Thiết lập và chạy đăng tự động theo kỳ

AI tạo chữ/hashtag, dùng ảnh/video Talent gửi; không tự biến ảnh thành slideshow trong luồng bài thường. Bài ảnh không đăng YouTube.

**Còn thiếu/phần không tự suy:** Thứ tự ảnh→chữ hay chữ→ảnh còn KS 20261120 No.7; hiển thị kịch bản/video-idea còn No.35,36, không coi giá hiển thị là đã tạo video.

**Nguồn:** `T19:12,13,17,18,27,30;BF19:6,7`. **Bằng chứng:** `EV-0564;EV-0565;EV-0569;EV-0570;EV-0579;EV-0582;EV-0618;EV-0619`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0018.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0019"></a>
## FLOW-0019 — Đặt lịch, đăng SNS và thao tác đăng lại khi lỗi

Manager thao tác đăng lại tại M-08; nguồn mới mô tả đăng lại ngay, không có màn chọn giờ. Không tự động thử lại khi lỗi.

**Còn thiếu/phần không tự suy:** BF19 trang 9 vẫn có nhánh Talent đăng lại dưới nhãn đề xuất, trong khi màn T17 không có nút; ghi khác biệt tác nhân. Đích SNS lỗi vẫn No.59; bỏ giả định hẹn sau 15 phút.

**Nguồn:** `M19:12;BF19:9;GJ19:17`. **Bằng chứng:** `EV-0597;EV-0621;EV-0650`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0019.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0020"></a>
## FLOW-0020 — Dừng, hủy và mở lại đăng tự động

Dừng riêng hoặc toàn bộ ngăn lịch mới và hủy lịch đã có; chạy lại không phục hồi bài đã hủy; tự làm video cũng dừng theo BF19 trang 19.

**Còn thiếu/phần không tự suy:** Phần này có mô tả rõ nhưng KS 20261120 No.32 vẫn chưa trả lời; tiếp tục theo dõi tại đó, không tạo câu hỏi trùng. Bài mới trong lúc dừng còn No.60.

**Nguồn:** `M19:15,21;BF19:19;KS:20261120:32`. **Bằng chứng:** `EV-0600;EV-0606;EV-0631`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0020.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0021"></a>
## FLOW-0021 — Lấy số liệu, hiển thị và phản hồi cho chu kỳ sau

Lấy số liệu/follower 1 lần ngày trong phạm vi dịch vụ; ghi kết quả vào file Talent, sáng hôm sau AI dùng.

**Còn thiếu/phần không tự suy:** Phải kiểm tài khoản provider thật; lịch chạy số liệu/khung giờ là thiết kế, không tự xác nhận khả năng từ tài liệu nguồn.

**Nguồn:** `T19:23,27;M19:12;BF19:9,13`. **Bằng chứng:** `EV-0575;EV-0579;EV-0597;EV-0621;EV-0625`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0021.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0022"></a>
## FLOW-0022 — Manager xem tình hình, xử lý thông báo và tra nhật ký

Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người.

**Còn thiếu/phần không tự suy:** Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager.

**Nguồn:** `M19:6,8;BF19:14;GJ19:6,7`. **Bằng chứng:** `EV-0591;EV-0593;EV-0626;EV-0639;EV-0640`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0022.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0023"></a>
## FLOW-0023 — Tổng hợp phí, thu theo kỳ và xử lý chưa thu được

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

**Còn thiếu/phần không tự suy:** Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

**Nguồn:** `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`. **Bằng chứng:** `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0023.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0024"></a>
## FLOW-0024 — Tạo tài khoản công ty và đăng bài cho office

Office nhập tên/email ở M-12; tạo folder ngay; Manager login app Talent bằng office, tự nối SNS; không thanh toán/không phí tháng/không duyệt; phí video nội bộ. Unit là office, hiện cùng Talent list.

**Còn thiếu/phần không tự suy:** Vòng đời kết thúc/xóa office cần No.66; không suy ngoại lệ streak/nhắc ngày không đăng từ việc miễn phí.

**Nguồn:** `T19:5,9,25,30;M19:10,17;BF19:20`. **Bằng chứng:** `EV-0557;EV-0561;EV-0577;EV-0582;EV-0595;EV-0602;EV-0632`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/corrections-2026-11-19/flows/FLOW-0024.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0025"></a>
## FLOW-0025 — Đăng nhập, thêm/vô hiệu hóa và khôi phục Manager

Manager dùng ứng dụng mã 6 số như Google Authenticator; đăng ký QR lần đầu. Thêm tên/email; vô hiệu hóa chặn đăng nhập và ngừng nhận thông báo.

**Còn thiếu/phần không tự suy:** Khôi phục mất phương tiện 2FA và bảo vệ Manager cuối vẫn là No.67; không tự duyệt quy trình khôi phục.

**Nguồn:** `M19:5,24`. **Bằng chứng:** `EV-0590;EV-0609`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0025.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0026"></a>
## FLOW-0026 — Talent ngừng dùng, giữ/xóa dữ liệu và đăng ký lại

Ba trạng thái nguồn mô tả: chưa dùng/đang dùng/đã kết thúc. Kết thúc dừng lời nhắn/thu phí/hủy lịch/chặn login; không trở lại đang dùng; giữ 6 tháng rồi xóa. Thanh toán đăng ký xong tự chuyển có thể dùng theo T19 trang 8–9.

**Còn thiếu/phần không tự suy:** Tạm dừng vì nợ và ảnh hưởng thu phí chưa được trả lời; không đồng nhất dừng đăng với kết thúc sử dụng.

**Nguồn:** `M19:14,15;BF19:3,16`. **Bằng chứng:** `EV-0599;EV-0600;EV-0615;EV-0628`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0026.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0027"></a>
## FLOW-0027 — Theo dõi lượt video và chi phí AI

Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp.

**Còn thiếu/phần không tự suy:** Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày.

**Nguồn:** `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`. **Bằng chứng:** `EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0027.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0028"></a>
## FLOW-0028 — Vận hành và xử lý gián đoạn dịch vụ ngoài

Lỗi video hiển thị câu dễ hiểu cố định, không mã lỗi provider; mọi ngoại lệ và vận hành lỗi cần đội rà thành yêu cầu phi chức năng.

**Còn thiếu/phần không tự suy:** Timeout/retry/kết quả muộn và đối soát chưa được nguồn chốt; không phát triển nội dung khách suy diễn.

**Nguồn:** `GJ19:18;T19:21;BF19:9`. **Bằng chứng:** `EV-0651;EV-0573;EV-0621`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0028.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0029"></a>
## FLOW-0029 — Chuẩn bị dữ liệu, tài khoản ngoài và điều kiện vận hành

Lỗi video hiển thị câu dễ hiểu cố định, không mã lỗi provider; mọi ngoại lệ và vận hành lỗi cần đội rà thành yêu cầu phi chức năng.

**Còn thiếu/phần không tự suy:** Timeout/retry/kết quả muộn và đối soát chưa được nguồn chốt; không phát triển nội dung khách suy diễn.

**Nguồn:** `GJ19:18;T19:21;BF19:9`. **Bằng chứng:** `EV-0651;EV-0573;EV-0621`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0029.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

<a id="FLOW-0030"></a>
## FLOW-0030 — Chốt phạm vi thử, nghiệm thu, phát hành và thay đổi

T19 có 19 màn, M19 có 21 màn; đăng nhập xong mở Mypage; thanh điều hướng 5 mục Home/AI/tư liệu/lịch/Mypage; chuông ở Home/Mypage. Số/chữ/tên trong hình là minh họa.

**Còn thiếu/phần không tự suy:** Mục lục các PDF và KS có số trang cũ; trích trang PDF thực tế, không dùng số màn AG/18 thay cho 19.

**Nguồn:** `T19:1,32,33;M19:1,4`. **Bằng chứng:** `EV-0553;EV-0584;EV-0585;EV-0586;EV-0589`.

**Chi tiết trước đối chiếu:** `docs/requirement-review/flow-reconstruction-2026-11-19/flows/FLOW-0030.md` (giữ lịch sử; không dùng kết luận “chưa có mô tả” khi nguồn mới đã bổ sung).

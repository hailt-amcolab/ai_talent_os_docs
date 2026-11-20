# Câu hỏi ưu tiên để thông luồng chính

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **4-4** — Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12. Còn mở: Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57. Căn cứ: `M19:16,23;BF19:17;GJ19:12`.
- **7-4** — Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người. Còn mở: Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager. Căn cứ: `M19:6,8;BF19:14;GJ19:6,7`.
- **1-1** — Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp. Còn mở: Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày. Căn cứ: `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

> Bổ sung nguồn cùng ngày 19/11: trước khi dùng bộ câu hỏi dưới đây, đối chiếu hai bản định nghĩa màn hình 18/11 tại [danh mục nguồn hiện hành](../TAI_LIEU_NGUON.md). Đặc biệt, SD-M18 trang23 đã mô tả M-20 nhập hồ sơ và ChatGPT; No.74/KH-025 cần đọc cùng mô tả này, không hỏi như chưa có bản màn. Q&A vẫn Open; chưa có căn cứ để tự đóng câu hoặc coi tác động phạm vi đã được duyệt. Xem [bản cập nhật28](28_Cap_nhat_danh_muc_nguon_19-11-2026.md).

Ngày lập: 19/11/2026. Bản lọc để chuẩn bị thảo luận, **không phải yêu cầu đã được khách duyệt**. Thứ tự ưu tiên là đề xuất nội bộ.

Bảng theo dõi chính vẫn là [workbook15](15_Cau_hoi_lam_ro_luong.xlsx). Bản này chọn **28/52 mục `Gui_khach`, gộp thành 12 nhóm**, ưu tiên đường: đăng ký → đủ điều kiện dùng → tạo bài → kiểm từ cấm/duyệt → đặt lịch → đăng → xử lý lỗi/dừng. Không sửa workbook, không cấp No. Q&A mới, không coi các nhánh chưa chọn là đã thông.

Nguồn quyết định: [Q&A gốc](../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx), sheet `Q&A` (cột E/F là câu hỏi; G/H là lịch sử trả lời; I là trạng thái), và [biên bản 17/11](../source_requiments/17112026/20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md). Các No. dùng làm đầu mối hỏi trong bảng dưới hiện vẫn `Open` tại nguồn gốc. Đọc cùng [danh mục nguồn](../TAI_LIEU_NGUON.md); phân tích/SCD/guide không xác nhận thay khách.

## 1. Bộ cần chốt trước: 12 nhóm / 28 mục KH

Các câu dưới đây được rút gọn theo hành vi nghiệp vụ. Khi trao đổi, dùng phương án và ảnh hưởng đã có trong `Gui_khach`; mọi phương án đề xuất vẫn là **chưa được phê duyệt**. Người trả lời có thể chọn cách khác.

| Thứ tự | Câu hỏi cần khách trả lời | Gỡ điểm tắc nào? | Mã trong Gui_khach | Đầu mối Q&A gốc và vị trí |
|---|---|---|---|---|
| 1 | **Hồ sơ Talent nhập ở đâu, khi nào được coi là hoàn tất?** Giai đoạn này Manager nhập qua ChatGPT hay cần thêm màn quản trị? Hoàn tất do Manager xác nhận hay hệ thống kiểm đủ nội dung bắt buộc? | Chốt đường Manager cung cấp hồ sơ → AI được sử dụng hồ sơ. Nếu thêm màn, phải xử lý ảnh hưởng phạm vi riêng. | KH-025, KH-024 | No.74 `E74:I74`; No.54 `E54:I54` |
| 2 | **Khi nào Talent chuyển sang đang sử dụng?** Sau hoàn tất thanh toán, sau hoàn tất hồ sơ hay Manager chủ động bật? Ở bước còn thiếu hồ sơ/thanh toán, được làm những gì? | Điều kiện đi tiếp từ onboarding sang chat/tạo nháp/đăng; tránh đồng nhất đã đăng nhập với đã được dùng mọi chức năng. | KH-023 | No.52 `E52:I52`; liên quan No.54 |
| 3 | **Bắt đầu tính phí từ mốc nào và cổng nào thực hiện?** “Ngày đăng ký” là ngày Manager duyệt hay ngày Talent đăng ký thanh toán? Xin cung cấp tên cổng chính thức/đầu mối và kết quả kiểm tra thu định kỳ, phí tháng cộng phí video biến đổi. | Tách mốc active khỏi mốc tính tiền; có đầu vào để đội kiểm chứng thanh toán thật. Tên provider là thông tin khách cung cấp, khả năng kỹ thuật do đội/provider xác minh. | KH-026, KH-027 | No.53 `E53:I53`; No.4 `E5:I5`; biên bản §6 và action 1 |
| 4 | **Các lựa chọn đăng bài liên hệ thế nào?** “Tự động/cần xác nhận” và “đăng theo khoảng/đăng một lần” là một lựa chọn hay hai lựa chọn độc lập? Nếu độc lập, tổ hợp nào được phép? | Chốt các nhánh tạo bài và điều kiện cần Talent xác nhận; làm cơ sở đội lập trạng thái bài. | KH-001 | No.71 `E71:I71`; biên bản §1 |
| 5 | **Một khoảng đăng tự động vận hành ra sao?** Ảnh/clip ghép với bài thế nào; AI viết theo nội dung ảnh hay chỉ theo chủ đề; tạo cả kỳ hay từng ngày; hết tư liệu thì làm gì; hết kỳ có gia hạn không; muốn đổi chủ đề/tư liệu giữa kỳ thì sửa hay dừng và tạo lại? | Khép vòng đời bắt đầu → tạo bài → hết tư liệu/hết kỳ/thay đổi giữa kỳ. Sáu quyết định riêng, không đóng bằng một câu “đồng ý tự động đăng”. | KH-002–KH-007 | No.70 `E70:I70`; biên bản §1 |
| 6 | **Ai nhận và xử lý yêu cầu duyệt?** Phân theo category hay Manager phụ trách từng Talent? Chưa có/vắng người phụ trách thì ai nhận? Đổi phụ trách thì yêu cầu chưa xử lý chuyển hay giữ? | Tránh bài chờ duyệt không có người xử lý; đội tách người nhận thông báo với quyền thực hiện thao tác. | KH-017–KH-019 | No.6 `E7:I7`, đặc biệt cập nhật 17/11 ở `H7` |
| 7 | **Bài công việc và bài có từ cấm đi qua những bước nào?** Bài tự động có phải chờ Manager duyệt? Từ cấm dừng riêng bài hay cả khoảng? Talent có được sửa không? Manager sửa xong có cần Talent xác nhận lại trước khi đăng? | Chốt đường sửa → kiểm tra lại → duyệt → lịch, không tự suy ra sửa sạch là đã duyệt. Cần bổ sung các ý ở mục 2 dưới đây. | KH-008–KH-011 | No.71 `E71:I71`; No.57 `E57:I57`; cách xác định bài công việc còn nằm trong No.76 `E76:I76` |
| 8 | **Giờ đăng được chốt và chuyển thế nào?** Chốt khi tạo nháp hay khi Talent xác nhận? Xác nhận/gửi tư liệu quá giờ thì chuyển tới lúc nào? Bài thứ hai trở đi chọn khung theo chỉ thị hay theo khoảng cách tối thiểu khách xác nhận? | Không để bài quá giờ hoặc nhiều bài trong ngày rơi vào lịch chưa xác định. Không tự áp khoảng cách 3 giờ. | KH-012, KH-013 | No.56 `E56:I56`, đặc biệt cập nhật ở `H56`; biên bản §1/§7 |
| 9 | **Bài bị trả lại rồi gửi duyệt lại được xử lý ra sao?** Có tiếp tục cùng bài và giữ lịch sử duyệt không? Nếu giờ cũ còn kịp thì giữ hay chọn lại; nếu quá giờ áp dụng kết quả nhóm 8 thế nào? | Khép vòng sửa → gửi lại → duyệt lại → lịch; không mất lịch sử hoặc giữ giờ không còn hợp lệ. | KH-014, KH-015 | No.58 `E58:I58`; phụ thuộc No.56 |
| 10 | **Bài đăng lỗi được đặt lại lịch thế nào?** Talent, Manager hay cả hai được thao tác; chỉ gửi lại SNS lỗi hay gửi lại cả các SNS; giờ mới do ai quyết và thao tác ở màn nào? | Có đường phục hồi lỗi mà không mặc định đăng trùng sang mạng đã thành công. | KH-016 | No.59 `E59:I59`; KH-016 mới rút gọn phần người thao tác |
| 11 | **Dừng và mở lại ảnh hưởng bài/khoảng đăng ra sao?** Dừng có hủy cả bài đã hẹn và khoảng đang chạy không? Khi đang dừng, có cho tạo nháp/xác nhận bài mới không? Mở lại xử lý bài mới, bài đã hủy và khoảng cũ thế nào? | Khép nhánh dừng → giữ/hủy → mở lại, tránh tự phục hồi ngoài ý khách. | KH-020–KH-022; bổ sung theo No.60 đã có | No.77 `E77:I77`; No.60 `E60:I60` |
| 12 | **Manager thao tác tài khoản công ty ở đâu?** Dùng app Talent bằng tài khoản công ty hay làm ngay trong màn quản trị? Làm rõ email đăng nhập, người nối SNS và lifecycle tài khoản theo câu No.66 đang mở. | Chốt đường thao tác office, màn và quyền cần triển khai; không mở lại câu Manager có được làm thay Talent thường không. | KH-048 | No.66 `E66:I66`; cập nhật No.43 ở `H44`; biên bản §7 確認27 |

## 2. Giữ các ý chặn luồng chưa được Gui_khach rút gọn hết

Đây là phân rã **câu đã có**, không phải No. Q&A mới và không gửi lại nguyên câu đã hỏi:

- **No.56:** KH-012/013 chưa thể hiện riêng quyết định *chốt giờ khi tạo nháp hay khi Talent xác nhận*. Giữ ý này trong nhóm 8. Căn cứ `Q&A!E56`, `H56`.
- **No.57:** KH-010/011 chưa đủ ý *sau sửa ai bấm đặt lịch/có tự đặt lịch không, bài vừa có từ cấm vừa cần duyệt đi qua thứ tự nào*. Giữ các ý này trong nhóm 7. Căn cứ `Q&A!E57`; không dùng đề xuất ở ô đó làm quyết định đã duyệt.
- **No.59:** KH-016 mới hỏi ai đặt lại lịch, chưa đủ ý *SNS nào được gửi lại, màn thao tác và ai quyết giờ*. Giữ trong nhóm 10. Căn cứ `Q&A!E59`.
- **No.60:** KH-020–022 chủ yếu bám No.77, chưa bao hết *bài mới phát sinh trong lúc dừng*. Giữ No.60 làm đầu mối riêng trong nhóm 11. Căn cứ `Q&A!E60:I60`.
- **No.71:** giữ ý *Talent chưa xác nhận mà tới giờ đăng thì bỏ qua hay giữ chờ; còn được xác nhận lại khi nào*. Đối chiếu cùng quy tắc quá giờ ở No.56, không tự coi hai câu đã tương đương. Căn cứ `Q&A!E71` mục (4).
- **No.76:** giữ phần diễn giải *bài công việc nào cần phép khách hàng/Manager duyệt và ai xác định* khi chốt nhóm 7. Không coi phần diễn giải AMCOLAB ở `Q&A!E76` là câu trả lời khách.

## 3. Chia buổi hỏi để không gửi cả bộ cùng lúc

1. **Buổi về cách đăng:** No.71 → No.70 → phần ảnh hưởng duyệt/từ cấm No.57. Đội chuẩn bị bảng tổ hợp và ví dụ vài ảnh cho nhiều ngày, có tình huống hết tư liệu/hết kỳ. Không hỏi khách thiết kế state machine.
2. **Buổi về vào sử dụng và quyền:** No.74/54 → No.52; No.53 và đầu vào No.4; No.6; No.66. Có sơ đồ onboarding và ví dụ phân tuyến duyệt. Nhà cung cấp thanh toán cần được liên hệ sớm, không chờ xong các buổi khác.
3. **Buổi về khép nhánh:** No.56 → No.58/59 → No.60/77. Dùng tình huống có giờ cụ thể, một SNS lỗi, dừng giữa kỳ và bài đang chờ duyệt để khách lựa chọn hành vi.

Đây là cách tổ chức thảo luận, không tự đặt lịch/deadline mới. Câu đã có No. tiếp tục ghi kết quả tại No. đó và cập nhật các mục KH liên quan. Một câu trả lời gộp không tự đóng mọi quyết định con.

## 4. 24 mục còn lại: theo nhánh, không bỏ khỏi phạm vi theo dõi

Có thể xử lý song song hoặc ngay sau bộ chính; **phải chốt trước thiết kế/nghiệm thu nhánh tương ứng**, không mặc định được hoãn phát hành.

| Nhánh | Mục KH còn lại | Khi nào cần chốt / nguồn gốc |
|---|---|---|
| Thu phí và video | KH-028–KH-032, KH-052 | Kỳ gộp phí video, thu lỗi/dừng dùng, đơn giá, đổi giá, kết quả video muộn và phí khi rời giữa kỳ. Trước hoàn thiện billing/video: Q&A No.49 (`E50:I50`), No.63 (`E63:I63`), No.2 (`E3:I3`), No.62 (`E62:I62`), No.76 (`E76:I76`). |
| Đăng ký lỗi, khôi phục và kết thúc | KH-033–KH-038 | Mất MFA/Manager cuối, đơn bị từ chối, mật khẩu tạm hết hạn, đăng ký lại/xóa dữ liệu. Trước nghiệm thu lifecycle tài khoản: No.67 (`E67:I67`), No.65 (`E65:I65`), No.69 (`E69:I69`). |
| Thử thách | KH-039–KH-041, KH-051 | Điều kiện đạt, thời hạn, streak và số thử thách đồng thời. Trước triển khai chấm tiến độ/thông báo đạt: No.72 (`E72:I72`); biên bản §2. |
| Giới hạn chat | KH-042 | Làm rõ giới hạn số lượt hay nội dung; trước chốt policy AI coach: No.76 (`E76:I76`). |
| Giờ lời nhắn/nhắc tư liệu | KH-043, KH-044 | Chốt giờ/ưu tiên nhắc trước khi chạy lịch nhắn tự động: No.73 (`E73:I73`); biên bản §4. |
| Email Manager | KH-045–KH-047 | Loại, người nhận, nội dung và tác động phạm vi trước khi triển khai email: No.75 (`E75:I75`); phụ thuộc No.6. |
| Kết quả tổng và xử lý thông báo | KH-049, KH-050 | Đội chuẩn bị trạng thái/mẫu màn sau No.70/71, rồi xin quyết định về hiển thị và việc đã xử lý: No.51 (`E51:I51`), No.76 (`E76:I76`). No.51 vẫn mở; không chỉ chốt nhãn là đủ. |

## 5. Việc đội phải làm để câu trả lời thực sự gỡ được luồng

| Người xử lý | Đầu ra cần có | Theo dõi tại Noi_bo |
|---|---|---|
| BA + thiết kế | Bảng tổ hợp mode, ví dụ media/bài/khoảng, sơ đồ dừng/mở lại; ghi rõ phần nào cần khách chọn | RV-13, RV-19 |
| BA + kiến trúc | Bảng điều kiện sử dụng theo hồ sơ/thanh toán/SNS/loại tài khoản; tách activation và tính phí | RV-15, RV-06 |
| BA + QA | Một luồng chung từ sửa từ cấm tới duyệt/đặt lịch; trường hợp quá giờ, sửa lại và đăng lỗi | RV-05, RV-04, RV-03 |
| Đội tích hợp + provider | Khả năng/gói/quyền/tài khoản thử của cổng thanh toán, SNS/Upload-Post, OneDrive/ChatGPT; kết quả đối soát và giới hạn thực tế | RV-17, RV-18, RV-20, RV-32 |
| BA + dev + QA | Sau câu trả lời: đồng bộ SCD, màn, trạng thái kỹ thuật và AC; gắn bằng chứng vào workbook15 | RV-29, RV-31; các RV của nhánh tương ứng |
| Chủ dự án + phía có thẩm quyền | Chốt riêng tác động phạm vi/chi phí/lịch và quyền phát hành nếu lựa chọn thay đổi phạm vi | RV-12, RV-32 |

Không đưa enum DB, token, retry key, transaction hoặc lựa chọn công nghệ vào bộ khách quyết định. Không hỏi lại trần số bài/ngày, quyền làm thay Talent thường, hay số lần AI viết lại chỉ vì tài liệu dẫn xuất còn mâu thuẫn: đối chiếu biên bản §1/§7 và Q&A liên quan rồi đội đồng bộ phần đã rõ.

**Điều kiện kết thúc đợt lọc:** khách quyết định từng ý còn mở; đội/provider có đầu ra còn thiếu; SCD/màn/AC được đồng bộ; phần thương mại và phát hành được chốt đúng thẩm quyền. Trả lời hết 28 mục ưu tiên chỉ giúp khép bộ quy tắc luồng chính, không phải chứng nhận toàn bộ sản phẩm sẵn sàng triển khai hoặc nghiệm thu.

# Cách đọc bảng câu hỏi sau rà soát 18/11/2026

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **4-2** — Không giới hạn số lần AI viết lại theo DEC-0001; quyền sửa tay giữ nguyên. Các mô tả hai lượt trong PDF19/11 là lịch sử bị thay đúng chủ đề. Còn mở: Xử lý lỗi/kết quả không rõ/gửi lặp còn do đội thiết kế. Căn cứ: `T19:18,27,29;USER:DEC-0001`.
- **7-4** — Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người. Còn mở: Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager. Căn cứ: `M19:6,8;BF19:14;GJ19:6,7`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

> **Hiệu lực từ20/11 — DEC-0001:** số lần AI viết lại hiện không giới hạn theo chỉ đạo người dùng áp dụng H65. Giới hạn hai lần và vấn đề bộ đếm/RV-01/L23-01 bên dưới là lịch sử; không dùng để chặn lần viết lại thứ ba. Phục hồi lỗi/gửi lặp vẫn cần đội thiết kế. Workbook15 và các dòng xác nhận nguồn được giữ nguyên. [Quyết định](../docs/requirement-review/corrections-2026-11-19/REPORT.md).

Bảng chính: [15_Cau_hoi_lam_ro_luong.xlsx](15_Cau_hoi_lam_ro_luong.xlsx). **XLSX thay cho CSV cũ, là bản theo dõi chính duy nhất.** Liên kết luồng: [22_So_do_tuong_tac_tac_nhan.md](22_So_do_tuong_tac_tac_nhan.md), đặc biệt G01–G20.

## Phạm vi thay đổi

- Giữ nguyên **56 dòng có Mã bắt đầu bằng `確認`**, giữ nguyên giá trị tất cả ô, thứ tự và trạng thái khi chuyển sang sheet `Luong`. Định dạng dòng CSV được thay bằng định dạng Excel; không thay nội dung các mục này.
- Rà soát **117 mục còn lại**, giữ mã cũ, cập nhật `Trạng thái`, căn cứ và `Liên quan`. Chỉ sửa câu hỏi/đề xuất cũ khi quyết định mới đã thay thế hoặc cần tránh hỏi trùng.
- Có **16 mục `L22-01`–`L22-16`** từ sơ đồ22 và **14 mục `L23-01`–`L23-14`** bổ sung từ rà soát sâu. **19 mục có sẵn** được mở rộng để ghi đủ33 RV; không tạo lại câu hỏi đã có. Sheet `Luong` hiện có **203 dòng dữ liệu**, giữ nguyên14 cột và toàn bộ giá trị của bảng CSV trước chuyển đổi.
- Đây là theo dõi **xử lý câu hỏi/đặc tả**, không phải trạng thái viết mã, chạy thử hay hoàn thành phần mềm.

## Nhãn trong cột Trạng thái

| Nhãn | Ý nghĩa |
|---|---|
| `[ĐÃ XỬ LÝ]` | Câu hỏi cụ thể đã có câu trả lời/quyết định, hoặc ranh giới phạm vi đã được tài liệu xác định. Nội dung sau nhãn ghi rõ căn cứ; không có nghĩa mọi việc biên tập liên quan đã xong. |
| `[XỬ LÝ MỘT PHẦN]` | Đã rõ một phần nhưng còn câu trả lời, thiết kế hoặc đồng bộ tài liệu. Không đóng toàn bộ vì một số Q&A liên quan đã Close. |
| `[CHƯA XỬ LÝ - CHỜ KHÁCH]` | Chờ phản hồi nghiệp vụ/thông tin khách. Nếu có Q&A Open thì theo dõi số đó, không gửi lại cùng câu. |
| `[CHƯA XỬ LÝ - CHỜ ĐỘI]` | Đội/FutureCore còn phải biên tập, đề xuất hoặc chốt thiết kế. Có thể cần khách xác nhận phần hành vi; chưa tự biến đề xuất thành quyết định. |
| `[CHƯA XỬ LÝ - CHỜ NHÀ CUNG CẤP]` | Cần tài khoản/gói/consent/POC hoặc bằng chứng từ provider; đội/chủ dự án vẫn phải chốt manifest và phạm vi phát hành. |
| `[KHÔNG CÒN ÁP DỤNG]` | Câu hỏi cũ bị quyết định mới thay thế; ghi rõ câu khác vẫn còn mở. |
| `[THEO DÕI MỤC CHÍNH]` | Mục trùng đã được nối tới câu chính; không tính là nội dung đã giải quyết. |

### Số lượng hiện tại sau khi ghi toàn bộ điểm tắc

| Nhãn | 117 mục cũ | 16 mục L22 | 14 mục L23 |
|---|---:|---:|---:|
| ĐÃ XỬ LÝ | 15 | 0 | 0 |
| XỬ LÝ MỘT PHẦN | 42 | 4 | 4 |
| CHƯA XỬ LÝ - CHỜ KHÁCH | 33 | 9 | 0 |
| CHƯA XỬ LÝ - CHỜ ĐỘI | 23 | 3 | 9 |
| CHƯA XỬ LÝ - CHỜ NHÀ CUNG CẤP | 0 | 0 | 1 |
| KHÔNG CÒN ÁP DỤNG | 2 | 0 | 0 |
| THEO DÕI MỤC CHÍNH | 2 | 0 | 0 |

## Căn cứ đã dùng

- Đọc trực tiếp workbook **`AI-Talent-OS_Q&A表.xlsx`**: sheet Q&A có 76 câu, **43 Close / 33 Open**; sheet `保留` có No.50 Open và sheet `追加要件` có CR-01–CR-25. Câu gộp nhiều nội dung không tự được đóng chỉ vì một No. đã Close.
- Đối chiếu workbook **`要件定義確認シート_AI育成OS.xlsx`**, quyết định 17/11, [tệp 21](21_Cap_nhat_theo_bang_xac_nhan_17-11.md) và [tệp 19](19_Doi_chieu_QA_bao_gia.md). Đọc nguồn này để cập nhật **các mục ngoài 確認**, không sửa 56 dòng được bảo vệ.
- SCD, phân tích màn hình/hạ tầng và hướng dẫn tích hợp Auth, PWA, OneDrive, Upload-Post. Hướng dẫn kỹ thuật có thể giải quyết phần thiết kế, nhưng không thay câu trả lời của khách về business rule.
- Không dựa vào mã nguồn, cấu hình môi trường hoặc phần mềm đang chạy để đánh dấu câu hỏi đã xử lý. Lần cập nhật này không tuyên bố đã kiểm toán toàn văn mọi DOCX/PDF của dự án.

## Những đính chính quan trọng

- **B8:** bỏ kết luận cũ tính phí video Manager làm thay vào hóa đơn Talent thường. Quyết định mới chỉ cho làm thay tài khoản công ty, hệ thống tổng hợp lượt để quyết toán nội bộ.
- **A5:** không áp trần số bài/ngày; quy tắc giờ bài tiếp theo vẫn theo No.56 Open.
- **A7:** không bỏ/gộp mốc followers như đề xuất cũ; có mốc 25/50/75% và thông báo đạt mục tiêu theo câu trả lời Q&A.
- **S01-02:** không còn bật lại 利用終了 → 利用中; đăng ký lại email sau khi rời là No.69 riêng.
- **S01-10:** đã có bản thảo điều khoản trong bảng xác nhận; còn bản cuối/phiên bản, không hỏi như chưa nhận gì.
- **S02-04/S02-05/S02-07:** phân biệt trách nhiệm cung cấp mẫu, mục tiêu từng mạng và hiển thị lỗi đã rõ với schema mẫu, đồng bộ và cache fallback còn thiếu.
- **S07-07:** No.25 trả lời giờ **nhắn**, không đóng cách đặt giờ **đăng**. Các phần còn mở được nối đúng câu.
- **S07-08:** bỏ câu “không có dữ liệu thì không làm 8-9”; giữ xử lý thiếu quyền/mẫu và độ mới theo hợp đồng metrics.
- **C6/S01-11:** đã có quyết định kỹ thuật Web Push và TOTP-only trong tài liệu; không dùng kết quả chạy phần mềm làm bằng chứng.

## Liên kết với các luồng của file 22

`Liên quan` của mọi mục ngoài 確認 đã được nối tới G tương ứng. Các mục `L22-*` bổ sung hồ sơ hoàn tất/màn nhập, phân tuyến duyệt, ưu tiên chỉ thị, giới hạn chat, giờ/nhịp chủ động, ngày đăng liên tiếp, khoảng tự động, gate duyệt/từ cấm, dừng/mở lại, đổi danh sách từ cấm, gửi duyệt lại, đối soát tác vụ ngoài, metrics thiếu dữ liệu, xóa/đăng ký lại, email Manager và màn/AC còn thiếu.

**G01–G20 là mã khoảng trống rà soát, không phải mã yêu cầu khách mới.** Mục L22 có số Q&A là bản ghi theo dõi câu đã gửi, không phải một câu hỏi cần gửi thêm lần nữa. Các phần còn lại chủ yếu là việc đội hoàn thiện đặc tả.

## Rà soát sâu cùng ngày

Xem [kết quả quét luồng](23_Ket_qua_quet_luong_va_do_san_sang.md), [ma trận truy vết](24_Ma_tran_truy_vet_yeu_cau_luong.csv) và [kịch bản đề xuất](25_Kich_ban_kiem_tra_luong_dau_cuoi.csv). **A1 được mở lại ở mức xử lý một phần**: No.20 mô tả dùng app office, nhưng No.43 cập nhật17/11 vẫn hỏi app hay quản trị qua No.66. Đây là đính chính đánh giá trước, không có phản hồi khách mới. Ở bước mở lại A1, tổng vẫn là189 dòng. Bước ghi toàn bộ điểm tắc bên dưới tăng tổng lên203; 56 mục 確認 tiếp tục giữ nguyên. 16 L22 không phải bộ câu hỏi cuối; trả lời hết không tự đóng các mâu thuẫn và việc đội cần hoàn thiện.

## Ghi toàn bộ điểm tắc vào bảng15

Cả **33 RV** trong báo cáo23 đã có một **mục theo dõi chính** trong sheet `Luong` của workbook15: mở rộng19 mục có sẵn, thêm14 mục L23. Mỗi mục ghi bằng chứng, ảnh hưởng/ranh giới luồng bị chặn, câu cần làm rõ, người xử lý, điều kiện đóng, trade-off, mức HIGH/MEDIUM và liên kết scenario. Các mục cũ liên quan có backlink; không tính backlink như một câu hỏi độc lập mới.

Cột `Câu hỏi cho khách` giữ tên cũ để không đổi cấu trúc CSV, nhưng nội dung có ghi rõ **đội/khách/provider/chủ dự án**. Không gửi nguyên mọi dòng cho khách: câu đã có No. thì theo No. đó; lỗi đồng bộ tài liệu là việc đội; nội dung kỹ thuật cần POC gửi provider; thay đổi nghiệp vụ/phạm vi mới cần khách/chủ dự án quyết định. **Không có phản hồi khách mới hoặc RV nào được đóng trong lần bổ sung này.**

Xem bảng đối chiếu RV → mục workbook15 / sheet `Luong` ở cuối [báo cáo23](23_Ket_qua_quet_luong_va_do_san_sang.md). File24/25 đã được nối ngược về mã câu hỏi/điểm tắc chính để tra từ luồng hoặc scenario.

## Các sheet và cách làm rõ chi tiết

| Sheet | Nội dung | Cách sử dụng |
|---|---|---|
| `Luong` | 203 mục hiện có, 14 cột, gồm56 mục 確認 được giữ nguyên giá trị | Làm rõ đường đi nghiệp vụ, các điểm tắc và điều kiện đóng. Các trạng thái hiện tại được giữ nguyên khi chuyển từ CSV. |
| `Chi_tiet` | 64 câu hỏi CT-001–CT-064 về trạng thái, validation, phân quyền, dữ liệu/đồng thời, lỗi/khôi phục, UI/AC, vận hành/vòng đời | Dùng sau hoặc song song với phần luồng đã đủ rõ. Mỗi câu có mã liên quan sheet `Luong`, RV, bên trả lời và điều kiện phụ thuộc; không tự chốt thay khách. |

Các sheet có bộ lọc, hàng tiêu đề và hai cột đầu cố định, xuống dòng trong ô. Ở `Chi_tiet`, bấm ô cột **Liên quan sheet Luong** để tới mục chính đầu tiên; các mã khác trong cùng ô tra bằng bộ lọc. Cột **Ưu tiên** và **Trạng thái** có danh sách chọn.

Các cột chờ điền ở sheet chi tiết: **Câu trả lời/Quyết định**, **Người chốt**, **Ngày chốt/Phiên bản nguồn**, **SCD/AC cần cập nhật**. Tất cả64 câu khởi tạo là **CHƯA TRẢ LỜI**; đây không phải64 thiếu sót đã được chứng minh độc lập hay64 câu phải gửi thêm cho khách. Có câu phân rã điểm đã hỏi ở sheet luồng: dùng chung nguồn trả lời và đánh giá phần nào đã đủ, phần nào còn mở.

Nếu câu phụ thuộc một quyết định luồng còn mở, chuyển **CHỜ CHỐT LUỒNG**, không điền enum/giới hạn/default bằng suy đoán. Đội có thể thiết kế phần độc lập đã rõ. Chỉ đánh dấu **ĐÃ CHỐT** khi có người/nguồn/phiên bản quyết định và xác định nơi cập nhật SCD/AC; không đồng nghĩa đã viết mã hoặc đã kiểm thử. Việc đã có quyết định (ví dụ office-only, tối đa2 lần AI rewrite) không hỏi lại: câu chi tiết tập trung vào guard, cách đếm, lỗi và trường hợp biên còn thiếu.

Các liên kết Markdown đang dùng bảng15 đã chuyển sang `.xlsx`; bản CSV cũ đã được thay thế để tránh hai bản chính lệch nhau. Danh mục nguồn23 là snapshot lịch sử nên vẫn giữ tên/hash CSV tại thời điểm quét. Không đổi workbook Q&A/KS gốc hoặc nội dung SCD trong lần chuyển đổi này ngoài việc sửa liên kết tệp15.

## Bản biên tập gửi khách và việc nội bộ

Theo [9 nguồn gốc](../TAI_LIEU_NGUON.md), workbook hiện có4 sheet. `Gui_khach` gồm52 quyết định tách nhỏ theo Q&A Open, được chia nhóm trao đổi; không gửi lặp toàn bộ hay coi đây là52 yêu cầu mới. Mỗi câu có lựa chọn/ảnh hưởng, đề xuất chưa duyệt, căn cứ gốc và phụ thuộc; câu trả lời/khách chọn vẫn trống. `Noi_bo` gồm33 việc đội cần chuẩn bị/đồng bộ,4 việc đã sửa một phần được ghi chứng cứ, không tự đóng RV.

Xem [kết quả đối chiếu và cách chọn nhóm gửi](26_Doi_chieu_9_nguon_va_cau_hoi_khach.md). Chỉ dùng `Gui_khach` cho phần cần quyết định nghiệp vụ; các câu kỹ thuật ở `Chi_tiet`/`Noi_bo` đội phải xử lý trước. Các mục xác nhận trong `Luong` tiếp tục giữ nguyên.

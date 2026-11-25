<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### CR hiện hành và đổi nghĩa ID

Danh sách hiện hành còn14 CR; mười mục01–04,06,10–14 ghi đồng ý trong hợp đồng hiện tại, không thêm phí. CR-05/07/08/09 vẫn chờ quyết định. Mã CR cũ đã đổi nghĩa: CR-04 nay màn chỉ thị, CR-06 nay lưu video, không dùng tên cũ để tra bản mới.

**Còn mở/giới hạn:** CR-07/08 ghi I là trong phạm vi nhưng J là CR và M vẫn chờ; CR-09 vận hành thiết kế phương ánA, chưa là khách duyệt300người. Chưa có hợp đồng/SOW/báo giá ký độc lập. No.50 bị xóa ở 保留, không suy là đã chốt toàn bộ. Căn cứ: `QA 追加要件!A2:N15 (CR-01–14)`; `EV-1324`; CR-01;CR-02;CR-03;CR-04;CR-05;CR-06;CR-07;CR-08;CR-09;CR-10;CR-11;CR-12;CR-13;CR-14;QA No.50.

<!-- /DELIVERY24112026 -->

# Đối chiếu file Q&A với [YK2] v2 và đặc tả – phạm vi theo bản báo giá

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **5-1** — T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước. Còn mở: CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi. Căn cứ: `T19:20;BF19:12`.
- **4-4** — Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12. Còn mở: Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57. Căn cứ: `M19:16,23;BF19:17;GJ19:12`.
- **1-1** — Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp. Còn mở: Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày. Căn cứ: `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

Viết lại ngày 17/11/2026 theo bản `AI-Talent-OS_Q&A表.xlsx` mới nhất (đã đọc toàn bộ). Cập nhật ngày 18/11/2026 theo bản Q&A có các trả lời ghi ngày 17/11 (sau buổi họp đọc bảng xác nhận) và câu mới No.69–77; biên bản họp ở `20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md`. Bản trước của file này dựa trên bản Q&A chưa có trả lời và đã bị thay thế.

Ký hiệu nguồn:
- [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`.
- **Q&A No.x** = dòng trong trang Q&A; **CR-xx** = dòng trong trang 追加要件 (yêu cầu bổ sung).
- **Khách** trong file này = FutureCore, gọi là 貴社 (quý công ty) trong file Q&A; アデッソ là khách cuối.
- **確認シート** (bảng xác nhận yêu cầu) = bảng 118 dòng mà khách đã gửi AMCOLAB, 85 dòng đã đánh dấu (Q&A No.28). Bảng đã có trong thư mục: `要件定義確認シート_AI育成OS.xlsx` (tổng hợp ở tệp 21).

## 1. File Q&A hiện có gì

| Trang | Nội dung |
|---|---|
| Q&A | 76 câu: No.1–49 và No.51–77. **43 câu đã đóng (Close), 33 câu còn mở (Open)** (bản 17/11). No.69–77 là câu mới của AMCOLAB ngày 17/11, xin trả lời trước buổi họp 20/11 |
| 保留 (tạm hoãn) | No.50: hỏi khách thứ tự ưu tiên của các chức năng ngoài báo giá, và chức năng nào cần ở giai đoạn 1. Còn mở |
| 追加要件 (yêu cầu bổ sung) | 25 dòng CR-01〜CR-25: phân loại từng chức năng lệch báo giá (xem mục 3) |
| デザインFB (góp ý thiết kế), お知らせ・メール文章 (câu chữ thông báo và thư) | Chỉ có dòng tiêu đề |

**Ai trả lời.** Cột 回答内容 (nội dung trả lời) ghi hai đợt:
- **Đợt 13/11:** tóm tắt lựa chọn của khách trong 確認シート, viết dạng "貴社はB案を選択" (quý công ty chọn phương án B). Đây là **quyết định của khách**.
- **Đợt 15/11:** AMCOLAB tự chốt theo [YK2] v2, viết dạng "…のとおり設計いたします。ご意見がある場合はご連絡ください" (sẽ thiết kế theo …, có ý kiến xin báo). Đây là **AMCOLAB chốt, khách vẫn có thể phản đối**.

**Các cột theo dõi việc đưa vào SCD** (M–Q của trang Q&A, R–T của trang 追加要件) vẫn trống. Cột L (概算工数 – công ước tính) của CR-01〜CR-16 đều ghi 0.

## 2. Các câu đã đóng và việc phải làm theo

Câu đóng nào khớp với SCD hiện tại thì ghi "Khớp". Câu đóng nào cần sửa tài liệu thì ghi việc cụ thể.

| No. | Nội dung chốt | Người chốt | Ảnh hưởng đến tài liệu của mình |
|---|---|---|---|
| 1 | Đếm 1 lượt video lúc gửi yêu cầu; tạo lại cũng tính; lỗi phía dịch vụ không tính ([YK2] 5-4) | AMCOLAB | Khớp 5-4 |
| 3 | Không có lượt miễn phí, không có trần tháng; tài năng xem được số lần và tổng tiền trong tháng | AMCOLAB | Khớp 5-4 |
| 5 | Một loại quản lý; mọi quản lý dừng hoặc mở lại được đăng tự động toàn bộ (CR-13) | AMCOLAB | Khớp 1-6, 7-5 |
| 9 | Mỗi sáng 3 chủ đề, tài năng chọn (CR-02) | Khách | Khớp 4-1 |
| 10 | Ba trạng thái 利用前・利用中・利用終了 (chưa dùng, đang dùng, đã ngừng); từ 利用終了 đưa về 利用中 được; "退会" (rút) trong 確認シート = 利用終了 | AMCOLAB | Khớp C-01 |
| 11 | Tài năng tự đăng ký trong ứng dụng, quản lý duyệt hoặc từ chối (CR-01) | Khách | Khớp 1-4; PWA F02, F03 |
| 12 | Quản lý dừng hoặc mở lại đăng tự động cho từng tài năng | AMCOLAB | Khớp 7-5 |
| 13 | AI kiểm tra từ cấm theo ngữ cảnh; một danh sách chung, nhập ở màn quản trị; **FutureCore cung cấp mẫu danh sách** | Khách | Khớp 4-4 |
| 14 | Mục tiêu theo từng mạng (mặc định 10.000), có hạn đạt. Ô "目標%" (phần trăm mục tiêu) chung trong thiết kế アデッソ sẽ chỉnh theo từng mạng khi làm định nghĩa màn hình. Đạt mục tiêu thì báo tài năng và quản lý. **Báo tăng người theo dõi khi đạt 25%, 50%, 75% mục tiêu** (đề xuất của AMCOLAB, khách xem trên màn thật) | AMCOLAB | Sửa 3-7: thêm mốc 25/50/75%. Cột Comment ghi đội còn muốn kiểm tra lại với thiết kế (mục tiêu tổng 3 mạng) |
| 15 | Đăng lỗi không tự đăng lại; chỉ báo tài năng và quản lý (CR-15) | AMCOLAB | Khớp 8-5; bộ Upload-Post §1 |
| 16 | Quản lý hủy bài đã hẹn ở màn quản trị; hệ thống hủy lịch trên Upload-Post | Khách | Khớp 7-2 |
| 17 | Phí AI tổng hợp theo tài năng và theo tháng, hiện ở màn quản trị; không có trần, không tự dừng (CR-16) | AMCOLAB | Khớp 3-5; đóng S03-08 |
| 18 | Tuổi tính từ ngày sinh, chỉ hiển thị tham khảo. アデッソ lấy đồng ý của phụ huynh. **Quy tắc chủ đề và cách nói với tài năng vị thành niên** do アデッソ viết vào file chỉ thị cho AI ([YK2] 7-5), không phải chức năng của hệ thống | AMCOLAB | 3-3: quy tắc cho tài năng vị thành niên nằm trong file chỉ thị, không làm logic riêng |
| 19 | Không có nút hủy dịch vụ trong ứng dụng; tài năng liên lạc quản lý, quản lý đổi trạng thái. Lịch sử thanh toán xem qua liên kết sang trang của công ty thanh toán | Khách | Khớp 7-3; PWA F19 |
| 20 | Tài khoản công ty: quản lý đăng nhập lại từng tài khoản; thông tin nhập qua ChatGPT; không duyệt | Khách | Khớp 9-1 (A1, A2) |
| 21 | Nhật ký xem lưu ngày giờ, quản lý, tài năng; lọc theo khoảng thời gian và tài năng | AMCOLAB | Khớp 7-6 |
| 22 | Đọc file OneDrive lỗi định dạng: xử lý như lỗi trong thiết kế của AMCOLAB, **hiện tình trạng đọc ở màn chi tiết tài năng** trong màn quản trị. Mẫu file do FutureCore đưa | AMCOLAB | Sửa 2-1 và 7-1: thêm tình trạng đọc file; đóng S02-07; S02-04 (mẫu file) do khách đưa |
| 26 | Không còn 3 phương án trang chủ; ứng dụng giống Instagram, マイページ (trang của tôi) là điểm xuất phát | Khách | Khớp 6-8 |
| 27 | FutureCore làm sổ tay thao tác cho quản lý và mẫu danh sách từ cấm | Khách | Bàn giao: không thuộc việc của AMCOLAB |
| 28 | AMCOLAB đã nhận 確認シート và [YK2] bản 13/11; hình trạng thái sẽ có ở bản cuối | — | **Xin bản 確認シート để đưa vào thư mục dự án** |
| 31 | マイページ hiện: số liệu từng bài, số ngày đăng liên tục, diễn biến người theo dõi, phần còn thiếu tới mục tiêu, người theo dõi và mức đạt từng mạng ([YK2] 6-7, 3-10); bố cục chốt khi định nghĩa màn hình | AMCOLAB | Khớp 6-7, 3-10 |
| 32 | Bỏ các mục LINE | Khách | Khớp |
| 33 | Màn quản trị dùng chủ yếu trên PC, nhưng phải dễ xem trên trình duyệt điện thoại | Khách | Khớp C-06 |
| 35 | Có trả lại kèm lý do, tài năng sửa và xin duyệt lại (CR-03) | Khách | Khớp 7-7 |
| 36 | Hai loại video (CR-04): **video trình chiếu ảnh làm ở máy chủ bằng cách ghép ảnh, không dùng thêm dịch vụ AI** | Khách (chọn), AMCOLAB (cách làm) | Sửa 5-1, 5-2: đóng S05-05 |
| 38 | AI tìm tin tức mỗi sáng (CR-05): **tìm 1 lần mỗi ngày, dùng chung hoặc theo nhóm**, để giảm phí | Khách (chọn), AMCOLAB (cách làm) | Sửa 4-1: thêm bước tìm tin tức |
| 40 | Bài dính từ cấm không được hẹn giờ; quản lý xem và sửa ở màn quản trị (CR-06): **màn tối thiểu, chỉ sửa chữ, hẹn giờ và hủy** | Khách | Khớp 4-4 (B5) |
| 41 | Màn cài đặt chung: giờ nhắn, giờ nhắc, số ngày không đăng, danh sách từ cấm (CR-07) | Khách | Khớp C-02 |
| 42 | Thêm thông báo đạt mục tiêu (tài năng và quản lý) và thu tiền lỗi (quản lý) (CR-08) | Khách | Khớp 3-7, 1-1, C-05 |
| 45 | Khách muốn màn chỉ thị cho AI (toàn bộ, theo nhóm, theo tài năng), có chạy thử và quay lại bản cũ. Câu đóng, nhưng việc làm hay không chuyển sang CR-18, **chưa làm cho tới khi khách quyết** | Khách | Giữ hướng ChatGPT (MCP) cho 2-3, 3-1. Không làm màn M-11 của [AG] |
| 46 | Tháng đầu thu đủ 1 tháng; thu lỗi thì báo tài năng và quản lý, không tự dừng sử dụng | AMCOLAB | Khớp 1-1 |
| 47, 48 | Bỏ phân loại trả phí và miễn phí; mọi tài năng đều trả phí; tài khoản công ty là loại riêng, không thu tiền, hệ thống chỉ đếm số lần tạo video (CR-11) | Khách | Khớp 1-2, 1-3 |

## 3. Trang 追加要件 (yêu cầu bổ sung): AMCOLAB đã phân loại

> **Cập nhật 18/11/2026:** bảng xác nhận yêu cầu `要件定義確認シート_AI育成OS.xlsx` (quyết định 17/11/2026) đã quyết:
> - **làm** CR-17 (nhóm tài năng, 確認47), CR-18 (màn chỉ thị cho AI, 確認6–8), CR-19 (duyệt theo nhóm hoặc người phụ trách, 確認34), CR-21 (tài năng sửa chữ, 確認28);
> - **không làm** CR-20 (một tài khoản mỗi mạng, 確認10);
> - CR-22 (thử thách) đã chốt hướng (確認5);
> - CR-23 vẫn chờ; CR-24 không làm (Q&A No.7 đóng 17/11: quản lý xem toàn bộ hội thoại); CR-25 không cần (Q&A No.68 đóng 17/11: 画面定義書 do FutureCore làm).
>
> Các dòng "chưa làm tới khi khách quyết" bên dưới chỉ còn đúng cho CR-23. Chi tiết và việc mới (hai cách đăng 自動投稿 / 要確認…) ở [21_Cap_nhat_theo_bang_xac_nhan_17-11.md](21_Cap_nhat_theo_bang_xac_nhan_17-11.md).

Cột "Kết luận" lấy từ cột CR判定 (đánh giá thay đổi) và cột ảnh hưởng ở giai đoạn SP1 (đợt phát triển đầu tiên).

| Nhóm | Các CR | Kết luận | Việc của mình |
|---|---|---|---|
| **Ngoài báo giá, nhưng bù bằng phần bị cắt nên không thu thêm** | CR-01 tự đăng ký; CR-09 quản lý gửi tư liệu và tạo video thay tài năng (phí video tính vào hóa đơn của tài năng đó) | Làm ở SP1 | 1-4; 6-3, 5-1 (đóng B8) |
| **Trong phạm vi** (chi tiết hóa của SOW) | CR-02 ba chủ đề; CR-03 trả lại kèm lý do; CR-04 hai loại video; CR-05 tìm tin tức; CR-06 màn sửa bài dính từ cấm; CR-07 màn cài đặt chung; CR-08 thông báo đạt mục tiêu và thu lỗi; CR-10 lưu ảnh và video ở OneDrive | Làm ở SP1 | Như mục 2 |
| **Cắt bớt so với báo giá** (bù cho CR-01, CR-09) | CR-11 bỏ phân loại trả phí và miễn phí; CR-12 bỏ trần tháng tạo video; CR-13 một loại quản lý; CR-14 bỏ người duyệt chỉ định cho từng tài năng; CR-15 bỏ tự đăng lại; CR-16 bỏ trần phí AI | Không làm | Khớp SCD |
| **Thay đổi (CR) thật, chưa làm tới khi khách quyết** | CR-17 nhóm tài năng (カテゴリー) M-10; CR-18 màn chỉ thị cho AI M-11; CR-19 gửi yêu cầu duyệt cho quản lý phụ trách nhóm; CR-20 nhiều tài khoản trên một mạng; CR-21 tài năng sửa chữ trực tiếp; CR-22 màn theo dõi thử thách và yếu tố trò chơi (thử thách ghi trong file cho AI đọc vẫn trong phạm vi); CR-23 video tự làm, mỗi ngày 1 video thành bản nháp; CR-24 hội thoại riêng tư (nếu khách chọn B ở No.7); CR-25 AMCOLAB làm 画面定義書 (tài liệu định nghĩa màn hình) (nếu khách chọn B ở No.68) | Chờ No.50 | Không giao agent làm các phần này (mục 5) |

**Điều này thay kết luận của bản trước.** Bản trước cho rằng 24 câu lệch phạm vi và phải chọn giữa báo giá với [YK2] v2. Nay AMCOLAB đã chọn theo [YK2] v2 cho hầu hết các câu đó, và cân chi phí bằng các phần bị cắt (CR-11〜CR-16). Đặc tả SCD và `agent_spec` hiện đang viết theo v2, nên **phần lớn đã khớp**.

## 4. Các câu còn mở

### 4.1. Câu cũ đã hỏi, chờ khách

| No. | Chủ đề | Tình trạng |
|---|---|---|
| 2, 62 | Đơn giá video | Đơn giá là một giá trị cài đặt ở màn quản trị, phát triển tiếp không chờ. Khách báo giá trước UAT (kiểm thử chấp nhận). No.62 đề xuất: tính theo giá tại lúc gửi yêu cầu, lượt lỗi trừ ngay |
| 4 | Công ty thanh toán và việc thu số tiền thay đổi hằng tháng | Chờ |
| 6 | Duyệt theo quản lý phụ trách nhóm | Chuyển sang CR-19 |
| 7 | Quản lý xem hội thoại hay hội thoại riêng tư | **Đã đóng 17/11:** quản lý xem toàn bộ hội thoại, tài năng được báo lần đầu mở ứng dụng (確認13, 42). Không làm CR-24 |
| 8 | Lưu ở OneDrive (đã chốt). **Hỏi thêm:** tenant Microsoft 365 của アデッソ có cho tạo liên kết chia sẻ "mọi người có liên kết đều xem được" không. Nếu không thì dùng nơi lưu tạm trong lúc gửi (CR-10 phương án B) | Thiết kế hiện tại (tải lên Supabase Storage, fal.ai và Upload-Post lấy tệp từ bản tạm) **đã là phương án B**. Không cần liên kết công khai của OneDrive |
| 23 | Nhiều tài khoản trên một mạng | Chuyển sang CR-20 |
| 24 | Ứng dụng tin nhắn Instagram đang chạy | Trùng I1 |
| 25 | Giờ nhắn buổi sáng chung hay theo từng tài năng. "URL mời hạn 7 ngày" đổi thành hạn mật khẩu tạm (No.65) | Trùng S07-07 (một phần) |
| 29 | Thời gian giữ nhật ký và cách sao lưu do AMCOLAB thiết kế; chỉ hỏi khách thời gian giữ dữ liệu tài năng đã ngừng (確認55) | I8 và S01-09 thành việc nội bộ |
| 30 | Bộ mã màn hình làm chuẩn | **Đã đóng 17/11:** mã T/M của [AG] là chuẩn; trang 1 của [AG] có bảng đối chiếu với mã L/M; L-08 ngoài phạm vi |
| 34 | Bản báo giá dùng chung, ngày bắt đầu UAT | Chờ |
| 37, 39, 43, 44 | Video tự làm, sửa chữ trực tiếp, quản lý làm thay, nhóm tài năng | Chuyển sang CR-23, CR-21, CR-09 (đã chốt làm), CR-17 |

### 4.2. Câu mới No.49, No.51–68 trùng với câu hỏi của đội

AMCOLAB đã gửi các câu này cho khách. Câu nào trùng thì **không hỏi lại**; đội chỉ theo dõi trả lời.

| No. | Chủ đề | Đề xuất của AMCOLAB | Câu của đội bị trùng | Khác với SCD hiện tại |
|---|---|---|---|---|
| 49 | Chu kỳ thu tiền | Thu cùng ngày cuối tháng, phí video gộp theo tháng dương lịch | S08-02 | — |
| 51 | Danh sách trạng thái bài đăng | Tạm ghép 8 trạng thái từ phần chữ, nhờ khách đối chiếu với hình 5-1 | S10-01 | **Hình 5-1 có trong tệp v2 dạng ảnh** (đội đã lấy ra, C-01 mục 1). Nên đưa hình vào câu hỏi hoặc đóng câu này, khỏi hỏi khách |
| 52 | Lúc chuyển 利用前 sang 利用中 | Khi tài năng đăng ký thanh toán xong | S01-01 | — |
| 53 | Ngày bắt đầu tính phí tháng | Ngày đăng ký thanh toán; chưa đăng ký thì vẫn 利用前, không tính tiền | S08-02 (một phần) | — |
| 54 | Biết quản lý đã nhập xong thông tin tài năng | Quản lý bấm "đã đăng ký xong" ở màn chi tiết | (2-1, 2-3) | SCD 2-1 kiểm tra file; nếu khách chọn A thì thêm nút |
| 55 | Thời hạn chủ đề, bản nháp, tư liệu | Chủ đề hết hạn khi có chủ đề mới; bản nháp chưa dùng giữ 7 ngày rồi ẩn; tư liệu giữ theo No.29 | S04-02 | Khớp (C-01 lý do `expired` sau 7 ngày) |
| 56 | Lúc chốt giờ đăng; nhiều bài trong ngày | Chốt lúc tạo bản nháp; bài thứ hai trở đi lấy khung tốt kế tiếp, cách bài trước ít nhất 3 giờ; chấp nhận khi đã quá giờ thì dời sang khung kế tiếp | B1, S04-01, S04-04 | — |
| 57 | Luồng sau khi phát hiện từ cấm | Kiểm tra trước khi gửi duyệt; quản lý sửa xong bấm "予約する" (hẹn giờ), coi như đã duyệt; quá giờ thì dời; báo tài năng | B5, S04-08 | — |
| 58 | Xin duyệt lại sau khi bị trả lại | **Cùng một bài**, giữ lịch sử duyệt; giữ giờ cũ nếu còn kịp | — | **Khác C-01:** C-01 cho bài bị trả lại sang 取り消し (đã hủy) và chấp nhận lại thì thành bài mới. Phải thống nhất nội bộ trước khi khách trả lời |
| 59 | Hẹn lại bài lỗi | Nút "予約し直す" (hẹn lại) ở cả ứng dụng tài năng và màn quản trị; chỉ đăng lại mạng bị lỗi; giờ mới do AI chọn | S06-04, S06-05 | Khớp hướng của PWA (`talentRescheduleFailed`) |
| 60 | Chấp nhận bài khi đang dừng đăng tự động | AI vẫn chạy; tài năng vẫn chấp nhận, bài ở trạng thái "停止中のため保留" (giữ lại vì đang dừng); mở lại thì hẹn giờ nếu còn kịp | B6, S06-06, S03-05 | Cần trạng thái giữ lại; xem trong C-01 khi có trả lời |
| 61 | Báo tài năng khi bài bị hủy | Báo trong ứng dụng; bài bị hủy về lại bản nháp để chấp nhận lại | (A6) | Thêm loại thông báo vào C-05 nếu khách đồng ý |
| 62 | Đơn giá video | Như No.2 | B9, S08-06 | — |
| 63 | Trạng thái khi dừng vì thu tiền lỗi | Dùng 利用終了 ở giai đoạn 1, không thêm trạng thái | B7 | — |
| 64 | Đưa 利用終了 về 利用中 | **Đã đóng 17/11:** không có thao tác đưa về ([KS] 確認56); đăng ký lại trong 6 tháng hỏi ở No.69 | (S01-02) | — |
| 65 | Đăng ký lại, mật khẩu tạm | Email bị từ chối vẫn bị chặn, quản lý xóa đơn để người đó đăng ký lại; đơn chưa xử lý không hết hạn; **mật khẩu tạm hạn 7 ngày**, quản lý bấm gửi lại | S01-05, S01-06, B11 | — |
| 66 | Chi tiết tài khoản công ty | Quản lý nhập email khi tạo; tự kết nối mạng khi đăng nhập; hiện trong danh sách tài năng với nhãn 事務所; dùng chung 3 trạng thái | (9-1, B10, S06-07 một phần) | — |
| 67 | Khôi phục tài khoản quản lý | Tự đặt lại mật khẩu qua email; mất thiết bị xác thực 2 bước thì quản lý khác đặt lại; không cho tự vô hiệu hóa mình và vô hiệu hóa quản lý cuối cùng | S01-07 | — |
| 68 | Ai làm 画面定義書 | **Đã đóng 17/11:** FutureCore làm, dự kiến gửi sáng 20/11 (biên bản, việc số 5); không cần CR-25 | (A10) | — |

### 4.3. Thay đổi ngày 17/11 (sau buổi họp đọc bảng xác nhận)

**Câu đã đóng thêm:** No.7, 23, 25, 29, 30, 39, 43, 44, 64, 68 (chi tiết ở các dòng tương ứng và ở tệp 21 §5). Các câu No.33, 39, 42, 44, 49 ghi rõ AMCOLAB sẽ báo ảnh hưởng phạm vi, giá và lịch trong 5 ngày làm việc trước khi làm (nhóm tài năng, sửa chữ trực tiếp, thông báo đạt mục tiêu và chưa thu được tiền, màn chỉ thị AI thao tác trên điện thoại, chu kỳ thu phí từ ngày đăng ký).

**Câu mới, còn mở** (AMCOLAB hỏi FutureCore, xin trả lời trước buổi họp 20/11):

| No. | Chủ đề | Đề xuất của AMCOLAB | Ảnh hưởng tới tài liệu của mình |
|---|---|---|---|
| 69 | Đăng ký lại trong 6 tháng sau khi 退会; xóa gì sau 6 tháng | A: không cho đăng ký lại bằng email cũ trong 6 tháng; xóa bài đăng, hội thoại, số liệu, thư mục OneDrive, kết nối mạng xã hội | 06 Workflow 7, SCD 7-3, DB P-18, OneDrive §7.7 |
| 70 | Hoạt động trong khoảng đăng tự động | Ảnh dùng theo thứ tự tải lên, mỗi bài một ảnh; hết ảnh thì không đăng và báo tài năng; có nút dừng trong ứng dụng; soạn trước một ngày. Kèm 確認24: AI đọc ảnh để viết chú thích (tăng phí AI) | 06 Workflow 2, SCD 4-3, C-01, DB P-12, U-16 |
| 71 | 自動投稿 / 要確認 và duyệt, từ cấm | Hỏi ô cài đặt và lựa chọn "自動投稿 / 1回の投稿" khi bắt đầu có phải một không; bài công việc vẫn qua duyệt; thời điểm kiểm từ cấm; 要確認 chưa xác nhận tới giờ đăng | như No.70 |
| 72 | Xác định đạt thử thách; đếm ngày đăng liên tục | Chỉ tính thử thách đếm được bằng số; 6 trạng thái; mỗi lúc một thử thách; ngày đăng liên tục = ngày có ít nhất một bài trên một mạng | DB P-17, SCD 3-7, 6-7 |
| 73 | Giờ và nội dung khung sáng, trưa, tối | Sáng 8 giờ, trưa 12 giờ, tối 20 giờ, đổi được ở cài đặt chung | SCD 3-4, C-02, DB P-14 |
| 74 | "Màn nhập thông tin tài năng cho AI" (確認8) là gì | A: giữ nhập qua ChatGPT, màn quản trị chỉ hiển thị (đợt 1) | SCD 2-3, DB R02-09, OneDrive §7.6 |
| 75 | Gửi thêm email cho quản lý | Chỉ 3 loại gấp (duyệt, từ cấm, chuyện nghiêm trọng), chỉ tiêu đề và liên kết | SCD 7-4, C-05 |
| 76 | Cách hiểu các dòng bảng xác nhận có ý kiến nhưng không có quyết định (確認23, 24, 33, 39, 41, 46, 50) | Ví dụ 確認23: không giới hạn số lần nhắn, AI không trả lời chuyện riêng; 確認46: có công tắc "hiện cả đã xử lý" | CSV 15, SCD 3-3, 7-4 |
| 77 | Nút dừng toàn bộ đăng tự động (前提 UC-08-6) | Dừng cả khoảng đăng tự động; mở lại thì tài năng tự bắt đầu lại | SCD 7-5 |

## 5. Ảnh hưởng tới các tài liệu của mình

1. **Chức năng không giao agent cho tới khi khách quyết (No.50):**
   - M-10 nhóm tài năng (CR-17), M-11 màn chỉ thị cho AI (CR-18), duyệt theo nhóm (CR-19);
   - nhiều tài khoản trên một mạng (CR-20), sửa chữ trực tiếp (CR-21);
   - màn thử thách và yếu tố trò chơi (CR-22);
   - **video tự làm, mỗi ngày 1 video thành bản nháp (CR-23):** 6-4 phần tự đưa vào bản nháp, PWA D08 và cờ `selfMadeVideoDaily`;
   - hội thoại riêng tư (CR-24): không làm, Q&A No.7 đã đóng.
2. **Sửa SCD** (đã làm, mỗi file có mục "Cập nhật theo Q&A 15/11"): 2-1, 7-1 (tình trạng đọc file), 3-3 (quy tắc tài năng vị thành niên), 3-5 (không trần), 3-7 (mốc 25/50/75%), 4-1 (tìm tin tức), 4-4 (màn sửa tối thiểu), 5-1, 5-2 (video trình chiếu ghép ảnh ở máy chủ), 6-3 (quản lý gửi thay, phí tính cho tài năng), 6-4 (video tự làm chờ CR-23), 7-7 và C-01 (No.58 khác hướng). Bảng câu hỏi `15_Cau_hoi_lam_ro_luong.xlsx` có thêm cột "Q&A AMCOLAB".
3. **Việc cần làm với người phụ trách file Q&A:**
   - Đưa hình 5-1 (đã lấy ra từ tệp v2) để đóng No.51.
   - Thống nhất No.58: bài bị trả lại là cùng một bài hay bài mới.
   - Xin bản 確認シート (118 dòng).
   - Trả lời No.8 phía kỹ thuật: thiết kế đã dùng Supabase Storage làm nơi lưu tạm, không cần liên kết công khai của OneDrive.
   - Ghi cột theo dõi SCD (M–Q, R–T) sau khi đội chốt.

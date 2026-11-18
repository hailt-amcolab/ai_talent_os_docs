# EP08 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của EP08 (1-1, 1-2, 1-3, 5-4) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, xem `Phan_tich/21` và bảng cuối tệp này): 確認48, 50 (1-1: tháng đầu và tháng ngừng); **確認49 (1-1, 5-4: GMO có thu được số tiền thay đổi mỗi tháng không; chặn chạy thật)**; 確認51 (5-4).

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx` (hình 5-3: hóa đơn tháng = phí tháng theo hợp đồng + số lần tạo video × đơn giá); [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (mã S08-xx).

## 1. Kiểm tra phạm vi

| Không làm | Lý do |
|---|---|
| Gói miễn phí, đổi loại tài khoản (1-3) | §5-4: không có phân loại trả phí và miễn phí |
| Lượt tạo video miễn phí, trần chi phí tháng | §5-4 |
| Màn lịch sử hóa đơn trong ứng dụng | UC-11 前提: xem ở trang của GMO |
| Hoàn tiền, giảm giá, mã khuyến mãi | Không có trong [YK2] |
| Tạm khóa tài năng khi chưa trả tiền | Phải thêm trạng thái; chỉ làm nếu khách chọn phương án B của B7 |

## 2. Câu phải có trả lời trước khi viết mã

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S08-01 | 1-1 | Phí tháng là một mức chung hay mỗi tài năng một mức? (hình 5-3: "theo hợp đồng giữa アデッソ và tài năng") | Một mức chung thì là cài đặt; mỗi người một mức thì quản lý nhập ở M-10 | Trong phạm vi: 1-1 cần số tiền |
| S08-02 | 1-1 | Ngày chốt và ngày thu? (§6-3: quyết khi chọn xong công ty thanh toán) | Thu ngày 1 hằng tháng: phí tháng này + phí video tháng trước. Tháng đầu thu khi đăng ký thanh toán | Trong phạm vi |
| — | 5-4 | Đơn giá mỗi lần tạo video | アデッソ quyết (UC-06 前提) | Khách cung cấp |
| B9 | 5-4 | Đơn giá cố định hay theo chi phí thật? | Cố định; bỏ câu "số tiền thu có thể khác" | Trong phạm vi |

## 3. Câu cần trả lời trước kiểm thử chấp nhận

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S08-03 | 1-1 | Thu lỗi thì thu lại thế nào? | Thu lại khi tài năng đổi cách thanh toán, và tự thu lại một lần sau 3 ngày | Trong phạm vi |
| S08-04 | 1-1 | GMO không thu được số tiền thay đổi qua nhà mạng thì sao? (dự phòng cho 確認49) | Phí tháng thu định kỳ cố định; phí video thu riêng một lần mỗi tháng | Trong phạm vi, cần khách và GMO đồng ý |
| S08-05 | 1-1 | Ngừng giữa tháng thì phí video tháng đó thu thế nào? | Thu vào lần thu cuối | Trong phạm vi |
| S08-06 | 5-4 | Nhập và đổi đơn giá ở đâu? | Ở M-17; đổi giá chỉ áp dụng cho lần tạo sau đó | Trong phạm vi: 5-4 cần đơn giá |
| B7 | 1-1, 7-3 | Thu lỗi thì "dừng sử dụng" là gì? | Phương án A: quản lý chuyển 利用終了 (bản tiếng Nhật ở file câu hỏi EP01) | Trong phạm vi |
| B8 | 5-4 | Quản lý tạo video thay thì tính cho ai? | Tính cho tài năng (bản tiếng Nhật ở file câu hỏi EP05) | Trong phạm vi |

## 4. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| S08-01 | 月額使用料は、図5-3 のとおり「アデッソ様とタレントのご契約で決めた金額」です。全員同じ金額でしょうか。タレントごとに金額が異なる場合は、マネージャーがタレントの詳細（設定）の画面（M-10）で金額を入力する形を提案します。 |
| S08-02 | 毎月のご請求は、毎月1日に、その月の月額使用料と、前の月の動画生成の料金を合わせて請求する形でよろしいでしょうか。最初の月は、支払い方法の登録の時点で1か月分を請求します。 |
| B9 | 動画生成の料金は、決めた1回あたりの金額×回数で計算するため、請求額は画面に表示した金額と同じになります。動画を作る画面の「請求額が表示の金額と変わる場合があります」という表示はなくしてよろしいでしょうか。 |
| S08-03 | 請求が失敗した場合は、タレントが支払い方法を変えた時点と、失敗から3日後の1回、もう一度請求する形でよろしいでしょうか。 |
| S08-04 | 決済代行会社が、キャリア決済で月ごとに変わる金額を請求できない場合（確認49）の代わりの案として、月額使用料を毎月定額の請求とし、動画生成の料金を別の請求として毎月1回いただく形をご検討いただけますでしょうか。 |
| S08-05 | 月の途中で利用終了にしたタレントは、その月までの動画生成の料金を、最後の請求に含める形でよろしいでしょうか。 |
| S08-06 | 動画生成1回あたりの金額は、全体の設定（M-17）でマネージャーが入力・変更できるようにします。金額を変えた場合は、変えた後に依頼された動画から新しい金額になります。この形でよろしいでしょうか。 |

## 5. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 1-1 | 🔴 | 🟡 khi có S08-01, S08-02 và 確認49; 🟢 khi thử xong trên môi trường thử của GMO |
| 1-2 | 🟡 | 🟢 |
| 1-3 | Không làm | Không làm |
| 5-4 | 🔴 | 🟢 khi có đơn giá và B9 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| B7 | Thu tiền thất bại thì "dừng sử dụng" là gì | No.46, No.63 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| B8 | Quản lý tạo video thay cho tài năng thì ai trả tiền | CR-09 | Đã chốt trong Q&A: phí tính vào hóa đơn của tài năng |
| B9 | Phí tạo video: đơn giá cố định hay chi phí thật | No.2, No.62 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); đơn giá là giá trị cài đặt |
| S08-02 | Ngày chốt và ngày thu | No.49, No.53 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S08-06 | Nơi nhập đơn giá video | No.62 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |

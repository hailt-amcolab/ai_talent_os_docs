# EP09 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của EP09 (6-1, 7-4, 6-8) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 không xử lý ở đây, chỉ ghi lại để biết chức năng nào đang chờ: 確認12 (6-1); 確認45, 46, 47 (7-4). Không câu nào trong số này chặn việc viết mã.

Danh mục đầy đủ các loại thông báo nằm ở [C-05](../EP10_Nen_tang_chung_va_quan_tri_he_thong/C-05_Danh_muc_thong_bao.md).

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (mã S09-xx).

## 1. Kiểm tra phạm vi

| Không làm | Lý do |
|---|---|
| Thư điện tử hoặc thông báo đẩy cho quản lý | 別紙A: thông báo quản lý chỉ ở danh sách trên màn hình quản trị |
| Giờ yên lặng, tắt từng loại thông báo | Không có trong [YK2] |
| Lọc thông báo theo nhóm tài năng | Chờ 確認47 |
| Ứng dụng trên kho ứng dụng | §6-12: dùng PWA |

## 2. Câu phải có trả lời trước khi viết mã

Không có. Mọi câu dưới đây đều có giả định an toàn.

## 3. Câu cần trả lời trước kiểm thử chấp nhận

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| C6 | 6-1 | Dùng cơ chế thông báo đẩy nào? (§8: "sẽ xem xét") | Web Push chuẩn của trình duyệt, không cần dịch vụ ngoài | Trong phạm vi |
| A6 | 6-1, 7-4 | 別紙A thiếu các loại mà chức năng cần | Thêm 7 loại liệt kê ở C-05 mục 2 | Trong phạm vi: các chức năng gốc đã yêu cầu |
| S09-01 | 6-1 | Giữ thông báo của tài năng bao lâu? | 90 ngày | Trong phạm vi |
| S09-02 | 7-4 | Một quản lý đánh dấu đã xử lý thì sao? | Áp dụng cho mọi quản lý, hiện tên người đánh dấu | Trong phạm vi |
| S09-03 | 7-4 | Có tự đánh dấu đã xử lý không? | Có với 承認の依頼, 利用の申し込み, 使ってはいけない言葉 khi việc đã xong | Trong phạm vi |
| S09-04 | 6-8 | Máy và trình duyệt hỗ trợ (§9-1: ghi ở bản cuối) | iPhone iOS 16.4 trở lên (Safari); Android, Chrome bản mới nhất và bản trước | Trong phạm vi |
| B13 | 6-8 | Màn mở đầu | T-07 ホーム (bản tiếng Nhật ở file câu hỏi EP01) | Trong phạm vi |

## 4. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| C6 | スマートフォンへの通知の仕組みは、ブラウザ標準の Web Push を使います。追加の外部サービスは不要で、利用料もかかりません。この形でよろしいでしょうか。 |
| A6 | 別紙A のお知らせの一覧に、各機能で必要なお知らせ（動画ができた・作れなかった、承認の期限切れ、予約の取り消し、タレントへの使ってはいけない言葉の検出、パスワードの再設定、マネージャーの招待）を加えてよろしいでしょうか。 |
| S09-01 | タレントのアプリのお知らせは90日間残し、それより古いものは消す形でよろしいでしょうか。 |
| S09-02 | お知らせ一覧で、あるマネージャーが「対応済みにする」を押すと、ほかのすべてのマネージャーの一覧でも対応済みになり、押したマネージャーの名前を表示する形でよろしいでしょうか。 |
| S09-03 | 承認の依頼、利用の申し込み、使ってはいけない言葉の検出のお知らせは、承認・拒否・修正などの対応が終わった時点で、自動で対応済みにする形でよろしいでしょうか。 |
| S09-04 | タレントのアプリの対象の端末とブラウザは、iPhone（iOS 16.4 以降、Safari）と Android（Chrome の最新版と1つ前の版）とする形でよろしいでしょうか（9-1 で最終版に書くとしている項目です）。 |

## 5. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 6-1 | 🟡 | 🟢 khi thử xong thông báo đẩy trên iPhone thật |
| 7-4 | 🟡 | 🟢 |
| 6-8 | 🟡 | 🟢 khi có logo và mã màu (C-06) |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| A6 | Danh sách thông báo thiếu so với các chức năng | No.61 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |

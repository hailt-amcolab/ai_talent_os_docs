# EP02 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 5 chức năng EP02 (2-2, 2-3, 2-4, 2-1, 7-1) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, xem `Phan_tich/21` và bảng cuối tệp này): 確認2 (7-1), 確認3 (2-4), 確認5 (2-3, 2-4), 確認6–8 (màn chỉ thị cho AI, chưa thuộc chức năng nào), 確認41, 42, 44 (7-1), 確認47 (lọc theo nhóm ở 7-1), 確認55 (giữ thư mục sau khi ngừng). Không câu 確認 nào trong số này chặn việc viết mã EP02.

Nguồn:
- [YK2] = `AI育成OS_概要要件定義書_v2.docx` (bản định nghĩa yêu cầu tổng quan, bản 2).
- [AG] = `アプリ画面案_AI育成OS.pdf` (phương án màn hình ứng dụng).
- File 15 = [15_Cau_hoi_lam_ro_luong.xlsx](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx). Các câu mới ở đây đã thêm vào file 15 với mã S02-xx.

## 1. Kiểm tra phạm vi

Cùng nguyên tắc với EP01: đề xuất chỉ được là cách làm của một trong 54 chức năng, hoặc là yêu cầu chung đã có trong [YK2].

**Những thứ đã cố ý loại khỏi EP02** vì không có chức năng tương ứng trong [YK2]:

| Không làm | Lý do |
|---|---|
| Sửa hồ sơ tài năng trên màn hình quản trị | 2-3 quy định nhập qua ChatGPT. [AG] M-07 ghi "この画面では書き換えません" (màn này không sửa) |
| Tài năng xem hoặc sửa hồ sơ của mình trong ứng dụng | UC-02 前提 cấm tài năng sửa; [YK2] không có màn xem hồ sơ cho tài năng |
| Thông báo "đã tạo thư mục" | 17 loại thông báo ở 別紙A (phụ lục A) không có loại này. Thay bằng hiện trạng thái trên màn (S02-03) |
| Lọc theo nhóm tài năng, màn chỉ thị cho AI (M-13 đến M-15) | Chờ 確認6–8, 47; chưa có mã chức năng |
| Màn nhập thử thách riêng | Thử thách viết trong hồ sơ (2-3); đề xuất B12 cũng không làm màn riêng |

## 2. Câu phải có trả lời trước khi viết mã hoặc chạy thật

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S02-01 | 2-3 | ChatGPT ghi vào file OneDrive bằng cách nào? Có cần mỗi tài năng một dự án ChatGPT không? Khách dùng gói ChatGPT nào? | Một connector MCP dùng chung trên ChatGPT (căn cứ 御見積書 前提条件A4, Q&A số 45; dự phòng GPT có Action) gọi API ghi của hệ thống. Quản lý gọi tên tài năng trong hội thoại; trước khi ghi luôn hiện "tài năng nào, mục nào, trước và sau". Không cần dự án riêng cho từng tài năng. Đội kiểm chứng trên gói ChatGPT của khách. Dự phòng: ChatGPT soạn theo mẫu, quản lý tự dán. Chi tiết hóa câu C4 | Trong phạm vi: cách làm của 2-3. Đổi tiền đề UC-01 nên cần khách đồng ý |
| S02-02 | 2-2, 2-1 | Thư mục gốc đặt ở đâu (OneDrive của tài khoản nào, hay site SharePoint nào)? Quản trị viên Microsoft 365 có cấp quyền cho hệ thống không? | Quản trị viên đăng ký ứng dụng AI育成OS và cấp quyền **chỉ trong thư mục hoặc site dành cho hệ thống**. Cùng nội dung với câu I3 ở file 18 | Trong phạm vi: §8, §10-2 |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S02-03 | 2-2, 7-1 | Quản lý biết thư mục đã tạo bằng cách nào, để làm tiếp phía ChatGPT? | Không thêm thông báo. M-06 và M-07 hiện trạng thái thư mục kèm liên kết | Trong phạm vi: hiển thị ở 7-1 |
| S02-04 | 2-3, 7-1, 2-1 | File hồ sơ theo định dạng nào? | Đội đưa mẫu `プロフィール.md` có tiêu đề cố định: プロフィール, 方向性, 趣味・特技, 将来の目標, チャレンジ, 日付, 個別の指示. M-07 hiện theo tiêu đề; nội dung ngoài tiêu đề không hiện ở M-07 nhưng AI vẫn đọc | Trong phạm vi: UC-02 前提 đã nói đội đưa mẫu file |
| S02-05 | 2-4 | Hạn đạt mục tiêu có bắt buộc không? Mục tiêu lưu ở đâu? | Không bắt buộc. Lưu trong hệ thống và ghi ra `目標.md` trong thư mục để AI đọc (§7-2 nói mục tiêu nằm trong thư mục tài năng) | Trong phạm vi |
| S02-06 | 7-1 | Danh sách tài năng có những cột nào, lọc và xếp thế nào? | Cột theo [AG] M-06, thêm trạng thái thư mục. Lọc số ngày không đăng theo mốc cài đặt ở M-17 ("từ 3 ngày", "từ 7 ngày"). Mặc định xếp theo số ngày không đăng giảm dần | Trong phạm vi: UC-10 để cột "quyết khi xem màn hình" |
| S02-07 | 2-1 | Buổi sáng đọc OneDrive lỗi thì làm sao? | Dùng bản đọc gần nhất, ghi nhật ký xử lý, không thêm thông báo | Trong phạm vi: §9-3 |

## 4. Thứ khách phải cung cấp

| Mã | Cần gì | Dùng cho | Hạn đề xuất |
|---|---|---|---|
| S02-02 | Vị trí thư mục gốc và quyền Microsoft Graph | 2-2, 2-1, 2-3, 2-4, 8-8, 6-4 | Trước khi dựng môi trường thử |
| S02-01 | Tên gói ChatGPT đang dùng; một tài khoản thử trong không gian làm việc ChatGPT của khách | Kiểm chứng 2-3 | Càng sớm càng tốt |
| S02-08 | Nội dung kiến thức nghề và chỉ dẫn thuật toán trong thư mục chung | AIコーチ (3-1) | Trước khi chạy thật ([YK2] §7-4: アデッソ nhập dữ liệu ban đầu) |

## 5. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| S02-01 | 6-4「2-3 ChatGPT からの情報の登録」について、御見積書の前提条件A4（マネージャーは ChatGPT（MCP）経由で AI を調整）に沿って、AI育成OS が用意する MCP のコネクタを使う形を想定しています。ChatGPT の標準の OneDrive 連携は読み込み用のため、書き込みにはこのコネクタ（使えない場合は GPT のアクション）が必要です。そこで、タレントごとに ChatGPT のプロジェクトを作る代わりに、マネージャーの皆様が共通で使う「AI育成OS 用の GPT」を1つ用意し、会話の中でタレントの名前を指定して登録する形を提案します。登録の前に、どのタレントのどの項目をどう変えるかを表示し、マネージャーが確かめてから登録します。この形でよろしいでしょうか。あわせて、ご利用中の ChatGPT のプラン（Business、Enterprise など）をお教えください。プランによって使える機能が異なるため、弊社で動作を確かめます。 |
| S02-02 | タレント別フォルダを作る場所（OneDrive のどのアカウントの下か、または SharePoint のどのサイトか）をお決めください。また、AI育成OS がフォルダを作り、ファイルを読み書きできるように、Microsoft 365 の管理者の方に、AI育成OS 用のアプリの登録とアクセス許可の承認をお願いいたします。許可の範囲は、AI育成OS 用のフォルダ（またはサイト）だけに限る形を提案します。 |
| S02-03 | タレント別フォルダができたことは、新しいお知らせを増やさず、管理画面のタレント一覧（M-06）とタレントの詳細（M-07）に、フォルダの状態とフォルダへのリンクを表示してお知らせする形でよろしいでしょうか。 |
| S02-04 | タレントの情報のファイル（プロフィール.md）は、弊社がひな形をお渡しし、見出し（プロフィール、方向性、趣味・特技、将来の目標、チャレンジ、日付、個別の指示）を決めた形にします。タレントの詳細（M-07）は、この見出しごとに表示します。見出しの外に書いた内容は M-07 には表示されませんが、AIコーチは読み込みます。この形でよろしいでしょうか。 |
| S02-05 | フォロワー数の目標の「達成の期限」は、入力しなくても保存できる形でよろしいでしょうか。目標は AI育成OS に保存し、AIコーチが読めるように、タレント別フォルダの「目標.md」にも同じ内容を書き出します。 |
| S02-06 | タレント一覧（M-06）には、画面案の列に加えて、フォルダの状態を表示します。「投稿のない日数」の絞り込みは、全体の設定（M-17）の日数（初期値は3日と7日）を使い、「3日以上」「7日以上」で選べる形にします。並び順は、投稿のない日数の多い順を初期値にします。この形でよろしいでしょうか。 |
| S02-07 | 毎朝の読み込みで OneDrive のファイルを読めなかった場合は、前回読み込んだ内容を使って声かけと投稿案を作り、処理の記録に残します。新しいお知らせは増やしません。この形でよろしいでしょうか。 |
| S02-08 | 共通のフォルダ（投稿のノウハウ、アルゴリズム対策の指示）は、弊社がフォルダとひな形のファイルを作ります。内容は、本番での利用開始の前に、アデッソ様でご記入いただけますでしょうか（7-4 初期データの登録）。 |

## 6. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 2-2 | 🔴 | 🟢 khi có S02-02 (sự kiện thanh toán của 1-1 vẫn dùng bản giả tới khi có) |
| 2-3 | 🔴 | 🟢 khi có S02-01 và kiểm chứng xong trên gói ChatGPT của khách |
| 2-4 | 🟡 | 🟢 |
| 2-1 | 🟡 | 🟢 khi có S02-02 và đo xong tốc độ đọc |
| 7-1 | 🟡 | 🟢; các cột dùng số liệu của 3-10, 8-2, 8-7 vẫn chờ module đó |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| B11 | Đơn bị từ chối và đổi thông tin cơ bản | No.65 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| B12 | Thử thách và hạn mục tiêu | CR-22 | Đã chốt hướng 17/11 ([KS] 確認5): AI đề xuất, tài năng nhận/từ chối, không duyệt; màn thử thách chờ khái niệm アデッソ viết |
| S02-04 | Mẫu file hồ sơ | No.22 | Đã chốt trong Q&A: mẫu file do khách đưa |
| S02-05 | Hạn đạt và nơi lưu mục tiêu | No.14 | Đã chốt trong Q&A: mục tiêu từng mạng, có hạn |
| S02-07 | Đọc OneDrive lỗi buổi sáng | No.22 | Đã chốt trong Q&A: hiện tình trạng đọc ở chi tiết tài năng |

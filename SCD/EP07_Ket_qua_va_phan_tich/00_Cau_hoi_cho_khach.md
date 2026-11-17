# EP07 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 6 chức năng EP07 (8-7, 8-8, 3-10, 6-7, 8-1, 8-9) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 không xử lý ở đây, chỉ ghi lại để biết chức năng nào đang chờ: 確認22, 40 (6-7); 確認30 (8-1); 確認39 (đạt mục tiêu, thuộc 3-7 ở EP03).

Việc phải kiểm chứng trên Upload-Post (chỉ số lấy được, số liệu theo khung giờ) nằm ở danh sách kiểm chứng của [EP06](../EP06_Phe_duyet_va_dang_len_mang_xa_hoi/00_Cau_hoi_cho_khach.md), mục 9.

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (các câu mới đã thêm với mã S07-xx).

## 1. Kiểm tra phạm vi

**Những thứ đã cố ý loại khỏi EP07:**

| Không làm | Lý do |
|---|---|
| Xếp hạng giữa các tài năng | [YK2] §13: xem xét sau |
| Bảng phân tích tổng hợp toàn công ty cho quản lý | [YK2] chỉ có số liệu theo từng tài năng (7-1, 3-10); M-06 đã có số người theo dõi từng người |
| Màn đổi giờ đăng cho quản lý | Không có trong [YK2]; giờ riêng ghi trong hồ sơ (S07-07) |
| Thu thập xu hướng chung của mạng xã hội | [YK2] §13: xem xét sau |
| Xuất báo cáo riêng | File CSV hằng tháng trong OneDrive đã đủ (S07-03) |

## 2. Câu phải có trả lời trước khi viết mã

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S07-06 | 8-1 | Thế nào là "đủ số liệu", và chọn giờ đăng thế nào? | Từ 20 bài ở ít nhất 3 khung giờ; chọn khung có (thích + bình luận) / lượt xem cao nhất. Trước đó theo giờ trong chỉ dẫn thuật toán | Trong phạm vi: cách làm của 8-1 |
| B1 | 8-1, 4-1 | Giờ đăng chốt lúc nào? | Mỗi sáng (đã có bản tiếng Nhật ở file câu hỏi EP04) | Trong phạm vi |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S07-01 | 8-7 | Cập nhật số liệu bài trong bao lâu? | 30 ngày sau khi đăng; sau đó giữ nguyên số cuối | Trong phạm vi |
| S07-02 | 8-7 | Lấy số liệu lúc mấy giờ? | 4:00, để lô buổi sáng (bắt đầu 5:00) có số liệu; màn hình ghi "số liệu tính đến …". Thay đề xuất 6:00 của C5 | Trong phạm vi |
| S07-03 | 8-8 | File kết quả trong thư mục tài năng có dạng gì? | \`実績/サマリー.md\` (AI đọc, ghi đè mỗi ngày) và \`実績/YYYY-MM.csv\` (quản lý mở bằng Excel) | Trong phạm vi: §7-2 |
| S07-04 | 3-10 | Hiện tổng 3 mạng không? (別紙B số 20 và 別紙C gọi là "合算の表示") | Hiện từng mạng và thêm tổng; mục tiêu vẫn theo từng mạng | Trong phạm vi |
| S07-05 | 6-7 | Diễn biến người theo dõi hiện ở đâu? [AG] chưa có | Chạm vào một mạng ở T-06 thì mở biểu đồ 30 ngày | Trong phạm vi: 6-7 yêu cầu hiện diễn biến |
| S07-07 | 8-1 | Muốn cố định giờ đăng cho một tài năng thì sao? | Ghi trong mục \`個別の指示\` của hồ sơ; không làm màn đổi giờ | Trong phạm vi |
| S07-09 | 6-7 | T-13 hiện số liệu cộng hay từng mạng? | Hiện tổng, chạm vào thấy từng mạng; mỗi mạng tính "lượt xem" khác nhau | Trong phạm vi |

## 4. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| S07-06 | 投稿の時刻を実績から決めるのは、タレントの投稿が20本以上あり、3つ以上の時間帯に分かれている場合とし、反応の割合（いいねとコメントの数÷表示回数）が最も高い時間帯を選びます。それまでは、アルゴリズム対策の指示の時刻とします。この形でよろしいでしょうか。 |
| S07-01 | 投稿の実績は、投稿から30日以内の投稿について毎日取り込み直し、30日を過ぎた投稿はその時点の数字を残す形でよろしいでしょうか。 |
| S07-02 | 実績の取り込みは毎日午前4時に行い、毎朝の声かけの準備に前日までの数字を使えるようにします。画面には「◯月◯日◯時点」と表示します。この形でよろしいでしょうか。 |
| S07-03 | 実績は、タレント別フォルダの「実績」フォルダに、AIコーチが読むまとめのファイル（サマリー.md、毎日書き換えます）と、マネージャーが Excel で開ける月ごとのファイル（例：2027-03.csv）を作ります。この形でよろしいでしょうか。 |
| S07-04 | 別紙B の20番と別紙C では「フォロワー数の合算の表示」としているため、SNS ごとのフォロワー数に加えて、3つの SNS の合計も表示します。目標は SNS ごとのままとします。この形でよろしいでしょうか。 |
| S07-05 | 6-11「6-7」の「フォロワー数の移り変わり」は画面案にないため、マイページ（T-06）で SNS を押すと、30日間のフォロワー数のグラフを表示する形を提案します。よろしいでしょうか。 |
| S07-07 | 特定のタレントの投稿の時刻を決めたい場合は、管理画面に時刻を変える操作は設けず、タレントの情報のファイルの「個別の指示」に書いていただく形でよろしいでしょうか。 |
| S07-09 | 投稿の予定と結果（T-13）の表示回数・いいね・コメントは、3つの SNS の合計を表示し、押すと SNS ごとの数字を表示します。SNS によって「表示回数」の数え方が異なる点はご了承ください。 |

## 5. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 8-7 | 🔴 | 🟢 khi kiểm chứng xong chỉ số Upload-Post |
| 8-8 | 🟡 | 🟢 |
| 3-10 | 🟡 | 🟢 |
| 6-7 | 🟡 | 🟢 |
| 8-1 | 🔴 | 🟡 khi có S07-06, B1; 🟢 khi biết Upload-Post có lượt xem |
| 8-9 | 🟡 | 🟢 sau khi thử endpoint best-times trên tài khoản thật (đã bỏ S07-08: đã có nguồn dữ liệu) |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| B1 | Giờ đăng được quyết định lúc nào | No.56 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S07-07 | Giờ riêng cho một tài năng | No.25 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |

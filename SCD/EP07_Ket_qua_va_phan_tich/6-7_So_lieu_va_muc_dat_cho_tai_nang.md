# 6-7 Số liệu và mức đạt cho tài năng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Màn Manager xếp hạng cố gắng — PROPOSAL của nguồn:** Trang 28 có màn mới chưa mã: top 3 và bảng tăng follower/ngày đăng/thử thách, tổng hợp hoặc từng chỉ số, chu kỳ 7/30 ngày; trang 29 hỏi trọng số. **Giới hạn:** Không tự cấp M-22 hoặc hiển thị ranking trong app Talent. KPI, trọng số, hòa hạng, thiếu số liệu, quyền và nghiệm thu chưa chốt; QA bảo lưu No.50 nêu ngoài phạm vi theo SOW/báo giá chưa có bản ký độc lập. Nguồn `UI-M20 PDFtrang3; UI-M20 PDFtrang28; UI-M20 PDFtrang29; ISS22-P PDFtrang9`; EV `EV-1213;EV-1238;EV-1239;EV-1249`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Mục tiêu ban đầu 10000 mỗi SNS; Manager đổi theo Talent. Follower hiện tại có thể giảm; tổng bài là lũy kế; bài cũ xem được. Chỉ số thực tế giới hạn theo dịch vụ.

Streak/reset hẹn quyết khi vận hành; không tự lấy số trong hình làm giá trị khách duyệt.

Căn cứ: `T19:11,23;M19:11,15;BF19:13` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0563;EV-0575;EV-0596;EV-0600;EV-0625`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-11, chức năng 6-7; UC-09 |
| Màn hình [AG] | T-06 (người theo dõi, 続けて投稿), T-13 (số liệu từng bài) |
| Tên trong mã nguồn | Talent Performance View |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; [AG] thiếu chỗ hiện diễn biến người theo dõi (S07-05) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ⚠ 確認22 | ✅ | ⚠ S07-05 | ✅ | ⚠ đội đề xuất | ⚠ 8-7 |

## Mục đích

Ứng dụng tài năng hiện: số liệu từng bài, số ngày đăng liên tục, diễn biến số người theo dõi, còn bao nhiêu tới mục tiêu (§6-11 chức năng 6-7). Chỉ số liệu của chính mình, không xếp hạng (giả định 確認40).

## Luồng chính

1. **T-13 (số liệu từng bài):** mỗi bài đã đăng hiện lượt xem, lượt thích, bình luận (cộng cả các mạng); chạm vào thì thấy từng mạng (S07-09).
2. **T-06:** "続けて投稿 N日" (số ngày đăng liên tục); khối người theo dõi và mục tiêu (3-10).
3. **Diễn biến người theo dõi:** chạm vào một mạng ở T-06 thì mở biểu đồ đường 30 ngày (S07-05).
4. **Còn bao nhiêu tới mục tiêu:** hiện dưới từng mạng ("あと 6,900人").

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Bài mới đăng chưa có số liệu | Hiện "—" và "số liệu cập nhật vào sáng mai" | S07-02 |
| Bài đăng ngoài hệ thống | Hiện trong T-13 với nhãn "SNS から投稿" | UC-09 |
| Mỗi mạng gọi "lượt xem" khác nhau | Cộng theo chỉ số tương ứng; giải thích ở màn chi tiết từng mạng | S07-09 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Ngày đăng liên tục: ngày có ít nhất 1 bài thành công; một ngày không đăng thì tính lại | Giả định; khách quyết khi vận hành ([KS] 確認22) | — |
| Chỉ dữ liệu của mình, không xếp hạng | Giả định (確認40) | 1-5 |
| Bài ngoài hệ thống cũng tính | Chốt | UC-09 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bài có IG 800 lượt xem, TT 440, thì T-13 hiện 1,240 và chạm vào thấy từng mạng.
2. Cho tài năng đăng 5 ngày liền, thì T-06 hiện 続けて投稿 5日.
3. Cho chạm vào Instagram ở T-06, thì thấy biểu đồ 30 ngày.
4. Tài năng A không gọi được API số liệu của tài năng B.

## Phụ thuộc

8-7, 8-3, 3-10, 2-4.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認22, 40.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S07-05 | Biểu đồ diễn biến người theo dõi | Không | Chạm vào mạng ở T-06 |
| S07-09 | T-13 cộng số liệu các mạng | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP07: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-11 (6-7), UC-09, 確認22, 40. [AG] trang 3 (T-06), trang 5 (T-13).

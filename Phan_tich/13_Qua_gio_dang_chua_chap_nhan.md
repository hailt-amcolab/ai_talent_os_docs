# Xử lý khi đến giờ đăng mà tài năng chưa chấp nhận bài

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **7-7** — Duyệt bài công việc khi Talent xin duyệt; trả lại phải có lý do; chờ duyệt không sửa theoGJ19§13. Quá giờ chưa duyệt thì không đăng/hủy và báo cả hai bên. Còn mở: Bật tính năng có áp mọi bài không, đích category/cá nhân và phê duyệt trên đường tự động vẫn KS 20261120 No.9,10,14. Căn cứ: `T19:18,22,30;M19:8,9;BF19:8`.
- **8-5** — Manager thao tác đăng lại tại M-08; nguồn mới mô tả đăng lại ngay, không có màn chọn giờ. Không tự động thử lại khi lỗi. Còn mở: BF19 trang 9 vẫn có nhánh Talent đăng lại dưới nhãn đề xuất, trong khi màn T17 không có nút; ghi khác biệt tác nhân. Đích SNS lỗi vẫn No.59; bỏ giả định hẹn sau 15 phút. Căn cứ: `M19:12;BF19:9;GJ19:17`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

Tổng hợp những gì [YK2] (AI育成OS_概要要件定義書_v2.docx) nói về trường hợp đến giờ đăng mà tài năng chưa 採用 (chấp nhận) bản nháp, kèm vị trí của từng điểm trong các file phân tích và các điểm còn thiếu cần hỏi khách. Viết ngày 16/11/2026.

**Ký hiệu:** ⚠ = nội dung dựa trên một mục 確認 (mục cần xác nhận); chỗ khách đã chốt ngày 17/11 ghi `[KS] 確認N` (tệp 21). Tệp này chỉ mô tả cách đăng 要確認; cách 自動投稿 không có bước chấp nhận ([KS] 確認25). Chức năng ghi theo mã trong [YK2] mục 6 (ví dụ 4-3).

## 1. Kết luận ngắn

- [YK2] chỉ tạo lịch đăng **sau khi** tài năng bấm 採用 (chấp nhận). Trước đó chưa có gì được hẹn giờ ở Upload-Post. Vì vậy không có tình huống "đã hẹn giờ mà tài năng chưa xác nhận" ([YK2] chức năng 4-3).
- Trường hợp **không chấp nhận** (không có bài) có quy định: ngày đó không đăng.
- Trường hợp **chấp nhận trễ, sau giờ đăng đã định** thì tài liệu không nói.

## 2. Những gì tài liệu có nói

| Tình huống | Xử lý | Nguồn [YK2] |
| --- | --- | --- |
| Tài năng không chấp nhận bản nháp trong ngày (cách đăng 要確認) | Ngày đó không đăng. Cách 自動投稿 không có bước chấp nhận | [KS] 確認25 |
| Không gửi ảnh hoặc video | Không đăng, vì Instagram, TikTok, YouTube không đăng được bài chỉ có chữ. Bản nháp không có ảnh hoặc video thì không chấp nhận được | ⚠ 確認26; chức năng 4-3 |
| Đến 2 giờ trước giờ đăng mà chưa có ảnh hoặc video | Gửi thông báo 催促 (nhắc nhở) cho tài năng, 1 lần mỗi ngày. Quản lý đổi được mốc 2 giờ | Chức năng 6-5, mục 5-2 |
| Nhiều ngày liên tục không đăng | 3 ngày thì huấn luyện viên AI nhắn tài năng; 7 ngày thì báo quản lý (số ngày xác nhận lại, [KS] 確認19). Quản lý đổi được hai mốc này | Mục 5-2, chức năng 3-9, ⚠ 確認19 |
| Bài cần quản lý duyệt nhưng đến giờ đăng chưa được duyệt | Không đăng, báo cả tài năng lẫn quản lý. Đề xuất: hủy lịch; muốn đăng thì tài năng chấp nhận lại | Chức năng 7-7, UC-07, ⚠ 確認36 |
| Giờ đăng do ai quyết | Hệ thống quyết theo từng tài năng: chưa đủ số liệu thì theo chỉ dẫn thuật toán của アデッソ, đủ số liệu thì theo khung giờ tương tác tốt. Tài năng không đổi được giờ | Mục 5-2, chức năng 8-1, UC-08, ⚠ 確認30 |

## 3. Các điểm này nằm ở đâu trong các file phân tích

| Điểm | File |
| --- | --- |
| 確認25: không chấp nhận thì không đăng | [04_Yeu_cau_chuc_nang.md:132](04_Yeu_cau_chuc_nang.md:132) (chức năng 4-3), [05_Quy_tac_nghiep_vu.md:61](05_Quy_tac_nghiep_vu.md:61) (quy tắc BR-C05) |
| 確認26: không có ảnh hoặc video thì không đăng | Hai chỗ trên, cộng [06_Workflow.md:139](06_Workflow.md:139) |
| Chức năng 6-5: nhắc 2 giờ trước giờ đăng | [02_Pham_vi.md:65](02_Pham_vi.md:65), [04_Yeu_cau_chuc_nang.md:150](04_Yeu_cau_chuc_nang.md:150), [05_Quy_tac_nghiep_vu.md:48](05_Quy_tac_nghiep_vu.md:48) (BR-B02), [06_Workflow.md:110](06_Workflow.md:110) (sơ đồ), [07_Du_lieu_va_ERD.md:79](07_Du_lieu_va_ERD.md:79) (bảng cài đặt chung) |
| 確認19: mốc 3 ngày và 7 ngày | [04_Yeu_cau_chuc_nang.md:107](04_Yeu_cau_chuc_nang.md:107) (chức năng 3-9), [05_Quy_tac_nghiep_vu.md:49](05_Quy_tac_nghiep_vu.md:49) (BR-B03), [06_Workflow.md:359](06_Workflow.md:359) |
| 確認36: quá giờ chưa duyệt thì hủy lịch | 03, 04, 05, 06 (8 chỗ), 11 (mục E07), 12 |
| 確認30: tài năng không đổi được giờ đăng | 00, 03, 04, 05, 06, 10, 11, 12 |

## 4. Điểm tài liệu chưa nói (cần hỏi khách)

| STT | Câu hỏi | Vì sao cần | Đã ghi ở file nào |
| --- | --- | --- | --- |
| Q1 | Tài năng chấp nhận **sau khi giờ đăng đã qua** thì hệ thống đăng ngay, dời sang giờ tốt kế tiếp trong ngày, hay để sang hôm sau? | Tài năng không tự đổi giờ được (⚠ 確認30), nên hệ thống phải tự quyết. Giờ đăng được định trước khi chấp nhận, vì mốc nhắc 2 giờ tính theo giờ đó (mục 5-2) | Mục 4.2 câu 8 và mục E01 trong [11_Edge_case_va_rui_ro.md](11_Edge_case_va_rui_ro.md); câu hỏi gần giống ở [06_Workflow.md:154](06_Workflow.md:154)  Q&A No.56 đang hỏi: đề xuất dời sang khung giờ tốt kế tiếp. Bản nháp chưa dùng giữ 7 ngày rồi ẩn (Q&A No.55, đang hỏi). |
| Q2 | Bản nháp **không ai chấp nhận** thì hết hạn cuối ngày, hay giữ lại để hôm sau dùng tiếp? | Ảnh hưởng trạng thái bài đăng (6 trạng thái, mục 5-1) và màn hình danh sách bài | Mục 4.2 câu 9 trong [11_Edge_case_va_rui_ro.md](11_Edge_case_va_rui_ro.md) |
| Q3 | Có nhắc tài năng khi **đã gửi ảnh hoặc video nhưng chưa bấm chấp nhận** không? | Chức năng 6-5 chỉ nhắc khi thiếu ảnh hoặc video. Tài năng đã gửi ảnh mà quên bấm thì không được nhắc, bài không đăng | Mục 4.2 câu 10 trong [11_Edge_case_va_rui_ro.md](11_Edge_case_va_rui_ro.md) |
| Q4 | Ngày bỏ lỡ có làm đứt chuỗi ngày đăng liên tục không, và có báo quản lý ngay trong ngày không? | 確認22 đề xuất đếm theo ngày có ít nhất 1 bài. Quản lý hiện chỉ được báo ở mốc 7 ngày (確認19) | Mục 4.3 câu 6 và mục E11 trong [11_Edge_case_va_rui_ro.md](11_Edge_case_va_rui_ro.md) |

## 5. Luồng hiện tại theo tài liệu

Sơ đồ chỉ vẽ những gì [YK2] đã nói. Nhánh "chấp nhận sau giờ đăng" để dấu hỏi vì chưa có quy định (Q1).

```mermaid
flowchart TD
    A["Cách đăng 要確認: tin theo khung sáng (8 giờ), trưa, tối<br/>huấn luyện viên AI gửi 3 chủ đề ([KS] 確認18)"] --> B["Tài năng chọn chủ đề, AI viết bản nháp"]
    B --> C{"Đã gửi ảnh hoặc video?"}
    C -- "Chưa, đến trước giờ đăng 2 tiếng" --> D["Nhắc 1 lần (chức năng 6-5)"]
    D --> C
    C -- "Có" --> E{"Tài năng bấm chấp nhận?"}
    C -- "Không gửi cả ngày" --> X["⚠ Xử lý thế nào: xác nhận sau ([KS] 確認26)"]
    E -- "Không bấm" --> Y["Ngày đó không đăng ([KS] 確認25)<br/>Bản nháp: hết hạn hay giữ lại? (Q2)"]
    E -- "Bấm trước giờ đăng" --> F{"Gửi quản lý duyệt?"}
    E -- "Bấm sau giờ đăng" --> Q["Chưa có quy định (Q1)"]
    F -- "Không" --> G["Hẹn giờ ở Upload-Post"]
    F -- "Có" --> H{"Duyệt trước giờ đăng?"}
    H -- "Có" --> G
    H -- "Không" --> Z["Không đăng, báo tài năng và quản lý<br/>Đề xuất hủy lịch (確認36)"]
    X --> N["Đếm ngày không đăng: 3 ngày AI nhắn, 7 ngày báo quản lý (xác nhận lại, [KS] 確認19)"]
    Y --> N
```

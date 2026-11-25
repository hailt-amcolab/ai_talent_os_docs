<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### PR

Talent tự thêm PR vào bài; OS không tự phân loại bài công việc hoặc xác định bài cần PR. Nguồn báo đã thử nhãn video AI qua provider.

**Còn mở/giới hạn:** Không dùng nguồn này để tự xác nhận kết quả thử hoặc tuân thủ pháp lý; duyệt bài công việc vẫn do Talent yêu cầu. Căn cứ: `KS 20261122!G33:I33 (No.32)`; `EV-1322`; TR-7-7;TR-5-5.

<!-- /DELIVERY24112026 -->

# 5-5 Ghi rõ video do AI tạo

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Âm nhạc và hoàn tất trong ứng dụng SNS — PROPOSAL của nguồn:** Đề nghị hai đường: đăng qua API với nhạc gốc/đủ quyền và hoàn tất trong app SNS khi cần nhạc thịnh hành hoặc chỉnh sửa đặc biệt; video AI dùng nhạc phù hợp quyền sử dụng. **Giới hạn:** Không coi nhãn copyright-free là bảo đảm quyền thương mại. Chưa xác minh thao tác bàn giao Instagram/TikTok, tài khoản áp dụng và quyền từng bản nhạc. Nguồn `ISS22-P PDFtrang4; ISS22-P PDFtrang6; ADV22 PDFtrang6`; EV `EV-1244;EV-1246;EV-1257`.

**PR và nhãn AI theo nền tảng — PROPOSAL của nguồn:** Đề nghị gắn PR cho quảng cáo, không cho mọi bài; nhãn AI áp dụng theo yêu cầu từng SNS. **Giới hạn:** Nhãn AI đã có ở YK2/GJ/REQ-0071; slide nói chưa có không xóa yêu cầu cũ. Ghi PR trong caption không tự thay disclosure của nền tảng hoặc chứng minh tuân thủ; người xác định quảng cáo chưa đủ chính sách. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang7; ADV22 PDFtrang3; ADV22 PDFtrang11`; EV `EV-1242;EV-1247;EV-1254;EV-1262`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Video có thể đăng 3 SNS đã nối; video AI cần ghi nhãn.

Codec/độ dài/cách nhãn từng SNS vẫn thuộc kiểm dịch vụ; không dùng ví dụ 15 giây làm độ dài bắt buộc.

Căn cứ: `T19:20,21,30;BF19:12` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0572;EV-0573;EV-0582;EV-0624`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-8, chức năng 5-5; §5-7; UC-06 前提 |
| Màn hình [AG] | Không có màn riêng |
| Tên trong mã nguồn | AI Content Labeling |
| Mức sẵn sàng | 🔴 Đỏ – chưa biết Upload-Post có bật được nhãn "nội dung do AI tạo" của từng mạng không (C3) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ C3 | ⚠ | ⚠ C3 | ✅ | ✅ | ❌ kiểm chứng Upload-Post | ⚠ đội đề xuất | ⚠ 8-3 |

## Mục đích

Khi đăng video do AI tạo, ghi rõ là do AI tạo theo quy định của từng mạng (§6-8 chức năng 5-5, §5-7).

## Luồng chính

1. Khi 8-3 gửi bài sang Upload-Post: nếu bài dùng tư liệu có nguồn `ai_generated` thì bật nhãn AI của từng mạng qua Upload-Post (nếu có tham số tương ứng).
2. Mạng nào Upload-Post không hỗ trợ: thêm một dòng vào cuối chú thích (ví dụ "※この動画は AI で作成しています") hoặc hashtag (C3). Dòng này tính vào giới hạn độ dài (4-1).
3. Ghi lại cách đã gắn nhãn cho từng mạng.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Video tài năng tự làm bằng công cụ AI khác | Hệ thống không biết; nhắc tài năng tự ghi rõ khi lưu video tự làm (S05-10) | S05-10 |
| Không gắn được nhãn | Không đăng mạng đó, báo như đăng lỗi (8-5) | [Đề xuất nội bộ] |
| Quy định của mạng thay đổi | Xử lý trong hợp đồng bảo trì | §11 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Video do AI tạo phải ghi rõ | Chốt | §5-7, §6-8, UC-06 前提 |
| Cách ghi theo quy định từng mạng | Chốt (cách làm cụ thể chờ C3) | §6-8 |

## Dữ liệu

`post_platform_results` (8-3) thêm `ai_label_method` (`platform_flag`, `caption_text`, `none`).

## Tích hợp

Upload-Post (tài liệu tra 17/11): TikTok `is_aigc` **chỉ áp dụng khi đăng thẳng (Direct Post)**; Instagram `is_ai_generated` hiện nhãn "AI info" và **không gỡ được sau khi đăng**; YouTube `containsSyntheticMedia`. `is_ai_generated` là tên thay thế dùng chung. Vẫn phải thử trên tài khoản thật, nhất là chế độ đăng TikTok.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bài có video AI, thì trên cả 3 mạng của tài khoản thử đều thấy nhãn AI hoặc dòng ghi chú.
2. Cho bài chỉ có ảnh tài năng chụp, thì không có nhãn.

## Phụ thuộc

8-3 (đăng bài), 5-1 (nguồn tư liệu), kiểm chứng Upload-Post.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| C3 | Upload-Post có bật nhãn AI không; không có thì thêm dòng chữ | Có | Thêm dòng chữ |
| S05-10 | Video tự làm bằng AI khác | Không | Nhắc tài năng tự ghi |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-7, §6-8 (5-5), §11, UC-06 前提. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) C3.

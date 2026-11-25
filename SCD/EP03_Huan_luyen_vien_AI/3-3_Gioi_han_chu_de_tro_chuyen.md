<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### Tâm sự nghiêm trọng

Không làm thông báo Manager về tâm sự nghiêm trọng. G17 nói chỉ dẫn AI có thể hướng dẫn tìm hỗ trợ; toàn bộ hội thoại được lưu và Manager đọc được.

**Còn mở/giới hạn:** H/I chỉ chốt không thông báo, không chọn trọn mọi phương án của QA No.93 hoặc bảo đảm AI phát hiện đúng. Căn cứ: `KS 20261122!G17:I17 (No.16)`; `EV-1318`; QA No.93;TR-3-3.

<!-- /DELIVERY24112026 -->

# 3-3 Giới hạn chủ đề trò chuyện

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Ứng xử tối thiểu với tâm sự nghiêm trọng — PROPOSAL của nguồn:** Không đề nghị khôi phục thông báo Manager; đề nghị Momo hướng dẫn liên hệ phụ huynh/Manager/kênh hỗ trợ và lưu dấu có hội thoại. **Giới hạn:** Không tự thêm lại cảnh báo Manager đã bị loại bởi KS F22. Câu chữ, loại dấu vết, quyền xem và retention còn No.93; nguồn không cung cấp địa chỉ hỗ trợ cụ thể đã được xác minh. Nguồn `ISS22-P PDFtrang7; ADV22 PDFtrang7`; EV `EV-1247;EV-1258`.

**Thông báo: mở là xử lý và hình cảnh báo cũ — FACT của nguồn:** M-02 mới vẫn ghi mở thông báo là 対応済み; hình tablet/PC vẫn có cảnh báo tâm sự nghiêm trọng và từ cấm. **Giới hạn:** QA No.97 vẫn Open, không tự chọn A/B. Hình không khôi phục chức năng KS F22 đã bỏ; email và người phụ trách còn No.75/87/88. Nguồn `UI-M20 PDFtrang5; UI-M20 PDFtrang9; UI-M20 PDFtrang29`; EV `EV-1215;EV-1219;EV-1239`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Không báo tâm sự nghiêm trọng:** Không làm chức năng báo Manager khi có tâm sự nghiêm trọng. Hội thoại phục vụ tăng follower, tập trung hoạt động nghệ thuật/công việc và cảm quan; không tư vấn tình yêu. Ban đầu chưa đặt ranh giới quá chi tiết. **Còn mở/giới hạn:** No.93 còn Open, không tự chọn trọn phương ánB vì nguồn chỉ loại thông báo, chưa quy định đầy đủ cách tiếp nhận/chuyển hướng. Không suy số lượt chat không giới hạn từ đây. Nguồn `KS 20261120!F22;確認事項!K56;20261120!F28:F29`; bằng chứng `EV-0977`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Phạm vi hội thoại ngoài đăng bài, sức khỏe/rời công ty và thông báo tâm sự nghiêm trọng vẫn được hỏi tại KS 20261120 No.21,27,28.

Không dùng sự xuất hiện loại thông báo trong hình để tự chốt được tư vấn mọi chủ đề hoặc số lượt hội thoại.

Căn cứ: `BF19:14,18;M19:6,27;T19:16` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0626;EV-0630;EV-0591;EV-0612;EV-0568`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-5, chức năng 3-3; §5-5; 別紙A (深刻な相談) |
| Màn hình [AG] | T-08; M-02 (thông báo); M-09 (nhãn "深刻な相談としてお知らせ済み") |
| Tên trong mã nguồn | Topic Restriction & Escalation |
| Mức sẵn sàng | 🔴 Đỏ – chưa có tiêu chí "chuyện nghiêm trọng" và chưa có cách xử lý khi có dấu hiệu tự hại, nhất là với người vị thành niên (S03-02, S03-04). Phần chặn chủ đề ngoài lề làm được ngay |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ❌ S03-02 | ❌ S03-04 | ⚠ đội đề xuất | ✅ | ✅ OpenAI | ⚠ khó đo, cần bộ câu thử | ⚠ 7-4 |

## Mục đích

AIコーチ chỉ trò chuyện về đăng bài, mạng xã hội, hoạt động của tài năng, cùng lời chào và chuyện ngắn. Từ chối việc khác bằng câu cố định. Gặp chuyện sức khỏe hoặc muốn rời công ty thì vẫn trò chuyện tiếp và báo quản lý (§6-5 chức năng 3-3, §5-5).

## Tác nhân

Hệ thống, chạy cho mỗi tin nhắn của tài năng.

## Luồng chính

1. Trước khi trả lời, phân loại tin nhắn của tài năng bằng một lần gọi AI riêng, kết quả là một trong: `normal` (bình thường), `off_topic_request` (nhờ viết văn hay làm video không liên quan), `serious_health` (sức khỏe thể chất, tinh thần), `serious_leave` (muốn rời công ty, ngừng hoạt động), `danger` (dấu hiệu tự hại, nguy hiểm; S03-02).
2. `normal`: trả lời như thường (3-4).
3. `off_topic_request`: trả lời bằng câu từ chối cố định (S03-03), rồi kéo về chủ đề đăng bài.
4. `serious_health`, `serious_leave`: vẫn trò chuyện bình thường, có cảm thông; tạo thông báo 深刻な相談 (chuyện nghiêm trọng) cho Manager phụ trách (phạm vi loại thông báo này vẫn chờ KS20261120 No.21; không coi đã chốt); đánh dấu tin nhắn để M-09 hiện nhãn.
5. `danger`: như bước 4, cộng thêm câu an toàn cố định có thông tin nơi tư vấn (S03-02).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Gọi phân loại lỗi | Trả lời như thường, nhưng lời nhắc chính vẫn có quy tắc chủ đề (3-1 phần 1). Ghi nhật ký để xem lại | [Đề xuất nội bộ] |
| Nhiều tin nghiêm trọng liên tiếp của cùng tài năng | Nếu đã có thông báo 深刻な相談 chưa xử lý của tài năng đó, không tạo thêm; chỉ đánh dấu tin | [Đề xuất nội bộ], S03-10 |
| Chuyện riêng tư không liên quan | Trả lời ngắn rồi kéo về chủ đề | §5-5; 確認23 |
| AI bỏ sót chuyện nghiêm trọng | Có thể xảy ra (AI không chắc chắn). Quản lý vẫn đọc được mọi hội thoại ở M-09 | §11 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Chủ đề được trả lời | Đăng bài, mạng xã hội, hoạt động của tài năng, lời chào, chuyện ngắn | Chốt | §6-5, §5-5 |
| Câu từ chối | Đội soạn, khách duyệt | Tham số | S03-03 |
| Loại chuyện nghiêm trọng | Sức khỏe, rời công ty; thêm dấu hiệu nguy hiểm | Chốt + đề xuất | §6-5; S03-02, S03-04 |
| Câu an toàn khi có dấu hiệu nguy hiểm | Đội soạn, khách duyệt | Tham số | S03-02 |

## Dữ liệu

`coach_messages.flags`: kết quả phân loại. Thông báo quản lý: bảng thông báo của 7-4, loại 深刻な相談.

## Màn hình

- T-08: câu trả lời hoặc câu từ chối.
- M-02: thông báo loại 深刻な相談. M-09: nhãn trên tin nhắn ([AG] trang 8).

## Tích hợp

OpenAI: một lần gọi phân loại, một lần gọi trả lời.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

Đội soạn bộ câu thử (ít nhất 50 câu tiếng Nhật, chia theo 5 loại) và đo trên bộ đó trước mỗi lần đổi lời nhắc.

1. Cho tin "宿題の作文を書いて" (viết hộ bài văn), thì AIコーチ trả lời bằng câu từ chối cố định và gợi ý quay về đăng bài.
2. Cho tin "最近ずっと体調が悪い" (dạo này luôn mệt), thì AIコーチ vẫn trả lời cảm thông, và mọi quản lý thấy thông báo 深刻な相談 ở M-02.
3. Cho tin có dấu hiệu tự hại, thì câu trả lời có câu an toàn cố định và quản lý được báo.
4. Cho 3 tin nghiêm trọng liên tiếp khi thông báo đầu chưa xử lý, thì chỉ có một thông báo.
5. Trên bộ câu thử, tỉ lệ bắt đúng chuyện nghiêm trọng đạt mức khách đồng ý (đề xuất: 90% trở lên).

## Ngoài phạm vi của chức năng này

- Gửi thư hay gọi điện cho quản lý khi có chuyện nghiêm trọng: thông báo chỉ hiện trên màn hình quản trị (7-4).
- Quản lý liên hệ tài năng ngoài hệ thống (UC-10).

## Phụ thuộc

7-4 (thông báo quản lý; tạm ghi vào bảng thông báo). 3-4.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認17, 23.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-02 | Dấu hiệu tự hại, nguy hiểm thì xử lý thế nào | Có | — |
| S03-04 | Những gì tính là chuyện nghiêm trọng | Có | Sức khỏe, rời công ty |
| S03-03 | Câu từ chối cố định | Không | Đội soạn bản nháp |
| S03-10 | Không tạo thông báo trùng | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-5, §6-5 (3-3), §11, UC-10, 別紙A, 確認17, 23.
- [AG] trang 3 (T-08), trang 6 (M-02), trang 8 (M-09).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.18 (đã chốt): quy tắc chủ đề, cách nói và câu từ chối với tài năng vị thành niên **không phải chức năng của hệ thống**. アデッソ viết vào file chỉ thị cho AI ([YK2] 7-5). Hệ thống chỉ tính tuổi từ ngày sinh và hiển thị tham khảo. Không làm logic riêng cho vị thành niên.


</details>

# 4-2 Yêu cầu sửa và viết lại

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Viết lại không giới hạn:** Không giới hạn số lượt nhờ AI viết lại; nguồn ghi rõ đổi quyết định2lần ngày17/11. **Còn mở/giới hạn:** Khớp DEC-0001 đã có; không cấp quyết định trùng, không dùng số2cũ ở PDF/QA để chặn. Nguồn `KS 確認事項!K65`; bằng chứng `EV-0984`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Không giới hạn số lần AI viết lại theo DEC-0001; quyền sửa tay giữ nguyên. Các mô tả hai lượt trong PDF19/11 là lịch sử bị thay đúng chủ đề.

Xử lý lỗi/kết quả không rõ/gửi lặp còn do đội thiết kế.

Căn cứ: `T19:18,27,29;USER:DEC-0001` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0570;EV-0579;EV-0581`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

> **Quyết định20/11 — DEC-0001:** người dùng chốt áp dụng H65, không giới hạn số lần nhờ AI viết lại. Thay giới hạn hai lần trong đúng chủ đề; các điều kiện sửa/duyệt và chính sách chi phí khác giữ nguyên. Xem [bản ghi quyết định](../../docs/requirement-review/corrections-2026-11-19/REPORT.md).

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-6, chức năng 4-2; UC-05 |
| Màn hình [AG] | T-09 (nút 直しを依頼), T-08 |
| Tên trong mã nguồn | Draft Revision |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ✅ | ✅ OpenAI | ⚠ đội đề xuất | ⚠ 4-1 |

## Mục đích

Tài năng nói điểm muốn sửa trong hội thoại, AI viết lại bản nháp. Tài năng cũng có thể đưa câu chữ muốn dùng để AI viết lại theo (§6-6 chức năng 4-2).

## Tác nhân và quyền

- Tài năng: yêu cầu sửa bản nháp của mình. Sửa chữ trực tiếp được ([KS] 確認28), hoặc nhờ AI viết lại không giới hạn số lần (DEC-0001, áp dụng KS H65).

## Luồng chính

1. Ở T-09 bấm 直しを依頼 (nhờ sửa), mở T-08 với bản nháp đang xem làm ngữ cảnh. Hoặc tài năng nói thẳng trong T-08 về bản nháp gần nhất.
2. Tài năng nói điểm muốn sửa, hoặc dán câu chữ muốn dùng.
3. AI viết lại theo yêu cầu, giữ loại bài, giữ giới hạn độ dài (4-1), tránh từ cấm.
4. Lưu thành **phiên bản mới** của cùng bản nháp. T-09 luôn hiện phiên bản mới nhất.
5. Tin trả lời trong T-08 có nút 投稿案を見る.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Bản nháp đã được chấp nhận (đã hẹn giờ hoặc chờ duyệt) | Không sửa được. Báo "bài đã chấp nhận; muốn đổi thì liên hệ quản lý để hủy" | S04-09; 7-2 (chỉ quản lý hủy được) |
| Yêu cầu không rõ là sửa bản nháp nào (có nhiều bản nháp) | AI hỏi lại, hoặc dùng bản nháp tài năng mở gần nhất | [Đề xuất nội bộ] |
| Câu chữ tài năng đưa vào có từ cấm | Vẫn viết lại; việc chặn xảy ra ở bước chấp nhận (4-4) | §6-6 chức năng 4-4 |
| OpenAI lỗi | Như 3-4: báo lỗi, cho gửi lại | §6-5 |
| Muốn quay về phiên bản cũ | Tài năng nói trong hội thoại, AI lấy lại phiên bản đó thành phiên bản mới | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Số lần nhờ AI viết lại | Không giới hạn số lần mỗi bản nháp; không dừng đăng chỉ vì đã dùng hai lượt (DEC-0001) | Người dùng chốt20/11 | DEC-0001; KS H65 |
| Chi phí mỗi lần | Khoảng 0,2–3 yên | Tham khảo | 確認29 |
| Tài năng sửa chữ trực tiếp | Được, ở màn bản nháp (T-09) | Chốt ([KS] 確認28) | — |

## Dữ liệu [Đề xuất nội bộ]

`draft_versions`: `draft_id`, `version`, `caption`, `hashtags[]`, `youtube_title`, `shot_guide`, `video_script`, `instruction` (yêu cầu sửa của tài năng), `created_at`. `drafts` trỏ tới phiên bản mới nhất.

## Màn hình

T-09: nút 直しを依頼. T-08: hội thoại sửa.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng nói "もっと短く", thì phiên bản mới ngắn hơn phiên bản trước và T-09 hiện phiên bản mới.
2. Cho tài năng dán câu "今日も頑張りました", thì chú thích mới có câu đó.
3. Cho bản nháp đã chấp nhận, khi tài năng nhờ sửa, thì không có phiên bản mới và có câu giải thích.
4. Cho bản nháp còn được phép sửa và đã viết lại bằng AI ít nhất hai lần, khi tài năng yêu cầu lần thứ ba hoặc tiếp tục các lần sau, thì hệ thống tiếp tục xử lý yêu cầu, không từ chối vì hết lượt và không tự đặt bài vào nhánh không đăng trong ngày (DEC-0001).
5. Cho tài năng tự sửa chữ, thì lưu bản sửa và không coi thao tác sửa tay đó là một lần AI viết lại.

## Phụ thuộc

4-1, 3-4, 3-1.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認28, 29.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S04-09 | Sau khi chấp nhận thì không sửa được | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-6 (4-2), §6-10 (7-2), UC-05, 確認28, 29. [AG] trang 4 (T-09).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.39, CR-21: tài năng sửa chữ trực tiếp **làm** ([KS] 確認28).


</details>

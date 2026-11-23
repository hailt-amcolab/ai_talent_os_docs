# 8-5 Thông báo khi đăng lỗi

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Talent đăng lại bài lỗi:** Lỗi lúc tới giờ đăng thì thông báo Talent; Talent đợi rồi đăng lại. Lỗi SNS hoặc mạng của Talent không cần thông báo Adesso. **Còn mở/giới hạn:** Không đồng nhất Adesso với mọi tài khoản Manager nếu chưa rõ. Không tự đặt thời gian chờ, số lần thử hoặc đích SNS; No.59 còn mở. Quyền Manager đăng lại trong bản19/11 chưa bị xóa bằng suy luận. Nguồn `KS 確認事項!K87;20261120!F13`; bằng chứng `EV-0971`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Manager thao tác đăng lại tại M-08; nguồn mới mô tả đăng lại ngay, không có màn chọn giờ. Không tự động thử lại khi lỗi.

BF19 trang 9 vẫn có nhánh Talent đăng lại dưới nhãn đề xuất, trong khi màn T17 không có nút; ghi khác biệt tác nhân. Đích SNS lỗi vẫn No.59; bỏ giả định hẹn sau 15 phút.

Căn cứ: `M19:12;BF19:9;GJ19:17` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0597;EV-0621;EV-0650`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 8-5; 別紙A (投稿の失敗) |
| Màn hình [AG] | T-13 (失敗), T-14; M-02, M-08 (nút 予約し直す) |
| Tên trong mã nguồn | Publish Failure Notification |
| Mức sẵn sàng | 🔴 Đỏ – [YK2] cho "tài năng hoặc quản lý" hẹn lại, [AG] chỉ cho quản lý (S06-04) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ⚠ S06-04 | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ⚠ khác [YK2] | ⚠ kiểm chứng mã lỗi | ⚠ đội đề xuất | ⚠ 8-3 |

## Mục đích

Đăng lỗi thì báo tài năng (kèm mạng lỗi và lý do) và hiện cảnh báo trên màn hình quản trị. Không tự đăng lại; người dùng hẹn lại (§6-10 chức năng 8-5).

## Luồng chính

1. Ghi thành công/thất bại riêng từng SNS; thông báo Talent và Manager phụ trách, nêu mạng và lý do.
2. Không tự đăng lại. Manager mở M-08 và bấm 予約し直す.
3. SD-M19 trang12/GJ19§17 mô tả đăng lại ngay; bỏ giả định tự hẹn sau15phút.
4. Chỉ mạng lỗi hay mọi mạng còn No.59; chưa coi lựa chọn chỉ mạng lỗi là đã chốt.
5. BF19 trang9 còn vẽ Talent bấm đăng lại như đề xuất, trong khi T-17 trang23 không có nút: giữ khác biệt actor để đối chiếu, không tự cấp quyền mới.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Lỗi do mất kết nối mạng xã hội | Thông báo nói rõ cần kết nối lại (8-6); hẹn lại chỉ bấm được khi đã kết nối lại | [Đề xuất nội bộ] |
| Hẹn lại cũng lỗi | Báo lại như lần đầu | §6-10 |
| Nhiều mạng lỗi cùng một bài | Một thông báo, liệt kê các mạng | [Đề xuất nội bộ] |
| Không tự đăng lại | Chốt | §6-10 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Báo tài năng kèm mạng và lý do; cảnh báo ở màn hình quản trị | — | Chốt | §6-10, 別紙A |
| Không tự đăng lại | — | Chốt | §6-10 |
| Ai đăng lại | M-08 mô tả Manager; BF19 trang9 còn nhánh Talent đề xuất | Khác biệt nguồn cần giữ | SD-M19 trang12; BF19 trang9 |
| Đăng lại mạng nào | Chỉ mạng lỗi | Đề xuất | S06-05 |
| Giờ đăng lại | Ngay theo mô tả mới; quyền/thao tác và đích SNS cần kiểm đúng phạm vi | GJ19§17; SD-M19 trang12 | BF19 trang9 còn đề xuất actor |

## Dữ liệu

`post_platform_results` (8-3) thêm `retry_of` (lần đăng gốc), `retried_by`.

## Màn hình

T-13 (失敗 và lý do), T-14 (thông báo), M-02, M-08 (biểu tượng đỏ, nút 予約し直す).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho TikTok lỗi, thì tài năng nhận thông báo có chữ TikTok và lý do; M-02 có thông báo.
2. Cho quản lý bấm 予約し直す, thì chỉ TikTok được hẹn lại, sau khoảng 15 phút.
3. Cho đăng lỗi, thì hệ thống không tự đăng lại khi chưa ai bấm.

## Phụ thuộc

8-3, 8-6, 7-4, 6-1.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認30, 38.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-04 | Chỉ quản lý hẹn lại | Có | Như [AG] |
| S06-05 | Chỉ đăng lại mạng lỗi, sau 15 phút | Không | Như đề xuất |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (8-5), 別紙A, 確認30, 38. [AG] trang 5 (T-13, T-14), trang 7 (M-08). [File 14](../../Phan_tich/14_Phan_tich_Phuong_an_man_hinh_ung_dung.md) §3.2 điểm 9.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.15, CR-15 (đã chốt): không tự đăng lại.
- Q&A No.59 (đang hỏi): nút "予約し直す" ở cả ứng dụng tài năng và màn quản trị; chỉ đăng lại mạng bị lỗi; giờ mới do AI chọn.

## Bổ sung từ tài liệu Upload-Post (17/11/2026)

- Bài hẹn giờ có thể bị từ chối lúc tới giờ đăng vì tài khoản đã chạm giới hạn ngày (Upload-Post kiểm lại lúc đăng). Xử lý như đăng lỗi cho đúng mạng đó.
- TikTok từ chối riêng một bài (`content_rejected`: `spam_risk`, `spam_risk_text`): báo tài năng sửa chú thích hoặc hashtag qua AI (4-2) rồi chấp nhận lại. Không gửi lại nguyên bài.
- Upload-Post tự tạm dừng tài khoản (`account_restricted`, ví dụ Instagram nghi spam 24 giờ, TikTok đăng quá nhiều 1 giờ): lỗi cho riêng mạng đó, ghi thời điểm hết tạm dừng. Upload-Post tự thử lại YouTube sau 2 giờ khi chạm giới hạn ngày của kênh; hệ thống không gửi thêm.
- Chi tiết: bộ Upload-Post §9, §12 (U19, U26).


</details>

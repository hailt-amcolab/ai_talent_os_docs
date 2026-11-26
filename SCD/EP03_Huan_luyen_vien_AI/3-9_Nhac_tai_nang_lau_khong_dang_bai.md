<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Khung lời nhắn hằng ngày

Giờ sáng/trưa/tối chỉnh ở M-18 ❶, mặc định 8/12/20. Sáng có kết quả hôm trước, chuỗi ngày, gợi ý chủ đề và thử thách. Trưa AI quyết nội dung theo chỉ thị 毎日の声かけ, không mặc định trưa là nhắc gửi ảnh. Tối nhắc nhiều ngày không đăng và báo đạt mục tiêu. Nhắc ảnh/video theo M-18 ❷, trước giờ đăng2giờ. Bài đăng auto không có lời nhắn theo7-7.

**Phần còn mở/giới hạn:** Không diễn giải ngoại lệ lời nhắn của bài auto thành dừng mọi hội thoại hay mọi báo cáo của Talent dùng auto.

Căn cứ: QA `Q&A!A73:J73 (No.73)`; `EV-1348` / `DEC-0032`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 3-9 Nhắc tài năng lâu không đăng bài

## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Đếm ngày đăng tự động:** Ngày có đăng tự động được tính là ngày đã đăng; trong thời gian vẫn có bài tự động thì không nhắc hoặc báo lâu không đăng. **Còn mở/giới hạn:** Không suy cả kỳ tự động đều được miễn nhắc khi thực tế không đăng; ngưỡng3/7 vẫn chưa được nguồn trả lời riêng. Nguồn `KS 20261120!F21`; bằng chứng `EV-0976`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

3 ngày nhắc Talent/7 ngày báo Manager là giá trị ban đầu chỉnh tại M-17; không phải con số cố định cho mọi đợt.

Áp dụng đếm ngày không đăng cho Talent ở chế độ tự động vẫn KS 20261120 No.20; cách đếm office chưa tự suy từ Talent.

Căn cứ: `M19:22;BF19:11;KS:20261120:20` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0607;EV-0623`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-5, chức năng 3-9; §5-2; UC-04; UC-09; 別紙A |
| Màn hình [AG] | T-08, T-14; M-02; M-17 (số ngày) |
| Tên trong mã nguồn | Inactive Talent Reminder |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ tham số | ⚠ đội đề xuất | ✅ | ⚠ đọc bài ngoài hệ thống (8-7) | ⚠ đội đề xuất | ⚠ 8-3, 8-7 |

## Mục đích

Tài năng không đăng đủ số ngày đã cài (mặc định 3) thì AIコーチ hỏi han. Không đăng tới mốc thứ hai (mặc định 7) thì báo quản lý (§6-5 chức năng 3-9).

## Luồng chính

1. Mỗi sáng trong lô buổi sáng, tính số ngày không đăng của từng tài năng ở 利用中: số ngày từ ngày có bài đăng thành công gần nhất tới hôm qua. Bài tự đăng ngoài hệ thống cũng tính nếu Upload-Post đọc được (UC-09). Chưa đăng bài nào thì tính từ ngày chuyển sang 利用中.
2. Số ngày **bằng** mốc 1: tin buổi sáng có thêm lời hỏi han (3-4), kèm thông báo 投稿がない日の声かけ (別紙A).
3. Số ngày **bằng** mốc 2: tạo thông báo 投稿のない日が続いたタレント cho Manager phụ trách (7-4, SD-M19 trang6).
4. Đăng lại thì đếm lại từ 0.

Dùng "bằng" chứ không dùng "từ … trở lên", để mỗi đợt không đăng chỉ nhắc một lần ở mỗi mốc.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Quản lý dừng đăng tự động của tài năng, hoặc dừng toàn bộ (7-5) | Không đếm những ngày đang dừng | [Đề xuất nội bộ], S03-05 |
| Tài khoản công ty | Không nhắc, không báo quản lý | B10 |
| Quản lý đổi mốc khi đang có tài năng vượt mốc mới | Không gửi bù; áp dụng từ ngày hôm sau | [Đề xuất nội bộ] |
| Lấy kết quả (8-7) lỗi nên không biết hôm qua có bài ngoài hệ thống không | Chỉ dùng bài đăng qua hệ thống; không báo quản lý nếu thiếu dữ liệu ngày hôm qua | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Mốc 1 (AIコーチ hỏi han) | 3 ngày | Tham số (M-17) | §5-2 |
| Mốc 2 (báo quản lý) | 7 ngày | Tham số (M-17) | §5-2 |
| Ngày tính theo | Giờ Nhật | [Đề xuất nội bộ] | — |

## Dữ liệu

Tính từ dữ liệu bài đăng (8-3, 8-7), không lưu thêm bảng. Lưu ngày đã nhắc để không nhắc trùng: `talent_nudges`: `talent_id`, `level` (1, 2), `streak_start_date`, `sent_at`.

## Màn hình

T-08 (lời hỏi han), T-14 (thông báo), M-02 (thông báo quản lý), M-06 (cột số ngày không đăng, 7-1), M-17 (hai mốc).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng đăng lần cuối 3 ngày trước, thì sáng nay tin buổi sáng có lời hỏi han.
2. Cho tài năng không đăng 4 ngày, thì sáng nay không có lời hỏi han nữa.
3. Cho tài năng không đăng 7 ngày, thì mọi quản lý thấy thông báo ở M-02 đúng một lần.
4. Cho quản lý đổi mốc 1 thành 2 ngày, thì từ hôm sau áp dụng mốc mới.
5. Cho tài năng bị dừng đăng tự động 5 ngày, thì không bị nhắc vì 5 ngày đó.

## Phụ thuộc

8-3, 8-7 (dữ liệu bài đăng), 7-4, 3-4, C-02 (cài đặt).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認19, 43.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-05 | Không đếm ngày đang dừng đăng tự động | Không | Như đề xuất |
| B10 | Tài khoản công ty không bị nhắc | Không | Như B10 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §6-5 (3-9), UC-04, UC-09, 別紙A, 確認19, 43.


</details>

</details>

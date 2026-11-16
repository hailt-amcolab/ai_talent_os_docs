# Tiếp tục công việc – bàn giao phiên 16/11/2026

File này để mở lại công việc ở máy khác hoặc phiên Claude Code mới. Đọc cùng [CLAUDE.md](CLAUDE.md). Mở phiên mới thì nói: "đọc TIEP_TUC.md rồi làm tiếp".

## 1. Đã làm xong trong phiên này

| Việc | Kết quả |
|---|---|
| Kiểm tra phương án màn hình mới [AG] (`アプリ画面案_AI育成OS.pdf`) | Sửa [file 14](Phan_tich/14_Phan_tich_Phuong_an_man_hinh_ung_dung.md); thêm mục 8 vào [file 10](Phan_tich/10_Giao_dien.md) (bảng đối chiếu 3 bộ mã màn hình); cập nhật file 00, 11 |
| Bảng câu hỏi tổng | [15_Cau_hoi_lam_ro_luong.csv](Phan_tich/15_Cau_hoi_lam_ro_luong.csv): 113 dòng = 確認1–56, A1–A10, B1–B13, C1–C6, S01–S03. Có cột Module |
| Chia module phát triển | [16_Chia_module_phat_trien.md](Phan_tich/16_Chia_module_phat_trien.md): EP01–EP10 |
| Bối cảnh hệ thống (SCD mức hệ thống) | [17_Tai_lieu_boi_canh_he_thong.md](Phan_tich/17_Tai_lieu_boi_canh_he_thong.md) |
| Hạ tầng | [18_Ha_tang_he_thong.md](Phan_tich/18_Ha_tang_he_thong.md): API trên Vercel, dữ liệu trên Supabase, worker trên VPS; câu hỏi I1–I8 (chưa đưa vào file 15) |
| Đặc tả từng chức năng | [SCD/](SCD/README.md): 60 file (54 chức năng + C-01〜C-06). **Đã viết đầy đủ EP01, EP02, EP03** (20 chức năng), mỗi module có `00_Cau_hoi_cho_khach.md`. Còn lại là bản khung |

## 2. Quyết định và quy ước đã thống nhất với người dùng

1. **Không xử lý các mục 確認 trong file câu hỏi của module.** 確認1–56 đã nằm trong bảng xác nhận của khách. Trong `SCD/EPxx/00_Cau_hoi_cho_khach.md` chỉ nhắc mã 確認 để biết chức năng nào đang chờ. Đề xuất và bản tiếng Nhật chỉ viết cho câu của đội (S/A/B/C/I).
2. **Mọi đề xuất phải trong phạm vi:** chỉ là cách làm của một trong 54 chức năng ở [YK2] chương 6, hoặc là yêu cầu chung đã có trong [YK2] (§7, §9, §10). Thứ gì cần thêm chức năng, màn hình, loại thông báo thì ghi vào bảng "Những thứ đã cố ý loại", không đề xuất.
3. **Không dùng n8n** cho hệ thống mới. n8n chỉ có trong tài liệu cũ [SM] trang 3 và 9, và đang chạy ứng dụng tin nhắn Instagram của khách; dùng chung thì rủi ro với [YK2] §9-1. File 18 chưa sửa theo kết luận này (xem mục 4).
4. Mã câu hỏi mới khi viết đặc tả: `S<số module>-<số>`, ví dụ S04-01. Thêm vào file 15 với Nhóm "S. Câu hỏi khi viết đặc tả (SCD)", Module, trạng thái "Chưa gửi khách".
5. File đặc tả viết tay xong thì **xóa dòng "Bản khung"** ở đầu file. Script [SCD/gen_ban_khung.py](SCD/gen_ban_khung.py) không ghi đè các file đó.

## 3. Cách viết một module (lặp lại cho EP04 trở đi)

1. Đọc mục §6-x của module trong [YK2], UC liên quan, các màn [AG] (xem bằng `Read` với `pages`), file 04, các dòng file 15 lọc theo Module.
2. Viết đầy đủ từng file chức năng theo mẫu trong [SCD/README.md](SCD/README.md) mục 4: bảng đánh giá R1–R9, luồng chính, luồng lỗi, quy tắc và giá trị (giá trị số → tham số), dữ liệu [Đề xuất nội bộ], màn hình, tích hợp, tiêu chí chấp nhận, ngoài phạm vi, phụ thuộc, câu hỏi mở.
3. Viết `00_Cau_hoi_cho_khach.md`: kiểm tra phạm vi, câu chặn, câu trước kiểm thử chấp nhận, thứ khách cung cấp, bản tiếng Nhật, mức sẵn sàng sau khi khách trả lời.
4. Thêm câu S vào file 15; thêm liên kết vào README; nếu mức sẵn sàng đổi thì sửa cả README mục 5 và biến `M` trong script.

Trích chữ: `.docx` bằng `python3` + `zipfile` (đọc `word/document.xml`); PDF bằng `pdftotext -enc UTF-8 -layout`.

## 4. Việc tiếp theo

| Ưu tiên | Việc |
|---|---|
| 1 | Viết đầy đủ **EP04** (bản nháp: 4-1, 4-2, 4-3, 4-4, 6-6) hoặc **EP10** (C-01 bộ trạng thái, là điểm nghẽn chung của 7-3, 7-2, 7-7, 8-5). Người dùng chưa chọn |
| 2 | Lần lượt EP05 → EP06 → EP07 → EP08 → EP09 |
| 3 | Đưa câu I1–I8 (file 18) vào file 15 nếu người dùng đồng ý |
| 4 | Cập nhật file 18: đổi dòng n8n thành "không dùng" kèm lý do (đã đề xuất, người dùng chưa trả lời) |
| 5 | Các tab Claude Doc (nguồn của file 00–12) chưa được cập nhật theo bản markdown trong máy |

Việc chưa quyết với khách nhưng ảnh hưởng nhiều module: kiểm chứng Upload-Post (8-2, 8-7, 8-9, 5-5, 7-7), cách ChatGPT ghi vào OneDrive (S02-01), quyền Microsoft Graph (S02-02).

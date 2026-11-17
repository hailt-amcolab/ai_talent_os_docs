# Tiếp tục công việc – bàn giao phiên 16/11/2026

File này để mở lại công việc ở máy khác hoặc phiên Claude Code mới. Đọc cùng [CLAUDE.md](CLAUDE.md). Mở phiên mới thì nói: "đọc TIEP_TUC.md rồi làm tiếp".

## 1. Đã làm xong trong phiên này

| Việc | Kết quả |
|---|---|
| Kiểm tra phương án màn hình mới [AG] (`アプリ画面案_AI育成OS.pdf`) | Sửa [file 14](Phan_tich/14_Phan_tich_Phuong_an_man_hinh_ung_dung.md); thêm mục 8 vào [file 10](Phan_tich/10_Giao_dien.md) (bảng đối chiếu 3 bộ mã màn hình); cập nhật file 00, 11 |
| Bảng câu hỏi tổng | [15_Cau_hoi_lam_ro_luong.csv](Phan_tich/15_Cau_hoi_lam_ro_luong.csv): 172 dòng = 確認1–56, A1–A10, B1–B13, C1–C6, I1–I8, S01–S10. Có cột Module |
| Chia module phát triển | [16_Chia_module_phat_trien.md](Phan_tich/16_Chia_module_phat_trien.md): EP01–EP10 |
| Bối cảnh hệ thống (SCD mức hệ thống) | [17_Tai_lieu_boi_canh_he_thong.md](Phan_tich/17_Tai_lieu_boi_canh_he_thong.md) |
| Mã nguồn | `apps/web` (Next.js 16, PWA, chỉ giao diện) và `apps/api` (Hono, PM2, Docker Compose, Caddy; có API `POST /api/v1/dev/push-test`). Quyết định tách FE và BE ghi ở đầu file 18 |
| Rủi ro kỹ thuật | [20_Rui_ro_ky_thuat.md](Phan_tich/20_Rui_ro_ky_thuat.md): RT01–RT12, kế hoạch 4 POC (Upload-Post, OneDrive/Graph, GMO, AI và video) đề xuất xong trước 01/12/2026 |
| Đối chiếu Q&A (bản 15/11) | [19_Doi_chieu_QA_bao_gia.md](Phan_tich/19_Doi_chieu_QA_bao_gia.md); cột "Q&A AMCOLAB" trong file 15; mục "Cập nhật theo Q&A" trong 26 file SCD và mục "Đối chiếu với file Q&A" trong 10 file câu hỏi module |
| Tra lại Graph và Upload-Post (17/11) | Bộ OneDrive §4.2, §9.1, §11.1; bộ Upload-Post §13.2a; SCD 3-10, 8-1, 8-9; đóng S07-08. Xem `agent_spec/KET_QUA_KIEM_CHUNG_17-11.md` §7 |
| Hạ tầng | [18_Ha_tang_he_thong.md](Phan_tich/18_Ha_tang_he_thong.md): API trên Vercel, dữ liệu trên Supabase, worker trên VPS; câu hỏi I1–I8 (đã đưa vào file 15) |
| Đặc tả từng chức năng | [SCD/](SCD/README.md): 60 file (54 chức năng + C-01〜C-06). **Đã viết đầy đủ cả 10 module EP01–EP10** (54 chức năng + C-01〜C-06), không còn bản khung; EP06 có danh sách kiểm chứng Upload-Post, mỗi module có `00_Cau_hoi_cho_khach.md`. Còn lại là bản khung |

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
| 1 | Gửi khách các câu S01–S10, A, B, C, I (mỗi module có bản tiếng Nhật trong `SCD/EPxx/00_Cau_hoi_cho_khach.md`). Có thể gom thành một bảng tiếng Nhật duy nhất |
| 2 | Kiểm chứng kỹ thuật: Upload-Post (danh sách ở `SCD/EP06…/00_Cau_hoi_cho_khach.md` mục 4), GMO môi trường thử (確認49), ChatGPT ghi qua MCP (S02-01), Kling qua fal.ai (5-1) |
| 3 | MCP có căn cứ trong 御見積書 前提条件A4 (trích ở Q&A số 45 của `AI-Talent-OS_Q&A表.xlsx`): cần sửa file 16 mục 1.1 điểm 4, `SCD/EP02/2-3`, S02-01, `SCD/EP03/3-1` (đã đề xuất, người dùng chưa trả lời) |
| 4 | File Q&A đã cập nhật (bản 15/11) → [19_Doi_chieu_QA_bao_gia.md](Phan_tich/19_Doi_chieu_QA_bao_gia.md). Việc tiếp: thống nhất No.58 (bài trả lại là cùng bài hay bài mới, khác C-01); đưa hình 5-1 cho No.51; xin 確認シート; không giao agent các phần CR-17〜CR-25 tới khi có trả lời No.50 |
| 5 | Cập nhật file 18: đổi dòng n8n thành "không dùng" kèm lý do (đã đề xuất, người dùng chưa trả lời) |
| 6 | Các tab Claude Doc (nguồn của file 00–12) chưa được cập nhật theo bản markdown trong máy. File 00–14 có thêm khối "Cập nhật ngày 17/11/2026" ở đầu file (theo Q&A bản 15/11); khối này cũng cần đưa vào tab Claude Doc |

Việc chưa quyết với khách nhưng ảnh hưởng nhiều module: kiểm chứng Upload-Post (8-2, 8-7, 8-9, 5-5, 7-7), cách ChatGPT ghi vào OneDrive (S02-01), quyền Microsoft Graph (S02-02).

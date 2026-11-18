# 2-3 Nhập thông tin từ ChatGPT

| Mục | Giá trị |
|---|---|
| Module | EP02 – Thông tin tài năng và nguồn dữ liệu cho AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-4, chức năng 2-3; UC-01 前提, UC-02, UC-02 前提; §7-1, §7-5; §8 |
| Màn hình [AG] | Không có màn trong hệ thống. Thao tác trên ChatGPT; kết quả xem ở M-07 |
| Tên trong mã nguồn | ChatGPT-based Info Registration |
| Mức sẵn sàng | 🔴 Đỏ – chưa biết ChatGPT ghi được vào OneDrive bằng cách nào. Phải kiểm chứng trên gói ChatGPT của khách (S02-01) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ phụ thuộc phương án | ⚠ | ✅ | ⚠ S02-04 | ✅ không cần màn | ❌ S02-01 | ⚠ đội đề xuất | ⚠ 2-2 |

## Mục đích

Quản lý trò chuyện với ChatGPT để nhập và sửa thông tin tài năng (hồ sơ, định hướng, sở thích, sở trường, mục tiêu tương lai). Nội dung được ghi vào file trong thư mục của tài năng. Trước khi ghi, ChatGPT cho quản lý thấy sẽ ghi gì cho tài năng nào, quản lý xác nhận rồi mới ghi (§6-4 chức năng 2-3).

## Tác nhân và quyền

- Quản lý: trò chuyện trên ChatGPT, xác nhận trước khi ghi.
- Tài năng: không sửa được thông tin của mình (UC-02 前提).

## Vấn đề kỹ thuật chính

[YK2] tả cách làm là "mỗi tài năng một dự án ChatGPT, gắn với thư mục OneDrive của tài năng" (UC-01 前提, UC-02 前提). Theo hiểu biết của đội, kết nối OneDrive có sẵn của ChatGPT chỉ để **đọc và tìm**. Muốn ChatGPT **ghi** vào file thì ChatGPT phải gọi một API do hệ thống cung cấp. Ba phương án:

| Phương án | Cách làm | Ưu | Nhược |
|---|---|---|---|
| **A (đề xuất)** | Một connector **MCP** dùng chung trên ChatGPT gọi API ghi của hệ thống (dự phòng: GPT tùy chỉnh có Action). Quản lý gọi tên tài năng trong hội thoại | Không phải tạo dự án cho từng tài năng; biết quản lý nào ghi; kiểm soát định dạng | Phải xem gói ChatGPT của khách có cho dùng không. Khác với cách tả trong UC-01 前提 |
| B | Mỗi tài năng một dự án ChatGPT như [YK2], cộng thêm công cụ ghi của A | Đúng như [YK2] | Thêm việc tạo dự án cho mỗi tài năng (100–1.000 người) mà không có lợi gì thêm |
| C (dự phòng) | ChatGPT chỉ soạn nội dung theo mẫu; quản lý tự dán vào file trên OneDrive | Không cần tích hợp | Dễ sai định dạng; không ai xác nhận "tài năng nào" |

**Căn cứ MCP:** 御見積書 (bản báo giá) 前提条件A4 「マネージャーはChatGPT(MCP)経由でAIを調整」, trích ở file Q&A câu số 45. Theo [YK2] §1, báo giá đứng trên [YK2] khi mâu thuẫn, nên MCP có căn cứ hợp đồng; câu 45 chưa có trả lời về phạm vi chính xác. Thiết kế máy chủ MCP chi tiết ở `agent_spec/onedrive-agent-spec/ONEDRIVE_IMPLEMENTATION_SPEC_VI.md` §14.

Cả ba đều là cách làm của 2-3, không thêm chức năng, nên đều **trong phạm vi**. Phương án A đổi tiền đề của UC-01 nên cần khách đồng ý (S02-01). Câu này chi tiết hóa câu C4 ở file 15.

## Luồng chính (phương án A)

1. Quản lý mở công cụ AI育成OS trên ChatGPT, đăng nhập bằng tài khoản quản lý của hệ thống (OAuth) ở lần đầu.
2. Quản lý nói tên tài năng và nội dung, ví dụ "タレントAの趣味にダンスを追加".
3. ChatGPT gọi API tìm tài năng theo tên. Nhiều người trùng tên thì hỏi lại quản lý.
4. ChatGPT gọi API "xem trước": hệ thống trả về đoạn hồ sơ trước và sau khi sửa, theo đúng mẫu (S02-04).
5. ChatGPT cho quản lý thấy: tài năng nào, mục nào, nội dung trước và sau. Quản lý xác nhận.
6. ChatGPT gọi API "ghi". Hệ thống ghi vào `プロフィール.md`, ghi nhật ký thao tác: quản lý, tài năng, mục, thời điểm (C-03).
7. Sáng hôm sau, AIコーチ dùng nội dung mới (2-1). M-07 hiện ngay khi mở.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Quản lý chưa xác nhận mà ChatGPT gọi "ghi" | API ghi đòi mã xem trước còn hạn (ví dụ 10 phút) do bước 4 cấp. Không có mã thì từ chối | [Đề xuất nội bộ], §6-4 (xác nhận trước khi ghi) |
| File bị sửa bởi người khác giữa bước 4 và 6 | So sánh phiên bản file (eTag). Khác thì báo và làm lại bước 4 | [Đề xuất nội bộ] |
| Tên tài năng không tìm thấy hoặc trùng | Trả danh sách gợi ý, không ghi | [Đề xuất nội bộ] |
| Tài năng chưa có thư mục (2-2 chưa xong) | Từ chối, báo "chưa có thư mục" | UC-01 前提 |
| Nội dung không thuộc mục nào của mẫu | Ghi vào mục 個別の指示 (chỉ dẫn riêng) hoặc hỏi lại quản lý | [Đề xuất nội bộ] |
| Microsoft Graph lỗi | Báo lỗi trong ChatGPT, không ghi một phần | §9-3 |

## Quy tắc và giá trị

| Quy tắc | Nguồn |
|---|---|
| Phải cho quản lý thấy tài năng nào, nội dung gì trước khi ghi | §6-4 chức năng 2-3 |
| Thêm và sửa cũng làm theo cách này | §6-4 chức năng 2-3 |
| Chỉ quản lý được sửa; tài năng không sửa trong ứng dụng | UC-02 前提 |
| Chưa có hồ sơ thì AIコーチ không đưa bản nháp | UC-01 前提 |

## Dữ liệu

`プロフィール.md` có các mục cố định (mẫu do đội đưa, S02-04): `## プロフィール`, `## 方向性`, `## 趣味・特技`, `## 将来の目標`, `## チャレンジ`, `## 日付` (sinh nhật, ngày kỷ niệm, lịch diễn, §7-5), `## 個別の指示`. M-07 đọc theo các mục này.

## Màn hình

Không có màn trong hệ thống. Quản lý xem kết quả ở M-07.

## Tích hợp

- **ChatGPT:** connector MCP (theo báo giá); dự phòng GPT tùy chỉnh có Action. Gói ChatGPT của khách có cho connector MCP tự làm ghi dữ liệu không thì phải kiểm chứng (S02-01).
- **API của hệ thống:** `tìm tài năng`, `đọc hồ sơ`, `xem trước`, `ghi`. Xác thực bằng OAuth với tài khoản quản lý, để biết ai ghi và để quản lý bị vô hiệu hóa (1-6) không ghi được nữa.
- **Microsoft Graph:** ghi file có kiểm tra phiên bản.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho quản lý nói "thêm ダンス vào sở thích của タレントA", thì ChatGPT hiện nội dung trước và sau, và chỉ ghi sau khi quản lý xác nhận.
2. Cho API ghi được gọi mà không có mã xem trước, thì bị từ chối.
3. Cho hai tài năng trùng tên, thì ChatGPT hỏi lại, không tự chọn.
4. Cho quản lý đã bị vô hiệu hóa, khi dùng công cụ, thì không ghi được.
5. Cho một lần ghi thành công, thì M-07 hiện nội dung mới và nhật ký thao tác có một dòng.

## Ngoài phạm vi của chức năng này

- Màn sửa hồ sơ trong màn hình quản trị: M-07 chỉ để xem ([AG] M-07 ghi "この画面では書き換えません").
- Màn chỉ thị cho AI theo nhóm (M-14, M-15): chờ 確認6–8, chưa thuộc chức năng nào.

## Phụ thuộc

- 2-2 (thư mục và file mẫu). 1-6 (tài khoản quản lý để xác thực).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認5 (チャレンジ, tức thử thách, do ai nhập), 確認6–8 (màn chỉ thị cho AI).

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S02-01 | Dùng phương án A (một công cụ chung) thay cho dự án riêng từng tài năng; gói ChatGPT có cho dùng không | Có | Viết API của hệ thống trước; phần ChatGPT làm sau khi kiểm chứng |
| S02-04 | Mẫu file hồ sơ | Không | Như mục Dữ liệu |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP02: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-4 (2-3), §7-1, §7-5, §8 (ChatGPT, khoảng 5 người dùng), UC-01 前提, UC-02 前提, 確認5–8.
- [AG] trang 7 (M-07). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) C4. [File 11](../../Phan_tich/11_Edge_case_va_rui_ro.md) rủi ro T2.

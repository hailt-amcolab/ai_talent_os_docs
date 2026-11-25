# Báo cáo rà soát Mục 3 và dịch vụ ngoài của AI育成OS

**Bản nháp nội bộ để xem lại trước khi phản hồi Adesso · 26/11/2026**

Phạm vi gồm Mục 3 của bản yêu cầu 0.3, slide so sánh dịch vụ ngoài ngày 24/11 và đề xuất vị trí lưu ảnh, video, tệp.

## 1. Mục 3 về yêu cầu phi chức năng

- **Quy mô đợt đầu (§3-2, CR-09).** Cần chốt quy mô dùng để bàn giao và kiểm tra hiệu năng. CR-09 dẫn điều kiện báo giá tối đa **150 Talent và khoảng 8 tài khoản văn phòng**. Bản 0.3 ghi mục tiêu **200–300 Talent** và dài hạn **1.000**. Đội đang thiết kế theo phương án 150 Talent, còn quyết định của Adesso đang chờ. [Q&A, sheet 追加要件, CR-09](../../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx)
- **Xóa dữ liệu (§3-6, No.69).** Dẫn chiếu quy tắc giữ dữ liệu sáu tháng sau khi Talent ngừng sử dụng rồi tự động xóa. Phần cần làm rõ theo No.69 là loại dữ liệu thuộc diện xóa. [Tài liệu yêu cầu, §2-4-12 và §3-6](../../source_requiments/24112026/AI育成OS_要件定義書.docx) · [Q&A, No.30 và No.69](../../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx)
- **Sao lưu và AI Coach (§3-3, §3-8, No.101).** Phản ánh xác nhận ngày 24/11 rằng dữ liệu trong cơ sở dữ liệu được sao lưu, Adesso chịu phí token và phụ trách điều chỉnh chỉ dẫn AI Coach. Độ chính xác của phán đoán AI nằm ngoài phạm vi bảo đảm. Lỗi hệ thống hoạt động sai đặc tả vẫn thuộc phạm vi sửa lỗi. Tần suất sao lưu và cách khôi phục do đội triển khai đề xuất. [Q&A, No.101, G101:H101](../../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx)
- **Đầu vào nghiệm thu (§3-8, No.2).** Đơn giá ban đầu thu Talent cho mỗi lượt tạo video cần có trước khi bắt đầu kiểm thử nghiệm thu. Với điều khoản, nội dung thông báo và các đầu vào khác, rà danh sách còn thiếu rồi cập nhật người phụ trách và thời điểm cung cấp. [Q&A, No.2, G3:I3](../../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx) · [Tài liệu yêu cầu, §3-8](../../source_requiments/24112026/AI育成OS_要件定義書.docx)

## 2. Slide so sánh dịch vụ ngoài

- **Square (slide 2, 13–14).** Bổ sung cổng thanh toán theo lựa chọn được ghi nhận sau buổi họp. Ghi rõ bảng dự toán chưa gồm phí thanh toán. Đội triển khai xác minh các phương thức thanh toán và cách thu phí cần cho dự án. [Bảng xác nhận, sheet アクション一覧, No.16, G17](../../source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx)
- **Upload-Post và TikTok (slide 7–8).** Sửa cách diễn đạt về xét duyệt SNS để nêu rõ dự án dùng tích hợp có sẵn của Upload-Post. Giữ lưu ý về rủi ro TikTok hạn chế bài đăng hoặc tài khoản khi đặt lịch, đăng tự động, đăng không qua xác nhận hoặc thiếu bước để Talent chọn phạm vi hiển thị. [Bảng xác nhận, sheet 20261122, No.19–23](../../source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx)
- **Xử lý dữ liệu (slide 3–6, 9–12).** Làm rõ theo từng dịch vụ dữ liệu nào được gửi, lưu ở đâu, giữ bao lâu và có được dùng để huấn luyện AI hay không. Đội triển khai kiểm tra điều kiện áp dụng cho Talent vị thành niên theo đúng dịch vụ, gói và cấu hình dự kiến. [Slide so sánh dịch vụ ngoài](../../source_requiments/24112026/AI育成OS_外部サービスの比較_20261124.pptx)
- **Dự toán (slide 5–6, 13).** Ghi rõ cấu hình tạo ra mức **236 yên/lượt** và phân biệt chi phí trả nhà cung cấp với đơn giá thu Talent. Dùng bảng 50/100/150 Talent làm ước tính theo kịch bản, sau đó cập nhật theo quy mô chốt ở CR-09. [Slide so sánh dịch vụ ngoài](../../source_requiments/24112026/AI育成OS_外部サービスの比較_20261124.pptx)

## 3. Đề xuất nơi lưu ảnh, video và tệp

Bản 0.3 §2-5 ghi **OneDrive** cho ảnh, video và thư mục Talent. No.101 xác nhận **Supabase** cho dữ liệu AI Coach đọc và cập nhật. Vị trí lưu file gốc vẫn cần Adesso xác nhận. [Tài liệu yêu cầu, §2-5](../../source_requiments/24112026/AI育成OS_要件定義書.docx) · [Q&A, No.101](../../source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx)

Đề xuất dùng **Supabase Storage** cho ảnh, video và tệp thường xuyên được tải lên hoặc xem trong ứng dụng. Dùng **OneDrive** cho tài liệu nội bộ Adesso quản lý qua Microsoft 365. Lợi thế dự kiến của Supabase Storage tập trung ở việc hiện danh sách ảnh thu nhỏ và xem lại ảnh. Cả hai dịch vụ đều hỗ trợ tải tiếp file lớn khi mạng gián đoạn. Chênh lệch tốc độ thực tế chưa được đo. [Supabase Storage](https://supabase.com/docs/guides/storage) · [Microsoft Graph Upload Session](https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession)

Trước khi trình đề xuất chốt vị trí lưu file, đo **thời gian tải lên, thời gian hiện ảnh đầu tiên và thời gian tải file gốc** với cùng bộ tệp và điều kiện mạng. Trình kèm chi phí lưu trữ, truyền dữ liệu và phương án khôi phục. Nếu chọn Supabase Storage, cần phương án sao lưu file riêng vì bản sao lưu cơ sở dữ liệu không bao gồm nội dung file trong Storage. [Supabase Database Backups](https://supabase.com/docs/guides/platform/backups)

**Khi phản hồi Adesso**, ưu tiên quy mô đợt đầu, phạm vi dữ liệu cần xóa và đơn giá tạo video theo CR-09, No.69 và No.2. Trình vị trí lưu file gốc dưới dạng đề xuất sau khi có kết quả đo.

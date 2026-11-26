# Tiếp nhận cập nhật QA/KS — 26/11/2026

Người kiểm: Codex. Phạm vi: đọc trực tiếp XML của cả 5 sheet mỗi workbook và so sánh giá trị/công thức với git HEAD. QA có 203 ô khác, đều ở sheet Q&A; KS có 15 ô khác, đều ở sheet 20261122. Đây là chênh lệch so với HEAD, gồm cả chỉnh sửa nội bộ 25/11; không coi toàn bộ là thay đổi khách vừa gửi. Chưa kiểm định dạng, comment, ảnh, thẩm quyền hoặc hoàn tất G1–G7.

Hash từng tệp và nội dung trước/sau từng ô: [hồ sơ đối chiếu](qa-ks-update-2026-11-26.json). Giữ nguyên nguồn và các thay đổi đang có của người dùng.

## Nội dung phản hồi mới cần đưa vào lần rà tiếp theo

Các mục dưới là FACT về nội dung workbook, chưa là kết luận phê duyệt nghiệp vụ/thương mại. Nhãn FCP không tự chứng minh Adesso đã duyệt mọi ý.

| Nguồn / locator | Nội dung ghi nhận |
|---|---|
| QA Q&A!G63:H63, G86:H86 | Thanh toán lại qua Square vẫn thất bại: chuyển Chờ thanh toán, dừng AI coach/tạo video/đăng bài, vẫn thu phí tháng; cho đăng nhập đổi phương thức thanh toán; trả thành công tự khôi phục. No.86 ghi thay trả lời cũ No.46. Bài quá giờ trong lúc dừng không đăng bù. |
| QA Q&A!G70:H71 | AI chọn ảnh hợp chủ đề; chủ đề đổi qua hội thoại; dừng auto thì huỷ lịch. Cài đặt xác nhận áp dụng cả daily/auto; daily và auto có thể dùng đồng thời. Auto không có bước Manager duyệt; từ cấm được AI sửa trước đặt lịch, không xác nhận lại. |
| QA Q&A!G56:H56, G83:H83 | No.56 cho tái sử dụng ảnh/video không giới hạn, AI chọn phù hợp; No.83 riêng auto theo kỳ không dùng một ảnh/video hai lần trong cùng kỳ. Phải giữ đúng phạm vi hai câu khi rà, không gộp thành một quy tắc chung. |
| QA Q&A!G73:H73 | Các khung giờ mặc định 8/12/20, cấu hình được; nhắc gửi ảnh trước giờ đăng 2 giờ; auto không gửi lời nhắn theo 7-7. |
| QA Q&A!G89:H89 | Lần đăng nhập đầu Manager có bước QR và mã xác thực 6 số; FCP sẽ bổ sung định nghĩa màn. |
| QA Q&A!G92:H92 | M-08 có 5 nhóm thông tin, không bắt buộc; thông tin khác nhập qua hội thoại M-17 và lưu MD OneDrive; ưu tiên chỉ thị AI nếu mâu thuẫn thông tin talent. |
| QA Q&A!G95:H95 | Có lịch đăng liên quan thì hiện để Talent huỷ trước khi ngắt SNS. |

## Còn mở hoặc cần đúng bên xác nhận

- QA Q&A!G3:H3, G5:H5, G50:H50: đơn giá video chưa có số cuối; Square đang được xem xét; khả năng thu phí video sau và ngày thu/tổng hợp còn phải kiểm provider. Chủ xử lý: đội/FCP/provider và Adesso cho đơn giá.
- QA Q&A!G87:H88; KS 20261122!A36:G36 (No.35): FCP còn hỏi Adesso cách xử lý Manager nghỉ/bỏ sót và người nhận các thông báo khác. Không coi mọi chi tiết thông báo đã đóng.
- QA Q&A!G98:H98; KS 20261122!A37:G37 (No.36): còn hỏi Adesso có cần lưu lịch sử thu tiền trong AI育成OS khi Square đã có dữ liệu.
- QA Q&A!G99:H99: nhiều category và thứ tự ưu tiên mới là dự kiến, FCP ghi sẽ xác nhận Adesso ngày 27/11.
- QA Q&A!G72 so với H72: bản Nhật giữ điều kiện xác nhận prompt/quan điểm thử thách với Adesso ngày 27/11; bản Việt chỉ ghi đồng ý đề xuất. Khi dùng lại phải đọc bản Nhật đầy đủ.

## Áp dụng tài liệu theo yêu cầu người dùng26/11

Đã cập nhật phần hiện hành của35SCD và10tài liệu phân tích; phần trước giữ trong mục lịch sử. AI Core sửa trực tiếp các mâu thuẫn về tự dừng khi chưa thanh toán, giới hạn2lần viết lại (DEC-0001), hồ sơ, thử thách, hai trục đăng/xác nhận, NG list, ngắtSNS và thông báo. Sổ yêu cầu/quy tắc sửa83bản ghi hiện có, giữID; metadata bằng chứng/quyết định chỉ xác nhận đã đọc nguồn, không tự ký G7. Không sửa nguồn, workbook15, schema/DB, code ứng dụng hoặc nội dung review độc lập. Validator cấu trúc được cập nhật để đọc snapshot hiện hành từ current-view thay vì cố định đợt24/11; metadata Q&A hiện hành trỏ về review lịch sử, không ghi đè hash/kết quả review cũ.

- [Bản đồ từng chủ đề → tài liệu, vị trí nguồn, EV và DEC](qa-ks-26nov-application.json).
- [Giá trị trước/sau của83REQ/BR](qa-ks-26nov-register-changes.json).
- [Hiệu lực bằng chứng nguồn cũ](qa-ks-26nov-stale-evidence.json).
- [Quyết định và phần còn mở](../registers/customer-decisions.csv), [bằng chứng](../registers/evidence.csv).
- [Theo dõi Q&A hiện hành](../qa-drafting-2026-11-19/qa-draft.md): các câu đã trả lời không hỏi lại; eligibility/review cũ giữ nguyên.

## Hiệu lực và giới hạn

QA hiện có100câu chính:93Close/7Open; kiểm từ cộtI cùng No. thực tế ở cộtA. No.24/34 Close nhưng không có trả lời mới tương ứng nên không tạo xác nhận. No.51 là tổng hợp thiết kế nội bộ theo các trả lời, không gán là chữ ký FCP/Adesso. Các mục25/11 đối chiếuYK3 được ghi riêng với phản hồiFCP26/11.

G1 BLOCKED chờ người duyệt phạm vi; G2–G4 trên các nhánh phụ thuộc nguồn cũ STALE; G5 BLOCKED chưa có reviewer khác tác giả; G7/G8 chưa PASS. Việc cập nhật tài liệu theo lệnh người dùng không tự thay các gate hoặc chứng minh phê duyệt thương mại/phát hành. BA/Tech Lead cần đối chiếu thêm các giao điểm thiết kế còn thiếu; FCP/Adesso xử lý phần nghiệp vụ còn mở dưới No. cũ, đội/provider xử lý khả năngSquare và lỗiAI/provider. Không dùng bản mới như baseline được duyệt.

## Kiểm tra sau cập nhật

- `python3 docs/requirement-review/validate.py`: PASS —23nguồn/hash,9schemaCSV và liên kết workflow. Không ngụ ý gate nghiệp vụ PASS.
- Kiểm riêng45tài liệu: đủ mục hiện hành, EV/DEC truy xuất được, giữ nguyên toàn bộ nội dung cũ trong lịch sử; workbook15 không đổi; nguồn gốc khớp hash đầu vào.
- AI Core và tài liệu thiết kế dữ liệu đã sửa các nhận định cũ “QA63/72/95/96/97 chưa trả lời”; phần còn mở được thu hẹp theo từngý. Không mở bảng hoặc đánh dấu triển khai xong từ cập nhật tài liệu.
- [Bản đồ áp dụng đầy đủ](qa-ks-26nov-application.json), [hash đầu ra](qa-ks-26nov-artifact-manifest.json), [kết quả kiểm](qa-ks-26nov-validation.json).

# Báo cáo Gap & Conflict Analysis

Đã đối chiếu 30 flow, 175 requirement, 90 business rule và 97 FGAP ứng viên. Đọc lại 12 nguồn theo hash snapshot, các log QA/KS/GJ và mô tả màn 18/11; tài liệu phân tích/thiết kế được dùng để tránh trùng và xác định việc đội, không làm xác nhận khách.

## Kết quả

47 hồ sơ: 33 vấn đề nghiệp vụ/phụ thuộc/phạm vi, 5 nhóm kỹ thuật, 9 ý đã trả lời. Không phải 47 câu hỏi khách hoặc 47 lỗi phần mềm.

| Loại chính | Số |
|---|---:|
| ALREADY_ANSWERED | 9 |
| AMBIGUITY | 4 |
| CONFLICT | 1 |
| EXTERNAL_DEPENDENCY | 3 |
| MISSING_EXCEPTION | 2 |
| MISSING_FLOW | 4 |
| MISSING_RULE | 16 |
| TECHNICAL_ONLY | 5 |
| UNDEFINED_STATE | 3 |

97/97 FGAP có disposition: 94 gộp vào hồ sơ theo nguyên nhân/quyết định, 3 không nâng thành finding (tự reset mục tiêu, thu hồi chat chưa được yêu cầu và bàn giao tài liệu không phải thiếu hành vi). Nhánh hỗn hợp vẫn được giới hạn trong candidate-audit.csv; không tự bổ sung quét lại lịch sử hoặc thu hồi yêu cầu duyệt.

## Các kết luận cần giữ đúng phạm vi

- Mâu thuẫn còn mở: đường thao tác văn phòng trong app/quản trị. Quyết định chỉ văn phòng được thao tác đã có; không hỏi lại quyền tự đổi của Talent. No.66 chưa được tự đóng bằng màn mới.
- Kết nối SNS 48 giờ/15 phút được phân AMBIGUITY: có thể khác đối tượng/link. Đội phải phân biệt scope trước; không tuyên bố hai hệ thống chắc chắn mâu thuẫn hoặc lỗi.
- Có hai chế độ, viết lại tối đa hai lần, sửa tay, không áp trần bài vì chi phí, quyền riêng tư hội thoại và giữ dữ liệu sáu tháng/không phục hồi đã có căn cứ từng ý. Không hỏi lại. Thời điểm tính lần/thử lại và tác động tiền phải tách khỏi số lần tối đa; xem các finding giá/kết quả không rõ và kỹ thuật.
- M-20 đã tồn tại. Chỉ còn hợp đồng đầu vào/trường hoàn tất và hiệu lực hồ sơ, không kết luận thiếu toàn bộ màn.
- Ngưỡng milestone 25/50/75% là đề xuất ở QA No.14, không lấy Close hoặc báo cáo nội bộ làm quyết định khách.
- Thiết kế OneDrive/Upload-Post/MCP đã mô tả snapshot/eTag/đối soát/chống trùng. Việc còn thiếu là lựa chọn hoặc chứng cứ kiểm chứng đúng phạm vi; timeout không chứng minh thao tác thất bại.

## Truy xuất và giữ lịch sử

Mỗi FND có nguồn cụ thể, vị trí, hash, FACT/INFERENCE tách biệt, thông tin thiếu, quyết định, ảnh hưởng và khuyến nghị hỏi/không hỏi. EV cũ được tái sử dụng; EV mới ở gap-evidence.csv. Liên kết REQ theo phạm vi flow là tập liên quan, không có nghĩa mọi REQ trong flow đều thiếu. Bảng legacy_checks giữ trạng thái workbook15 để không đóng thay RV cũ. Không sửa workbook, nguồn gốc, SCD, requirement, business rule hay flow cũ.

Sổ findings.csv trước bước này trống, đã lưu ở inputs/findings-before.csv. Sau khi điền sổ, snapshot đầu vào của lần dựng flow cũ đương nhiên khác ở findings.csv. Không sửa snapshot cũ để che thay đổi: validator của đợt này kiểm hash toàn bộ artifact extraction/flow cũ và ghi nhận sổ findings là đầu ra kế tiếp được giao. Chạy validator flow cũ với ledger hiện tại có thể báo đúng khác biệt đầu vào lịch sử này; không đồng nghĩa flow đã bị sửa.

## Giới hạn và gate

Chỉ phân tích tài liệu; không chạy tài khoản thật/dịch vụ ngoài, không kết luận phần mềm đang lỗi. Không có bản ký/phát hành thương mại mới. Phần hình/trạng thái nguồn cũ chưa được tự hoàn thiện; kết luận giữ ở mức chưa đủ định nghĩa, không phát minh enum. Không review độc lập: G4 BLOCKED (G3 chưa được ký và chưa có người duyệt), G5 NOT_RUN. Không tạo review giả, Q&A, customer decision hay baseline approved.

Tech Lead cần phân công reviewer/người ký, chủ xử lý chính sách đăng/trạng thái/thanh toán, người kiểm provider và phạm vi thương mại. Quyết định nghiệp vụ vẫn thuộc khách đúng thẩm quyền; đội chọn giải pháp kỹ thuật theo ràng buộc đã có.

## Chạy kiểm tra

```sh
python3 docs/requirement-review/validate.py
python3 docs/requirement-review/extraction-2026-11-19/validate_extraction.py
python3 docs/requirement-review/gap-analysis-2026-11-19/validate_gap_analysis.py
```

PASS chỉ là toàn vẹn/liên kết cơ học, không ký G4/G5.

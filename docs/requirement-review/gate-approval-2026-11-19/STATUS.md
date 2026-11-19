# Ghi nhận duyệt G1–G4 và kiểm tra G5

Căn cứ: người dùng/Tech Lead xác nhận trực tiếp “tôi đã duyệt, đánh pass hết cho tôi, và g5 còn block gì nữa không”. Ghi nhận phê duyệt của người dùng, không phải Codex tự ký gate. Người/ngày/nguyên văn/phạm vi ở [approval.json](approval.json); [snapshot đầu vào](input-manifest.json).

G1–G4 được ghi PASS bằng gate-run mới thay các lần BLOCKED cũ, không xóa lịch sử. Đây là duyệt kết quả phân tích theo phạm vi, không phải mọi requirement đã được khách chốt, đủ triển khai hay được phát hành Q&A.

- G1: nguồn và giới hạn đã công bố; thiếu văn bản thương mại độc lập không trở thành phê duyệt thương mại.
- G2: hồ sơ extraction175 REQ/90 BR, truy vết và danh sách phần thiếu.
- G3: hồ sơ rà30 flow và các khoảng trống được nhận diện; PASS không nghĩa đã giải quyết mọi khoảng trống.
- G4:24 finding ACCEPT nội dung được chấp thuận trong tập hợp lệ;20 REJECT được giữ phân tuyến/loại khỏi câu hỏi. FND-0004, FND-0013, FND-0016 chưa nằm trong phạm vi finding được xác nhận hợp lệ, vẫn cần bổ sung chứng cứ; không được dùng để soạn câu hỏi. FND-0017 giữ lịch vận hành.

## G5 vẫn BLOCKED

1. Đã gỡ điều kiện đầu vào G1–G4 chưa PASS cho phạm vi được duyệt.
2. reviews.csv chưa có hồ sơ ACCEPTED do người được chỉ định khác tác giả ký chịu trách nhiệm; kết quả ACCEPT của reviewer AI không thay chữ ký này. Phê duyệt G1–G4 hiện tại không tự được diễn giải thành ký independent review G5.
3. Với toàn bộ47 finding, còn FND-0004, FND-0013, FND-0016 cần chứng cứ.16 REWRITE đã có kiểm lại:14 ACCEPT,2 NEED_MORE_EVIDENCE; lý do cũ “chưa sửa/kiểm lại” không còn đúng cho toàn bộ16 mục.

Để xét G5 cho tập24 finding ACCEPT: reviewer độc lập có thẩm quyền xác nhận đã đọc nguồn/phản biện đúng bản và ký ACCEPTED, xác nhận phạm vi loại trừ cùng ảnh hưởng; sau đó ghi gate-run G5 mới. Nếu xét đủ47 finding thì xử lý thêm các mục NEED_MORE_EVIDENCE và kiểm lại. Không cần biến20 REJECT thành ACCEPT; cần chứng minh chúng được xử lý đúng tuyến và không còn là câu hỏi khách.

Không thay review, finding, nguồn hoặc Q&A. G6 và các phê duyệt Q&A/phát hành giữ nguyên. Manifest/snapshot các đợt cũ vẫn bất biến; chúng có thể phát hiện gate-runs.csv hiện tại khác vì lần ghi nhận được người dùng cho phép. Bản trước được lưu nguyên byte tại gate-runs-before.csv.

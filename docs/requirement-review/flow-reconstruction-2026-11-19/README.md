# Hồ sơ Business Flow Reconstruction —19/11/2026

Bốn đầu ra của giai đoạn:

1. [Flow Index](FLOW_INDEX.md) —30 flow và liên kết UC/REQ/TR.
2. [Business Flow Specification](BUSINESS_FLOW_SPECIFICATION.md) —quy ước và30 đặc tả đầy đủ trong thư mục flows.
3. [State Transition Tables](STATE_TRANSITION_TABLES.md) —64 dòng chuyển trạng thái, có nguồn và giới hạn.
4. [Flow Coverage Report](FLOW_COVERAGE_REPORT.md) —bao phủ, nhánh có liên quan, phần chưa định nghĩa và trạng thái gate.

Sổ flow: [business-flows.csv](../registers/business-flows.csv). Requirement/BR/EV extraction được giữ nguyên snapshot; dùng [requirement-flow-map.csv](requirement-flow-map.csv), [rule-flow-map.csv](rule-flow-map.csv) và EV bổ sung để truy vết. Không dùng SCD/technical spec hoặc scenario nội bộ để bổ sung requirement khách. Chưa tạo Customer Q&A.

Có281 bước/118 nhánh;97 điểm U/X ở cấp bước chưa phải97 phát hiện độc lập hay câu hỏi cần khách trả lời. Chưa tự ký G3/independent review hoặc kết luận đủ triển khai.

Kiểm tra và giới hạn: [VALIDATION.md](VALIDATION.md). Snapshot nguồn/đầu vào tại source-snapshot.json; manifest đầu ra tại artifact-manifest.json. Không ghi đè hồ sơ extraction hoặc các phân tích cũ.

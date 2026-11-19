# Kiểm tra đầu ra

- Validator chung: PASS (12 nguồn, 9 schema, đường dẫn).
- Validator extraction: PASS; REQ/BR/EV cũ giữ nguyên.
- Validator gap: PASS; 47 ID/khóa ổn định, EV có nguồn/hash/vị trí, 97/97 FGAP có disposition; các artifact extraction/flow cũ giữ nguyên hash.
- Kiểm tra lỗi có chủ đích: invalid-type: rejected as expected (temporary copy only); missing-evidence: rejected as expected (temporary copy only); changed-key: rejected as expected (temporary copy only).

Không sửa nguồn hoặc artifact cũ khi thử lỗi. Đây là kiểm tra cơ học của tác giả; chưa có G4 PASS hoặc review độc lập G5. Sổ findings hiện tại là đầu ra kế tiếp, khác snapshot input findings trống của đợt flow cũ một cách có chủ đích và có bản lưu.

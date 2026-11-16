"""Sinh bản khung SCD cho từng chức năng từ Phan_tich/04 và 16. Không ghi đè file đã viết tay."""
import re, sys, unicodedata, pathlib

ROOT = pathlib.Path(sys.argv[1])
P04 = (ROOT / "Phan_tich/04_Yeu_cau_chuc_nang.md").read_text(encoding="utf-8")
P16 = (ROOT / "Phan_tich/16_Chia_module_phat_trien.md").read_text(encoding="utf-8")
OUT = ROOT / "SCD"
MARK = "Bản khung"
PRIO = {"高": "高 (cao)", "中": "中 (trung bình)", "低": "低 (thấp)"}
LEVEL = {"X": "🟢 Xanh", "V": "🟡 Vàng", "D": "🔴 Đỏ", "-": "Không làm"}
MODULES = {
    "EP01": "Danh tính và quyền truy cập", "EP02": "Thông tin tài năng và nguồn dữ liệu cho AI",
    "EP03": "Huấn luyện viên AI", "EP04": "Tạo nội dung bài đăng", "EP05": "Tư liệu và video AI",
    "EP06": "Phê duyệt và đăng lên mạng xã hội", "EP07": "Kết quả và phân tích", "EP08": "Thu phí",
    "EP09": "Thông báo và nền tảng PWA", "EP10": "Nền tảng chung và quản trị hệ thống",
}
# mã: (mức, Khách, Kiểm chứng, Đội)
M = {
 "1-4": ("V", "確認1 (đồng ý điều khoản); C1 (dịch vụ gửi thư); [AG] thiếu màn đặt lại mật khẩu", "—", "Hạn mật khẩu tạm, chặn đăng ký rác, đơn trùng email"),
 "1-5": ("X", "—", "—", "Thiết kế RLS và cách worker chỉ đọc đúng thư mục"),
 "6-2": ("V", "確認11, 12, 13", "—", "Lưu tiến độ từng bước; bước 3, 4 dùng giao diện giả tới khi có 1-1, 8-2"),
 "1-6": ("V", "Xử lý khi mất điện thoại xác thực", "—", "Cách mời quản lý mới, tạo quản lý đầu tiên"),
 "7-3": ("D", "確認53–56; A3 (tên và số trạng thái); ai chuyển 利用前 sang 利用中", "—", "Sơ đồ trạng thái (C-01)"),
 "7-6": ("V", "確認44; thời gian giữ nhật ký (§9-4)", "—", "Danh sách màn hình được ghi"),
 "2-2": ("D", "I3 (quyền Microsoft Graph, vị trí thư mục); báo quản lý khi thư mục đã tạo", "Tạo thư mục qua Microsoft Graph", "Cấu trúc thư mục"),
 "2-3": ("D", "C4 (ai thiết lập phía ChatGPT); 確認5", "Gắn dự án ChatGPT với thư mục OneDrive", "Định dạng file hồ sơ"),
 "2-4": ("V", "確認3, 5; B12", "—", "—"),
 "2-1": ("V", "I3", "Tốc độ đọc OneDrive cho 1.000 người", "Định dạng file, xử lý khi đọc lỗi"),
 "7-1": ("V", "確認2, 47; cột hiển thị trong danh sách", "—", "—"),
 "3-1": ("V", "Định dạng file kiến thức nghề và chỉ dẫn thuật toán", "—", "Thiết kế lời nhắc (prompt)"),
 "3-4": ("V", "確認14, 18, 21, 22, 23", "Chi phí OpenAI khi không giới hạn số tin", "—"),
 "3-3": ("D", "S03-02 (dấu hiệu tự hại), S03-04 (thế nào là chuyện nghiêm trọng); 確認17", "—", "Câu từ chối cố định"),
 "3-9": ("V", "確認19, 43", "—", "—"),
 "3-2": ("V", "—", "—", "Cấu trúc và giới hạn dung lượng file bộ nhớ"),
 "3-6": ("V", "C5 (giờ lấy kết quả)", "—", "Nội dung khi hôm trước không đăng"),
 "3-8": ("V", "—", "—", "Nội dung bản tổng kết"),
 "3-7": ("V", "確認5, 39; A7", "—", "—"),
 "3-5": ("V", "Cách hiện phí AI ở M-10 (S03-08)", "—", "—"),
 "4-1": ("D", "確認15, 16, 24; A8; B1, B2, B3", "Nguồn tin tức (確認16)", "Giới hạn độ dài chung cho 3 mạng"),
 "4-2": ("V", "確認28, 29", "—", "—"),
 "4-3": ("D", "確認25, 26; B1, B6; chấp nhận sau giờ đăng", "—", "—"),
 "4-4": ("V", "確認4; B5 (luồng quản lý sửa)", "Độ chính xác khi AI kiểm tra theo ngữ cảnh", "—"),
 "6-6": ("X", "—", "—", "Bố cục xem trước"),
 "6-3": ("V", "確認27; C2", "—", "Định dạng và dung lượng tối đa (§9-2)"),
 "6-4": ("D", "確認32; B4", "—", "Thời gian giữ và cách xóa"),
 "6-5": ("V", "Nhiều bài trong ngày thì nhắc mấy lần", "—", "—"),
 "5-1": ("D", "確認31; đơn giá; B9", "Tham số Kling, thời gian tạo", "—"),
 "5-2": ("V", "—", "Định dạng đăng được trên cả 3 mạng", "—"),
 "5-3": ("V", "Video bị bỏ có lưu không", "—", "—"),
 "5-5": ("D", "C3", "Upload-Post có gắn được nhãn AI trên 3 mạng không", "—"),
 "7-7": ("D", "確認33–36; A2", "Bài chờ duyệt đã đặt lịch trên Upload-Post chưa", "—"),
 "8-2": ("D", "確認9, 10, 11; lúc nào đăng ký tài năng với Upload-Post", "Luồng kết nối, đường dẫn hạn 48 giờ", "—"),
 "8-3": ("V", "B3 (tiêu đề YouTube)", "Lệnh đăng và kết quả theo từng mạng", "—"),
 "8-4": ("D", "確認37; chưa có nội dung (§9-5)", "Quy định của từng mạng", "—"),
 "8-5": ("D", "確認30, 38; ai đặt lịch lại (file 14 §3.2 điểm 9)", "—", "—"),
 "8-6": ("V", "—", "Upload-Post báo mất kết nối bằng cách nào", "—"),
 "7-5": ("V", "B6", "Hủy hàng loạt trên Upload-Post", "—"),
 "7-2": ("V", "Danh sách trạng thái bài đăng (C-01)", "Hủy lịch qua API", "—"),
 "9-1": ("D", "A1, A2, 確認52; B10", "—", "—"),
 "8-7": ("D", "C5", "Upload-Post trả về những chỉ số nào (quyết định cấu trúc dữ liệu)", "—"),
 "8-8": ("V", "—", "—", "Định dạng file kết quả"),
 "3-10": ("V", "Tổng 3 mạng hay từng mạng (別紙B số 20)", "—", "—"),
 "6-7": ("V", "確認22, 40", "—", "—"),
 "8-1": ("D", "確認30; B1; thế nào là đủ số liệu", "Có số liệu theo khung giờ không", "—"),
 "8-9": ("D", "—", "Upload-Post có số liệu theo khung giờ không", "—"),
 "1-1": ("D", "確認48, 49, 50; mức phí; ngày chốt", "Môi trường thử GMO, thu số tiền thay đổi", "—"),
 "1-2": ("V", "A1 (tài khoản công ty thao tác ở đâu)", "—", "—"),
 "1-3": ("-", "—", "—", "—"),
 "5-4": ("D", "Đơn giá; 確認51; B8, B9", "—", "—"),
 "6-1": ("V", "C6; 確認12", "Web Push trên iOS 16.4 trở lên", "—"),
 "7-4": ("V", "確認45, 46; A6", "—", "—"),
 "6-8": ("V", "B13; hệ điều hành và trình duyệt hỗ trợ (§9-1)", "—", "—"),
 "C-01": ("D", "§5-1 ghi sẽ viết ở bản cuối; A3", "—", "Đội viết nháp sơ đồ trạng thái rồi gửi khách duyệt"),
 "C-02": ("X", "—", "—", "—"),
 "C-03": ("V", "Thời gian giữ (§9-4)", "—", "—"),
 "C-04": ("V", "—", "—", "Cách xử lý cho từng dịch vụ"),
 "C-05": ("V", "A6", "—", "—"),
 "C-06": ("V", "Logo và mã màu (§6-14)", "—", "—"),
}

def slug(s):
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^A-Za-z0-9]+", "_", s).strip("_")

# --- file 16: module, mô tả, tên tiếng Anh, ưu tiên, mục, màn hình
f16, order, ep = {}, [], None
for line in P16.splitlines():
    h = re.match(r"### (EP\d\d) ", line)
    if h: ep = h.group(1)
    r = re.match(r"\| (\d+-\d+) \| (.+?) \| (.+?) \| (高|中|低) \| (.+?) \| (.+?) \|$", line)
    if r and ep:
        f16[r.group(1)] = dict(ep=ep, desc=r.group(2), en=r.group(3), prio=r.group(4), sec=r.group(5), scr=r.group(6))
        order.append(r.group(1))
    c = re.match(r"\| (C-0\d) \| (.+?) \| (.+?) \| (.+?) \|$", line)
    if c:
        f16[c.group(1)] = dict(ep="EP10", desc=c.group(2), en="—", prio="—", sec=c.group(3), scr=c.group(4))
        order.append(c.group(1))
assert len([k for k in order if not k.startswith("C-")]) == 54, len(order)

# --- file 04: tên, 6 cột, nguồn, điểm chưa rõ
f04, unclear, cur, in_u = {}, {}, [], False
for line in P04.splitlines():
    if line.startswith("## "):
        cur, in_u = [], False
    r = re.match(r"\| \*\*(\d+-\d+)\*\* (.*?) \((高|中|低)\)(.*?) \| (.*) \|$", line)
    if r:
        cells = [x.strip() for x in r.group(5).split(" | ")]
        assert len(cells) == 6, (r.group(1), len(cells))
        f04[r.group(1)] = dict(name=(r.group(2) + r.group(4)).strip(" ."), cells=cells, src="")
        cur.append(r.group(1)); continue
    if line.startswith("Nguồn: [YK2]"):
        for i in cur: f04[i]["src"] = line[len("Nguồn: "):]
    if line.startswith("**Điểm chưa rõ:**"):
        in_u = True; continue
    if in_u and line.startswith("- "):
        m = re.match(r"- ((?:\d+-\d+)(?:, \d+-\d+)*): (.*)", line)
        for i in (m.group(1).split(", ") if m else cur):
            unclear.setdefault(i, []).append(m.group(2) if m else line[2:])
assert set(f04) == {k for k in order if not k.startswith("C-")}

def steps(s):
    parts = re.split(r"(?:^|\s)(\d+)\)\s", s)
    items = [p.strip() for p in parts[2::2]] if len(parts) > 1 else [s]
    head = parts[0].strip() if len(parts) > 1 else ""
    return (head + "\n\n" if head else "") + "\n".join(f"{n}. {t}" for n, t in enumerate(items, 1))

TODO = "⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng))."
P = "../../Phan_tich/"

SHORT = {"1-2": "Loại tài khoản", "4-3": "Chấp nhận bản nháp (採用)", "6-8": "Nền tảng PWA",
         "C-01": "Bộ trạng thái", "C-02": "Cài đặt do quản lý tự chỉnh", "C-03": "Nhật ký thao tác và xử lý",
         "C-04": "Xử lý khi dịch vụ ngoài lỗi", "C-05": "Danh mục thông báo", "C-06": "Quy tắc chung của màn hình"}

def name_of(k):
    return SHORT.get(k) or (f04[k]["name"] if k in f04 else f16[k]["desc"])

def path_of(k):
    ep = f16[k]["ep"]
    return OUT / f"{ep}_{slug(MODULES[ep])}" / f"{k}_{slug(name_of(k))[:60].rstrip('_')}.md"

def skeleton(k):
    d, lv = f16[k], M[k]
    head = [f"# {k} {name_of(k)}", "",
            f"> **{MARK}:** sinh tự động từ [file 04]({P}04_Yeu_cau_chuc_nang.md), [file 16]({P}16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). "
            "Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.", "",
            "| Mục | Giá trị |", "|---|---|",
            f"| Module | {d['ep']} – {MODULES[d['ep']]} |",
            f"| 優先順位 (ưu tiên) | {PRIO.get(d['prio'], d['prio'])} |",
            f"| Mục [YK2] | {d['sec']} |",
            f"| Màn hình [AG] | {d['scr']} |",
            f"| Tên trong mã nguồn | {d['en']} |",
            f"| Mức sẵn sàng | {LEVEL[lv[0]]} |", ""]
    body = [f"## Mục đích", "", d["desc"], ""]
    if k in f04:
        c = f04[k]["cells"]
        body += ["## Tác nhân", "", c[0], "", "## Đầu vào", "", c[1], "",
                 "## Điều kiện trước", "", c[2], "", "## Luồng chính", "", steps(c[3]), "",
                 "## Đầu ra và kết quả sau", "", f"- Đầu ra: {c[4]}", f"- Kết quả mong đợi: {c[5]}", ""]
    for sec in ("Luồng lỗi và trường hợp biên", "Quy tắc và giá trị", "Dữ liệu", "Tích hợp", "Tiêu chí chấp nhận"):
        body += [f"## {sec}", "", TODO, ""]
    body += ["## Chỗ còn thiếu", "", "| Ai phải lấp | Nội dung |", "|---|---|",
             f"| Khách | {lv[1]} |", f"| Kiểm chứng | {lv[2]} |", f"| Đội | {lv[3]} |", ""]
    if unclear.get(k):
        body += ["## Điểm chưa rõ (từ file 04)", ""] + [f"- {u}" for u in unclear[k]] + [""]
    src = f04[k]["src"] if k in f04 else f"[YK2] {d['sec']}; file 16 mục 1.2"
    body += ["## Nguồn", "", f"- {src}",
             f"- Câu hỏi liên quan: [file 15]({P}15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = {d['ep']}.", ""]
    return "\n".join(head + body)

written = skipped = 0
for k in order:
    p = path_of(k)
    if p.exists() and MARK not in p.read_text(encoding="utf-8"):
        skipped += 1; continue
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(skeleton(k), encoding="utf-8"); written += 1

# --- bảng đánh giá cho README
rows, cnt = [], {}
for ep in MODULES:
    rows += [f"### {ep} – {MODULES[ep]}", "", "| Mã | Chức năng | Mức | Khách | Kiểm chứng | Đội |", "|---|---|---|---|---|---|"]
    for k in [k for k in order if f16[k]["ep"] == ep]:
        lv = M[k]
        if not k.startswith("C-"): cnt[lv[0]] = cnt.get(lv[0], 0) + 1
        rel = path_of(k).relative_to(OUT).as_posix()
        rows.append(f"| {k} | [{name_of(k)}]({rel}) | {LEVEL[lv[0]]} | {lv[1]} | {lv[2]} | {lv[3]} |")
    rows.append("")
(OUT / "_bang_danh_gia.md.part").write_text("\n".join(rows), encoding="utf-8")
print("written", written, "skipped", skipped, "counts", cnt)

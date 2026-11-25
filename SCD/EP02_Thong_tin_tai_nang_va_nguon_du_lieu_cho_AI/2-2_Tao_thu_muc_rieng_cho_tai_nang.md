<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### AI agent và dữ liệu

G/H ghi xác nhận24/11: AI Coach là agent đọc/ghi Supabase; nhận chỉ thị, khen, đề xuất và ghi tiến độ Challenge, nhập chỉ thị qua hội thoại M-17 trong phạm vi; dữ liệu trong DB có backup; Adesso trả token và chỉnh prompt; không bảo đảm phán đoán đúng. J101 là phân vai NỘI BỘ25/11: OS nhập dữ liệu dịch vụ ngoài; agent quyết định giờ rồi ghi lịch để OS thực thi.

**Còn mở/giới hạn:** YK3 §2-5/3-3/3-8/AC chưa đồng bộ. Không suy agent được SQL tùy ý hoặc bỏ kiểm quyền. Vị trí byte media và vai trò OneDrive chưa chốt lại toàn bộ. Căn cứ: `QA Q&A!G101:J101 (No.101)`; `EV-1311`; QA No.101;TR-2-1;TR-2-2;TR-2-3;TR-2-4;TR-3-1;TR-3-2;TR-3-5;TR-8-8.

<!-- /DELIVERY24112026 -->

# 2-2 Tạo thư mục riêng cho tài năng

## Đối chiếu nguồn hiện hành — 20/11/2026

Folder Talent tạo tự động khi đăng ký thanh toán; folder office tạo ngay khi tạo tài khoản. Chưa nhập hồ sơ thì AI không tạo bài. Hồ sơ/chỉ thị đọc từ nguồn tương ứng; không yêu cầu Manager tạo folder thủ công.

Định dạng, chống ghi lặp/đồng thời và khôi phục là việc đội; chưa tự thay kiến trúc OneDrive.

Căn cứ: `T19:9;M19:7,17;BF19:4,18` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0561;EV-0592;EV-0602;EV-0616;EV-0630`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP02 – Thông tin tài năng và nguồn dữ liệu cho AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-4, chức năng 2-2; UC-01 前提 (tiền đề); §7-2 |
| Màn hình [AG] | Không có màn riêng. Trạng thái thư mục hiện ở M-06, M-07 (đề xuất S02-03) |
| Tên trong mã nguồn | Talent Folder Creation |
| Mức sẵn sàng | 🔴 Đỏ – chưa biết đặt thư mục ở đâu và chưa có quyền Microsoft Graph (S02-02). Viết mã được với OneDrive giả, nhưng chưa chạy thật được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ⚠ chưa có chỗ hiện | ❌ S02-02 | ⚠ đội đề xuất | ❌ 1-1 (sự kiện thanh toán) |

## Mục đích

Mỗi tài năng có một thư mục riêng trên OneDrive để chứa hồ sơ, mục tiêu, kết quả, ảnh và video. Quản lý không phải tự tạo. AIコーチ đọc thư mục này mỗi sáng (2-1).

## Tác nhân và quyền

- Hệ thống: tạo thư mục.
- Quản lý: không thao tác. Thấy thư mục đã tạo và mở được liên kết tới thư mục (S02-03).
- Tài năng: không vào OneDrive trực tiếp, chỉ xem qua ứng dụng.

## Điều kiện trước, kết quả sau

- **Trước:** tài năng đã đăng ký thanh toán xong (1-1), hoặc quản lý vừa tạo tài khoản công ty (1-2) (§6-4 chức năng 2-2).
- **Sau:** có thư mục theo cấu trúc mẫu, kèm các file mẫu. Mã thư mục được lưu vào bản ghi tài năng.

## Luồng chính

1. Nhận sự kiện "đã đăng ký thanh toán" (1-1) hoặc "đã tạo tài khoản công ty" (1-2), đưa việc "tạo thư mục" vào hàng đợi.
2. Worker kiểm tra tài năng đã có thư mục chưa. Có rồi thì dừng.
3. Tạo thư mục và các thư mục con theo cấu trúc dưới đây, chép các file mẫu vào.
4. Lưu mã thư mục (mã của Microsoft Graph, không dùng tên) và đường dẫn web vào bản ghi tài năng.
5. Ghi nhật ký xử lý (C-03). M-06 và M-07 hiện "đã có thư mục" kèm liên kết, để quản lý biết mà làm tiếp phía ChatGPT (2-3).

**Cấu trúc thư mục [Đề xuất nội bộ, S02-04]:**

```
<thư mục gốc AI育成OS>/          ← vị trí chờ S02-02
  共通/                          ← thư mục chung (UC-02 前提)
    ノウハウ.md                  ← kiến thức nghề
    アルゴリズム対策.md           ← chỉ dẫn thuật toán
    AIへの指示.md                ← giọng văn, chỉ thị chung (S03-01)
  タレント/
    <mã tài năng>_<tên>/
      _system/identity.json      ← hệ thống ghi, không đưa cho AI
      プロフィール.md             ← hồ sơ; ChatGPT ghi (2-3)
      目標.md                    ← mục tiêu; hệ thống ghi (2-4)
      AIメモ.md                  ← AIコーチ tự ghi (3-2, §7-5)
      実績/                      ← kết quả; hệ thống ghi (8-8): サマリー.md, YYYY-MM.csv, snapshots/
      素材/                      ← ảnh, video (6-4): originals/, AI生成/, derivatives/
      添付/                      ← tệp đính kèm của quản lý
```

Cây này thống nhất với `agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md` §2 (bản 2.0); cách tạo thư mục có thể chạy lại ở §7.1. Hệ thống tìm thư mục theo mã của Microsoft Graph, không theo tên.

Tên thư mục và file dùng tiếng Nhật vì quản lý của アデッソ đọc. Thư mục chung do đội tạo một lần khi triển khai (S02-08).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Microsoft Graph lỗi hoặc hết hạn mức gọi | Thử lại với thời gian chờ tăng dần, tối đa 5 lần. Vẫn lỗi thì M-06 và M-07 hiện "lỗi tạo thư mục" kèm nút tạo lại. Không thêm loại thông báo | §9-3; [Đề xuất nội bộ] |
| Sự kiện thanh toán tới hai lần | Bước 2 bỏ qua, không tạo thư mục thứ hai | [Đề xuất nội bộ] |
| Tài năng đổi tên sau này | Không đổi tên thư mục. Hệ thống tìm thư mục theo mã, không theo tên | [Đề xuất nội bộ] |
| Quản lý đổi tên hoặc chuyển thư mục trên OneDrive | Vẫn chạy vì dùng mã thư mục. Lỡ xóa thư mục thì M-07 hiện "không tìm thấy thư mục" | [Đề xuất nội bộ] |
| Tài năng chuyển sang 利用終了 (đã ngừng) | Giữ thư mục 6 tháng, rồi việc chạy định kỳ xóa thư mục, không khôi phục (`agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md` §7.7) | §7-3, [KS] 確認55 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Tài năng: tạo khi đăng ký thanh toán xong | Chốt | §6-4 chức năng 2-2, UC-01 前提 |
| Tài khoản công ty: tạo khi quản lý tạo tài khoản | Chốt | §6-4 chức năng 2-2 |
| Mỗi tài năng đúng một thư mục | [Đề xuất nội bộ] | — |

§6-4 chức năng 2-2 còn ghi các trường đơn đăng ký, cài duyệt bài khi duyệt đơn, và "không gửi đơn bằng email đã dùng". Các việc đó thuộc chức năng 1-4 (EP01).

## Dữ liệu [Đề xuất nội bộ]

`talents`: thêm `onedrive_folder_id`, `onedrive_folder_url`, `folder_status` (`pending`, `created`, `failed`), `folder_created_at`.

## Màn hình

Không có màn riêng. M-06 và M-07 hiện trạng thái thư mục và liên kết (S02-03).

## Tích hợp

- **Microsoft Graph:** tạo thư mục, chép file mẫu. Quyền: chỉ xin quyền tối thiểu trong khu vực thư mục gốc (file 18 mục 7, S02-02).
- **Chống làm trùng:** khóa việc theo mã tài năng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng vừa đăng ký thanh toán xong, thì trong vài phút có thư mục `タレント/<mã>_<tên>/` với đủ các file và thư mục con mẫu.
2. Cho tài khoản công ty vừa được tạo, thì thư mục được tạo ngay, không cần thanh toán.
3. Cho sự kiện thanh toán tới hai lần, thì chỉ có một thư mục.
4. Cho Microsoft Graph lỗi liên tục, thì M-07 hiện "lỗi tạo thư mục", và bấm tạo lại thì tạo được khi dịch vụ đã chạy lại.
5. Cho quản lý đổi tên thư mục trên OneDrive, thì sáng hôm sau 2-1 vẫn đọc được thư mục đó.

## Ngoài phạm vi của chức năng này

- Tạo phía ChatGPT cho tài năng (2-3). Đơn đăng ký và cài duyệt bài (1-4).

## Phụ thuộc

- 1-1 (sự kiện đã đăng ký thanh toán, 🔴): dùng sự kiện giả khi thử. 1-2 (tạo tài khoản công ty).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認55 (giữ thư mục bao lâu sau khi ngừng).

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S02-02 | Thư mục gốc đặt ở đâu; quyền Microsoft Graph | Có (chạy thật) | Dùng OneDrive giả khi viết mã |
| S02-03 | Quản lý biết thư mục đã tạo bằng cách nào | Không | Hiện ở M-06, M-07 |
| S02-04 | Cấu trúc thư mục và file mẫu | Không | Như trên |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP02: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-4 (2-2), §7-2, §7-3, UC-01 前提, UC-02 前提.
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 4. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 4, 7, câu I3.

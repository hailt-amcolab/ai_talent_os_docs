# Kết quả triển khai Supabase — foundation đợt 1

Project: `xpgayrrmgnbfkzubcfql` · PostgreSQL 17.12 · database `postgres`.

- Migration: `20261117000300_confirmed_scope_foundation`.
- Hoàn tất theo lịch sử Prisma (UTC): `2026-11-17T16:56:52.008Z`.
- Kiểm chứng sau triển khai (UTC): `2026-11-17T17:00:38.300Z`.
- SHA-256 migration: `5e0020bc6a1f73e3c7bac39a2fbc59af88691fdbe04d5f2c68d2c4c223037808`.

## Phạm vi đã triển khai

Đã áp migration trong repository lên project Supabase đang cấu hình. Không sửa ba migration đã áp trước đó. Scope vẫn theo [10](10_confirmed_scope_and_remediation.md): nền tảng danh tính/phiên, ownership, operation/outbox, least privilege và chặn phần chưa chốt; không mở EP06/EP08 hay các luồng DEFERRED.

Đã thay trigger Auth một chiều bằng FK thật; Auth managed table/column inventory giữ nguyên, chỉ bỏ custom delete trigger cũ như migration quy định. Không tạo/xóa người dùng Supabase Auth, không gọi nhà cung cấp bên ngoài hay gửi thông báo.

## Trước triển khai

- Kiểm tra đúng project, primary PostgreSQL 17.12, checksum cả ba migration cũ khớp repository; không có migration lỗi chưa xử lý.
- Các bảng nghiệp vụ và auth.users rỗng; chỉ có 1 dòng system_settings. Không có bài/video đang chạy hoặc orphan/cross-owner cản nâng cấp.
- Lưu snapshot dữ liệu các bảng ứng dụng, migration history, metadata cột/constraint/index/trigger/function/grants và settings vào thư mục riêng quyền hạn chế trong `/tmp/talent-supabase-deployment`. Lưu bản SQL ba migration cũ kèm theo để tái tạo baseline.
- Đây là snapshot phạm vi ứng dụng, **không phải full physical backup/PITR của toàn bộ Supabase**. Máy có pg_dump 16, thấp hơn server 17, nên không dùng pg_dump sai phiên bản và không tuyên bố đã có bản full backup. Dữ liệu ứng dụng thực tế chỉ gồm dòng settings nói trên.
- Chạy toàn bộ migration trong transaction ROLLBACK ngay trên project: thành công và kiểm lại trạng thái cũ/role mới chưa được commit, rồi mới Prisma migrate deploy chính thức.

## Kiểm chứng sau triển khai

| Kiểm tra | Kết quả |
|---|---|
| Prisma migration status | Database schema is up to date, 4 migration đã áp |
| Safe Prisma diff từ database thật tới schema | Empty migration; không có drift hoặc đề xuất sửa/xóa Auth |
| Bảng ứng dụng | 31 bảng, không tính _prisma_migrations |
| RLS | Bật trên toàn bộ bảng ứng dụng; migration metadata vẫn được bảo vệ |
| Constraints được đặt tên trong migration | 33 constraints tồn tại và đã validate |
| Triggers mới | 23 triggers tồn tại và enabled |
| Grants bảng cho PUBLIC/anon/authenticated | 0 |
| USAGE app_private cho anon/authenticated | Không có |
| Hai capability roles | NOLOGIN, không superuser/CREATEDB/CREATEROLE/REPLICATION/BYPASSRLS |
| Auth managed tables/columns | Không đổi |
| Settings | Giữ nguyên dữ liệu trước triển khai |
| Dữ liệu nghiệp vụ sau kiểm chứng | Vẫn rỗng; không lưu fixture kiểm thử |

Các negative checks dùng savepoint/transaction rollback trên project thật:

| Thao tác | SQLSTATE nhận được |
|---|---|
| Manager tham chiếu Auth không tồn tại | 23503 |
| Đơn approved thiếu người quyết định | 23514 |
| Ghi SNS đang DEFERRED | 55000 |
| Runtime TRUNCATE hoặc UPDATE log | 42501 |
| Runtime ALTER bảng | 42501 |
| Runtime đọc billing đang DEFERRED | 42501 |

Supabase hạn chế postgres SET ROLE sang capability role mới; kiểm quyền được thực hiện bằng **kết nối LOGIN runtime thật**, không cấp thêm SET/BYPASSRLS cho owner để vượt hạn chế.

## Kết nối backend

- Đã tạo LOGIN `talent_api` bằng mật khẩu ngẫu nhiên riêng, chỉ cấp nhóm talent_runtime và CONNECT database; không cấp ownership hay quyền quản trị.
- Đã kiểm `connectDatabase` cùng startup guard qua pooler 6543, xác minh current_user là LOGIN mới và đọc system_settings thành công.
- Đã thay DATABASE_URL trong apps/api/.env; DIRECT_URL giữ nguyên cho migration. Các biến VAPID và giá trị cấu hình khác giữ nguyên. Không đưa mật khẩu vào tài liệu/Git/log.
- API process/container đang chạy cần restart để nạp DATABASE_URL mới. Lần triển khai này không publish frontend hoặc deploy API lên VPS.

## Kết luận

**DEPLOYED AND VERIFIED — foundation DB đợt 1 trên Supabase.** Các tính năng còn Open vẫn bị chặn ghi. Auth SDK/guard HTTP đầy đủ, worker/provider integrations, flow đăng bài và thu phí vẫn cần implementation/kiểm thử riêng; triển khai schema không thay thế việc đó.

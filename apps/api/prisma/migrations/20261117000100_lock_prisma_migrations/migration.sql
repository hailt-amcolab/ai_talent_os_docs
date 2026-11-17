-- Bảng _prisma_migrations do Prisma tạo nên không có trong migration đầu; Supabase cấp sẵn quyền cho anon, authenticated
-- ở mọi bảng mới trong public, khiến lịch sử migration đọc được qua Data API. Khóa lại như các bảng khác (R10-08).
-- Có điều kiện: DB tạm (shadow database) khi tạo migration mới không có bảng này.
DO $$
BEGIN
  IF to_regclass('public._prisma_migrations') IS NOT NULL THEN
    ALTER TABLE public._prisma_migrations ENABLE ROW LEVEL SECURITY;
    REVOKE ALL ON TABLE public._prisma_migrations FROM PUBLIC, anon, authenticated;
  END IF;
END $$;

-- IR-03 đổi từ cách (a) sang cách (c) có chốt chặn (17/11/2026).
-- Khóa ngoại sang schema auth làm Prisma không đọc được cấu trúc DB (lỗi P4002), nên `migrate dev`, `db pull`
-- không chạy thẳng trên Supabase. Thay bằng trigger trên auth.users: Prisma chỉ đọc schema public, không thấy trigger này.

-- 1. Bỏ khóa ngoại sang auth.users
ALTER TABLE managers DROP CONSTRAINT IF EXISTS fk_managers_auth_user_id;
ALTER TABLE talents DROP CONSTRAINT IF EXISTS fk_talents_auth_user_id;

-- 2. Chặn xóa người dùng Auth còn được managers, talents tham chiếu (thay cho ON DELETE RESTRICT).
--    SECURITY DEFINER: người xóa thường là role của Supabase Auth, không có quyền đọc bảng của BE.
--    Chiều thêm dòng do BE bảo đảm: tạo người dùng Auth trước, ghi đúng id được trả về.
CREATE FUNCTION block_referenced_auth_user_delete() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.managers WHERE auth_user_id = OLD.id)
     OR EXISTS (SELECT 1 FROM public.talents WHERE auth_user_id = OLD.id) THEN
    RAISE EXCEPTION 'auth user % is referenced by managers or talents', OLD.id
      USING ERRCODE = 'foreign_key_violation';
  END IF;
  RETURN OLD;
END $$;
REVOKE ALL ON FUNCTION block_referenced_auth_user_delete() FROM PUBLIC, anon, authenticated;

-- DB tạm (shadow database) của Prisma không có schema auth: bỏ qua.
DO $$
BEGIN
  IF to_regclass('auth.users') IS NOT NULL THEN
    CREATE TRIGGER trg_auth_users_block_referenced_delete
      BEFORE DELETE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.block_referenced_auth_user_delete();
  END IF;
END $$;

-- 3. Bảng, sequence, hàm tạo sau này trong public không còn tự cấp quyền cho anon, authenticated (R10-08).
--    Áp cho đối tượng do role chạy migration tạo ra.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM PUBLIC, anon, authenticated;

-- 4. Mọi bảng mới trong public tự bật RLS (không tạo policy: FE không đọc DB).
CREATE FUNCTION enable_rls_on_new_table() RETURNS event_trigger
LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
             WHERE command_tag = 'CREATE TABLE' AND schema_name = 'public' LOOP
    EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', cmd.object_identity);
  END LOOP;
END $$;
REVOKE ALL ON FUNCTION enable_rls_on_new_table() FROM PUBLIC, anon, authenticated;

CREATE EVENT TRIGGER evt_enable_rls_on_new_table ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE') EXECUTE FUNCTION enable_rls_on_new_table();

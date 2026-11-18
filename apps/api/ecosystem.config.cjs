// Cấu hình PM2. Trong Docker chạy bằng `pm2-runtime ecosystem.config.cjs`.
// Không dùng Docker thì trên VPS: `npm ci && npm run build && npx pm2 start ecosystem.config.cjs`.
module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/server.js',
      // cluster: chạy nhiều tiến trình dùng chung cổng, `pm2 reload api` không làm rớt request
      exec_mode: 'cluster',
      instances: Number(process.env.API_INSTANCES || 1),
      max_memory_restart: '512M',
      kill_timeout: 10000, // khớp thời gian chờ đóng server trong src/server.ts
      // Lấy theo môi trường (compose: APP_ENV); không đặt thì production.
      env: { NODE_ENV: process.env.NODE_ENV || 'production' },
    },
    // Worker (đợt AI 8:00, video, Upload-Post, gửi push theo lịch): thêm app thứ hai script 'dist/worker.js',
    // exec_mode 'fork', instances 1. Xem agent_spec/TECH_STACK_VA_CAU_TRUC_DU_AN.md mục 4.
  ],
}

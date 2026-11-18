// Cấu hình phía trình duyệt. Mọi giá trị NEXT_PUBLIC_* được Next.js gắn vào lúc build, không phải lúc chạy.
// ponytail: tên, mô tả, màu là giá trị tạm; thay khi khách gửi tên, logo, màu của ứng dụng アデッソ (C-06),
// rồi chạy lại `npm run icons` hoặc chép logo thật vào public/icons/.
export const APP = {
  name: 'AI Talent OS',
  shortName: 'AI Talent OS',
  description: 'An AI coach that supports talents with their social media posts',
  themeColor: '#f9a8c9',
  backgroundColor: '#ffffff',
}

// URL của BE (apps/api). FE không có API riêng; mọi dữ liệu lấy qua đây.
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')

// Khóa công khai VAPID: phải trùng khóa của BE. Rỗng thì không bật được thông báo đẩy.
export const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''

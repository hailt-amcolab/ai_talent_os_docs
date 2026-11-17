// Tạo biểu tượng TẠM (nền hồng, hình tròn trắng). Thay bằng logo アデッソ khi khách gửi (C-06).
// Chạy: node scripts/gen-icons.mjs
import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}

// bg: [r,g,b,a] nền; fg: màu hình tròn; ratio: bán kính / nửa cạnh
function png(size, bg, fg, ratio) {
  const raw = Buffer.alloc((size * 4 + 1) * size)
  const c = (size - 1) / 2, r = (size / 2) * ratio
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0
    for (let x = 0; x < size; x++) {
      const inside = (x - c) ** 2 + (y - c) ** 2 <= r * r
      const px = inside ? fg : bg
      px.forEach((v, i) => { raw[y * (size * 4 + 1) + 1 + x * 4 + i] = v })
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 6 // 8 bit, RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
  ])
}

const PINK = [249, 168, 201, 255], WHITE = [255, 255, 255, 255], CLEAR = [0, 0, 0, 0]
writeFileSync('public/icons/icon-192.png', png(192, PINK, WHITE, 0.6))
writeFileSync('public/icons/icon-512.png', png(512, PINK, WHITE, 0.6))
writeFileSync('public/icons/icon-maskable-512.png', png(512, PINK, WHITE, 0.4)) // logo trong vùng an toàn 80%
writeFileSync('public/icons/badge-72.png', png(72, CLEAR, WHITE, 0.8))         // Android: đơn sắc, nền trong suốt
writeFileSync('app/apple-icon.png', png(180, PINK, WHITE, 0.6))                  // iPhone (apple-touch-icon)
writeFileSync('app/icon.png', png(32, PINK, WHITE, 0.6))                         // favicon
console.log('icons written')

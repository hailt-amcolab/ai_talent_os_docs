import copy,statistics,logging
import pdfplumber
logging.getLogger('pdfminer').setLevel(logging.ERROR)
cross={
2315:['• AI (nhắc, đề xuất, hội thoại, tổng kết, cải thiện); trao đổi và màn hình LINE\n• Quản trị (duyệt, thông báo, cài đặt Talent), tạo video\n• Lên lịch, lấy kết quả, thu phí tháng và video vượt mức','Instagram, TikTok, YouTube: Cùng nội dung trên 3 mạng, cơ bản 1 bài/ngày. Bắt đầu ít Talent, tối đa 150, khoảng 5 quản lý.'],
2517:['Xây ứng dụng web, mở liên kết từ ứng dụng hiện có; kế thừa đăng nhập (SSO). Phối hợp đơn vị phát triển ứng dụng (đang xác nhận).','Trước tiên chạy độc lập. Thời điểm và phương thức tích hợp sẽ trao đổi.','Ưu tiên đăng được bài; trao đổi triển khai sau vận hành. Cần ký dịch vụ khác.','Xin chuyển sang giai đoạn sau.','Đăng nhập riêng với ứng dụng DM để không ảnh hưởng gửi DM và không phát sinh phí sửa.','Giả định thỏa thuận riêng với Talent. Đăng ký trên màn hình có thể thuộc bán hàng từ xa theo luật; cần thêm xác nhận, thông tin, hủy nên tăng phí.','Trao đổi phạm vi và cách làm sau xác định ai dùng màn hình nào.','Cần chốt 24/365, ngày thường 9–18h hay cả cuối tuần; có gồm bảo trì DM không. Phí thay đổi đáng kể.','Có trong phạm vi. Quản lý chỉ dẫn và duyệt bài.','Nếu hỗ trợ, cần màn hình đăng ký, xác minh danh tính và cơ chế thu phí.'],
2629:['• “Xem đề xuất” → L-03\n• “Gửi ảnh/video” → L-05','Dùng màn hình chuẩn LINE nên không phát triển. Gửi/nhận bằng Messaging API.'],
2650:['• “Kết nối” → Màn hình dịch vụ đăng bài\n• “Trang chủ” → L-03','Dùng màn hình dịch vụ (không phát triển). Talent tự chuyển tài khoản nhà sáng tạo.'],
2671:['• Chọn → Lên lịch\n• Yêu cầu sửa → L-00 (chat)\n• Gửi ảnh/video → L-05\n• Tạo video → L-06\n• Bật/tắt yêu cầu duyệt','Bài công việc: Talent yêu cầu quản lý duyệt (M-03).'],
2681:['• “Chọn ảnh/video” (nhiều tệp)\n• “Gửi” → L-04','Tải trực tiếp URL ký do API cấp. Hỗ trợ tệp lớn, mất mạng. Giới hạn dung lượng và có gửi qua chat không chốt khi định nghĩa yêu cầu.'],
2691:['• Chọn → L-07\n• Yêu cầu tạo lại (tính 1 lượt)','Tạo lại tính 1 lượt. Vượt lượt miễn phí thì cộng phí tháng cuối tháng. Tài khoản miễn phí không tạo được video.'],
2762:['“Duyệt” → Lên lịch rồi về M-03','Không phát triển trả về sửa (không duyệt thì không đăng).'],
2793:['• Hủy lịch\n• Duyệt → M-04\n• Chuyển sang miễn phí','Không chuyển miễn phí sang trả phí. Cách thay lịch chốt khi định nghĩa yêu cầu.']}
def arrange(doc,translator):
 with pdfplumber.open(doc['path']) as pdf:
  for pi,(page,pg) in enumerate(zip(pdf.pages,doc['pages'])):
   tables=page.find_tables();cells=[tuple(c) for t in tables for c in t.cells];assigned={c:[] for c in cells};rest=[]
   for b in pg['blocks']:
    if b['id']==2519:continue
    cell=next((c for c in cells if c[0]-.7<=b['x0']<c[2] and c[1]-.7<=b['top']<c[3]),None)
    if cell is None:rest.append(b);continue
    if b['id'] in cross:
     col=sorted([c for c in cells if abs(c[0]-cell[0])<1 and c[1]>=cell[1]-.7],key=lambda c:c[1])
     for c,t in zip(col,cross[b['id']]):
      z=b.copy();z['translation']=t;z['bottom']=c[3]-3;assigned[c].append(z)
    else:assigned[cell].append(b)
   for cell,bs in assigned.items():
    if not bs:continue
    x0,y0,x1,y1=cell
    ts=[b.get('translation') or translator(b['id'],b['text']) for b in sorted(bs,key=lambda b:(b['top'],b['x0']))]
    t=' '.join(ts)
    z=bs[0].copy();z.update(x0=x0+6,x1=x1-6,top=y0+5,bottom=y1-5,translation=t,cell=True)
    rest.append(z)
   pg['blocks']=rest

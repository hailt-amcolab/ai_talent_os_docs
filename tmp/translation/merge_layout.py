groups=[
([43,48],None),([82,85],None),([106,108],None),([127,129],None),([191,196],None),([220,222],None),([244,246],None),([267,273],None),([308,312],None),
([357,358,363],None),([388,389],None),([421,423],None),([438,439],None),([492,502],None),([699,700],None),([936,943],None),([946,951],None),([1012,1020],None),([1069,1073],None),([1126,1135],None),([1201,1202],None),([1204,1208],None),([1265,1269],None),
([1609,1612],None),([1610,1613],None),([1611,1614],None),
([2329,2330,2331],'Giúp Talent duy trì đăng mạng xã hội và quảng bá bản thân. Mỗi người có một huấn luyện viên AI nhắc hằng ngày, chuẩn bị đề xuất/video phù hợp và cùng tổng kết. Tăng phát ngôn, người theo dõi, nhận diện để tạo cơ hội công việc.'),
([2335,2338,2340],'• Xây bí quyết để bài phát triển: Thiết lập nhân vật, từ cấm, đối sách thuật toán và chỉ dẫn AI'),([2344,2346],None),([2336,2339],None),([2341,2343],None),([2345,2347],None),([2349,2350],None),([2337,2342],None),([2351,2352],None),
([2486,2487],'Lấy 6 chỉ số: Lượt hiển thị, tiếp cận (số người xem), lượt thích, bình luận, lưu và chia sẻ.'),
([2507,2508,2509],'• 6 chỉ số dự kiến dựa trên tài liệu dịch vụ, cần kết nối kiểm tra. • Dự kiến TikTok không lấy được lượt lưu; YouTube không lấy được tiếp cận và lưu (theo tài liệu công khai Upload-Post dự kiến sử dụng).'),
([2568,2569],'Trước tiên, với ít Talent, xây luồng từ lời nhắc AI đến đăng bài, tạo video và thu phí. Bảng thể hiện thứ tự giai đoạn, không phải thời lượng. Tạo video có thể sang giai đoạn 2. Xét duyệt thanh toán bắt đầu ngay đầu giai đoạn 1.'),
([2831,2832,2834],'• Cách dùng: Quản lý mở và thao tác trên giao diện ChatGPT.'),([2836,2838],None),([2840,2841],None),([2833,2835],None),([2837,2839],None),([2842,2843],None),([2845,2846],None),
([2851,2852],None),([2855,2857],None),([2859,2860,2863],'• Một suất Talent gồm cả Instagram, TikTok và YouTube.'),([2865,2867],None),([2869,2871],None),([2856,2858],None),([2861,2862,2864],'• Mỗi tài khoản dùng một suất, nên một người cần 3 suất.'),([2866,2868],None),([2870,2872],None),
([2897,2898],'(B) Không chỉ đắt hơn mà còn không hỗ trợ Talent tự kết nối mạng xã hội. Vì vậy chúng tôi chọn (A).'),([2921,2922],None),([2924,2925],None),([2926,2927],None)
]
def merge(docs,tr):
 for d in docs:
  if d['kind']!='pdf':continue
  for pg in d['pages']:
   for ids,custom in groups:
    bs=[next((b for b in pg['blocks'] if b['id']==i),None) for i in ids]
    if any(b is None for b in bs):continue
    z=bs[0].copy();z.update(x0=min(b['x0'] for b in bs),x1=max(b['x1'] for b in bs),top=min(b['top'] for b in bs),bottom=max(b['bottom'] for b in bs),translation=custom or ' '.join(tr(b['id'],b['text']) for b in bs))
    pg['blocks']=[b for b in pg['blocks'] if b['id'] not in ids]+[z]

import zipfile,pathlib,base64,html,re
from lxml import etree
P=pathlib.Path('output/Vietnamese/03_Dinh_nghia_yeu_cau_tong_quan_VI.docx')
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships','wp':'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}
W='{'+ns['w']+'}'
def get(el,path,attr='val',default=None):
 e=el.find(path,ns)
 return e.get(W+attr,default) if e is not None else default
with zipfile.ZipFile(P) as z:
 root=etree.fromstring(z.read('word/document.xml'));sty=etree.fromstring(z.read('word/styles.xml'))
 rel={r.get('Id'):r.get('Target') for r in etree.fromstring(z.read('word/_rels/document.xml.rels'))}
 styles={s.get(W+'styleId'):s for s in sty.findall('w:style',ns)}
 def props(p):
  sid=get(p,'w:pPr/w:pStyle');s=styles.get(sid)
  chain=[];seen=set()
  while s is not None and s.get(W+'styleId') not in seen:
   seen.add(s.get(W+'styleId'));chain.insert(0,s);s=styles.get(get(s,'w:basedOn'))
  chain.append(p);css={}
  for el in chain:
   for attr,key,scale in [('before','margin-top',20),('after','margin-bottom',20)]:
    v=get(el,'w:pPr/w:spacing',attr)
    if v:css[key]=str(int(v)/scale)+'pt'
   size=get(el,'w:rPr/w:sz')
   if size:css['font-size']=str(int(size)/2)+'pt'
   if el.find('w:rPr/w:b',ns) is not None:css['font-weight']='bold'
   if el.find('w:pPr/w:pageBreakBefore',ns) is not None:css['break-before']='page'
   if el.find('w:pPr/w:keepNext',ns) is not None:css['break-after']='avoid'
   align=get(el,'w:pPr/w:jc')
   if align:css['text-align']={'both':'justify'}.get(align,align)
  return css
 def paragraph(p):
  css=props(p);out=[]
  for r in p.xpath('.//w:r',namespaces=ns):
   st=[]
   size=get(r,'w:rPr/w:sz');color=get(r,'w:rPr/w:color')
   if size:st.append(f'font-size:{int(size)/2}pt')
   if color and color!='auto':st.append('color:#'+color)
   if r.find('w:rPr/w:b',ns) is not None:st.append('font-weight:bold')
   if r.find('w:rPr/w:i',ns) is not None:st.append('font-style:italic')
   parts=[]
   for el in r:
    if el.tag==W+'t':parts.append(html.escape(el.text or ''))
    elif el.tag==W+'tab':parts.append('&emsp;')
    elif el.tag==W+'br':parts.append('<br>')
    elif el.tag==W+'drawing':
     for blip in el.xpath('.//a:blip',namespaces=ns):
      target=rel[blip.get('{'+ns['r']+'}embed')].replace('\\','/')
      name='word/'+target if not target.startswith('/') else target.lstrip('/')
      data=z.read(name);ex=el.find('.//wp:extent',ns);wi=int(ex.get('cx'))/9525 if ex is not None else 650
      mime='image/png' if name.endswith('.png') else 'image/jpeg'
      parts.append(f'<img src="data:{mime};base64,{base64.b64encode(data).decode()}" style="width:{wi}px;max-width:100%;height:auto;max-height:850px;object-fit:contain">')
   out.append('<span style="'+';'.join(st)+'">'+''.join(parts)+'</span>')
  if p.find('w:pPr/w:numPr',ns) is not None:out.insert(0,'• ')
  return '<p style="'+';'.join(k+':'+v for k,v in css.items())+'">'+''.join(out)+'</p>'
 def table(t):
  out=['<table>']
  grid=t.findall('w:tblGrid/w:gridCol',ns);widths=[float(c.get(W+'w')) for c in grid]
  if widths:out.append('<colgroup>'+''.join(f'<col style="width:{w/sum(widths)*100}%">' for w in widths)+'</colgroup>')
  for row in t.findall('w:tr',ns):
   out.append('<tr>')
   for cell in row.findall('w:tc',ns):
    fill=get(cell,'w:tcPr/w:shd','fill');span=get(cell,'w:tcPr/w:gridSpan',default='1')
    out.append(f'<td colspan="{span}" style="background:#{fill if fill and fill!="auto" else "ffffff"}">'+''.join(paragraph(p) for p in cell.findall('w:p',ns))+'</td>')
   out.append('</tr>')
  return ''.join(out)+'</table>'
 body=root.find('w:body',ns);out=[]
 for el in body:
  if el.tag==W+'p':out.append(paragraph(el))
  elif el.tag==W+'tbl':out.append(table(el))
  elif el.tag==W+'sdt':out.extend(paragraph(p) for p in el.xpath('.//w:p',namespaces=ns))
 text='<!doctype html><meta charset="utf-8"><style>@page{size:A4;margin:20mm 20mm 20mm 20mm}*{box-sizing:border-box}body{font:11pt Arial;line-height:1.25;margin:0;color:#222}p{margin:0 0 7pt;min-height:1pt}table{border-collapse:collapse;table-layout:fixed;width:100%;margin:8pt 0;font-size:9pt}td{padding:5pt;border:0.5pt solid #ccc;vertical-align:top;overflow-wrap:anywhere}td p{margin:0 0 3pt}tr{break-inside:avoid}img{display:inline-block;break-inside:avoid}p:has(img){break-inside:avoid}</style>'+''.join(out)
pathlib.Path('tmp/translation/docx_preview.html').write_text(text,encoding='utf-8')
print('HTML preview ready',len(text))


import json,re,pathlib,io,zipfile,hashlib,copy,math,sys
from lxml import etree
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader,PdfWriter
from pypdf.generic import ContentStream,NameObject,TextStringObject,ArrayObject
from check import tr,units
BASE=pathlib.Path(__file__).parent
ROOT=BASE.parent.parent
OUT=ROOT/'output/Vietnamese';OUT.mkdir(parents=True,exist_ok=True)
docs=json.loads((BASE/'structure.json').read_text(encoding='utf-8'))
from merge_layout import merge
merge(docs,tr)
from table_layout import arrange
arrange(docs[3],tr)
pdfmetrics.registerFont(TTFont('VN','C:/Windows/Fonts/calibri.ttf'))
pdfmetrics.registerFont(TTFont('VNB','C:/Windows/Fonts/calibrib.ttf'))
audit=[]
def strip_stream(stream,reader,resources,visited,drop_text_images=False):
 cs=ContentStream(stream,reader);ops=[];font='';ctm=[1,0,0,1,0,0];stack=[]
 fonts=resources.get('/Font',{})
 for operands,operator in cs.operations:
  if operator==b'q':stack.append(ctm[:])
  elif operator==b'Q' and stack:ctm=stack.pop()
  elif operator==b'cm':
   a,b,c,d,e,f=map(float,operands);A,B,C,D,E,F=ctm
   ctm=[a*A+b*C,a*B+b*D,c*A+d*C,c*B+d*D,e*A+f*C+E,e*B+f*D+F]
  if operator==b'Do' and drop_text_images:
   ob=resources.get('/XObject',{}).get(operands[0]);ob=ob.get_object() if ob else {}
   if ob.get('/Subtype')=='/Image' and abs(ctm[3])<64 and abs(ctm[0])<660:continue
  if operator==b'Tf':
   font=str(fonts.get(operands[0],{}).get_object().get('/BaseFont','')) if operands[0] in fonts else ''
  if operator in [b'Tj',b'TJ',b"'",b'"'] and not any(s in font.lower() for s in ['awesome','symbol','dingbat']):
   if operator==b'Tj':operands=[TextStringObject('')]
   elif operator==b'TJ':operands=[ArrayObject([])]
   elif operator==b"'":operands=[TextStringObject('')]
   else:operands=[*operands[:2],TextStringObject('')]
  ops.append((operands,operator))
 cs.operations=ops
 for ref in resources.get('/XObject',{}).values():
  ob=ref.get_object();ident=id(ob)
  if ob.get('/Subtype')=='/Form' and ident not in visited:
   visited.add(ident);ns=strip_stream(ob,reader,ob.get('/Resources',resources),visited,drop_text_images);ob.set_data(ns.get_data())
 return cs
def split_lines(t,width,font,size):
 lines=[]
 for para in t.split('\n'):
  cur=''
  for word in para.split():
   test=(cur+' '+word).strip()
   if cur and pdfmetrics.stringWidth(test,font,size)>width:lines.append(cur);cur=word
   else:cur=test
  lines.append(cur)
 return lines or ['']
def col(c):
 if isinstance(c,(int,float)):return (float(c),)*3
 if len(c)==3:return tuple(c)
 if len(c)==1:return (float(c[0]),)*3
 if len(c)==4:
  a,b,d,k=c;return (1-min(1,a+k),1-min(1,b+k),1-min(1,d+k))
 return (0,0,0)
def clean(t):
 return ''.join(ch for ch in t if not (0xE000<=ord(ch)<=0xF8FF) and (ord(ch)>=32 or ch=='\n'))
names=['04_Man_hinh_ung_dung_Talent_VI.pdf','05_Man_hinh_quan_tri_Manager_VI.pdf','02_So_do_chuyen_man_hinh_VI.pdf','01_Tai_lieu_giai_thich_yeu_cau_VI.pdf']
for di,d in enumerate(docs):
 if d['kind']!='pdf':continue
 reader=PdfReader(d['path']);writer=PdfWriter();visited=set();overlays=[]
 for pn,(page,pg) in enumerate(zip(reader.pages,d['pages'])):
  page[NameObject('/Contents')]=strip_stream(page.get_contents(),reader,page['/Resources'],visited,di==3)
  buf=io.BytesIO();c=canvas.Canvas(buf,pagesize=(pg['width'],pg['height']))
  for b in pg['blocks']:
   t=b.get('translation') or tr(b['id'],b['text']);assert t is not None,(b['id'],b['text'])
   t=clean(t)
   if not t.strip():continue
   font='VNB' if b['bold'] else 'VN';orig=b['size'];sz=orig
   # Preserve the original box and line count; allow a small glyph-bearing margin.
   width=max(3,b['x1']-b['x0']+1.5);height=max(orig,b['bottom']-b['top'])
   if height<orig*1.5 and not b.get('cell') and not (di==0 and pn==0):
    near=[z['x0'] for z in pg['blocks'] if z['x0']>b['x1'] and abs(z['top']-b['top'])<orig*.8]
    right=min(near,default=pg['width']-12)
    width=min(width*1.22,max(width,right-b['x0']-2))
   for k in range(140):
    ls=split_lines(t,width,font,sz)
    if len(ls)*sz*1.13<=height*1.12 and max(pdfmetrics.stringWidth(l,font,sz) for l in ls)<=width+.2:break
    sz*=.97
   if sz<orig*.58:audit.append({'file':names[di],'page':pn+1,'id':b['id'],'ratio':sz/orig,'text':t})
   c.setFillColorRGB(*col(b['color']));c.setFont(font,sz)
   y=pg['height']-b['top']-sz*.87
   for l in ls:c.drawString(b['x0'],y,l);y-=sz*1.13
  c.save();overlay=PdfReader(buf);overlays.append(overlay);page.merge_page(overlay.pages[0]);writer.add_page(page)
 path=OUT/names[di]
 with path.open('wb') as f:writer.write(f)
 print('CREATED',path.name,len(writer.pages),'pages',flush=True)
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
W='{'+ns['w']+'}'
source=pathlib.Path(next(d['path'] for d in docs if d['kind']=='docx'))
ds={d['xml']:d for d in docs if d['kind']=='docx'}
with zipfile.ZipFile(source) as zin,zipfile.ZipFile(OUT/'03_Dinh_nghia_yeu_cau_tong_quan_VI.docx','w',zipfile.ZIP_DEFLATED) as zout:
 for info in zin.infolist():
  data=zin.read(info.filename)
  if info.filename in ds:
   root=etree.fromstring(data);ix=0
   for p in root.xpath('//w:p',namespaces=ns):
    ts=p.xpath('.//w:t',namespaces=ns);s=''.join(t.text or '' for t in ts)
    if not s.strip():continue
    e=ds[info.filename]['paragraphs'][ix];ix+=1;assert s==e['text']
    v=tr(e['id'],s);assert v is not None,(e['id'],s)
    # Distribute over existing runs so embedded fields, images and emphasis survive.
    jp=sum(len(t.text or '') for t in ts);at=0
    for ti,t in enumerate(ts):
     if ti==len(ts)-1:part=v[at:]
     else:
      end=round(sum(len(x.text or '') for x in ts[:ti+1])*len(v)/max(1,jp)) if False else at+round(len(t.text or '')*len(v)/max(1,jp))
      part=v[at:end]
     at+=len(part);t.text=part;t.set('{http://www.w3.org/XML/1998/namespace}space','preserve')
    for r in p.xpath('.//w:r',namespaces=ns):
     if not r.xpath('./w:t',namespaces=ns):continue
     rp=r.find(W+'rPr')
     if rp is None:rp=etree.Element(W+'rPr');r.insert(0,rp)
     rf=rp.find(W+'rFonts')
     if rf is None:rf=etree.SubElement(rp,W+'rFonts')
     for a in ['ascii','hAnsi','eastAsia','cs']:rf.set(W+a,'Arial')
     for a in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:
      rf.attrib.pop(W+a,None)
     lang=rp.find(W+'lang')
     if lang is None:lang=etree.SubElement(rp,W+'lang')
     lang.set(W+'val','vi-VN');lang.set(W+'eastAsia','vi-VN')
   data=etree.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
  elif info.filename=='word/styles.xml':
   root=etree.fromstring(data)
   for f in root.xpath('//w:rFonts',namespaces=ns):
    for a in ['ascii','hAnsi','eastAsia','cs']:f.set(W+a,'Arial')
    for a in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:f.attrib.pop(W+a,None)
   data=etree.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
  zout.writestr(info,data)
print('CREATED DOCX',flush=True)
(BASE/'layout_audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
print('SMALL TEXT BOXES',len(audit),flush=True)

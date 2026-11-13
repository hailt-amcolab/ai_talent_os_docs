from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from zipfile import ZipFile
from lxml import etree
from pypdf import PdfReader
import hashlib,json,re,subprocess,sys
sys.path.insert(0,str(Path(__file__).parent))
from check import tr,units
root=Path('D:/TalentOS');base=root/'tmp/translation';out=root/'output/Vietnamese'
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
qa=base/'qa';preview=qa/'03_Docx_preview';preview.mkdir(exist_ok=True)
exe='C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt/dependencies/native/poppler/Library/bin/pdftoppm.exe'
subprocess.run([exe,'-scale-to','1100','-png',str(base/'docx_preview.pdf'),str(preview/'page')],check=True)
for folder in qa.iterdir():
 if not folder.is_dir():continue
 files=sorted(folder.glob('page-*.png'))
 for batch in range(0,len(files),6):
  group=files[batch:batch+6];cw=550;ch=820 if folder.name.startswith('03') else (810 if folder.name.startswith('02') else 355)
  sheet=Image.new('RGB',(cw*2,ch*3),'#dddddd');draw=ImageDraw.Draw(sheet)
  for j,p in enumerate(group):
   im=Image.open(p).convert('RGB');im.thumbnail((cw-12,ch-32));x=(j%2)*cw+(cw-im.width)//2;y=(j//2)*ch+28
   sheet.paste(im,(x,y));draw.text(((j%2)*cw+9,(j//2)*ch+5),folder.name[:15]+' / '+p.stem,font=font,fill='black')
  sheet.save(base/f'contact_{folder.name[:2]}_{batch//6+1}.jpg',quality=88)
source=next(root.glob('*.docx'));target=out/'03_Dinh_nghia_yeu_cau_tong_quan_VI.docx'
with ZipFile(source) as a,ZipFile(target) as b:
 imgs=[n for n in a.namelist() if n.startswith('word/media/')]
 assert all(a.read(n)==b.read(n) for n in imgs),'Image changed'
 ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
 ar=etree.fromstring(a.read('word/document.xml'));br=etree.fromstring(b.read('word/document.xml'))
 assert len(ar.xpath('//w:p',namespaces=ns))==len(br.xpath('//w:p',namespaces=ns))
 assert len(ar.xpath('//w:tbl',namespaces=ns))==len(br.xpath('//w:tbl',namespaces=ns))
 texts=[''.join(p.xpath('.//w:t/text()',namespaces=ns)) for p in br.xpath('//w:p',namespaces=ns)]
 remaining=[s for s in texts if re.search(r'[\u3040-\u30fa\u4e00-\u9fff]',s)]
 assert not remaining,remaining
 print('DOCX: image bytes identical:',len(imgs),'tables:',len(br.xpath('//w:tbl',namespaces=ns)),'paragraphs:',len(texts),'Japanese text remaining:',len(remaining))
for p in out.glob('*.pdf'):print(p.name,'pages',len(PdfReader(p).pages))
print('DOCX preview pages:',len(PdfReader(base/'docx_preview.pdf').pages))
print('Contact sheets:',len(list(base.glob('contact_*.jpg'))))

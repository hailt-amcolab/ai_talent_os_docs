import pathlib,json,re,statistics,zipfile
import pdfplumber
from lxml import etree
ROOT=pathlib.Path('D:/TalentOS')
OUT=ROOT/'tmp/translation';OUT.mkdir(parents=True,exist_ok=True)
def norm(s):
 s=re.sub(r'(?<=[\u3000-\u9fff])\s+(?=[\u3000-\u9fff])','',s)
 return re.sub(r'\s+',' ',s).strip()
allunits=[]; docs=[]
for n,p in enumerate(sorted(ROOT.rglob('*.pdf'))):
 if 'tmp' in p.parts:continue
 pages=[]
 with pdfplumber.open(p) as pdf:
  for pg in pdf.pages:
   rows=[]
   for c in sorted(pg.chars,key=lambda c:(round(c['top']/2)*2,c['x0'])):
    if not c['text'].strip(): continue
    row=next((r for r in rows[-10:] if abs(r['top']-c['top'])<max(1,c['size']*.15)),None)
    if row is None:row={'top':c['top'],'chars':[]};rows.append(row)
    row['chars'].append(c)
   segs=[]
   for row in rows:
    cs=sorted(row['chars'],key=lambda c:c['x0']); parts=[]
    for c in cs:
     if not parts or c['x0']-parts[-1][-1]['x1']>max(3,c['size']*1.25):parts.append([])
     parts[-1].append(c)
    for part in parts:
     s=''
     for i,c in enumerate(part):
      if i and c['x0']-part[i-1]['x1']>c['size']*.2:s+=' '
      s+=c['text']
     segs.append({'text':norm(s),'x0':min(c['x0'] for c in part),'x1':max(c['x1'] for c in part),'top':min(c['top'] for c in part),'bottom':max(c['bottom'] for c in part),'size':statistics.median(c['size'] for c in part),'bold':'Bold' in part[0]['fontname'],'color':part[0].get('non_stroking_color',0)})
   blocks=[]
   for s in sorted(segs,key=lambda s:(s['top'],s['x0'])):
    b=next((b for b in reversed(blocks) if abs(b['x0']-s['x0'])<2 and abs(b['size']-s['size'])<.3 and 0<=s['top']-b['bottom']<s['size']*.85 and b['bold']==s['bold']),None)
    if b:
     b['text']+=s['text'] if re.search('[\u3000-\u9fff]$',b['text']) else ' '+s['text'];b['bottom']=s['bottom'];b['x1']=max(b['x1'],s['x1'])
    else:blocks.append(s.copy())
   for b in blocks:
    b['text']=norm(b['text']);b['id']=len(allunits);allunits.append(b['text'])
   pages.append({'width':pg.width,'height':pg.height,'blocks':blocks})
 docs.append({'path':str(p),'pages':pages,'kind':'pdf'})
p=next(ROOT.glob('*.docx'))
with zipfile.ZipFile(p) as z:
 for name in z.namelist():
  if name.startswith('word/') and name.endswith('.xml'):
   root=etree.fromstring(z.read(name));pars=[]
   for para in root.xpath('//w:p',namespaces={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}):
    ts=para.xpath('.//w:t',namespaces={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'});s=''.join(t.text or '' for t in ts)
    if s.strip():pars.append({'id':len(allunits),'text':s});allunits.append(s)
   if pars:docs.append({'path':str(p),'xml':name,'kind':'docx','paragraphs':pars})
(OUT/'structure.json').write_text(json.dumps(docs,ensure_ascii=False),encoding='utf-8')
(OUT/'units.json').write_text(json.dumps(allunits,ensure_ascii=False),encoding='utf-8')
for i,d in enumerate(docs):
 units=[(b['id'],b['text']) for pg in d.get('pages',[]) for b in pg['blocks']] if d['kind']=='pdf' else [(b['id'],b['text']) for b in d['paragraphs']]
 (OUT/f'source_{i}.txt').write_text('\n'.join(f'{id}\t{s}' for id,s in units),encoding='utf-8')
 print(i,pathlib.Path(d['path']).name,d.get('xml',''),len(units),sum(len(s) for _,s in units))

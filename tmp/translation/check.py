import json,re,pathlib
BASE=pathlib.Path(__file__).parent
units=json.loads((BASE/'units.json').read_text(encoding='utf-8'))
def key(s):return re.sub(r'\s+','',s).replace('・','').replace('‧','')
byid={};lookup={}
for p in sorted(BASE.glob('vi_*.tsv')):
 for l in p.read_text(encoding='utf-8').splitlines():
  if '\t' not in l:continue
  i,t=l.split('\t',1);i=int(i);byid[i]=t;lookup.setdefault(key(units[i]),t)
def tr(i,s):
 if i in byid:return byid[i]
 if key(s) in lookup:return lookup[key(s)]
 if re.fullmatch(r'機能\s+[\d\s、,-]+',s):return 'Chức năng '+s.replace('機能','').strip().replace('、',', ')
 if re.fullmatch(r'\d+\s*/\s*\d+\s*ページ',s):return 'Trang '+s.replace('ページ','').strip()
 if re.fullmatch(r'\d+章.*',s):
  t=re.sub(r'(\d+)章',r'Chương \1',s)
  if not re.search(r'[\u3040-\u9fff]',t):return t
 if re.fullmatch(r'\d+回',s):return s[:-1]+' lần'
 if re.fullmatch(r'\d+人',s):return s[:-1]+' người'
 if not re.search(r'[\u3040-\u9fff\uff66-\uff9f]',s):return s
 return None
if __name__=='__main__':
 miss={}
 for i,s in enumerate(units):
  if tr(i,s) is None:miss.setdefault(key(s),(i,s))
 (BASE/'missing.txt').write_text('\n'.join(f'{i}\t{s}' for i,s in miss.values()),encoding='utf-8')
 print('missing unique',len(miss));print((BASE/'missing.txt').read_text(encoding='utf-8'))

"""Read-only checks for R1 content recheck; no Quality Gate approval."""
from pathlib import Path
import csv,json,hashlib
ROOT=Path(__file__).resolve().parents[3]
STAGE=Path(__file__).resolve().parent
BASE=ROOT/'docs/requirement-review'
def rows(p):
 with p.open(newline='') as f:return list(csv.DictReader(f))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def check():
 errors=[]
 def require(ok,why):
  if not ok:errors.append(why)
 original={r['finding_id']:r for r in rows(BASE/'independent-review-2026-11-19/review-results.csv')}
 targets={fid for fid,r in original.items() if r['result']=='REWRITE'}
 current=rows(STAGE/'recheck-results.csv')
 require(len(current)==16 and {r['finding_id'] for r in current}==targets,'Scope differs from 16 REWRITE')
 for r in current:
  fid=r['finding_id'];p=ROOT/r['revised_finding_path']
  require(sha(p)==r['revised_finding_sha256'],'R1 changed '+fid)
  require(r['prior_finding_sha256']==original[fid]['artifact_sha256'] and r['prior_finding_sha256']!=r['revised_finding_sha256'],'Prior/new hash wrong '+fid)
  require(r['content_review_result'] in {'ACCEPT','REWRITE','REJECT','NEED_MORE_EVIDENCE'},'Invalid result '+fid)
  require(all(r.get(k) for k in ['previous_comments_addressed','reason','source_locator_refs','remaining_action','duplicate_handling','checked_at']),'Missing content assessment '+fid)
  require(r['gate_approval']=='NOT_PERFORMED' and r['customer_confirmation']=='NOT_GRANTED','False approval '+fid)
  if r['content_review_result']=='NEED_MORE_EVIDENCE':require('KHÔNG' in r['working_draft_consideration'],'Unready finding released '+fid)
 ev=rows(STAGE/'evidence-recheck.csv')
 require(len(ev)==97 and len({r['recheck_evidence_id'] for r in ev})==97,'Expected 96 R1 citations + 1 supplementary citation')
 for r in ev:
  require(r['finding_id'] in targets and all(r[k]=='TRUE' for k in ['source_hash_matches','locator_exists','quoted_content_matches']),'Evidence failed '+r['recheck_evidence_id'])
  require(sha(ROOT/r['source_path'])==r['source_sha256'],'Evidence source changed '+r['recheck_evidence_id'])
 for p,h in json.loads((STAGE/'input-manifest.json').read_text()).items():
  if p!='docs/requirement-review/registers/reviews.csv':require(sha(ROOT/p)==h,'Protected file changed '+p)
 ledger=rows(BASE/'registers/reviews.csv');before=rows(STAGE/'reviews-before.csv')
 require(ledger[:len(before)]==before and len(ledger)==len(before)+16,'Historic review rows altered or extra records')
 for r in ledger[len(before):]:require(r['status']=='OPEN' and r['artifact_sha256']==r['rechecked_artifact_sha256'],'False signoff or wrong recheck hash')
 for p,h in json.loads((STAGE/'artifact-manifest.json').read_text()).items():require(sha(ROOT/p)==h,'Review artifact changed '+p)
 return errors
if __name__=='__main__':
 errors=check()
 if errors:raise SystemExit('FAIL\n'+'\n'.join(errors))
 print('PASS: 16 changed finding hashes; 96 R1 and 1 supplementary source checks; previous records/31 other findings/R1/gates protected. No gate approval implied.')

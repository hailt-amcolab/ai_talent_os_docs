"""Mechanical integrity only; does not grant any quality gate or customer approval."""
from pathlib import Path
import csv,json,hashlib,re
ROOT=Path(__file__).resolve().parents[3]
STAGE=Path(__file__).resolve().parent
BASE=ROOT/'docs/requirement-review'
def rows(p):
 with p.open(newline='') as f:return list(csv.DictReader(f))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def check():
 errors=[]
 def req(ok,msg):
  if not ok:errors.append(msg)
 results=rows(STAGE/'review-results.csv');ledger={r['finding_id']:r for r in rows(BASE/'registers/findings.csv')}
 req(len(results)==47 and {r['finding_id'] for r in results}==set(ledger),'Finding coverage differs')
 fields=['evidence_exists','citation_accuracy','context_check','other_document_check','qa_answer_check','technical_risk_check','customer_decision_check','duplicate_check']
 for r in results:
  req(all(r[k].strip() for k in fields),'Missing review check '+r['finding_id'])
  req(r['artifact_ref']==ledger[r['finding_id']]['canonical_ref'],'Wrong current version '+r['finding_id'])
  req(sha(ROOT/r['artifact_ref'])==r['artifact_sha256'],'Finding hash changed '+r['finding_id'])
  req(r['result'] in {'ACCEPT','REWRITE','REJECT','NEED_MORE_EVIDENCE'},'Invalid result')
  req(r['quality_gate_approval']=='NOT_PERFORMED','Gate signoff invented')
  if r['result']!='ACCEPT':req(r['qa_eligibility'] in {'EXCLUDED','BLOCKED_PENDING_EVIDENCE'},'Unready finding released')
 req(next(r for r in results if r['finding_id']=='FND-0017')['qa_timing']=='DEFERRED_NO_QUESTION_NOW','Deferred timing lost')
 audit=rows(STAGE/'source-evidence.csv');req(len(audit)==238,'Expected 237 citations + original image')
 for r in audit:
  req(r['finding_id'] in ledger,'Unknown finding in evidence')
  req(sha(ROOT/r['source_path'])==r['source_sha256'] and bool(r['locator']),'Evidence provenance mismatch')
  req(r['analyst_quoted_excerpt_matches'] in {'TRUE','NOT_APPLICABLE'},'Source quote mismatch')
 for p,h in json.loads((STAGE/'input-manifest.json').read_text()).items():
  if p!='docs/requirement-review/registers/reviews.csv':req(sha(ROOT/p)==h,'Protected input changed '+p)
 prev=rows(STAGE/'reviews-before.csv');allreviews=rows(BASE/'registers/reviews.csv')
 req(allreviews[:len(prev)]==prev and len(allreviews)==len(prev)+47,'Historical review rows changed or duplicate append')
 req(all(r['status']=='OPEN' for r in allreviews[len(prev):]),'Review signature invented')
 for p,h in json.loads((STAGE/'artifact-manifest.json').read_text()).items():req(sha(ROOT/p)==h,'Artifact hash changed '+p)
 report=STAGE/'REVIEW_REPORT.md'
 for link in re.findall(r'\]\(([^)]+)\)',report.read_text()):req((report.parent/link.split('#')[0]).exists(),'Broken report link '+link)
 return errors
if __name__=='__main__':
 errors=check()
 if errors:raise SystemExit('FAIL\n'+'\n'.join(errors))
 print('PASS: 47 current finding hashes/eight checks; 237 citations + embedded source figure; prior records/source/findings/gates/workbook preserved. No gate approval implied.')

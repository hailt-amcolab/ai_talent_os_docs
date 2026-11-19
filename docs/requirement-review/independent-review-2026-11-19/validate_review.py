"""Read-only mechanical checks; never grants G5 or customer approval."""
from pathlib import Path
import csv,hashlib,json
ROOT=Path(__file__).resolve().parents[3]
STAGE=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def rows(p):
 with p.open(newline='') as f:return list(csv.DictReader(f))
def check():
 failures=[]
 def require(ok,msg):
  if not ok:failures.append(msg)
 review=rows(STAGE/'review-results.csv')
 require(len(review)==47,'Expected 47 reviews')
 require({r['finding_id'] for r in review}=={f'FND-{i:04}' for i in range(1,48)},'Finding ID coverage differs')
 for r in review:
  for k in ['evidence_exists','citation_accuracy','context_check','other_document_check','qa_answer_check','technical_only_check','customer_decision_check','duplicate_check','counter_source_refs']:
   require(bool(r[k]),f'{r["finding_id"]}: missing {k}')
  require(r['result'] in ['ACCEPT','REWRITE','REJECT','NEED_MORE_EVIDENCE'],'Invalid disposition')
  p=ROOT/'docs/requirement-review/gap-analysis-2026-11-19/findings'/f'{r["finding_id"]}.md'
  require(sha(p)==r['artifact_sha256'],'Analyst finding changed: '+r['finding_id'])
  if r['result']=='REWRITE':require(r['qa_eligibility']=='BLOCKED_REWRITE_AND_RECHECK' and r['author_revision_status']=='PENDING_AUTHOR_REVISION','Premature Q&A eligibility')
 audit=rows(STAGE/'evidence-audit.csv')
 require(len(audit)==226,'Expected 226 citation checks')
 for r in audit:
  require(all(r[k]=='True' for k in ['hash_matches_analyst','locator_exists','excerpt_matches_reopened_source']),'Citation failed '+r['evidence_id'])
 for rel,data in json.loads((STAGE/'source-snapshot.json').read_text()).items():require(sha(ROOT/rel)==data['sha256'],'Source changed: '+rel)
 for rel,h in json.loads((STAGE/'input-manifest.json').read_text()).items():require(sha(ROOT/rel)==h,'Protected input changed: '+rel)
 for rel,h in json.loads((STAGE/'artifact-manifest.json').read_text()).items():require(sha(ROOT/rel)==h,'Review artifact changed: '+rel)
 ledger=rows(ROOT/'docs/requirement-review/registers/reviews.csv')
 for r in review:
  matches=[x for x in ledger if x['scope']==r['finding_id'] and 'independent-review-2026-11-19' in x['source_snapshot_ref']]
  require(len(matches)==1,'Review ledger coverage: '+r['finding_id'])
  if matches:require(matches[0]['status']!='ACCEPTED' and not matches[0]['rechecked_artifact_sha256'],'False independent signoff/re-review')
 return failures
if __name__=='__main__':
 errors=check()
 if errors:raise SystemExit('FAIL\n'+'\n'.join(errors))
 print('PASS: 47 IDs/eight checks, 226 citations, unchanged source/Analyst/flow/workbook inputs, hashes and Q&A blocks. No G5 approval implied.')

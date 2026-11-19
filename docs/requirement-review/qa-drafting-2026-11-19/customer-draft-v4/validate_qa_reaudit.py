"""Read-only integrity checks for the author QA re-audit, not gate approval."""
from pathlib import Path
import csv
import hashlib
import json
import re
import sys
ROOT = Path(__file__).resolve().parents[4]
STAGE = Path(__file__).resolve().parent
DRAFT = STAGE.parent / 'qa-draft.md'
def rows(path):
    with path.open(encoding='utf-8-sig', newline='') as stream:
        return list(csv.DictReader(stream))
def check():
    errors = []
    def need(test, reason):
        if not test:
            errors.append(reason)
    def hashes(entries):
        for e in entries:
            p = ROOT / e['path']
            need(p.exists() and hashlib.sha256(p.read_bytes()).hexdigest() == e['sha256'], 'Hash changed: ' + e['path'])
    snapshot = json.loads((STAGE / 'input-manifest.json').read_text())
    hashes(snapshot['preserved_inputs'])
    hashes([json.loads((STAGE / 'internal-design-check.json').read_text())])
    reviews = rows(STAGE / 'review-results.csv')
    original = rows(STAGE.parent / 'customer-draft-v3/questions.csv')
    need(len(reviews) == 44 and {r['qa_id'] for r in reviews} == {r['qa_id'] for r in original}, '44 original IDs not fully audited')
    q = rows(STAGE / 'questions.csv')
    export = rows(STAGE.parent / 'csv-export/qa-draft.csv')
    internal = {r['qa_id']: r for r in rows(STAGE / 'internal-evidence.csv')}
    evidence = {r['evidence_id']: r for r in rows(STAGE / 'source-audit.csv')}
    need(len(q) == len(export) == len(internal) == 36, 'Active counts differ')
    need(len({r['qa_id'] for r in q}) == len(q), 'Duplicate active ID')
    text = DRAFT.read_text()
    need(set(re.findall(r'^## (WQA-\d+-\d+)$', text, re.M)) == {r['qa_id'] for r in q}, 'Markdown IDs differ from active CSV')
    export_by = {r['ID']: r for r in export}
    allowed = {r['qa_id'] for r in reviews if r['included_in_current_draft'] == 'YES'} | {'WQA-061-02'}
    need({r['qa_id'] for r in q} == allowed, 'Retired/held question still active')
    for r in q:
        qid = r['qa_id']
        need(r['status'] == 'DRAFT_UNAPPROVED', 'Wrong status: ' + qid)
        need(qid in internal and internal[qid]['draft_sha256'] == hashlib.sha256(DRAFT.read_bytes()).hexdigest(), 'Internal/hash link missing: ' + qid)
        for field, col in [('question', 'Câu hỏi dành cho khách hàng'), ('issue', 'Vấn đề cần xác nhận'), ('reason', 'Lý do cần xác nhận')]:
            need(r[field] == export_by[qid][col] and r[field] in text, 'Content differs: ' + qid + '/' + field)
        need(not re.search(r'[\u3040-\u30ff\u4e00-\u9fff]', r['question']), 'Japanese in question: ' + qid)
        for phrase in ['Bằng chứng', 'Điểm tắc', 'Tác động hệ thống', 'callback', 'HTTP', 'database']:
            need(phrase.lower() not in r['question'].lower(), 'Unwanted phrasing: ' + qid)
    for r in reviews:
        need(bool(r['reason']) and bool(r['source_refs']), 'Missing disposition evidence')
        for eid in r['evidence_ids'].split(';'):
            need(eid in evidence and evidence[eid]['qa_id'] == r['qa_id'], 'Audit linkage missing: ' + eid)
    need('WQA-071-01' not in {r['qa_id'] for r in q}, 'Wrong premise remains active')
    for name in ['artifact-manifest.json']:
        p = STAGE / name
        if p.exists():
            hashes(json.loads(p.read_text())['files'])
    return errors
if __name__ == '__main__':
    errors = check()
    print('FAIL\n' + '\n'.join(errors) if errors else 'PASS:44 audited IDs,36 synchronized questions, disposition/source links, preserved registers/sources/gates, stable IDs and history.')
    sys.exit(bool(errors))

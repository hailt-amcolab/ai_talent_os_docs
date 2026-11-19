"""Read-only checks for internal drafting; never approves a gate."""
from pathlib import Path
import csv
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[3]
STAGE = Path(__file__).resolve().parent

def rows(path):
    with path.open(newline='') as stream:
        return list(csv.DictReader(stream))

def main():
    errors = []
    def require(condition, message):
        if not condition:
            errors.append(message)
    def hashes(entries):
        for entry in entries:
            path = ROOT / entry['path']
            require(path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest() == entry['sha256'], 'Input/artifact changed: ' + entry['path'])
    snapshot = json.loads((STAGE / 'input-manifest.json').read_text())
    hashes(snapshot['inputs'] + snapshot['sources'])
    qa = rows(STAGE / 'questions.csv')
    internal = {r['qa_id']: r for r in rows(STAGE / 'internal-evidence.csv')}
    eligibility = {r['finding_id']: r for r in rows(STAGE / 'eligibility.csv')}
    audit = {r['audit_id']: r for r in rows(STAGE / 'source-checks.csv')}
    require(len(qa) == len({q['qa_id'] for q in qa}) == len(internal), 'Q&A IDs duplicate or Internal Evidence missing')
    require(len(eligibility) == 47, 'Finding eligibility coverage incomplete')
    for q in qa:
        fid = q['finding_id']
        require(eligibility[fid]['content_review_result'] == 'ACCEPT' and eligibility[fid]['used_in_draft'] == 'YES', 'Ineligible finding: ' + fid)
        require(q['status'] == 'DRAFT_UNAPPROVED' and q['qa_level'] == 'WORKING_DRAFT', 'Approval wrongly assigned: ' + q['qa_id'])
        require(all(q.get(f, '').strip() for f in ['qa_id', 'finding_id', 'feature', 'issue', 'question', 'reason', 'internal_ref']), 'Missing question field')
        require(q['existing_qa_ref'] == internal[q['qa_id']]['existing_qa_ref'], 'Existing No. mismatch')
        require(fid == internal[q['qa_id']]['finding_id'], 'Finding linkage mismatch')
        for phrase in ['Bằng chứng cho thấy', 'Điểm tắc', 'Rủi ro nghiêm trọng', 'Callback muộn', 'HTTP request', 'State inconsistency', 'callback', 'database']:
            require(phrase.lower() not in q['question'].lower(), 'Unwanted phrasing: ' + q['qa_id'])
        require(not re.search(r'[\u3040-\u30ff\u4e00-\u9fff]', q['question']), 'Question contains Japanese text')
        for aid in internal[q['qa_id']]['source_audit_refs'].split(';'):
            require(aid in audit and audit[aid]['finding_id'] == fid, 'Missing source check: ' + aid)
    used = {q['finding_id'] for q in qa}
    require('FND-0017' not in used and 'FND-0004' not in used and 'FND-0016' not in used, 'Deferred/needs-evidence finding used')
    counts = json.loads((STAGE / 'counts.json').read_text())
    require(counts['qa_count'] == len(qa) and counts['findings_used'] == len(used), 'Counts differ')
    draft = (STAGE / 'working-qa-draft.md').read_text()
    require('Đây là bản nháp nội bộ. G5 chưa được phê duyệt. Nội dung chưa được phép phát hành chính thức.' in draft, 'Required notice missing')
    require(draft.count('**Trạng thái:** DRAFT_UNAPPROVED') == len(qa), 'Draft question status coverage differs')
    manifest = STAGE / 'artifact-manifest.json'
    if manifest.exists():
        hashes(json.loads(manifest.read_text())['files'])
    if errors:
        print('FAIL\n' + '\n'.join(errors))
        return 1
    print(f'PASS: {len(qa)} DRAFT_UNAPPROVED questions / {len(used)} accepted findings;47 eligibility records; original sources/reviews/gates/QA unchanged.')
    print('Mechanical checks and author language review do not imply independent review, G6 PASS or approval to release.')
    return 0

if __name__ == '__main__':
    sys.exit(main())

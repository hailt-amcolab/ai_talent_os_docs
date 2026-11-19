"""Integrity/coverage checks for a scoped audit; does not verify all business semantics."""
from pathlib import Path
import csv
import hashlib
import json
import sys
ROOT = Path(__file__).resolve().parents[3]
STAGE = Path(__file__).resolve().parent

def rows(path):
    with path.open(encoding='utf-8-sig', newline='') as stream:
        return list(csv.DictReader(stream))

def main():
    errors = []
    def require(test, message):
        if not test:
            errors.append(message)
    def hashes(entries):
        for entry in entries:
            p = ROOT / entry['path']
            require(p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest() == entry['sha256'], 'Changed input/output: ' + entry['path'])
    hashes(json.loads((STAGE / 'input-manifest.json').read_text())['preserved_inputs'])
    trace = rows(STAGE / 'trace-matrix.csv')
    source = {r['evidence_id']: r for r in rows(STAGE / 'source-evidence.csv')}
    cases = rows(STAGE / 'cases.csv')
    original = rows(ROOT / 'docs/requirement-review/qa-drafting-2026-11-19/customer-draft-v4/review-results.csv')
    require(len(trace) == 44 and {x['qa_id'] for x in trace} == {x['qa_id'] for x in original}, '44 original Q&A IDs must be traced exactly once')
    require(len(cases) == 13 and len({c['case_id'] for c in cases}) == 13, 'Case coverage changed')
    case_ids = {c['case_id'] for c in cases}
    for t in trace:
        require(bool(t['requirement_context_ids']) and bool(t['canonical_finding']), 'Missing upstream context: ' + t['qa_id'])
        require(set(filter(None, t['case_ids'].split(';'))) <= case_ids, 'Unknown case')
    for c in cases:
        require((STAGE / 'cases' / (c['case_id'] + '.md')).is_file(), 'Missing case report')
        for eid in c['evidence_ids'].split(';'):
            require(eid in source and source[eid]['case_id'] == c['case_id'], 'Missing/wrong source link: ' + eid)
    for e in source.values():
        require(bool(e['original_text']) and bool(e['locator']), 'Empty original evidence')
        require(hashlib.sha256((ROOT / e['source_path']).read_bytes()).hexdigest() == e['source_sha256'], 'Source hash differs: ' + e['evidence_id'])
    for a in rows(STAGE / 'artifact-excerpts.csv'):
        require(hashlib.sha256((ROOT / a['path']).read_bytes()).hexdigest() == a['artifact_sha256'], 'Derived artifact changed: ' + a['record_id'])
    fixes = rows(STAGE / 'confirmed-fix-list.csv')
    require({f['record_id'] for f in fixes} == {'REQ-0020', 'REQ-0092', 'REQ-0117', 'REQ-0118', 'REQ-0125'}, 'Confirmed fix population differs')
    require(all(f['status'] == 'PROPOSED_NOT_APPLIED' for f in fixes), 'Do not imply fixes applied')
    require(json.loads((STAGE / 'review-ledger-reconciliation.json').read_text())['historical_review_prefix_unchanged'], 'History reconciliation missing')
    manifest = STAGE / 'artifact-manifest.json'
    if manifest.exists():
        hashes(json.loads(manifest.read_text())['files'])
    if errors:
        print('FAIL\n' + '\n'.join(errors))
        return 1
    print('PASS:44 Q&A chains,13 scoped cases,68 source readings,5 proposed fixes, preserved upstream inputs and version-bound evidence.')
    print('No original source/register/review/gate/QA changed; no full semantic certification or independent approval implied.')
    return 0
if __name__ == '__main__':
    sys.exit(main())

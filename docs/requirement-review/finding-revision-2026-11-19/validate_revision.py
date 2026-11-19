"""Validate Analyst R1 integrity only; does not accept any finding."""
from pathlib import Path
import csv
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[3]
STAGE = Path(__file__).resolve().parent
DOCS = ROOT / 'docs/requirement-review'

def rows(path):
    with path.open(newline='') as stream:
        return list(csv.DictReader(stream))

def check():
    errors = []
    def require(test, reason):
        if not test:
            errors.append(reason)
    def verify_hash(entries):
        for entry in entries:
            p = ROOT / entry['path']
            require(p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest() == entry['sha256'], 'Changed: ' + entry['path'])
    snapshot = json.loads((STAGE / 'input-manifest.json').read_text())
    verify_hash(snapshot['preserved_files'] + snapshot['sources'])
    reviews = {r['finding_id']: r for r in rows(DOCS / 'independent-review-2026-11-19/review-results.csv')}
    expected = {fid for fid, r in reviews.items() if r['result'] == 'REWRITE'}
    revisions = rows(STAGE / 'finding-details.csv')
    require(len(revisions) == 16 and {r['finding_id'] for r in revisions} == expected, 'Exactly16 REWRITE must be revised')
    old_details = {r['finding_id']: r for r in rows(DOCS / 'gap-analysis-2026-11-19/finding-details.csv')}
    before = {r['finding_id']: r for r in rows(STAGE / 'before/findings-register.csv')}
    after = {r['finding_id']: r for r in rows(DOCS / 'registers/findings.csv')}
    require(set(before) == set(after), 'Finding identities changed')
    for fid, row in before.items():
        if fid not in expected:
            require(row == after.get(fid), 'Untargeted finding changed: ' + fid)
    sources = {s['path']: s['sha256'] for s in snapshot['sources']}
    audit = {r['audit_id']: r for r in rows(STAGE / 'source-audit.csv')}
    for row in revisions:
        fid = row['finding_id']
        old = old_details[fid]
        require(row['review_result'] == 'REWRITE' and row['qa_eligibility'] == 'BLOCKED_PENDING_CONTENT_RECHECK', 'Review outcome/eligibility wrong: ' + fid)
        require(row['original_confirmed_content'] == old['confirmed_content'] and old['confirmed_content'] in row['confirmed_content'], 'Original FACT not retained: ' + fid)
        require(after[fid]['canonical_ref'] == row['revised_finding_path'] and after[fid]['status'] == 'DRAFT', 'Canonical version/state mismatch: ' + fid)
        p = ROOT / row['revised_finding_path']
        require(hashlib.sha256(p.read_bytes()).hexdigest() == row['revised_finding_sha256'], 'New finding hash mismatch: ' + fid)
        p = STAGE / 'before' / (fid + '.md.txt')
        require(hashlib.sha256(p.read_bytes()).hexdigest() == reviews[fid]['artifact_sha256'], 'Before copy differs from reviewed version: ' + fid)
        for aid in row['source_audit_refs'].split(';'):
            require(aid in audit and audit[aid]['finding_id'] == fid, 'Source audit missing/wrong finding: ' + aid)
        for field in ['title', 'missing_information', 'decision_needed', 'removed_scope', 'duplicate_check', 'change_reason']:
            require(bool(row[field]), 'Missing field: ' + fid + '/' + field)
    for row in audit.values():
        require(sources.get(row['source_path']) == row['source_sha256'] and bool(row['reopened_excerpt']) and bool(row['locator']), 'Untraceable source audit: ' + row['audit_id'])
    require(all(r['recheck_result'] == 'NOT_RUN' for r in rows(STAGE / 'recheck-list.csv')), 'Do not invent recheck')
    changes = rows(STAGE / 'changes.csv')
    require({r['finding_id'] for r in changes} == expected and all(r['reason'] for r in changes), 'Change history incomplete')
    manifest = STAGE / 'artifact-manifest.json'
    if manifest.exists():
        verify_hash(json.loads(manifest.read_text())['files'])
    return errors

if __name__ == '__main__':
    errors = check()
    if errors:
        print('FAIL\n' + '\n'.join(errors))
        sys.exit(1)
    print('PASS:16 targeted revisions,31 untouched findings, original FACTs/before copies, source audits and review/gate/source preservation.')
    print('No independent recheck, ACCEPT, QA approval or gate PASS implied.')

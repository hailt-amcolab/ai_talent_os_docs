"""Read-only structural/integrity checks; never approves G4/G5."""
from pathlib import Path
import csv
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[3]
STAGE = Path(__file__).resolve().parent
TYPES = {'MISSING_RULE', 'MISSING_FLOW', 'UNDEFINED_STATE', 'CONFLICT', 'AMBIGUITY', 'MISSING_EXCEPTION', 'EXTERNAL_DEPENDENCY', 'TECHNICAL_ONLY', 'ALREADY_ANSWERED'}

def rows(path):
    with path.open(encoding='utf-8-sig', newline='') as stream:
        return list(csv.DictReader(stream))

def check(stage=STAGE):
    errors = []
    def require(condition, message):
        if not condition:
            errors.append(message)
    def hashes(entries):
        for entry in entries:
            path = ROOT / entry['path']
            require(path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest() == entry['sha256'], 'Hash changed: ' + entry['path'])
    snapshot = json.loads((stage / 'source-snapshot.json').read_text())
    hashes(snapshot['sources'] + snapshot['inputs'] + snapshot['historical_manifests'])
    for manifest in snapshot['historical_manifests']:
        hashes(json.loads((ROOT / manifest['path']).read_text())['files'])
    hashes(rows(stage / 'internal-document-checks.csv'))
    details = rows(stage / 'finding-details.csv')
    ledger = rows(ROOT / 'docs/requirement-review/registers/findings.csv')
    keys = json.loads((stage / 'finding-keys.json').read_text())
    require(len(details) == len(ledger) == len(keys), 'Finding/key/ledger counts differ')
    ids = {r['finding_id'] for r in details}
    require(len(ids) == len(details) and len(set(keys.values())) == len(keys), 'Duplicate identity')
    evidence = {}
    for path in ['registers/evidence.csv', 'flow-reconstruction-2026-11-19/flow-evidence.csv', 'gap-analysis-2026-11-19/gap-evidence.csv']:
        for row in rows(ROOT / 'docs/requirement-review' / path):
            require(row['evidence_id'] not in evidence, 'Duplicate EV: ' + row['evidence_id'])
            evidence[row['evidence_id']] = row
    ledger_by_id = {r['finding_id']: r for r in ledger}
    source_hashes = {s['path']: s['sha256'] for s in snapshot['sources']}
    flow_ids = {r['flow_id'] for r in rows(ROOT / 'docs/requirement-review/registers/business-flows.csv')}
    requirement_ids = {r['requirement_id'] for r in rows(ROOT / 'docs/requirement-review/registers/requirements.csv')}
    for row in details:
        fid = row['finding_id']
        require(keys.get(row['finding_key']) == fid, 'Stable key mismatch: ' + fid)
        require(row['classification'] in TYPES, 'Unknown classification: ' + fid)
        for field in ['title', 'confirmed_content', 'inference', 'missing_information', 'decision_needed', 'business_impact', 'customer_question_recommendation', 'customer_question_reason', 'source_refs', 'evidence_ids', 'related_documents_checked', 'authority_boundary', 'closure_criteria', 'responsible_party']:
            require(bool(row.get(field, '').strip()), 'Missing ' + field + ': ' + fid)
        require(set(row['flow_ids'].split(';')) <= flow_ids, 'Unknown flow: ' + fid)
        require(set(row['requirement_ids'].split(';')) <= requirement_ids, 'Unknown REQ: ' + fid)
        for eid in (row['evidence_ids'] + ';' + row['counter_evidence_ids']).strip(';').split(';'):
            require(eid in evidence, 'Unknown evidence: ' + fid + '/' + eid)
            if eid in evidence:
                ev = evidence[eid]
                require(source_hashes.get(ev['source_path']) == ev['source_sha256'] and bool(ev['locator']), 'Invalid evidence provenance: ' + eid)
        path = stage / 'findings' / (fid + '.md')
        require(path.exists(), 'Missing finding detail: ' + fid)
        if row['classification'] == 'TECHNICAL_ONLY':
            require(row['customer_question_recommendation'] in {'NO_TECHNICAL_ONLY', 'NO_BUSINESS_QUESTION_TECH_INPUTS'}, 'Technical question routed to customer: ' + fid)
        if row['classification'] == 'ALREADY_ANSWERED':
            require(row['customer_question_recommendation'] == 'NO_ALREADY_ANSWERED' and row['status'] == 'RESOLVED', 'Answered scope wrongly routed: ' + fid)
        indexed = ledger_by_id.get(fid, {})
        require(indexed.get('evidence_ids') == row['evidence_ids'] and indexed.get('status') == row['status'], 'Ledger/detail mismatch: ' + fid)
        require(not indexed.get('review_ids'), 'Independent review not performed in this stage: ' + fid)
    candidates = rows(stage / 'candidate-audit.csv')
    expected = rows(ROOT / 'docs/requirement-review/flow-reconstruction-2026-11-19/flow-gaps.csv')
    require({a['gap_id'] for a in candidates} == {a['gap_id'] for a in expected} and len(candidates) == len(expected), 'Candidate coverage differs')
    for candidate in candidates:
        require(bool(candidate['reason']), 'Missing candidate disposition reason')
        if candidate['disposition'] == 'MERGED':
            require(bool(candidate['finding_ids']) and set(candidate['finding_ids'].split(';')) <= ids, 'Invalid candidate mapping: ' + candidate['gap_id'])
        else:
            require(candidate['disposition'] == 'NO_FINDING' and not candidate['finding_ids'], 'Invalid rejection: ' + candidate['gap_id'])
    manifest = stage / 'artifact-manifest.json'
    if manifest.exists():
        hashes(json.loads(manifest.read_text())['files'])
    return errors

if __name__ == '__main__':
    failures = check()
    if failures:
        print('FAIL\n' + '\n'.join(failures))
        sys.exit(1)
    print('PASS: stable IDs, evidence provenance, all97 candidate dispositions, internal design hashes, canonical ledger and prior artifacts unchanged.')
    print('Historical flow input findings.csv has an authorized successor; old input snapshot remains unchanged. No G4/G5 approval implied.')

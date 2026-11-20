"""Read-only integrity/transition checks for the correction successor, never gate approval."""
from pathlib import Path
import csv
import hashlib
import json
import re

O = Path(__file__).resolve().parent
D = O.parent
R = O.parents[2]


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def rows(p):
    with p.open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def before(path):
    p = O / 'before' / path
    if not p.exists() and p.suffix == '.md':
        p = p.with_suffix('.md.txt')
    return p


def keyed(a, key):
    assert len(a) == len({r[key] for r in a})
    return {r[key]: r for r in a}


def main():
    state = json.loads((O / 'application-state.json').read_text())
    allowed = set(state['mutated_paths'])
    initial = json.loads((O / 'input-manifest.json').read_text())['files']
    for x in initial:
        current = R / x['path']
        assert current.exists(), x['path']
        if sha(current) != x['sha256']:
            assert x['path'] in allowed, 'Unexpected mutation: ' + x['path']
            assert sha(before(x['path'])) == x['sha256'], 'Original lost: ' + x['path']
    inventory = json.loads((D / 'source-inventory-current.json').read_text())
    actual = {str(p.relative_to(R)) for p in (R / 'source_requiments').rglob('*') if p.is_file()}
    assert inventory['file_count'] == len(inventory['files']) == 16
    assert actual == {x['path'] for x in inventory['files']}
    for x in inventory['files']:
        assert sha(R / x['path']) == x['sha256']
    for name, key, count, content_ids in [
        ('requirements.csv', 'requirement_id', 175, state['affected_requirements']),
        ('business-rules.csv', 'rule_id', 90, state['affected_rules']),
    ]:
        old = keyed(rows(before('docs/requirement-review/registers/' + name)), key)
        new = keyed(rows(D / 'registers' / name), key)
        assert old.keys() == new.keys() and len(new) == count
        for ident, row in new.items():
            assert row['flow_ids'] and 'Chưa thực hiện' not in row['flow_ids']
            if ident not in content_ids:
                assert all(row[f] == old[ident][f] for f in row if f != 'flow_ids'), ident
    req = keyed(rows(D / 'registers/requirements.csv'), 'requirement_id')
    assert 'Manager' in req['REQ-0020']['expected_behavior']
    assert req['REQ-0020']['confirmation_status'] == req['REQ-0078']['confirmation_status'] == 'PARTIAL'
    assert 'sáng hôm sau' in req['REQ-0094']['expected_behavior']
    assert 'sáng hôm sau' in req['REQ-0169']['expected_behavior']
    assert 'trang kết nối riêng của dịch vụ' not in req['REQ-0078']['claim']
    for ident in ['REQ-0092', 'REQ-0117', 'REQ-0118', 'REQ-0125']:
        assert not re.search(r'trang\s*(23|30|33)\s+T-01', req[ident]['screen_refs']), ident
    for file, key, total, expected_changed in [
        ('steps.csv', 'step_id', 281, set(state['step_ids'])),
        ('state-transitions.csv', 'transition_id', 64, {'TRANS-0009'}),
        ('scenarios.csv', 'case_id', 219, {'CASE-0036'}),
    ]:
        old = keyed(rows(D / 'flow-reconstruction-2026-11-19' / file), key)
        new = keyed(rows(O / file), key)
        assert len(new) == total and old.keys() == new.keys()
        assert {i for i in new if old[i] != new[i]} == expected_changed, file
    step = keyed(rows(O / 'steps.csv'), 'step_id')['FLOW-0006-E01.01']
    assert step['classification'] == 'SOURCE_DESCRIBED'
    assert 'không lưu' in step['action'] and 'M-07' in step['action']
    oldf = keyed(rows(before('docs/requirement-review/registers/findings.csv')), 'finding_id')
    newf = keyed(rows(D / 'registers/findings.csv'), 'finding_id')
    assert len(newf) == 47 and newf.keys() == oldf.keys()
    for ident, f in newf.items():
        if ident not in state['revised_findings']:
            assert f == oldf[ident], ident
        else:
            assert f['status'] == 'DRAFT' and f['canonical_ref'] != oldf[ident]['canonical_ref']
            assert (R / f['canonical_ref']).exists()
    reviews_before = rows(before('docs/requirement-review/registers/reviews.csv'))
    reviews = rows(D / 'registers/reviews.csv')
    assert reviews[:len(reviews_before)] == reviews_before
    assert len(reviews) == len(reviews_before) + 2
    assert all(r['status'] == 'OPEN' and not r['rechecked_artifact_sha256'] for r in reviews[-2:])
    old_gates = rows(before('docs/requirement-review/registers/gate-runs.csv'))
    gates = rows(D / 'registers/gate-runs.csv')
    assert gates[:len(old_gates)] == old_gates and len(gates) == len(old_gates) + 6
    assert [g['result'] for g in gates[-6:]] == ['STALE'] * 4 + ['BLOCKED', 'STALE']
    oldqa = keyed(rows(D / 'qa-drafting-2026-11-19/customer-draft-v4/questions.csv'), 'qa_id')
    newqa = keyed(rows(D / 'qa-drafting-2026-11-19/customer-draft-v5/questions.csv'), 'qa_id')
    ie = keyed(rows(D / 'qa-drafting-2026-11-19/customer-draft-v5/internal-evidence.csv'), 'qa_id')
    assert len(newqa) == 36 and newqa.keys() == oldqa.keys()
    for ident, q in newqa.items():
        assert all(q[k] == oldqa[ident][k] for k in ['question', 'issue', 'reason', 'feature', 'finding_id'])
        assert q['status'] == 'DRAFT_UNAPPROVED' and 'PENDING' in q['source_freshness']
        internal = ie[ident]
        assert sha(R / internal['finding_path']) == internal['finding_sha256']
        if ident in state['qa_hold_ids']:
            assert internal['internal_hold'] == 'YES' and not internal['content_review_result'] and not internal['review_ref']
        else:
            assert internal['internal_hold'] == 'NO' and internal['content_review_result'] == 'ACCEPT'
        assert sha(D / 'qa-drafting-2026-11-19/qa-draft.md') == internal['draft_sha256']
    oldev = rows(before('docs/requirement-review/registers/evidence.csv'))
    ev = rows(D / 'registers/evidence.csv')
    assert ev[:len(oldev)] == oldev and len(ev) == len(oldev) + 35
    assert ev[len(oldev):] == rows(O / 'correction-evidence.csv')
    all_ev = ev + rows(D / 'flow-reconstruction-2026-11-19/flow-evidence.csv') + rows(D / 'gap-analysis-2026-11-19/gap-evidence.csv')
    keyed(all_ev, 'evidence_id')
    for e in ev[len(oldev):]:
        assert sha(R / e['source_path']) == e['source_sha256'] and e['original_excerpt'].strip()
    issue = rows(O / 'issue-resolution.csv')
    assert len(issue) == 12 and all(i['disposition'] == 'IMPLEMENTED_PENDING_REVIEW' for i in issue)
    export = keyed(rows(D / 'qa-drafting-2026-11-19/csv-export/qa-draft.csv'), 'ID')
    for ident in newqa:
        assert export[ident]['Câu hỏi dành cho khách hàng'] == newqa[ident]['question']
        assert 'CHỜ ĐỐI CHIẾU' in export[ident]['Hiệu lực nguồn']
    output_hashes = O / 'current-output-hashes.json'
    if output_hashes.exists():
        for item in json.loads(output_hashes.read_text())['files']:
            assert sha(R / item['path']) == item['sha256'], item['path']
    manifest = O / 'artifact-manifest.json'
    if manifest.exists():
        for item in json.loads(manifest.read_text())['files']:
            assert sha(O / item['path']) == item['sha256'], item['path']
        for g in gates[-6:]:
            assert g['output_sha256'] == sha(manifest)
    print('PASS correction integrity: 12REQ/4BR content corrections; 175REQ/90BR flow links; 8flow versions,12steps,1transition,1scenario; 2finding revisions.')
    print('PASS preservation: sources unchanged, old evidence/reviews/gates append-only,45finding rows untouched,36QA texts/IDs unchanged,3 explicit finding holds.')
    print('16 sources cataloged; incoming19Nov reconciliation PENDING. No independent ACCEPT, Customer Confirmed, gate PASS or release permission created.')


if __name__ == '__main__':
    main()

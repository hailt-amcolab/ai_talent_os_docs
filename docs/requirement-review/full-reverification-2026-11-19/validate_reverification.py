"""Validate audit completeness/integrity. This script never approves business content or gates."""
from pathlib import Path
import csv
import hashlib
import json

O = Path(__file__).resolve().parent
R = O.parents[2]
D = O.parent


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def rows(path):
    with path.open(newline='') as stream:
        return list(csv.DictReader(stream))


def check():
    protected = json.loads((O / 'input-manifest.json').read_text())['files']
    for item in protected:
        assert digest(R / item['path']) == item['sha256'], 'Protected input changed: ' + item['path']
    source_rows = rows(O / 'source-snapshot.csv')
    assert len(source_rows) == 12
    for item in source_rows:
        assert digest(R / item['path']) == item['sha256'], item['path']
    evidence = rows(O / 'source-evidence.csv')
    evidence_ids = {item['audit_evidence_id'] for item in evidence}
    assert len(evidence_ids) == len(evidence) == 519
    for item in evidence:
        assert item['original_text'].strip() and item['locator'].strip()
        assert digest(R / item['source_path']) == item['source_sha256']
    assert json.loads((O / 'reference-errors.json').read_text()) == []
    expected = {
        'requirements': (175, 'record_id'), 'business-rules': (90, 'record_id'),
        'steps': (281, 'record_id'), 'state-transitions': (64, 'record_id'),
        'flow': (30, 'flow_id'), 'finding': (47, 'finding_id'), 'qa': (36, 'qa_id'),
    }
    for stem, (count, field) in expected.items():
        items = rows(O / (stem + '-results.csv'))
        assert len(items) == len({item[field] for item in items}) == count, stem
        dossiers = [json.loads(line) for line in (O / 'records' / (stem + '.jsonl')).read_text().splitlines()]
        assert len(dossiers) == count, stem
        for number, item in enumerate(items, 1):
            assert item['dossier'] == f'records/{stem}.jsonl:{number}'
            assert item.get('audit_note', '').strip(), item[field]
            assert set(filter(None, item.get('audit_evidence_ids', '').split(';'))) <= evidence_ids
            if stem == 'finding':
                assert item['canonical_hash_matches_review'] == 'True', item[field]
            if stem == 'qa':
                assert item['existing_review_result'] == 'ACCEPT'
                assert item['question_status'] == 'DRAFT_UNAPPROVED'
                assert item['finding_hash_matches'] == item['review_id_matches'] == 'True'
    for stem, original, field in [
        ('requirements', 'registers/requirements.csv', 'requirement_id'),
        ('business-rules', 'registers/business-rules.csv', 'rule_id'),
        ('flow', 'registers/business-flows.csv', 'flow_id'),
        ('steps', 'flow-reconstruction-2026-11-19/steps.csv', 'step_id'),
        ('state-transitions', 'flow-reconstruction-2026-11-19/state-transitions.csv', 'transition_id'),
        ('finding', 'registers/findings.csv', 'finding_id'),
        ('qa', 'qa-drafting-2026-11-19/customer-draft-v4/questions.csv', 'qa_id'),
    ]:
        output_field = expected[stem][1]
        assert {item[field] for item in rows(D / original)} == {item[output_field] for item in rows(O / (stem + '-results.csv'))}
    old_evidence = rows(O / 'evidence-integrity.csv')
    assert len(old_evidence) == len({item['evidence_id'] for item in old_evidence}) == 513
    assert all(item['hash_matches'] == item['verbatim_match_in_reopened_scope'] == 'True' for item in old_evidence)
    assert not any('FALLBACK' in item['reopen_method'] for item in old_evidence)
    scenarios = rows(O / 'scenario-results.csv')
    assert len(scenarios) == 219 and all(item['step_links_resolve'] == 'True' for item in scenarios)
    coverage = rows(O / 'source-coverage-checks.csv')
    assert len(coverage) == 319 and all(item['links_resolve'] == 'True' for item in coverage)
    assert len(rows(O / 'historical-qa-dispositions.csv')) == 44
    visual = rows(O / 'visual-checks.csv')
    assert len(visual) == 47
    assert sum(item['source_id'] == 'YK2' for item in visual) == 26
    screens = rows(O / 'screen-reference-check.csv')
    assert len(screens) == 91
    assert sum(item['audit_result'] == 'LEGEND_AS_SCREEN_ERROR' for item in screens) == 4
    issues = rows(O / 'issues.csv')
    assert [item['issue_id'] for item in issues] == [f'FV-{n:03d}' for n in range(1, 13)]
    assert all(item['disposition'] == 'OPEN_AUDIT_NOT_APPLIED' for item in issues)
    gates = rows(O / 'gate-impact.csv')
    assert all(item['mutation'] == 'NONE' for item in gates)
    assert [item['latest_recorded_status'] for item in gates[:6]] == ['PASS'] * 5 + ['BLOCKED']
    for item in rows(O / 'artifact-excerpts.csv'):
        assert digest(R / item['artifact_path']) == item['artifact_sha256']
        assert item['status'] == 'PROPOSED_CORRECTION_NOT_APPLIED'
    manifest_path = O / 'artifact-manifest.json'
    if manifest_path.exists():
        for item in json.loads(manifest_path.read_text())['files']:
            assert digest(O / item['path']) == item['sha256'], 'Audit artifact changed: ' + item['path']
    print(f'PASS audit integrity: {len(protected)} protected inputs unchanged; 12 sources; 519 reopened references; 513 matching legacy evidence entries.')
    print('PASS coverage: 175 REQ, 90 BR, 30 flows, 281 steps, 64 transitions, 219 scenarios, 47 findings, 36 current QA and 44 historical QA IDs.')
    print('12 audit issues remain OPEN. No business approval, independent signoff, gate status change or release permission is implied.')


if __name__ == '__main__':
    check()

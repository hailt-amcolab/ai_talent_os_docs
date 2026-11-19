#!/usr/bin/env python3
"""Read-only structural checks. Does not verify requirements or approve gates."""
import csv
import hashlib
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs/requirement-review'
SCHEMAS = {'baselines.csv': ['baseline_id', 'version', 'scope', 'excluded_scope', 'item_version_manifest_ref', 'package_sha256', 'gate_run_ids', 'decision_ids', 'open_nonblocking_refs', 'approval_refs', 'approved_by', 'approved_at', 'status', 'supersedes', 'change_ref'], 'business-flows.csv': ['flow_id', 'legacy_ref', 'canonical_ref', 'scope', 'actor_refs', 'precondition_refs', 'main_path_refs', 'alternative_refs', 'error_refs', 'state_refs', 'data_refs', 'time_refs', 'notification_refs', 'dependency_refs', 'postcondition_refs', 'acceptance_refs', 'requirement_ids', 'evidence_ids', 'finding_refs', 'coverage', 'verification_status', 'owner', 'checked_by', 'checked_at'], 'business-rules.csv': ['rule_id', 'legacy_ref', 'canonical_ref', 'scope', 'claim_type', 'authority', 'evidence_ids', 'requirement_ids', 'flow_ids', 'finding_refs', 'decision_ids', 'verification_status', 'owner', 'checked_by', 'checked_at', 'module', 'feature', 'rule_statement', 'condition', 'confirmation_status', 'confirmation_notes', 'source_refs', 'missing_information'], 'customer-decisions.csv': ['decision_id', 'legacy_ref', 'scope', 'decision', 'remaining_open', 'evidence_ids', 'decided_by', 'authority', 'decision_date', 'supersedes_parts', 'business_approval', 'design_approval', 'commercial_approval', 'release_approval', 'impacted_refs', 'verification_status', 'recorded_by', 'recorded_at'], 'evidence.csv': ['evidence_id', 'source_id', 'source_path', 'source_version', 'source_sha256', 'locator', 'original_excerpt', 'interpretation_vi', 'claim_supported', 'authority', 'counter_evidence', 'limits', 'verification_status', 'checked_by', 'checked_at'], 'findings.csv': ['finding_id', 'legacy_ref', 'canonical_ref', 'scope', 'issue', 'claim_type', 'evidence_ids', 'counter_evidence', 'search_scope', 'impact', 'blocking', 'responsible_party', 'owner', 'existing_qa_refs', 'duplicate_of', 'closure_criteria', 'status', 'review_ids', 'resolution_refs', 'updated_by', 'updated_at'], 'gate-runs.csv': ['gate_run_id', 'gate_id', 'scope', 'input_refs', 'input_sha256', 'source_snapshot_ref', 'rules_checked', 'evidence_refs', 'result', 'failure_reasons', 'followup_owner', 'rerun_criteria', 'output_refs', 'output_sha256', 'prepared_by', 'approved_by', 'checked_at', 'supersedes_run'], 'requirements.csv': ['requirement_id', 'legacy_ref', 'canonical_ref', 'scope', 'claim', 'claim_type', 'authority', 'evidence_ids', 'rule_ids', 'flow_ids', 'screen_refs', 'acceptance_refs', 'finding_refs', 'decision_ids', 'spec_refs', 'verification_status', 'owner', 'checked_by', 'checked_at', 'module', 'feature', 'business_description', 'actor', 'trigger', 'preconditions', 'expected_behavior', 'business_rules', 'related_states', 'described_exceptions', 'source_refs', 'confirmation_status', 'confirmation_notes', 'missing_information', 'business_approval', 'design_approval', 'commercial_approval', 'release_approval', 'extraction_stage'], 'reviews.csv': ['review_id', 'scope', 'artifact_refs', 'artifact_sha256', 'source_snapshot_ref', 'author', 'reviewer', 'checked_evidence_ids', 'challenge', 'blocking', 'response_ref', 'rechecked_artifact_sha256', 'status', 'reviewed_at']}


def main():
    errors = []
    manifest_path = ROOT / 'Phan_tich/28_Kiem_ke_nguon_19-11-2026.json'
    manifest = json.loads(manifest_path.read_text())
    entries = manifest['files']
    expected = {entry['path'] for entry in entries}
    actual = {str(p.relative_to(ROOT)) for p in (ROOT / 'source_requiments').rglob('*') if p.is_file()}
    if actual != expected:
        errors.append(f'Source inventory differs: added={sorted(actual-expected)}, missing={sorted(expected-actual)}')
    if len(expected) != manifest['file_count'] or len(expected) != len(entries):
        errors.append('Manifest count or duplicate paths invalid')
    source_ids = [entry['source_code'] for entry in entries]
    if len(source_ids) != len(set(source_ids)):
        errors.append('Duplicate source IDs')
    for entry in entries:
        path = ROOT / entry['path']
        if path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest() != entry['sha256']:
            errors.append(f'Source hash changed: {entry["source_code"]}')
    for name, fields in SCHEMAS.items():
        path = DOCS / 'registers' / name
        if not path.is_file():
            errors.append(f'Missing register: {name}')
            continue
        with path.open(newline='') as handle:
            rows = list(csv.reader(handle))
        if not rows or rows[0] != fields:
            errors.append(f'Schema mismatch: {name}')
            continue
        ids = set()
        for number, row in enumerate(rows[1:], 2):
            if len(row) != len(fields) or not row[0].strip():
                errors.append(f'Invalid shape or missing ID: {name}:{number}')
                continue
            if row[0] in ids:
                errors.append(f'Duplicate ID: {name}:{number}')
            ids.add(row[0])
    for path in [*DOCS.rglob('*.md'), ROOT / '.agents/skills/requirement-review/SKILL.md']:
        if not path.is_file():
            errors.append(f'Missing document: {path.relative_to(ROOT)}')
            continue
        for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', path.read_text()):
            if '://' in target or target.startswith('#'):
                continue
            local = target.split('#', 1)[0].strip('<>')
            if local and not (path.parent / local).exists():
                errors.append(f'Broken local link: {path.relative_to(ROOT)} -> {target}')
    if errors:
        print('FAIL: structural checks only')
        print('\n'.join(errors))
        return 1
    print(f'PASS: {len(entries)} source files match inventory and hashes; {len(SCHEMAS)} CSV schemas and workflow links checked.')
    print('No business verification, independent review, customer approval or G1-G8 PASS is implied.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, csv.Error) as error:
        print(f'FAIL: {error}', file=sys.stderr)
        sys.exit(1)

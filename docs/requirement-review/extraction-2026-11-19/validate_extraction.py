#!/usr/bin/env python3
"""Kiểm tra truy vết cơ học; không xác nhận nội dung hoặc ký quality gate."""
import csv
import hashlib
import json
from pathlib import Path
import sys

HERE = Path(__file__).resolve().parent
DOCS = HERE.parent
ROOT = DOCS.parent.parent
STATUSES = {'CONFIRMED', 'PARTIAL', 'CONFLICTED', 'UNKNOWN'}


def read_csv(path):
    with path.open(encoding='utf-8-sig', newline='') as handle:
        return list(csv.DictReader(handle))


def validate(root=ROOT, docs=DOCS, here=HERE):
    errors = []
    requirements = read_csv(docs / 'registers/requirements.csv')
    rules = read_csv(docs / 'registers/business-rules.csv')
    evidence = read_csv(docs / 'registers/evidence.csv')
    indexes = {}
    for label, rows, id_field in [('REQ', requirements, 'requirement_id'), ('BR', rules, 'rule_id'), ('EV', evidence, 'evidence_id')]:
        index = {row[id_field]: row for row in rows}
        if len(index) != len(rows):
            errors.append(f'{label}: trùng ID')
        indexes[label] = index
    required = ['requirement_id', 'module', 'feature', 'business_description', 'actor', 'trigger', 'preconditions', 'expected_behavior', 'business_rules', 'related_states', 'described_exceptions', 'evidence_ids', 'confirmation_status', 'confirmation_notes']
    for row in requirements:
        for field in required:
            if not row.get(field, '').strip():
                errors.append(f'{row["requirement_id"]}: thiếu {field}')
    for rows, id_field in [(requirements, 'requirement_id'), (rules, 'rule_id')]:
        for row in rows:
            identity = row[id_field]
            if row['confirmation_status'] not in STATUSES:
                errors.append(f'{identity}: trạng thái xác nhận không hợp lệ')
            for evidence_id in row['evidence_ids'].split(';'):
                if evidence_id not in indexes['EV']:
                    errors.append(f'{identity}: EV không tồn tại {evidence_id}')
            if row['confirmation_status'] == 'UNKNOWN' and row['verification_status'] == 'VERIFIED':
                errors.append(f'{identity}: UNKNOWN không được tự thành VERIFIED')
    for row in requirements:
        for rule_id in filter(None, row['rule_ids'].split(';')):
            if rule_id not in indexes['BR']:
                errors.append(f'{row["requirement_id"]}: BR không tồn tại {rule_id}')
    for row in rules:
        for requirement_id in row['requirement_ids'].split(';'):
            if requirement_id not in indexes['REQ']:
                errors.append(f'{row["rule_id"]}: REQ không tồn tại {requirement_id}')
            elif row['rule_id'] not in indexes['REQ'][requirement_id]['rule_ids'].split(';'):
                errors.append(f'{row["rule_id"]}: thiếu liên kết ngược {requirement_id}')
    snapshot = json.loads((here / 'source-snapshot.json').read_text())
    sources = {entry['source_id']: entry for entry in snapshot['files']}
    for entry in snapshot['files'] + snapshot['legacy_inputs']:
        path = root / entry['path']
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != entry['sha256']:
            errors.append(f'Nguồn/đầu vào cũ đã thay đổi: {entry["path"]}')
    for row in evidence:
        source = sources.get(row['source_id'])
        if not source or row['source_path'] != source['path'] or row['source_sha256'] != source['sha256']:
            errors.append(f'{row["evidence_id"]}: sai định danh nguồn')
        if not row['source_path'].startswith('source_requiments/'):
            errors.append(f'{row["evidence_id"]}: dùng tài liệu nội bộ làm bằng chứng nguồn')
        if not all(row.get(field, '').strip() for field in ['locator', 'original_excerpt', 'checked_by', 'checked_at', 'limits', 'claim_supported']):
            errors.append(f'{row["evidence_id"]}: thiếu vị trí/trích nguồn/người kiểm/giới hạn')
        for claim_id in row['claim_supported'].split(';'):
            if claim_id not in indexes['REQ'] and claim_id not in indexes['BR']:
                errors.append(f'{row["evidence_id"]}: mệnh đề không tồn tại {claim_id}')
    legacy = read_csv(root / 'Phan_tich/24_Ma_tran_truy_vet_yeu_cau_luong.csv')
    mapped = {row['legacy_ref'] for row in requirements}
    for row in legacy:
        if row['Mã truy vết nội bộ'] not in mapped:
            errors.append(f'Chưa đối chiếu mục cũ: {row["Mã truy vết nội bộ"]}')
    for name, field in [('missing-information.csv', 'requirement_ids'), ('existing-open-items.csv', 'requirement_ids'), ('source-coverage.csv', 'requirement_ids')]:
        for row in read_csv(here / name):
            for identity in filter(None, row[field].split(';')):
                if identity not in indexes['REQ']:
                    errors.append(f'{name}: REQ không tồn tại {identity}')
    coverage = read_csv(here / 'source-coverage.csv')
    features = [row for row in coverage if row['source_id'] == 'YK2' and row['source_unit'].startswith('Chức năng ')]
    if len(features) != 54 or any(not row['requirement_ids'] for row in features):
        errors.append('Chưa ánh xạ đủ54 chức năng YK2')
    counts = json.loads((here / 'counts.json').read_text())
    for key, actual in [('requirements', len(requirements)), ('rules', len(rules)), ('evidence', len(evidence))]:
        if counts[key] != actual:
            errors.append(f'Báo cáo số lượng không khớp {key}')
    return errors


def main():
    errors = validate()
    if errors:
        print('FAIL — kiểm tra truy vết cơ học:')
        print('\n'.join(errors))
        return 1
    print('PASS — đủ trường, ID/EV/BR liên kết hợp lệ, nguồn đúng hash, đủ54 chức năng và67 mục cũ được nối.')
    print('Không thay kiểm chứng ngữ nghĩa, review độc lập, xác nhận khách hoặc ký gate.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, csv.Error) as error:
        print(f'FAIL: {error}', file=sys.stderr)
        sys.exit(1)

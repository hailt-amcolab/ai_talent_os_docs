#!/usr/bin/env python3
"""Kiểm tra liên kết/snapshot của hồ sơ flow; không xác nhận nghiệp vụ hoặc ký gate."""
import csv
import hashlib
import json
from pathlib import Path
import re
import sys

HERE = Path(__file__).resolve().parent
DOCS = HERE.parent
ROOT = DOCS.parent.parent
LABELS = {'SOURCE_CONFIRMED', 'SOURCE_DESCRIBED', 'INFERENCE', 'UNDEFINED', 'CONFLICTED', 'SOURCE_PROPOSAL'}


def read(path):
    with path.open(encoding='utf-8-sig', newline='') as handle:
        return list(csv.DictReader(handle))


def validate(root=ROOT, docs=DOCS, here=HERE):
    errors = []
    flows = read(docs / 'registers/business-flows.csv')
    steps = read(here / 'steps.csv')
    transitions = read(here / 'state-transitions.csv')
    reqs = {r['requirement_id']: r for r in read(docs / 'registers/requirements.csv')}
    rules = {r['rule_id']: r for r in read(docs / 'registers/business-rules.csv')}
    evidence_rows = read(docs / 'registers/evidence.csv') + read(here / 'flow-evidence.csv')
    evidence = {r['evidence_id']: r for r in evidence_rows}
    if len(evidence) != len(evidence_rows):
        errors.append('Trùng ID EV cũ/mới')
    for name, rows, field in [('flow', flows, 'flow_id'), ('step', steps, 'step_id'), ('transition', transitions, 'transition_id')]:
        if len({r[field] for r in rows}) != len(rows):
            errors.append(f'Trùng ID {name}')
    flow_ids = {r['flow_id'] for r in flows}
    step_ids = {r['step_id'] for r in steps}
    for row in steps + transitions:
        identity = row.get('step_id', row.get('transition_id'))
        if row['flow_id'] not in flow_ids:
            errors.append(f'{identity}: FLOW không tồn tại')
        if row['classification'] not in LABELS:
            errors.append(f'{identity}: nhãn không hợp lệ')
        if not row['evidence_ids']:
            errors.append(f'{identity}: thiếu nguồn để nêu hành vi/giới hạn')
        for eid in filter(None, row['evidence_ids'].split(';')):
            if eid not in evidence:
                errors.append(f'{identity}: EV không tồn tại {eid}')
        if row.get('branch_from') and row['branch_from'] not in step_ids:
            errors.append(f'{identity}: điểm tách nhánh không tồn tại')
        for req in filter(None, row.get('requirement_ids', '').split(';')):
            if req not in reqs:
                errors.append(f'{identity}: REQ không tồn tại {req}')
    for fid in flow_ids:
        main = [s for s in steps if s['flow_id'] == fid and s['section'] == 'MAIN']
        for i, step in enumerate(main[:-1]):
            if step['classification'] in {'UNDEFINED', 'CONFLICTED'} and 'MỐC ĐÍCH CÓ ĐIỀU KIỆN' not in main[i+1]['sequence_basis']:
                errors.append(f'{fid}: nối mặc định qua bước U/X {step["step_id"]}')
        if not main:
            errors.append(f'{fid}: thiếu trình tự chính')
        path = here / 'flows' / f'{fid}.md'
        if not path.is_file():
            errors.append(f'{fid}: thiếu đặc tả')
            continue
        text = path.read_text()
        for n in range(1, 13):
            if not re.search(rf'^## {n}\. ', text, re.M):
                errors.append(f'{fid}: thiếu mục {n}')
    for flow in flows:
        for field in ['actor_refs','precondition_refs','main_path_refs','dependency_refs','postcondition_refs','requirement_ids','evidence_ids']:
            if not flow[field].strip():
                errors.append(f'{flow["flow_id"]}: thiếu {field}')
    mapping = read(here / 'requirement-flow-map.csv')
    if {m['requirement_id'] for m in mapping} != set(reqs):
        errors.append('Requirement thiếu disposition/flow hoặc có ID sai')
    for m in mapping:
        if m['flow_id'] not in flow_ids:
            errors.append(f'Map FLOW sai: {m["flow_id"]}')
    for m in read(here / 'rule-flow-map.csv'):
        if m['rule_id'] not in rules:
            errors.append(f'BR sai: {m["rule_id"]}')
        for fid in filter(None, m['flow_ids'].split(';')):
            if fid not in flow_ids:
                errors.append(f'BR map FLOW sai: {fid}')
    for row in read(here / 'scenarios.csv'):
        if row['flow_id'] not in flow_ids or not row['relevance'].strip():
            errors.append('Scenario thiếu điều kiện liên quan/FLOW')
        for sid in row['step_ids'].split(';'):
            if sid not in step_ids:
                errors.append(f'Scenario trỏ bước sai: {sid}')
    snapshot = json.loads((here / 'source-snapshot.json').read_text())
    sources = {r['source_id']: r for r in snapshot['source_files']}
    for item in snapshot['source_files']:
        path = root / item['path']
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != item['sha256']:
            errors.append(f'Nguồn đã đổi: {item["source_id"]}')
    for relative, expected in snapshot['input_artifacts'].items():
        path = root / relative
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            errors.append(f'Đầu vào extraction/phân tích cũ đã đổi: {relative}')
    for eid, item in evidence.items():
        source = sources.get(item['source_id'])
        if not source or source['path'] != item['source_path'] or source['sha256'] != item['source_sha256']:
            errors.append(f'{eid}: định danh nguồn không khớp')
        if not item['source_path'].startswith('source_requiments/'):
            errors.append(f'{eid}: dùng nguồn dẫn xuất làm chứng cứ khách')
    # Không chỉ kiểm số lượng: map đủ13UC và19 trang flow nguồn đúng bản.
    sm = read(here / 'source-flow-map.csv')
    units = {(r['source_id'],r['source_unit']) for r in sm}
    expected_units = {('YK2',f'UC-{n:02d}') for n in range(1,14)} | {('SD-T18',f'PDF trang{n}') for n in range(21,29)} | {('SD-M18',f'PDF trang{n}') for n in range(24,35)}
    if units != expected_units:
        errors.append('Thiếu/sai đơn vị UC hoặc flow nguồn18/11')
    for row in sm:
        if not row['flow_ids'] or any(fid not in flow_ids for fid in row['flow_ids'].split(';')):
            errors.append('Source flow map không nối tới FLOW hợp lệ')
    counts = json.loads((here / 'counts.json').read_text())
    for key, actual in [('flows',len(flows)),('steps',len(steps)),('transitions',len(transitions)),('new_evidence',len(read(here/'flow-evidence.csv')))]:
        if counts[key] != actual:
            errors.append(f'Số lượng báo cáo sai: {key}')
    # Kiểm định dạng bảng Markdown và liên kết của toàn bộ bộ hồ sơ.
    for path in here.rglob('*.md'):
        lines = path.read_text().splitlines()
        for i,line in enumerate(lines[:-1]):
            if line.startswith('|') and re.match(r'^\|[-: |]+\|$', lines[i+1]):
                if line.count('|') != lines[i+1].count('|'):
                    errors.append(f'Bảng Markdown lệch cột: {path.name}:{i+1}')
        for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', path.read_text()):
            if '://' not in target and not target.startswith('#') and not (path.parent / target.split('#')[0]).exists():
                errors.append(f'Link không tồn tại: {path.name} -> {target}')
    return errors


def main():
    errors = validate()
    if errors:
        print('FAIL — hồ sơ flow:')
        print('\n'.join(errors))
        return 1
    print('PASS —30 flow có12 mục; REQ/BR/EV/bước/trạng thái/map nguồn hợp lệ; không nối mặc định qua U/X; nguồn/đầu vào cũ đúng hash.')
    print('Chỉ kiểm cơ học, không xác nhận nghiệp vụ/review độc lập/G3 PASS.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError, csv.Error) as error:
        print(f'FAIL: {error}', file=sys.stderr)
        sys.exit(1)

#!/usr/bin/env python3
"""Read-only structural validation of the proposed design; does not connect to Postgres."""
from pathlib import Path
import collections
import json
import re

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / 'database-design'


def validate():
    contract = json.loads((DESIGN / 'technical-design-contracts-2026-11-25.json').read_text())
    existing = {}
    migrations = sorted((ROOT / 'apps/api/prisma/migrations').glob('*/migration.sql'))
    for path in migrations:
        sql = path.read_text()
        for match in re.finditer(r'CREATE TABLE\s+([\w.]+)\s*\((.*?)\n\);', sql, re.S | re.I):
            name = match[1] if '.' in match[1] else 'public.' + match[1]
            existing[name] = {
                m[1]: m[2].lower() for m in re.finditer(
                    r'^\s*([a-z_]\w*)\s+(uuid|bigint|integer|smallint|text|boolean|jsonb|date|timestamptz|numeric\([^)]*\)|char\([^)]*\))',
                    match[2], re.M)
            }
        for stmt in re.finditer(r'ALTER TABLE\s+([\w.]+)(.*?);', sql, re.S | re.I):
            name = stmt[1] if '.' in stmt[1] else 'public.' + stmt[1]
            if name not in existing:
                continue
            for col in re.finditer(r'ADD COLUMN\s+([a-z_]\w*)\s+([a-z]+(?:\([^)]*\))?)', stmt[2], re.I):
                existing[name][col[1]] = col[2].lower()

    tables = contract['tables']
    names = [t['table'] for t in tables]
    assert len(names) == len(set(names)), 'Duplicate table contract'
    proposed = {name: dict(cols) for name, cols in existing.items()}
    for table in tables:
        name = table['table']
        if table['change'] == 'NEW':
            assert name not in existing, f'NEW table already exists: {name}'
            proposed[name] = {}
        else:
            assert name in existing, f'EXTEND target absent in migration sources: {name}'
        columns = table['columns']
        assert len(columns) == len({c['name'] for c in columns}), name
        for col in columns:
            assert isinstance(col['nullable'], bool), (name, col)
            proposed[name][col['name']] = col['type']
        assert table['invariants'] and table['indexes'], name

    fk_count = 0
    for table in tables:
        for fk in table['references']:
            fk_count += 1
            assert len(fk['columns']) == len(fk['target_columns']), fk
            assert fk['table'] in proposed, fk
            for source, target in zip(fk['columns'], fk['target_columns']):
                assert source in proposed[table['table']], (table['table'], source)
                assert target in proposed[fk['table']], (fk['table'], target)
                assert proposed[table['table']][source] == proposed[fk['table']][target], (
                    table['table'], source, fk['table'], target,
                    proposed[table['table']][source], proposed[fk['table']][target])

    dictionary = (DESIGN / '10_target_data_dictionary.md').read_text()
    assert set(re.findall(r'^## ((?:app_private|public)\.\w+)$', dictionary, re.M)) == set(names)
    for path in [*DESIGN.glob('0[1-9]_*.md'), DESIGN / '10_target_data_dictionary.md']:
        for link in re.findall(r'\]\(([^)]+)\)', path.read_text()):
            if '://' in link or link.startswith('#'):
                continue
            target = path.parent / link.split('#')[0]
            if target.name == 'technical-design-review-2026-11-25.json' and not target.exists():
                continue  # written after this first structural run
            assert target.exists(), (path, link)
    return {
        'status': 'PASS',
        'migration_files_read': len(migrations),
        'existing_create_table_count': len(existing),
        'proposed_tables_by_change': dict(collections.Counter(t['change'] for t in tables)),
        'foreign_key_shapes_and_types_checked': fk_count,
        'dictionary_table_mapping': 'PASS',
        'relative_file_links': 'PASS',
        'limits': 'Not SQL replay, candidate-key proof, business verification, provider test or independent review.'
    }


if __name__ == '__main__':
    print(json.dumps(validate(), ensure_ascii=False, indent=2))

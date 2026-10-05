import json
import re

log_path = r'C:\Users\legion\.gemini\antigravity-ide\brain\9b1a12c1-5460-4f68-ac42-545248fe2670\.system_generated\logs\transcript_full.jsonl'

app_tsx_versions = []
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'CODE_ACTION' and 'App.tsx' in data.get('content', ''):
            app_tsx_versions.append(data['content'])

if app_tsx_versions:
    print(f'Found {len(app_tsx_versions)} edits to App.tsx')
    print('Last edit:')
    print(app_tsx_versions[-1][:500])
else:
    print('No edits to App.tsx found.')

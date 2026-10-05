import json

log_path = r'C:\Users\legion\.gemini\antigravity-ide\brain\9b1a12c1-5460-4f68-ac42-545248fe2670\.system_generated\logs\transcript_full.jsonl'

edits = []
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'CODE_ACTION' and 'App.tsx' in data.get('content', ''):
            edits.append(data.get('created_at'))

print(f"Total App.tsx edits: {len(edits)}")
for e in edits:
    print(e)

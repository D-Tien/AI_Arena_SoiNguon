import json

log_path = r'C:\Users\legion\.gemini\antigravity-ide\brain\9b1a12c1-5460-4f68-ac42-545248fe2670\.system_generated\logs\transcript_full.jsonl'

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'PLANNER_RESPONSE':
            for call in data.get('tool_calls', []):
                if call['name'] == 'view_file' and 'App.tsx' in call.get('args', {}).get('AbsolutePath', ''):
                    print(data.get('created_at'))

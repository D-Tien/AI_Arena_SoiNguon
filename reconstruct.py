import json

log_path = r'C:\Users\legion\.gemini\antigravity-ide\brain\9b1a12c1-5460-4f68-ac42-545248fe2670\.system_generated\logs\transcript_full.jsonl'

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

applied_count = 0
failed_count = 0

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        created_at = data.get('created_at', '')
        if created_at > '2026-10-05T17:39:00Z':
            break
            
        if data.get('type') == 'PLANNER_RESPONSE':
            for call in data.get('tool_calls', []):
                name = call.get('name')
                args = call.get('args', {})
                target_file = args.get('TargetFile', '')
                
                if 'App.tsx' in target_file:
                    if name == 'replace_file_content':
                        target = args.get('TargetContent', '')
                        replacement = args.get('ReplacementContent', '')
                        if target in content:
                            content = content.replace(target, replacement)
                            applied_count += 1
                        else:
                            failed_count += 1
                    elif name == 'multi_replace_file_content':
                        chunks = args.get('ReplacementChunks', [])
                        for chunk in chunks:
                            target = chunk.get('TargetContent', '')
                            replacement = chunk.get('ReplacementContent', '')
                            if target in content:
                                content = content.replace(target, replacement)
                                applied_count += 1
                            else:
                                failed_count += 1

with open('App_reconstructed.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Applied {applied_count} edits. Failed {failed_count} edits.")

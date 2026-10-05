import json
import subprocess

log_path = r'C:\Users\legion\.gemini\antigravity-ide\brain\9b1a12c1-5460-4f68-ac42-545248fe2670\.system_generated\logs\transcript_full.jsonl'

subprocess.run(['git', 'checkout', 'src/App.tsx'])

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def apply_ai_edit(content, target, replacement):
    if target in content:
        return content.replace(target, replacement)
    return content

patch_count = 0

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        created_at = data.get('created_at', '')
        if created_at > '2026-10-05T17:39:00Z':
            break
            
        t = data.get('type')
        
        if t == 'PLANNER_RESPONSE':
            for call in data.get('tool_calls', []):
                # Handle old format (name, args) and new format (function: {name, arguments})
                if 'function' in call:
                    name = call['function'].get('name', '')
                    args_str = call['function'].get('arguments', '{}')
                    try:
                        args = json.loads(args_str)
                    except:
                        args = {}
                else:
                    name = call.get('name', '')
                    args = call.get('args', {})
                
                target_file = args.get('TargetFile', '')
                
                if 'App.tsx' in target_file:
                    if name in ('replace_file_content', 'default_api:replace_file_content'):
                        target = args.get('TargetContent', '')
                        replacement = args.get('ReplacementContent', '')
                        new_content = apply_ai_edit(content, target, replacement)
                        if new_content != content:
                            print(f'Applied replace_file_content on App.tsx at {created_at}')
                            content = new_content
                        else:
                            print(f'FAILED to apply replace_file_content on App.tsx at {created_at}')
                    elif name in ('multi_replace_file_content', 'default_api:multi_replace_file_content'):
                        chunks = args.get('ReplacementChunks', [])
                        # if chunks is a string, parse it
                        if isinstance(chunks, str):
                            try: chunks = json.loads(chunks)
                            except: chunks = []
                        for i, chunk in enumerate(chunks):
                            target = chunk.get('TargetContent', '')
                            replacement = chunk.get('ReplacementContent', '')
                            new_content = apply_ai_edit(content, target, replacement)
                            if new_content != content:
                                print(f'Applied multi_replace chunk {i} on App.tsx at {created_at}')
                                content = new_content
                            else:
                                print(f'FAILED to apply multi_replace chunk {i} on App.tsx at {created_at}')
                            
            with open('src/App.tsx', 'w', encoding='utf-8') as out:
                out.write(content)
                
        elif t == 'USER_INPUT':
            msg = data.get('content', '')
            if 'The following changes were made by the USER to:' in msg and 'App.tsx' in msg:
                if '[diff_block_start]' in msg and '[diff_block_end]' in msg:
                    diff_text = msg.split('[diff_block_start]')[1].split('[diff_block_end]')[0].strip()
                    if diff_text:
                        patch_content = f"--- a/src/App.tsx\n+++ b/src/App.tsx\n{diff_text}\n"
                        patch_file = f'temp_patch_{patch_count}.diff'
                        with open(patch_file, 'w', encoding='utf-8') as pf:
                            pf.write(patch_content)
                        
                        res = subprocess.run(['git', 'apply', '--ignore-space-change', '--ignore-whitespace', patch_file], capture_output=True, text=True)
                        if res.returncode == 0:
                            print(f'Successfully applied USER diff {patch_count} at {created_at}')
                            with open('src/App.tsx', 'r', encoding='utf-8') as inf:
                                content = inf.read()
                        else:
                            print(f'Failed to apply USER diff {patch_count} at {created_at}: {res.stderr}')
                        patch_count += 1

print('Done reconstructing App.tsx!')

import yaml
import json
import sys

# 读取 YAML
with open('openapi.yaml', 'r', encoding='utf-8') as f:
    data = yaml.safe_load(f)

# 写入 JSON
with open('openapi.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ openapi.json 已生成")

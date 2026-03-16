# 测试与 Mock

## Prism - Mock 服务器

Prism 可以根据 OpenAPI 规范自动生成 Mock 服务器，无需编写任何后端代码。

### 安装
```bash
npm install -g @stoplight/prism-cli
```

### 启动 Mock 服务器
```bash
# 基础模式
prism mock openapi.yaml

# 指定端口
prism mock openapi.yaml -p 3000

# 详细日志
prism mock openapi.yaml --verbose
```

### 动态响应
Prism 会根据 schema 自动生成符合规范的响应数据：

```bash
curl http://localhost:4010/pets
# 返回自动生成的宠物列表
```

### 静态示例
如果 OpenAPI 中定义了 `example`，Prism 会优先返回：

```yaml
responses:
  '200':
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Pet'
        example:
          id: 1
          name: 小白
          status: available
```

### 代理模式
Prism 也可以作为代理，记录和验证请求：

```bash
prism proxy openapi.yaml https://api.example.com
```

## 契约测试

### 使用 Dredd
```bash
npm install -g dredd

# 运行测试
dredd openapi.yaml http://localhost:3000
```

### 使用 Schemathesis
```bash
pip install schemathesis

# 运行测试
st run openapi.yaml --base-url http://localhost:3000
```

## 集成测试示例

```javascript
// tests/api.test.js
const request = require('supertest');
const app = 'http://localhost:4010'; // Prism mock server

describe('Pet API', () => {
  test('GET /pets returns list', async () => {
    const res = await request(app)
      .get('/pets')
      .expect(200);
    
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /pets creates pet', async () => {
    const res = await request(app)
      .post('/pets')
      .send({ name: 'Test Pet' })
      .expect(201);
    
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Pet');
  });
});
```

## 验证规范

### Swagger CLI
```bash
npm install -g swagger-cli

# 验证
swagger-cli validate openapi.yaml

# 打包（解析所有 $ref）
swagger-cli bundle openapi.yaml -o bundled.yaml
```

### Spectral
```bash
npm install -g @stoplight/spectral-cli

# 使用默认规则
spectral lint openapi.yaml

# 使用自定义规则
spectral lint openapi.yaml --ruleset .spectral.yaml
```

### 配置 Spectral 规则
```yaml
# .spectral.yaml
extends: ["spectral:oas", "spectral:documentation"]

rules:
  # 强制要求 operationId
  operation-operationId: error
  
  # 强制要求描述
  operation-description: warn
  
  # 强制要求示例
  schema-examples: error
  
  # 自定义规则
  my-custom-rule:
    description: API 标题必须包含版本号
    given: "$.info.title"
    then:
      function: pattern
      functionOptions:
        match: "v\\d+"
```

## CI/CD 集成

```yaml
# .github/workflows/test.yml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate OpenAPI
        run: npx swagger-cli validate openapi.yaml
      
      - name: Lint with Spectral
        run: npx @stoplight/spectral-cli lint openapi.yaml
      
      - name: Start Mock Server
        run: npx @stoplight/prism-cli mock openapi.yaml &
      
      - name: Run Tests
        run: npm test
```

## 性能测试

使用生成的 Mock 进行负载测试：

```bash
# 安装 Artillery
npm install -g artillery

# 编写测试场景
# artillery-config.yml
config:
  target: 'http://localhost:4010'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: 'Get pets'
    requests:
      - get:
          url: '/pets'
```

```bash
artillery run artillery-config.yml
```

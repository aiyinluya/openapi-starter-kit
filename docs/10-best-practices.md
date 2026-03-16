# 最佳实践

## 1. 版本控制

### URL 版本（推荐）
```yaml
servers:
  - url: https://api.example.com/v1
  - url: https://api.example.com/v2
```

### Header 版本
```yaml
paths:
  /pets:
    get:
      parameters:
        - name: X-API-Version
          in: header
          schema:
            type: string
            enum: ['v1', 'v2']
```

## 2. 命名规范

### 路径命名
- ✅ 使用名词复数：`/pets`、`/orders`
- ❌ 避免动词：`/getPets`、`/createPet`
- ✅ 小写字母，用连字符分隔：`/pet-categories`

### 操作命名
```yaml
operationId: listPets      # GET /pets
operationId: createPet     # POST /pets
operationId: getPetById    # GET /pets/{id}
operationId: updatePet     # PUT /pets/{id}
operationId: deletePet     # DELETE /pets/{id}
```

## 3. 响应规范

### 始终使用标准 HTTP 状态码
```yaml
responses:
  '200':  # GET/PUT 成功
  '201':  # POST 创建成功
  '204':  # DELETE 成功
  '400':  # 请求参数错误
  '401':  # 未认证
  '403':  # 无权限
  '404':  # 资源不存在
  '409':  # 资源冲突
  '422':  # 验证错误
  '500':  # 服务器错误
```

### 统一错误格式
```yaml
Error:
  type: object
  required:
    - code
    - message
  properties:
    code:
      type: integer
      description: HTTP 状态码或业务错误码
    message:
      type: string
      description: 用户友好的错误信息
    details:
      type: string
      description: 详细错误信息（调试用）
    timestamp:
      type: string
      format: date-time
    path:
      type: string
      description: 请求路径
```

## 4. 分页设计

```yaml
parameters:
  - name: page
    in: query
    schema:
      type: integer
      default: 1
      minimum: 1
  - name: limit
    in: query
    schema:
      type: integer
      default: 20
      minimum: 1
      maximum: 100

responses:
  '200':
    content:
      application/json:
        schema:
          type: object
          properties:
            data:
              type: array
              items:
                $ref: '#/components/schemas/Pet'
            pagination:
              type: object
              properties:
                page:
                  type: integer
                limit:
                  type: integer
                total:
                  type: integer
                totalPages:
                  type: integer
```

## 5. 安全最佳实践

### 使用 HTTPS
```yaml
servers:
  - url: https://api.example.com/v1  # ✅
  - url: http://api.example.com/v1   # ❌ 生产环境禁用
```

### 敏感字段标记
```yaml
password:
  type: string
  format: password
  writeOnly: true  # 响应中不返回
```

### 适当的认证
```yaml
# 公开端点 - 无需认证
/pets:
  get:
    security: []  # 空数组表示公开

# 需要认证的端点
/pets:
  post:
    security:
      - apiKey: []
      - oauth2: [write:pets]
```

## 6. 文档质量

### 好的描述
```yaml
# ❌ 差
summary: Get pet

# ✅ 好
summary: 根据 ID 获取宠物详情
description: |
  返回指定宠物的完整信息，包括基本信息、分类、标签和照片。
  
  如果宠物不存在，返回 404 错误。
  
  需要 API Key 认证。
```

### 使用示例
```yaml
content:
  application/json:
    schema:
      $ref: '#/components/schemas/Pet'
    example:
      id: 1
      name: 小白
      status: available
```

## 7. 文件组织

```
api/
├── openapi.yaml          # 主文件（只包含 paths 和 imports）
├── components/
│   ├── schemas/
│   │   ├── Pet.yaml
│   │   ├── Order.yaml
│   │   └── User.yaml
│   ├── responses/
│   │   ├── BadRequest.yaml
│   │   └── NotFound.yaml
│   └── securitySchemes/
│       └── ApiKey.yaml
└── paths/
    ├── pets.yaml
    ├── pets-{id}.yaml
    └── orders.yaml
```

使用 `$ref` 引用：
```yaml
paths:
  /pets:
    $ref: './paths/pets.yaml'

components:
  schemas:
    Pet:
      $ref: './components/schemas/Pet.yaml'
```

## 8. 团队协作

### 使用 Spectral 检查规范
```bash
npx @stoplight/spectral-cli lint openapi.yaml
```

### 配置 .spectral.yaml
```yaml
extends: ["spectral:oas", "spectral:documentation"]
rules:
  operation-description: error
  operation-operationId: error
  schema-examples: error
```

### Git 工作流
```bash
# 1. 修改规范
vim openapi.yaml

# 2. 本地验证
npm run validate

# 3. 提交
git add openapi.yaml
git commit -m "feat: add order endpoints"

# 4. CI 自动检查
# 5. Code Review
# 6. 合并后自动生成文档
```

## 9. 性能考虑

### 使用缓存头
```yaml
responses:
  '200':
    headers:
      Cache-Control:
        schema:
          type: string
        example: max-age=3600
      ETag:
        schema:
          type: string
```

### 支持字段筛选
```yaml
parameters:
  - name: fields
    in: query
    description: 指定返回的字段，逗号分隔
    example: id,name,status
```

## 10. 持续演进

- ✅ 保持向后兼容（添加字段，不删除）
- ✅ 废弃旧字段时标记 `deprecated: true`
- ✅ 使用 changelog 记录变更
- ✅ 提供迁移指南

---

记住：**好的 API 文档是活的文档**，随代码一起迭代更新。

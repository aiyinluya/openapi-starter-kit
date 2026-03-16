# OpenAPI 基础概念

## 什么是 OpenAPI？

OpenAPI Specification（OAS，以前叫 Swagger）是一个用于描述 RESTful API 的标准格式。它让你可以用一种机器可读的方式来定义 API 的结构，包括：

- 可用的端点（URL）和操作（GET、POST 等）
- 操作参数（输入和输出）
- 认证方法
- 联系信息、许可证、使用条款等元数据

## 为什么需要 OpenAPI？

### 1. **文档自动化**
```yaml
# 你写的 OpenAPI 文件
paths:
  /pets:
    get:
      summary: 获取宠物列表
```
```
# 自动生成的交互式文档
┌─────────────────────────────────────┐
│  GET /pets                           │
│  获取宠物列表                        │
│  [Try it out]                        │
└─────────────────────────────────────┘
```

### 2. **代码生成**
- 客户端 SDK（JavaScript、Python、Java...）
- 服务端存根（stub）
- 类型定义（TypeScript、Go...）

### 3. **Mock 服务器**
不用写一行后端代码，就能测试前端：
```bash
npx @stoplight/prism-cli mock openapi.yaml
```

### 4. **API 契约测试**
确保前后端实现与规范一致。

## OpenAPI 版本

| 版本 | 发布时间 | 特点 |
|------|----------|------|
| Swagger 2.0 | 2014 | 前身，广泛使用 |
| OpenAPI 3.0 | 2017 | 重大改进，推荐 |
| OpenAPI 3.1 | 2021 | 与 JSON Schema 对齐 |

本项目使用 **OpenAPI 3.0.3**（最稳定的版本）。

## 核心概念速览

```
OpenAPI 文档
├── info          # API 基本信息（标题、版本、描述）
├── servers       # 服务器地址列表
├── paths         # API 端点定义
│   └── /pets
│       ├── get   # GET /pets
│       └── post  # POST /pets
├── components    # 可复用组件
│   ├── schemas   # 数据模型
│   ├── responses # 响应定义
│   └── securitySchemes # 认证方式
└── security      # 全局安全设置
```

## 最简单的 OpenAPI 文件

```yaml
openapi: 3.0.3
info:
  title: Hello API
  version: 1.0.0
paths:
  /hello:
    get:
      summary: 打招呼
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
```

## YAML vs JSON

OpenAPI 支持两种格式：

| 格式 | 优点 | 缺点 |
|------|------|------|
| YAML | 可读性好、支持注释、简洁 | 缩进敏感 |
| JSON | 通用性强、易解析 | 冗长、无注释 |

**推荐：开发用 YAML，发布用 JSON（可自动转换）**

## 下一步

→ 查看 [../examples/01-hello-world.yaml](../examples/01-hello-world.yaml) 编写你的第一个 API

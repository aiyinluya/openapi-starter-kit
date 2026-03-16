# OpenAPI Starter Kit - 从零开始学 OpenAPI

一个面向初学者的 OpenAPI 3.0 完整入门教程项目。通过实际案例学习如何设计、编写和使用 API 规范。

## 🌐 在线预览

**Swagger UI 在线文档**: https://aiyinluya.github.io/openapi-starter-kit/

无需安装任何工具，直接在浏览器中查看和测试 API。

## 📚 项目简介

本项目通过构建一个**宠物商店 API** 的完整案例，带你从零掌握 OpenAPI 规范：

- ✅ 理解 OpenAPI 核心概念
- ✅ 学会编写规范的 API 文档
- ✅ 使用 Swagger UI 可视化 API
- ✅ 使用代码生成工具自动生成客户端/服务端代码
- ✅ 掌握 API 版本管理和最佳实践

## 🚀 快速开始

### 环境要求

- Node.js 16+ (推荐)
- 或 Python 3.8+ (可选)

### 启动 Swagger UI

```bash
# 方式1: 使用 npx (无需安装)
npx @stoplight/prism-cli mock openapi.yaml

# 方式2: 使用 Docker
docker run -p 8080:8080 -v $(pwd):/usr/share/nginx/html/swagger -e SWAGGER_JSON=/usr/share/nginx/html/swagger/openapi.yaml swaggerapi/swagger-ui

# 方式3: 使用 VS Code 插件
# 安装 "OpenAPI (Swagger) Editor" 插件，右键 openapi.yaml -> Preview Swagger
```

## 📖 教程大纲

| 章节 | 内容 | 文件 |
|------|------|------|
| 01-基础概念 | OpenAPI 是什么、为什么需要它 | [docs/01-basics.md](docs/01-basics.md) |
| 02-第一个API | 编写最简单的 OpenAPI 文档 | [examples/01-hello-world.yaml](examples/01-hello-world.yaml) |
| 03-路径与操作 | 路径参数、查询参数、请求方法 | [examples/02-paths-and-operations.yaml](examples/02-paths-and-operations.yaml) |
| 04-数据模型 | Schema、数据类型、验证规则 | [examples/03-schemas.yaml](examples/03-schemas.yaml) |
| 05-请求响应 | Request Body、Response、状态码 | [examples/04-requests-responses.yaml](examples/04-requests-responses.yaml) |
| 06-认证授权 | API Key、OAuth2、JWT | [examples/05-authentication.yaml](examples/05-authentication.yaml) |
| 07-完整案例 | 宠物商店完整 API | [openapi.yaml](openapi.yaml) |
| 08-代码生成 | 使用 openapi-generator | [docs/08-codegen.md](docs/08-codegen.md) |
| 09-测试与Mock | Prism、契约测试 | [docs/09-testing.md](docs/09-testing.md) |
| 10-最佳实践 | 版本控制、文档规范、团队协作 | [docs/10-best-practices.md](docs/10-best-practices.md) |

## 🎯 实战项目: 宠物商店 API

本项目实现了一个完整的宠物商店 REST API：

- **宠物管理**: 增删改查、按状态筛选
- **订单系统**: 下单、查询订单、删除订单
- **用户系统**: 注册、登录、用户信息

### API 端点概览

```
GET    /pets           # 获取宠物列表
GET    /pets/{id}      # 获取单个宠物
POST   /pets           # 创建宠物
PUT    /pets/{id}      # 更新宠物
DELETE /pets/{id}      # 删除宠物

POST   /orders         # 创建订单
GET    /orders/{id}    # 获取订单
DELETE /orders/{id}    # 删除订单

POST   /users          # 创建用户
GET    /users/{id}     # 获取用户
PUT    /users/{id}     # 更新用户
```

## 🛠️ 工具链

| 工具 | 用途 | 推荐度 |
|------|------|--------|
| [Swagger Editor](https://editor.swagger.io/) | 在线编辑和预览 | ⭐⭐⭐⭐⭐ |
| [Swagger UI](https://swagger.io/tools/swagger-ui/) | API 文档可视化 | ⭐⭐⭐⭐⭐ |
| [Prism](https://stoplight.io/open-source/prism) | Mock 服务器 | ⭐⭐⭐⭐⭐ |
| [OpenAPI Generator](https://openapi-generator.tech/) | 代码生成 | ⭐⭐⭐⭐ |
| [Redoc](https://redocly.com/) | 替代文档渲染 | ⭐⭐⭐⭐ |

## 📂 项目结构

```
openapi-starter-kit/
├── openapi.yaml          # 主 API 规范文件
├── openapi.json          # JSON 格式（自动生成）
├── examples/             # 分步骤示例
│   ├── 01-hello-world.yaml
│   ├── 02-paths-and-operations.yaml
│   ├── 03-schemas.yaml
│   ├── 04-requests-responses.yaml
│   └── 05-authentication.yaml
├── docs/                 # 教程文档
│   ├── 01-basics.md
│   ├── 08-codegen.md
│   ├── 09-testing.md
│   └── 10-best-practices.md
├── generated/            # 生成的代码（gitignore）
├── scripts/              # 辅助脚本
│   ├── validate.js       # 验证 OpenAPI 文件
│   ├── convert.js        # YAML/JSON 互转
│   └── generate.js       # 代码生成
├── tests/                # 测试用例
├── .spectral.yaml        # API 规范检查规则
├── .gitignore
├── LICENSE
└── README.md
```

## 🧪 验证规范

```bash
# 使用 Swagger CLI 验证
npx swagger-cli validate openapi.yaml

# 或使用 Spectral 进行更严格的检查
npx @stoplight/spectral-cli lint openapi.yaml
```

## 📝 学习路径建议

1. **完全新手**: 按顺序阅读 `docs/` 目录，边读边实践 `examples/`
2. **有基础**: 直接看 `openapi.yaml`，配合 Swagger UI 理解
3. **要实战**: 运行 `scripts/generate.js` 生成代码，集成到你的项目

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

- 发现文档错误？请指出
- 想添加新示例？欢迎提交
- 有改进建议？一起讨论

## 📄 许可证

MIT License - 自由使用、修改和分发

## 🔗 相关资源

- [OpenAPI 官方规范](https://spec.openapis.org/)
- [Swagger 官方文档](https://swagger.io/docs/)
- [OpenAPI Map (可视化)](https://openapi-map.apihandyman.io/)
- [APIs You Won't Hate](https://apisyouwonthate.com/)

---

Made with ❤️ for API developers

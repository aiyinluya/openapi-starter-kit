# 代码生成

OpenAPI Generator 可以根据 OpenAPI 规范自动生成各种语言的客户端和服务端代码。

## 安装

```bash
# 使用 npm (推荐)
npm install @openapitools/openapi-generator-cli -g

# 或使用 Docker
docker pull openapitools/openapi-generator-cli
```

## 常用命令

### 生成 TypeScript 客户端
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o generated/typescript-client
```

### 生成 Python 客户端
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o generated/python-client
```

### 生成 Java 客户端
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g java \
  -o generated/java-client \
  --additional-properties=library=okhttp-gson
```

### 生成服务端存根 (Node.js/Express)
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g nodejs-express-server \
  -o generated/server
```

### 生成服务端存根 (Spring Boot)
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g spring \
  -o generated/spring-server \
  --additional-properties=library=spring-boot
```

## 支持的生成器

查看所有支持的生成器：
```bash
openapi-generator-cli list
```

常用生成器：

| 语言/框架 | 生成器名称 |
|-----------|-----------|
| TypeScript | typescript-fetch, typescript-axios, typescript-node |
| JavaScript | javascript, javascript-closure-angular |
| Python | python, python-flask |
| Java | java, spring |
| Go | go, go-server |
| C# | csharp, csharp-netcore |
| PHP | php, php-laravel |
| Ruby | ruby, ruby-on-rails |

## 配置选项

创建配置文件 `openapi-generator-config.json`：

```json
{
  "modelPackage": "com.example.model",
  "apiPackage": "com.example.api",
  "invokerPackage": "com.example.client",
  "groupId": "com.example",
  "artifactId": "petstore-client",
  "artifactVersion": "1.0.0"
}
```

使用配置：
```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g java \
  -o generated/java-client \
  -c openapi-generator-config.json
```

## 使用 npm 脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "generate:ts": "openapi-generator-cli generate -i openapi.yaml -g typescript-fetch -o generated/ts",
    "generate:py": "openapi-generator-cli generate -i openapi.yaml -g python -o generated/py",
    "generate:java": "openapi-generator-cli generate -i openapi.yaml -g java -o generated/java",
    "generate:all": "npm run generate:ts && npm run generate:py && npm run generate:java"
  }
}
```

运行：
```bash
npm run generate:ts
```

## 忽略文件

创建 `.openapi-generator-ignore` 排除不需要生成的文件：

```
# 忽略测试文件
**/test/**

# 忽略文档
**/*.md

# 忽略特定文件
git_push.sh
```

## 最佳实践

1. **将生成的代码加入 .gitignore**
   ```
   generated/
   ```

2. **CI/CD 中自动生成**
   ```yaml
   # .github/workflows/generate.yml
   name: Generate Code
   on:
     push:
       paths:
         - 'openapi.yaml'
   jobs:
     generate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Generate TypeScript client
           run: |
             npx @openapitools/openapi-generator-cli generate \
               -i openapi.yaml \
               -g typescript-fetch \
               -o generated/ts
         - name: Publish to npm
           run: cd generated/ts && npm publish
   ```

3. **版本管理**
   - API 版本变化时，生成的客户端版本也要更新
   - 使用语义化版本控制

## 替代工具

- [Swagger Codegen](https://github.com/swagger-api/swagger-codegen)
- [Kiota](https://github.com/microsoft/kiota) (Microsoft)
- [oapi-codegen](https://github.com/deepmap/oapi-codegen) (Go)

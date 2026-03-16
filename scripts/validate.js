const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

/**
 * 验证 OpenAPI 文件
 * 基础验证：检查文件是否存在、是否为有效的 YAML/JSON
 */

function validateOpenAPI(filePath) {
  console.log(`🔍 验证文件: ${filePath}`);
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${filePath}`);
    process.exit(1);
  }
  
  // 读取文件
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 尝试解析
  try {
    let spec;
    if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
      spec = YAML.parse(content);
    } else {
      spec = JSON.parse(content);
    }
    
    // 基础字段检查
    const requiredFields = ['openapi', 'info', 'paths'];
    const missing = requiredFields.filter(f => !spec[f]);
    
    if (missing.length > 0) {
      console.error(`❌ 缺少必需字段: ${missing.join(', ')}`);
      process.exit(1);
    }
    
    // 版本检查
    const version = spec.openapi;
    if (!version.startsWith('3.')) {
      console.warn(`⚠️  建议升级到 OpenAPI 3.x (当前: ${version})`);
    }
    
    console.log('✅ 基础验证通过');
    console.log(`   版本: ${version}`);
    console.log(`   标题: ${spec.info.title}`);
    console.log(`   API版本: ${spec.info.version}`);
    
    // 统计端点数量
    const paths = Object.keys(spec.paths || {});
    console.log(`   端点数量: ${paths.length}`);
    
    return true;
    
  } catch (err) {
    console.error(`❌ 解析失败: ${err.message}`);
    process.exit(1);
  }
}

// 主程序
const filePath = process.argv[2] || 'openapi.yaml';
validateOpenAPI(filePath);

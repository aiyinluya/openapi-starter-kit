const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * OpenAPI 代码生成脚本
 */

const GENERATORS = {
  'ts': { name: 'typescript-fetch', dir: 'typescript-client' },
  'typescript': { name: 'typescript-fetch', dir: 'typescript-client' },
  'js': { name: 'javascript', dir: 'javascript-client' },
  'javascript': { name: 'javascript', dir: 'javascript-client' },
  'py': { name: 'python', dir: 'python-client' },
  'python': { name: 'python', dir: 'python-client' },
  'java': { name: 'java', dir: 'java-client' },
  'go': { name: 'go', dir: 'go-client' },
  'server:node': { name: 'nodejs-express-server', dir: 'server-nodejs' },
  'server:spring': { name: 'spring', dir: 'server-spring' },
};

function generate(target) {
  const config = GENERATORS[target];
  
  if (!config) {
    console.error(`❌ 不支持的生成目标: ${target}`);
    console.log('支持的目标:');
    Object.keys(GENERATORS).forEach(k => console.log(`  - ${k}`));
    process.exit(1);
  }
  
  const outputDir = path.join('generated', config.dir);
  
  // 确保输出目录存在
  if (!fs.existsSync('generated')) {
    fs.mkdirSync('generated');
  }
  
  console.log(`🚀 生成 ${target} 代码...`);
  console.log(`   生成器: ${config.name}`);
  console.log(`   输出目录: ${outputDir}`);
  
  try {
    execSync(
      `npx @openapitools/openapi-generator-cli generate ` +
      `-i openapi.yaml ` +
      `-g ${config.name} ` +
      `-o ${outputDir}`,
      { stdio: 'inherit' }
    );
    console.log(`✅ 生成完成: ${outputDir}`);
  } catch (err) {
    console.error(`❌ 生成失败: ${err.message}`);
    process.exit(1);
  }
}

// 主程序
const target = process.argv[2] || 'ts';
generate(target);

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

/**
 * YAML <-> JSON 互转工具
 */

function convert(inputPath, outputPath) {
  console.log(`🔄 转换: ${inputPath} -> ${outputPath}`);
  
  const content = fs.readFileSync(inputPath, 'utf8');
  
  // 解析输入
  let data;
  if (inputPath.endsWith('.yaml') || inputPath.endsWith('.yml')) {
    data = YAML.parse(content);
  } else {
    data = JSON.parse(content);
  }
  
  // 生成输出
  let output;
  if (outputPath.endsWith('.yaml') || outputPath.endsWith('.yml')) {
    output = YAML.stringify(data, {
      indent: 2,
      lineWidth: 0,  // 不限制行宽
    });
  } else {
    output = JSON.stringify(data, null, 2);
  }
  
  fs.writeFileSync(outputPath, output);
  console.log(`✅ 已保存: ${outputPath}`);
}

// 主程序
const input = process.argv[2] || 'openapi.yaml';
const output = process.argv[3] || 'openapi.json';

convert(input, output);

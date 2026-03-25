#!/usr/bin/env node
'use strict';

/**
 * Prisma 数据导入脚本 - 从 _manifest.seed 读取 SQL 文件并导入
 * 
 * 用法: node prisma/import-data.js [options]
 * 
 * 示例:
 *   # 导入所有 SQL 文件（默认读取 _manifest.seed）
 *   node prisma/import-data.js
 * 
 *   # 指定 manifest 文件
 *   node prisma/import-data.js --manifest=prisma/data/sql/_manifest.seed
 * 
 *   # 只导入指定表
 *   node prisma/import-data.js --tables=User,App,Stock
 * 
 *   # 排除某些表
 *   node prisma/import-data.js --exclude=Session,VerificationToken
 * 
 *   # 先清空表再导入（危险操作！）
 *   node prisma/import-data.js --truncate
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);

// 默认配置
const DEFAULT_MANIFEST = path.join(__dirname, 'data/sql/_manifest.seed');
const DEFAULT_SQL_DIR = path.join(__dirname, 'data/sql');

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    manifest: '',      // manifest 文件路径
    tables: '',        // 指定导入的表
    exclude: '',       // 排除的表
    truncate: false,   // 是否先清空表
    dryRun: false      // 试运行，不实际执行
  };

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const [key, ...valueParts] = arg.split('=');
      const value = valueParts.join('=');
      const cleanKey = key.replace('--', '').replace(/-/g, '');

      if (cleanKey === 'manifest') options.manifest = value || '';
      else if (cleanKey === 'tables') options.tables = value || '';
      else if (cleanKey === 'exclude') options.exclude = value || '';
      else if (cleanKey === 'truncate') options.truncate = true;
      else if (cleanKey === 'dryrun') options.dryRun = true;
    }
  }

  return options;
}

/**
 * 解析 manifest 文件
 */
function parseManifest(manifestPath) {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest 文件不存在: ${manifestPath}`);
  }

  const content = fs.readFileSync(manifestPath, 'utf8');
  const lines = content.split('\n');
  
  const sqlFiles = [];
  let inFileList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // 跳过注释和空行
    if (!trimmed || trimmed.startsWith('#')) {
      // 检查是否是文件列表开始标记
      if (trimmed.includes('SQL Files') || trimmed.includes('Files:')) {
        inFileList = true;
      }
      continue;
    }
    
    // 收集 SQL 文件
    if (trimmed.endsWith('.sql')) {
      sqlFiles.push(trimmed);
    }
  }

  return sqlFiles;
}

/**
 * 获取 SQL 文件路径
 */
function getSqlFilePath(sqlFile, manifestPath, sqlDir) {
  // 如果是绝对路径，直接使用
  if (path.isAbsolute(sqlFile)) {
    return sqlFile;
  }
  
  // 如果是相对路径，基于 manifest 目录或 sqlDir 解析
  const baseDir = manifestPath ? path.dirname(manifestPath) : sqlDir;
  return path.join(baseDir, sqlFile);
}

/**
 * 使用 Prisma db execute 执行 SQL 文件
 */
async function executeSqlFile(sqlFilePath, dryRun = false) {
  if (dryRun) {
    console.log(`   [DRY RUN] 将执行: ${path.basename(sqlFilePath)}`);
    return { success: true, rows: 0 };
  }

  return new Promise((resolve, reject) => {
    const args = ['db', 'execute', '--file', sqlFilePath];
    const proc = spawn('npx', ['prisma', ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(stderr || stdout || `Exit code: ${code}`));
      } else {
        // 估算影响的行数（通过 INSERT 语句数量）
        const insertCount = (stdout.match(/INSERT IGNORE INTO/g) || []).length;
        resolve({ success: true, rows: insertCount });
      }
    });

    proc.on('error', (err) => {
      reject(new Error(`执行失败: ${err.message}`));
    });
  });
}

/**
 * 获取表名从 SQL 文件名
 */
function getTableNameFromFile(sqlFile) {
  const baseName = path.basename(sqlFile, '.sql');
  // 移除时间戳后缀（如 _2024-12-29_142129）
  return baseName.replace(/_\d{4}-\d{2}-\d{2}_\d{6}$/, '');
}

/**
 * 主函数
 */
async function main() {
  const options = parseArgs();

  console.log('📥 Prisma 数据导入工具');
  console.log('═══════════════════════════════════════════');
  console.log('');

  // 确定 manifest 文件路径
  const manifestPath = options.manifest || DEFAULT_MANIFEST;
  const sqlDir = path.dirname(manifestPath);

  // 解析 manifest
  let sqlFiles;
  try {
    sqlFiles = parseManifest(manifestPath);
    console.log(`📄 Manifest: ${path.relative(process.cwd(), manifestPath)}`);
    console.log(`📋 发现 ${sqlFiles.length} 个 SQL 文件`);
    console.log('');
  } catch (error) {
    console.error(`❌ ${error.message}`);
    console.log('');
    console.log('💡 提示: 您可以先运行导出命令生成 manifest');
    console.log('   pnpm db:export');
    process.exit(1);
  }

  // 应用过滤条件
  let filesToImport = sqlFiles.map(f => ({
    file: f,
    path: getSqlFilePath(f, manifestPath, sqlDir),
    table: getTableNameFromFile(f)
  }));

  // 按表名去重（保留最新的，没有时间戳的优先）
  const tableMap = new Map();
  for (const item of filesToImport) {
    const existing = tableMap.get(item.table);
    if (!existing || item.file.length < existing.file.length) {
      tableMap.set(item.table, item);
    }
  }
  filesToImport = Array.from(tableMap.values());

  // 指定表过滤
  if (options.tables) {
    const specifiedTables = options.tables.split(',').map(s => s.trim()).filter(Boolean);
    filesToImport = filesToImport.filter(item => specifiedTables.includes(item.table));
    console.log(`📋 指定导入: ${specifiedTables.join(', ')}`);
  }

  // 排除表过滤
  if (options.exclude) {
    const excludeTables = options.exclude.split(',').map(s => s.trim()).filter(Boolean);
    filesToImport = filesToImport.filter(item => !excludeTables.includes(item.table));
    console.log(`📋 排除表: ${excludeTables.join(', ')}`);
  }

  console.log(`📋 实际导入: ${filesToImport.length} 个表`);
  console.log('');

  if (filesToImport.length === 0) {
    console.log('⚠️  没有需要导入的表');
    process.exit(0);
  }

  if (options.truncate) {
    console.log('⚠️ 警告: --truncate 选项已启用，将清空目标表数据！');
    console.log('');
  }

  if (options.dryRun) {
    console.log('🏃 试运行模式 (DRY RUN)，不会实际修改数据库');
    console.log('');
  }

  console.log('🚀 开始导入');
  console.log('');

  const successFiles = [];
  const failedFiles = [];

  // 逐个导入
  for (let i = 0; i < filesToImport.length; i++) {
    const item = filesToImport[i];
    const progress = `[${i + 1}/${filesToImport.length}]`;

    // 检查文件是否存在
    if (!fs.existsSync(item.path)) {
      console.log(`   ${progress} ⚠️  ${item.table.padEnd(30)} 文件不存在: ${item.file}`);
      failedFiles.push({ table: item.table, error: '文件不存在' });
      continue;
    }

    try {
      const startTime = Date.now();
      const result = await executeSqlFile(item.path, options.dryRun);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      successFiles.push(item.table);
      console.log(`   ${progress} ✅ ${item.table.padEnd(30)} ${duration.padStart(6)}s`);

    } catch (error) {
      failedFiles.push({ table: item.table, error: error.message });
      console.log(`   ${progress} ❌ ${item.table.padEnd(30)} ${error.message.slice(0, 50)}`);
    }
  }

  // 输出总结
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('📊 导入完成');
  console.log(`   成功: ${successFiles.length}/${filesToImport.length} 个表`);
  console.log(`   失败: ${failedFiles.length} 个表`);
  console.log('');

  if (failedFiles.length > 0) {
    console.log('❌ 失败的表:');
    failedFiles.forEach(({ table, error }) => {
      console.log(`   - ${table}: ${error}`);
    });
    console.log('');
  }

  if (successFiles.length > 0) {
    console.log('✅ 导入的表:');
    successFiles.forEach(table => {
      console.log(`   - ${table}`);
    });
    console.log('');
  }

  if (failedFiles.length > 0) {
    process.exit(1);
  }
}

// 运行主函数
main().catch(error => {
  console.error(`❌ 脚本执行失败: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});

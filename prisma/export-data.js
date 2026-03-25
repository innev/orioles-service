#!/usr/bin/env node
'use strict';

/**
 * Prisma 数据导出脚本 - 每个表单独导出为 SQL
 * 纯 Prisma 方案，无需 mysql2
 * 
 * 用法: node prisma/export-data.js [options]
 * 
 * 示例:
 *   # 导出所有表（默认）
 *   node prisma/export-data.js
 * 
 *   # 导出指定表
 *   node prisma/export-data.js --tables=User,App,Stock
 * 
 *   # 排除某些表
 *   node prisma/export-data.js --exclude=Session,VerificationToken
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// 路径配置
const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'data/sql');

// 默认排除的系统表
const DEFAULT_EXCLUDE_TABLES = [
  '_prisma_migrations',
  'Session',
  'VerificationToken'
];

// Prisma 模型名到表名的映射（处理 @@map 装饰器）
const MODEL_TO_TABLE_MAP = {
  'Watchlist': 'watchlist',
  'AuditLog': 'audit_log',
  'AlertHistory': 'alert_history'
};

// 表定义（按依赖顺序）
// Prisma 模型名（注意：Prisma Client 使用 camelCase 方法名）
const TABLE_DEFINITIONS = [
  { model: 'user', table: 'User', pk: 'id' },
  { model: 'userBrand', table: 'UserBrand', pk: 'icon' },
  { model: 'app', table: 'App', pk: 'id' },
  { model: 'skills', table: 'Skills', pk: 'id' },
  { model: 'icon', table: 'Icon', pk: 'name' },
  { model: 'gitMojis', table: 'GitMojis', pk: 'name' },
  { model: 'githubColor', table: 'GithubColor', pk: 'name' },
  { model: 'video', table: 'Video', pk: 'id' },
  { model: 'oneTimePassword', table: 'OneTimePassword', pk: 'id' },
  { model: 'stock', table: 'Stock', pk: 'id' },
  { model: 'device', table: 'Device', pk: 'id' },
  { model: 'deviceService', table: 'DeviceService', pk: 'id' },
  { model: 'stockData', table: 'StockData', pk: 'id' },
  { model: 'watchlist', table: 'watchlist', pk: 'id' },
  { model: 'auditLog', table: 'audit_log', pk: 'id' },
  { model: 'alertHistory', table: 'alert_history', pk: 'id' }
];

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    tables: '',        // 空表示所有表
    exclude: '',       // 排除的表
    output: ''         // 自定义输出目录
  };

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const [key, ...valueParts] = arg.split('=');
      const value = valueParts.join('=');
      const cleanKey = key.replace('--', '').replace(/-/g, '');

      if (cleanKey === 'tables') options.tables = value || '';
      else if (cleanKey === 'exclude') options.exclude = value || '';
      else if (cleanKey === 'output') options.output = value || '';
    }
  }

  return options;
}

/**
 * 转义 SQL 字符串
 */
function escapeSqlString(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value instanceof Date) {
    return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
  }
  // 处理 Decimal 类型（Prisma 返回的是 Decimal 对象）
  if (value && typeof value === 'object' && value.toString) {
    return value.toString();
  }
  // 转义字符串中的特殊字符
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r')}'`;
}

/**
 * 生成 INSERT SQL
 */
function generateInsertSql(tableName, rows) {
  if (rows.length === 0) return '';

  // 获取列名（过滤掉关系字段）
  const firstRow = rows[0];
  const columns = Object.keys(firstRow).filter(key => {
    // 过滤掉关系对象字段（通常是对象或数组）
    const val = firstRow[key];
    return !(val && typeof val === 'object' && !(val instanceof Date));
  });

  const columnList = columns.map(c => `\`${c}\``).join(', ');

  // 分批生成 INSERT 语句（每批 100 条）
  const BATCH_SIZE = 100;
  let sql = `-- Data for \`${tableName}\` (${rows.length} rows)\n`;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const values = batch.map(row => {
      return '(' + columns.map(col => escapeSqlString(row[col])).join(', ') + ')';
    }).join(',\n  ');

    sql += `INSERT IGNORE INTO \`${tableName}\` (${columnList}) VALUES\n  ${values};\n`;
  }

  return sql;
}

/**
 * 导出单个表
 */
async function exportTable(prisma, tableDef) {
  const { model, table, pk } = tableDef;

  // 检查模型是否存在
  if (!prisma[model]) {
    return { content: `-- Table \`${table}\` model not found in Prisma Client\n`, rowCount: 0, skipped: true };
  }

  try {
    // 使用 Prisma Client 查询数据（model 已经是 camelCase）
    const rows = await prisma[model].findMany({
      orderBy: { [pk]: 'asc' }
    });

    if (rows.length === 0) {
      return { content: `-- Table \`${table}\` is empty\n`, rowCount: 0 };
    }

    let output = '';
    output += `-- ----------------------------------------\n`;
    output += `-- Export of table \`${table}\`\n`;
    output += `-- Date: ${new Date().toISOString()}\n`;
    output += `-- Rows: ${rows.length}\n`;
    output += `-- ----------------------------------------\n\n`;

    output += `SET FOREIGN_KEY_CHECKS=0;\n`;
    output += `SET UNIQUE_CHECKS=0;\n`;
    output += `SET AUTOCOMMIT=0;\n\n`;

    output += generateInsertSql(table, rows);
    output += '\n';

    output += `COMMIT;\n`;
    output += `SET UNIQUE_CHECKS=1;\n`;
    output += `SET FOREIGN_KEY_CHECKS=1;\n`;

    return { content: output, rowCount: rows.length };

  } catch (error) {
    // 检查是否是表不存在的错误
    if (error.message && error.message.includes('does not exist in the current database')) {
      return { content: `-- Table \`${table}\` does not exist in database\n`, rowCount: 0, skipped: true };
    }
    throw new Error(`查询失败: ${error.message}`);
  }
}

/**
 * 主函数
 */
async function main() {
  const options = parseArgs();

  console.log('📤 Prisma 数据导出工具 (纯 Prisma 方案)');
  console.log('═══════════════════════════════════════════');
  console.log('');

  // 确定输出目录
  const outputDir = options.output ? path.resolve(options.output) : OUTPUT_DIR;

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 构建排除列表
  const excludeList = [...DEFAULT_EXCLUDE_TABLES];
  if (options.exclude) {
    const userExclude = options.exclude.split(',').map(s => s.trim()).filter(Boolean);
    excludeList.push(...userExclude);
  }

  // 确定要导出的表
  let tablesToExport = [];
  if (options.tables) {
    const specifiedTables = options.tables.split(',').map(s => s.trim()).filter(Boolean);
    tablesToExport = TABLE_DEFINITIONS.filter(def => 
      specifiedTables.includes(def.model) || specifiedTables.includes(def.table)
    );
  } else {
    tablesToExport = [...TABLE_DEFINITIONS];
  }

  // 应用排除列表
  tablesToExport = tablesToExport.filter(def => !excludeList.includes(def.model) && !excludeList.includes(def.table));

  console.log(`📋 实际导出: ${tablesToExport.length} 个表`);
  if (excludeList.length > DEFAULT_EXCLUDE_TABLES.length) {
    console.log(`📋 已排除: ${excludeList.slice(DEFAULT_EXCLUDE_TABLES.length).join(', ')}`);
  }
  console.log(`   输出目录: ${path.relative(ROOT_DIR, outputDir)}/`);
  console.log('');

  if (tablesToExport.length === 0) {
    console.log('⚠️  没有需要导出的表');
    process.exit(0);
  }

  // 初始化 Prisma Client
  const prisma = new PrismaClient();

  console.log('🚀 开始导出 (Prisma Client 模式)');
  console.log('');

  const exportedFiles = [];
  const failedTables = [];
  const skippedTables = [];
  let totalSize = 0;

  // 逐个表导出
  for (let i = 0; i < tablesToExport.length; i++) {
    const tableDef = tablesToExport[i];
    const progress = `[${i + 1}/${tablesToExport.length}]`;

    const sqlFileName = `${tableDef.table}.sql`;
    const sqlFilePath = path.join(outputDir, sqlFileName);

    try {
      const result = await exportTable(prisma, tableDef);

      // 写入文件
      fs.writeFileSync(sqlFilePath, result.content);
      const fileSize = fs.statSync(sqlFilePath).size;
      totalSize += fileSize;
      const fileSizeKB = (fileSize / 1024).toFixed(2);

      let status, rowInfo;
      if (result.skipped) {
        status = '⏭️ ';
        rowInfo = '(not in db)';
        skippedTables.push(tableDef.table);
        fs.unlinkSync(sqlFilePath); // 删除空文件
      } else {
        exportedFiles.push(sqlFileName);
        if (result.rowCount === 0) {
          status = '✅';
          rowInfo = '(empty)';
        } else {
          status = '✅';
          rowInfo = `(${result.rowCount} rows)`;
        }
      }
      console.log(`   ${progress} ${status} ${tableDef.table.padEnd(30)} ${fileSizeKB.padStart(8)} KB ${rowInfo}`);

    } catch (error) {
      failedTables.push({ table: tableDef.table, error: error.message });
      console.log(`   ${progress} ❌ ${tableDef.table.padEnd(30)} ${error.message}`);
    }
  }

  // 关闭 Prisma Client
  await prisma.$disconnect();

  // 创建清单文件 - 扫描目录中所有SQL文件
  const manifestPath = path.join(outputDir, '_manifest.seed');
  const allSqlFiles = fs.readdirSync(outputDir)
    .filter(f => f.endsWith('.sql') && f !== '_manifest.seed')
    .sort();
  
  const manifestContent = `# Export Manifest
# Date: ${new Date().toISOString()}
# Exported Tables: ${exportedFiles.length}/${tablesToExport.length}
# Skipped Tables: ${skippedTables.length}
# Failed Tables: ${failedTables.length}
# Mode: data-only (Prisma Client)
#
# All SQL Files (${allSqlFiles.length}):
${allSqlFiles.map(f => `${f}`).join('\n')}
`;
  fs.writeFileSync(manifestPath, manifestContent);

  // 输出总结
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('📊 导出完成');
  console.log(`   成功: ${exportedFiles.length}/${tablesToExport.length} 个表`);
  if (skippedTables.length > 0) {
    console.log(`   跳过: ${skippedTables.length} 个表 (数据库中不存在)`);
  }
  console.log(`   失败: ${failedTables.length} 个表`);
  console.log(`   总大小: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`   输出目录: ${path.relative(ROOT_DIR, outputDir)}/`);
  console.log('');

  if (skippedTables.length > 0) {
    console.log('⏭️  跳过的表 (数据库中不存在):');
    skippedTables.forEach(table => {
      console.log(`   - ${table}`);
    });
    console.log('');
  }

  if (failedTables.length > 0) {
    console.log('❌ 失败的表:');
    failedTables.forEach(({ table, error }) => {
      console.log(`   - ${table}: ${error}`);
    });
    console.log('');
  }

  console.log('💡 恢复数据:');
  console.log(`   npx prisma db execute --file ${path.relative(ROOT_DIR, outputDir)}/TableName.sql`);
  console.log('');

  if (failedTables.length > 0) {
    process.exit(1);
  }
}

// 运行主函数
main().catch(error => {
  console.error(`❌ 脚本执行失败: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});

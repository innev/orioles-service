import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    });
  }
  prisma = (global as any).prisma;
}

// 兼容旧代码的 initDb 函数
export async function initDb() {
  // Prisma 是懒加载的，不需要显式初始化
  return prisma;
}

// 兼容旧代码的 query 函数
export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  // 这里需要根据具体 SQL 做映射，暂时返回空数组
  // 实际项目中应该使用 prisma.$queryRaw
  console.warn('query() is deprecated, use prisma directly:', sql);
  return [];
}

export { prisma };
export default prisma;

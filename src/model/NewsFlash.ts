import prisma from '@/lib/prisma';

export type TNewsFlashInput = {
  source: string; // wallstcn / xuangubao
  externalId: string;
  title?: string | null;
  content: string;
  codes?: string | null; // 匹配到的股票代码，逗号分隔；无匹配存 NULL
  publishedAt: Date;
};

// 批量写入快讯（按 source+externalId 唯一约束去重），返回实际插入条数
export const createNewsFlashes = async (items: TNewsFlashInput[]): Promise<number> => {
  if (items.length === 0) return 0;
  const result = await prisma.newsFlash.createMany({
    data: items.map(item => ({
      source: item.source,
      externalId: item.externalId,
      title: item.title ?? null,
      content: item.content,
      codes: item.codes ?? null,
      publishedAt: item.publishedAt
    })),
    skipDuplicates: true
  });
  return result.count;
};

// 按股票代码查询相关快讯（codes 字段 LIKE 匹配），按发布时间倒序
export const getNewsByCode = async (code: string, limit: number = 50) => {
  return prisma.newsFlash.findMany({
    where: { codes: { contains: code } },
    orderBy: { publishedAt: 'desc' },
    take: limit
  });
};

// 更新某条快讯关联的股票代码（后台补匹配用）
export const updateNewsFlashCodes = async (id: number, codes: string | null): Promise<void> => {
  await prisma.newsFlash.update({
    where: { id },
    data: { codes }
  });
};

// 获取最近未匹配到股票的快讯（可用于离线补匹配）
export const getRecentNewsWithoutCodes = async (limit: number = 200) => {
  return prisma.newsFlash.findMany({
    where: { codes: null },
    orderBy: { publishedAt: 'desc' },
    take: limit
  });
};

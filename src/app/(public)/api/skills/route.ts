import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { handleApiError } from '@/utils/api-response'
import { TDockItem } from '@/components/client/Dock';
import { groupBy } from 'lodash';

/**
 * 获取详情
 * @param {NextRequest} _ - 暂时用不上
 * @param {Object} payload
 * @property {RouteParams} [payload.param]
 */
export async function GET(_: NextRequest) {
  const prisma = new PrismaClient();

  try {
    const data: Array<TDockItem> = await prisma.skills.findMany({
      select: {
        name: true,
        url: true,
        icon: true,
        visiable: true,
        type: true,
        typeName: true
      }
    });
    return NextResponse.json({
      code: 200,
      data: groupBy(data, 'type'),
      mas: '请求成功'
    });

  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    );
  }
}
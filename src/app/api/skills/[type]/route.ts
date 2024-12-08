import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, SkillsType } from '@prisma/client';
import { handleApiError } from '@/utils/api-response'
import { getSkillsByType } from '@/service/model/skills';

/**
 * app/api 中的GET方法
 */
interface RouteParams {
  params: { type: SkillsType }
};

/**
 * 获取详情
 * @param {NextRequest} _ - 暂时用不上
 * @param {Object} payload
 * @property {RouteParams} [payload.param]
 */
export const GET = async (_: NextRequest, { params }: RouteParams) => {
  try {
    return NextResponse.json({
      code: 200,
      data: await getSkillsByType(params.type),
      mas: '请求成功'
    });

  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    );
  }
}
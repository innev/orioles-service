import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/api-response'
import { getIcons } from '@/model/Icon';

/**
 * 获取详情
 * @param {NextRequest} _ - 暂时用不上
 */
export const GET = async (_: NextRequest) => {
  try {
    return NextResponse.json({
      code: 200,
      data: await getIcons(),
      msg: '请求成功'
    });
  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    );
  }
}
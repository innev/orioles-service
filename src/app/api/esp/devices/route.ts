import { getDevices, TDevice } from '@/model/Device';
import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

/**
 * 获取详情
 * @param {NextRequest} _ - 暂时用不上
 */
export const GET = async (_: NextRequest) => {
  try {
    const data: TDevice[] = await getDevices();
    return NextResponse.json({
      code: 200,
      data,
      msg: '请求成功'
    });

  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    );
  }
}
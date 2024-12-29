import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getGrouApps } from '@/model/App';
import { getToken } from 'next-auth/jwt';

// 声明为动态路由，因为使用了外部 API 调用
export const dynamic = 'force-dynamic';

interface RouteParams {
    params: { group: string }
  };

export const GET = async (_: NextRequest, { params }: RouteParams) => {
    const session = await getToken({ req: _ });
    
    try {
        return NextResponse.json({
            code: 200,
            data: await getGrouApps(session?.id as string, params.group),
            message: '请求成功'
        });
    } catch (error) {
        return NextResponse.json(handleApiError(error), { status: error instanceof Error ? 404 : 200 });
    }
}
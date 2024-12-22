import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getVideos } from '@/model/Video';

// 声明为动态路由，因为使用了外部 API 调用
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
    try {
        return NextResponse.json({
            code: 200,
            data: await getVideos(),
            message: '请求成功'
        });
    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}
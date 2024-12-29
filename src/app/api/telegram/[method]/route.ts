import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

// 声明为动态路由，因为使用了外部 API 调用
export const dynamic = 'force-dynamic';

interface RouteParams {
    params: {
        method: string
    }
};

export const GET = async (_: NextRequest, { params }: RouteParams) => {
    const { method = 'getUpdates' } = params;
    try {
        const data = await fetch(`${process.env.TELEGRAM_BOT_API}${process.env.TELEGRAM_BOT_TOKEN}/${method}`).then(response => {
            console.debug(method, response);
            return response;
        });

        return NextResponse.json({
            code: 200,
            data,
            message: '请求成功'
        });
    } catch (error) {
        return NextResponse.json(handleApiError(error), { status: error instanceof Error ? 404 : 200 })
    }
}
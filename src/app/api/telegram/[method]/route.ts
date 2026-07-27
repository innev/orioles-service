import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 声明为动态路由，因为使用了外部 API 调用
export const dynamic = 'force-dynamic';

// 允许代理的 Telegram Bot 方法白名单（目前代码中没有调用方，仅保留 getUpdates）
const ALLOWED_METHODS: string[] = ['getUpdates'];

interface RouteParams {
    params: {
        method: string
    }
};

export const GET = async (_: NextRequest, { params }: RouteParams) => {
    const session = await getToken({ req: _ });
    if (!session) {
        return NextResponse.json({ code: 401, data: null, message: '请先登录' }, { status: 401 });
    }

    const { method = 'getUpdates' } = params;
    if (!ALLOWED_METHODS.includes(method)) {
        return NextResponse.json({ code: 403, data: null, message: '不允许调用的方法' }, { status: 403 });
    }

    try {
        const data = await fetch(`${process.env.TELEGRAM_BOT_API}${process.env.TELEGRAM_BOT_TOKEN}/${method}`).then(response => {
            return response.json();
        }).then(response => {
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
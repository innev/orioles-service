import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

// 声明为动态路由，因为使用了外部 API 调用
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
    try {
        const data = await fetch(`${process.env.TELEGRAM_BOT_API}${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`).then(response => {
            console.debug("getUpdates:", response);
            // const updates = response.data.result;
            // if (updates.length > 0) {
            //     const chatId = updates[0].message.chat.id;
            //     console.log('Group ID:', chatId);
            // } else {
            //     console.log('No messages received.');
            // }
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
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getStocks } from '@/model/Stock';

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
    try {
        return NextResponse.json({
            code: 200,
            data: await getStocks(),
            message: '请求成功'
        });
    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getApps } from '@/model/App';

export const GET = async (_: NextRequest) => {
    try {
        const response = NextResponse.json({
            code: 200,
            data: await getApps(),
            message: '请求成功'
        });

        const cacheParams = 'private, no-store';
    response.headers.set('Cache-Control', cacheParams);
    response.headers.set('CDN-Cache-Control', cacheParams);
    response.headers.set('Vercel-CDN-Cache-Control', cacheParams);
    return response;
    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}
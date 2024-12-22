import { NextRequest, NextResponse } from "next/server";

// 声明为动态路由，因为使用了外部 API 调用
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
    try {
        // 验证环境变量
        if (!process.env.PROXY_API) {
            throw new Error('PROXY_API environment variable is not defined');
        }

        const resp = await fetch(`${process.env.PROXY_API}/api/etf`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*'
            }
        });

        if (!resp.ok) {
            throw new Error(`API request failed with status ${resp.status}`);
        }

        const data = await resp.json();

        return NextResponse.json({
            code: 200,
            data,
            msg: 'success'
        });

    } catch (error) {
        return NextResponse.json({
            code: 500,
            data: null,
            msg: error instanceof Error ? error.message : 'Internal Server Error'
        }, {  status: 500 });
    }
}
import { hashPassword, saltRandom } from '@/lib/hashPassword';
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
    const { pass = '' } = Object.fromEntries(_.nextUrl.searchParams.entries());

    try {
        const passwordSalt: number = saltRandom();
        const password: string = hashPassword(pass, passwordSalt.toString());

        return NextResponse.json({
            code: 200,
            data: { password, passwordSalt },
            msg: '请求成功'
        });

    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}
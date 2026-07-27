import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { getOtps } from '@/model/OneTimePassword';
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authenticator } from 'otplib';

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

/**
 * app/api 中的GET方法
 */
export const GET = async (_: NextRequest) => {
    // 鉴权：2FA 动态码属于敏感数据，未登录一律拒绝
    const session = await getToken({ req: _ });
    if (!session) {
        return NextResponse.json({ code: 401, data: null, msg: '未登录' }, { status: 401 });
    }
    // 从 URL 获取查询参数
    const searchParams = _.nextUrl.searchParams;
    const pageIndex: number = parseInt(searchParams.get('pageIndex') || '0');
    const pageSize: number = parseInt(searchParams.get('pageSize') || '10');

    try {
        const timeRemaining = authenticator.timeRemaining();
        const data: Array<DAuth> = await getOtps().then(secrets => secrets.map(({ name, email, otp }) => ({
            name,
            email,
            timeRemaining,
            code: authenticator.generate(otp)
        })));
        return NextResponse.json({
            code: 200,
            data: { data, timeRemaining },
            msg: '请求成功'
        });

    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}
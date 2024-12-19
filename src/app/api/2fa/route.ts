import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { getOtps } from '@/model/OneTimePassword';
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';

/**
 * 这是pages/api中的方法，在app/api中用不上
 */
/*
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const timeRemaining = authenticator.timeRemaining();
    const data: Array<DAuth> = [];
    for(const name in secrets) {
        data.push({
            name, timeRemaining,
            code: authenticator.generate(secrets[name] as string)
        });
    }

    res.status(200).json({
        code: 200,
        size: data.length,
        data: data.slice(0, (Number(req.query.pageIndex) + 1) * Number(req.query.pageSize)),
        msg: '请求成功'  
    });
};
*/

/**
 * app/api 中的GET方法
 */
export async function GET(request: NextRequest) {
    // 从 URL 获取查询参数
    const searchParams = request.nextUrl.searchParams;
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
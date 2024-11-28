import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';

const secrets: { [key: string]: string | { [key: string]: string } } = JSON.parse(process.env.SECRETS||'');

/**
 * app/api 中的GET方法
 */
interface RouteParams {
    params: { email: string }
};

/**
 * 获取详情
 * @param {NextRequest} _ - 暂时用不上
 * @param {Object} payload
 * @property {RouteParams} [payload.param]
 */
export async function GET(_: NextRequest, { params }: RouteParams) {
    try {
        const timeRemaining = authenticator.timeRemaining();
        let data: DAuth = { name: '', timeRemaining: 0, code: ''};
        for (const name in secrets) {
            if(name.includes(params.email)) {
                data = {
                    name, timeRemaining,
                    code: authenticator.generate(secrets[name] as string)
                };
                break;
            }
        }
        return NextResponse.json({ code: 200, data, mas: '请求成功'});

    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}

/**
 * 更新
 * @param {NextRequest} request
 * @param {Object} payload
 * @property {RouteParams} [payload.param]
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true, data: body })
  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 400 : 200 }
    )
  }
}

/**
 * 删除
 * @param {NextRequest} _ - 暂时用不上
 * @param {Object} payload
 * @property {RouteParams} [payload.param]
 */
export async function DELETE(_: NextRequest, { params }: RouteParams) {
  try {
    console.debug("删除的Email:", params.email);
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    )
  }
}
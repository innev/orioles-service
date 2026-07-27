import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { getOtpByEmail } from '@/model/OneTimePassword';
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authenticator } from 'otplib';

/**
 * app/api 中的GET方法
 */
interface RouteParams {
  params: { email: string }
};

// 鉴权：2FA 动态码属于敏感数据，未登录一律拒绝
const requireAuth = async (req: NextRequest) => {
  const session = await getToken({ req });
  return session ? null : NextResponse.json({ code: 401, data: null, msg: '未登录' }, { status: 401 });
}

/**
 * 获取详情
 * @param {NextRequest} _ - 暂时用不上
 * @param {Object} payload
 * @property {RouteParams} [payload.param]
 */
export const GET = async (_: NextRequest, { params }: RouteParams) => {
  const unauthorized = await requireAuth(_);
  if (unauthorized) return unauthorized;
  try {
    const timeRemaining = authenticator.timeRemaining();
    const data: DAuth = await getOtpByEmail(params.email).then(secret => {
      if (secret && secret?.email === params.email) {
        return {
          name: secret.name,
          email: secret.email,
          timeRemaining,
          code: authenticator.generate(secret.otp)
        };
      } else {
        return {
          name: '',
          email: '',
          timeRemaining,
          code: ''
        }
      }
    });
    return NextResponse.json({ code: 200, data, msg: '请求成功' });

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
export const PATCH = async (request: NextRequest, { params }: RouteParams) => {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
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
export const DELETE = async (_: NextRequest, { params }: RouteParams) => {
  const unauthorized = await requireAuth(_);
  if (unauthorized) return unauthorized;
  try {
    return NextResponse.json({ success: true, code: 200 })
  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    )
  }
}
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 声明为动态路由，避免凭证响应被缓存
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
  // 鉴权：该接口返回云账号凭证，未登录一律拒绝
  const session = await getToken({ req: _ });
  if (!session) {
    return NextResponse.json({ code: 401, data: null, msg: '未登录' }, { status: 401 });
  }
  try {
    const data = {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      region: process.env.ALIYUN_REGION,
      bucket: process.env.ALIYUN_BUCKET,
      // stsToken: stsToken
    };
    return NextResponse.json({
      code: 200,
      data,
      msg: '请求成功'
    });

  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    )
  }
}
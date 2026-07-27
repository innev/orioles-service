import genSignatureUrl from "@/utils/fyunSignature";
import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest) => {
  const session = await getToken({ req: _ });
  if (!session) {
    return NextResponse.json({ code: 401, data: null, msg: '请先登录后再使用语音功能' }, { status: 401 });
  }

  try {
    const { type = 'ise' } = Object.fromEntries(_.nextUrl.searchParams.entries());
    const tokenUrl = genSignatureUrl({
      type: type as string,
      apiKey: process.env.FYUN_API_KEY || '',
      apiSecret: process.env.FYUN_API_SECRET || ''
    });
    return NextResponse.json({
      code: 200,
      msg: '请求成功',
      data: {
        url: tokenUrl,
        appID: process.env.FYUN_APP_ID
      }
    });
  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    )
  }
}
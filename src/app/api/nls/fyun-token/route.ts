import genSignatureUrl from "@/utils/fyunSignature";
import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest) => {
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
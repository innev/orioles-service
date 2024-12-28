import genSignatureUrl, { TokenResponse } from "@/utils/aliSignature";
import { handleApiError } from '@/utils/api-response';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest) => {
  try {
    const tokenUrl = genSignatureUrl({
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || ''
    });

    const response = await fetch(tokenUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    const { ok, status, statusText } = response;
    if (ok && (status === 204 || statusText === 'No Content'))  new Error('No Content');

    const { ErrMsg, Token } = await response.json() as TokenResponse;
    if (!ErrMsg || ErrMsg == '') {
      // return NextResponse.json({
      //   code: 200,
      //   msg: '请求成功',
      //   data: {
      //     url: process.env.ALIYUN_NLS_URI,
      //     token: Token.Id,
      //     appkey: process.env.ALIYUN_NLS_APPKEY
      //   }
      // });
      return NextResponse.json({
        url: process.env.ALIYUN_NLS_URI,
        token: Token.Id,
        appkey: process.env.ALIYUN_NLS_APPKEY
      });
    } else {
      return NextResponse.json(ErrMsg, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    )
  }
}
import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest) => {
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
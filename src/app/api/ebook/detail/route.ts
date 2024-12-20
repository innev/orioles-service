import alioss from '@/utils/alioss';
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/api-response';

const CDN_HOST: string = process.env.CDN_HOST || '';
interface RouteParams {
  params: { id: string, origin: string };
};

export const GET = async (_: NextRequest, { params }: RouteParams) => {
  try {
    const { id } = Object.fromEntries(_.nextUrl.searchParams.entries());

    const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
    const basePath: string = `${CDN_HOST}/${prefix}${id}`;

    const data = await fetch(`${basePath}/index.json`).then(data => data.json());
    data.cover = `${data.path}/${data.cover}`;

    return NextResponse.json({
      code: 200,
      data,
      msg: '请求成功'
    });

  } catch (error) {
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    );
  }
};
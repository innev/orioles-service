import alioss from '@/utils/alioss';
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/api-response';
import { join } from 'path';

const CDN_HOST: string = process.env.CDN_HOST + '/';

interface RouteParams {
  params: { id: string, origin: string };
};

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

export const GET = async (_: NextRequest, { params }: RouteParams) => {
  try {
    const { id = '' } = Object.fromEntries(_.nextUrl.searchParams.entries());

    const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
    const _path: string = join(prefix, id);
    const data = await fetch(CDN_HOST + join(_path, 'index.json'))
      .then(data => data.json())
      .then(item => item ? { ...item, path: CDN_HOST + _path, cover: CDN_HOST + join(_path, item.cover) } : {});

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
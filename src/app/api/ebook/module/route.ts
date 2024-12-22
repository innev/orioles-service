import { DBook } from '@/templates/interfaces/IBook';
import { DModule } from '@/templates/interfaces/IModule';
import alioss from '@/utils/alioss';
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/api-response';
import { join } from 'path';

const CDN_HOST: string = process.env.CDN_HOST + '/';

export const GET = async (_: NextRequest) => {
    try {
        const { id = '', module, origin = 'cloud' } = Object.fromEntries(_.nextUrl.searchParams.entries());
        const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
        const _path: string = join(prefix, id);
        const bookData: DBook = await fetch(CDN_HOST + join(_path, 'index.json')).then(data => data.json());
        const data: DModule | undefined = bookData.modules.find(mod => mod.id === module);
        if (data?.chapter) {
            data.chapter = data.chapter.map(item => ({ ...item, src: CDN_HOST + join(_path, item?.src||'') }));
        }
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
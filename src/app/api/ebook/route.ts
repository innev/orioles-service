import { DBook } from '@/templates/interfaces/IBook';
import alioss, { DListObjectResult } from '@/utils/alioss';
import OSS from 'ali-oss';
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/api-response';
import path from 'path';

const CDN_HOST: string = process.env.CDN_HOST || '';

const bookListParse = async (result: DListObjectResult): Promise<Array<DBook>> => {
    return Promise.all(result?.prefixes?.map(async (name: string) => {
        const _path = path.join(CDN_HOST, name);
        return fetch(path.join(_path, 'index.json'))
            .then(data => data.json())
            // .then(item => item ? { ...item, path: _path, cover: path.join(_path, item.cover) } : {});
    })).catch(err => {
        console.error("bookListParse:", err);
        return [];
    });
};

export const GET = async (_: NextRequest) => {
    try {
        const client = new OSS({
            accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID as string,
            accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET as string,
            region: process.env.ALIYUN_REGION,
            bucket: process.env.ALIYUN_BUCKET,
        });

        const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
        const data: Array<DBook> = await client.list({ delimiter: '/', prefix, "max-keys": 1000 }, {})
            .then(bookListParse)
            .then(data => data.filter(({ type }) => type !== "demo"))
            .catch(err => {
                console.error(err);
                return [];
            });
            
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
import { DBook } from '@/templates/interfaces/IBook';
import alioss, { DListObjectResult } from '@/utils/alioss';
import OSS from 'ali-oss';
import qiniu, { httpc } from 'qiniu';
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/api-response';
import { join } from 'node:path';
import { GetObjectsResult } from 'qiniu/StorageResponseInterface';

const CDN_HOST: string = process.env.CDN_HOST + '/';

// 定义枚举类型
export enum OSSOrigin {
    ALIYUN = "aliyun",
    QUNIU = "qiniu"
  }

interface RouteParams {
    params: { origin: OSSOrigin }
};

const getClient = (origin: OSSOrigin = OSSOrigin.QUNIU): OSS | qiniu.rs.BucketManager => {
    if (origin === OSSOrigin.QUNIU) {
        let mac = new qiniu.auth.digest.Mac(process.env.QINIU_ACCESS_KEY, process.env.QINIU_SECRET_KEY);
        let config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z2;
        return new qiniu.rs.BucketManager(mac, config);
    } else {
        return new OSS({
            accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID as string,
            accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET as string,
            region: process.env.ALIYUN_REGION,
            bucket: process.env.ALIYUN_BUCKET,
        });
    }
};

const ossListParse = async (result: DListObjectResult): Promise<Array<DBook>> => {
    return Promise.all(result?.prefixes?.map(async (_path: string) => {
        return fetch(CDN_HOST + join(_path, 'index.json'))
            .then(data => data.json())
            .then(item => item ? { ...item, path: CDN_HOST + _path, cover: CDN_HOST + join(_path, item.cover) } : {});
    })).catch(err => {
        console.error("ossListParse:", err);
        return [];
    });
};

const qiniuListParse = async ({ data, resp }: httpc.ResponseWrapper<GetObjectsResult>): Promise<Array<DBook>> => {
    if(resp.statusCode !== 200 || !data?.commonPrefixes) return [];

    return Promise.all(data?.commonPrefixes?.map(async (_path: string) => {
        return fetch(CDN_HOST + join(_path, 'index.json'))
            .then(data => data.json())
            .then(item => item ? { ...item, path: CDN_HOST + _path, cover: CDN_HOST + join(_path, item.cover) } : {});
    })).catch(err => {
        console.error("qiniuListParse:", err);
        return [];
    });
};

export const GET = async (_: NextRequest, { params }: RouteParams) => {
    try {
        const client = getClient(params.origin);
        const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });

        let data: Array<DBook> = [];
        if (params.origin === OSSOrigin.QUNIU) {
            data = await (client as qiniu.rs.BucketManager).listPrefix(process.env.QINIU_BUCKET||'', { delimiter: '/', prefix, marker: '', limit: 1000 })
                .then(qiniuListParse)
                .catch(err => {
                    console.error(err);
                    return [];
                });
        } else {
            data = await (client as OSS).list({ delimiter: '/', prefix, "max-keys": 1000 }, {})
                .then(ossListParse)
                .catch(err => {
                    console.error(err);
                    return [];
                });
        }

        data = data.filter(({ type }) => type !== "demo");
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
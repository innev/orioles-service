import { DBook } from '@/templates/interfaces/IBook';
import alioss, { DListObjectResult } from '@/utils/alioss';
import OSS from 'ali-oss';
import { NextApiRequest, NextApiResponse } from 'next';

const CDN_HOST: string = process.env.CDN_HOST || '';

const bookListParse = (result: DListObjectResult): Promise<Array<DBook>> => {
  const tasks: Array<Promise<DBook>> = result?.prefixes?.map((name: string) => {
    return fetch(`${CDN_HOST}/${name}index.json`).then(data => data.json());
  }) || [];
  return Promise.all(tasks);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = new OSS({
        accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID as string,
        accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET as string,
        region: process.env.ALIYUN_REGION,
        bucket: process.env.ALIYUN_BUCKET,
    });
    const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
    const dataList: Array<DBook> = await client.list({ delimiter: '/', prefix, "max-keys": 1000 }, {}).then(bookListParse);
    
    const data: Array<DBook> = [];
    dataList.forEach(({ cover, path, type, ...other }: DBook) => {
        if(type != "demo") {
            data.push({ cover: `${path}/${cover}`, type, path, ...other });
        }
    });

    res.status(200).json({
        code: 200,
        data: data,
        msg: '请求成功'  
    });
};
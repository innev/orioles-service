import alioss from '@/utils/alioss';
import { NextApiRequest, NextApiResponse } from 'next';

const CDN_HOST: string = process.env.CDN_HOST as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
    const basePath: string = `${CDN_HOST}/${prefix}${id}`;

    const data = await fetch(`${basePath}/index.json`).then(data => data.json());
    data.cover = `${data.path}/${data.cover}`;

    res.status(200).json({
        code: 200,
        data,
        msg: '请求成功'  
    });
};
import { DBook } from '@/templates/interfaces/IBook';
import { DModule } from '@/templates/interfaces/IModule';
import alioss from '@/utils/alioss';
import { NextApiRequest, NextApiResponse } from 'next';

const CDN_HOST: string = process.env.CDN_HOST as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, module, origin = 'cloud' } = req.query;
    const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
    const basePath: string = `${CDN_HOST}/${prefix}${id}`;
    
    const bookData: DBook = await fetch(`${basePath}/index.json`).then(data => data.json());
    const data: DModule | undefined = bookData.modules.find(mod => mod.id === module);
    if(data?.chapter) {
        data.chapter = data.chapter.map(({ src, ...other}) => ({ src: `${bookData.path}/${src}`, ...other }));
    }
    
    res.status(200).json({
        code: 200,
        data,
        msg: '请求成功'  
    });
};
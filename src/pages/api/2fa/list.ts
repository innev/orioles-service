import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticator } from 'otplib';

const secrets: { [key: string]: string | { [key: string]: string } } = JSON.parse(process.env.SECRETS||'');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const timeRemaining = authenticator.timeRemaining();
    const data: Array<DAuth> = [];
    for(const name in secrets) {
        data.push({
            name, timeRemaining,
            code: authenticator.generate(secrets[name] as string)
        });
    }

    res.status(200).json({
        code: 200,
        size: data.length,
        data: data.slice(0, (Number(req.query.pageIndex) + 1) * Number(req.query.pageSize)),
        mas: '请求成功'  
    });
};
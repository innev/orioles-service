import genSignatureUrl from "@/utils/fyunSignature";
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type = 'ise' } = req.query;
  const tokenUrl = genSignatureUrl({
    type: type as string,
    apiKey: process.env.FYUN_API_KEY || '',
    apiSecret: process.env.FYUN_API_SECRET || ''
  });

  return res.status(200).json({
    code: 200,
    mas: '请求成功',
    data: {
      url: tokenUrl,
      appID: process.env.FYUN_APP_ID
    }
  });
};

export default handler;
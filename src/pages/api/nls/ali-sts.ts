import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    code: 200,
    mas: '请求成功',
    data: {
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      region: process.env.ALIYUN_REGION,
      bucket: process.env.ALIYUN_BUCKET,
      // stsToken: stsToken
    }
  });
};

export default handler;
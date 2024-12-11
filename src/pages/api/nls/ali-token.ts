import genSignatureUrl, { TokenResponse } from "@/utils/aliSignature";
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokenUrl = genSignatureUrl({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || ''
  });

  const response = await fetch(tokenUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    }
  });

  const { ok, status, statusText } = response;
  if (ok && (status === 204 || statusText === 'No Content')) {
    throw new Error('No Content');
  }

  const { ErrMsg, Token } = await response.json() as TokenResponse;
  if (!ErrMsg || ErrMsg == '') {
    return res.status(200).json({
      code: 200,
      msg: '请求成功',
      data: {
        url: process.env.ALIYUN_NLS_URI,
        token: Token.Id,
        appkey: process.env.ALIYUN_NLS_APPKEY
      }
    });
  } else {
    return res.status(400).send(ErrMsg);
  }
};

export default handler;
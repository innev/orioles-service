import { transcriptions } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // 禁用内置的 bodyParser
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let buffers: Buffer[] = [];
  req.on('data', (chunk: Buffer) => {
    buffers.push(chunk);
  });

  req.on('end', async () => {
    const base64Data: string = Buffer.concat(buffers).toString('base64');
    const { duration, data } = await transcriptions(base64Data);
    // console.debug("base64Data:", base64Data);
    
    res.status(200).json({ duration, data });
  });
};
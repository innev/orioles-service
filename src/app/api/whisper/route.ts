import { NextRequest, NextResponse } from 'next/server';
import { transcriptions } from '@/utils';
import { handleApiError } from '@/utils/api-response';

// export const config = {
//   api: {
//     bodyParser: false, // 禁用内置的 bodyParser
//   },
// }

export const POST = async (req: NextRequest) => {
  const buffers = await req.arrayBuffer();
  const base64Data = Buffer.from(buffers).toString('base64');

  try {
    const { duration, data } = await transcriptions(base64Data);
    return NextResponse.json({ duration, data });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      handleApiError(error),
      { status: error instanceof Error ? 404 : 200 }
    )
  }
}
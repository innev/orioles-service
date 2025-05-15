import { NextRequest, NextResponse } from 'next/server';
import { getSignature, decrypt, encrypt, getJsApiSignature } from '@wecom/crypto';
import { Parser } from 'xml2js';

const token = process.env.QYWEIXIN_TOKEN;
const encodingAESKey = process.env.QYWEIXIN_ENCODING_AESKEY;
const corpId = process.env.QYWEIXIN_CORPID;

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!token || !encodingAESKey || !corpId) throw new Error('Missing required environment variables for WXBizMsgCrypt');

  try {
    // 解析URL参数[11,12](@ref)
    const url = new URL(request.url);
    const params = {
      msg_signature: url.searchParams.get('msg_signature'),
      timestamp: url.searchParams.get('timestamp'),
      nonce: url.searchParams.get('nonce'),
      echostr: url.searchParams.get('echostr')
    };

    const signature = getSignature(token, params.timestamp||0, params.nonce||'', params.echostr||'');
    if(signature != params.msg_signature) throw new Error('Missing required environment variables for WXBizMsgCrypt');

    const { message, id } = decrypt(encodingAESKey, params.echostr||'');
    console.log({ message, id });
    return new NextResponse(message, {
      headers: { 'Content-Type': 'text/plain' },
      status: 200
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 400 }
    );
  }
}


export async function POST(request: NextRequest) {
  if (!token || !encodingAESKey || !corpId) throw new Error('Missing required environment variables for WXBizMsgCrypt');

  try {
    const url = new URL(request.url);
    const params = {
      msg_signature: url.searchParams.get('msg_signature'),
      timestamp: url.searchParams.get('timestamp'),
      nonce: url.searchParams.get('nonce')
    };
    
    const rawBody = await request.text();
    const { message: xmlContent, id } = decrypt(encodingAESKey, rawBody);
    const parsedMsg = await parseXML(xmlContent);

    console.log('Received message:', parsedMsg);

    return new NextResponse('success', {
      headers: { 'Content-Type': 'text/plain' },
      status: 200
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Message processing failed' },
      { status: 500 }
    );
  }
}

async function parseXML(xml: string) {
  const parser = new Parser({
    attrNameProcessors: [(name: string) => `@${name}`]
  });
  return await parser.parseStringPromise(xml); // 推荐使用 promise 风格方法
}
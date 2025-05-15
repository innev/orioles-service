import { NextRequest, NextResponse } from 'next/server';
import { WXBizMsgCrypt } from 'wechat-crypto';
import { Parser } from 'xml2js';

const token = process.env.QYWEIXIN_TOKEN;
const aesKey = process.env.QYWEIXIN_ENCODING_AESKEY;
const corpId = process.env.QYWEIXIN_CORPID;

// 声明为动态路由，这样可以使用 searchParams
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!token || !aesKey || !corpId) throw new Error('Missing required environment variables for WXBizMsgCrypt');

  try {
    // 解析URL参数[11,12](@ref)
    const url = new URL(request.url);
    const params = {
      msg_signature: url.searchParams.get('msg_signature'),
      timestamp: url.searchParams.get('timestamp'),
      nonce: url.searchParams.get('nonce'),
      echostr: url.searchParams.get('echostr')
    };

    // 创建加密对象[12](@ref)
    const cryptor = new WXBizMsgCrypt(token, aesKey, corpId);
    
    // 验证签名并解密[11](@ref)
    const decryptedMsg = cryptor.decrypt(params.echostr!);
    const echostr = decryptedMsg.message;

    // 返回明文响应（不带引号）[12](@ref)
    return new NextResponse(echostr, {
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
  if (!token || !aesKey || !corpId) throw new Error('Missing required environment variables for WXBizMsgCrypt');

  try {
    // 获取请求参数[11,12](@ref)
    const url = new URL(request.url);
    const params = {
      msg_signature: url.searchParams.get('msg_signature'),
      timestamp: url.searchParams.get('timestamp'),
      nonce: url.searchParams.get('nonce')
    };

    // 读取XML格式请求体[12](@ref)
    const rawBody = await request.text();
    const cryptor = new WXBizMsgCrypt(token, aesKey, corpId);

    // 解密消息内容[11](@ref)
    const decryptedMsg = cryptor.decrypt(rawBody);
    const xmlContent = decryptedMsg.message;

    // 解析XML消息（需安装xml2js等库）
    const parsedMsg = await parseXML(xmlContent);
    
    // 业务处理逻辑
    console.log('Received message:', parsedMsg);

    // 返回success响应[12](@ref)
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
import { NextRequest, NextResponse } from 'next/server';
import { Client } from "@gradio/client";
const space: string = process.env.WHISPER_API_PATH || "https://abidlabs-whisper.hf.space";

export const POST = async (request: NextRequest) => {
  if (!request.body) {
    return NextResponse.json({ error: '没有提供音频数据' }, { status: 400 });
  }

  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('audio/')) {
      return NextResponse.json({ error: '无效的内容类型' }, { status: 400 });
    }

    // 获取音频数据
    const audioData = await request.arrayBuffer();
    const buffer = Buffer.from(audioData);

    const client = await Client.connect(space);
    const { type, time, data, endpoint, fn_index } = await client.predict("/predict", { audio: buffer });

    // 返回模拟的识别结果
    return NextResponse.json({
      data: Array.isArray(data) ? data.map(val => val.replace("AutomaticSpeechRecognitionOutput(text='", "").replace("', chunks=None)", "")).join(",") : data,
      duration: buffer.length / 16000
    });

  } catch (error) {
    console.error('处理音频时出错:', error);
    return NextResponse.json({ error: '音频处理失败' }, { status: 500 });
  }
}
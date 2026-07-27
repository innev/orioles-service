/**
 * 讯飞语音 websocket 签名 URL 获取。
 * 签名在服务端完成（/api/nls/fyun-token），前端不再持有 API_KEY / API_SECRET。
 * APPID 本身非密钥（建立连接后会随业务参数明文发送），保留在前端用于构造业务参数。
 */
export const APPID: string = '641228cb';

interface IFyunTokenResp {
  code: number,
  data?: {
    url: string,
    appID?: string
  },
  msg?: string
};

/**
 * 获取websocket url（服务端签名）
 */
export const getWebSocketUrl = async (type: string): Promise<string> => {
  const resp: IFyunTokenResp = await fetch(`/api/nls/fyun-token?type=${encodeURIComponent(type)}`)
    .then(res => res.json());
  if (resp.code !== 200 || !resp.data?.url) {
    // 401 时后端会返回提示信息（如未登录），优先透传
    throw new Error(resp.msg || '获取讯飞签名URL失败');
  }
  return resp.data.url;
};

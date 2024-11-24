import CryptoJS from 'crypto-js';

const API_SECRET = 'MjAzZjcyMTQ3ODhhZmIxYmI3ZDEzZjRj';
const API_KEY = 'f85706f0112784f1d25396adff45ba69';

interface IUrlInfo {
  url: string,
  host: string,
  origin: string,
};

const socketUrlList: { [key: string]: IUrlInfo } = {
  ise: {
    url: 'wss://ise-api.xfyun.cn/v2/open-ise',
    host: 'ise-api.xfyun.cn',
    origin: 'open-ise',
  },
  tts: {
    url: 'wss://tts-api.xfyun.cn/v2/tts',
    host: 'tts-api.xfyun.cn',
    origin: 'tts',
  },
  iat: {
    url: 'wss://iat-api.xfyun.cn/v2/iat',
    host: 'iat-api.xfyun.cn',
    origin: 'iat',
  }
};

export const APPID: string = '641228cb';

/**
 * 获取websocket url
 */
export const getWebSocketUrl = (type: string): Promise<string> => new Promise((resolve, reject) => {
  // 请求地址根据语种不同变化
  const apiKey: string = API_KEY;
  const apiSecret: string = API_SECRET;
  // const date: string = new Date().toGMTString();
  const date: string = new Date().toUTCString();
  const algorithm: string = 'hmac-sha256';
  const headers: string = 'host date request-line';
  const signatureOrigin: string = `host: ${socketUrlList[type]?.host}\ndate: ${date}\nGET /v2/${socketUrlList[type]?.origin} HTTP/1.1`;
  const signatureSha: CryptoJS.lib.WordArray = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  const signature: string = CryptoJS.enc.Base64.stringify(signatureSha);
  const authorizationOrigin: string = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  const authorization: string = btoa(authorizationOrigin);
  const url: string = `${socketUrlList[type]?.url}?authorization=${authorization}&date=${date}&host=${socketUrlList[type]?.host}`;
  resolve(url);
});
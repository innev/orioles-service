import CryptoJS from 'crypto-js';

interface IUrl {
    url: string,
    host: string,
    origin: string
};

const socketUrlList: { [key: string]: IUrl } = {
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

export interface ISignature {
    type: string,
    apiKey: string,
    apiSecret: string,
    appID?: string
}

const genSignatureUrl = ({ type = 'ise', apiKey, apiSecret, appID = '' }: ISignature): string => {

    const tokenUrl: IUrl | undefined = socketUrlList[type];

    // 请求地址根据语种不同变化
    // const date: string = new Date().toGMTString();
    const date: string = new Date().toUTCString();
    const algorithm: string = 'hmac-sha256';
    const headers: string = 'host date request-line';
    const signatureOrigin: string = `host: ${tokenUrl?.host}\ndate: ${date}\nGET /v2/${tokenUrl?.origin} HTTP/1.1`;
    const signatureSha: CryptoJS.lib.WordArray = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    const signature: string = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin: string = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization: string = btoa(authorizationOrigin);

    return tokenUrl?.url + `?authorization=${authorization}&date=${date}&host=${tokenUrl?.host}`;
};

export default genSignatureUrl;
export interface ISignature {
    accessKeyId: string,
    accessKeySecret: string,
    endpoint?: string
}

export interface TokenResponse {
    ErrMsg: string,
    Token: {
        UserId: string,
        Id: string,
        ExpireTime: string
    }
}

const genSignatureUrl = ({ accessKeyId, accessKeySecret, endpoint = '' }: ISignature): string => {
    const tokenUrl: string = endpoint || process.env.ALIYUN_NLS_TOKEN_URI || '';
    // 构造请求参数
    const query = new URLSearchParams({
        AccessKeyId: accessKeyId,
        Action: 'CreateToken',
        Format: 'JSON',
        RegionId: 'cn-shenzhen',
        SignatureMethod: 'HMAC-SHA1',
        SignatureNonce: Math.random().toString(36).substr(2, 15),
        SignatureVersion: '1.0',
        Timestamp: new Date().toISOString(),
        Version: '2019-02-28'
    });

    // 计算签名
    const hmac = require('crypto').createHmac('sha1', accessKeySecret + '&');
    hmac.update('GET&%2F&' + encodeURIComponent(query.toString()));
    const signature = hmac.digest('base64');

    // 发送请求
    return tokenUrl + '/?Signature=' + encodeURIComponent(signature) + '&' + query.toString();
};

export default genSignatureUrl;
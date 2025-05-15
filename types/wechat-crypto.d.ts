// wechat-crypto.d.ts
declare module 'wechat-crypto' {
  class WXBizMsgCrypt {
    constructor(token: string, encodingAESKey: string, corpId: string);

    decrypt(encryptedMsg: string): {
      message: string;
      ret: number;
    };
  }

  export { WXBizMsgCrypt };
}
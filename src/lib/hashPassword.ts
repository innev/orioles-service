// 'use strict';

// const crypto = require('crypto');
import CryptoJS from 'crypto-js';

export const hashPassword = (password: string | null, passwordSalt: string | null): string => {
    if(!password || !passwordSalt) return '';

    const signatureSha: CryptoJS.lib.WordArray = CryptoJS.HmacSHA256(password, passwordSalt);
    const signature: string = CryptoJS.enc.Base64.stringify(signatureSha);
    return signature;

    // const hash = crypto.createHash('sha256');
    // hash.update(password);
    // hash.update(passwordSalt+'');

    // return hash.digest('base64');
};

export const saltRandom = (): number => parseInt(((Math.random() + 0.1) * 51774807).toString());

export const compare = (password: string, userInfo: { password: string | null, passwordSalt: string | null }): boolean => {
    return userInfo.password === hashPassword(password, userInfo.passwordSalt);
};
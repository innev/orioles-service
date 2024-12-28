import { get, TOKEN } from "./localData";

/**
 * @desc 运行环境获取
 * @return {String}
 */
const getEnv = (): string => {
    if (global) {
        return 'react-native'
    }
    // if (window) {
    //   return 'web'
    // }
    return 'web';
};

export type InstanceOptions = {
    localStoreKey?: string,
    token?: string
};

/**
* 获取令牌
* @returns {String}
*/
export const getToken = (insOpts?: InstanceOptions): string => {
    const { token = '', localStoreKey = '' } = insOpts || {};
    if (token && token !== '') return token;

    const endpoint = getEnv();
    let _token = '';
    if (endpoint === 'web') {
        _token = get(`${localStoreKey}.${TOKEN}`);
    } else if (endpoint === 'react-native') {
        // 注释对移动端的支持
        // let tokenStr = global.AsyncStorage.getItem(`${localStoreKey}.${TOKEN}`);
        // _token = JSON.parse(tokenStr).rawData;
        return _token;
    }
    return _token;
}

export const resolve = (uri: string, host?: string): string => {
    if (host && uri.indexOf('http') === -1) {
        const [protocol, baseHost] = host.split("://");
        if (protocol && baseHost && protocol != "undefined" && baseHost != "undefined") {
            return protocol + "://" + (`${baseHost}/${uri}`.replace('//', '/'));
        } else {
            return uri.replace('//', '/');
        }
    } else {
        return uri.replace('//', '/');
    }
};

/**
/**
 * @returns {RequestInit}
 */
export const mergeHeaders = ({ headers = {}, ...other }): RequestInit => {
    return {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            ...headers
        },
        ...other
    };
};
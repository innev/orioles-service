import { HOST_URL } from '@/utils/hostUrl';
import queryString from 'query-string';
import { getToken, InstanceOptions, mergeHeaders, resolve } from './helper';

export const get_ = async (uri: string, query?: any, insOpts?: InstanceOptions): Promise<any> => {
    const token = getToken(insOpts);
    if (query) {
        uri = queryString.stringifyUrl({ url: uri, query });
        uri = decodeURIComponent(uri);
    }

    const opts = mergeHeaders({
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {})
    });

    const response = await fetch(resolve(uri, HOST_URL), opts);
    const { ok, status, statusText } = response;
    if (ok && (status === 204 || statusText === 'No Content')) {
        throw new Error('No Content');
    }
    return await response.json();
};

export const post_ = async (uri: string, payload: object, insOpts?: InstanceOptions): Promise<Response> => {
    const token = getToken(insOpts);
    const opts = mergeHeaders({
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        ...(payload instanceof Blob ? {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Length': payload.size
            }
        } : {}),
        ...(payload instanceof ArrayBuffer ? {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Length': payload.byteLength
            }
        } : {}),
        method: 'POST'
    });
    if (payload instanceof Blob) {
        // const formData = new FormData();
        // formData.append('audio', payload, 'recording.wav');
        opts.body = payload;
    } else if (payload instanceof ArrayBuffer) {
        opts.body = payload;
    } else {
        opts.body = JSON.stringify(payload);
    }

    const response = await fetch(resolve(uri, HOST_URL), opts);
    const { ok, status, statusText } = response;
    if (ok && (status === 204 || statusText === 'No Content')) {
        throw new Error('No Content');
    }

    return response
};

export const put_ = async (uri: string, id: string, payload: object, insOpts?: InstanceOptions): Promise<Response> => {
    const token = getToken(insOpts);
    const opts = mergeHeaders({
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        method: 'PUT'
    });
    opts.body = JSON.stringify(payload);

    const response = await fetch(resolve(uri, HOST_URL), opts);
    const { ok, status, statusText } = response;
    if (ok && (status === 204 || statusText === 'No Content')) {
        throw new Error('No Content');
    }

    return response;
};

export const delete_ = async (uri: string, id: string, insOpts?: InstanceOptions): Promise<Response> => {
    const token = getToken(insOpts);
    const opts = mergeHeaders({
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        method: 'DELETE'
    });

    const response = await fetch(resolve(uri, HOST_URL), opts);
    const { ok, status, statusText } = response;
    if (ok && (status === 204 || statusText === 'No Content')) {
        throw new Error('No Content');
    }

    return response;
};
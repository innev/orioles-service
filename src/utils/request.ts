const MAX_SIZE = 1024 * 1024 * 300; // 300M
const mediaFilter = [".jpg", ".jpeg", ".png", ".mp3", ".mp4"];

interface IRequestOptions {
    url: string,
    type?: string,
    responseType?: string,
    error?: Function,
    ready?: Function,
    success: Function
}

/**
 * ajax请求zip文件
 * @param {object} options ajax请求参数
 * @property {string} [ooptions.url] 请求地址
 * @property {string} [ooptions.type] 请求类型 GET | POST
 * @property {string} [ooptions.responseType] 响应数据类型
 * @property {Function} [ooptions.success] 获取成功的回调方法
 * @property {Function} [ooptions.error] 获取失败的回调方法
 * @property {Function} [ooptions.ready] 初始化完成时触发
 * @param {boolean} withCredentials 
 * @param {object} headers 
 */
export const request = (options: IRequestOptions, withCredentials: Boolean = false, headers: {[key: string]: string} = {}): void => {
    const url: string = decodeURIComponent(options.url);
    const type: string = options.type || "GET";
    const responseType: string = options.responseType || 'json';
    const success: Function = options.success;
    const error: Function | undefined = options.error;
    const ready: Function | undefined = options.ready;

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let xhrPrototype: XMLHttpRequest = XMLHttpRequest.prototype;
    let header: string;

    if (!("overrideMimeType" in xhrPrototype)) {
        Object.defineProperty(xhrPrototype, "overrideMimeType", {
            value: function xmlHttpRequestOverrideMimeType() { }
        });
    }

    if (withCredentials) {
        xhr.withCredentials = true;
    }

    xhr.onreadystatechange = function () {
        switch (this.readyState) {
            case XMLHttpRequest.UNSENT: break; // 代理被创建，但尚未调用 open() 方法。
            case XMLHttpRequest.OPENED: break; // open() 方法已经被调用。
            case XMLHttpRequest.HEADERS_RECEIVED: // send() 方法已经被调用，并且头部和状态已经可获得。
                let fileSize: number = Number(this.getResponseHeader('Content-Length'));
                if (fileSize >= MAX_SIZE) {
                    error && error({ status: this.status, message: "文件超过限制！", stack: new Error().stack });
                    this.abort();
                } else {
                    ready && ready(fileSize);
                }
                break;
            case XMLHttpRequest.LOADING: break; // 下载中； responseText 属性已经包含部分数据。
            case XMLHttpRequest.DONE: // 下载操作已完成。
                if (this.status === 200) {
                    success && success(responseType === "json" ? JSON.parse(this.response) : this.response);
                } else if (this.status !== 0) {
                    error && error({ status: this.status, message: this.response, stack: new Error().stack });
                }
                break;
        }
    };

    xhr.onerror = err => error ? error(err) : console.error(err);
    xhr.open(type, url, true);

    // TS 写法
    for (const [header, value] of Object.entries(headers)) {
        xhr.setRequestHeader(header, value);
    }
    // JS 写法
    /*
    for (header in headers) {
        xhr.setRequestHeader(header, headers[header]);
    }
    */

    switch (responseType) {
        case "json": xhr.setRequestHeader("Accept", "application/json"); break;
        case "binary": xhr.responseType = "arraybuffer"; break;
        case "blob": xhr.responseType = "blob"; break;
        default:
            const ext = url.substring(url.lastIndexOf("."));
            if(mediaFilter.includes(ext)) { // 媒体文件使用 arraybuffer
                xhr.responseType = "arraybuffer";
            }
            break;
    }

    xhr.send();
};
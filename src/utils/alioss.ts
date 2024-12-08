import { getAliSTS } from "@/service/apis/aliyun";
import OSS from 'ali-oss';
import { generateUUID, randomID } from ".";
import './extensions/string';
import mimeType from "./mimeType";

const DEFAULT_FOLDER: string = "{platform}/{resource}/";
const DEFAULT_ROOT_PATH: string = DEFAULT_FOLDER + "{rid}/{filename}";
const DEFAULT_PATH: string = DEFAULT_FOLDER + "{rid}/{category}/{filename}";

type TCategory = 'root' | 'thumbs' | 'contents';
export interface IFolderProps {
    isDir?: Boolean,
    platform?: string,
    resource?: string
};
export interface IPathProps extends IFolderProps {
    rid?: string,
    category?: TCategory,
    filename?: string
};
export interface DListObjectResult extends OSS.ListObjectResult {};
export interface DObjectMeta extends OSS.ObjectMeta {};

/**
 * 获取OSS客户端对象，添加缓存
 * @param {String} cacheKey - 缓存的key
 * @param {Object} param
 * @property {Number} [param.timeout] - 连接超时时间。默认600秒，也就是10分钟
 * @property {Number} [param.expire] - STS已到期时间。默认60秒，也就是1分钟
 * @property {Number} [param.expire] - STS已到期时间。默认60秒，也就是1分钟
 * @returns {Promise<OSS>} - 返回OSS客户端对象
 */
const getClient = async (cacheKey?: string, {timeout = 600000, expire = 60000} = {}): Promise<OSS> => {
    return getAliSTS(cacheKey || randomID(), expire)
        .then(stsToken => new OSS({ ...stsToken, timeout }))
        .catch(err => {
            console.error(err);
            throw new Error("连接OSS失败！请检查后重试。");
        });
};

/**
 * 如果有传入的地址则不再创建新地址
 * @param {IPathProps} param
 * @property {String} [param.platform] - 平台名称，目前统一为: platfrom-file
 * @property {String} [param.resource] - 用户编号
 * @property {String} [param.rid] - 资源编号
 * @property {String} [param.category] - 资源类型
 * @property {String} [param.filename] - 不带扩展的文件名
 * @returns {String} - 返回OSS地址
 *
 * @example:
 *
 * 资源路径规范:
 * "{platform}/<resource>/<rid>|<uuid>/<category>/source.<ext>"
 *
 * 完整的资源路径例子:
 * orioles/ebook/f708d210b66cffe43b5bc41a8cdc0859/thumbs/source.<ext>
 */
const getOSSPath = ({platform = "orioles", resource = 'ebook', category = 'root', rid, filename}: IPathProps, realExt?: string): string => {
    if(filename && filename != '' && realExt) {
        const [ shortName ] = filename.split(".");
        filename = shortName + realExt;
    } else if(!filename && realExt) {
        filename = randomID() + realExt;
    }

    if (filename) {
        rid = rid || generateUUID();
        if(category === "root") {
            return DEFAULT_ROOT_PATH.format({ platform, resource, rid, filename });
        } else {
            return DEFAULT_PATH.format({ platform, resource, category, rid, filename });
        }
    } else {
        throw new Error("缺少必要的上传参数！请检查后重试。");
    }
};

const getOSSFolder = ({platform = "orioles", resource = 'ebook' }: IFolderProps): string => {
    if (platform && platform) {
        return DEFAULT_FOLDER.format({ platform, resource });
    } else {
        throw new Error("缺少必要的上传参数！请检查后重试。");
    }
};

/**
 * 上传File数据到OSS中
 * @param {File|Blob} file - File数据或Blobs数据
 * @param {IPathProps} param - 附带数据
 * @property {String} [param.rid] - 资源编号
 * @property {String} [param.category] - 资源类型
 * @property {String} [param.filename] - 不带扩展的文件名
 * @returns {Promise<string|void>} - OSS上传对象
 */
const uploadFile = async (file: File | Blob, {rid, category, filename}: IPathProps): Promise<string|void> => {
    const realExt: string|undefined = mimeType.getExtFromMime(file.type);
    const ossPath: string = getOSSPath({ category, rid, filename }, realExt);
    return getClient(rid)
        .then(client => client.put(ossPath, file))
        .then(result => result.name)
        .catch(err => {
            if(err.code === "ConnectionTimeoutError" && err.status === -2) {
                console.warn("上传超时: ", ossPath);
            } else {
                console.error(err);
            }
        });
};

const list = async (isDir = false, folderParse?: Function, { platform = "orioles", resource = 'ebook' }: IFolderProps = {}) => {
    const prefix: string = getOSSFolder({ platform, resource });
    const defaultParse = (result: DListObjectResult): Array<string>|Array<DObjectMeta>|DListObjectResult => {
        const { isTruncated, nextMarker, objects, prefixes, res } = result;
        if(!objects.length && prefixes) {
            return prefixes.map((item: string) => item.replace(prefix, ""));
        } else if(objects.length && !prefixes) {
            return objects.map(({ name, ...item}: DObjectMeta) => ({
                name: name.replace(prefix, ""),
                ...item
            }));
        } else {
            return result;
        }
    };

    return getClient()
        .then(client => client.list({ delimiter: isDir ? '/' : '', prefix, "max-keys": 1000 }, {}))
        .then(result => folderParse instanceof Function ? folderParse(result) : defaultParse(result));

};

export default {
    getClient,
    getOSSPath,
    getOSSFolder,
    uploadFile,
    list
};
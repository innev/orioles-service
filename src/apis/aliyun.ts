import Axios from "@/utils/Axios";
import { INLSConfig } from "@/utils/NLSClient";
import session from "@/utils/session";
import OSS from "ali-oss";

const axios: Axios = new Axios();

export const getAliNlSToken = async (): Promise<INLSConfig | undefined> => {
    const { code, data } = await axios.get("/api/nls/ali-token");
    if(code === 200) {
        return data;
    }
};

/**
 * 获取STS
 * @param {String} cacheKey - 缓存key
 * @param {Number} expire - 缓存时间
 * @returns {Promise<OSS.Options>}
 */
export const getAliSTS = async (cacheKey: string, expire: number): Promise<OSS.Options> => {
    const sts: OSS.Options|null = session.getSTSCache(cacheKey);
    if(sts) {
        return sts;
    } else {
        const { code, data } = await axios.get("/api/nls/ali-sts");
        if(code === 200) {
            session.setSTSCache(cacheKey, data, expire);
            return data;
        } else {
            throw new Error("获取STS失败！");
        }
    }
};
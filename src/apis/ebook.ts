
import { DBook, DModule } from "@/components/iv-ui/typings/DBook";
import Axios from "@/utils/Axios";

const axios: Axios = new Axios("");

export const getBookList = async (): Promise<Array<DBook>|undefined> => {
    const { code, data } = await axios.get("/api/ebook/list");
    if(code === 200) {
        return data;
    }
};

/**
 * 获取课本详情
 * @param {String} id
 * @param {String} origin
 * @returns {Promise<DBook|undefined>}
 */
export const getBookDetail = async (id: string, origin: string = 'cloud'): Promise<DBook|undefined> => {
    const { code, data } = await axios.get("/api/ebook/detail", { id, origin });
    if(code === 200) {
        return data;
    }
};

/**
 * 获取模块详情
 * @param {String} id
 * @param {String} module
 * @param {String} origin
 * @returns {Promise<DModule|undefined>}
 */
export const getModuleDetail = async (id: string, module: string, origin: string = 'cloud'): Promise<DModule|undefined> => {
    const { code, data } = await axios.get("/api/ebook/module", { id, module, origin });
    if(code === 200) {
        return data;
    }
};
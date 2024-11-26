import { DAuth } from "@/components/iv-ui/typings/DAuth";
import Axios from "@/utils/Axios";

const axios: Axios = new Axios("");

export const getAuthenticators = async (params: { pageIndex: string, pageSize: string }): Promise<Array<DAuth>> => {
    const { code, data } = await axios.get("/api/2fa/list", params);
    if(code === 200) {
        return data;
    } else {
        throw new Error('Get authenticators error.');
    }
};
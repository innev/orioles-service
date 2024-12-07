import Axios from "@/utils/Axios";

const axios = new Axios();

export const getArticleList = async () => {
    const { ok, data } = await axios.get("/api/wechat/articles/list");
    if(ok === 0) {
        return data;
    }
};
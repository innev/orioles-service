import Axios from "@/utils/Axios";

const axios: Axios = new Axios();

interface App {
    name: string
    url: string
    icon: string
    visiable: boolean,
    requiresAuth?: boolean
};

export const getApps = async (): Promise<Array<App>|undefined> => {
    const { code, data } = await axios.get("/api/apps");
    if(code === 200) {
        return data;
    }
};
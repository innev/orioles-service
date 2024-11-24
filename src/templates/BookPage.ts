import { isArray, randomID } from "@/utils";
import IBookPage, { DBookPage, DPageInfo } from "./interfaces/IBookPage";

const CDN_HOST: string = "https://o.innev.cn";

export default class BookPage implements IBookPage {
    private idx: number;
    private pageInfo: DPageInfo;

    constructor({pageId, ...pageInfo}: DPageInfo, idx: number = 1) {
        this.pageInfo = {
            pageId: pageId || randomID(),
            ...pageInfo
        };
        this.idx = idx;
    }

    public toJson(): DBookPage {
        const [ bgImg, textCache ] = isArray(this.pageInfo.url) ? this.pageInfo.url : [ this.pageInfo.url, this.pageInfo.url ];
        return {
            keyid: this.pageInfo.pageId,
            name: `页面${this.idx}`,
            desc: this.pageInfo.name,
            style: {
                width: 151,
                height: 212,
                backgroundColor: "rgb(255, 255, 255)",
                backgroundGlobal: false,
                backgroundImage: `url(${CDN_HOST}/${bgImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            },
            layers: [],
            animate: [],
            hide: false,
            cache_url: `${CDN_HOST}/${textCache}`
        };
    }
};
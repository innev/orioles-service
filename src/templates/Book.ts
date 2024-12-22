import path from "path";
import IBook, { DBook, DBookInfo } from "./interfaces/IBook";
import { DBookPage } from "./interfaces/IBookPage";

const CDN_HOST: string = process.env.CDN_HOST + '/';

export default class Book implements IBook {
    private version: string = "5.0.0";
    private path: string;
    private info: DBookInfo;
    private pages: Array<DBookPage>;

    constructor(info: DBookInfo, pages: Array<DBookPage>) {
        this.info = info;
        this.pages = pages;
        // 需要验证
        const paths: Array<string> = info.url.split("/");
        this.path = paths.slice(0, -2).join("/");
    }

    public toJson(): DBook {
        return {
            version: this.version,
            id: this.info.id,
            type: "pc",
            path: path.join(CDN_HOST, this.path),
            name: this.info.name,
            desc: this.info.name,
            cover: `${this.info.url.replace(this.path, "")}`,
            style: {
                width: 151,
                height: 212
            },
            pages: this.pages,
            fixeds: [],
            popups: [],
            modules: []
        };
    }
}
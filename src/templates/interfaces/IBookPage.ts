import { DPDFTextContent } from "./IPDFTextContent";
import { DPageLayer } from "./IPageLayer";
import { DSlider } from "./ISlider";
import { DStyle } from "./IStyle";

/**
 * 页面类型，可选值有: 起始页( start )、目录页( contents )、预备页起始页( ready )，单词页( words )
 */
export type TBookPageProps = 'start' | 'contents' | 'ready' | 'words';

export interface DBookPage {
    /** 页面编号 */
    id?: string,

    /** 页面样式 */
    className?: string,

    /** 页面唯一编号 */
    keyid: string,

    /** 页面名称 */
    name: string,

    /** 页面描述 */
    desc: string,

    /** 页面类型 */
    properties?: TBookPageProps,

    /** 页面不可见 */
    hide: Boolean,

    /** 页面样式 */
    style: DStyle,

    /** 页面图层列表 */
    layers: Array<DPageLayer>,

    /** 页面动画。（ 暂时没用到，建议精简掉 ） */
    animate: Array<any>,

    /** 预览模式的翻页效果，对应swoper定义的效果。 */
    slider?: DSlider,

    /** 书页来源 */
    from?: string,

    /** 字幕地址 */
    cache_url?: string,

    /** 页面编号 */
    num?: string
};

/**
 * 文件导入数据
 */
export interface DPageInfo {
    name: string,
    url: Array<string>|string,
    pageId: string,
    textContent?: DPDFTextContent
};

export default interface IBookPage {
    toJson(): DBookPage;
};
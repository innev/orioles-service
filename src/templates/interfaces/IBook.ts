import { DBookCahce } from "./IBookCache";
import { DBookPage } from "./IBookPage";
import { DModule } from "./IModule";
import { DRecord } from "./IRecord";
import { DSlider } from "./ISlider";
import { DStyle } from "./IStyle";

/**
 * 课本类型（ 修改建议: 改为课本版本 ）
 */
export type TBook = 'pc' | 'android' | 'ios' | 'demo';

export interface DBook {
    /**
     * 课本编号
     * */
    id: string,

    /**
     * 课本名称
     */
    name: string,

    /**
     * 课本路径
     */
    path: string,

    /**
     * 课本封面
     * */
    cover: string,

    /**
     * 课本版本
     * */
    version: string,

    /**
     * 课本描述
     */
    desc: string,

    /**
     * 课本类型（ 修改建议: 改为课本版本 ）
     */
    type: TBook,

    /**
     * 单页尺寸
     */
    style: DStyle,

    /**
     * 浮动页列表（ 修改建议: 去掉 ）
     */
    fixeds: Array<DBookPage>,

    /**
     * 弹出框页面列表（ 修改建议: 去掉 ）
     */
    popups: Array<DBookPage>,

    /**
     * 页面列表
     */
    pages: Array<DBookPage>,

    /**
     * 模块配置
     */
    modules: Array<DModule>,

    /**
     * 翻页效果（ 仅适用于编辑器 ）
     */
    slider?: DSlider,

    /**
     * 资源库筛选值记忆
     */
    module_params?: any,

    /**
     * epub电子课本信息，对应创建页面中的属性。（ 注意: 此属性不会写入epub中，但会保存在数据库的setting中作为下次编辑页面的初始化信息 ）
     * 导出时需要移除
     */
    ebook?: DRecord,

    /**
     * 图片库缓存，用于图片插件的图片上传列表
     */
    cacheImages?: Array<DBookCahce>
};

export interface DBookInfo {
    id: string,
    name: string,
    ext: string,
    url: string
};

export default interface IBook {
    toJson(): DBook;
}
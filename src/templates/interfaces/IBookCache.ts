/**
 * 图片库缓存，用于图片插件的图片上传列表。（ 注意: 此属性不会写入epub中，但会保存在数据库的setting中作为下次编辑页面的初始化信息 ）
 */
export interface DBookCahce {
    name: string,
    url: string
};

export default interface IBookCache {
    toJson(): DBookCahce;
}
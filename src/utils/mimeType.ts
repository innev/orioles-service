import path from "./path";

interface IExtType { [key: string]: string; };

/**
 * 类型映射表
 */
const TypeExts: IExtType = {
    "application/pdf": ".pdf",
    "text/html": ".html",
    "application/xhtml+xml": ".xhtml",
    "text/xml": ".xml",
    "text/css": ".css",
    "video/mp4": ".mp4",
    "audio/mp3": ".mp3",
    "image/png": ".png",
    "image/jpg": ".jpg",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "image/bmp": ".bmp",
    "image/tiff": ".tiff",
    "application/wmf": ".wmf",
    "image/x-wmf": ".wmf",
    "application/javascript": ".js",
    "application/json": ".json",
    "application/x-shockwave-flash": ".swf",
    "application/vnd.ms-opentype": ".ttf",
    "application/epub+zip": ".epub",
    "application/an+zip": ".an.zip",
    "application/3d+zip": ".3d.zip",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

/**
 * 扩展名映射表
 */
const PackTypes: IExtType = {
    pdf: "application/pdf",
    html: "text/html",
    xhtml: "application/xhtml+xml",
    xml: "text/xml",
    rels: "application/xml",
    css: "text/css",
    mp4: "video/mp4",
    mp3: "audio/mp3",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    bmp: "image/bmp",
    tiff: "image/tiff",
    wmf: "application/wmf",
    js: "application/javascript",
    json: "application/json",
    swf: "application/x-shockwave-flash",
    ttf: "application/vnd.ms-opentype",
    epub: "application/epub+zip",
    dtan: "application/an+zip",
    dt3d: "application/3d+zip",
    ppt: "application/vnd.ms-powerpoint",
    doc: "application/msword",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/**
 * 文本文件过滤器
 */
const TEXT_FILTER: Array<string | undefined> = [
    PackTypes.html,
    PackTypes.xhtml,
    PackTypes.css,
    PackTypes.js,
    PackTypes.json,
    PackTypes.xml,
    PackTypes.rels
];

/**
 * 图谱过滤器
 */
const IMAGE_FILTER: Array<string | undefined> = [
    PackTypes.png,
    PackTypes.jpeg,
    PackTypes.jpg,
    PackTypes.gif,
    PackTypes.bmp
];

/**
 * 根据 MIME 判断是否为图片
 * @param {string|undefined} mime - 文件类型
 * @returns {Boolean}
 */
const hasImageWithMime = (mime: string | undefined): Boolean => {
    return IMAGE_FILTER.includes(mime);
}

/**
 * 根据 MIME 判断是否为文本文件
 * @param {string|undefined} mime - 文件类型
 * @returns {Boolean}
 */
const hasTextWithMime = (mime: string | undefined): Boolean => {
    return TEXT_FILTER.includes(mime);
}

/**
 * 根据 URL 判断是否为文本文件
 * @param {string} url - 文件地址
 * @returns {Boolean}
 */
const hasTextWithUrl = (url: string): Boolean => {
    return hasTextWithMime(getMimeType(url));
}

/**
 * 根据文件地址，获取扩展名
 * @param {String} url - 文件地址
 * @returns {String} 返回扩展名
 */
const getExt = (url: string): string => {
    return path.extname(url).substring(1);
}

/**
 * 根据文件地址，获取mimeType
 * @param {String} url - 文件地址
 * @returns {String|undefined} 返回mime类型
 */
const getMimeType = (url: string): string | undefined => {
    return getMimeFromExt(getExt(url));
};

/**
 * 根据文件的mimeType，获取扩展名
 * @param {String} mime - 文件mimeType
 * @returns {String|undefined} 返回扩展名
 */
const getExtFromMime = (mime: string): string | undefined => {
    return TypeExts[mime];
};

/**
 * 根据文件扩展名，获取mimeType
 * @param {String} ext - 文件扩展名
 * @returns {String} 返回mime类型
 */
const getMimeFromExt = (ext: string): string | undefined => {
    return PackTypes[ext.replace(".", "")];
};

export default {
    hasImageWithMime,
    hasTextWithMime,
    hasTextWithUrl,
    getExt,
    getMimeType,
    getExtFromMime,
    getMimeFromExt,
    PackTypes
};
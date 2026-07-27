/**
 * Layout
 */
export const LAYOUT_SERVICE = {
    USER_INFO: '/api/user',
    SKILLS: '/api/skills'
};

/**
 * App 服务列表
 */
export const APP_SERVICE = {
    APPS: '/api/apps',
    GROUP_APPS: '/api/apps'
};

export const ICON_SERVICE = {
    ICONS: '/api/icons'
};

export const AUTHENTICATORS_SERVICE = {
    OTPS: '/api/2fa'
};

export const VIDEO_SERVICE = {
    VIDEOS: '/api/videos'
};

export const EBOOK_SERVICE = {
    BOOKS: '/api/ebook/qiniu',
    DETAIL: '/api/ebook/detail',
    MODULE: '/api/ebook/module'
};

export const NLS_SERVICE = {
    ALI_TOKEN: '/api/nls/ali-token',
    // TTS 经 WebSocket 直连阿里云 NLS（凭证取自 ALI_TOKEN），不存在独立的 TTS HTTP 接口；
    // 原值 '/api/wechat/articles' 为复制粘贴错误且无任何调用方，故移除
};

export const EXPLORER_SERVICE = {
    QINIU: '/api/explorer/qiniu',
    ALIYUN: '/api/explorer/aliyun'
};
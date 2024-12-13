export type TParams = {
    pages: Array<string>,
    module?: string,
    origin?: string,
    goBack?: string,
};


export const ROTER_MAPPING: { [key: string]: string } = {
    index: '电子课本',
    cover: '课本封面',
    module: '课本模块',
    speech: '语音识别',
};
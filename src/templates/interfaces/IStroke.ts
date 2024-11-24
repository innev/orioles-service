/**
 * 田字格配置
 */
export interface DStroke {
    /**
     * 汉字
     */
    character: string,

    /**
     * 汉字绘制点阵数据
     */
    strokes: Array<string>,

    /**
     * 汉字笔顺矩阵
     */
    medians: Array<Array<number>>,


    /**
     * 汉字拼音
     * 通常只用到第一个元素项，其他元素项值得是一字多音
     */
    pinyin: Array<string>
};
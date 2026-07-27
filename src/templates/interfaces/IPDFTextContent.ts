// PDF 文本内容类型定义。
// 原为 pdfjs-dist（v2）的类型 re-export，pdfjs-dist 卸载后改为本地最小定义，
// 仅保留项目实际用到的字段（详见 PDFTextContent.parse）。

export interface DPDFTextItem {
    /** 文本内容 */
    str: string;
    /** 文本方向（如 ltr） */
    dir?: string;
    /**
     * 文本项的变换矩阵（2x3 矩阵的 6 个数字）
     * @example [1, 0, 0, 1, 100, 50] => [scaleX, rotateX, rotateY, scaleY, translateX, translateY]
     */
    transform?: Array<number>;
    width?: number;
    height?: number;
    /** 字体名，对应 styles 的 key */
    fontName: string;
    /** 该文本项之后是否换行 */
    hasEOL?: boolean;
};

export interface DPDFTextStyle {
    /** 基线以上部分（字符上升部分）的高度 */
    ascent?: number;
    /** 基线以下部分（字符下降部分）的高度 */
    descent?: number;
    fontFamily: string;
    vertical?: boolean;
};

export interface DPDFTextContent {
    items: Array<DPDFTextItem>;
    styles: { [fontName: string]: DPDFTextStyle };
};

export interface DLineSpan {
    str: string,
    fontFamily: string
};

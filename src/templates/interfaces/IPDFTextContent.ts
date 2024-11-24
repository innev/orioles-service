import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { TextContent, TextItem, TextStyle } from 'pdfjs-dist/types/src/display/api';

export interface DPDFDocumentProxy extends PDFDocumentProxy {};
export interface DPDFPageProxy extends PDFPageProxy {};
/**
 * @property {value.transform} - 表示文本项的变换矩阵。transform 属性是一个数组，包含 6 个数字，表示 2x3 的变换矩阵
 * @example
 * [1, 0, 0, 1, 100, 50]
 * 上例中六个值的意思是:
 * 1. 缩放和旋转的水平方向分量（ scaleX ）
 * 2. 旋转和倾斜的水平方向分量（ rotateX ）
 * 3. 旋转和倾斜的垂直方向分量（ rotateY ）
 * 4. 缩放和旋转的垂直方向分量（ scaleY ）
 * 5. 水平平移量（ translateX ）
 * 6. 垂直平移量（ translateY ）
 */
export interface DPDFTextItem extends TextItem {};

/**
 * @property {value.ascent} - 文本项的基线以上部分（包括字符的上升部分）的高度
 * @property {value.descent} - 文本项的基线以下部分（包括字符的下降部分）的高度
 */
export interface DPDFTextStyle extends TextStyle {};
export interface DPDFTextContent extends TextContent {
    items: Array<DPDFTextItem>;
};

export interface DLineSpan {
    str: string,
    fontFamily: string
};
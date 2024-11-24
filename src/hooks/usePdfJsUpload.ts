import { DBookInfo } from '@/templates/interfaces/IBook';
import { DPageInfo } from '@/templates/interfaces/IBookPage';
import { DPDFDocumentProxy, DPDFPageProxy, DPDFTextContent, DPDFTextItem, DPDFTextStyle } from '@/templates/interfaces/IPDFTextContent';
import { isArray, randomID } from '@/utils';
import mimeType from '@/utils/mimeType';
import CryptoJS from 'crypto-js';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { useState } from 'react';
GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * 下载画布的图形
 * @param {HTMLCanvasElement} canvas - 用于截图的画布
 * @param {String} filename - 下载后的名称
 */
const downloadWithCanvas = (canvas: HTMLCanvasElement, filename: string = 'source', ext: string = '.png') => {
  const timestamp = Date.now().toString();
  const link = document.createElement('a');
  document.body.append(link);
  link.download = `${filename}_${timestamp}${ext}`;
  link.href = canvas.toDataURL(mimeType.getMimeFromExt(ext));
  link.click();
  link.remove();
}

/**
 * 下载Blob文件
 * @param {Blob} blob - 用于下载的blob文件
 * @param {String} filename - 下载后的名称
 */
const downloadWithBlob = (blob: Blob | null, filename: string = 'source') => {
  if(blob) {
    const timestamp = Date.now().toString();
    const link = document.createElement('a');
    document.body.append(link);
    link.download = `${filename}_${timestamp}${mimeType.getExtFromMime(blob.type)}`;
    link.href = URL.createObjectURL(blob);
    link.click();
    link.remove();
  }
}

const sleep = (waitTimeInMs: number) => new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

export interface DUploadHookProps {
  debug?: Boolean,
  scale?: number,
  maxSize?: number,
  type?: string,
  sourceList?: Array<DPageInfo>,
  uploadRequest?: Function,
  multiple?: Boolean
};

export interface DPDFPageResult {
  pageContent: Blob | null,
  textContent: DPDFTextContent
};

export interface DFileReader {
  md5: string,
  content: Uint8Array
};

export interface DUpload extends DFileReader {
  filename: string,
  textContent?: Array<DPDFTextContent>
};

export default ({ debug = false, ...options }: DUploadHookProps) => {
  const {
    scale = 3,
    maxSize = 200,
    type = 'image/jpeg,image/jpg,image/png,image/gif,image/bmp,application/pdf',
    sourceList = [],
    uploadRequest = null,
    multiple = false
  } = options;

  const types: Array<string> = type.split(',');
  const [fileList, setFileList] = useState<Array<DPageInfo>>(sourceList);
  const [fileInfo, setFileInfo] = useState<DBookInfo>({ id: '', name: '', ext: '', url: ''});
  const [uploading, setUploading] = useState<Boolean>(false);
  const [msgData, setMsgData] = useState<{ status: string, data: any }>({ status: '', data: {} });

  const rewriteText = (ctx: CanvasRenderingContext2D|null, textItem: DPDFTextItem, fontStyles: { [x: string]: DPDFTextStyle }) => {
    const { str, transform, width, height, fontName = '' } = textItem;
    if(!ctx || str == "" || !str) return false;
    const [scaleX, rotateX, rotateY, scaleY, translateX, translateY] = transform || [1, 0, 0, 1, 100, 50];
    const { ascent, descent, fontFamily, vertical } = fontStyles[fontName] || { fontFamily: 'sans-serif' };

    // 绘制文本
    ctx.font = `16px ${fontFamily}`;
    // ctx.fillText(str, translateX, translateY);

    // 循环尝试，通过文本的宽和高计算文本大小
    let _fontSize = 16; // 初始文字大小
    let _textWidth, _textHeight;
    while (true) {
      // 测量文本的宽度和高度
      const textMetrics = ctx.measureText(str);
      _textWidth = textMetrics.width;
      _textHeight = _fontSize * 1.2; // 假设每行的高度为文字大小的 1.2 倍
  
      // 判断是否适合容器
      if (_textWidth <= width && _textHeight <= height) break;
  
      // 文字大小减小，重新测量
      _fontSize -= 1;
      console.log("rewriteText:", str, `${_fontSize}px ${fontFamily}`);
      ctx.font = `${_fontSize}px ${fontFamily}`;
    }
    ctx.fillText(str, translateX, translateY);

    // 覆盖文本区域
    ctx.fillStyle = 'white'; // 使用白色覆盖，可根据需要更改颜色
    ctx.fillRect(translateX, translateY - height, width, height);
  };

  /**
   * 渲染pdf页面
   * @param {DPDFPageProxy} page
   * @param {String} pageId - 页面编号
   * @param {HTMLCanvasElement} canvas - 页面舞台对象
   * @returns {Promise<DPDFPageResult>} - 单页渲染任务
   */
  const renderPDFPage = async (page: DPDFPageProxy, pageId: string, pageIdx: number, canvas: HTMLCanvasElement): Promise<DPDFPageResult> => {
    setMsgData({ status: 'process', data: { info: '开始渲染页面[${pageName}]', pageIdx } });
    // 控制PDF解析速率，降低系统内存和CPU使用率，暂停100毫秒
    await sleep(100);

    const viewport = page.getViewport({ scale });
    canvas.id = pageId;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const canvasContext: CanvasRenderingContext2D|null = canvas.getContext('2d');
    if (canvasContext) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height); // 绘制之前前清空
      await page.render({ canvasContext, viewport }).promise;
    }
    const textContent: DPDFTextContent = await page.getTextContent() as DPDFTextContent;
    // textContent.items.map(value => rewriteText(canvasContext, value, textContent.styles));
    const pageContent: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, mimeType.PackTypes.jpeg));
    return { pageContent, textContent };
  }

  /**
   * 加载并处理上传文件
   * @param {DFileReader} param - 上传文件内容
   * @returns {Promise<void>} - 页面处理任务
   */
  const loadContentAsPDF = async ({ md5, content }: DFileReader): Promise<void> => {
    const pdfFile: DPDFDocumentProxy = await getDocument(content).promise;
    const canvas = document.createElement('canvas');
    
    for (let idx = 1; idx <= pdfFile.numPages; idx++) {
      const pageId: string = randomID();
      const page: DPDFPageProxy = await pdfFile.getPage(idx);
      const { pageContent, textContent } = await renderPDFPage(page, pageId, idx, canvas);
      const filename: string = pageId + mimeType.getExtFromMime(pageContent?.type||'');
      if (debug && !uploadRequest) {
        downloadWithBlob(pageContent, pageId);
      } else if (uploadRequest) {
        const url = await uploadRequest(pageContent, { md5, filename, textContent });
        setFileList((preFiles: Array<DPageInfo>) => [...preFiles, { name: filename, pageId, url, textContent }]);
        if(idx === 1) setFileInfo((preInfo: DBookInfo) => ({ ...preInfo, url: isArray(url)? url[0]: url }));
        console.info(`${filename} 上传成功。`);
      } else {
        console.warn('上传类型参数设置不正确！');
      }
    }
  }

  /**
   * 加载上传文件
   * @param {File} file - 上传的文件
   * @returns {Promise<DFileReader>} - 页面处理任务
   */
  const loadFileAsArrayBuffer = (file: File): Promise<DFileReader> => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    setMsgData({ status: 'start', data: { info: `开始读取PDF文件` } });

    return new Promise(resolve => (reader.onload = event => {
      const content: Uint8Array = new Uint8Array(event?.target?.result as ArrayBuffer);
      const words: number[] = [];
      for (let i = 0; i < content.length; i += 4) {
        const word = ((content[i] || 0) << 24) | ((content[i + 1] || 0) << 16) | ((content[i + 2] || 0) << 8) | (content[i + 3] || 0);
        words.push(word);
      }
      const wordArray = CryptoJS.lib.WordArray.create(words, content.length);
      const md5Digest = CryptoJS.MD5(wordArray);
      const md5: string = md5Digest.toString();
      
      setFileInfo({
        id: md5,
        name: file.name,
        ext: mimeType.getExtFromMime(file.type) || file.name.substring(file.name.lastIndexOf(".")),
        url: ''
      });
      resolve({ md5, content });
    }));
  }

  /**
   * 上传前处理
   * @param {File} file - 文件对象
   * @returns {Promise<Boolean|void>} - 是否上传
   */
  const beforeUpload = async (file: File): Promise<Boolean|void> => {
    if (!types.includes(file.type)) {
      console.error(`上传文件的类型不正确，请上传[${type}]类型。`);
      throw new Error(`上传文件的类型不正确，请上传[${type}]类型。`);
    }
    
    // 不限制文件大小
    const isLt2M: Boolean = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      console.error(`上传文件大小不能超过${maxSize}M`);
      throw new Error(`上传文件大小不能超过${maxSize}M`);
    }

    setUploading(true);

    if (file.type.startsWith('application/pdf')) {
      await loadFileAsArrayBuffer(file).then(loadContentAsPDF);
    } else if (file.type.startsWith('image/') && uploadRequest) {
      const url = await loadFileAsArrayBuffer(file).then(data => uploadRequest(file, data));
      setFileList((preFiles: Array<DPageInfo>) => [...preFiles, { pageId: '', name: file.name, url }]);
      setFileInfo((preInfo: DBookInfo) => ({ ...preInfo, url }));
      console.info(`${file.name} 上传成功。`);
    } else {
      console.warn('上传类型参数设置不正确！');
    }

    setMsgData({ status: 'end', data: { info: `导入成功`, filename: file.name } })
    setUploading(false);

    return false // 是否覆盖上传功能
  }

  return {
    msgData,
    uploading,
    fileList,
    fileInfo,
    uploadProps: {
      accept: types.map(mimeType.getExtFromMime).join(","),
      beforeUpload,
      multiple
    }
  }
};
import { DLineSpan, DPDFTextContent } from "./interfaces/IPDFTextContent";

const parse = (textContent: DPDFTextContent): Array<Array<DLineSpan>> => {
    const _subTitle: Array<Array<DLineSpan>> = [];
    let _line: Array<DLineSpan> = [];
    textContent.items.forEach(({ str, fontName, hasEOL }, idx: number) => {
      const { ascent, descent, fontFamily, vertical } = textContent.styles[fontName] || { fontFamily: 'sans-serif' };
      _line.push({ str, fontFamily });

      if(hasEOL) {
        _subTitle.push(_line);
        _line = [];
      }

      if(textContent.items.length - 1 === idx && _line.length) {
        _subTitle.push(_line);
        _line = [];
      }
    });
    return _subTitle;
};

export default {
    parse
}
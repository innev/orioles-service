import { isAbsolutePath } from '@/utils';

export { };

declare global {
  interface String {
    format(...args: Array<any>): string;
    extractBackgroundImageUrl(basePath?: string): string;
  }
}

/**
* 将字符串按照参数进行格式化
* @param {array} args 格式化规则
* @return {string}
* 
* @example '我是{0}人!'.format('中国'); // echo. 我是中国人！
* @example '我是{country}人!'.format({country:'中国'}); // echo. 我是中国人！
*/
String.prototype.format = function(...args: Array<any>) {
  args = args.length && typeof args[0] === "object" ? args[0] : args;
  return this.replace(/\{(\w+)(\|([^}]+))?\}/g, ($, $1) => undefined === args[$1] ? "" : args[$1]);
};

/**
 * 从背景样式中获取地址
 */
String.prototype.extractBackgroundImageUrl = function(basePath?: string): string {
  const regex: RegExp = /url\(['"]?(.*?)['"]?\)/i;
  const match: RegExpExecArray | null = regex.exec(this as string);
  if (match && match[1]) {
    if(basePath && !isAbsolutePath(match[1])) {
      return `${basePath}/${match[1]}`;
    } else {
      return match[1];
    }
  }

  return this as string;
}
import { IModuleNode } from "@/components/iv-ui/typings/DBook";
import { isArray } from ".";

/**
 * 单词（生字），分数阶段
*/
export const scoreList = [
  {
    minScore: 41,
    maxScore: 60
  }, {
    minScore: 61,
    maxScore: 90
  }, {
    minScore: 91,
    maxScore: 100
  }
]

/**
 * 对话（词语）、课文，分数阶段
*/
export const scoreBackList = [
  {
    minScore: 0,
    maxScore: 60,
    background: 'linear-gradient(42deg, #F9737C 0%, #FD515D 100%)'
  },
  {
    minScore: 60,
    maxScore: 80,
    background: 'linear-gradient(42deg, #FFBC00 0%, #EF8700 100%)'
  }, {
    minScore: 80,
    maxScore: 101,
    background: 'linear-gradient(42deg, #0ED722 0%, #06AE0F 100%)'
  }
]

/**
 * code错误码
*/
export const codeMessage = {
  48195: '实例评测试卷未设置，试题格式错误',
  48205: '上传音频为空',
  10114: '请求超时',
  10200: '读取数据超时',
  60114: '评测音频长度过长',
  10160: '请求数据格式非法，检查请求数据是否是合法的json',
  10139: '参数错误',
  40010: '无响应',
  40023: '无效配置',
  40034: '参数未设置',
  40037: '无评测文本',
  40038: '无评测语音',
  68676: '检查到乱说导致的拒识'
}

/**
 * 评测，英语评测和语文评测
 * 英语评测：单词(word)，对话(dialogue)，课文(text)
 * 语文评测：生字(word)，词语(words)，   课文(text)
*/
export const typeList = (evalItemList: Array<any>) => {
  let chinese = [
    { eval_type: 'word', question_type: 'read_syllable', result_type: 'read_syllable', prefix: '', name: '生字' },
    { eval_type: 'dialogue', question_type: 'read_word', result_type: 'read_word', prefix: '', name: '词语' },
    { eval_type: 'text', question_type: 'read_chapter', result_type: 'read_chapter', prefix: '', name: '课文' }
  ]
  let english = [
    { eval_type: 'word', question_type: 'read_word', result_type: 'read_word', prefix: '[word]', name: '单词' },
    { eval_type: 'dialogue', question_type: 'read_sentence', result_type: 'read_chapter', prefix: '[content]', name: '对话' },
    { eval_type: 'text', question_type: 'read_chapter', result_type: 'read_chapter', prefix: '[content]', name: '课文' }
  ]
  return evalItemList[0]?.en ? english : chinese;
}

/**
 * 类型判断，中文or英文
*/
export const checkCh = (str: string) => {
  var chExp = new RegExp('[\\u4E00-\\u9FFF]', 'g');
  return chExp.test(str);
}

/**
 * 获取当前类型的对象
*/
export const findThisItem = (evalItemList: Array<any>, evalType: string) => {
  let list = typeList(evalItemList)
  list = list?.filter(item => item.eval_type === evalType)
  return list[0]
}

// 英文
// （1）必要节点：[content]，注意使用换行符进行分隔。
// （2）数字读法标注： 在数字下一行必须用[number_replace]标记。以“数字/读法/”这种格式标注，注意符号/个数必须为2，且//中内容不可以加符号
// （3）自定义音标: 单个单词符号/个数不为2报错。单词音标为空报错（//）。单个音标字节数超过128*6字节报错。多音标可以竖线分隔开。建议//中内容不加符号；

// 中文
// 拼音标注要在开头添加：<customizer: interphonic>

const copyWriting = (item: any): string => {
  let writing: string = item?.en ? item?.en : item?.cn

  if (item?.number_replace)
    writing += '\r\n' + '[number_replace]' + '\r\n' + item?.number_replace

  if (item?.vocabulary)
    writing += '\r\n' + '[vocabulary]' + '\r\n' + item?.vocabulary

  if (item?.pinyin)
    writing = '<customizer: interphonic>' + '\r\n' + writing + '\r\n' + item?.pinyin

  return writing;
}

const copyMapWriting = (list: Array<any>): string => {
  let writing = list?.map(item => { return item?.en ? item?.en : item?.cn })?.join('\r\n')

  let numberReplace = list?.filter(item => item?.number_replace)?.map(item => {
    return item?.number_replace
  })?.join('\r\n')

  let vocabulary = list?.filter(item => item?.vocabulary)?.map(item => {
    return item?.vocabulary
  })?.join('\r\n')

  if (numberReplace.length > 0)
    writing += '\r\n' + '[number_replace]' + '\r\n' + numberReplace

  if (vocabulary.length > 0)
    writing += '\r\n' + '[vocabulary]' + '\r\n' + vocabulary
  return writing;
}

/**
 * 处理text文本
*/
export const textReturn = (evalItemList: Array<any>, recordType: string, wordIdex: number, evalType: string): string => {
  if (evalItemList?.length <= 0) return '';

  let text: string;
  if (recordType === 'wholestory') {
    if (evalItemList[0]?.en) {
      text = copyMapWriting(evalItemList);
    } else {
      text = evalItemList?.map(item => { return copyWriting(item) }).join('\r\n');
    }
  } else {
    text = copyWriting(evalItemList[wordIdex]);
  }
  text = findThisItem(evalItemList, evalType)?.prefix + '\r\n' + text;
  return text;
}

/**
 * 处理data，添加type属性
*/
export const transData = (data: Array<any>) => {
  for (var i in data) {
    if (isArray(data[i]) && data[i]?.length > 0) {
      data[i] = dataListTran(data[i])
    }
  }
  return data;
}

/**
 * 获取当前类型
*/
export const typeItem = (data: IModuleNode, type?: string): string => {
  let newType: string = type
  ? type
    : data.word?.length > 0
      ? 'word'
      : data.dialogue?.length > 0
        ? 'dialogue'
        : data.text?.length > 0
          ? 'text'
          : '';

  return newType;
}

/**
 *
 * @param {*} 更新每个字打分情况
 */
export const updateText = (data: any, evalType: string, recordType: string, wordIdex: number, textSentence: any) => {
  let index = 0, array = data[evalType];
  array?.map((im: any, idx: number) => {
    if (recordType != 'wholestory' && idx != wordIdex) return;
    im.textList = im?.textList?.map((el: any, i: number) => {
      index++;
      if (recordType != 'wholestory') el.dp_message = textSentence ? textSentence[i]?.dp_message : null;
      if (recordType === 'wholestory') el.all_dp_message = textSentence ? textSentence[index]?.dp_message : null;
      return el;
    })
  })
  data[evalType] = array;
  return JSON.parse(JSON.stringify(data));
}

/**
 *
 * @param {*} 更新总分数
 */
export const updateScore = (data: any, evalType: string, recordType: string, wordIdex: number, totalScore: any) => {
  if (recordType === 'wholestory') {
    if (totalScore || totalScore === 0) data.totalAllScore = totalScore;
  } else {
    if (totalScore || totalScore === 0) data[evalType][wordIdex].totalScore = totalScore;
  }
  return JSON.parse(JSON.stringify(data));
}

/**
 *
 * @param {*} 更新评测音频
 */
export const updateAudio = (data: any, evalType: string, recordType: string, wordIdex: number, audioData: any) => {
  if (recordType === 'wholestory') {
    if (audioData) data.audioAllData = audioData;
  } else {
    if (audioData) data[evalType][wordIdex].audioData = audioData;
  }
  return JSON.parse(JSON.stringify(data));
}

const symbolList: Array<string> = ['，', '、', '？', '；', '：', '‘', '“', '”', '’', '《', '》', '。'];

/**
 * 对象添加textList属性，用于记录每个字评测结果
 * 中文没有空格，如何切割，而且评测没有标点符号，怎么显示（如果遇到标点符号，则放在上一位显示）
*/
export const dataListTran = (list: Array<any>) => {
  list?.map((item: any) => {
    if (!item.textList) {
      let data = typeof item?.en === 'string' ? item?.en?.split(' ') : item?.cn?.split('')
      
      data?.map((el: any, i: number) => {
        if (symbolList.indexOf(el) > -1) {
          data[i - 1] = data[i - 1] + el
          data.splice(i, 1)
        }
      })

      let array = data?.map((el: any) => {
        return {
          name: typeof item?.en === 'string' ? el + ' ' : el,
          dp_message: null,  // sentence-word-dp_message：0正常；16漏读；32增读；64回读；128替换；
          all_dp_message: null,  // sentence-word-dp_message：0正常；16漏读；32增读；64回读；128替换；
        }
      })
      item.textList = array
    }
    return item
  })
  return list
}

/**
 * Sentence解析
 * Sentence可以对象可数组，word可对象可数组
 * 统一解析为数组
*/
const parseSyll = (data: any, array: Array<any>) => {
  data[0]?.en
    ? array = array?.filter(item => !!item?.global_index)
    : array?.map(im => {
      if (isArray(im.syll)) {
        im.dp_message = im?.syll?.filter((dc: any) => dc.rec_node_type === 'paper')[0].dp_message
      } else {
        im.dp_message = im?.syll?.dp_message
      }
    })
  return array;
};


interface ISentence {
  word: Array<any>
}

export const parseSentence = (data: any, sentence: Array<ISentence> | ISentence, type: string) => {
  if (!sentence) return sentence;
  if (isArray(sentence)) {
    let array: Array<any> = [];
    (sentence as Array<ISentence>).map((el: ISentence) => {
      if (isArray(el.word)) {
        array = [...array, ...el.word]
      } else {
        array.push(el.word)
      }
    })
    return parseSyll(data, array)
  } else {
    if (isArray((sentence as ISentence).word)) {
      return parseSyll(data, (sentence as ISentence).word)
    } else {
      return parseSyll(data, [(sentence as ISentence).word])
    }
  }
};
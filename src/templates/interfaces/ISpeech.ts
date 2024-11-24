import { SpeakerVoiceCn, SpeakerVoiceEn, SpeakerVoiceUs } from '@/utils/NLSClient';
import { DStroke } from './IStroke';

type TLang = 'en' | 'cn' | 'tw';
type TWordAlign = 'left' | 'right' | 'center';

/**
 * 存放评测结果
 */
export interface DEvaluationResult {
    /**
     * sentence-word-dp_message：0正常；16漏读；32增读；64回读；128替换；
     */
     dp_message: string,
    /**
     * sentence-word-dp_message：0正常；16漏读；32增读；64回读；128替换；
     */
    all_dp_message: string
}

/**
 * 单词
 */
 export interface DSpeechWord {
    id: string,

    lang: TLang,

    voice?: SpeakerVoiceUs | SpeakerVoiceEn | SpeakerVoiceCn,

    /**
     * 是否加星标
     */
    star?: Boolean,

    /**
     * 英文识别特有
     */
    en?: string,
    /**
     * 因为音标
     */
    ps?: string,

    /**
     * 中文释义或中文汉字
     */
    cn: string | Array<string>,
    /**
     * 中文语音识别特有
     */
    stroke?: DStroke,
    /**
     * 拼音，中文语音识别特有
     */
    tone?: Array<string>,

    /**
     * 单词位置
     */
    align?: TWordAlign,

    /**
     * 语音地址。如果是语音合成则不需要
     */
    src?: string,

    /**
     * 语音时长。如果是语音合成则不需要
     */
    duration?: number,

    /**
     * 存放评测结果
     */
    textList?: Array<DEvaluationResult>
}

/**
 * 对话
 */
export interface DSpeechDialogue {
    id: string,

    /**
     * 英文识别特有
     */
    en?: string,

    /**
     * 中文释义或中文汉字
     */
    cn?: string,

    /**
     * 单词位置
     */
    align?: TWordAlign,

    /**
     * 语音地址。如果是语音合成则不需要
     */
    src?: string,

    /**
     * 角色
     */
    role?: string,

    /**
     * 语音时长。如果是语音合成则不需要
     */
    duration?: number
}

/**
 * 文本
 */
export interface DSpeechText {
    id: string,

    /**
     * 英文识别特有
     */
    en?: string,
    /**
     * 英文特有
     */
    number_replace?: string,

    /**
     * 中文释义或中文汉字
     */
    cn?: string,

    /**
     * 中文句子特有
     */
    pinyin: Array<string>,

    /**
     * 单词位置
     */
    align?: TWordAlign,

    /**
     * 语音地址。如果是语音合成则不需要
     */
    src?: string,

    /**
     * 语音时长。如果是语音合成则不需要
     */
    duration?: number
}
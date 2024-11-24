import { SpeakerVoiceCn, SpeakerVoiceEn, SpeakerVoiceUs } from '@/utils/NLSClient';

/**
 * 页面切换效果，需要补充全部。
 */
export type SliderEffect = 'slide';

export interface ISlider {
    speed: Number,
    effect: SliderEffect,
    autoplay: Boolean,
    lock?: Boolean,
    time: Number
};

export interface IStyle {
    width: Number | 0,
    height: Number | 0,
    top?: Number | 0,
    left?: Number | 0,
    fill?: String | '',
    opacity?: Number | 0.5,
    letterSpacing?: string,
    color?: string,
    textDecoration?: string,
    textAlign?: string,
    fontFamily?: string,
    fontSize?: string,
    fontWeight?: string,
    backgroundColor?: string,
    backgroundRepeat?: string,
    backgroundImageCrop?: string,
    backgroundGlobal?: Boolean,
    backgroundSize?: string,
    backgroundImage?: string
};

export type EBookRecordType = 'teach_material' | 'student_material';
export type EBookRecordChapter = {
    chapter: Array<any>,
    publishToVolume: {
        value: Array<Number>
    }
};
/**
 * epub电子课本信息，对应创建页面中的属性。（ 注意: 此属性不会写入epub中，但会保存在数据库的setting中作为下次编辑页面的初始化信息 ）
 */
export interface EBookRecord {
    id: string,
    is_cd: Boolean,
    version: string,
    type: EBookRecordType,
    ossPath: string,
    chapterTag: EBookRecordChapter
};

/**
 * 田字格配置
 */
export interface IStroke {
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
    medians: Array<Array<Number>>,


    /**
     * 汉字拼音
     * 通常只用到第一个元素项，其他元素项值得是一字多音
     */
    pinyin: Array<string>
}

type LangType = 'en' | 'cn' | 'tw';
type WordAlign = 'left' | 'right' | 'center';

/**
 * 存放评测结果
 */
export interface IEvaluationResult {
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
export interface ISpeechWord {
    id: string,

    lang: LangType,

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
    stroke?: IStroke,
    /**
     * 拼音，中文语音识别特有
     */
    tone?: Array<string>,

    /**
     * 单词位置
     */
    align?: WordAlign,

    /**
     * 语音地址。如果是语音合成则不需要
     */
    src?: string,

    /**
     * 语音时长。如果是语音合成则不需要
     */
    duration?: Number,

    /**
     * 存放评测结果
     */
    textList?: Array<IEvaluationResult>
}

/**
 * 对话
 */
export interface ISpeechDialogue {
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
    align?: WordAlign,

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
    duration?: Number
}

/**
 * 文本
 */
export interface ISpeechText {
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
    align?: WordAlign,

    /**
     * 语音地址。如果是语音合成则不需要
     */
    src?: string,

    /**
     * 语音时长。如果是语音合成则不需要
     */
    duration?: Number
}

/**
 * 模块树形目录
 */
export interface IModuleTree {
    /**
     * 菜单名称
     */
    label: string,

    /**
     * 菜单编号
     */
    id?: string,

    /**
     * 菜单对应的数据，这里可以是本地文件，也可以是远程文件，甚至可以是一个可以返回正常数据的API地址。
     */
    src?: string,

    /**
     * 菜单子节点
     */
    children?: Array<IModuleTree>
};

/**
 * 模块类型
 */
type ModuleNodeCategory = 'speech' | 'video' | 'audio' | 'paper' | 'question' | 'animation';

/**
 * 模块节点
 */
export interface IModuleNode extends IModuleTree {
    /**
     * 名称
     */
    name: string,

    /**
     * 类型
     */
    category: ModuleNodeCategory,

    /**
     * 单词
     */
    word: Array<ISpeechWord>,

    /**
     * 对话
     */
    dialogue: Array<ISpeechDialogue>,

    /**
     * 文本
     */
    text: Array<ISpeechText>
};

/**
 * 扩展模型基准
 */
export interface DModule {
    id?: string, // 模块编号
    name?: string, // 模块名称
    icon?: string, // 模块图标
    background?: string, // 模块背景颜色
    banners?: Array<string>, // 模块轮换图片，轮换图片支持多张图片数组。（ 特别注意: 编辑的时候可以选择远程图片地址。保存时会自动拉取到本地包中保存 ）
    hide?: Boolean, // 是否隐藏
    chapter?: Array<IModuleTree> //级联树形菜单，用于模块左侧显示
}

export interface DPluginData {
    name?: string,
    type?: string
}

/**
 * 图层类型，可选值有: 显示( visual )、显示弹窗( visual-popup )、显示面板( visual-panel )，不显示( non-visual )
 */
export type LayerType = 'visual' | 'visual-popup' | 'visual-panel' | 'non-visual';
/**
 * 渲染模式
 */
export type LayerDisplayMode = 'content' | 'icon';
/**
 * 渲染设置
 */
export interface ILayerSet {
    /**
     * 是否初始化动画
     */
    disableInitAnimate: Boolean,
    /**
     * 是否隐藏图层
    */
    hide: Boolean,
    /**
     * 是否锁定图层
     */
    lock: Boolean,
    /**
     * 是否锁定宽高比
     */
    lockWideHigh: Boolean,
    /**
     * 渲染模式
     */
    displayMode: LayerDisplayMode
};
export interface ILayerEventParam {
    /**
     * 事件目标，此处是指跳转到的目标页面keyid
     */
    value: string,

    /**
     * 事件类型，此处是指自定义的epub页面跳转（ 暂时没用上。 ）
     */
    eventName?: string
}
/**
 * 图层事件
 */
export interface ILayerEvent {
    /**
     * 事件编号
     */
    id?: string,
    /**
     * 事件类型，此处是指页面跳转事件。
     */
    eventId: string,
    /**
     * 事件名称
     */
    name?: string,
    eventParam?: ILayerEventParam
}

/**
 * 页面图层列表
 */
export interface DBookPageLayer {
    id?: string,

    className?: string,

    /**
     * 插件编码
     */
    pid: string,

    /**
     * 图层名称
     */
    name: string,

    /**
     * 图层类型
     */
    type: LayerType,

    /**
     * 插件版本
     */
    version: string,
    /**
     * 图层唯一编号
     */
    keyid: string,

    /**
     * 渲染数据
     */
    data: DPluginData,

    /**
     * 渲染样式
     */
    style: IStyle,

    /**
     * 原始尺寸（用于icon 和 content模式切换）
     */
    originstyle: IStyle,

    /**
     * 渲染设置
     */
    set: ILayerSet,

    /**
     * 暂时没用上（ 修改建议: 精简掉 ）
     */
    estyle: IStyle,

    /**
     * 图层动画
     */
    animate: Array<any>,

    /**
     * 图层事件列表
     */
    events: Array<ILayerEvent>
}

/**
 * 页面类型，可选值有: 起始页( start )、目录页( contents )、预备页起始页( ready )，单词页( words )
 */
export type PageProperties = 'start' | 'contents' | 'ready' | 'words';
export interface DBookPage {

    id?: string,

    className?: string,

    /**
     * 页面唯一编号
     */
    keyid: string,

    name: string,

    desc: string,

    /**
     * 页面类型
     */
    properties: PageProperties,

    /**
     * 页面不可见
     */
    hide: Boolean,

    /**
     * 页面样式
     */
    style: IStyle,

    /**
     * 页面图层列表
     */
    layers: Array<DBookPageLayer>,

    /**
     * 页面动画。（ 暂时没用到，建议精简掉 ）
     */
    animate: Array<any>,

    /**
     * 预览模式的翻页效果，对应swoper定义的效果。
     */
    slider: ISlider,

    /**
     * 书页来源
     */
    from: string,

    /**
     * 字幕地址
     */
    cache_url: string,

    /**
     * 页面编号
     */
    num: string
};

/**
 * 课本类型（ 修改建议: 改为课本版本 ）
 */
export type BookType = 'pc' | 'android' | 'ios';
/**
 * 图片库缓存，用于图片插件的图片上传列表。（ 注意: 此属性不会写入epub中，但会保存在数据库的setting中作为下次编辑页面的初始化信息 ）
 */
export interface DBookBackgroundCache {
    name: string,
    url: string
}
export interface DBook {
    /**
     * 编号
     */
    id: string,

    /**
     * 课本版
     */
    version: string,

    /**
     * 课本封面
     */
    cover: string,

    /**
     * 课本描述
     */
    desc: string,

    /**
     * 课本名称
     */
    name: string,

    /**
     * 课本类型（ 修改建议: 改为课本版本 ）
     */
    type: BookType,

    /**
     * 翻页效果（ 仅适用于编辑器 ）
     */
    slider: ISlider,
    /**
     * 单页尺寸
     */
    style: IStyle,

    /**
     * 浮动页列表（ 修改建议: 去掉 ）
     */
    fixeds: Array<DBookPage>,

    /**
     * 弹出框页面列表（ 修改建议: 去掉 ）
     */
    popups: Array<DBookPage>,

    /**
     * 页面列表
     */
    pages: Array<DBookPage>,

    /**
     * 模块配置
     */
    modules: Array<DModule>,

    /**
     * 资源库筛选值记忆
     */
    module_params: any,

    /**
     * epub电子课本信息，对应创建页面中的属性。（ 注意: 此属性不会写入epub中，但会保存在数据库的setting中作为下次编辑页面的初始化信息 ）
     */
    ebook: EBookRecord,

    /**
     * 图片库缓存，用于图片插件的图片上传列表
     */
    cacheImages: Array<DBookBackgroundCache>
};

export interface DEBookSetting {
    path: string,
    type: string,
    is_cd: Boolean,
    version: string,
    page_data: DBook
};

export default interface DEBook {
    id: string,
    name: string
    cover: string,
    version: string,
    creator: string,
    creator_id: string,
    editor: string,
    editor_id: string,
    created_at: number,
    last_updated_at: number,
    is_exist_history: Boolean,
    status: string,
    audit_status: string,
    setting: DEBookSetting
};

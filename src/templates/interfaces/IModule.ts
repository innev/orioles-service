import { DSpeechDialogue, DSpeechText, DSpeechWord } from "./ISpeech";

/**
 * 模块类型
 */
 type TModuleNodeCategory = 'speech' | 'video' | 'audio' | 'paper' | 'question' | 'animation';

/**
 * 模块树形目录
 */
export interface DModuleTree {
    /**
     * 菜单编号
     */
    id: string,

    /**
     * 菜单名称
     */
    label: string,

    /**
     * 菜单对应的数据，这里可以是本地文件，也可以是远程文件，甚至可以是一个可以返回正常数据的API地址。
     */
    src?: string,

    /**
     * 菜单子节点
     */
    children?: Array<DModuleTree>
};

/**
 * 模块节点
 */
 export interface DModuleNode extends DModuleTree {
    /**
     * 名称
     */
    name: string,

    /**
     * 类型
     */
    category: TModuleNodeCategory,

    /**
     * 单词
     */
    word: Array<DSpeechWord>,

    /**
     * 对话
     */
    dialogue: Array<DSpeechDialogue>,

    /**
     * 文本
     */
    text: Array<DSpeechText>
};


/**
 * 扩展模型基准
 */
export interface DModule {
    id: string, // 模块编号
    name: string, // 模块名称
    icon?: string, // 模块图标
    background?: string, // 模块背景颜色
    banners?: Array<string>, // 模块轮换图片，轮换图片支持多张图片数组。（ 特别注意: 编辑的时候可以选择远程图片地址。保存时会自动拉取到本地包中保存 ）
    hide?: Boolean, // 是否隐藏
    chapter?: Array<DModuleTree> //级联树形菜单，用于模块左侧显示
}

export default interface IModule {
    toJson(): DModule;
}
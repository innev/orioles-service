import { DStyle } from "./IStyle";

/**
 * 图层类型，可选值有: 显示( visual )、显示弹窗( visual-popup )、显示面板( visual-panel )，不显示( non-visual )
 */
export type TLayer = 'visual' | 'visual-popup' | 'visual-panel' | 'non-visual';

/**
 * 渲染模式
 */
export type TLayerDisplayMode = 'content' | 'icon';

/**
 * 插件数据
 */
export interface DPluginData {
    name?: string,
    type?: string
}

/**
 * 渲染设置
 */
export interface DLayerSet {
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
    displayMode: TLayerDisplayMode
};

export interface DLayerEventParam {
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
export interface DLayerEvent {
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

    /**
     * 事件参数
     */
    eventParam?: DLayerEventParam
};

/**
 * 页面图层列表
 */
export interface DPageLayer {
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
    type: TLayer,

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
    style: DStyle,

    /**
     * 原始尺寸（用于icon 和 content模式切换）
     */
    originstyle: DStyle,

    /**
     * 渲染设置
     */
    set: DLayerSet,

    /**
     * 暂时没用上（ 修改建议: 精简掉 ）
     */
    estyle: DStyle,

    /**
     * 图层动画
     */
    animate: Array<any>,

    /**
     * 图层事件列表
     */
    events: Array<DLayerEvent>
}

export default interface IPageLayer {
    toJson(): DPageLayer;
}
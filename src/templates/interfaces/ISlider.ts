/**
 * 页面切换效果，需要补充全部。
 */
export type TSliderEffect = 'slide';

export interface DSlider {
    effect: TSliderEffect,
    autoplay: Boolean,
    speed?: Number,
    lock?: Boolean,
    time: Number
};

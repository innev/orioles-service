import { CSSProperties } from "react";

export interface DStyle extends CSSProperties {
    width: number | 0,
    height: number | 0,
    top?: number | 0,
    left?: number | 0,
    fill?: FillMode,
    opacity?: number | 0.5,
    letterSpacing?: string,
    color?: string,
    textDecoration?: string,
    textAlign?: CanvasTextAlign,
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

export default interface IStyle {
    toJson(): DStyle;
}
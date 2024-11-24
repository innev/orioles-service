import { HTMLAttributes, InputHTMLAttributes, ReactNode, SVGProps } from 'react';

export interface SVGContainerProps extends SVGProps<SVGSVGElement> {
    className?: string
}

export interface DivContainerProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}

export interface StackProps extends HTMLAttributes<HTMLDivElement>, DivContainerProps {
    direction?: string, // row, row-reverse, column, column-reverse
    alignItems?: string, // flex-start, center, flex-end, stretch, baseline
    justifyContent?: string, // flex-start, center, flex-end, space-between, space-around, space-evenly
    spacing?: number
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    className?: string,
    children?: ReactNode,
}

export interface IBreadcrumb {
    name: string,
    href: string,
    current?: Boolean
}

export interface LayoutProps extends ContainerProps {
    breadcrumbs?: Array<IBreadcrumb>
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { };
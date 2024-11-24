import { classNames } from '@/utils/classNames';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { cloneElement, MouseEventHandler, ReactElement } from 'react';

type TSize = 5 | 6 | 7 | 8 | 9 | 10 | 12 | 14 | 15 | 16 | 18;
type TDirection = "vertical" | "horizontal" | "none";
type TType = 'submit' | 'reset' | 'button' | 'link' | 'text';
interface DIconButtonProps {
    icon?: ReactElement,
    size?: TSize,
    direction?: TDirection,
    title?: string,
    selected?: Boolean,
    type?: TType,
    news?: Boolean,
    className?: string,
    loading?: Boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children?: ReactElement
};

const directionMapping: { [key: string]: string} = {
    vertical: "flex-row px-0 py-2",
    horizontal: "flex p-2",
    none: "p-2"
};

const typeMapping: { [key: string]: Array<string>} = {
    button: ['bg-orange-600 text-gray-100', 'bg-gray-100 text-gray-800 hover:bg-orange-600 hover:text-gray-100'],
    text: ['text-gray-100 bg-orange-600', 'text-gray-100 hover:bg-orange-600'],
    link: ['text-orange-600', 'text-gray-100 hover:text-orange-600']
};

const IconButton = ({ icon, size = 5, direction = "none", title = "", type = "link", selected = false, news = false, loading = false, onClick, className = '' }: DIconButtonProps) => {
    return (
        <div className="relative inline-block">
            <button
                className={classNames(
                    directionMapping[direction],
                    "justify-center items-center rounded text-sm",
                    selected ? typeMapping?.[type]?.[0] : typeMapping?.[type]?.[1],
                    className
                )}
                onClick={onClick}
                title={title}
            >
                {loading
                    ? <ArrowPathIcon className={classNames(`w-${size} h-${size} animate-spin`, direction === "vertical" ? "m-auto" : "")} />
                    : icon
                        ? cloneElement(icon, { className: classNames(`w-${size} h-${size}`, direction === "vertical" ? "m-auto" : "") })
                        : null
                }
                {direction != "none" && title != "" ? title : null}
            </button>
            {news ? <span className="absolute top-1 left-1 w-2 h-2 bg-red-600 rounded-full"></span> : null}
        </div>
    );
};

export default IconButton;
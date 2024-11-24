import { SVGContainerProps } from '../typings/Interfaces';

export default ({ className, ...props }: SVGContainerProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 stroke-current ${className || ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );
};
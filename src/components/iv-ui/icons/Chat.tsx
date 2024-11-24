import { SVGContainerProps } from '../typings/Interfaces';

export default ({ className, ...props }: SVGContainerProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 stroke-current ${className || ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...props}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
    );
};
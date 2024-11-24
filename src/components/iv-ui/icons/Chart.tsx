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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );
};
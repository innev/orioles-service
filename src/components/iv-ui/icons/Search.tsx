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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
};
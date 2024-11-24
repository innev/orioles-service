import { SVGContainerProps } from '../typings/Interfaces';

export default ({ className, ...props }: SVGContainerProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 256 256"
            fill="none"
            {...props}
        >
            <circle cx="128" cy="128" r="128" fill="#2563EB" />
            <path cx="0" fillRule="evenodd" fill="#ffffff" d="m132.1 14.6l22.1 34.3q0 0 0.1 0l22-34.3v43.5c11 8 21.6 21.5 28.3 42.5 8.7 39 0 77.4-42.8 95.1-24.6 7.2-52.2 9.3-86.9-14.2-18.9-12.7-34.1-33.3-22.5-39 6.5-2.2 9.4 4.9 13.8 8.5-1.5-5-4.4-10 1.4-14.2 7.3-5 12.3 4.2 13.1 7.1 1.4 9.9 4.3 14.9 18.1 17 16.6-0.7 29-7.1 30.4-29.1-2.2-22.7-16.7-33.4-17.4-45.5-0.5-12.2 7.2-25.8 20.3-32.9zm21.8 183.3l5.8 40.5-8 0.7zm-20.3 2.9l-1.5 39.7-7.2-0.7z" />
        </svg>
    );
};
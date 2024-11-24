import { classNames } from '@/utils/classNames';
import { SVGContainerProps } from '../typings/Interfaces';

export default ({ className = '', ...props }: SVGContainerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("fill-white mr-1", className)}
      viewBox="0 0 1024 1024"
      width="200"
      height="200"
      {...props}
    >
      <path d="M819.2 51.2a153.6 153.6 0 0 1 153.6 153.6v614.4a153.6 153.6 0 0 1-153.6 153.6H204.8a153.6 153.6 0 0 1-153.6-153.6V204.8a153.6 153.6 0 0 1 153.6-153.6zM256 153.6H204.8a51.2 51.2 0 0 0-51.2 51.2v614.4a51.2 51.2 0 0 0 51.2 51.2h614.4a51.2 51.2 0 0 0 51.2-51.2V204.8a51.2 51.2 0 0 0-51.2-51.2h-51.2v307.2a51.2 51.2 0 0 1-45.2096 50.8416L716.8 512H307.2a51.2 51.2 0 0 1-51.2-51.2V153.6z m409.6 0H358.4v256h307.2V153.6z m-102.4 51.2a51.2 51.2 0 0 1 50.8416 45.2096L614.4 256v51.2a51.2 51.2 0 0 1-102.0416 5.9904L512 307.2V256a51.2 51.2 0 0 1 51.2-51.2z" />
    </svg>
  )
};
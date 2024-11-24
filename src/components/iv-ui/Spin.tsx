import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface SpinProps {
  tips?: string,
  body?: ReactNode,
  spinning: Boolean,
  children?: ReactNode
}

export default ({ tips = '', body = null, spinning = true, children }: SpinProps) => {
  return (
    <div className={`w-full h-full top-0 left-0 ${spinning ? '' : 'bg-black bg-opacity-70'}`}>
      {spinning ? children : body ? body : (
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ArrowPathIcon className='animate-spin text-blue-400 w-8 h-8'/>
          {tips ? <div className="text-gray-400 text-xl leading-10">{tips}</div> : null}
        </div>
      )}
    </div>
  );
};
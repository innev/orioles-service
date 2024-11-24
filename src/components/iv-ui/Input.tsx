import { classNames } from '@/utils/classNames';
import { forwardRef } from 'react';
import { InputProps } from './typings/Interfaces';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={classNames(
          'block appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm',
          className
        )}
      />
    )
  }
)

Input.displayName = 'Input';

export default Input;
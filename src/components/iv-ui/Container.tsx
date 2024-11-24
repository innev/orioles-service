
import { classNames } from '@/utils/classNames';
import { DivContainerProps } from './typings/Interfaces';

export default function Container({ className, ...props }: DivContainerProps) {
  return (
    <div
      className={classNames('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}

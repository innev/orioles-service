import { ReactNode } from "react";

interface SVGProps {
  fill?: string,
  strokeWidth?: string,
  stroke?: string,
  className?: string,
  size?: string,
  children?: ReactNode
};

const sizeMapping: { [key: string]: number } = {
  small: 24,
  default: 32,
  large: 48,
};

const RecordIcon = ({ strokeWidth = '1.5', stroke = 'currentColor', fill = 'none', className = 'w-6 h-6', size = 'small', children }: SVGProps) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${sizeMapping[size]} ${sizeMapping[size]}`} strokeWidth={strokeWidth} stroke={stroke} fill={fill} className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
      {children}
    </>
  )
};

export default RecordIcon;

RecordIcon.defaultProps = {
  strokeWidth: '1.5',
  stroke: 'currentColor',
  fill: 'none',
  className: 'w-6 h-6',
  size: 'small'
}
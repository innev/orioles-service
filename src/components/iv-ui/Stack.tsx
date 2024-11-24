import { classNames } from '@/utils/classNames';
import { StackProps } from './typings/Interfaces';

const Stack = ({ className = '', direction = 'row', alignItems = 'center', justifyContent = 'space-between', spacing = 0, children, ...props }: StackProps) => {
    return (
        <div
            className={classNames(
                'flex',
                // 'flex-col',
                spacing > 0 ? `gap-${direction.startsWith('row') ? 'x' : 'y'}-${spacing}` : '',
                `items-${alignItems}`, // items-center
                `sm:flex-${direction}`, // sm:flex-row-reverse
                justifyContent === 'space-between' ? `sm:justify-between` : '', // sm:justify-between
            )}
        >
            {children}
        </div>
    )
};

export default Stack;
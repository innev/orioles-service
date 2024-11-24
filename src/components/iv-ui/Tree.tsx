import { classNames } from '@/utils/classNames';
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { IModuleTree } from './typings/DBook';

const styles = {
    icon: 'inline-block mr-1',
    label: 'cursor-pointer font-sans opacity-60 hover:font-bold hover:opacity-100',
};

const NodeItem = ({ label = 'Subfolder 1', root = false, selected = false, onChange }: { label: string; root?: Boolean; selected?: Boolean; onChange?: Function }) => {

    return (
        <li className={classNames('my-2 list-disc', root ? 'ml-6' : '')}>
            <label className={classNames(styles.label, selected ? 'font-bold opacity-100' : 'opacity-60')} onClick={() => onChange && onChange()}>
                {label}
            </label>
        </li>
    );
};

const FolderItem = ({ label = 'Folder 1', nodes = [], size = 5, selected = false, onChange }: { label: string; nodes?: Array<IModuleTree>; size?: number; selected?: Boolean; onChange?: Function }) => {
    const [expand, setExpand] = useState<Boolean>(selected);
    const iconStyle = classNames(styles.icon, `w-${size} h-${size}`);
    const [index, changeIndex] = useState<Number>();

    const onChangeHanlder = (subIdx: Number, src: string) => {
        changeIndex(subIdx);
        onChange && onChange(src);
    };
    
    return (
        <li className='relative pl-1 my-2'>
            <label className={classNames(styles.label, 'text-lg', selected ? 'font-bold opacity-100' : 'opacity-60')} onClick={() => setExpand(!expand)}>
                {expand ? <FolderOpenIcon className={iconStyle} /> : <FolderIcon className={iconStyle} />}
                {label}
            </label>
            
            <ul className={classNames('pl-8', expand ? 'inline-block' : 'hidden')}>
                {nodes.map(({ label, src, children }, idx) => <NodeItem key={label} label={label} selected={idx === index} onChange={() => onChangeHanlder(idx, src as string)} />)}
            </ul>
        </li>
    );
};

export default ({ chapter, onChange, className = '', selectedIndex }: { chapter: Array<IModuleTree>; onChange?: Function; className?: string; selectedIndex?: number }) => {
    const [index, changeIndex] = useState<number>();

    useEffect(() => {
        if(selectedIndex != null && chapter[selectedIndex]) {
            const { src } = chapter[selectedIndex] || {};
            src && onChangeHanlder(selectedIndex, src);
        }
    }, [selectedIndex]);

    const onChangeHanlder = (idx: number, src: string) => {
        changeIndex(idx);
        onChange && onChange(src);
    };

    return (
        <ul className={classNames('list-none pl-1', className)}>
            {chapter?.map(({ label, src, children }, idx) => {
                if(children) {
                    return <FolderItem key={label} label={label} nodes={children} selected={idx === index} onChange={(src: string) => onChangeHanlder(idx, src)}/>;
                } else if(src) {
                    return <NodeItem key={label} label={label} root={true} selected={idx === index} onChange={() => onChangeHanlder(idx, src)} />;
                } else {
                    return null;
                }
            })}
        </ul>
    );
};
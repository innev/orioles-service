import { classNames } from '@/utils/classNames';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ReactNode, useMemo, useState } from 'react';
import IconButton from './IconButton';

export interface DTabItem {
  key: string;
  label: string;
  children: string | ReactNode | undefined;
};

export interface DTabs {
  items: Array<DTabItem>,
  activeKey: string
  defaultActiveKey?: string,
  className?: string,
  onChange?: Function
}

export default ({ items = [], activeKey, defaultActiveKey = "", className = "", onChange }: DTabs) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveKey || activeKey);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    onChange && onChange(tabKey);
  };

  const moduleRender = useMemo(() => {
    switch(activeKey) {
      case "module": return <IconButton icon={<PlusIcon/>} title="添加模块" direction="horizontal" type='button' className='w-72' />
      case "chapter": return <IconButton icon={<PlusIcon/>} title='添加章节' direction="horizontal" type='button' className='w-72' />
      case "content": return <IconButton icon={<PlusIcon/>} title='内容管理' direction="horizontal" type='button' className='w-72' />
      default: return null;
    }
  }, [activeKey]);

  return (
    <div className={className}>
      <div className="font-mono my-1 border-b border-gray-300">
        {items.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleTabClick(key)}
            className={classNames(
              "px-4 py-2 mx-2 -mb-px",
              activeTab === key ? 'text-orange-600 font-bold text-lg border-b-2 border-orange-600' : 'text-gray-100 font-thin hover:text-orange-600')}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="m-2 flex-grow overflow-y-auto">
        {items.map(({ key, children }) => <div key={key} className={classNames("mb-2", activeTab === key ? 'block' : 'hidden')}>{children}</div>)}
        {moduleRender}
      </div>
    </div>
  );
};
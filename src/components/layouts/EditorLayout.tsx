import { IconButton } from '@/components/iv-ui';
import { AdjustmentsVerticalIcon, AigregoIcon, CartIcon, ChatIcon, Cog6Icon, SaveIcon } from "@/components/iv-ui/icons";
import { ContainerProps } from '@/components/iv-ui/typings/Interfaces';
import { classNames } from "@/utils/classNames";
import { ArrowUturnLeftIcon, BarsArrowDownIcon, BarsArrowUpIcon, HashtagIcon, ListBulletIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, PlayIcon, QuestionMarkCircleIcon, SquaresPlusIcon, UserCircleIcon, WalletIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from "react";

type TSize = 'default' | 'small' | 'large';
interface IHeaderProps extends ContainerProps {
  nav?: ReactNode,
  tools?: ReactNode,
  status?: ReactNode,
  size?: TSize,
  onHeaderChange?: Function
};

interface ISiderProps extends ContainerProps {
  size?: TSize,
  value?: string,
  defaultValue?: string,
  onSelectPlugin?: Function,
};

const heightMapping = {
  small: 'h-10',
  default: 'h-12',
  large: 'h-14'
};

const widthMapping = {
  small: 'w-10',
  default: 'w-12',
  large: 'w-14'
};

export const pluginMapping: {[key: string]: string} = {
  list: '课本',
  page: '页面',
  subtitle: '字幕',
  shape: '形状',
  image: '图片',
  audio: '音频',
  video: '视频'
};

export const Header = ({ size = "default", nav = null, tools = null, status = null, onHeaderChange, className = '' }: IHeaderProps) => {
  return (
    <div className={classNames("w-full flex justify-between items-center bg-slate-900", heightMapping[size] || 'h-12', className)}>
      <div className="flex w-64 justify-between items-center">
        <IconButton icon={<ArrowUturnLeftIcon />} size={8} className={classNames("rounded-none", heightMapping[size] || 'h-12')} type="text" />
        {nav}
      </div>
      <div className="flex justify-between items-center">
        <IconButton icon={<BarsArrowUpIcon />} title="置顶" direction="horizontal" />
        <IconButton icon={<BarsArrowDownIcon />} title="置底" direction="horizontal" />
        <IconButton icon={<MagnifyingGlassPlusIcon />} title="放大" direction="horizontal" />
        <IconButton icon={<MagnifyingGlassMinusIcon />} title="缩小" direction="horizontal" />
        {tools}
      </div>
      <div className="flex justify-end items-center">
        {status}
        <IconButton icon={<SaveIcon />} title="保存" type='text' onClick={() => onHeaderChange && onHeaderChange('save')} />
        <IconButton icon={<PlayIcon />} title="预览" type='text' onClick={() => onHeaderChange && onHeaderChange('preview')} />
        <IconButton icon={<UserCircleIcon />} size={8} className={classNames("rounded-none", heightMapping[size] || 'h-12')} type="text" news={true} />
      </div>
    </div>
  );
};

export const Sider = ({ size = "default", value = 'list', onSelectPlugin, className = '' }: ISiderProps) => {
  return (
    <div className={classNames("flex flex-col justify-between items-center bg-slate-900", widthMapping[size] || 'w-12', className)}>
        <Link href="/admin/book" className="flex items-center justify-center mt-3">
          <AigregoIcon width={24} height={24} />
        </Link>
        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
            <IconButton size={6} icon={<ListBulletIcon />} title="课本" direction="vertical" selected={value === 'list'} onClick={() => onSelectPlugin && onSelectPlugin('list')} />
            <IconButton size={6} icon={<WalletIcon />} title="页面" direction="vertical" selected={value === 'page'} onClick={() => onSelectPlugin && onSelectPlugin('page')} />
            <IconButton size={6} icon={<HashtagIcon />} title="字幕" direction="vertical" selected={value === 'subtitle'} onClick={() => onSelectPlugin && onSelectPlugin('subtitle')} />
            {/* <IconButton size={6} icon={<ChartIcon />} title="形状" direction="vertical" selected={value === 'shape'} />
            <IconButton size={6} icon={<PhotoIcon />} title="图片" direction="vertical" selected={value === 'image'} />
            <IconButton size={6} icon={<MusicalNoteIcon />} title="音频" direction="vertical" selected={value === 'audio'} /> */}
            <IconButton size={6} icon={<SquaresPlusIcon />} title="更多" direction="vertical" />
        </div>
        <div className="flex flex-col items-center mt-2 border-t border-gray-700">
            {/* <IconButton size={6} icon={<CartIcon />} />
            <IconButton size={6} icon={<AdjustmentsVerticalIcon />} />
            <IconButton size={6} icon={<ChatIcon />} news={true} /> */}
        </div>

        <div className="flex flex-col mt-auto">
          <IconButton size={6} icon={<QuestionMarkCircleIcon />} />
          <IconButton size={6} icon={<UserCircleIcon />} news={true} />
          <IconButton icon={<Cog6Icon />} />
        </div>
    </div>
  );
};

export const Tools = ({ size = "default", className = '' }: ISiderProps) => {
  return (
    <div className={classNames("flex flex-col justify-between items-center h-full bg-slate-900", widthMapping[size] || 'w-12', className)}>
        <Link href="/admin/book" className="flex items-center justify-center mt-3">
          <AigregoIcon width={24} height={24} />
        </Link>
        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
            <IconButton size={6} icon={<ListBulletIcon />} title="课本" direction="vertical" />
            <IconButton size={6} icon={<WalletIcon />} title="页面" direction="vertical" />
            <IconButton size={6} icon={<HashtagIcon />} title="字幕" direction="vertical" />
            <IconButton size={6} icon={<SquaresPlusIcon />} title="更多" direction="vertical" />
        </div>
        <div className="flex flex-col items-center mt-2 border-t border-gray-700">
            <IconButton size={6} icon={<CartIcon />} />
            <IconButton size={6} icon={<AdjustmentsVerticalIcon />} />
            <IconButton size={6} icon={<ChatIcon />} news={true} />
        </div>

        <div className="flex flex-col mt-auto">
            <IconButton size={6} icon={<QuestionMarkCircleIcon />} />
            <IconButton icon={<Cog6Icon />} />
        </div>
    </div>
  );
};

export const Footer = ({ className, ...props }: ContainerProps) => <div />;
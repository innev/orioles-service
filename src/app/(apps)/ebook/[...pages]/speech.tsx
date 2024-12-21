'use client'

import SpeechProcess from '@/components/SpeechProcess';
import ToolBar from '@/components/ToolBar';
import { Spin, Tree } from '@/components/iv-ui';
import { classNames } from '@/utils/classNames';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { TParams } from './type';
import useSWR from 'swr';
import { EBOOK_SERVICE } from '@/service';
import http from '@/utils/http';
import { DModule } from '@/templates/interfaces/IModule';

export default ({ pages, origin = 'cloud', goBack }: TParams) => {
  const [ id = '', page = '', module = '', selectedIndex = 0 ] = pages;
  const [src, changeSrc] = useState<string>();
  const [showTree, setShowTree] = useState<Boolean>(false);
  const { data, error, isLoading } = useSWR<DModule>(`${EBOOK_SERVICE.MODULE}?id=${id}&module=${module}&origin=${origin}`, http.findOne_);

  const onTreeItemChange = (_src: string) => {
    changeSrc(_src);
    showTree === true && setShowTree(false);
  };

  return (
    <Spin spinning={!isLoading}>
      <div className="flex flex-[2_2_0%] h-screen">
        <div className='hidden sm:block sm:w-1/2 md:w-2/5 lg:w-80 pt-3 px-2 bg-yellow-400 h-full'>
          <h2 className='text-2xl font-sans text-center font-bold border-b-2 border-gray-600 border-opacity-50'>{data?.name||'电子书模块'}</h2>
          <Tree className='text-clip' chapter={data?.chapter||[]} onChange={onTreeItemChange} selectedIndex={Number(selectedIndex)} />
          
          <div className="absolute bottom-4 left-4">
            <ToolBar goBack={goBack} />
          </div>
        </div>

        <div className="h-full w-full bg-white overflow-y-auto">
          <SpeechProcess src={src} />
        </div>

        <div className={classNames('absolute top-0 bottom-0 left-0 right-0 bg-yellow-400 pt-3 px-2', `sm: ${!src || showTree === true ? 'block' : 'hidden'}`)}>
          <h2 className='text-2xl font-sans text-center font-bold border-b-2 border-gray-600 border-opacity-50'>{data?.name||'电子书模块'}</h2>
          <Tree className='text-clip' chapter={data?.chapter||[]} onChange={onTreeItemChange} selectedIndex={Number(selectedIndex)}/>
        </div>
        <Bars3Icon className='w-10 h-10 p-1 sm:hidden cursor-pointer absolute top-1 left-1 rounded-full bg-blue-600 hover:bg-blue-400' onClick={() => setShowTree(!showTree)}/>
      </div>
    </Spin>
  );
};
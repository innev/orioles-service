'use client'

import { getBookDetail } from '@/service/ebook';
import ToolBar from '@/components/ToolBar';
import { Spin } from '@/components/iv-ui';
import { FALLBACK_IMAGE } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TParams } from './type';

export default ({ pages, origin = 'cloud', goBack }: TParams) => {
  const [ id ] = pages;

  const [thumb, setThumb] = useState<string>(FALLBACK_IMAGE);
  const [title, setTitle] = useState<string>('电子课本');
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    if(!id) return;
    
    getBookDetail(id as string, origin as string).then(bookData => {
      setThumb(bookData?.cover || FALLBACK_IMAGE);
      setTitle(bookData?.name || '电子课本');
      setLoading(true);
    });
  }, [id]);

  return (
    <Spin spinning={loading}>
      <div className="h-full bg-blue-400">
        <div className="absolute bottom-4 left-4">
          <ToolBar type='cd' goBack={goBack} />
        </div>
        <Link href={`/ebook/${id}/module`}>
          <div className="shadow-xl absolute h-4/5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <img src={thumb.startsWith('https://') ? thumb.replace('https://', 'http://') : thumb} alt={title} className="h-full w-full object-cover object-center"/>
          </div>
        </Link>
      </div>
    </Spin>
  );
};
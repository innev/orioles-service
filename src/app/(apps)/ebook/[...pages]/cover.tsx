'use client'

import ToolBar from '@/components/ToolBar';
import { Spin } from '@/components/iv-ui';
import { FALLBACK_IMAGE } from '@/utils';
import Link from 'next/link';
import { TParams } from './type';
import useSWR from 'swr';
import { EBOOK_SERVICE } from '@/service';
import http from '@/utils/http';
import { DBook } from '@/templates/interfaces/IBook';

export default ({ pages, origin = 'cloud', goBack }: TParams) => {
  const [ id ] = pages;
  const { data, error, isLoading } = useSWR<DBook>(`${EBOOK_SERVICE.DETAIL}?id=${id}&origin=${origin}`, http.findOne_);

  return (
    <Spin spinning={!isLoading}>
      <div className="h-full bg-blue-400">
        <div className="absolute bottom-4 left-4">
          <ToolBar type='cd' goBack={goBack} />
        </div>
        <Link href={`/ebook/${id}/module`}>
          <div className="shadow-xl absolute h-4/5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <img src={data?.cover||FALLBACK_IMAGE} alt={data?.name||'电子课本'} className="h-full w-full object-cover object-center"/>
          </div>
        </Link>
      </div>
    </Spin>
  );
};
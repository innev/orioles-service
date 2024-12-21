'use client'

import ModuleCarousel from '@/components/ModuleCarousel';
import ToolBar from '@/components/ToolBar';
import { Spin } from '@/components/iv-ui';
import { DBook } from '@/components/iv-ui/typings/DBook';
import { useEffect, useState } from 'react';
import { TParams } from './type';
import useSWR from 'swr';
import { EBOOK_SERVICE } from '@/service';
import http from '@/utils/http';

export default ({ pages, origin = 'cloud', goBack }: TParams) => {
  const [id] = pages;
  const [height, setHeight] = useState<Number>(0);
  const { data, error, isLoading } = useSWR<DBook>(`${EBOOK_SERVICE.DETAIL}?id=${id}&origin=${origin}`, http.findOne_);

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = document.body.clientHeight / 10 - 9;
      setHeight(newHeight);
    };

    // 在组件挂载后获取DOM元素的高度
    updateHeight();

    // 监听窗口大小变化，动态更新高度
    window.addEventListener('resize', updateHeight);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <Spin spinning={!isLoading}>
      <div className="h-screen w-full overflow-hidden bg-white">
        <div className="absolute bottom-4 left-4">
          <ToolBar type='cd' goBack={goBack} />
        </div>
        <div className="h-full w-full flex flex-1 skew-x-10" style={{ marginLeft: 90 }}>
          <ModuleCarousel modules={data?.modules || []} route={`/ebook/${id}/speech`} />
        </div>
      </div>
    </Spin>
  )
};
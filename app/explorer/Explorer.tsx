'use client'

import { Spin } from '@/components/iv-ui';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState<Boolean>(true);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col w-full px-8 py-4 text-sm gap-6">
        文档管理
      </div>
    </Spin>
  );
};
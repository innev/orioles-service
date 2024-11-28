'use client';

import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from 'swr/infinite';
import { getAuthenticators } from '@/apis/2fa';
import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { Loading } from "../../components/Icons";
import { useEffect, useState } from "react";

const copyName = (text: string) => {
  navigator.clipboard.writeText(text)
  toast(`已复制！`, { position: 'top-right', icon: <code className="px-2 py-1 text-xs bg-gray-100 text-red-500 rounded-md">{text}</code> })
}

const Card = ({ code, name, timeRemaining }: { code: string; name: string; timeRemaining: number }) => {
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer" onClick={() => copyName(code)}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold truncate flex-grow">{code}</h2>
        <span className="text-sm font-medium text-gray-500 ml-2" aria-live="polite">{countdown}秒</span>
      </div>
      <p className="text-gray-600">{name}</p>
    </div>
  );
};

export default () => {
  const limit = 12;
  const getKey = (pageIndex: number, previousPageData: Array<DAuth> | null): { pageIndex: string, pageSize: string } | null => {
    if (previousPageData && !previousPageData.length) return null;
    return { pageIndex: String(pageIndex), pageSize: String(limit) };
  };

  const { data = [], size, setSize } = useSWRInfinite<Array<DAuth>>(getKey, getAuthenticators);
  const flatData = data.flat();
  const dataLength = flatData.length;

  return (
    <InfiniteScroll
      className="container mx-auto p-4"
      dataLength={dataLength}
      next={() => console.debug('Load next')}
      hasMore={false}
      // next={() => setSize(size + 1)}
      // hasMore={dataLength < limit * size}
      loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
    >
      <div className="m-6 grid gap-6 grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {flatData.map((item: DAuth) => (
          <Card key={item.name} {...item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
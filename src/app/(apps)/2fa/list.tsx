'use client';

import toast from "react-hot-toast";
import { DAuth } from '@/components/iv-ui/typings/DAuth';
import { Loading } from "@/components/Icons";
import { useEffect, useState } from "react";
import { AUTHENTICATORS_SERVICE } from "@/service";
import http from "@/utils/http";
import useSWR, { mutate } from "swr";

const copyName = (text: string) => {
  navigator.clipboard.writeText(text)
  toast(`已复制！`, { position: 'top-right', icon: <code className="px-2 py-1 text-xs bg-gray-100 text-red-500 rounded-md">{text}</code> })
}

const Card = ({ code, name, email, countdown }: { code: string; name: string; email: string, countdown: number }) => {
  return (
    <div className="bg-white hover:shadow hover:bg-slate-100 rounded-lg shadow-md p-6 cursor-pointer" onClick={() => copyName(code)}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold truncate flex-grow">{email ? name + "("+ email +")" : name}</h2>
        <span className="text-sm font-medium text-gray-500 ml-2" aria-live="polite">{countdown === -1 ? 30 : countdown}秒</span>
      </div>
    </div>
  );
};

export default () => {
  const { data: _data = {}, error, isLoading } = useSWR<{ timeRemaining: number, data: DAuth[]}>(AUTHENTICATORS_SERVICE.OTPS, http.find_);
  const { timeRemaining = 0, data = [] } = _data as { timeRemaining: number, data: DAuth[]};
  const [countdown, setCountdown] = useState(-1);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if(prevCountdown == -1) {
          return timeRemaining;
        } else if (prevCountdown <= 1) {
          clearInterval(timer);
          mutate(AUTHENTICATORS_SERVICE.OTPS);
          return -1;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data, timeRemaining, isLoading]);

  return (
    <div className="m-6 grid gap-6 grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        isLoading
          ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
          : data.map((item: DAuth) => <Card key={item.name} {...item} countdown={countdown} />)
      }
    </div>
  );
};
'use client';

import { TApp } from '@/model/App';
import { APP_SERVICE } from '@/service';
import http from "@/utils/http";
import { Loading } from '@/components/Icons';
import useSWR from 'swr';
import IconButton from './IconButton';

export default () => {
    const { data: apps = [], error, isLoading } = useSWR<TApp[]>(APP_SERVICE.APPS, http.find_);
    return (
        <div className='flex flex-row flex-wrap p-6 gap-6'>
            {
                isLoading
                    ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
                    : apps.map((app: TApp, index: number) => app.visiable === true &&
                        <IconButton item={app} key={index} />
                    )
            }
        </div>
    );
};
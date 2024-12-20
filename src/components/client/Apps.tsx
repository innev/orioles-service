'use client';

import { TApp } from '@/model/App';
import { APP_SERVICE } from '@/service';
import http from "@/utils/http";
import { Loading } from '@/components/Icons';
import useSWR from 'swr';
import IconButton from './IconButton';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { setShowLoginModal } = useAuth();
    const { data: apps = [], error, isLoading } = useSWR<TApp[]>(APP_SERVICE.APPS, http.find_);

    const searchParams = useSearchParams();
    useEffect(() => {
        const url = searchParams?.get('auth-redirect');
        if(url) {
            if(status === 'authenticated') {
                router.push(url);
            } else if (status === 'unauthenticated') {
                setShowLoginModal(true);
            }
        }
    }, [status, searchParams]);

    return (
        <div className='flex flex-row flex-wrap p-6 gap-2'>
            {
                isLoading
                    ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
                    : apps.map((app: TApp, index: number) => app.visiable === true && <IconButton item={app} key={index} />)
            }
        </div>
    );
};
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

const Apps = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { setShowLoginModal } = useAuth();
    const { data: apps = [], error, isLoading } = useSWR<TApp[]>(`${APP_SERVICE.APPS}?status=${status}`, http.find_);
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = searchParams?.get('auth-redirect');
        // 仅允许站内路径（拒绝 //evil.com 及含 : 的绝对 URL），防开放重定向
        if(url && url.startsWith('/') && !url.startsWith('//') && !url.includes(':')) {
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
                    : apps.map((app: TApp) => app.visiable === true && <IconButton item={app} key={app.url} />)
            }
        </div>
    );
};
export default Apps;

'use client';

import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { TApp } from '@/model/App';
import { APP_SERVICE } from '@/service';
import http from "@/utils/http";
import { Loading } from '@/components/Icons';
import useSWR from 'swr';

export default () => {
    const { showLoginModal, setShowLoginModal } = useAuth();
    const { data: apps = [], error, isLoading } = useSWR<TApp[]>(APP_SERVICE.APPS, http.find_);

    const handleAppClick = (e: React.MouseEvent<HTMLAnchorElement>, app: TApp) => {
        if (app?.requiresAuth) {
            e.preventDefault();
            setShowLoginModal(true);
        }
    }

    //   const handleLoginSuccess = () => {
    //     setShowLoginModal(false)
    //     if (pendingUrl) {
    //       window.location.href = pendingUrl
    //       setPendingUrl(null)
    //     }
    //   }

    return (
        <div className='flex flex-1 flex-row flex-wrap p-8 gap-10'>
            {
                isLoading
                    ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
                    : apps.map((app: TApp, index: number) => app.visiable === true &&
                        <div className='flex flex-col items-center gap-3' key={index}>
                            <Link
                                href={app.url}
                                target={(app.url.startsWith('http://') || app.url.startsWith('https://')) ? '_blank' : '_self'}
                                className='cursor-pointer'
                                onClick={(e) => handleAppClick(e, app)}
                            >
                                <img src={app.icon} alt="" className='w-16 h-16 shadow rounded-2xl' />
                            </Link>
                            <span className='text-gray-800 text-sm'>{app.name}</span>
                        </div>
                    )
            }
        </div>
    );
};
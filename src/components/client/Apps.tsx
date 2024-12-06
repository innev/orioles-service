'use client';

import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getApps } from '@/apis/apps';

interface App {
    name: string
    url: string
    icon: string
    visiable: boolean,
    requiresAuth?: boolean
};

export default () => {
    const { showLoginModal, setShowLoginModal } = useAuth();

    const [ apps, setApps ] = useState<Array<App>|undefined>([]);

    useEffect(() => {
        getApps().then(setApps);
    }, []);
    

    const handleAppClick = (e: React.MouseEvent<HTMLAnchorElement>, app: App) => {
        if (app?.requiresAuth) {
            e.preventDefault()
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
                apps?.map((app: App, index: number) => !app.visiable ? null : (
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
                ))
            }
        </div>
    );
};
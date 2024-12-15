'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { TDockItem } from '@/model/Skills';
import { TApp } from '@/model/App';
import CDN from '@/utils/cdn';
import { useSession } from 'next-auth/react';


export default ({ item, isCDN = false }: { item: TApp|TDockItem, isCDN?: boolean }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { showLoginModal, setShowLoginModal } = useAuth();

    const openApp = (item: TApp|TDockItem) => {
        if (item?.requiresAuth && status !== 'authenticated') {
            setShowLoginModal(true);
        } else if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
            window.open(item.url, '_blank');
        } else {
            router.push(item.url);
        }
    }

    return (
        <div className="icon-card" onClick={() => openApp(item)}>
            <img src={isCDN ? CDN.icon(item.icon) : item.icon} className="icon-image" alt="" />
            <span className='text-sm text-gray-800'>{item.name}</span>
        </div>
    )
}
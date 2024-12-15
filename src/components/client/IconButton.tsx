'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { TDockItem } from '@/model/Skills';
import { DevIconProps } from '@/model/Icon';
import { TApp } from '@/model/App';
import CDN from '@/utils/cdn';


export default ({ item, onOpen, isCDN = false }: { item: TApp|TDockItem, onOpen?: Function, isCDN?: boolean }) => {
    const router = useRouter();
    const { showLoginModal, setShowLoginModal } = useAuth();

    const openApp = (item: TApp|TDockItem) => {
        if (item?.requiresAuth) {
            // setShowLoginModal(true);
            router.push(item.url);
        } else if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
            window.open(item.url, '_blank');
        } else {
            router.push(item.url);
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
        <div className="icon-card" onClick={() => openApp(item)}>
            <img src={isCDN ? CDN.icon(item.icon) : item.icon} className="icon-image" alt="" />
            <span className='text-sm text-gray-800'>{item.name}</span>
        </div>
    )
}
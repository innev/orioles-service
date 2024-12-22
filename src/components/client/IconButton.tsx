'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { TDockItem } from '@/model/Skills';
import { TApp } from '@/model/App';
import CDN from '@/utils/cdn';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { ImageSkeleton } from '@/components/iv-ui';

export default ({ item, isCDN = false }: { item: TApp|TDockItem, isCDN?: boolean }) => {
    const router = useRouter();
    const { status } = useSession();
    const { setShowLoginModal } = useAuth();
    const searchParams = useSearchParams();

    const openApp = (item: TApp|TDockItem) => {
        if (status !== 'authenticated' && (item?.requiresAuth || searchParams?.get('auth-redirect'))) {
            setShowLoginModal(true);
        } else if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
            window.open(item.url, '_blank');
        } else {
            router.push(item.url);
        }
    }

    return (
        <div className="icon-card" onClick={() => openApp(item)}>
            <ImageSkeleton src={isCDN ? CDN.icon(item.icon) : item.icon} />
            <span className='text-sm text-gray-800'>{item.name}</span>
        </div>
    )
}
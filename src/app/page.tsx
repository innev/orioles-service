import FullContainer from '@/components/server/Containers';
import Apps from '@/components/client/Apps';
import { Sider } from '@/components/layouts/OriolesLayout';
import { getUserInfo_ } from '@/model/User';
import { Suspense } from 'react';

export default async () => {
    // 数据库不可达（如 docker build 预渲染）时 userInfo 为 null，用空兜底渲染侧栏
    const userInfo = await getUserInfo_() ?? { UserBrand: [] } as any;
    
    return (
        <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>
                <Sider user={userInfo} />
                <FullContainer>
                    <Suspense fallback={<div className="p-6">加载中...</div>}>
                        <Apps />
                    </Suspense>
                </FullContainer>
            </div>
        </div>
    )
};
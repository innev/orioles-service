import FullContainer from '@/components/server/Containers';
import Apps from '@/components/client/Apps';
import { Sider } from '@/components/layouts/OriolesLayout';
import { getUserInfo_ } from '@/model/User';

export default async () => {
    const userInfo = await getUserInfo_();
    
    return (
        <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>
                <Sider user={userInfo} />
                <FullContainer>
                    <Apps />
                </FullContainer>
            </div>
        </div>
    )
};
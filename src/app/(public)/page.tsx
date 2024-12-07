import { Sider } from '@/components/layouts/OriolesLayout';
import FullContainer from '@/components/server/Containers';
import Apps from '@/components/client/Apps';
import { getSkills } from '@/apis/server/skills';
import { getUserInfo } from '@/apis/server/user';

export default async () => {
    const skills = await getSkills();
    const userInfo = await getUserInfo();
    
    return (
        <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>
                <Sider skills={skills} user={userInfo} />
                <FullContainer>
                    <Apps />
                </FullContainer>
            </div>
        </div>
    )
};
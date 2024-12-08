import { Sider } from '@/components/layouts/OriolesLayout';
import FullContainer from '@/components/server/Containers';
import Apps from '@/components/client/Apps';
import { getSkills } from '@/service/model/Skills';
import { getUserInfo } from '@/service/model/User';
import { getApps } from '@/service/model/App';

export default async () => {
    const skills = await getSkills();
    const userInfo = await getUserInfo();
    const apps = await getApps();

    return (
        <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>
                <Sider skills={skills} user={userInfo} />
                <FullContainer>
                    <Apps apps={apps} />
                </FullContainer>
            </div>
        </div>
    )
};
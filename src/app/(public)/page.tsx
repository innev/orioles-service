import { readFileSync } from 'fs';
import path from "path";
import { Sider } from '@/components/layouts/OriolesLayout';
import FullContainer from '@/components/server/Containers';
import Apps from '@/components/client/Apps';

export default () => {
    // const apps = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/apps.json'), 'utf-8'));
    const userSetting = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/home.json'), 'utf-8'));

    return (
        <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>
                <Sider userSetting={userSetting} />
                <FullContainer>
                    <Apps />
                </FullContainer>
            </div>
        </div>
    )
};
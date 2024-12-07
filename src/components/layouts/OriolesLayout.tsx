import Link from 'next/link';
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from '@/providers/AuthProvider';
import LoginModal from '@/components/LoginModal';
import { Logos } from '@/components/Icons';
import Dock, { TDockItem } from '@/components/client/Dock';
import Toaster from '@/components/client/Toaster';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='zh'>
            <body className="bg-gray-100 min-h-screen w-full">
                <AuthProvider>
                    <div className='min-h-screen mx-auto flex w-full'>
                        {children}
                    </div>
                    <LoginModal />
                </AuthProvider>
                <Toaster />
                <Analytics />
            </body>
        </html>
    )
};

type UserBrand = {
    icon: keyof typeof Logos,
    url: string
};
export type UserInfo = {
    id: string,
    name: string,
    nickname: string,
    email: string,
    avatar: string,
    bio: string,
    UserBrand: Array<UserBrand>
};

export const Sider = ({ skills, user }: { skills: Record<string, TDockItem[]> | undefined, user: UserInfo }) => {
    const { language = [], technical = [], software = [] } = skills||{};
    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-col gap-4 items-center justify-center'>
                <div className='flex flex-col items-center justify-center gap-2 pt-6 pb-2'>
                    <img className="w-28 h-28 rounded-full" src={user.avatar} alt="" />
                    <div className="text-xl font-medium">{user.nickname}</div>
                    <div className='text-gray-500'>
                        <span className='text-sm'>{user.bio}</span>
                    </div>
                </div>
                <div className='flex flex-row gap-3 items-center justify-center text-lg border-t border-gray-200 py-3 w-full'>
                    {
                        user.UserBrand.map((brand: UserBrand) => (
                            <Link href={brand.url} target="_blank" key={brand.url}>
                                {Logos[brand.icon]({ className: 'text-xl text-gray-500/75 hover:text-gray-700' })}
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-row space-x-6 items-center justify-center py-4'>
                {[language, technical, software].map((item, index) => <Dock key={index} children={item}></Dock>)}
            </div>

            <div className='md:flex hidden flex-col items-center space-y-2 text-gray-500 text-xs'>
                <div className='flex flex-row space-x-1'>
                    <Link href='/doc/about'>
                        <span className="hover:text-blue-600 cursor-pointer">关于作者</span>
                    </Link>
                    <span>·</span>
                    <Link href='/doc/jobs'>
                        <span className="hover:text-blue-600 cursor-pointer">工作内推</span>
                    </Link>
                    <span>·</span>
                    <Link href='/doc/links'>
                        <span className="hover:text-blue-600 cursor-pointer">友情链接</span>
                    </Link>
                    <span>·</span>
                    <Link href='/doc/terms'>
                        <span className="hover:text-blue-600 cursor-pointer">用户协议</span>
                    </Link>
                </div>
                <div className='text-center text-gray-400'>
                    <a href="https://github.com/innev" target="_blank">Innev</a> © 2023 All Rights Reserved
                </div>
            </div>
        </div>
    );
};
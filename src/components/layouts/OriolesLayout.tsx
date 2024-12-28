'use client'

import Link from 'next/link';
import { Logos } from '@/components/Icons';
import Dock from '@/components/client/Dock';
import { TDockItem } from '@/model/Skills';
import useSWR from 'swr';
import { LAYOUT_SERVICE } from '@/service';
import http from '@/utils/http';
import AppNav, { TAppNav } from '@/components/server/AppNav';
import FullContainer from '@/components/server/Containers';
import { signOut, useSession } from 'next-auth/react';

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

export const Sider = ({ user }: {  user: UserInfo }) => {
    const { data: session, status } = useSession();
    const { data: skills = { language: [], technical: [], software: [] }, error, isLoading } = useSWR<Record<string, TDockItem[]>>(LAYOUT_SERVICE.SKILLS, http.find_);

    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <div className='content-opacity rounded-lg w-full md:w-72 flex flex-col gap-4 items-center justify-center'>
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
                            <Link href={brand.url} target="_blank" key={brand.icon}>
                                {Logos[brand.icon]({ className: 'text-xl text-gray-500/75 hover:text-gray-700' })}
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className='content-opacity rounded-lg w-full md:w-72 flex flex-row space-x-6 items-center justify-center py-4'>
                {Object.values(skills).map((item, index) => <Dock key={index} children={item}></Dock>)}
            </div>
            
            {
                status === 'authenticated' &&
                <div onClick={() => signOut({ callbackUrl: '/' })} className="text-center cursor-pointer bg-red-600 hover:bg-red-800 px-6 py-2 text-white rounded-md">
                    <span>退出登录</span>
                </div>
            }

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


export const FullContent = ({ paths, children }: {paths: TAppNav, children: React.ReactNode}) => {
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={paths} />
            <FullContainer>
                {children}
            </FullContainer>
        </div>
    )
};
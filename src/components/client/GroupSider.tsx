'use client';

import Link from "next/link";
import { TApp } from "@/model/App";
import IconButton from "@/components/client/IconButton";

export default ({ links }: { links: TApp[] }) => {
    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <div className='content-opacity rounded-lg w-full md:w-80 flex flex-row items-center justify-center p-4'>
                {links.map((app: TApp, index: number) => app.visiable === true && <IconButton item={app} key={index} />)}
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
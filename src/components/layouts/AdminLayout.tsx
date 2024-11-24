import { Breadcrumb, IconButton } from "@/components/iv-ui";
import { AccountIcon, AdjustmentsVerticalIcon, AigregoIcon, CartIcon, ChartIcon, ChatIcon, Cog6Icon, FilesIcon, HomeIcon, SearchIcon } from "@/components/iv-ui/icons";
import { ContainerProps, LayoutProps } from '@/components/iv-ui/typings/Interfaces';
import Head from 'next/head';
import Link from "next/link";

export const Footer = ({ className, ...props }: ContainerProps) => <div />;

export const Sider = ({ className }: ContainerProps) => {
    return (
        <div className={`flex flex-col items-center w-16 h-full overflow-hidden text-indigo-300 bg-indigo-900 ${className || ''}`}>
            <Link href="/admin" className="flex items-center justify-center mt-3">
                <AigregoIcon width={24} height={24} />
            </Link>
            <div className="flex flex-col items-center mt-3 border-t border-gray-700">
                <IconButton size={6} icon={<HomeIcon />} className="p-3" />
                <IconButton size={6} icon={<SearchIcon />} className="p-3" />
                <IconButton size={6} icon={<ChartIcon />} selected={true} className="p-3" />
                <IconButton size={6} icon={<FilesIcon />} className="p-3" />
            </div>
            <div className="flex flex-col items-center mt-2 border-t border-gray-700">
                <IconButton size={6} icon={<CartIcon />} className="p-3" />
                <IconButton size={6} icon={<AdjustmentsVerticalIcon />} className="p-3" />
                <IconButton size={6} icon={<ChatIcon />} news={true} className="p-3" />
            </div>

            <div className="flex flex-col mt-auto">
                <IconButton icon={<AccountIcon />} />
                <IconButton icon={<Cog6Icon />} />
            </div>
        </div>
    );
};

export default ({ breadcrumbs = [ { name: '内容管理', href: '/article', current: true } ], children }: LayoutProps) => {
    return (
        <div className="flex flex-nowrap h-screen">
            <Head>
                <title>管理后台</title>
            </Head>
            
            <Sider />
            <main className="flex flex-col w-full p-4">
                <Breadcrumb main="/admin" pages={breadcrumbs} />
                <div className="mb-auto mt-4">
                    {children}
                </div>
            </main>
        </div>
    );
};
import { ContainerProps } from '@/components/iv-ui/typings/Interfaces';
import Head from 'next/head';

export const Footer = ({ className, ...props }: ContainerProps) => <div />;

export const Sider = ({ className }: ContainerProps) => {
    return (
        <h1 className={`text-6xl text-center ${className || ''}`}>
            电子课本<a className="text-blue-600 no-underline hover:underline focus:underline active:underline" href="#">列表</a>
        </h1>
    );
};

export default ({ children }: ContainerProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center px-2">
            <Head>
                <title>电子课本列表</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main className="py-2">
                <Sider/>
                {children}
            </main>
        </div>
    );
};
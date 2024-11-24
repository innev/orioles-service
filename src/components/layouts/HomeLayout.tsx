import { ContainerProps } from '@/components/iv-ui/typings/Interfaces';
import Head from 'next/head';

export const Footer = ({ className, ...props }: ContainerProps) => <div />;

export const Sider = ({ className }: ContainerProps) => {
    return (
        <h1 className={`text-6xl text-center ${className || ''}`}>
            Recorder with <a className="text-blue-600 no-underline hover:underline focus:underline active:underline" href="#">Wechat!</a>
        </h1>
    );
};

export default ({ children }: ContainerProps) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-2">
            <Head>
                <title>Recorder ASR</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Sider />
                {children}

                {/* <div className="flex flex-wrap items-start justify-start max-w-4xl mt-12">
                    <a className="border border-solid border-gray-300 rounded-lg p-6 m-4 hover:text-blue-600 hover:border-blue-600">
                        <h3 className="text-2xl mb-4">录制输出 &rarr;</h3>
                        <p className="text-xl">{message}</p>
                    </a>
                </div> */}
            </main>
        </div>
    );
};
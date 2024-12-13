import './globals.css';
import './apps.css';
import '../../i18n';
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from '@/providers/AuthProvider';
import LoginModal from '@/components/LoginModal';
import Toaster from '@/components/client/Toaster';
import { getUserInfo } from '@/model/User';

export async function generateMetadata({ params, searchParams }: any) {
  const userInfo = await getUserInfo();
  return {
    title: `${userInfo.name} - 轻量级云原生架构实验室`,
    referrer: 'no-referrer',
    icons: {
      shortcut: 'https://d.innev.cn/favicon/orioles.ico'
    }
  };
}

export default async ({ children }: { children: React.ReactNode }) => {
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
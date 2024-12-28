import './globals.css';
import './apps.css';
import '@/lib/i18n-client';
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from '@/providers/AuthProvider';
import LoginModal from '@/components/LoginModal';
import Toaster from '@/components/client/Toaster';
import { getUserInfo_ } from '@/model/User';

export async function generateMetadata({ params, searchParams }: any) {
  const userInfo = await getUserInfo_();
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
      <body className="min-h-screen w-full bg-svg">
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
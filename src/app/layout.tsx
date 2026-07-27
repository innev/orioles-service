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
    // getUserInfo_ 可能返回 null（用户不存在或库异常），判空兜底避免全站 500
    title: `${userInfo?.name ?? 'Innev'} - 轻量级云原生架构实验室`,
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
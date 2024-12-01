import LoginModal from '@/components/LoginModal';
// import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthProvider } from '@/providers/AuthProvider';
import Toaster from '@/components/client/Toaster';

export const metadata = {
  title: '管理后台',
  referrer: 'no-referrer'
}

export default ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang='zh'>
      <body className="bg-gray-100 min-h-screen w-full">
        <AuthProvider>
          <header>
            {/* <LanguageSwitcher /> */}
          </header>
          <main>{children}</main>
          <LoginModal />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
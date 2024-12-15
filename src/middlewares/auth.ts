import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
// import { decrypt } from '@/app/lib/session';

// 0. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/2fa', '/explorer'];
const publicRoutes = ['/', '/login', '/signup'];
const SIGIN_IN = '/';

export const withPageAuth = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // 1. Auth回调
  if (pathname.startsWith('/api/auth/callback')) {
    return withAuth(request as NextRequestWithAuth, {
      callbacks: {
        authorized: ({ token }) => !!token
      },
    });
  }

  // 2. Check if the current route is protected or public
  const isPublicRoute = publicRoutes.filter(route => route.startsWith(pathname)).length !== 0;
  if(isPublicRoute ) return NextResponse.next();
  
  const isProtectedRoute = protectedRoutes.filter(route => route.startsWith(pathname)).length !== 0;
  // 3. Decrypt the session from the cookie
  // Support session, cookies, headers
  // const token = request.cookies.get('auth-token')?.value;
  // const cookie = request.cookies.get('session')?.value;
  // const session = await decrypt(cookie);
  // const session = request.cookies.get('session')?.value;
  const session = request.cookies.get('next-auth.session-token')?.value;
  
  if (isProtectedRoute && !session) {
    // 重定向到登录页面
    const loginUrl = new URL(SIGIN_IN, request.url);
    loginUrl.searchParams.set('auth-redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
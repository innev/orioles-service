import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

// 0. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/2fa', '/explorer', '/photo', '/video', '/stock', '/fund', '/etf', '/vip', '/ebook'];
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
  if (isPublicRoute) return NextResponse.next();

  const isProtectedRoute = protectedRoutes.filter(route => route.startsWith(pathname)).length !== 0;
  // 3. Decrypt the session from the cookie
  if (isProtectedRoute) {
    const session = await getToken({ req: request });
    if (!session) { // 重定向到登录页面
      const loginUrl = new URL(SIGIN_IN, request.url);
      loginUrl.searchParams.set('auth-redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}
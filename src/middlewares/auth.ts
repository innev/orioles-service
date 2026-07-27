import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

// 0. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/2fa', '/explorer', '/photo', '/video', '/fund', '/etf', '/vip', '/ebook'];
const publicRoutes = ['/', '/login', '/signup'];
const SIGIN_IN = '/';

export const withPageAuth = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // 0. /api/mongo/* 会被 next.config.js rewrite 代理到外部 PROXY_API，必须登录后才可访问
  if (pathname === '/api/mongo' || pathname.startsWith('/api/mongo/')) {
    const session = await getToken({ req });
    if (!session) {
      return NextResponse.json({ code: 401, data: null, message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // 1. Auth回调
  if (pathname.startsWith('/api/auth/callback')) {
    return withAuth(req as NextRequestWithAuth, {
      callbacks: {
        authorized: ({ token }) => !!token
      },
    });
  }

  // 2. Check if the current route is protected or public
  // 注意匹配方向：pathname 是否以路由前缀开头（'/' 只精确匹配，否则会吞掉所有路径）
  const matchRoute = (route: string) =>
    route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(route + '/');
  const isPublicRoute = publicRoutes.some(matchRoute);
  if (isPublicRoute) return NextResponse.next();

  const isProtectedRoute = protectedRoutes.some(matchRoute);
  // 3. Decrypt the session from the cookie
  if (isProtectedRoute) {
    const session = await getToken({ req });
    if (!session) { // 重定向到登录页面
      const loginUrl = new URL(SIGIN_IN, req.url);
      loginUrl.searchParams.set('auth-redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}
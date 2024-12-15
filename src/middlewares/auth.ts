import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { decrypt } from '@/app/lib/session';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/2fa', '/explorer'];
const publicRoutes = ['/login', '/signup', '/'];
const SIGIN_IN = '/';

export const withPageAuth = async (request: NextRequest) => {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.filter(route => route.startsWith(path)).length !== 0;
  const isPublicRoute = publicRoutes.filter(route => route.startsWith(path)).length !== 0;

  // 3. Decrypt the session from the cookie
  // Support session, cookies, headers
  const token = request.cookies.get('auth-token')?.value;
  // const cookie = request.cookies.get('session')?.value;
  // const session = await decrypt(cookie);
  const session = request.cookies.get('session')?.value;

  // if (isProtectedRoute && !token) {
  if (isProtectedRoute && !session) {
    // 重定向到登录页面
    const loginUrl = new URL(SIGIN_IN, request.url);
    loginUrl.searchParams.set('auth-redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
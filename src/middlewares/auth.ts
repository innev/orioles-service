import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { decrypt } from '@/app/lib/session';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/2fa']
const publicRoutes = ['/login', '/signup', '/']

export const withAuth = async (request: NextRequest) => {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.filter(route => route.startsWith(path)).length !== 0;
  const isPublicRoute = publicRoutes.filter(route => route.startsWith(path)).length !== 0;
  // const isProtectedRoute = protectedRoutes.includes(path);
  // const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  // Support session, cookies, headers
  // const token = request.cookies.get('auth-token')?.value;
  // const cookie = request.cookies.get('session')?.value;
  // const session = await decrypt(cookie);
  const session = request.cookies.get('session')?.value;

  // if (isProtectedRoute && !token) {
  if (isProtectedRoute && !session) {
    // 重定向到登录页面
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', path);
    // return NextResponse.redirect(loginUrl);
    return NextResponse.next();
  }

  return NextResponse.next();
}
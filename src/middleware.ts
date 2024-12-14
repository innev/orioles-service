import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { withAuth } from './middlewares/auth';
import { withI18n } from './middlewares/i18n';
import { withRateLimit } from './middlewares/rate-limit';
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
// import withAuth from "next-auth/middleware";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // 1. 速率限制检查
  const rateLimitResponse = withRateLimit(request)
  if (rateLimitResponse.status === 429) return rateLimitResponse
  
  // 2. 认证检查
  // const authResponse = await withAuth(request)
  // if (authResponse.status === 307) return authResponse // 307 是重定向状态码
  
  if (pathname.startsWith('/api/auth')) {
    return withAuth(request as NextRequestWithAuth, {
      callbacks: {
        authorized: ({ token }) => {
          return !!token;
        }
      },
    });
  }
  
  // 3. 国际化处理
  // const i18nResponse = withI18n(request)
  // if (i18nResponse.status === 307) return i18nResponse
  
  // 4. 如果所有中间件都通过，添加一些通用的响应头
  const response = NextResponse.next();
  
  // 添加安全相关的响应头
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if(pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('CDN-Cache-Control', 'no-store, max-age=0');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-store, max-age=0');
  }
  
  return response;
}

// 配置中间件匹配规则
export const config = {
  matcher: [
    // 应用到所有路由
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // 或者指定特定路由
    // '/dashboard/:path*',
    '/api/:path*',
  ],
}


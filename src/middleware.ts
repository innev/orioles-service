import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withPageAuth } from './middlewares/auth';
// import { withI18n } from './middlewares/i18n';
import { withRateLimit } from './middlewares/rate-limit';

// 配置中间件匹配规则
export const config = {
  matcher: [
    // 应用到所有路由
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // 或者指定特定路由
    // '/dashboard/:path*',
    '/api/auth/callback/:path*',
  ],
};


export const middleware = async (request: NextRequest) => {
  // 1. 认证检查
  const authResponse = await withPageAuth(request)
  // 307 是页面重定向，401 是 /api/mongo 未登录，都需要直接返回
  if (authResponse && authResponse.status !== 200) return authResponse;
  
  // 2. 速率限制检查
  const rateLimitResponse = withRateLimit(request);
  if (rateLimitResponse.status === 429) return rateLimitResponse;
  
  // 3. 国际化处理
  // const i18nResponse = withI18n(request);
  // if (i18nResponse.status === 307) return i18nResponse; // 307 是重定向状态码
  
  // 4. 如果所有中间件都通过，添加一些通用的响应头
  const response = NextResponse.next();
  
  // 添加安全相关的响应头
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // 强制 HTTPS（站点已全量启用 HTTPS）
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // 限制浏览器特性权限；microphone 保留 self，项目有语音（NLS/whisper）功能
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
  // 注意：暂不加 CSP —— 项目存在内联脚本/样式与第三方 CDN 资源，配置不当会直接破坏页面

  return response;
}
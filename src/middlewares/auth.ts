import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function withAuth(request: NextRequest) {
  // 获取认证令牌
  const token = request.cookies.get('auth-token')?.value
  
  // 检查是否访问受保护路由
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  
  if (isProtectedRoute && !token) {
    // 重定向到登录页面
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { match } from '@formatjs/intl-localematcher'
// import Negotiator from 'negotiator'

// 支持的语言列表
const locales = ['en', 'zh', 'ja'];
const defaultLocale = 'zh';

// function getLocale(request: NextRequest): string {
//   const negotiatorHeaders: Record<string, string> = {}
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

//   // @ts-ignore locales are readonly
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
//   return match(languages, locales, defaultLocale)
// }

export function withI18n(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 检查路径是否已包含语言代码
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // 获取最佳匹配的语言
  // const locale = getLocale(request)
  const locale = defaultLocale;
  
  // 构建新的 URL，包含语言代码
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  // 保留查询参数
  newUrl.search = request.nextUrl.search
  
  return NextResponse.redirect(newUrl)
}


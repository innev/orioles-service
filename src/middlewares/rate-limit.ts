import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 使用 Map 存储请求记录（生产环境应使用 Redis）
const rateLimit = new Map<string, { count: number; timestamp: number }>()

interface RateLimitConfig {
  limit: number
  window: number // 时间窗口（毫秒）
}

export function withRateLimit(
  request: NextRequest,
  config: RateLimitConfig = { limit: 100, window: 60 * 1000 }
) {
  // 获取客户端 IP
  const ip = request.ip ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
  const now = Date.now()
  
  // 清理过期记录
  const windowStart = now - config.window
  
  const currentLimit = rateLimit.get(ip)
  
  if (!currentLimit || currentLimit.timestamp < windowStart) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return NextResponse.next()
  }
  
  if (currentLimit.count >= config.limit) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: Math.ceil((currentLimit.timestamp + config.window - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((currentLimit.timestamp + config.window - now) / 1000).toString()
        }
      }
    )
  }
  
  currentLimit.count++
  rateLimit.set(ip, currentLimit)
  
  return NextResponse.next()
}


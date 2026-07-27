import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 使用 Map 存储请求记录（进程内存实现，生产环境更推荐使用 Redis）
// 注意：PM2 必须以 fork 模式单进程运行（见 pm2.json），否则各实例限流计数互不同步
const rateLimit = new Map<string, { count: number; timestamp: number }>()

// Map 容量上限：防止伪造大量 IP 把内存打爆
const MAX_ENTRIES = 5000
// 过期条目清理的最小间隔（毫秒）：避免每次请求都全表扫描
const CLEANUP_INTERVAL = 30 * 1000
let lastCleanup = 0

interface RateLimitConfig {
  limit: number
  window: number // 时间窗口（毫秒）
}

// 清理已过期的限流记录
const cleanupExpired = (windowStart: number) => {
  for (const [key, value] of rateLimit) {
    if (value.timestamp < windowStart) rateLimit.delete(key)
  }
}

export const withRateLimit = (
  request: NextRequest,
  config: RateLimitConfig = { limit: 100, window: 60 * 1000 }
) => {
  // 获取客户端 IP
  // 注意：request.ip 在 Next 14 的中间件中通常为 undefined（仅在部分部署平台注入），
  // 这里实际依赖 x-real-ip 请求头 —— 该头可被客户端伪造，
  // 需由网关/Nginx 层覆盖写入保证可信，否则限流可被绕过
  const ip = request.ip ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const now = Date.now();

  const windowStart = now - config.window;

  // 每 CLEANUP_INTERVAL 触发一次过期记录清理（时间戳节流）
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    cleanupExpired(windowStart);
    lastCleanup = now;
  }

  // 容量保护：满了先清理过期记录，仍满则淘汰最旧的记录（Map 按插入顺序迭代）
  if (rateLimit.size >= MAX_ENTRIES && !rateLimit.has(ip)) {
    cleanupExpired(windowStart);
    if (rateLimit.size >= MAX_ENTRIES) {
      const oldestKey = rateLimit.keys().next().value;
      if (oldestKey !== undefined) rateLimit.delete(oldestKey);
    }
  }

  const currentLimit = rateLimit.get(ip);
  
  if (!currentLimit || currentLimit.timestamp < windowStart) {
    rateLimit.set(ip, { count: 1, timestamp: now })
    return NextResponse.next();
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
  
  return NextResponse.next();
}

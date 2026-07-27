# syntax=docker/dockerfile:1

# 多阶段构建：deps（安装依赖）→ build（构建 standalone 产物）→ runner（精简运行时）
# 参考 Next.js 官方 Docker 示例；需要 next.config.js 开启 output: 'standalone'

FROM node:20-alpine AS base
# 部分依赖（如 sharp、prisma 引擎）需要 libc6-compat
RUN apk add --no-cache libc6-compat
# 启用 corepack 以使用 pnpm（版本由 packageManager/锁文件决定，也可在此固定）
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ---- deps：仅安装依赖 ----
FROM base AS deps
# postinstall 会执行 prisma generate，需要 schema 提前就位
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# ---- build：构建 Next.js standalone 产物 ----
FROM base AS build
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 重新生成 Prisma Client（deps 阶段已生成，防御性再跑一次，保证与 node_modules 一致）
RUN pnpm db:gen && pnpm build

# ---- runner：最小运行时镜像 ----
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# standalone 产物只包含按需追踪的 node_modules
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
# prisma schema/迁移文件，供容器内执行 prisma migrate deploy 等运维命令
COPY --from=build /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

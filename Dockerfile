# syntax=docker/dockerfile:1

# 多阶段构建：deps（安装依赖）→ build（构建 standalone 产物）→ runner（精简运行时）
# 参考 Next.js 官方 Docker 示例；需要 next.config.js 开启 output: 'standalone'
# 基础镜像用组织维护的 runtime-node（Alpine 3.24 / musl，Node 24，自带 pnpm/yarn/corepack）。
# FROM 写官方源短名：CI 构建前经强制网络检测命中 <registry>/images 即改写为内部引用
#（内网 livebook:8418 / 外网 code.innev.cn），未命中经 buildkitd.toml 的 docker.io mirrors 回退；
# 本地构建需 docker pull <registry>/images/runtime-node:latest 后重打标签（见上文注释）。

FROM runtime-node:latest AS base
# 部分依赖（如 prisma 引擎、sharp）在 musl 系统需要 libc6-compat
RUN apk add --no-cache libc6-compat
# pnpm 固定 12.9.1，不用 latest——避免大版本漂移破坏构建（此前失败即 pnpm 12 默认阻断
# 依赖构建脚本所致，配套 pnpm-workspace.yaml 的 allowBuilds）
RUN corepack enable && corepack prepare pnpm@12.9.1 --activate || npm install -g pnpm@12.9.1
WORKDIR /app

# ---- deps：仅安装依赖 ----
FROM base AS deps
# postinstall 会执行 prisma generate，需要 schema 提前就位；
# pnpm 12 的 allowBuilds 只认 pnpm-workspace.yaml（package.json 的 pnpm.* 已失效），
# 缺了会报 ERR_PNPM_IGNORED_BUILDS 阻断安装
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# ---- build：构建 Next.js standalone 产物 ----
FROM base AS build
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 构建期静态预渲染会触发 prisma.user 查询，必须给一个格式合法的 DATABASE_URL 占位——
# 仅用于通过 Prisma 校验让 prerender 错误可降级，并不会真连库；运行时由容器环境变量覆盖
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
# 重新生成 Prisma Client（deps 阶段已生成，防御性再跑一次，保证与 node_modules 一致）
RUN pnpm db:gen && pnpm build

# ---- runner：最小运行时镜像 ----
FROM runtime-node:latest AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Alpine 语法创建非 root 运行用户
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs

# standalone 产物只包含按需追踪的 node_modules
# 源码 public/ 权限是 700，必须 chown 给运行用户，否则 USER nextjs 读不到静态资源（EACCES）
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
# prisma schema/迁移文件，供容器内执行 prisma migrate deploy 等运维命令
COPY --from=build /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

# AGENTS.md

> 本文件面向 AI 编码代理，介绍 `orioles-service` 项目的架构、约定与常用命令。阅读本文件前不需要任何项目背景知识。

## 项目概述

`orioles-service`（Innev's Personal Website）是一个基于 **Next.js 14（App Router）+ TypeScript + React 18** 的轻量级全栈个人网站/应用聚合平台。单体仓库内同时包含：

- 门户主页（应用导航、技能展示等）
- 一组独立的小应用（位于 `src/app/(apps)`，如 `2fa`、`ebook`、`etf`、`fund`、`stock`、`explorer`、`nls`、`photo`、`video`、`gitmojis`、`dev-icons` 等）
- 后台管理页（`src/app/admin/dashboard`）
- 股票池监控功能（`src/app/stock-pool`，含自选股、告警、审计日志、市场分析页 `/stock-pool/analysis`）
- A 股行情同步与分析（每日收盘后定时同步全市场日线、底部/顶部放量信号、筹码分布、快讯舆情关联，API 在 `src/app/api/ashare`）
- 全部后端 API（`src/app/api`，另有少量 Pages Router 遗留 API 在 `src/pages/api`）

### 技术栈

- **框架**: Next.js 14.2（App Router 为主，Pages Router 仅用于 `/api/wechat` 等遗留接口）、React 18.2、TypeScript ~5.0
- **数据库**: MySQL（TiDB）+ Prisma 6（`relationMode = "prisma"`，不建外键）；另有通过 HTTP 代理访问的 MongoDB Atlas Data API（`/api/mongo/*` 由 `next.config.js` 重写转发到 `PROXY_API`）
- **认证**: NextAuth 4（GitHub / Google / Credentials 三种 provider，JWT session 策略）
- **UI**: Tailwind CSS 3、Radix UI / Headless UI、lucide-react、framer-motion、recharts（antd 与 Less 主题链已移除）
- **国际化**: i18next + react-i18next，语言包在 `public/locales/{en,zh}`
- **数据获取**: SWR、axios
- **第三方服务**: 阿里云 OSS / NLS（语音识别合成）、七牛云、企业微信（`@wecom/crypto`、`@wecom/jssdk`）、Telegram Bot、OpenAI / Whisper（经 `@gradio/client`）、otplib（2FA）、nodemailer
- **包管理**: **pnpm**（存在 `pnpm-lock.yaml`）

## 构建与运行

```shell
pnpm install        # 安装依赖（postinstall 会自动执行 prisma generate）
pnpm dev            # 本地开发，默认 http://localhost:3000
pnpm build          # 生产构建
pnpm start          # 启动生产服务
```

### 数据库（Prisma）常用命令

```shell
pnpm db:gen              # prisma generate
pnpm db:migrate:model    # prisma migrate dev --name add_new_model
pnpm db:migrate:create   # prisma migrate dev --create-only
pnpm db:migrate:deploy   # prisma migrate deploy（生产环境）
pnpm db:push             # prisma db push
pnpm db:pull             # prisma db pull
pnpm db:view             # prisma studio
pnpm seed                # 执行 prisma/seed.js
pnpm db:export           # 导出数据（prisma/export-data.js）
pnpm db:import           # 导入数据（prisma/import-data.js）
```

Schema 位于 `prisma/schema.prisma`，迁移文件在 `prisma/migrations/`。主要模型：`User`、`Session`、`App`、`Skills`、`Video`、`Stock`、`Device`/`DeviceService`、`OneTimePassword`，股票池相关的 `Watchlist`、`AuditLog`、`AlertHistory`，以及 A 股分析相关的 `StockBasic`、`StockDaily`、`StockSignal`、`NewsFlash`（带 `@@map` 蛇形表名）。注意：历史库存在 db push 漂移（`Device`/`DeviceService` 不在迁移历史中），`migrate dev` 会因漂移要求 reset，**不要 reset**；新增表用手写迁移 SQL + `prisma db execute` + `migrate resolve --applied` 的方式（参见 `20260727120000_add_ashare_analysis_models`）。

### 环境变量

复制 `.env.example` 为 `.env` 并按需填写。关键变量：`DATABASE_URL`（MySQL/TiDB）、`NEXTAUTH_SECRET`、`GITHUB_CLIENT_ID/SECRET`、`GOOGLE_CLIENT_ID/SECRET`、MongoDB（`MONGODB_API` 等）、`PROXY_API`（Mongo 代理）、阿里云 OSS / NLS、七牛云、企业微信、CDN_HOST、`CRON_SECRET`（手动触发 `/api/ashare/sync` 的 Bearer 密钥）等。`.env` 已在 `.gitignore` 中，**不要提交**。

## 目录结构与模块划分

```
src/
├── app/                  # App Router 页面与 API
│   ├── (apps)/           # 路由分组：各小应用页面（2fa、ebook、stock、etf、fund、explorer、nls、photo、video、gitmojis、dev-icons、cncf、qy-wechat、reports、vip、doc、github、rainbow 等）
│   ├── admin/            # 后台管理（dashboard）
│   ├── api/              # App Router API 路由（auth、apps、skills、stocks、ashare(A股同步/信号/筹码/快讯)、videos、2fa、ebook、esp、etf2、explorer、icons、nls、telegram、whisper、kf、mongo_backup、docs 等）
│   ├── login/            # 登录页
│   ├── stock-pool/       # 股票池页面及其 api/，含 analysis/ 市场分析页
│   ├── layout.tsx / page.tsx / globals.css / apps.css
├── instrumentation.ts    # Node 启动钩子（register()），注册 node-cron 定时任务（scheduler.ts）
├── pages/api/            # Pages Router 遗留 API（wechat）
├── model/                # 数据访问层：每个 Prisma 模型对应一个文件（User.ts、Stock.ts、StockBasic/StockDaily/StockSignal/NewsFlash 等），直接调用 @/lib/prisma
├── lib/                  # 基础设施：prisma.ts（单例客户端，唯一 PrismaClient 来源）、auth.ts（NextAuth 配置）、realtime.ts / realtime-sources.ts（行情）、eastmoney.ts（东财采集）、technical.ts、alerts.ts、feishu.ts、scheduler.ts（node-cron）、jobs/（sync-daily、sync-news、check-alerts）、analysis/（volume-signals、chip-distribution）、i18n-*.ts
├── service/              # 前端调用的 API 路径常量与封装（index.ts、aliyun.ts、wechat.ts）
├── components/           # React 组件（client/、server/、ui/、iv-ui/、stock-pool/、layouts/ 等）
├── hooks/                # 自定义 hooks
├── middlewares/          # 中间件实现：auth.ts（页面鉴权）、rate-limit.ts（限流）、i18n.ts（已停用）
├── middleware.ts         # Next.js 中间件入口，串联上述中间件并设置安全响应头
├── providers/            # React Provider（AuthProvider.tsx）
├── templates/            # ebook 相关的数据模板（Book、BookPage、PDFTextContent）
├── types/                # 类型定义（如 stock-pool）
└── utils/                # 工具函数（api-response、fetch/request/http、alioss、NLSClient、voice、constants 等）
prisma/                   # schema、migrations、seed、数据导入导出脚本
public/                   # 静态资源、locales（en/zh 语言包）、data
test/                     # REST Client 格式的 .http 测试文件
```

路径别名：`@/*` → `./src/*`（见 `tsconfig.json`）。

## 架构要点

- **API 响应约定**：API 路由统一返回 `{ code, data, message }` JSON 结构；错误处理使用 `@/utils/api-response` 的 `handleApiError`。依赖 `searchParams` 的路由需声明 `export const dynamic = 'force-dynamic'`（参见 `src/app/api/stocks/route.ts`）。
- **数据访问**：在 `src/model/*.ts` 中写数据访问函数，直接 import `@/lib/prisma`（开发环境下挂在 `global` 上避免热重载创建多个实例）。`src/lib/db.ts` 中的 `initDb()` / `query()` 仅为兼容旧代码的封装，新代码请直接使用 prisma。
- **认证与鉴权**：
  - NextAuth 配置在 `src/lib/auth.ts`，JWT session，登录通过 Credentials（邮箱+密码，`src/model/User.ts` 的 `userLogin`）或 GitHub/Google OAuth；`signIn` 回调要求用户必须已存在于数据库。
  - 页面级鉴权在 `src/middlewares/auth.ts`：`protectedRoutes`（`/dashboard`、`/2fa`、`/explorer`、`/photo`、`/video`、`/stock`、`/fund`、`/etf`、`/vip`、`/ebook`）未登录会 307 重定向到 `/` 并带 `auth-redirect` 参数。
  - `src/middleware.ts` 还包含 IP 限流（`middlewares/rate-limit.ts`）和安全响应头（`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy`）。
- **URL 重写**：`next.config.js` 中配置了多个 rewrite：`/api/mongo/*` → 外部代理、`/wechat/*` → `/api/wechat/*`、`/categories/*`、`/subscriptions/*`、`/api/ali-token`、`/api/etf`（转发到上交所行情接口）。修改时同步更新该文件。
- **定时任务（node-cron）**：`src/instrumentation.ts` 的 `register()`（需 `experimental.instrumentationHook: true`）在 Node 运行时启动 `src/lib/scheduler.ts`：15:30（Asia/Shanghai）周一~周五执行收盘同步链（日线→放量信号→告警检查），盘中每 5 分钟告警检查，每 30 分钟快讯抓取。依赖 PM2 fork 单进程；`globalThis` 标记防重复注册。手动触发：`POST /api/ashare/sync?type=daily|news|signals|all`（登录 session 或 `Authorization: Bearer $CRON_SECRET`）。
- **A 股数据链路**：`src/lib/eastmoney.ts`（东财 clist 快照/push2his K 线，均带多镜像降级，K 线最终兜底腾讯 ifzq.gtimg.cn——该源无换手率/成交额；注意东财高频请求会临时封 IP，回补并发 2 + 批间 800ms）→ `src/lib/jobs/sync-daily.ts`（清单+快照+历史回补，幂等；支持 `onlyBackfillCodes` 指定回补）→ `src/lib/analysis/`（`volume-signals.ts` 底部/顶部放量落 `stock_signal`；`chip-distribution.ts` 三角衰减近似筹码分布，实时计算不落库）→ `src/lib/jobs/sync-news.ts`（见闻/选股宝快讯落 `news_flash`，按股票名称关键词匹配关联 codes，跳过含「退」的退市整理股）。Prisma 模型：`StockBasic`/`StockDaily`/`StockSignal`/`NewsFlash`。注意：东财 volume 单位为「手」，新浪实时量为「股」（`check-alerts.ts` 已做 ×100 适配）；TiDB 跨洋 RTT 高，批量写一律用 `createMany(skipDuplicates)` 而非逐条 upsert。
- **样式**：Tailwind（`tailwind.config.ts`）。

## 代码风格约定

- TypeScript strict 模式，开启了 `noUncheckedIndexedAccess`（注意处理索引访问的 `undefined`）。
- 代码注释**中英文混用，以中文为主**；新代码可沿用中文注释。
- 命名：模型层函数用驼峰（如 `getStocks`、`userLogin`）；Prisma 模型字段中有历史遗留拼写 `visiable`（注意不是 `visible`），修改相关代码时保持一致。
- ESLint 配置为根目录 `.eslintrc.json`（`extends: next/core-web-vitals`），用 `pnpm exec next lint` 运行；现存大量历史告警/错误（以 `react/display-name`、`import/no-anonymous-default-export` 为主），未强制清零。没有配置 prettier，请跟随周边代码的现有格式。
- 组件按目录分层：纯客户端组件放 `components/client/`，服务端组件放 `components/server/`。

## 测试说明

- **没有单元测试框架**（无 jest/vitest 依赖与配置）。
- 接口测试使用 `test/` 目录下的 `.http` 文件（VS Code REST Client 格式），如 `test/api-esp.http`，可切换 `@base` 指向本地或线上环境。
- 修改后至少用 `pnpm build` 验证编译与类型检查通过（Next.js build 会执行 TS 检查）。

## 部署

- **PM2（主要方式）**：`pm2.json` 定义了 `Orioles-Service` 应用（`pnpm start`，端口 3000，`fork` 模式单实例 —— 内存限流依赖单进程，日志输出到 `./logs/`）。线上地址：https://orioles.innev.cn。
- **Vercel**：`vercel.json` 仅为 `src/pages/api/**/*.ts` 设置了 `maxDuration: 9`。
- **Docker**：`Dockerfile` 为 node:20-alpine + corepack/pnpm 多阶段构建（deps → build → runner），依赖 `next.config.js` 的 `output: 'standalone'`，运行时 `node server.js`。

## 安全注意事项

- 永远不要提交 `.env` 或任何密钥；`.env.example` 列出了全部所需变量名（无值）。
- 用户密码加盐哈希存储（`password` + `passwordSalt`，见 `src/lib/hashPassword.ts`）；OTP 使用 otplib。
- 企业微信回调使用 `@wecom/crypto` 解密校验；不要改动签名校验逻辑而不验证回调连通性。
- 新增受保护页面时，记得同步 `src/middlewares/auth.ts` 的 `protectedRoutes`。
- API 中处理外部输入（股票代码、文件上传、WeChat/Telegram 回调）时注意校验；`handleApiError` 负责统一错误输出，不要直接向前端抛原始异常堆栈。

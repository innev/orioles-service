import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from 'next-auth/providers/credentials';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { getUserInfo_, userLogin } from "@/model/User";

// OAuth（GitHub/Google）的服务端出站请求：openid-client 默认 3500ms 超时在国内网络下经常不够，
// 放宽到 10s；如设置了 HTTPS_PROXY/HTTP_PROXY 则走代理（Node 不读系统代理，需显式配置）。
// next-auth v4 的 httpOptions 需按 provider 配置（deep-merge 进 provider 默认值）
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
const proxyAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;
const oauthHttpOptions = {
    timeout: 10000,
    // openid-client 的 agent 直接取 http.Agent 实例（OAuth 端点均为 https，CONNECT 隧道由 HttpsProxyAgent 处理）
    ...(proxyAgent ? { agent: proxyAgent } : {})
};

export const authOptions: NextAuthOptions = {
    providers: [
        // DiscordProvider({
        //     clientId: process.env.DISCORD_CLIENT_ID!,
        //     clientSecret: process.env.DISCORD_CLIENT_SECRET!
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            httpOptions: oauthHttpOptions
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: oauthHttpOptions
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                return userLogin(credentials||{ email: '', password: ''});
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: '/api/auth/signin',
        signOut: '/api/auth/signout',
        error: '/api/auth/error',
        verifyRequest: '/api/auth/verify-request',
        newUser: '/api/auth/new-user'
    },
    debug: process.env.NODE_ENV !== 'production',
    callbacks: {
        async signIn({ user, account, profile }) {
            const userInfo = await getUserInfo_(user?.email || '');
            if (!userInfo) {
                return false;
            }
            user.id = userInfo.id;
            return true;
        },
        jwt({ token, user, account, profile, isNewUser, trigger, session }) {
            // trigger: "signIn" | "signUp" | "update"
            if (trigger === "update" && session?.user?.name) token.name = session.user.name;
            if (user) token.id = user.id;
            if (account?.provider && ["keycloak", "github"].includes(account.provider) && account.access_token) {
                token.accessToken = account.access_token;
                token.provider = account.provider;
            }
            return token;
        },
        session({ session, token }) {
            // session.user.id = token.id;
            // session.accessToken = token.accessToken;
            // session.provider = token.provider;
            return session;
        }
    }
};
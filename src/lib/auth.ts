import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { getUserInfo_ } from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        // DiscordProvider({
        //     clientId: process.env.DISCORD_CLIENT_ID!,
        //     clientSecret: process.env.DISCORD_CLIENT_SECRET!
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
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
            const userInfo = await getUserInfo_(user?.email||'');
            if(!userInfo) {
                return false;
            }
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
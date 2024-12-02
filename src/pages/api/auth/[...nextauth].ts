import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.debug("signIn:", user, account, profile, email, credentials);
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        return false
      }
    },
    jwt({ token, trigger, session, account }) {
      console.debug("jwt:", token, trigger, session, account);
      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name
      }
      if (account?.provider === "keycloak" && account.access_token) {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    }
  }
});
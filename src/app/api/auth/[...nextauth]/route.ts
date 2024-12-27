import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
// export default handler; // 这里用在 pages/api/auth/[...nextauth].ts 中
export { handler as GET, handler as POST };
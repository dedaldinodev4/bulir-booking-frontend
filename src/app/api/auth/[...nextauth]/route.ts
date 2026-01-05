import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { env } from "@/env";

export const authOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        data: { label: "User", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${env.API_BOOKING}/auth/login`, {
            data: credentials?.data,
            password: credentials?.password,
          });

          const currentUser = response.data;

          if (currentUser && currentUser.token) {
            return {
              id: currentUser.user.id,
              email: currentUser.user.email,
              role: currentUser.user.role,
              accessToken: currentUser.token,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        data: { label: "Data", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.data || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const res = await fetch(
          `${process.env.API_BOOKING}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: credentials.data,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Credenciais inválidas");
        }

        const data = (await res.json()) as {
          token: string;
          user: {
            id: string;
            name: string;
            email: string;
            identify: string;
            role: "ADMIN" | "CLIENT" | "PROVIDER";
          };
          expiresIn: number;
        };

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          identify: data.user.identify,
          accessToken: data.token,
          expiresIn: data.expiresIn,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.identify = (user as any).identify;
        token.expiresIn = (user as any).expiresIn;
        token.sub = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      session.user = {
        id: token.sub as string,
        email: session.user.email!,
        name: session.user.name!,
        role: token.role as any,
        identify: token.identify as string,
      };

      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
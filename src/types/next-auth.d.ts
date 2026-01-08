import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      identify: string;
      role: "ADMIN" | "CLIENT" | "PROVIDER";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: "ADMIN" | "CLIENT" | "PROVIDER";
    identify: string;
    expiresIn: number;
  }
}

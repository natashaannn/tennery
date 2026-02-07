import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      unitNumber?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    unitNumber?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    unitNumber?: string;
  }
}

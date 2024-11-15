// types/next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  // If you're also using JWT and want to add id to the token
  interface JWT {
    id?: string;
  }

  // If you need to extend the user type as well
  interface User {
    id: string;
  }
}

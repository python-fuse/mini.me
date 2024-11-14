import NextAuth, { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";

export const OPTIONS: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    Google({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // fetch id from db where email = user.email
      const dbUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (session.user && dbUser) {
        session.user.id = dbUser.id;
      }
      return session;
    },
  },
};

export const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };

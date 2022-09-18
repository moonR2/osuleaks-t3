import NextAuth, { type NextAuthOptions } from "next-auth";
import OsuProvider from "next-auth/providers/osu";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    OsuProvider({
      clientId: env.OSU_CLIENT_ID,
      clientSecret: env.OSU_CLIENT_SECRET 
    })
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);

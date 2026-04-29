import { NextAuthOptions } from "next-auth";

// Simplified auth configuration for frontend-only mode
// Database and authentication providers removed
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    // All providers removed for frontend-only mode
    // OAuth providers (GitHub, Google) and Email provider require backend/database
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token?.id as string,
          },
        };
      }
      return session;
    },
  },
};

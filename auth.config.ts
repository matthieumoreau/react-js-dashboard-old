import CredentialsProvider from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"

export const authConfig = {  
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {

        console.log("dfssf", credentials )
        const authResponse = await fetch("https://freddy.codesubmit.io/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        console.log("authResponse", authResponse)


        if (!authResponse.ok) {

          return null;
        }

        const user = await authResponse.json();

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
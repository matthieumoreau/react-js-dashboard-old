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
    
    jwt: async ({ token, user }) => {
      // user is only available the first time a user signs in authorized
       if (user) {
         return {
           ...token, ...user
         };
       }
       return token;
     },
     session: async ({ session, token }) => {    
      const accessTokenData = JSON.parse(atob(token.access_token.split(".")?.at(1)));
      token.accessTokenExpires = accessTokenData.exp;
      session.accessToken = token?.access_token;
      session.token = token?.token;

       return session;
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

        if (!authResponse.ok) {

          return null;
        }

        const user = await authResponse.json();

        console.log("user", user)

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
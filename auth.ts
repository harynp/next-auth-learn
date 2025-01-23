import NextAuth from "next-auth";
import Credential from 'next-auth/providers/credentials';
import { signInSchema } from "./lib/zod";
import { NextResponse } from 'next/server';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credential({
      credentials: {
        email: {label: "Email", type: "email", placeholder: 'john@doe.com'},
        password: {label: "Password", type: "password", placeholder: "Password"}
      },
      async authorize(credentials) {
        let user = null;

        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        user = {
          id: '1',
          name: 'Hary Nugraha putra',
          email: 'harynugrahaputra@gmail.com'
        }

        if(!user) {
          console.log('Invalid credentials');
          return null;
        }

        return user;
      }
    }),

  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn && nextUrl.pathname === '/auth/signin') {
        return NextResponse.redirect(new URL('/', nextUrl));
      }

      // if (!isLoggedIn && nextUrl.pathname.startsWith('/payment')) {
      //   return NextResponse.redirect(new URL('/auth/signin', nextUrl));
      // }

      if (!isLoggedIn && nextUrl.pathname.startsWith('/payment')) {
        const redirectUrl = nextUrl.pathname + nextUrl.search;
        const loginUrl = new URL('/auth/signin', nextUrl);
        loginUrl.searchParams.set('redirect', redirectUrl); // Store the intended URL
        return NextResponse.redirect(loginUrl); // Redirect to login with the redirect URL
      }


      return true;
    },
  },
})

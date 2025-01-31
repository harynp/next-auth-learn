import NextAuth from "next-auth";
import Credential from 'next-auth/providers/credentials';
import { signInSchema } from "./lib/zod";

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
          email: 'harynugrahaputra@gmail.com',
          accessToken: '1234567890',
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
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isProtectedRoute = nextUrl.pathname.startsWith('/payment') || nextUrl.pathname.startsWith('/profile');
    //   if (isLoggedIn && nextUrl.pathname === '/auth/signin') {
    //     return NextResponse.redirect(new URL('/', nextUrl));
    //   }

    //   if (!isLoggedIn && isProtectedRoute) {
    //     const redirectUrl = nextUrl.pathname + nextUrl.search;
    //     const loginUrl = new URL('/auth/signin', nextUrl);
    //     loginUrl.searchParams.set('redirect', redirectUrl);
    //     return NextResponse.redirect(loginUrl);
    //   }

    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
})

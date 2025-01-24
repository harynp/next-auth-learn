// export { auth as middleware } from '@/auth';
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Jika pengguna sudah login dan mengakses halaman login, redirect ke halaman utama
  if (token && pathname === '/auth/signin') {
    return NextResponse.rewrite(new URL('/', req.url));
  }

  // Jika pengguna tidak login dan mencoba mengakses halaman yang dilindungi
  const protectedRoutes = ['/profile', '/payment'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/auth/signin', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.rewrite(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/payment/:path*',
    '/auth/signin',
  ],
};

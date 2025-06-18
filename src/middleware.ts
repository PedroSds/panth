
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ADMIN_AUTH_COOKIE_NAME } from '@/lib/authConstants';

export function middleware(request: NextRequest) {
  const adminAuthCookie = request.cookies.get(ADMIN_AUTH_COOKIE_NAME);
  const authSecretValue = process.env.AUTH_SECRET_VALUE;

  const { pathname } = request.nextUrl;

  // If critical env vars are missing, block admin access entirely
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !authSecretValue) {
    if (pathname.startsWith('/admin')) {
        console.error('CRITICAL: Admin authentication environment variables are not set. Denying access to /admin.');
        // For all /admin paths, if env vars are missing, show an error or redirect to a generic error page.
        // Here, redirecting to homepage as a safe fallback.
        if (pathname !== '/') {
             return NextResponse.redirect(new URL('/', request.url));
        }
    }
    return NextResponse.next();
  }
  
  const isAuthenticated = adminAuthCookie?.value === authSecretValue;

  // If trying to access /admin or its sub-paths (excluding /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isAuthenticated) {
      // Not authenticated, redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If trying to access /admin/login
  if (pathname === '/admin/login') {
    if (isAuthenticated) {
      // Already authenticated, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};

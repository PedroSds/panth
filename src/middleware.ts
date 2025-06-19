
import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { ADMIN_AUTH_COOKIE_NAME, AUTH_SECRET_VALUE_ENV } from '@/lib/authConstants';

const secretKey = process.env[AUTH_SECRET_VALUE_ENV];
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminCookie = request.cookies.get(ADMIN_AUTH_COOKIE_NAME);

  if (!encodedKey) {
    // This is a critical server misconfiguration.
    // Log it and redirect to login, but admin functionality will be broken.
    console.error('CRITICAL: AUTH_SECRET_VALUE_ENV is not set or empty. Admin authentication is disabled.');
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const response = NextResponse.redirect(new URL('/admin/login?error=config', request.url));
        response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' }); // Clear any existing cookie
        return response;
    }
    return NextResponse.next();
  }

  // If trying to access any /admin page (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminCookie || !adminCookie.value) {
      // No cookie, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the cookie
      await jwtVerify(adminCookie.value, encodedKey, { algorithms: ['HS256'] });
      // Valid token, allow access
      return NextResponse.next();
    } catch (error) {
      // Invalid token (expired, tampered, etc.)
      console.warn('Middleware - Invalid admin token:', error instanceof Error ? error.message : error);
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      // Clear the invalid cookie
      response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
      return response;
    }
  }

  // If trying to access /admin/login
  if (pathname === '/admin/login') {
    if (adminCookie && adminCookie.value) {
      try {
        // Check if already logged in
        await jwtVerify(adminCookie.value, encodedKey, { algorithms: ['HS256'] });
        // Already logged in, redirect to admin dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (error) {
        // Token is invalid, allow access to login page but clear the bad cookie
        const response = NextResponse.next();
        response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
        return response;
      }
    }
    // No cookie or invalid cookie, allow access to login page
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};


import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { ADMIN_AUTH_COOKIE_NAME, AUTH_SECRET_VALUE_ENV } from '@/lib/authConstants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminCookie = request.cookies.get(ADMIN_AUTH_COOKIE_NAME);

  const secretKey = process.env[AUTH_SECRET_VALUE_ENV];
  console.log(`Middleware: Pathname: ${pathname}`);
  console.log(`Middleware: ${AUTH_SECRET_VALUE_ENV} set?`, secretKey ? "Yes" : "No");
  console.log("Middleware: Admin cookie present?", adminCookie && adminCookie.value ? "Yes" : "No");


  if (!secretKey) {
    console.error(`CRITICAL (Middleware): ${AUTH_SECRET_VALUE_ENV} is not set or empty. Admin authentication is disabled.`);
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const response = NextResponse.redirect(new URL('/admin/login?error=config_secret_missing', request.url));
        response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
        return response;
    }
    return NextResponse.next();
  }

  const encodedKey = new TextEncoder().encode(secretKey); // Agora secretKey é confirmado que existe

  // Se tentando acessar qualquer página /admin (exceto /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminCookie || !adminCookie.value) {
      console.log("Middleware: No admin cookie, redirecting to login for path:", pathname);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(adminCookie.value, encodedKey, { algorithms: ['HS256'] });
      console.log("Middleware: Token verified, allowing access to:", pathname);
      return NextResponse.next();
    } catch (error) {
      console.warn('Middleware: Invalid admin token:', error instanceof Error ? error.message : String(error), "Redirecting to login.");
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
      return response;
    }
  }

  // Se tentando acessar /admin/login
  if (pathname === '/admin/login') {
    if (adminCookie && adminCookie.value) {
      try {
        await jwtVerify(adminCookie.value, encodedKey, { algorithms: ['HS256'] });
        console.log("Middleware: User already logged in, redirecting from /admin/login to /admin");
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (error) {
        console.warn('Middleware: Invalid token on /admin/login access attempt, clearing cookie and allowing access to login page.');
        const response = NextResponse.next();
        response.cookies.set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
        return response;
      }
    }
    console.log("Middleware: No valid cookie, allowing access to /admin/login");
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};

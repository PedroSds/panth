// This file has been removed as part of the static site export conversion.
// Middleware for admin authentication is not compatible with a static export.

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Middleware execution skipped for static export.");
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'], // This will no longer have an effect
};


'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';
import { ADMIN_AUTH_COOKIE_NAME, ADMIN_USERNAME_ENV, ADMIN_PASSWORD_ENV, AUTH_SECRET_VALUE_ENV } from '@/lib/authConstants';

const secretKey = process.env[AUTH_SECRET_VALUE_ENV];
const encodedKey = new TextEncoder().encode(secretKey);

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!secretKey) {
    console.error('AUTH_SECRET_VALUE is not set.');
    return { error: 'Server configuration error.' };
  }
  
  if (!process.env[ADMIN_USERNAME_ENV] || !process.env[ADMIN_PASSWORD_ENV]) {
    console.error('ADMIN_USERNAME or ADMIN_PASSWORD environment variables are not set.');
    return { error: 'Admin credentials not configured on the server.' };
  }

  if (username === process.env[ADMIN_USERNAME_ENV] && password === process.env[ADMIN_PASSWORD_ENV]) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(encodedKey);

    cookies().set(ADMIN_AUTH_COOKIE_NAME, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      path: '/',
      sameSite: 'lax',
    });
    redirect('/admin');
  } else {
    return { error: 'Invalid username or password' };
  }
}

export async function logout() {
  cookies().set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
  redirect('/admin/login');
}

export async function verifySession() {
  const cookie = cookies().get(ADMIN_AUTH_COOKIE_NAME)?.value;
  if (!cookie || !secretKey) {
    return null;
  }
  if (!encodedKey) { // Should be caught by !secretKey check, but defensive
    console.error("Encoded key for JWT verification is not available.");
    return null;
  }
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
}

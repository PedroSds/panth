
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_AUTH_COOKIE_NAME } from '@/lib/authConstants';

export interface LoginFormState {
  message: string;
  success: boolean;
}

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authSecretValue = process.env.AUTH_SECRET_VALUE;

  if (!adminUsername || !adminPassword || !authSecretValue) {
    console.error('Authentication environment variables are not set.');
    return { message: 'Server configuration error.', success: false };
  }

  if (username === adminUsername && password === adminPassword) {
    cookies().set(ADMIN_AUTH_COOKIE_NAME, authSecretValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    redirect('/admin');
    // Redirect might not immediately stop execution here,
    // but a success state is good practice if redirect was conditional.
    // However, since redirect() throws an error, this part is technically unreachable.
    // return { message: 'Login successful!', success: true }; 
  } else {
    return { message: 'Invalid username or password.', success: false };
  }
}

export async function logoutAction() {
  cookies().delete(ADMIN_AUTH_COOKIE_NAME);
  redirect('/admin/login');
}

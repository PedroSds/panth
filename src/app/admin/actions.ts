'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';
import { ADMIN_AUTH_COOKIE_NAME, ADMIN_USERNAME_ENV, ADMIN_PASSWORD_ENV, AUTH_SECRET_VALUE_ENV } from '@/lib/authConstants';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  console.log("--- Admin Login Attempt ---");
  console.log("Form Username:", username);
  // Não logamos a senha do formulário diretamente por segurança, mas verificamos se foi recebida.
  console.log("Form Password received:", password ? "Yes" : "No");

  const envAdminUser = process.env[ADMIN_USERNAME_ENV];
  const envAdminPass = process.env[ADMIN_PASSWORD_ENV];
  const secretKey = process.env[AUTH_SECRET_VALUE_ENV];

  console.log(`Env ${ADMIN_USERNAME_ENV}:`, envAdminUser);
  console.log(`Env ${ADMIN_PASSWORD_ENV} set:`, envAdminPass ? "Yes" : "No");
  console.log(`Env ${AUTH_SECRET_VALUE_ENV} set:`, secretKey ? "Yes" : "No");

  if (!secretKey) {
    console.error('Login Action Error: AUTH_SECRET_VALUE is not set.');
    return { error: 'Server configuration error (secret missing).' };
  }
  
  if (!envAdminUser || !envAdminPass) {
    console.error('Login Action Error: ADMIN_USERNAME or ADMIN_PASSWORD environment variables are not set.');
    return { error: 'Admin credentials not configured on the server.' };
  }

  const isMatch = username === envAdminUser && password === envAdminPass;
  console.log("Credentials match attempt:", isMatch, `(FormUser: ${username} === EnvUser: ${envAdminUser} && FormPass === EnvPass)`);


  if (isMatch) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    let session;
    try {
        const encodedKey = new TextEncoder().encode(secretKey); // Codificar aqui, secretKey já validado
        session = await new SignJWT({ username })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime(expiresAt)
          .sign(encodedKey);
    } catch (e) {
        console.error("Error signing JWT:", e);
        return { error: "Failed to create session (JWT signing error)." };
    }

    cookies().set(ADMIN_AUTH_COOKIE_NAME, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      path: '/',
      sameSite: 'lax',
    });
    console.log("Login successful, redirecting to /admin");
    redirect('/admin');
  } else {
    console.log("Login failed: Invalid username or password.");
    return { error: 'Invalid username or password' };
  }
}

export async function logout() {
  console.log("--- Admin Logout ---");
  cookies().set(ADMIN_AUTH_COOKIE_NAME, '', { expires: new Date(0), path: '/' });
  redirect('/admin/login');
}

export async function verifySession() {
  console.log("--- Verifying session ---");
  const cookie = cookies().get(ADMIN_AUTH_COOKIE_NAME)?.value;
  const secretKey = process.env[AUTH_SECRET_VALUE_ENV];

  console.log("VerifySession: Cookie present?", cookie ? "Yes" : "No");
  console.log(`VerifySession: ${AUTH_SECRET_VALUE_ENV} set?`, secretKey ? "Yes" : "No");

  if (!cookie || !secretKey) {
    return null;
  }
  
  try {
    const encodedKey = new TextEncoder().encode(secretKey); // Codificar aqui, secretKey já validado
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });
    console.log("VerifySession: Success, payload:", payload);
    return payload;
  } catch (error) {
    console.error('VerifySession: Failed to verify session:', error);
    return null;
  }
}

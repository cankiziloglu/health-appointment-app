import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SessionData } from '@/lib/types';
import 'server-only';

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function auth() {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);
  return session?.payload;
}

export async function decrypt(session: string | undefined = '') {
  try {
    if (session) {
      const sessionData = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      });
      return sessionData;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function encrypt(sessionData: SessionData) {
  return new SignJWT(sessionData)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

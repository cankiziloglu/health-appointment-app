import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SessionData } from '@/lib/types';
import { Role } from '@prisma/client';

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const auth = async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);
  return session?.payload;
};

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

export async function createSession(sessionData: {
  userId: string;
  role: Role;
  emailVerified: boolean;
}) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ...sessionData, expiresAt });
  try {
    (await cookies()).set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'strict',
    });
    return { success: 'Session created' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to create session' };
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function updateSession(sessionData: {
  userId: string;
  role: Role;
  emailVerified: boolean;
}) {
  try {
    await deleteSession();
    const session = await createSession(sessionData);
    if (session.success) {
      return { success: 'Session updated' };
    } else {
      return { error: session.error };
    }
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update session' };
  }
}

export async function createVerificationToken({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Token valid for 1 hour
    .sign(encodedKey);
}

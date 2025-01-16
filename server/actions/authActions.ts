'use server';
import 'server-only';

import {
  signInSchema,
  SignInSchemaType,
  registerSchema,
  RegisterSchemaType,
} from '@/lib/schemas';
import { createUser, getUserByEmail } from '../data/user';
import * as bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { Role } from '@prisma/client';
import { SessionData } from '@/lib/types';
import { cookies } from 'next/headers';

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function signInAction(payload: SignInSchemaType) {
  const result = signInSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    try {
      const { email, password } = result.data;
      const user = await getUserByEmail(email);
      if (!user || !user.password) return { error: 'Invalid credentials' };
      const pwMatch = await bcrypt.compare(password, user.password);
      if (!pwMatch) return { error: 'Invalid credentials' };
      const sessionData = {
        userId: user.id,
        role: user.role,
        emailVerified: !!user.emailVerified,
      };
      const session = await createSession(sessionData);
      if (session.success) {
        return { success: 'User signed in successfully' };
      } else {
        return { error: session.error };
      }
    } catch (error) {
      console.error(error);
      return { error: 'Invalid credentials' };
    }
  }
}

export async function registerAction(payload: RegisterSchemaType) {
  const result = registerSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    const existingUser = await getUserByEmail(result.data.email);
    if (existingUser) {
      return { error: 'Email is already in use' };
    }
    const created = await createUser(result.data);
    if (created.error) {
      return { error: created.error };
    } else {
      const sessionData = {
        userId: created.userId!,
        role: result.data.role,
        emailVerified: false,
      };
      const session = await createSession(sessionData);
      if (session.success) {
        return { success: 'User registered successfully' };
      } else {
        return { error: session.error };
      }
    }
    // TODO: send verification email
  }
}

async function encrypt(sessionData: SessionData) {
  return new SignJWT(sessionData)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
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

async function createSession(sessionData: {
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

async function deleteSession() {
  (await cookies()).delete('session');
}

export async function signOutAction() {
  await deleteSession();
}

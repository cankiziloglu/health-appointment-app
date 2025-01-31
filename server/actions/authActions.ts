'use server';
import 'server-only';

import {
  signInSchema,
  SignInSchemaType,
  registerSchema,
  RegisterSchemaType,
} from '@/lib/schemas';
import {
  createUser,
  getUserByEmail,
  sendVerificationEmail,
} from '../data/user';
import * as bcrypt from 'bcryptjs';
import { createSession, deleteSession, updateSession } from '../data/auth';
import { SessionData } from '@/lib/types';

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
      const sentEmail = await sendVerificationEmail({
        userId: created.userId!,
        email: result.data.email,
      });
      if (session.success && sentEmail.success) {
        return { success: 'User registered successfully' };
      } else {
        return { error: session.error || sentEmail.error };
      }
    }
  }
}

export async function signOutAction() {
  await deleteSession();
}

export async function updateSessionAction(user: SessionData) {
  await updateSession(user);
}

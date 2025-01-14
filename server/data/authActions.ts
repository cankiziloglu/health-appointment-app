'use server';
import 'server-only';

import { signIn } from '@/auth';
import {
  signInSchema,
  SignInSchemaType,
  registerSchema,
  RegisterSchemaType,
} from '@/lib/schemas';
import { AuthError } from 'next-auth';
import { db } from '@/prisma/prisma';
import * as bcrypt from 'bcrypt';

export async function signInAction(payload: SignInSchemaType) {
  const result = signInSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    try {
      await signIn('credentials', result.data);
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: 'Authentication error!' };
      }
      throw error;
    }
  }
}

export async function registerAction(payload: RegisterSchemaType) {
  const result = registerSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    const { name, email, password, role } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return { error: 'Email is already in use' };
    }
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // TODO: send verification email
    return { success: 'User created!' };
  }
}

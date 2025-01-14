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
    try {
      console.log(result.data);
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: 'Authentication error!' };
      }
      throw error;
    }
  }
}

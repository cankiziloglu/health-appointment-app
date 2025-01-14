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
import { createUser, getUserByEmail } from './user';

export async function signInAction(payload: SignInSchemaType) {
  const result = signInSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    try {
      const { email, password } = result.data;
      const user = signIn('credentials', { email, password, redirectTo: '/dashboard' });
      console.log(user)
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error);
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid credentials' };
          default:
            return { error: 'Something went wrong' };
        }
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
    const existingUser = await getUserByEmail(result.data.email);
    if (existingUser) {
      return { error: 'Email is already in use' };
    }
    const created = await createUser(result.data);

    // TODO: send verification email
    return created;
  }
}

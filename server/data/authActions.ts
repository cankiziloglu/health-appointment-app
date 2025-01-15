'use server';
import 'server-only';

import {
  signInSchema,
  SignInSchemaType,
  registerSchema,
  RegisterSchemaType,
} from '@/lib/schemas';
import { createUser, getUserByEmail } from './user';
import * as bcrypt from 'bcryptjs';
import * as jose from 'jose'
import { Role } from '@prisma/client';

// TODO: Pass lang to server actions for redirection
export async function signInAction(payload: SignInSchemaType) {
  const result = signInSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    try {
      const { email, password } = result.data;
      const user = await getUserByEmail(email);
      if (!user || !user.password) return null;
      const pwMatch = await bcrypt.compare(password, user.password);
      if (!pwMatch) return null; // TODO: return values
      console.log(user);
      return user;
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

    // TODO: send verification email
    return created;
  }
}

async function createSession(userId: string, role: Role) {
  
}
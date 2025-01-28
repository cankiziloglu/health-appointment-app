'use server';
import 'server-only';

import {
  changePassSchema,
  changePassSchemaType,
  updateUserSchema,
  updateUserSchemaType,
} from '@/lib/schemas';
import {
  changeUserPassword,
  getUserByEmail,
  sendVerificationEmail,
  updateUser,
} from '../data/user';
import { auth } from '../data/auth';

export async function updateUserAction(data: updateUserSchemaType) {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (!session.emailVerified) {
    return { error: 'Email not verified' };
  }
  if (session.userId !== data.userId) {
    return { error: 'Invalid user credentials' };
  }

  const result = updateUserSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    const existingUser = await getUserByEmail(result.data.email);
    if (existingUser && existingUser.id !== result.data.userId) {
      return { error: 'Email is already in use' };
    }
    const { userId, name, email } = result.data;
    const updated = await updateUser({
      userId: userId,
      name: name,
      email: email,
    });
    if (!updated) {
      return { error: 'Something went wrong. Try again.' };
    } else {
      return { success: 'User details changed successfully' };
    }
  }
}

export async function changePasswordAction(data: changePassSchemaType) {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (!session.emailVerified) {
    return { error: 'Email not verified' };
  }
  if (session.userId !== data.userId) {
    return { error: 'Invalid user credentials' };
  }

  const result = changePassSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    const { userId, password } = result.data;
    const updated = await changeUserPassword({
      userId: userId,
      password: password,
    });
    if (!updated) {
      return { error: 'Something went wrong. Try again.' };
    } else {
      return { success: 'Password changed successfully' };
    }
  }
}

export async function sendVerifyEmailAction({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (session.emailVerified) {
    return { error: 'Email already verified' };
  }
  if (session.userId !== userId) {
    return { error: 'Invalid user credentials' };
  }
  try {
    const result = await sendVerificationEmail({
      userId,
      email,
    });
    return result;
  } catch (error) {
    console.error(error);
    return { error: 'There was a problem sending the email.' };
  }
}

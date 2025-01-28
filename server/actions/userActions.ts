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

export async function updateUserAction(data: updateUserSchemaType) {
  // TODO: Check authentication and authorization
  // TODO: Check if email is verified
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
  // TODO: Check authentication and authorization
  // TODO: Check if email is verified
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
  // TODO: Check authentication and authorization

  try {
    await sendVerificationEmail({
      userId,
      email,
    });
  } catch (error) {
    console.error(error);
    return { error: 'There was a problem sending the email.' };
  }
}

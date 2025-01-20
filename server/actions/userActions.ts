'use server';
import 'server-only';

import {
  changePassSchema,
  changePassSchemaType,
  updateUserSchema,
  updateUserSchemaType,
} from '@/lib/schemas';
import { changeUserPassword, getUserByEmail, updateUser } from '../data/user';

export async function updateUserAction(data: updateUserSchemaType) {
  const result = updateUserSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    const existingUser = await getUserByEmail(result.data.email);
    if (existingUser) {
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
      return updated;
    }
  }
}

export async function changePasswordAction(data: changePassSchemaType) {
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

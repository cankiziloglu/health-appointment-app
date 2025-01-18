'use server';
import { updateUserSchema, updateUserSchemaType } from '@/lib/schemas';
import 'server-only';
import { getUserByEmail, updateUser } from '../data/user';

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
    const { userId, name, email, password } = result.data;
    const updated = await updateUser({
      userId: userId,
      name: name,
      email: email,
      password: password,
    });
    if (!updated) {
      return { error: 'Something went wrong. Try again.' };
    } else {
      return updated;
    }
  }
}

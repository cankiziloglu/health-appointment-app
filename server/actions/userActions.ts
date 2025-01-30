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
  verifyEmail,
} from '../data/user';
import { auth, decrypt, updateSession } from '../data/auth';

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

export async function verifyEmailAction(token: string | null): Promise<string> {
  if (!token) {
    return 'Token is required';
  }

  try {
    const session = await auth();
    const payload = (await decrypt(token))?.payload;
    if (!payload) {
      return 'Invalid token';
    }

    const { userId, email } = payload as unknown as {
      userId: string;
      email: string;
    };

    if (!email || !userId) {
      return 'Invalid token';
    }

    const user = await getUserByEmail(email);
    if (user?.id !== userId) {
      return 'Invalid token';
    }

    if (user.emailVerified) {
      return 'Email already verified';
    }

    const verifiedUser = await verifyEmail(userId);

    if (!verifiedUser) {
      return 'User not found';
    }

    if (session) {
      await updateSession({
        userId: verifiedUser.id,
        role: verifiedUser.role,
        emailVerified: !!verifiedUser.emailVerified,
      });
    }

    return 'Email verified successfully';
  } catch (error) {
    console.error(error);
    return 'Invalid or expired token.';
  }
}

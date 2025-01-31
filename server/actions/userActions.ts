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
import { Role, User } from '@prisma/client';

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
    const { userId, name, email, emailVerified } = result.data;
    const updated = await updateUser({
      userId: userId,
      name: name,
      email: email,
      emailVerified: emailVerified,
    });

    if (emailVerified === false) {
      const newSession = await updateSession({
        userId: session.userId,
        role: session.role as Role,
        emailVerified,
      });
      const sentEmail = await sendVerificationEmail({ userId, email });
      if (newSession.error) return { error: 'Could not refresh session' };
      if (sentEmail.error)
        return { error: 'Failed to send verification email' };
    }
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

export async function verifyEmailAction(
  token: string | null
): Promise<{ verifiedUser: Partial<User> | null; message: string }> {
  if (!token) {
    return { verifiedUser: null, message: 'Token is required' };
  }

  try {
    const payload = (await decrypt(token))?.payload;
    if (!payload) {
      return { verifiedUser: null, message: 'Invalid token' };
    }

    const { userId, email } = payload as unknown as {
      userId: string;
      email: string;
    };

    if (!email || !userId) {
      return { verifiedUser: null, message: 'Invalid token' };
    }

    const user = await getUserByEmail(email);
    if (user?.id !== userId) {
      return { verifiedUser: null, message: 'Invalid token' };
    }

    if (user.emailVerified) {
      return { verifiedUser: null, message: 'Email already verified' };
    }

    const verifiedUser = await verifyEmail(userId);

    if (!verifiedUser) {
      return { verifiedUser: null, message: 'User not found' };
    }

    return { verifiedUser, message: 'Email verified successfully' };
  } catch (error) {
    console.error(error);
    return { verifiedUser: null, message: 'Invalid or expired token.' };
  }
}

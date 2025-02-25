import 'server-only';

import { db } from '@/prisma/prisma';
import { RegisterSchemaType } from '@/lib/schemas';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { createVerificationToken } from './auth';
import { verificationEmail } from '@/lib/emails';
import { Resend } from 'resend';
import { cache } from 'react';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const getUserByEmail = async (email: string | undefined) => {
  if (!email) return null;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      emailVerified: true,
      password: true,
      role: true,
    },
  });
  return user;
};

export const getUserDetailsById = async (id: string | undefined) => {
  if (!id) return null;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      doctor: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          title: true,
          photo_url: true,
          is_active: true,
        },
      },
      provider: {
        select: {
          id: true,
          name: true,
          logo_url: true,
          is_verified: true,
        },
      },
    },
  });
  return user;
};

export const getUserById = async (id: string | undefined) => {
  if (!id) return null;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return user;
};

export const createUser = async (data: RegisterSchemaType) => {
  const { name, email, password, role } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    return { userId: user.id };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Error creating user: ${errorMessage}` };
  }
};

export const updateUser = async (data: {
  userId: string;
  name: string;
  email: string;
  emailVerified: boolean;
}): Promise<User | null> => {
  try {
    if (data.emailVerified === false) {
      const user = await db.user.update({
        where: {
          id: data.userId,
        },
        data: {
          name: data.name,
          email: data.email,
          emailVerified: null,
        },
      });
      return user;
    } else {
      const user = await db.user.update({
        where: {
          id: data.userId,
        },
        data: {
          name: data.name,
          email: data.email,
        },
      });
      return user;
    }
  } catch {
    return null;
  }
};

export const changeUserPassword = async (data: {
  userId: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    const user = await db.user.update({
      where: {
        id: data.userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const sendVerificationEmail = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const token = await createVerificationToken({ userId, email });
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const emailContent = verificationEmail(verificationUrl);

  const { data, error } = await resend.emails.send({
    from: 'no-reply@mail.cankiziloglu.com',
    to: email,
    subject: 'Verify Your Email Address | Eposta Adresinizi Doğrulayın',
    html: emailContent,
  });
  if (error) {
    return { error: 'Error sending email.' };
  }
  return { success: 'Email sent', data };
};

export const verifyEmail = async (userId: string) => {
  const now = new Date();
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: now,
      },
      select: {
        id: true,
        role: true,
        emailVerified: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await db.user.delete({
      where: {
        id: userId,
      },
    });
    console.log(user);
    return { success: 'User account deleted successfully' };
  } catch (error) {
    console.error(error);
    return { error: 'Error deleting user account' };
  }
};

// Get all users for admin dashboard
export const getAllUsers = cache(async () => {
  return await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
});

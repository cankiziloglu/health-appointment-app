import 'server-only';
import { db } from '@/prisma/prisma';
import { RegisterSchemaType } from '@/lib/schemas';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { createVerificationToken } from './auth';
import { verificationEmail } from '@/lib/emails';
import { resend } from '@/lib/utils';

export async function getUserByEmail(email: string | undefined) {
  if (!email) return null;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      emailVerified: true,
      password: true
    },
  });
  return user;
}

export async function getUserDetailsById(id: string | undefined) {
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
}

export async function createUser(data: RegisterSchemaType) {
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
}

export async function updateUser(data: {
  userId: string;
  name: string;
  email: string;
}): Promise<User | null> {
  try {
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
  } catch {
    return null;
  }
}

export async function changeUserPassword(data: {
  userId: string;
  password: string;
}) {
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
}

export async function sendVerificationEmail({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const token = await createVerificationToken({ userId, email });
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${token}`;

  const emailContent = verificationEmail(verificationUrl);

  await resend.emails.send({
    from: 'no-reply@cankiziloglu.com',
    to: email,
    subject: 'Verify Your Email Address | Eposta Adresinizi Doğrulayın',
    html: emailContent,
  });
}

export async function verifyEmail(userId: string) {
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
        emailVerified: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

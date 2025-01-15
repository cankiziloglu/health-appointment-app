import { RegisterSchemaType } from '@/lib/schemas';
import { db } from '@/prisma/prisma';
import * as bcrypt from 'bcryptjs';

export async function getUserByEmail(email: string | undefined) {
  if (!email) return null;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function getUserById(id: string | undefined) {
  if (!id) return null;
  const user = await db.user.findUnique({
    where: {
      id: id,
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

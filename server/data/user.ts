import 'server-only';
import { db } from '@/prisma/prisma';
import { RegisterSchemaType } from '@/lib/schemas';
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

export async function updateUser(data: {
  userId: string;
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await db.user.update({
      where: {
        id: data.userId,
      },
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Error creating user: ${errorMessage}` };
  }
}

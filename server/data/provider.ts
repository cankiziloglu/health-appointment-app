import { createHealthcareProviderSchemaType } from '@/lib/schemas';
import { db } from '@/prisma/prisma';
import { cache } from 'react';
import 'server-only';

export const privatePractitionerProvider = cache(async () => {
  return await db.healthcareProvider.findFirst({
    where: {
      name: 'Private Practitioners',
    },
  });
});

export const getHealthcareProviderByEmail = cache(async (email: string) => {
  return await db.healthcareProvider.findUnique({
    where: {
      email: email,
    },
  });
});

// export const getHealthcareProviderByUser = cache(async (userId: string) => {
//   return await db.healthcareProvider.findFirst({
//     include: {
//       users: {
//         where: {
//           id: userId,
//         },
//       },
//     },
//   });
// });

export const createHealthcareProvider = async (
  data: createHealthcareProviderSchemaType,
  userId: string
) => {
  const { name, email, phone } = data;
  try {
    const healthcareProvider = await db.healthcareProvider.create({
      data: {
        name,
        email,
        phone,
        users: {
          connect: [{ id: userId }],
        },
      },
    });
    return healthcareProvider;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Error creating provider: ${errorMessage}` };
  }
};

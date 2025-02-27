'use server';
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

// Get unverified healthcare providers for Admin Dashboard
export const getUnverifiedHealthcareProviders = cache(async () => {
  return await db.healthcareProvider.findMany({
    where: {
      is_verified: false,
    },
  });
});

// Verify healthcare provider (Admin only)
export const verifyHealthcareProvider = async (providerId: string) => {
  try {
    const provider = await db.healthcareProvider.update({
      where: { id: providerId },
      data: {
        is_verified: true,
      },
    });
    return provider;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Error verifying provider: ${errorMessage}` };
  }
};

// Unverify healthcare provider (Admin only)
export const unverifyHealthcareProvider = async (id: string) => {
  try {
    const provider = await db.healthcareProvider.update({
      where: { id },
      data: {
        is_verified: false,
      },
    });
    return provider;
  } catch (error) {
    console.error('Error unverifying healthcare provider:', error);
    return { error: 'Failed to unverify healthcare provider' };
  }
};

// Get all healthcare providers for admin dashboard
export const getAllHealthcareProviders = cache(async () => {
  return await db.healthcareProvider.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });
});

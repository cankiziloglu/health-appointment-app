import { createPrivatePractitionerSchemaType } from '@/lib/schemas';
import { db } from '@/prisma/prisma';
import { cache } from 'react';
import 'server-only';
import { privatePractitionerProvider } from './provider';

export const getDoctorByEmail = cache(async (email: string) => {
  return await db.doctor.findUnique({
    where: {
      email: email,
    },
  });
});

export const createPrivatePractitioner = async (
  data: createPrivatePractitionerSchemaType,
  userId: string
) => {
  const {
    title,
    firstName,
    lastName,
    email,
    phone,
    medicalUnit,
    city,
    address,
    district,
    postalCode,
  } = data;
  const providerId = (await privatePractitionerProvider())?.id;
  if (!providerId) {
    return { error: 'No private practitioner provider available' };
  }
  try {
    const location = await db.location.create({
      data: {
        city,
        address,
        district,
        postal_code: postalCode,
      },
      select: {
        id: true,
      },
    });
    const PrivatePractitioner = await db.doctor.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        title,
        email,
        phone,
        medical_unit_id: medicalUnit,
        provider_id: providerId,
        location_id: location.id,
        user: {
          connect: { id: userId },
        },
      },
    });
    return PrivatePractitioner;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Error creating provider: ${errorMessage}` };
  }
};

// Get inactive private practitioners for Admin Dashboard
export const getInactivePrivatePractitioners = cache(async () => {
  const providerId = (await privatePractitionerProvider())?.id;
  if (!providerId) {
    return { error: 'No private practitioner provider available' };
  }

  return await db.doctor.findMany({
    where: {
      provider_id: providerId,
      is_active: false,
    },
  });
});

// Activate private practitioner (Admin only)
export const activatePrivatePractitioner = async (doctorId: string) => {
  try {
    const doctor = await db.doctor.update({
      where: { id: doctorId },
      data: {
        is_active: true,
      },
    });
    return doctor;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return { error: `Error activating provider: ${errorMessage}` };
  }
};

// Get all doctors for admin dashboard
export const getAllDoctors = cache(async () => {
  return await db.doctor.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });
});

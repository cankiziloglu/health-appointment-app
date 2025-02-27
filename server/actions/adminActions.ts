'use server';

import { auth } from '../data/auth';
import {
  activatePrivatePractitioner,
  deactivatePrivatePractitioner,
} from '../data/doctor';
import {
  verifyHealthcareProvider,
  unverifyHealthcareProvider,
} from '../data/provider';
import { db } from '@/prisma/prisma';

export const verifyProviderAction = async (providerId: string) => {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (session.role !== 'ADMIN') {
    return { error: 'Not authorized' };
  }

  try {
    const result = await verifyHealthcareProvider(providerId);
    if (result && 'error' in result) {
      return { error: result.error };
    }
    return { success: 'Provider verified successfully' };
  } catch {
    return { error: 'Failed to verify provider' };
  }
};

export const activatePractitionerAction = async (practitionerId: string) => {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (session.role !== 'ADMIN') {
    return { error: 'Not authorized' };
  }

  try {
    const result = await activatePrivatePractitioner(practitionerId);
    if (result && 'error' in result) {
      return { error: result.error };
    }
    return { success: 'Practitioner activated successfully' };
  } catch {
    return { error: 'Failed to activate practitioner' };
  }
};

export const makeUserAdminAction = async (userId: string) => {
  const session = await auth();

  // Authentication check
  if (!session) {
    return { error: 'Not authenticated' };
  }

  // Authorization check - only admins can make other users admin
  if (session.role !== 'ADMIN') {
    return { error: 'Not authorized' };
  }

  try {
    // Update user role to ADMIN
    const user = await db.user.update({
      where: { id: userId },
      data: { role: 'ADMIN' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      success: 'User role updated to admin successfully',
      user: user,
    };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { error: 'Failed to update user role' };
  }
};

export const unverifyProviderAction = async (providerId: string) => {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (session.role !== 'ADMIN') {
    return { error: 'Not authorized' };
  }

  try {
    const result = await unverifyHealthcareProvider(providerId);
    if (result && 'error' in result) {
      return { error: result.error };
    }
    return { success: 'Provider unverified successfully' };
  } catch {
    return { error: 'Failed to unverify provider' };
  }
};

export const deactivatePractitionerAction = async (practitionerId: string) => {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (session.role !== 'ADMIN') {
    return { error: 'Not authorized' };
  }

  try {
    const result = await deactivatePrivatePractitioner(practitionerId);
    if (result && 'error' in result) {
      return { error: result.error };
    }
    return { success: 'Practitioner deactivated successfully' };
  } catch {
    return { error: 'Failed to deactivate practitioner' };
  }
};

'use server';

import { auth } from '../data/auth';
import { activatePrivatePractitioner } from '../data/doctor';
import { verifyHealthcareProvider } from '../data/provider';

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

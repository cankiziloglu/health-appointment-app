'use server';

import {
  createHealthcareProviderSchema,
  createHealthcareProviderSchemaType,
} from '@/lib/schemas';
import 'server-only';
import { auth } from '../data/auth';
import { getUserDetailsById } from '../data/user';
import { SessionData } from '@/lib/types';
import {
  createHealthcareProvider,
  getHealthcareProviderByEmail,
} from '../data/provider';

export const createHealthcareProviderAction = async (
  payload: createHealthcareProviderSchemaType
) => {
  const session = await auth();
  if (!session) {
    return { error: 'Not authenticated' };
  }
  if (!session.emailVerified) {
    return { error: 'Email not verified' };
  }
  const user = await getUserDetailsById((session as SessionData)?.userId);
  if (user?.provider !== null || user?.doctor !== null) {
    return { error: 'User already has a profile' };
  }

  const result = createHealthcareProviderSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }
  if (result.success) {
    const existingProvider = await getHealthcareProviderByEmail(
      result.data.email
    );
    if (existingProvider) {
      return { error: 'Email is already in use' };
    }
    try {
      const healthcareProvider = await createHealthcareProvider(
        result.data,
        (session as SessionData)?.userId
      );
      if (healthcareProvider && 'error' in healthcareProvider) {
        return { error: healthcareProvider.error };
      }
      return { success: 'Healthcare Provider Created Successfully' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return { error: `Error creating provider: ${errorMessage}` };
    }
  }
};

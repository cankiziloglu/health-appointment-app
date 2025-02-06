'use server';

import {
  createPrivatePractitionerSchema,
  createPrivatePractitionerSchemaType,
} from '@/lib/schemas';
import 'server-only';
import { auth } from '../data/auth';
import { getUserDetailsById } from '../data/user';
import { SessionData } from '@/lib/types';
import {
  createPrivatePractitioner,
  getPrivatePractitionerByEmail,
} from '../data/doctor';

export const createPrivatePractitionerAction = async (
  payload: createPrivatePractitionerSchemaType
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

  const result = createPrivatePractitionerSchema.safeParse(payload);

  if (!result.success) {
    return { errors: result.error.flatten() };
  }
  if (result.success) {
    const existingProvider = await getPrivatePractitionerByEmail(
      result.data.email
    );
    if (existingProvider) {
      return { error: 'Email is already in use' };
    }
    try {
      const PrivatePractitioner = await createPrivatePractitioner(
        result.data,
        (session as SessionData)?.userId
      );
      if (PrivatePractitioner && 'error' in PrivatePractitioner) {
        return { error: PrivatePractitioner.error };
      }
      return { success: 'Healthcare Provider Created Successfully' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return { error: `Error creating provider: ${errorMessage}` };
    }
  }
};

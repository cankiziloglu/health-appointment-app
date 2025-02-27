import { Role, User } from '@prisma/client';
import { getDictionary } from './dictionaries';

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>;

export type SessionData = {
  userId: string;
  role: Role;
  emailVerified: boolean;
  expiresAt?: Date;
};

type DoctorSummary = {
  id: string;
  first_name: string;
  last_name: string;
  title?: string | null;
  photo_url?: string | null;
  is_active: boolean;
};

type ProviderSummary = {
  id: string;
  name: string;
  logo_url?: string | null;
  is_verified: boolean;
};

export type UserWithProfilesType = User & {
  doctor: DoctorSummary | null;
  provider: ProviderSummary | null;
};

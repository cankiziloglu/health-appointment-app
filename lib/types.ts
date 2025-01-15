import { Role } from '@prisma/client';
import { getDictionary } from './dictionaries';

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>;

export type SessionData = {
  userId: string;
  role: Role;
  emailVerified: boolean;
  expiresAt?: Date
};

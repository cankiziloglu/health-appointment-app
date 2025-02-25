import { Role, User } from '@prisma/client';
import { getDictionary } from './dictionaries';

type AdminDictionary = {
  title: string;
  pendingTitle: string;
  reviewTitle: string;
  reviewTitlePractitioner: string;
  provider: string;
  practitioner: string;
  name: string;
  type: string;
  actions: string;
  review: string;
  verify: string;
  verifySuccess: string;
  verifyError: string;
  activateSuccess: string;
  activateError: string;
  verifyGenericError: string;
  email: string;
  phone: string;
  title_field: string;
  view: string;
  toggle_columns: string;
  columns: {
    [key: string]: string;
  };
  filter: string;
  no_results: string;
  row_selected: string;
  of: string;
  per_page: string;
  page: string;
  go_first: string;
  go_last: string;
  go_prev: string;
  go_next: string;
  tabs: {
    users: string;
    providers: string;
    practitioners: string;
    account: string;
  };
};

export type DictionaryType = Awaited<ReturnType<typeof getDictionary>> & {
  Dashboard: {
    admin: AdminDictionary;
  };
};

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

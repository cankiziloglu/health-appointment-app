import { Locale } from '@/i18n-config';
import React, { Suspense } from 'react';
import UserDetails from './user-details';
import { auth } from '@/server/data/auth';
import { getUserById } from '@/server/data/user';
import { SessionData } from '@/lib/types';
import { getDictionary } from '@/lib/dictionaries';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const session = await auth();
  if (!session) return null;

  const user = await getUserById((session as SessionData)?.userId);

  if (!user) return null;

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>User Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <Suspense fallback={<div>Loading user details...</div>}>
            <UserDetails dictionary={dictionary.Dashboard} user={user} />
          </Suspense>
          <Suspense fallback={<div>Loading profiles...</div>}>
            {/* <ProviderDoctorList /> */}
          </Suspense>
        </div>
        <div>{/* <NewProfileForm /> */}</div>
      </div>
    </div>
  );
}

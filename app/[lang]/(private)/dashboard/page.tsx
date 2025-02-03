import { Locale } from '@/i18n-config';
import React, { Suspense } from 'react';
import UserDetails from './user-details';
import { auth } from '@/server/data/auth';
import { getUserDetailsById } from '@/server/data/user';
import { SessionData } from '@/lib/types';
import { getDictionary } from '@/lib/dictionaries';
import ProfileList from './profile-list';
import ResendButton from './resend-button';
import UserDelete from './user-delete';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;

  const dictionary = (await getDictionary(lang)).Dashboard;

  const session = await auth();
  const isVerified = session?.emailVerified;

  const user = await getUserDetailsById((session as SessionData)?.userId);

  if (!user) return null;

  return (
    <div className='py-8 px-4 md:px-6 flex flex-col justify-between items-center gap-6'>
      <h1 className='text-2xl font-bold'>{user.name}</h1>
      {!isVerified && (
        <div className='text-destructive font-medium p-4 text-sm flex flex-col gap-2 rounded-xl border-2 border-destructive'>
          <p>{dictionary.warning}</p>
          <ResendButton
            text={dictionary.resend}
            userId={user.id}
            email={user.email}
          />
        </div>
      )}
      <div className='flex flex-col md:flex-row gap-6 w-full'>
        <Suspense fallback={<div>Loading user details...</div>}>
          <UserDetails dictionary={dictionary} user={user} />
        </Suspense>
        <Suspense fallback={<div>Loading profiles...</div>}>
          <ProfileList dictionary={dictionary} user={user} lang={lang} />
        </Suspense>
      </div>
        <UserDelete dictionary={dictionary} user={user} lang={lang} />
    </div>
  );
}

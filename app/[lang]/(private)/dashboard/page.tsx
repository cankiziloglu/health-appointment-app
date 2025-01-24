import { Locale } from '@/i18n-config';
import React, { Suspense } from 'react';
import UserDetails from './user-details';
import { auth } from '@/server/data/auth';
import { getUserById } from '@/server/data/user';
import { SessionData } from '@/lib/types';
import { getDictionary } from '@/lib/dictionaries';
import ProfileList from './profile-list';
import { Button } from '@/components/ui/button';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).Dashboard;

  const session = await auth();
  const isVerified = session?.emailVerified;

  const user = await getUserById((session as SessionData)?.userId);

  if (!user) return null;

  return (
    <div className='mx-auto py-8 px-4 md:px-6 flex flex-col justify-center gap-6'>
      <h1 className='text-2xl font-bold'>{user.name}</h1>
      {!isVerified && (
        <div className='bg-destructive text-destructive-foreground p-4 text-sm flex flex-col gap-2'>
          <p>{dictionary.warning}</p>
          {/* TODO: add resend verification email logic */}
          <Button variant='outline' className='text-foreground'>Resend</Button>
        </div>
      )}
      <Suspense fallback={<div>Loading user details...</div>}>
        <UserDetails dictionary={dictionary} user={user} />
      </Suspense>
      <Suspense fallback={<div>Loading profiles...</div>}>
        <ProfileList dictionary={dictionary} user={user} lang={lang} />
      </Suspense>
    </div>
  );
}

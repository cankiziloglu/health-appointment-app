import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { auth } from '@/server/data/auth';
import { getHealthcareProviderById } from '@/server/data/provider';
import { getUserDetailsById } from '@/server/data/user';
import { redirect } from 'next/navigation';
import React from 'react';
import ProviderInfoTab from './provider-info-tab';

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ lang: Locale['key']; providerId: string }>;
}) {
  const { lang, providerId } = await params;
  const dictionary = (await getDictionary(lang)).Dashboard;
  const session = await auth();

  if (!session || typeof session.userId !== 'string') {
    redirect(`/${lang}/signin`);
  }

  const user = await getUserDetailsById(session.userId);
  const isVerified = !!session.emailVerified;

  if (!user) {
    redirect(`/${lang}/signin`);
  }

  // Check if user's role is correct, if not redirect to dashboard
  if (session.role !== 'HCP') {
    redirect(`/${lang}/dashboard`);
  }

  // Check if user's healthcare provider ID matches the providerId
  if (user.provider?.id !== providerId) {
    redirect(`/${lang}/dashboard`);
  }

  // Check if user's email is verified, if not redirect to dashboard
  if (!isVerified) {
    redirect(`/${lang}/dashboard`);
  }

  // Fetch healthcare provider data
  const provider = await getHealthcareProviderById(providerId);
  if (!provider) {
    redirect(`/${lang}/dashboard`);
  }

  console.log(provider)

  return (
    <div className='mx-auto py-6 px-4'>
      <h1 className='text-3xl font-bold mb-6'>{provider.name}</h1>
      <Tabs defaultValue='account' className='space-y-4'>
        <TabsList className='flex flex-wrap gap-2 h-auto'>
          <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
            <TabsTrigger value='account' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.account}
            </TabsTrigger>
            <TabsTrigger value='users' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.users}
            </TabsTrigger>
          </div>
          <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
            <TabsTrigger value='providers' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.providers}
            </TabsTrigger>
            <TabsTrigger value='doctors' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.doctors}
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value='account'>
          <ProviderInfoTab
            dictionary={dictionary}
            provider={provider}
            lang={lang}
          />
        </TabsContent>

        <TabsContent value='users'>
          <ProviderAppointmentsTab dictionary={dictionary.provider} appointments={appointments} />
        </TabsContent>

        <TabsContent value='doctors'>
          <ProviderDoctorsTab
            dictionary={dictionary.provider}
            doctors={doctors}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

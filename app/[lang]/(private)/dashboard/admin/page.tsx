import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { auth } from '@/server/data/auth';
import {
  getInactivePrivatePractitioners,
  getAllDoctors,
} from '@/server/data/doctor';
import {
  getUnverifiedHealthcareProviders,
  getAllHealthcareProviders,
} from '@/server/data/provider';
import { getAllUsers, getUserDetailsById } from '@/server/data/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersTab from './users-tab';
import ProvidersTab from './providers-tab';
import DoctorsTab from './doctors-tab';
import AccountTab from './account-tab';
import PendingVerifications from './pending-verifications';
import { redirect } from 'next/navigation';
import { DictionaryType } from '@/lib/types';

const AdminPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) => {
  const { lang } = await params;
  const dictionary: DictionaryType['Dashboard'] = (await getDictionary(lang))
    .Dashboard;
  const session = await auth();

  if (!session || typeof session.userId !== 'string') {
    redirect(`/${lang}/signin`);
  }

  const user = await getUserDetailsById(session.userId);
  const isVerified = !!session.emailVerified;

  if (!user) {
    redirect(`/${lang}/signin`);
  }

  // Check if user is admin, if not redirect to dashboard
  if (session.role !== 'ADMIN') {
    redirect(`/${lang}/dashboard`);
  }

  // Fetch all the necessary data
  const unverifiedProviders = await getUnverifiedHealthcareProviders();
  const inactivePrivatePractitioners = await getInactivePrivatePractitioners();
  const practitioners =
    'error' in inactivePrivatePractitioners ? [] : inactivePrivatePractitioners;

  // Fetch data for tables
  const users = await getAllUsers();
  const providers = await getAllHealthcareProviders();
  const allDoctors = await getAllDoctors();

  return (
    <div className='container mx-auto py-6 px-4'>
      <h1 className='text-3xl font-bold mb-6'>{dictionary.admin.title}</h1>
      <PendingVerifications
        dictionary={dictionary}
        unverifiedProviders={unverifiedProviders}
        inactivePrivatePractitioners={practitioners}
      />

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
          <AccountTab
            dictionary={dictionary}
            user={user}
            lang={lang}
            isVerified={isVerified}
          />
        </TabsContent>

        <TabsContent value='users'>
          <UsersTab dictionary={dictionary.admin} users={users} />
        </TabsContent>

        <TabsContent value='providers'>
          <ProvidersTab dictionary={dictionary.admin} providers={providers} />
        </TabsContent>

        <TabsContent value='doctors'>
          <DoctorsTab
            dictionary={dictionary.admin}
            doctors={allDoctors}
            providers={providers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

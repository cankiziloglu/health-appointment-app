import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
// import { auth } from '@/server/data/auth';
import { getInactivePrivatePractitioners } from '@/server/data/doctor';
import { getUnverifiedHealthcareProviders } from '@/server/data/provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersTab from './users-tab';
import ProvidersTab from './providers-tab';
import PractitionersTab from './practitioners-tab';
import AccountTab from './account-tab';
import PendingVerifications from './pending-verifications';

const AdminPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) => {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).Dashboard;

  // const session = await auth();
  // const isVerified = session?.emailVerified;

  const unverifiedProviders = await getUnverifiedHealthcareProviders();
  const inactivePrivatePractitioners = await getInactivePrivatePractitioners();
  const practitioners =
    'error' in inactivePrivatePractitioners ? [] : inactivePrivatePractitioners;

  return (
    <div className='container mx-auto py-6 px-4'>
      <h1 className='text-3xl font-bold mb-6'>{dictionary.admin.title}</h1>
      <PendingVerifications
        dictionary={dictionary}
        unverifiedProviders={unverifiedProviders}
        inactivePrivatePractitioners={practitioners}
      />

      <Tabs defaultValue='users' className='space-y-4'>
        <TabsList className='flex flex-wrap gap-2 h-auto'>
          <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
            <TabsTrigger value='users' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.users}
            </TabsTrigger>
            <TabsTrigger value='providers' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.providers}
            </TabsTrigger>
          </div>
          <div className='flex flex-wrap gap-2 w-full sm:w-auto'>
            <TabsTrigger
              value='practitioners'
              className='flex-grow sm:flex-grow-0'
            >
              {dictionary.admin.tabs.practitioners}
            </TabsTrigger>
            <TabsTrigger value='account' className='flex-grow sm:flex-grow-0'>
              {dictionary.admin.tabs.account}
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value='users'>
          <UsersTab dictionary={dictionary} />
        </TabsContent>

        <TabsContent value='providers'>
          <ProvidersTab dictionary={dictionary} />
        </TabsContent>

        <TabsContent value='practitioners'>
          <PractitionersTab dictionary={dictionary} />
        </TabsContent>

        <TabsContent value='account'>
          <AccountTab dictionary={dictionary} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

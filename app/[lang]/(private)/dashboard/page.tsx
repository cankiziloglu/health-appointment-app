import { Locale } from '@/i18n-config';
import React, { Suspense } from 'react';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<div>Loading user details...</div>}>
            <UserDetails />
          </Suspense>
          <Suspense fallback={<div>Loading profiles...</div>}>
            <ProviderDoctorList />
          </Suspense>
        </div>
        <div>
          <NewProfileForm />
        </div>
      </div>
    </div>
  )
}

'use client';

import { DataTable } from '@/components/ui/data-table';
import { createProviderColumns } from './columns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthcareProvider } from '@prisma/client';
import { DictionaryType } from '@/lib/types';

type ProvidersTabProps = {
  dictionary: DictionaryType['Dashboard'];
  providers: HealthcareProvider[];
}

export default function ProvidersTab({
  dictionary,
  providers,
}: ProvidersTabProps) {
  // Create columns with dictionary for translations
  const providerColumns = createProviderColumns(dictionary);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.admin.tabs.providers}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={providerColumns}
          data={providers}
          searchField='name'
          dictionary={dictionary}
        />
      </CardContent>
    </Card>
  );
}

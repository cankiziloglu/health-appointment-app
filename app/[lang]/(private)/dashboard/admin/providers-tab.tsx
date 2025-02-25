'use client';

import { DataTable } from '@/components/ui/data-table';
import { providerColumns } from './columns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthcareProvider } from '@prisma/client';
import { DictionaryType } from '@/lib/types';

interface ProvidersTabProps {
  dictionary: DictionaryType['Dashboard'];
  providers: HealthcareProvider[];
}

export default function ProvidersTab({
  dictionary,
  providers,
}: ProvidersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.admin.tabs.providers}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={providerColumns}
          data={providers}
          searchField='email'
          dictionary={dictionary}
        />
      </CardContent>
    </Card>
  );
}

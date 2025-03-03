'use client';

import { DataTable } from '@/components/ui/data-table';
import { createUserColumns } from './columns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@prisma/client';
import { DictionaryType } from '@/lib/types';

type UsersTabProps = {
  dictionary: DictionaryType['Dashboard']['admin'];
  users: User[];
}

export default function UsersTab({ dictionary, users }: UsersTabProps) {
  // Create columns with dictionary for translations
  const userColumns = createUserColumns(dictionary);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.tabs.users}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={userColumns}
          data={users}
          searchField='name'
          dictionary={dictionary.dataTable}
        />
      </CardContent>
    </Card>
  );
}

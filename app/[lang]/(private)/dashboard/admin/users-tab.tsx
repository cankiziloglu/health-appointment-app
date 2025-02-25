'use client';

import { DataTable } from '@/components/ui/data-table';
import { userColumns } from './columns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@prisma/client';
import { DictionaryType } from '@/lib/types';

interface UsersTabProps {
  dictionary: DictionaryType['Dashboard'];
  users: User[];
}

export default function UsersTab({ dictionary, users }: UsersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.admin.tabs.users}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={userColumns}
          data={users}
          searchField='email'
          dictionary={dictionary}
        />
      </CardContent>
    </Card>
  );
}

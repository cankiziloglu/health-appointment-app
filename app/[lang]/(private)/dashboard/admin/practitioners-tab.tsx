'use client';

import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { practitionerColumns } from './columns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Doctor } from '@prisma/client';
import { DictionaryType } from '@/lib/types';

interface PractitionersTabProps {
  dictionary: DictionaryType['Dashboard'];
  practitioners: Doctor[];
}

export default function PractitionersTab({
  dictionary,
  practitioners,
}: PractitionersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.admin.tabs.practitioners}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={practitionerColumns}
          data={practitioners}
          searchField='email'
          dictionary={dictionary}
        />
      </CardContent>
    </Card>
  );
}

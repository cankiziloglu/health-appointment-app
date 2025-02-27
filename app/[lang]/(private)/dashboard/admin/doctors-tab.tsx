'use client';

import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { createDoctorColumns } from './columns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Doctor, HealthcareProvider } from '@prisma/client';
import { DictionaryType } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DoctorsTabProps {
  dictionary: DictionaryType['Dashboard'];
  doctors: Doctor[];
  providers: HealthcareProvider[];
}

export default function DoctorsTab({
  dictionary,
  doctors,
  providers,
}: DoctorsTabProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  // Create columns with dictionary for translations
  const doctorColumns = createDoctorColumns(dictionary);

  // Filter doctors based on selected provider
  const filteredDoctors = selectedProvider === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.provider_id === selectedProvider);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{dictionary.admin.tabs.doctors}</CardTitle>
        <Select onValueChange={setSelectedProvider} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={dictionary.admin.provider} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dictionary.admin.allProviders}</SelectItem>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={doctorColumns}
          data={filteredDoctors}
          searchField="name"
          dictionary={dictionary}
        />
      </CardContent>
    </Card>
  );
}

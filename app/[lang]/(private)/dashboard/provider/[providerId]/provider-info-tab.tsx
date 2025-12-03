import { Locale } from '@/i18n-config';
import { DictionaryType } from '@/lib/types';
import { HealthcareProvider } from '@/generated/prisma/client';
import React from 'react';

const ProviderInfoTab = ({
  dictionary,
  provider,
  lang,
}: {
  dictionary: DictionaryType['Dashboard'];
  provider: HealthcareProvider;
  lang: Locale['key'];
}) => {
  return <div>ProviderInfoTab</div>;
};

export default ProviderInfoTab;

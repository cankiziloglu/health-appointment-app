import React from 'react';
import { Header } from '../../header';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n-config';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <Header dictionary={dict.header} />
      <main></main>
    </div>
  );
}

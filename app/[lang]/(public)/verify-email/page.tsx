import { redirect } from 'next/navigation';
import VerifyClient from './verify-client';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n-config';

export default async function VerifyEmailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale['key'] }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token || null;
  

  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).Verify;

  if (!token) {
    redirect('/');
  }

  return <VerifyClient token={token} dictionary={dictionary} />;
}

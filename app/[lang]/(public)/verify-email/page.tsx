import { redirect } from 'next/navigation';
import VerifyClient from './verify-client';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n-config';

async function fetchVerificationMessage(token: string | null): Promise<string> {
  if (!token) {
    return 'Token is missing.';
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${token}`
    );
    const data = await res.json();
    return data.message || 'Unknown error occurred.';
  } catch (error) {
    console.error('Verification error:', error);
    return 'An error occurred while verifying your email.';
  }
}

export default async function VerifyEmailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale['key'] }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token || null;
  const messageEn = await fetchVerificationMessage(token);

  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).Verify;

  const message =
    (dictionary as Record<string, string>)[messageEn] || messageEn;
  const redir = dictionary.redirect;

  const text = { message: message, redir: redir };

  if (!token) {
    redirect('/');
  }

  return <VerifyClient text={text} />;
}

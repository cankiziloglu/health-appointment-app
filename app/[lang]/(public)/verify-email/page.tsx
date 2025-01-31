import { redirect } from 'next/navigation';
import VerifyClient from './verify-client';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n-config';
import { auth } from '@/server/data/auth';
import { verifyEmailAction } from '@/server/actions/userActions';

export default async function VerifyEmailPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale['key'] }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token || null;
  const session = await auth();

  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).Verify;

  const { verifiedUser, message } = await verifyEmailAction(token);
  const messageTranslated =
    (dictionary as Record<string, string>)[message] || message;
  const redir = dictionary.redirect;
  const text = { messageTranslated, redir };

  if (!token) {
    redirect('/');
  }

  let user = null;

  if (session && verifiedUser) {
    const userWithId = {
      userId: verifiedUser.id!,
      role: verifiedUser.role!,
      emailVerified: !!verifiedUser.emailVerified,
    };
    user = userWithId;
  }

  return <VerifyClient text={text} user={user} />;
}

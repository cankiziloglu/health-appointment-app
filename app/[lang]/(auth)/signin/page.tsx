import { Locale } from '@/i18n-config';
import SignInForm from './signin-form';
import { getDictionary } from '@/lib/dictionaries';
import { auth } from '@/auth';

export default async function SignInPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const session = await auth()

  return (
    <div className='h-full w-full max-w-sm flex flex-col justify-center items-center p-6 md:p-10'>
      <SignInForm dictionary={dictionary.signInForm} lang={lang} />
      <div>
        {JSON.stringify(session)}
      </div>
    </div>
  );
}

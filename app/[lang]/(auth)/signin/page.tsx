import { Locale } from '@/i18n-config';
import SignInForm from './signin-form';
import { getDictionary } from '@/lib/dictionaries';

export default async function SignInPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);


  return (
    <div className='h-full w-full mx-auto max-w-md flex flex-col justify-center p-6 md:p-10'>
      <SignInForm dictionary={dictionary.signInForm} lang={lang} />
    </div>
  );
}

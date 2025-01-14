import { Locale } from '@/i18n-config';

import { getDictionary } from '@/lib/dictionaries';

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className='h-full w-full max-w-sm flex flex-col justify-center items-center p-6 md:p-10'>
      <RegisterForm dictionary={dictionary.signInForm} lang={lang} />
    </div>
  );
}

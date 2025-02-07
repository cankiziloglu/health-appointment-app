import { Locale } from '@/i18n-config';
import { DictionaryType } from '@/lib/types';
import Link from 'next/link';

export default async function Footer({
  dictionary,
  lang,
}: {
  dictionary: DictionaryType['footer'];
  lang: Locale['key'];
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mx-auto flex flex-col gap-4 md:flex-row md:justify-between py-6 w-full max-w-5xl px-4 md:px-6 border-t font-mono mt-auto'>
      <small className='text-xs text-gray-500 dark:text-gray-400'>
        &copy; {currentYear} Can Kiziloglu
      </small>
      <Link
        className='text-sm font-medium hover:underline underline-offset-4'
        href={`/${lang}/signin`}
      >
        {dictionary.signin}
      </Link>
      <Link
        className='text-xs hover:underline underline-offset-4'
        href='https://github.com/cankiziloglu/health-appointment-app'
      >
        {dictionary.github}
      </Link>
    </footer>
  );
}

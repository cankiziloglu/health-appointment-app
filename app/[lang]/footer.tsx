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
    <footer className='flex flex-col gap-4 sm:flex-row py-6 w-full max-w-3xl items-center px-4 md:px-6 border-t font-mono'>
      <small className='text-xs text-gray-500 dark:text-gray-400'>
        &copy; {currentYear} Can Kiziloglu
      </small>
      <nav className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6'>
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
      </nav>
    </footer>
  );
}

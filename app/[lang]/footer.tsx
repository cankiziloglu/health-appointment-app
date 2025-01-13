import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import Link from 'next/link';

export default async function Footer({
  dictionary,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['footer'];
  lang: Locale['key'];
}) {
  return (
    <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full max-w-3xl items-center px-4 md:px-6 border-t'>
      <p className='text-xs text-gray-500 dark:text-gray-400'>
        {dictionary.copyright}
      </p>
      <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
        <Link
          className='text-xs hover:underline underline-offset-4'
          href={`/${lang}/`}
        >
          {dictionary.privacy}
        </Link>
        <Link
          className='text-xs hover:underline underline-offset-4'
          href={`/${lang}/`}
        >
          {dictionary.terms}
        </Link>
      </nav>
    </footer>
  );
}

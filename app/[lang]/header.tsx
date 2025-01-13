import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import LocaleSwitcher from '@/components/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Locale } from '@/i18n-config';

export function Header({
  dictionary,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['header'];
  lang: Locale['key'];
}) {
  return (
    <header className='flex items-center justify-between w-full max-w-3xl px-4 lg:px-6 py-4 h-16'>
      <Link href={`/${lang}/`}>
        <Stethoscope className='h-8 w-8' />
        <span className='sr-only'>{dictionary.title}</span>
      </Link>
      <nav className='flex gap-4 sm:gap-6 items-center'>
        <Link
          className='font-mono font-medium hover:underline underline-offset-4'
          href={`/${lang}/about`}
        >
          {dictionary.about}
        </Link>
        <LocaleSwitcher />
        <ThemeToggle />
      </nav>
    </header>
  );
}

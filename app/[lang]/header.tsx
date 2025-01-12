import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';
import LocaleSwitcher from '@/components/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['header'];
}) {
  return (
    <header className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center' href='#'>
        <Stethoscope className='h-6 w-6' />
        <span className='sr-only'>{dictionary.title}</span>
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Link
          className='text-sm font-medium hover:underline underline-offset-4'
          href='/about'
        >
          {dictionary.about}
        </Link>
        <LocaleSwitcher />
        <ThemeToggle />
      </nav>
    </header>
  );
}

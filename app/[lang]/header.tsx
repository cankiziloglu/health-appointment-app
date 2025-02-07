import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import LocaleSwitcher from '@/components/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Locale } from '@/i18n-config';
import UserInfo from '@/components/user-info';
import { DictionaryType } from '@/lib/types';
import { getUserById } from '@/server/data/user';
import { auth } from '@/server/data/auth';

export async function Header({
  dictionary,
  lang,
}: {
  dictionary: DictionaryType['header'];
  lang: Locale['key'];
}) {
  const session = await auth();
  const isSignedIn = !!session;

  const user = await getUserById(
    (session?.payload as { userId: string })?.userId
  );
  const image = user?.image ?? '';

  return (
    <header className='flex mx-auto justify-between w-full max-w-5xl px-4 lg:px-6 py-4 h-16'>
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
        <UserInfo
          dictionary={dictionary}
          lang={lang}
          image={image}
          isSignedIn={isSignedIn}
        />
      </nav>
    </header>
  );
}

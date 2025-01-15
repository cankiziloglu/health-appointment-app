'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, Locale } from '@/i18n-config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { useLocale } from '@/lib/hooks';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const lang = useLocale(pathname);
  const redirectedPathname = (locale: Locale['key']) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <span className='text-xl'>{lang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => (
          <DropdownMenuItem key={locale.key} asChild>
            <Link href={redirectedPathname(locale.key)}>
              {locale.flag} {locale.value}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    // <div>
    //   <p>Locale switcher:</p>
    //   <ul>
    //     {i18n.locales.map((locale) => {
    //       return (
    //         <li key={locale}>
    //           <Link href={redirectedPathname(locale)}>{locale}</Link>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
  );
}

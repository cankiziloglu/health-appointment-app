'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { CircleUser } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DictionaryType } from '@/lib/types';
import { Locale } from '@/i18n-config';
import { signOutAction } from '@/server/actions/authActions';
import { useRouter } from 'next/navigation';

export default function UserInfo({
  dictionary,
  lang,
  image,
  isSignedIn,
}: {
  dictionary: DictionaryType['header'];
  lang: Locale['key'];
  image: string;
  isSignedIn: boolean;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
    router.refresh();
  };

  if (!isSignedIn) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-10 p-2'>
          <AvatarImage src={image} className='rounded-full' />
          <AvatarFallback>
            <CircleUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-sm font-mono font-medium'>
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/dashboard`}>{dictionary.dashboard}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          {dictionary.signout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

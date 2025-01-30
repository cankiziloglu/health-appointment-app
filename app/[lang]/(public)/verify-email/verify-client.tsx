'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DictionaryType } from '@/lib/types';
import { verifyEmailAction } from '@/server/actions/userActions';

export default function VerifyClient({
  token,
  dictionary,
}: {
  token: string | null;
  dictionary: DictionaryType['Verify'];
}) {
  const router = useRouter();
  const [text, setText] = useState<{ message: string; redir: string }>({
    message: '',
    redir: '',
  });

  useEffect(() => {
    verifyEmailAction(token).then((messageEn) => {
      const message =
        (dictionary as Record<string, string>)[messageEn] || messageEn;
      const redir = dictionary.redirect;
      setText({ message, redir });
    });
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router, token, dictionary]);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
      <p className='text'>{text.message}</p>
      <p className='text-sm text-muted-foreground'>{text.redir}</p>
    </div>
  );
}

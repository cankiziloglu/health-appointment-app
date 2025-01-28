'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyClient({
  text,
}: {
  text: {
    message: string;
    redir: string;
  };
}) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
      <p className='text'>{text.message}</p>
      <p className='text-sm text-muted-foreground'>{text.redir}</p>
    </div>
  );
}

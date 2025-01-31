'use client';

import { SessionData } from '@/lib/types';
import { updateSessionAction } from '@/server/actions/authActions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyClient({
  text,
  user,
}: {
  text: { messageTranslated: string; redir: string };
  user: SessionData | null;
}) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isVerified && user) {
      const handleUpdateSession = async () => {
        await updateSessionAction(user);
        // Remove the token from URL
        window.history.replaceState({}, '', window.location.pathname);
        setIsVerified(true);
      };

      handleUpdateSession();
    }

    const timer = setTimeout(() => {
      router.push('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router, user, isVerified]);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
      <p className='text'>{text.messageTranslated}</p>
      <p className='text-sm text-muted-foreground'>{text.redir}</p>
    </div>
  );
}

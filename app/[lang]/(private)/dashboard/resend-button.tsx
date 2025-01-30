'use client';

import { Button } from '@/components/ui/button';
import { sendVerifyEmailAction } from '@/server/actions/userActions';
import React, { useState } from 'react';

export default function ResendButton({
  text,
  userId,
  email,
}: {
  text: { idle: string; success: string; error: string };
  userId: string;
  email: string;
}) {
  const [status, setStatus] = useState('idle');

  const handleClick = async (userId: string) => {
    const result = await sendVerifyEmailAction({ userId, email });
    if (result && 'error' in result) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };
  return (
    <Button
      variant='outline'
      className='text-foreground'
      onClick={() => handleClick(userId)}
    >
      {status === 'idle'
        ? text.idle
        : status === 'success'
        ? text.success
        : text.error}
    </Button>
  );
}

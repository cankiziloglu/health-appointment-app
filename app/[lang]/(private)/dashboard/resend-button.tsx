'use client';

import { Button } from '@/components/ui/button';
import { sendVerifyEmailAction } from '@/server/actions/userActions';
import React from 'react';
import { toast } from 'sonner';

export default function ResendButton({
  text,
  userId,
  email,
}: {
  text: string;
  userId: string;
  email: string;
}) {
  const handleClick = async (userId: string) => {
    const result = await sendVerifyEmailAction({ userId, email });
    if (result && 'error' in result) {
      toast('Failed', {
        description: result.error,
      });
    } else {
      toast('Success', {
        description: 'Verification email sent',
      });
    }
  };
  return (
    <Button
      variant='outline'
      className='text-foreground'
      onClick={() => handleClick(userId)}
    >
      {text}
    </Button>
  );
}

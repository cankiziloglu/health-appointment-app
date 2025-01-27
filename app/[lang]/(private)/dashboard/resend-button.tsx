'use client';

import { Button } from '@/components/ui/button';
import { sendVerifyEmailAction } from '@/server/actions/userActions';
import React from 'react';

export default function ResendButton({
  text,
  userId,
}: {
  text: string;
  userId: string;
}) {
  return (
    <Button
      variant='outline'
      className='text-foreground'
      onClick={() => sendVerifyEmailAction(userId)}
    >
      {text}
    </Button>
  );
}

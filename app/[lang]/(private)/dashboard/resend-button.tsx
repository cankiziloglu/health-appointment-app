'use client';

import { Button } from '@/components/ui/button';
import { sendVerifyEmailAction } from '@/server/actions/userActions';
import React from 'react';

export default function ResendButton({
  text,
  userId,
  email,
}: {
  text: string;
  userId: string;
  email: string;
}) {
  const handleClick = (userId: string) => {
    const result = sendVerifyEmailAction({ userId, email });
    
    // TODO: Toast to display result
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

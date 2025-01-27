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
  const handleClick = (userId: string) => {
    const result = sendVerifyEmailAction(userId);
    console.log(result);
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

'use client';

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='size-4' />
      ) : (
        <MoonStar className='size-4' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}

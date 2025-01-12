'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

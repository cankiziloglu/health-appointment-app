import type { Metadata } from 'next';
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from 'next/font/google';
import '../globals.css';
import { Providers } from './providers';
import { Locale } from '@/i18n-config';

const ubuntuSans = Ubuntu_Sans({
  variable: '--font-ubuntu-sans',
  subsets: ['latin-ext'],
});

const ubuntuSansMono = Ubuntu_Sans_Mono({
  variable: '--font-ubuntu-mono',
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'Healtcare Appointment App',
  description:
    'Find Appointments for Your Favorite Healthcare Provider or Doctor',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale['key'] }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${ubuntuSans.variable} ${ubuntuSansMono.variable} antialiased`}
      >
        <Providers attribute='class' defaultTheme='system' enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}
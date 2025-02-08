import type { Metadata } from 'next';
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from 'next/font/google';
import '../globals.css';
import { Providers } from './providers';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Header } from './header';
import Footer from './footer';
import { Toaster } from 'sonner';

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
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${ubuntuSans.variable} ${ubuntuSansMono.variable} antialiased min-h-screen flex flex-col justify-between`}
      >
        <Providers attribute='class' defaultTheme='system' enableSystem>
          <Header dictionary={dict.header} lang={lang} />
          <main className='font-sans max-w-5xl mx-auto w-full'>{children}</main>
          <Footer dictionary={dict.footer} lang={lang} />
        </Providers>
          <Toaster />
      </body>
    </html>
  );
}

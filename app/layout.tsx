import type { Metadata } from 'next';
import { Ubuntu_Sans, Ubuntu_Sans_Mono } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${ubuntuSans.variable} ${ubuntuSansMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

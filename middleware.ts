import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { cookies } from 'next/headers';
import { decrypt } from './server/actions/authActions';

const locales = ['en', 'tr'];
function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, 'en');

  return locale;
}

export default async function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  const isSignedIn = !!session;
  // If user is not signed in replace dashboard in pathname with signin
  if (pathname.includes('dashboard') && !isSignedIn) {
    const segments = pathname.split('/');
    const idx = segments.findIndex((segment) => segment === 'dashboard');
    segments[idx] = 'signin';
    segments.splice(idx + 1);
    pathname = segments.join('/');
    return NextResponse.redirect(
      new URL(`${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

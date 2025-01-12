import { i18n } from '@/i18n-config';

export function useLocale(pathname: string) {
  const segments = pathname.split('/');
  const locale = segments[1];
  return i18n.locales.find((loc) => loc.key === locale);
}

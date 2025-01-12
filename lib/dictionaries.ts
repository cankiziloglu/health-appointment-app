import { Locale } from '@/i18n-config';
import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  tr: () => import('@/dictionaries/tr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale['key']) =>
  dictionaries[locale]();

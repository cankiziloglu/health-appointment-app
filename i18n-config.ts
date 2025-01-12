export const i18n = {
  defaultLocale: 'en',
  locales: [
    { key: 'en', flag: '🇺🇸', value: 'English' },
    { key: 'tr', flag: '🇹🇷', value: 'Turkish' },
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];

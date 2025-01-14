
import { Locale } from '@/i18n-config';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params

  return (
    <main>
      About this app
      </main>
  );
}

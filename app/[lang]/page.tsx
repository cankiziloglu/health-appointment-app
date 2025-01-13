import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Stethoscope,
  Search,
  Clock,
  Calendar,
  Users,
} from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

import { Locale } from '@/i18n-config';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale['key'] }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                {dict.HomePage.title}
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                {dict.HomePage.subtitle}
              </p>
            </div>
            <Card className='w-full max-w-sm'>
              <CardContent className='p-4 space-y-4'>
                <div className='space-y-2'>
                  <Select>
                    <SelectTrigger>
                      <MapPin className='mr-2 h-4 w-4' />
                      <SelectValue
                        placeholder={dict.HomePage.cityPlaceholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='istanbul'>İstanbul</SelectItem>
                      <SelectItem value='ankara'>Ankara</SelectItem>
                      <SelectItem value='izmir'>İzmir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Select>
                    <SelectTrigger>
                      <Stethoscope className='mr-2 h-4 w-4' />
                      <SelectValue
                        placeholder={dict.HomePage.specialtyPlaceholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='genel-saglik'>
                        {lang === 'tr' ? 'Genel Sağlık' : 'General Health'}
                      </SelectItem>
                      <SelectItem value='kardiyoloji'>
                        {lang === 'tr' ? 'Kardiyoloji' : 'Cardiology'}
                      </SelectItem>
                      <SelectItem value='noroloji'>
                        {lang === 'tr' ? 'Nöroloji' : 'Neurology'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className='w-full'>
                  <Search className='mr-2 h-4 w-4' />{' '}
                  {dict.HomePage.searchButton}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
            {dict.HomePage.features.map((feature, index) => (
              <div
                key={index}
                className='flex flex-col items-center space-y-2 text-center'
              >
                {index === 0 && <Clock className='h-10 w-10' />}
                {index === 1 && <Calendar className='h-10 w-10' />}
                {index === 2 && <Users className='h-10 w-10' />}
                <h2 className='text-xl font-bold'>{feature.title}</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Locale } from '@/i18n-config';
import { DictionaryType, UserWithProfilesType } from '@/lib/types';
import { CircleUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreatePrivatePractitionerForm from './create-private-practitioner-form';
import CreateHealthcareProviderForm from './create-healthcare-provider-form';
import { MedicalUnit } from '@prisma/client';
import { useState } from 'react';

export default function ProfileList({
  dictionary,
  user,
  lang,
  medicalUnits,
}: {
  dictionary: DictionaryType['Dashboard'];
  user: UserWithProfilesType;
  lang: Locale['key'];
  medicalUnits: MedicalUnit[];
}) {
  const doctor = user.doctor;
  const provider = user.provider;
  const role = user.role;
  const isVerified = user.emailVerified;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className='w-full min-w-[340px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.profiles}</CardTitle>
        <CardDescription>{dictionary.profile_desc}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold'>
              {role === 'PP' ? dictionary.pp : dictionary.hcp}
            </h3>
            {doctor == null && provider == null ? (
              <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DialogTrigger asChild>
                  <Button variant='outline' size='sm' disabled={!isVerified}>
                    {dictionary.create}
                  </Button>
                </DialogTrigger>
                <DialogContent className='max-h-[90vh]'>
                  <DialogHeader>
                    <DialogTitle className='sr-only'>
                      Create Profile
                    </DialogTitle>
                    <DialogDescription className='sr-only'></DialogDescription>
                  </DialogHeader>
                  {role === 'PP' ? (
                    <CreatePrivatePractitionerForm
                      dictionary={dictionary.createProfileForm}
                      lang={lang}
                      medicalUnits={medicalUnits}
                      setIsOpen={setIsOpen}
                    />
                  ) : (
                    <CreateHealthcareProviderForm
                      dictionary={dictionary.createProfileForm}
                      lang={lang}
                      setIsOpen={setIsOpen}
                    />
                  )}
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
          {role === 'PP' && doctor == null ? (
            <p>{dictionary.null}</p>
          ) : role === 'PP' && doctor !== null ? (
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <Avatar className='size-10 p-2 cursor-pointer hover:text-muted-foreground'>
                  <AvatarImage
                    src={doctor.photo_url ?? ''}
                    className='rounded-full'
                  />
                  <AvatarFallback>
                    <CircleUser />
                  </AvatarFallback>
                </Avatar>
                <span>{`${doctor.title} ${doctor.first_name} ${doctor.last_name}`}</span>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  router.push(`/${lang}/dashboard/doctor/${doctor.id}`)
                }
              >
                {dictionary.edt}
              </Button>
            </div>
          ) : null}
        </div>
        <div>
          {role === 'HCP' && provider == null ? (
            <p>{dictionary.null}</p>
          ) : role === 'HCP' && provider !== null ? (
            <div className='flex justify-between items-center'>
              <div className='flex gap-2 items-center'>
                <Avatar className='size-10 p-2 cursor-pointer hover:text-muted-foreground'>
                  <AvatarImage
                    src={provider.logo_url ?? ''}
                    className='rounded-full'
                  />
                  <AvatarFallback>
                    <CircleUser />
                  </AvatarFallback>
                </Avatar>
                <span>{provider.name}</span>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  router.push(`/${lang}/dashboard/provider/${provider.id}`)
                }
              >
                {dictionary.edt}
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

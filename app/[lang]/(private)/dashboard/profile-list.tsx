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
import { DictionaryType, UserWithProfilesType } from '@/lib/types';
import { CircleUser } from 'lucide-react';

export default function ProfileList({
  dictionary,
  user,
}: {
  dictionary: DictionaryType['Dashboard'];
  user: UserWithProfilesType;
}) {
  const doctor = user.doctor;
  const provider = user.provider;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.profiles}</CardTitle>
        <CardDescription>{dictionary.profile_desc}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold'>{dictionary.pp}</h3>
            <Button variant='outline' size='sm'>
              {dictionary.create}
            </Button>
          </div>
          {doctor == null ? (
            <p>{dictionary.null}</p>
          ) : (
            <div className='flex justify-between items-center'>
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
              <Button variant='outline' size='sm'>
                {dictionary.edt}
              </Button>
            </div>
          )}
        </div>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold'>{dictionary.hcp}</h3>
            <Button variant='outline' size='sm'>
              {dictionary.create}
            </Button>
          </div>
          {provider == null ? (
            <p>{dictionary.null}</p>
          ) : (
            <div className='flex justify-between items-center'>
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
              <Button variant='outline' size='sm'>
                {dictionary.edt}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

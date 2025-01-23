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
import { useRouter } from 'next/navigation';

export default function ProfileList({
  dictionary,
  user,
}: {
  dictionary: DictionaryType['Dashboard'];
  user: UserWithProfilesType;
}) {
  const doctor = user.doctor;
  const provider = user.provider;
  const role = user.role;
  const router = useRouter()

  return (
    <Card>
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
            {doctor == null || provider == null ? (
              // TODO: Create a dialog to create a profile
              <Button variant='outline' size='sm'>
                {dictionary.create}
              </Button>
            ) : null}
          </div>
          {role === 'PP' && doctor == null ? (
            <p>{dictionary.null}</p>
          ) : role === 'PP' && doctor !== null ? (
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
              <Button variant='outline' size='sm' onClick={() => router.push(`/dashboard/doctor/${doctor.id}`)}>
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
              <Button variant='outline' size='sm' onClick={() => router.push(`/dashboard/provider/${provider.id}`)}>
                {dictionary.edt}
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

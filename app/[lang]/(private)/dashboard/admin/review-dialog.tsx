'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Doctor, HealthcareProvider } from '@prisma/client';
import { DictionaryType } from '@/lib/types';
import Image from 'next/image';

type ReviewData = (HealthcareProvider | Doctor) & {
  photo?: string | null;
  logo?: string | null;
};

type ReviewDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  data: ReviewData | null;
  type: 'provider' | 'practitioner';
  dictionary: DictionaryType['Dashboard'];
};

export default function ReviewDialog({
  isOpen,
  onClose,
  data,
  type,
  dictionary,
}: ReviewDialogProps) {
  if (!data) return null;

  const isProvider = type === 'provider' && 'name' in data;
  const isPractitioner = type === 'practitioner' && 'first_name' in data;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {type === 'provider'
              ? dictionary.admin.reviewTitle
              : dictionary.admin.reviewTitlePractitioner}
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {isProvider && (
            <>
              {data.logo && (
                <div className='flex justify-center'>
                  <Image
                    src={data.logo}
                    alt={data.name}
                    width={100}
                    height={100}
                    className='rounded-lg object-cover'
                  />
                </div>
              )}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>{dictionary.admin.name}</Label>
                <div className='col-span-3'>{data.name}</div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>{dictionary.admin.email}</Label>
                <div className='col-span-3'>{data.email}</div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>{dictionary.admin.phone}</Label>
                <div className='col-span-3'>{data.phone}</div>
              </div>
            </>
          )}
          {isPractitioner && (
            <>
              {data.photo && (
                <div className='flex justify-center'>
                  <Image
                    src={data.photo}
                    alt={`${data.first_name} ${data.last_name}`}
                    width={100}
                    height={100}
                    className='rounded-full object-cover'
                  />
                </div>
              )}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>{dictionary.admin.name}</Label>
                <div className='col-span-3'>
                  {data.first_name} {data.last_name}
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>
                  {dictionary.admin.title_field}
                </Label>
                <div className='col-span-3'>{data.title}</div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>{dictionary.admin.email}</Label>
                <div className='col-span-3'>{data.email}</div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>{dictionary.admin.phone}</Label>
                <div className='col-span-3'>{data.phone}</div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

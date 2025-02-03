'use client';

import { DictionaryType } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserFormSchema, updateUserFormSchemaType } from '@/lib/schemas';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { User } from '@prisma/client';
import { updateUserAction } from '@/server/actions/userActions';
import { useState } from 'react';
import { ChangePass } from './change-pass';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function UserDetails({
  dictionary,
  user,
}: {
  dictionary: DictionaryType['Dashboard'];
  user: User;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<updateUserFormSchemaType>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: user.name ?? '',
      email: user.email,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<updateUserFormSchemaType> = async (data) => {
    if (data.email === user.email && data.name === user.name) {
      setIsEditing(false);
      reset();
      return;
    }

    if (data.email === user.email) setEmailVerified(true);

    const payload = { ...data, userId: user.id, emailVerified };
    const submitted = await updateUserAction(payload);

    if (submitted && 'errors' in submitted) {
      setError('root', {
        type: 'custom',
        message:
          submitted.errors?.formErrors[0] ||
          'Server returned an error, please try again',
      });
      setError('email', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.email?.[0] || 'Invalid email',
      });
      setError('name', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.name?.[0] || 'Invalid name',
      });
    }
    if (submitted && 'error' in submitted) {
      setError('root', {
        type: 'custom',
        message: submitted.error,
      });
    }
    if (submitted && 'success' in submitted) {
      toast('Success', {
        description: submitted.success,
      });
      router.refresh();
      setIsEditing(false);
    }
  };

  return (
    <Card className='w-full min-w-[340px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.account}</CardTitle>
        <CardDescription>{dictionary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>{dictionary.name}</Label>
              <Input {...register('name')} type='text' disabled={!isEditing} />
              {errors.name && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{dictionary.email}</Label>
              <Input
                {...register('email')}
                type='email'
                disabled={!isEditing}
              />
              {errors.email && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='flex gap-4'>
              {!isEditing && (
                <Button
                  type='button'
                  className='w-full'
                  disabled={isSubmitting}
                  onClick={() => setIsEditing(true)}
                >
                  {dictionary.edit}
                </Button>
              )}
              {isEditing && (
                <Button
                  type='button'
                  className='w-full'
                  variant='outline'
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                >
                  {dictionary.cancel}
                </Button>
              )}
              {isEditing && (
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  {isSubmitting && <LoaderCircle className='animate-spin' />}
                  {dictionary.save}
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  {!isEditing && (
                    <Button
                      type='button'
                      className='w-full'
                      disabled={isSubmitting || isEditing}
                    >
                      {dictionary.change}
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent className='max-w-sm'>
                  <DialogHeader>
                    <DialogTitle>{dictionary.change}</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <ChangePass dictionary={dictionary} user={user} />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type='button' variant='outline'>
                        {dictionary.cancel}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {errors.root && (
              <div className='rounded-xl w-full bg-destructive/20 text-destructive px-4 py-2 text-sm font-medium'>
                {errors.root.message}
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

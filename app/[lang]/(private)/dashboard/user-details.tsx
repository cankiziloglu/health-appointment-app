'use client';

import { DictionaryType } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema, updateUserSchemaType } from '@/lib/schemas';

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
import { revalidatePath } from 'next/cache';

export default function UserDetails({
  dictionary,
  user,
}: {
  dictionary: DictionaryType['Dashboard'];
  user: User;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<updateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name ?? '',
      email: user.email,
      password: '',
      cpassword: '',
    },
  });

  const onSubmit: SubmitHandler<updateUserSchemaType> = async (data) => {
    const submitted = await updateUserAction(data);
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
      setError('password', {
        type: 'custom',
        message:
          submitted.errors?.fieldErrors.password?.[0] || 'Invalid password',
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
    if (submitted && 'name' in submitted) {
      revalidatePath('/dashboard');
    }
  };

  return (
    <Card className='w-[360px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.account}</CardTitle>
        <CardDescription>{dictionary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>{dictionary.name}</Label>
              <Input {...register('name')} type='text' />
              {errors.name && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{dictionary.email}</Label>
              <Input {...register('email')} type='email' />
              {errors.email && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='flex gap-4'>
              <Button type='button' className='w-full' disabled={isSubmitting}>
                {dictionary.edit}
              </Button>
              <Button type='button' className='w-full' disabled={isSubmitting}>
                {dictionary.change}
              </Button>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>{dictionary.password}</Label>
              <Input {...register('password')} type='password' />
              {errors.password && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='cpassword'>{dictionary.cpassword}</Label>
              <Input {...register('cpassword')} type='password' />
              {errors.cpassword && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.cpassword.message}
                </span>
              )}
            </div>
            {errors.root && (
              <div className='rounded-xl w-full bg-destructive/20 text-destructive p-2 text-sm font-medium'>
                {errors.root.message}
              </div>
            )}
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting && <LoaderCircle className='animate-spin' />}
              {dictionary.save}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

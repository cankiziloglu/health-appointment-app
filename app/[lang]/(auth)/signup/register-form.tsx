'use client';

import { DictionaryType } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchemaType } from '@/lib/schemas';

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
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { registerAction } from '@/server/data/authActions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function RegisterForm({
  dictionary,
  lang,
}: {
  dictionary: DictionaryType['signUpForm'];
  lang: Locale['key'];
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
      role: undefined,
    },
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    const submitted = await registerAction(data);
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
      setError('role', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.role?.[0] || 'Invalid role',
      });
    }
    if (submitted && 'error' in submitted) {
      setError('root', {
        type: 'custom',
        message: submitted.error,
      });
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>{dictionary.signIn}</CardTitle>
          <CardDescription>{dictionary.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>{dictionary.name}</Label>
                <Input {...register('name')} type='text' id='name' />
                {errors.name && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>{dictionary.email}</Label>
                <Input {...register('email')} type='email' id='email' />
                {errors.email && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>{dictionary.password}</Label>
                <Input
                  {...register('password')}
                  type='password'
                  id='password'
                />
                {errors.password && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='cpassword'>{dictionary.cpassword}</Label>
                <Input
                  {...register('cpassword')}
                  type='password'
                  id='cpassword'
                />
                {errors.cpassword && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.cpassword.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <RadioGroup defaultValue='PP' {...register('role')}>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='PP' id='PP' />
                    <Label htmlFor='PP'>{dictionary.pp}</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='HCP' id='HCP' />
                    <Label htmlFor='HCP'>{dictionary.hcp}</Label>
                  </div>
                </RadioGroup>
              </div>
              {errors.root && (
                <div className='rounded-xl w-full bg-destructive/20 text-destructive p-2 text-sm font-medium'>
                  {errors.root.message}
                </div>
              )}
              <Button type='submit' className='w-full' disabled={isLoading}>
                {dictionary.register}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {dictionary.account}
              <Link
                href={`/${lang}/signin`}
                className='underline underline-offset-4'
              >
                {dictionary.signIn}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

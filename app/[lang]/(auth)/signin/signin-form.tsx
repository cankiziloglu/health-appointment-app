'use client';

import { DictionaryType } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInSchemaType } from '@/lib/schemas';

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
import { signInAction } from '@/server/actions/authActions';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

export default function SignInForm({
  dictionary,
  lang,
}: {
  dictionary: DictionaryType['signInForm'];
  lang: Locale['key'];
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    const submitted = await signInAction(data);
    if (submitted && 'error' in submitted) {
      setError('root', {
        type: 'custom',
        message: submitted.error,
      });
    }
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
    }
    if (submitted?.success) {
      reset();
      router.push(`/${lang}/dashboard`);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='w-[380px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>{dictionary.signIn}</CardTitle>
          <CardDescription>{dictionary.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>{dictionary.email}</Label>
                <Input {...register('email')} type='email' />
                {errors.email && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>{dictionary.password}</Label>
                <Input {...register('password')} type='password' />
                {errors.password && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.password.message}
                  </span>
                )}
                <Link
                  href='#' // TODO: forgot password logic and link
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                >
                  {dictionary.forgot}
                </Link>
              </div>
              {errors.root && (
                <div className='rounded-xl w-full bg-destructive/20 text-destructive p-2 text-sm font-medium'>
                  {errors.root.message}
                </div>
              )}
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle className='animate-spin' />}
                {dictionary.signIn}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {dictionary.account}
              <Link
                href={`/${lang}/signup`}
                className='underline underline-offset-4'
              >
                {dictionary.register}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

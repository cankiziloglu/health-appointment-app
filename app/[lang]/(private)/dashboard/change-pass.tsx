'use client';

import { DictionaryType } from '@/lib/types';
import { User } from '@prisma/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { changePassSchema, changePassSchemaType } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordAction } from '@/server/actions/userActions';
import { revalidatePath } from 'next/cache';
import { useToast } from '@/hooks/use-toast';

export function ChangePass({
  dictionary,
  user,
  setEditPass
}: {
  dictionary: DictionaryType['Dashboard'];
    user: User;
  setEditPass: (arg0: boolean) => void
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<changePassSchemaType>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      password: '',
      cpassword: '',
    },
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<changePassSchemaType> = async (data) => {
    
    const submitted = await changePasswordAction(data);
    if (submitted && 'errors' in submitted) {
      setError('root', {
        type: 'custom',
        message:
          submitted.errors?.formErrors[0] ||
          'Server returned an error, please try again',
      });
      setError('password', {
        type: 'custom',
        message:
          submitted.errors?.fieldErrors.password?.[0] || 'Invalid password',
      });
    }
    if (submitted && 'error' in submitted) {
      setError('root', {
        type: 'custom',
        message: submitted.error,
      });
    }
    if (submitted && 'success' in submitted) {
      toast({
        title: 'Success',
        description: submitted.success,
      });
      revalidatePath('/dashboard');
    }
    reset();
  };

  return (
    <Card className='w-[360px] mt-4'>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.change}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
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
            <div className='flex gap-4'>
              <Button
                type='button'
                className='w-full'
                variant='outline'
                disabled={isSubmitting}
                onClick={() => {
                  setEditPass(false);
                }}
              >
                {dictionary.cancel}
              </Button>
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle className='animate-spin' />}
                {dictionary.save}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

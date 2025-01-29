'use client';

import { DictionaryType } from '@/lib/types';
import { User } from '@prisma/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { changePassFormSchema, changePassFormSchemaType } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordAction } from '@/server/actions/userActions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function ChangePass({
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
  } = useForm<changePassFormSchemaType>({
    resolver: zodResolver(changePassFormSchema),
    defaultValues: {
      password: '',
      cpassword: '',
    },
  });

  const router = useRouter();

  const onPassChangeSubmit: SubmitHandler<changePassFormSchemaType> = async (data) => {
    const payload = { ...data, userId: user.id };
    const submitted = await changePasswordAction(payload);
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
      toast('Success', {
        description: submitted.success,
      });
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onPassChangeSubmit)}>
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
            <div className='flex justify-end'>
              <Button type='submit' className='w-1/2' disabled={isSubmitting}>
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

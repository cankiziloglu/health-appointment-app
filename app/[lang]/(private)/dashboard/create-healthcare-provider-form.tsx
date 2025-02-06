import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Locale } from '@/i18n-config';
import {
  createHealthcareProviderSchema,
  createHealthcareProviderSchemaType,
} from '@/lib/schemas';
import { DictionaryType } from '@/lib/types';
import { createHealthcareProviderAction } from '@/server/actions/providerActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input';

const CreateHealthcareProviderForm = ({
  dictionary,
  lang,
}: {
  dictionary: DictionaryType['Dashboard']['createProfileForm'];
  lang: Locale['key'];
}) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createHealthcareProviderSchemaType>({
    resolver: zodResolver(createHealthcareProviderSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<createHealthcareProviderSchemaType> = async (
    data
  ) => {
    const submitted = await createHealthcareProviderAction(data);
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
      setError('phone', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.phone?.[0] || 'Invalid phone',
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
    if (submitted?.success) {
      reset();
      router.push(`/${lang}/dashboard`);
    }
    console.log(data);
    console.log(submitted);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.hcp_title}</CardTitle>
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
            <div className='grid gap-2'>
              <Label htmlFor='phone'>{dictionary.phone}</Label>
              <Controller
                name='phone'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    country='TR'
                    inputComponent={Input}
                  />
                )}
              />
              {errors.phone && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.phone.message}
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
              {dictionary.create}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateHealthcareProviderForm;

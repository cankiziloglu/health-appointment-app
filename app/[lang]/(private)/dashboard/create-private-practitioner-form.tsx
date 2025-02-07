'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Locale } from '@/i18n-config';
import { cities } from '@/lib/constants';
import {
  createPrivatePractitionerSchema,
  createPrivatePractitionerSchemaType,
} from '@/lib/schemas';
import { DictionaryType } from '@/lib/types';
import { createPrivatePractitionerAction } from '@/server/actions/doctorActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { MedicalUnit } from '@prisma/client';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input';

const CreatePrivatePractitionerForm = ({
  dictionary,
  lang,
  medicalUnits,
  setIsOpen,
}: {
  dictionary: DictionaryType['Dashboard']['createProfileForm'];
  lang: Locale['key'];
  medicalUnits: MedicalUnit[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createPrivatePractitionerSchemaType>({
    resolver: zodResolver(createPrivatePractitionerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      medicalUnit: '',
      phone: '',
      city: '',
      address: '',
      district: '',
      postalCode: '',
    },
  });

  const router = useRouter();
  // TODO: Change onSubmit function
  const onSubmit: SubmitHandler<createPrivatePractitionerSchemaType> = async (
    data
  ) => {
    const submitted = await createPrivatePractitionerAction(data);
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
      setError('firstName', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.firstName?.[0] || 'Invalid name',
      });
      setError('title', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.title?.[0] || 'Invalid title',
      });
      setError('lastName', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.lastName?.[0] || 'Invalid name',
      });
      setError('medicalUnit', {
        type: 'custom',
        message:
          submitted.errors?.fieldErrors.medicalUnit?.[0] ||
          'Invalid medical unit',
      });
      setError('city', {
        type: 'custom',
        message: submitted.errors?.fieldErrors.city?.[0] || 'Invalid city',
      });
      setError('district', {
        type: 'custom',
        message:
          submitted.errors?.fieldErrors.district?.[0] || 'Invalid district',
      });
      setError('address', {
        type: 'custom',
        message:
          submitted.errors?.fieldErrors.address?.[0] || 'Invalid address',
      });
      setError('postalCode', {
        type: 'custom',
        message:
          submitted.errors?.fieldErrors.postalCode?.[0] ||
          'Invalid postal code',
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
      setIsOpen(false);
      router.push(`/${lang}/dashboard`);
    }
    console.log(submitted);
  };

  return (
    <Card className='max-h-[80vh] overflow-y-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>{dictionary.pp_title}</CardTitle>
        <CardDescription>{dictionary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='w-full flex flex-col md:flex-row gap-2'>
              <div className='grid gap-2 md:w-1/5'>
                <Label htmlFor='name'>{dictionary.title}</Label>
                <Input {...register('title')} type='text' />
                {errors.title && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2 md:w-2/5'>
                <Label htmlFor='name'>{dictionary.first_name}</Label>
                <Input {...register('firstName')} type='text' />
                {errors.firstName && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2 md:w-2/5'>
                <Label htmlFor='name'>{dictionary.last_name}</Label>
                <Input {...register('lastName')} type='text' />
                {errors.lastName && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-2'>
              <div className='grid gap-2 md:w-1/2'>
                <Label htmlFor='email'>{dictionary.email}</Label>
                <Input {...register('email')} type='email' />
                {errors.email && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2 md:w-1/2'>
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
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='medicalUnit'>{dictionary.medical_unit}</Label>
              <Controller
                name='medicalUnit'
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select...' />
                    </SelectTrigger>
                    <SelectContent>
                      {medicalUnits.map((medicalUnit) => (
                        <SelectItem value={medicalUnit.id} key={medicalUnit.id}>
                          {lang === 'tr'
                            ? medicalUnit.name_tr
                            : medicalUnit.name_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.medicalUnit && (
                <span className='text-sm font-medium text-destructive'>
                  {errors.medicalUnit.message}
                </span>
              )}
            </div>
            <div className='grid gap-2'>
              <p className='font-bold'>Address</p>
              <Separator />
            </div>
            <div className='w-full flex flex-col md:flex-row gap-2'>
              <div className='grid gap-2 md:w-1/2'>
                <Label htmlFor='city'>{dictionary.city}</Label>
                <Controller
                  name='city'
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select...' />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem value={city.id} key={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.city && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2 md:w-1/2'>
                <Label htmlFor='district'>{dictionary.district}</Label>
                <Input {...register('district')} type='text' />
                {errors.district && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.district.message}
                  </span>
                )}
              </div>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-2'>
              <div className='grid gap-2 md:w-3/4'>
                <Label htmlFor='address'>{dictionary.address}</Label>
                <Input {...register('address')} type='text' />
                {errors.address && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div className='grid gap-2 md:w-1/4'>
                <Label htmlFor='postalCode'>{dictionary.postal_code}</Label>
                <Input {...register('postalCode')} type='text' />
                {errors.postalCode && (
                  <span className='text-sm font-medium text-destructive'>
                    {errors.postalCode.message}
                  </span>
                )}
              </div>
            </div>
            {errors.root && (
              <div className='rounded-xl w-full bg-destructive/20 text-destructive p-2 text-sm font-medium'>
                {errors.root.message}
              </div>
            )}
            <div className='w-full flex gap-4'>
              <Button
                type='button'
                variant='outline'
                className='w-1/2'
                onClick={() => setIsOpen(false)}
              >
                {dictionary.cancel}
              </Button>

              <Button type='submit' className='w-1/2' disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle className='animate-spin' />}
                {dictionary.create}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePrivatePractitionerForm;

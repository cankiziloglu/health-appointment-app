'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Locale } from '@/i18n-config';
import { deleteUserSchema } from '@/lib/schemas';
import { DictionaryType, UserWithProfilesType } from '@/lib/types';
import { deleteUserAction } from '@/server/actions/userActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const UserDelete = ({
  dictionary,
  user,
  lang,
}: {
  dictionary: DictionaryType['Dashboard'];
  user: UserWithProfilesType;
  lang: Locale['key'];
}) => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    if (user.doctor_id || user.provider_id) {
      toast(`${dictionary.deleteUnableToast}`, {
        description: `${dictionary.deleteUnableToastDesc}`,
      });
      console.log('toast');
      return;
    }
    const result = await deleteUserAction(user.id);
    if (result && 'success' in result) {
      toast(`${dictionary.deleteToast}`);
      router.push(`/${lang}`);
      return;
    }
    toast(`${dictionary.deleteErrorToast}`, {
      description: `${dictionary.deleteErrorToastDesc}`,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      confirm: '',
    },
  });

  return (
    <Card className='w-full min-w-[340px]'>
      <CardHeader>
        <CardTitle className='sr-only'>{dictionary.deleteTitle}</CardTitle>
        <CardDescription className='text-destructive'>
          {dictionary.deleteDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive' size='sm' className=''>
              {dictionary.deleteButton}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='w-full mx-auto'>
            <AlertDialogHeader>
              <AlertDialogTitle>{dictionary.alertTitle}</AlertDialogTitle>
              <AlertDialogDescription className='flex flex-col gap-2'>
                <span>{dictionary.alertDescription}</span>
                <span className='font-bold'>
                  {dictionary.alertDescription2}
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <form
                onSubmit={handleSubmit(handleDeleteUser)}
                className='flex flex-col md:flex-row gap-2 w-full'
              >
                <Input
                  type='text'
                  {...register('confirm')}
                  className='text-destructive border-destructive font-bold'
                />
                <AlertDialogCancel>{dictionary.alertCancel}</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type='submit'
                    disabled={!isValid || isSubmitting}
                    className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  >
                    {dictionary.alertContinue}
                  </Button>
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default UserDelete;

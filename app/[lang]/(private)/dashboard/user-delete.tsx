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
import { Locale } from '@/i18n-config';
import { DictionaryType, UserWithProfilesType } from '@/lib/types';
import { deleteUserAction } from '@/server/actions/userActions';
import { useRouter } from 'next/navigation';
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

  return (
    <Card className='w-full min-w-[340px] border-2 border-destructive'>
      <CardHeader>
        <CardTitle className='sr-only'>{dictionary.deleteTitle}</CardTitle>
        <CardDescription className='text-destructive'>
          {dictionary.deleteDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive' className=''>
              {dictionary.deleteButton}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className=''>
            <AlertDialogHeader>
              <AlertDialogTitle>{dictionary.alertTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {dictionary.alertDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{dictionary.alertCancel}</AlertDialogCancel>
              <AlertDialogAction
                className='bg-destructive'
                onClick={() => handleDeleteUser()}
              >
                {dictionary.alertContinue}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default UserDelete;

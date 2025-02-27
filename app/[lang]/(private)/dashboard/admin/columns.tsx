'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User, HealthcareProvider, Doctor } from '@prisma/client';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { DictionaryType, UserWithProfilesType } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  deleteUserAction,
  getUserDetailsAction,
} from '@/server/actions/userActions';
import { makeUserAdminAction } from '@/server/actions/adminActions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteUserSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';

interface UserActionsProps {
  user: User;
  dictionary: DictionaryType['Dashboard'];
}

// Separate component for user actions to properly use React hooks
const UserActions = ({ user, dictionary }: UserActionsProps) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState<UserWithProfilesType | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  // Get user details for the dialog
  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const result = await getUserDetailsAction(user.id);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.user) {
        setUserDetails(result.user);
        setShowUserDetails(true);
      }
    } catch (error) {
      toast(dictionary.admin.verifyGenericError, {
        description:
          error instanceof Error ? error.message : dictionary.admin.verifyError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Make user admin
  const handleMakeAdmin = async () => {
    if (user.role === 'ADMIN') {
      toast(dictionary.admin.makeAdminError, {
        description:
          dictionary.admin.makeAdminErrorDesc || 'User is already an admin',
      });
      return;
    }

    try {
      const result = await makeUserAdminAction(user.id);
      if (result && 'success' in result) {
        toast(dictionary.admin.makeAdminSuccess);
        router.refresh();
        return;
      }
      toast(dictionary.admin.makeAdminError, {
        description: result?.error || dictionary.admin.verifyGenericError,
      });
    } catch {
      toast(dictionary.admin.makeAdminError, {
        description: dictionary.admin.verifyGenericError,
      });
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    try {
      const result = await deleteUserAction(user.id);
      if (result && 'success' in result) {
        toast(dictionary.deleteToast);
        setShowDeleteDialog(false);
        router.refresh();
        return;
      }
      toast(dictionary.deleteUnableToast, {
        description: dictionary.deleteUnableToastDesc,
      });
    } catch {
      toast(dictionary.deleteErrorToast, {
        description: dictionary.deleteErrorToastDesc,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{dictionary.admin.actions}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(user.id);
              toast(dictionary.admin.idCopiedToast);
            }}
          >
            {dictionary.admin.copyId}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={fetchUserDetails} disabled={isLoading}>
            {dictionary.admin.view}
          </DropdownMenuItem>
          {user.role !== 'ADMIN' && (
            <DropdownMenuItem onClick={handleMakeAdmin}>
              {dictionary.admin.makeAdmin}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className='text-destructive'
          >
            {dictionary.admin.deleteUser}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>{dictionary.admin.viewUserDetails}</DialogTitle>
            <DialogDescription>
              {dictionary.admin.viewUserDetailsDesc}
            </DialogDescription>
          </DialogHeader>

          {userDetails && (
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage
                    src={userDetails?.image || ''}
                    alt={userDetails?.name || ''}
                  />
                  <AvatarFallback>
                    {userDetails?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase() || ''}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className='font-medium text-lg'>{userDetails?.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {userDetails?.email}
                  </p>
                </div>
              </div>

              <Separator />

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>ID</p>
                  <p className='text-sm text-muted-foreground break-all'>
                    {userDetails?.id}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>
                    {dictionary.admin.columns.role}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {userDetails?.role}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>
                    {dictionary.admin.columns.verified}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {userDetails?.emailVerified
                      ? format(new Date(userDetails.emailVerified), 'PP')
                      : dictionary.admin.notVerifiedText}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>
                    {dictionary.admin.columns.created}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {userDetails?.createdAt &&
                      format(new Date(userDetails.createdAt), 'PP')}
                  </p>
                </div>
              </div>

              {/* Show Doctor or Provider profiles if they exist */}
              {userDetails?.doctor && (
                <>
                  <Separator />
                  <h4 className='font-medium'>
                    {dictionary.admin.tabs.practitioners} Profile
                  </h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Name</p>
                      <p className='text-sm text-muted-foreground'>
                        {`${userDetails.doctor.first_name} ${userDetails.doctor.last_name}`}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Title</p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.doctor.title || 'N/A'}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Status</p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.doctor.is_active
                          ? dictionary.admin.activeStatus
                          : dictionary.admin.inactiveStatus}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {userDetails?.provider && (
                <>
                  <Separator />
                  <h4 className='font-medium'>
                    {dictionary.admin.tabs.providers} Profile
                  </h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Name</p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.provider.name}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>Status</p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.provider.is_verified
                          ? dictionary.admin.verifiedStatus
                          : dictionary.admin.notVerifiedStatus}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className='w-full mx-auto'>
          <AlertDialogHeader>
            <AlertDialogTitle>{dictionary.alertTitle}</AlertDialogTitle>
            <AlertDialogDescription className='flex flex-col gap-2'>
              <span>{dictionary.alertDescription}</span>
              <span className='font-bold'>{dictionary.alertDescription2}</span>
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
    </>
  );
};

// Function to create columns with dictionary for translations
export const createUserColumns = (
  dictionary: DictionaryType['Dashboard']
): ColumnDef<User>[] => [
  {
    id: 'avatar',
    header: () => <span className='sr-only'>Avatar</span>,
    cell: ({ row }) => {
      const user = row.original;
      const initials =
        user.name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase() || '';

      return (
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user.image || ''} alt={user.name || ''} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='name'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='email'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='role'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='verified'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.getValue('emailVerified') ? (
          <CheckCircle className='h-4 w-4 text-green-500' />
        ) : (
          <XCircle className='h-4 w-4 text-red-500' />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='created'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'PP'),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='actions'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => (
      <UserActions user={row.original} dictionary={dictionary} />
    ),
  },
];

// Healthcare Providers Table Columns
export const createProviderColumns = (
  dictionary: DictionaryType['Dashboard']
): ColumnDef<HealthcareProvider>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='name'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='email'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='phone'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'is_verified',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='verified'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.getValue('is_verified') ? (
          <CheckCircle className='h-4 w-4 text-green-500' />
        ) : (
          <XCircle className='h-4 w-4 text-red-500' />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='created'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => format(new Date(row.getValue('created_at')), 'PP'),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='actions'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => {
      const provider = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>{dictionary.admin.actions}</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(provider.id)}
            >
              {dictionary.admin.copyId}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{dictionary.admin.view}</DropdownMenuItem>
            <DropdownMenuItem>{dictionary.admin.verify}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Private Practitioners Table Columns
export const createPractitionerColumns = (
  dictionary: DictionaryType['Dashboard']
): ColumnDef<Doctor>[] => [
  {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='name'
        dictionary={dictionary}
      />
    ),
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='title'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='email'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='phone'
        dictionary={dictionary}
      />
    ),
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='active'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.getValue('is_active') ? (
          <CheckCircle className='h-4 w-4 text-green-500' />
        ) : (
          <XCircle className='h-4 w-4 text-red-500' />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='created'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => format(new Date(row.getValue('created_at')), 'PP'),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='actions'
        dictionary={dictionary}
      />
    ),
    cell: ({ row }) => {
      const practitioner = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>{dictionary.admin.actions}</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(practitioner.id)}
            >
              {dictionary.admin.copyId}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{dictionary.admin.view}</DropdownMenuItem>
            <DropdownMenuItem>{dictionary.admin.verify}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

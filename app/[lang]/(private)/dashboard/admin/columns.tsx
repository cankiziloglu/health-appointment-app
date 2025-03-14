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
import {
  verifyProviderAction,
  unverifyProviderAction,
  activatePractitionerAction,
  deactivatePractitionerAction,
} from '@/server/actions/adminActions';

type UserActionsProps = {
  user: User;
  dictionary: DictionaryType['Dashboard']['admin'];
};

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
      toast(dictionary.verifyGenericError, {
        description:
          error instanceof Error ? error.message : dictionary.verifyError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Make user admin
  const handleMakeAdmin = async () => {
    if (user.role === 'ADMIN') {
      toast(dictionary.makeAdminError, {
        description:
          dictionary.makeAdminErrorDesc || 'User is already an admin',
      });
      return;
    }

    try {
      const result = await makeUserAdminAction(user.id);
      if (result && 'success' in result) {
        toast(dictionary.makeAdminSuccess);
        router.refresh();
        return;
      }
      toast(dictionary.makeAdminError, {
        description: result?.error || dictionary.verifyGenericError,
      });
    } catch {
      toast(dictionary.makeAdminError, {
        description: dictionary.verifyGenericError,
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
          <DropdownMenuLabel>{dictionary.actions}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(user.id);
              toast(dictionary.idCopiedToast);
            }}
          >
            {dictionary.copyId}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={fetchUserDetails} disabled={isLoading}>
            {dictionary.view}
          </DropdownMenuItem>
          {user.role !== 'ADMIN' && (
            <DropdownMenuItem onClick={handleMakeAdmin}>
              {dictionary.makeAdmin}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className='text-destructive'
          >
            {dictionary.deleteUser}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>{dictionary.viewUserDetails}</DialogTitle>
            <DialogDescription>
              {dictionary.viewUserDetailsDesc}
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
                  <p className='text-sm font-medium capitalize'>
                    {dictionary.dataTable.columns.role}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {userDetails?.role}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium capitalize'>
                    {dictionary.dataTable.columns.verified}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {userDetails?.emailVerified
                      ? format(new Date(userDetails.emailVerified), 'PP')
                      : dictionary.notVerifiedText}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium capitalize'>
                    {dictionary.dataTable.columns.created}
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
                    {dictionary.tabs.doctors} Profile
                  </h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium capitalize'>
                        {dictionary.dataTable.columns.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {`${userDetails.doctor.first_name} ${userDetails.doctor.last_name}`}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium capitalize'>
                        {dictionary.dataTable.columns.title}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.doctor.title || 'N/A'}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium capitalize'>
                        {dictionary.dataTable.columns.active}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.doctor.is_active
                          ? dictionary.activeStatus
                          : dictionary.inactiveStatus}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {userDetails?.provider && (
                <>
                  <Separator />
                  <h4 className='font-medium'>
                    {dictionary.tabs.providers} Profile
                  </h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium capitalize'>
                        {dictionary.dataTable.columns.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.provider.name}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium capitalize'>
                        {dictionary.dataTable.columns.verified}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {userDetails.provider.is_verified
                          ? dictionary.verifiedStatus
                          : dictionary.notVerifiedStatus}
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
              <span>{dictionary.alertDescriptionUser}</span>
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
  dictionary: DictionaryType['Dashboard']['admin']
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
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='email'
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='role'
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='verified'
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
      />
    ),
    cell: ({ row }) => (
      <UserActions user={row.original} dictionary={dictionary} />
    ),
  },
];

// Healthcare Providers Table Columns
export const createProviderColumns = (
  dictionary: DictionaryType['Dashboard']['admin']
): ColumnDef<HealthcareProvider>[] => [
  {
    id: 'avatar',
    header: () => <span className='sr-only'>Avatar</span>,
    cell: ({ row }) => {
      const provider = row.original;
      const initial = provider.name?.charAt(0).toUpperCase() || '';

      return (
        <Avatar className='h-8 w-8'>
          <AvatarImage
            src={provider.logo_url || ''}
            alt={provider.name || ''}
          />
          <AvatarFallback>{initial}</AvatarFallback>
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
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='email'
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='phone'
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'is_verified',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='verified'
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
      />
    ),
    cell: ({ row }) => (
      <ProviderActions provider={row.original} dictionary={dictionary} />
    ),
  },
];

type ProviderActionsProps = {
  provider: HealthcareProvider;
  dictionary: DictionaryType['Dashboard']['admin'];
}

const ProviderActions = ({ provider, dictionary }: ProviderActionsProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const handleVerifyToggle = async () => {
    try {
      const result = provider.is_verified
        ? await unverifyProviderAction(provider.id)
        : await verifyProviderAction(provider.id);

      if (result && 'success' in result) {
        toast(
          provider.is_verified
            ? dictionary.unverifySuccess
            : dictionary.verifySuccess
        );
        router.refresh();
        return;
      }
      toast(dictionary.verifyError, {
        description: result?.error || dictionary.verifyGenericError,
      });
    } catch {
      toast(dictionary.verifyError, {
        description: dictionary.verifyGenericError,
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
          <DropdownMenuLabel>{dictionary.actions}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(provider.id);
              toast(dictionary.idCopiedToast);
            }}
          >
            {dictionary.copyId}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetails(true)}>
            {dictionary.view}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleVerifyToggle}>
            {provider.is_verified
              ? dictionary.unverify
              : dictionary.verify}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Provider Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>{dictionary.viewProviderDetails}</DialogTitle>
            <DialogDescription>
              {dictionary.viewProviderDetailsDesc}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage
                  src={provider.logo_url || ''}
                  alt={provider.name || ''}
                />
                <AvatarFallback>
                  {provider.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className='font-medium text-lg'>{provider.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  {provider.email}
                </p>
              </div>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>ID</p>
                <p className='text-sm text-muted-foreground break-all'>
                  {provider.id}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.phone}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {provider.phone}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.verified}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {provider.is_verified
                    ? dictionary.verifiedStatus
                    : dictionary.notVerifiedStatus}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.created}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {format(new Date(provider.created_at), 'PP')}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>Website</p>
                <p className='text-sm text-muted-foreground'>
                  {provider.website || '-'}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Doctors Table Columns
export const createDoctorColumns = (
  dictionary: DictionaryType['Dashboard']['admin']
): ColumnDef<Doctor>[] => [
  {
    id: 'avatar',
    header: () => <span className='sr-only'>Avatar</span>,
    cell: ({ row }) => {
      const doctor = row.original;
      const initials =
        `${doctor.first_name[0]}${doctor.last_name[0]}`.toUpperCase();

      return (
        <Avatar className='h-8 w-8'>
          <AvatarImage
            src={doctor.photo_url || ''}
            alt={`${doctor.first_name} ${doctor.last_name}`}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='name'
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='email'
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='phone'
        dictionary={dictionary.dataTable}
      />
    ),
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='active'
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
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
        dictionary={dictionary.dataTable}
      />
    ),
    cell: ({ row }) => (
      <DoctorActions doctor={row.original} dictionary={dictionary} />
    ),
  },
];

type DoctorActionsProps = {
  doctor: Doctor;
  dictionary: DictionaryType['Dashboard']['admin'];
}

const DoctorActions = ({ doctor, dictionary }: DoctorActionsProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const handleActivationToggle = async () => {
    try {
      const result = doctor.is_active
        ? await deactivatePractitionerAction(doctor.id)
        : await activatePractitionerAction(doctor.id);

      if (result && 'success' in result) {
        toast(
          doctor.is_active
            ? dictionary.deactivateSuccess
            : dictionary.activateSuccess
        );
        router.refresh();
        return;
      }
      toast(dictionary.activateError, {
        description: result?.error || dictionary.activateGenericError,
      });
    } catch {
      toast(dictionary.activateError, {
        description: dictionary.activateGenericError,
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
          <DropdownMenuLabel>{dictionary.actions}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(doctor.id);
              toast(dictionary.idCopiedToast);
            }}
          >
            {dictionary.copyId}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetails(true)}>
            {dictionary.view}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleActivationToggle}>
            {doctor.is_active
              ? dictionary.deactivate
              : dictionary.activate}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Doctor Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>{dictionary.viewDoctorDetails}</DialogTitle>
            <DialogDescription>
              {dictionary.viewDoctorDetailsDesc}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage
                  src={doctor.photo_url || ''}
                  alt={`${doctor.first_name} ${doctor.last_name}`}
                />
                <AvatarFallback>
                  {`${doctor.first_name[0]}${doctor.last_name[0]}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className='font-medium text-lg'>{`${doctor.first_name} ${doctor.last_name}`}</h3>
                <p className='text-sm text-muted-foreground'>{doctor.email}</p>
              </div>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>ID</p>
                <p className='text-sm text-muted-foreground break-all'>
                  {doctor.id}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.phone}
                </p>
                <p className='text-sm text-muted-foreground'>{doctor.phone}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.title}
                </p>
                <p className='text-sm text-muted-foreground'>{doctor.title}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.active}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {doctor.is_active
                    ? dictionary.activeStatus
                    : dictionary.inactiveStatus}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium capitalize'>
                  {dictionary.dataTable.columns.created}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {format(new Date(doctor.created_at), 'PP')}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

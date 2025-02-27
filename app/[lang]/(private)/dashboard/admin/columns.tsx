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
import { DictionaryType } from '@/lib/types';

// Function to create columns with dictionary for translations
export const createUserColumns = (dictionary: DictionaryType['Dashboard']): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='email' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='role' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='verified' dictionary={dictionary} />
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
      <DataTableColumnHeader column={column} title='created' dictionary={dictionary} />
    ),
    cell: ({ row }) => format(new Date(row.getValue('createdAt')), 'PP'),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='actions' dictionary={dictionary} />
    ),
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              {dictionary.admin.view} ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{dictionary.admin.view}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Healthcare Providers Table Columns
export const createProviderColumns = (dictionary: DictionaryType['Dashboard']): ColumnDef<HealthcareProvider>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='email' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='phone' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'is_verified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='verified' dictionary={dictionary} />
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
      <DataTableColumnHeader column={column} title='created' dictionary={dictionary} />
    ),
    cell: ({ row }) => format(new Date(row.getValue('created_at')), 'PP'),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='actions' dictionary={dictionary} />
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
              {dictionary.admin.view} ID
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
export const createPractitionerColumns = (dictionary: DictionaryType['Dashboard']): ColumnDef<Doctor>[] => [
  {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='name' dictionary={dictionary} />
    ),
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='title' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='email' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='phone' dictionary={dictionary} />
    ),
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='active' dictionary={dictionary} />
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
      <DataTableColumnHeader column={column} title='created' dictionary={dictionary} />
    ),
    cell: ({ row }) => format(new Date(row.getValue('created_at')), 'PP'),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='actions' dictionary={dictionary} />
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
              {dictionary.admin.view} ID
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

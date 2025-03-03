'use client';

import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DataTableDictionaryType } from '@/lib/types';

type DataTableColumnHeaderProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<TData, TValue>;
  title: string;
  dictionary: DataTableDictionaryType
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  dictionary,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  // Get translated column title from dictionary or use the original title as fallback
  const translatedTitle = dictionary.columns[title]

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{translatedTitle}</div>;
  }

  // This function will cycle through: asc -> desc -> none
  const cycleSorting = () => {
    const currentSorting = column.getIsSorted();
    if (!currentSorting) {
      column.toggleSorting(false); // set to asc
    } else if (currentSorting === 'asc') {
      column.toggleSorting(true); // set to desc
    } else {
      column.clearSorting(); // remove sorting
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='ghost'
        size='sm'
        className='-ml-3 h-8'
        onClick={cycleSorting}
      >
        <span className='capitalize'>{translatedTitle}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className='ml-2 h-4 w-4' />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className='ml-2 h-4 w-4' />
        ) : (
          <ChevronsUpDown className='ml-2 h-4 w-4' />
        )}
      </Button>
    </div>
  );
}

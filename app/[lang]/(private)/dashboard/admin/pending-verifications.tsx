'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  verifyProviderAction,
  activatePractitionerAction,
} from '@/server/actions/adminActions';
import { Doctor, HealthcareProvider } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ReviewDialog from './review-dialog';
import { useState } from 'react';
import { DictionaryType } from '@/lib/types';

type ReviewData = (HealthcareProvider | Doctor) & {
  photo?: string | null;
  logo?: string | null;
};

type PendingVerificationProps = {
  dictionary: DictionaryType['Dashboard'];
  unverifiedProviders: HealthcareProvider[];
  inactivePrivatePractitioners: Doctor[];
};

export default function PendingVerifications({
  dictionary,
  unverifiedProviders,
  inactivePrivatePractitioners,
}: PendingVerificationProps) {
  const router = useRouter();
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [reviewType, setReviewType] = useState<'provider' | 'practitioner'>(
    'provider'
  );
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleVerify = async (
    id: string,
    type: 'provider' | 'practitioner'
  ) => {
    try {
      const result =
        type === 'provider'
          ? await verifyProviderAction(id)
          : await activatePractitionerAction(id);

      if (result.error) {
        toast.error(
          type === 'provider'
            ? dictionary.admin.verifyError
            : dictionary.admin.activateError
        );
        return;
      }

      toast.success(
        type === 'provider'
          ? dictionary.admin.verifySuccess
          : dictionary.admin.activateSuccess
      );
      router.refresh();
    } catch {
      toast.error(dictionary.admin.verifyGenericError);
    }
  };

  const handleReview = (
    data: ReviewData,
    type: 'provider' | 'practitioner'
  ) => {
    setReviewData(data);
    setReviewType(type);
    setIsReviewOpen(true);
  };

  if (
    unverifiedProviders.length === 0 &&
    inactivePrivatePractitioners.length === 0
  ) {
    return null;
  }

  return (
    <div className='space-y-6 mb-8'>
      <div>
        <h2 className='text-xl font-semibold mb-4'>
          {dictionary.admin.pendingTitle}
        </h2>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{dictionary.admin.name}</TableHead>
                <TableHead>{dictionary.admin.type}</TableHead>
                <TableHead className='text-right w-[120px]'>
                  {dictionary.admin.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unverifiedProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className='font-medium'>{provider.name}</TableCell>
                  <TableCell>{dictionary.admin.provider}</TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-2 items-stretch sm:flex-row sm:items-center sm:justify-end'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full sm:w-auto'
                        onClick={() =>
                          handleReview(provider as ReviewData, 'provider')
                        }
                      >
                        {dictionary.admin.review}
                      </Button>
                      <Button
                        variant='default'
                        size='sm'
                        className='w-full sm:w-auto'
                        onClick={() => handleVerify(provider.id, 'provider')}
                      >
                        {dictionary.admin.verify}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {inactivePrivatePractitioners.map((practitioner) => (
                <TableRow key={practitioner.id}>
                  <TableCell className='font-medium'>
                    {`${practitioner.title} ${practitioner.first_name} ${practitioner.last_name}`}
                  </TableCell>
                  <TableCell>{dictionary.admin.practitioner}</TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-2 items-stretch sm:flex-row sm:items-center sm:justify-end'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full sm:w-auto'
                        onClick={() =>
                          handleReview(
                            practitioner as ReviewData,
                            'practitioner'
                          )
                        }
                      >
                        {dictionary.admin.review}
                      </Button>
                      <Button
                        variant='default'
                        size='sm'
                        className='w-full sm:w-auto'
                        onClick={() =>
                          handleVerify(practitioner.id, 'practitioner')
                        }
                      >
                        {dictionary.admin.verify}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        data={reviewData}
        type={reviewType}
        dictionary={dictionary}
      />
    </div>
  );
}

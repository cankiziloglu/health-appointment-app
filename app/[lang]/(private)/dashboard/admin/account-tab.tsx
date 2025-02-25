import React from 'react';
import UserDetails from '../user-details';
import ResendButton from '../resend-button';
import UserDelete from '../user-delete';
import { UserWithProfilesType, DictionaryType } from '@/lib/types';
import { Locale } from '@/i18n-config';

interface AccountTabProps {
  dictionary: DictionaryType['Dashboard'];
  user: UserWithProfilesType;
  lang: Locale['key'];
  isVerified: boolean;
}

const AccountTab = ({
  dictionary,
  user,
  lang,
  isVerified,
}: AccountTabProps) => {
  return (
    <div className='py-8 px-4 md:px-6 w-full flex flex-col justify-between gap-6'>
      <h1 className='text-2xl font-bold'>{user.name}</h1>
      {!isVerified && (
        <div className='text-destructive font-medium p-4 text-sm flex flex-col gap-2 rounded-xl border-2 border-destructive'>
          <p>{dictionary.warning}</p>
          <ResendButton
            text={dictionary.resend}
            userId={user.id}
            email={user.email}
          />
        </div>
      )}
      <div className='flex flex-col md:flex-row gap-6 w-full'>
        <UserDetails dictionary={dictionary} user={user} />
      </div>
      <UserDelete dictionary={dictionary} user={user} lang={lang} />
    </div>
  );
};

export default AccountTab;

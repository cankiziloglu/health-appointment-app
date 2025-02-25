import React from 'react';

interface AccountTabProps {
  dictionary: any;
}

const AccountTab = ({ dictionary }: AccountTabProps) => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Account Settings</h2>
      {/* Account settings content will go here */}
    </div>
  );
};

export default AccountTab;

import React from 'react';

interface UsersTabProps {
  dictionary: any;
}

const UsersTab = ({ dictionary }: UsersTabProps) => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Users</h2>
      {/* Users content will go here */}
    </div>
  );
};

export default UsersTab;

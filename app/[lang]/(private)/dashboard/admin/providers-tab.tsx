import React from 'react';

interface ProvidersTabProps {
  dictionary: any;
}

const ProvidersTab = ({ dictionary }: ProvidersTabProps) => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Healthcare Providers</h2>
      {/* Healthcare Providers content will go here */}
    </div>
  );
};

export default ProvidersTab;

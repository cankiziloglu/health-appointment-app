import React from 'react';

interface PractitionersTabProps {
  dictionary: any;
}

const PractitionersTab = ({ dictionary }: PractitionersTabProps) => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Private Practitioners</h2>
      {/* Private Practitioners content will go here */}
    </div>
  );
};

export default PractitionersTab;

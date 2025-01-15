'use client';

import React from 'react';
import Link from 'next/link';

const ErrorPage: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <html>
      <body className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-center p-10 bg-white shadow-md rounded'>
          <h1 className='text-4xl font-bold mb-4'>Oops!</h1>
          <p className='mb-4'>Sorry, an unexpected error has occurred.</p>
          <p className='mb-4 text-red-500'>
            <i>{error.message}</i>
          </p>
          <Link href='/'>
            <a className='text-blue-500 hover:underline'>Go back to Homepage</a>
          </Link>
        </div>
      </body>
    </html>
  );
};

export default ErrorPage;

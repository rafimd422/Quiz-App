import Link from 'next/link';
import React, { FC } from 'react';

interface IntroPageProps {
  user: string;
}

const IntroPage: FC<IntroPageProps> = ({ user }) => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen'>
      <p>Welcome, {user}</p>
      <Link href={'/quiz'}>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-rose-50 focus-visible:ring-1 focus-visible:ring-ring bg-gray-900 shadow hover:bg-gray-800 h-9 px-4 py-2"
        >
          Start Quiz
        </button>
      </Link>
    </div>
  );
};

export default IntroPage;

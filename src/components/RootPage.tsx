'use client';

import useAuth from '@/Hooks/useAuth';
import React, { FC } from 'react';
import WelcomeCard from './WelcomeCard';
import IntroPage from './IntroPage';

const RootPage: FC = () => {
  const { user,loading } = useAuth();

if(loading){
  return <p className='h-screen w-full flex items-center justify-center'>Loading...</p>
}

  return (
    <div>
      {user && user.displayName !== null ? (
        <IntroPage user={user.displayName} />
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
};

export default RootPage;

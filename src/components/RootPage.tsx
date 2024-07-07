'use client';

import useAuth from '@/Hooks/useAuth';
import React, { FC } from 'react';
import WelcomeCard from './WelcomeCard';
import IntroPage from './IntroPage';

const RootPage: FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {user?.displayName ? (
        <IntroPage user={user.displayName} />
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
};

export default RootPage;

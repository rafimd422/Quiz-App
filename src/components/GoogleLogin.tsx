'use client';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.config';

const GoogleLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Sign In Successful!');
      router.push('/'); 
    } catch (error) {
      toast.error('Sign In Failed!');
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleSignIn}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium text-rose-50 focus-visible:ring-1 focus-visible:ring-ring bg-gray-900 shadow hover:bg-gray-800 h-9 px-4 py-2"
      >
        {loading ? 'Signing In...' : 'Sign In with Google'}
      </button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
      <ToastContainer />
    </>
  );
};

export default GoogleLogin;

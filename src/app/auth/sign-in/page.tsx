'use client';

import { FC, useState } from 'react';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/PasswordInput';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import auth from '../../../../firebase.config';
import useAuth from '@/Hooks/useAuth';

const SignIn: FC = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();
    console.log(user);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Incorrect Password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Login Successful!');
                router.push('/'); 
            } catch (error) {
                console.error('Error signing in:', error);
                toast.error('Login Failed!');
            }
        }
    };

    return (
        <div className="text-gray-900">
            <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 px-4 bg-[#f8f4f3]">
                <div>
                    <h2 className="font-bold text-3xl cursor-none">
                        Quiz <span className="bg-gray-800 text-white px-2 rounded-md">Master</span>
                    </h2>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="py-8">
                            <center>
                                <span className="text-2xl font-semibold">Log In</span>
                            </center>
                        </div>

                        <div>
                            <EmailInput
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="mt-4">
                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <button
                                className="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-900 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center mt-4 mb-1">
                        Don't have an account?{' '}
                        <Link href={'/auth/sign-up'} className="ms-2 text-red-800 hover:text-blue-600">
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignIn;

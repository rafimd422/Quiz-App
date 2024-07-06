'use client'


import { FC, useState } from 'react';

interface EmailInputProps {
    onSubmit: (formData: { name: string; email: string; password: string }) => void;
}

const EmailInput: FC<EmailInputProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(null);
    };

    const handleBlur = () => {
        if (!email) {
            setError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is invalid');
        }
    };

    return (
        <div className="mt-4">
            <label className="block font-medium text-sm text-gray-700" htmlFor="email">
                Email
            </label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-gray-800"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default EmailInput;

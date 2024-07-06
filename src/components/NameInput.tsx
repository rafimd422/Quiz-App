'use client'

import { FC, useState } from 'react';

interface NameInputProps {
    onSubmit: (formData: { name: string; email: string; password: string }) => void;
}

const NameInput: FC<NameInputProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setError(null);
    };

    const handleBlur = () => {
        if (!name) {
            setError('Name is required');
        } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            setError('Name is invalid');
        }
    };

    return (
        <div>
            <label className="block font-medium text-sm text-gray-700" htmlFor="name">
                Name
            </label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-gray-800"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default NameInput;

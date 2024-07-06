'use client'

import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="relative">
                                        <label className="block font-medium text-sm text-gray-700" htmlFor="password">
                                Password
                            </label>
            <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={value}
                onChange={onChange}
                placeholder="Password"
                required
                autoComplete="current-password"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-gray-800"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                    type="button"
                    id="togglePassword"
                    className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;

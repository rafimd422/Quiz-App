'use client'

import { ChangeEvent, FC } from "react";


interface EmailInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: FC<EmailInputProps> = ({ value, onChange }) => {
    return (
        <div>
            <label className="block font-medium text-sm text-gray-700" htmlFor="email">
                Email
            </label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-gray-800"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default EmailInput;
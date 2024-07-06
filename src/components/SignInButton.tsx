"use client";

import React from "react";

type Props = { text: string };

const SignInButton = ({ text }: Props) => {
  return (
    <button className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-md font-bold transition-all hover:-translate-y-[2px] md:block"
    >
    {text}
    </button>
  );
};

export default SignInButton;
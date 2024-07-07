'use client';

import Link from "next/link";
import React, { useState } from "react";
import NavButton from "./NavButton";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.config";
import Modal from "./Modal";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const userAvailable: boolean = user !== null;

  const signInPage = (): void => {
    router.push('/auth/sign-in');
  };

  const handleSignOut = (): void => {
    signOut(auth)
      .then(() => {
        setShowModal(false);
        toast.success('Sign Out Successful!');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
        toast.error('Sign Out Failed!');
      });
  };

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-x-0 top-0 bg-white z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block">
            QuizMaster
          </p>
        </Link>
        <div className="flex items-center">
          <NavButton text={userAvailable ? "Log out" : "Sign In"} onClick={userAvailable ? openModal : signInPage} />
        </div>
      </div>
      <Modal show={showModal} onClose={closeModal} onConfirm={handleSignOut} />
    </div>
  );
};

export default Navbar;

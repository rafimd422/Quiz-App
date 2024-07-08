"use client";

import { updateProfile } from "firebase/auth";
import { FC, useState } from "react";
import PasswordInput from "@/components/PasswordInput";
import EmailInput from "@/components/EmailInput";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";
import auth from "../../../../firebase.config";
import "react-toastify/dist/ReactToastify.css"; 
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";

const SignUp: FC = () => {
    const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const router = useRouter();

  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);
  console.log(user);
  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};

    if (!name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      newErrors.name = "Name is invalid";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(email, password);
        if (userCredential) {
          await updateProfile(userCredential.user, { displayName: name });
          toast.success("Registration Successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          router.push("/");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Registration Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 px-4 bg-[#f8f4f3]">
        <div>
          <h2 className="font-bold text-3xl cursor-none">
            Quiz{" "}
            <span className="bg-gray-800 text-white px-2 rounded-md">
              Master
            </span>
          </h2>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Register Now</span>
              </center>
            </div>

            <div>
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-gray-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mt-4">
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                className="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-900 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                type="submit"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-4 mb-1">
            Already have an account?
            <Link
              href={"/auth/sign-in"}
              className="ms-2 text-red-800 hover:text-blue-600"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

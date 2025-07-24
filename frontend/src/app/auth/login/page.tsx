"use client";
import React, { useState, useRef, useContext } from "react";
import { motion, Variants } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { GFContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

type FormErrors = {
  [K in keyof FormData]?: string;
} & {
  general?: string;
};

const inputVariants: Variants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  blur: { scale: 1, transition: { duration: 0.2 } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
  rest: { scale: 1, transition: { duration: 0.2 } },
};

const HospitalLogin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const {login}  = useContext(GFContext);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
const userRouter = useRouter();
  

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    login(formData.email, formData.password);

    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setErrors({ general: "Invalid credentials. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-gray-900 transition-colors duration-300">
      <Head>
        <title>Login | HealthCare</title>
        <meta
          name="description"
          content="Login to the HealthCare"
        />
      </Head>


      <div className="flex flex-col items-center justify-center w-full h-screen px-4 md:px-0">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div ref={logoRef} className="flex justify-center mb-4">
              <div className="bg-white dark:bg-blue-800 p-3 rounded-full shadow-lg">
                <HeartPulse className="h-12 w-12 text-blue-600 dark:text-blue-200" />
              </div>
            </div>
            <h1
              ref={titleRef}
              className="text-4xl font-bold mb-2 text-blue-800 dark:text-blue-200 transition-colors duration-300"
            >
              HealthCare
            </h1>
            <p
              ref={subtitleRef}
              className="text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
              Sign in to access the patient management portal
            </p>
          </div>

          <motion.div
            className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl p-8 backdrop-blur-sm transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200 transition-colors duration-300"
                >
                  Email Address
                </label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  initial="blur"
                  animate="blur"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300`}
                  placeholder="you@hospital.com"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  initial="blur"
                  animate="blur"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-300`}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.general && (
                <motion.div
                  className="mb-6 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg text-sm transition-colors duration-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.general}
                </motion.div>
              )}

              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                Need an account? &nbsp;
                <Link
                  href="/auth/sign-up"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-300"
                >

                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
              © {new Date().getFullYear()} HealthCare. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;

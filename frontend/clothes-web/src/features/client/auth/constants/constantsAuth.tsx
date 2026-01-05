/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Variants } from "framer-motion";

// --- TYPES ---
export type AuthFlow = "login" | "register" | "forgot_email" | "forgot_otp" | "forgot_new_password";

export interface LoginFormState {
  email: string;
  password: string;
  name?: string;
  otp?: string;
  newPassword?: string;
}

export interface ThemeConstants {
  name: string;
  containerBg: string;
  blobEffect: string;
  formClass: string;
  headerClass: string;
  subHeaderClass: string;
  input: string;
  icon: string;
  button: string;
  link: string;
  loadingButton: string;
}

export const initialFormState: LoginFormState = {
  email: "test@shop.com", // Mock
  password: "123456",
  name: "",
  otp: "",
  newPassword: "",
};

// GÁN TYPE Variants TỪ FRAMER MOTION
export const flowVariants: Variants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};
// GÁN TYPE Variants TỪ FRAMER MOTION
export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- PASSWORD LOGIC ---
export interface StrengthResult {
  score: number;
  level: string;
  color: string;
}

export const getPasswordStrength = (password: string): StrengthResult => {
  let score = 0;
  const regex = [/.{8,}/, /[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/];

  if (!password) {
    return { score: 0, level: "Chưa nhập", color: "bg-gray-200" };
  }
  regex.forEach((rx) => {
    if (rx.test(password)) {
      score++;
    }
  });

  if (score >= 4) {
    return { score: score * 20, level: "Rất mạnh", color: "bg-green-500" };
  }
  if (score === 3) {
    return { score: score * 20, level: "Mạnh", color: "bg-green-400" };
  }
  if (score === 2) {
    return { score: score * 20, level: "Trung bình", color: "bg-yellow-400" };
  }
  return { score: score * 20, level: "Yếu", color: "bg-red-500" };
};

// --- THEME CONSTANTS (Ultimate Fashion) ---
export const CURRENT_THEME: ThemeConstants = {
  name: "Ultimate Fashion",
  containerBg: "bg-gray-900",
  blobEffect: "bg-pink-500/30, bg-indigo-500/30",
  formClass: "bg-white text-gray-900 border border-gray-100 shadow-2xl",
  headerClass: "text-gray-900",
  subHeaderClass: "text-gray-500",
  input:
    "text-gray-800 bg-gray-50 border border-gray-300 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 hover:shadow-lg",
  icon: "text-gray-400",
  button: "bg-pink-600 text-white hover:bg-pink-700 hover:shadow-pink-500/50",
  link: "text-pink-600 hover:text-pink-700 border-pink-600",
  loadingButton: "bg-gray-400",
};

// --- ICONS (SVG MOCK) ---
export const Mail = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
export const Lock = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
export const User = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 4 0 0 0-4-4H9a4 4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
export const ArrowRight = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
export const Eye = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const EyeOff = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.8 1.8 0 0 1 0-.25" />
    <path d="M13.73 13.73a3.5 3.5 0 0 0-4.96-4.96" />
    <path d="M22 12s-3 7-10 7c-.24 0-.47-.01-.7-.03" />
    <path d="m2 2 20 20" />
  </svg>
);
export const GoogleIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.99 12c0-.77-.07-1.5-.18-2.21H12v4.18h5.36c-.23 1.15-.89 2.14-1.87 2.82v2.73h3.53c2.06-1.9 3.25-4.7 3.25-8.52z"
      fill="#4285F4"
    />
    <path
      d="M12 22c3.27 0 6.02-1.08 8.03-2.91l-3.53-2.73c-.97.66-2.22 1.05-3.5 1.05-2.69 0-4.97-1.8-5.75-4.22H2.6v2.78c1.78 3.52 5.37 5.92 9.4 5.92z"
      fill="#34A853"
    />
    <path
      d="M6.25 14.28c-.16-.48-.25-.99-.25-1.5s.09-1.02.25-1.5V8.47H2.6C2.22 9.77 2 10.88 2 12s.22 2.23.6 3.53l3.65-2.78z"
      fill="#FBBC04"
    />
    <path
      d="M12 5.8c1.67 0 3.16.58 4.34 1.76l3.14-3.14C18.02 2.5 15.27 1.48 12 1.48c-4.03 0-7.62 2.4-9.4 5.92l3.65 2.78c.78-2.42 3.06-4.2 5.75-4.2z"
      fill="#EA4335"
    />
  </svg>
);
export const FacebookIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.9c0-1.92 1.16-2.96 2.83-2.96.8 0 1.63.15 1.63.15V9.7H13c-.94 0-1.24.58-1.24 1.18V12h2.21l-.35 3H12v6.8c4.56-.93 8-4.96 8-9.84z"
      fill="#1877F2"
    />
  </svg>
);

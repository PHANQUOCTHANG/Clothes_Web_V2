// File: src/components/layout/PageTemplate.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import SocialButton from "@/components/ui/SocialButton";
import {
  CURRENT_THEME,
  itemVariants,
  ArrowRight,
  GoogleIcon,
  FacebookIcon,
  ThemeConstants,
} from "@/features/client/auth/constants/constantsAuth";

interface FlowData {
  form: unknown;
  loading: boolean;
  message: string;
  isError: boolean;
  navigateToLogin?: () => void;
}

interface PageTemplateProps {
  children: React.ReactNode;
  flowData: FlowData;
  flowTitle: string;
  flowSubtitle: string;
  actionButtonText: string;
  submitHandler: (e: React.FormEvent) => void;
  isLoginFlow?: boolean;
  isRegisterFlow?: boolean;
  showBackButton?: boolean;
  handleTabChange?: () => void;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  flowData,
  flowTitle,
  flowSubtitle,
  actionButtonText,
  submitHandler,
  isLoginFlow,
  isRegisterFlow,
  showBackButton = false,
  handleTabChange,
}) => {
  const currentTheme: ThemeConstants = CURRENT_THEME;
  const isSocialAvailable = isLoginFlow || isRegisterFlow;
  const [blob1, blob2] = currentTheme.blobEffect.split(", ");

  const handleBack = () => {
    if (flowData.navigateToLogin) {
      flowData.navigateToLogin();
    }
  };

  const currentMessage = flowData.message;
  const isError = flowData.isError;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative ${currentTheme.containerBg}`}
    >
      {/* Hiệu ứng Radial Gradient */}
      {currentTheme.blobEffect !== "hidden" && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${blob1}`}
          ></div>
          <div
            className={`absolute top-3/4 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${blob2}`}
          ></div>
        </div>
      )}

      {/* Form Container */}
      <motion.div
        key="ultimate-theme-page"
        className={`w-full max-w-md p-8 md:p-10 rounded-3xl relative z-10 ${currentTheme.formClass}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Nút Back */}
        {(showBackButton || isRegisterFlow) && (
          <motion.div
            key="back-button-wrapper"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 text-left"
          >
            <button
              type="button"
              onClick={handleBack}
              className={`text-sm font-medium flex items-center ${currentTheme.subHeaderClass} hover:text-gray-900 transition`}
            >
              &larr; Quay lại
            </button>
          </motion.div>
        )}

        {/* Header Section */}
        <div
          className={`text-center mb-6 ${
            !(showBackButton || isRegisterFlow) ? "mt-6" : ""
          }`}
        >
          <motion.h1
            className={`text-4xl font-extrabold tracking-tight ${currentTheme.headerClass}`}
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {flowTitle}
          </motion.h1>
          <motion.p
            className={`mt-2 text-md ${currentTheme.subHeaderClass}`}
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {flowSubtitle}
          </motion.p>
        </div>

        {/* Tab Selector */}
        {(isLoginFlow || isRegisterFlow) && (
          <motion.div
            className="flex mb-6 p-1 bg-gray-100 rounded-xl"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              type="button"
              onClick={isRegisterFlow ? handleTabChange : undefined}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isLoginFlow
                  ? "bg-white shadow-md text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={isLoginFlow ? handleTabChange : undefined}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isRegisterFlow
                  ? "bg-white shadow-md text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Đăng Ký
            </button>
          </motion.div>
        )}

        {/* Form Content */}
        <form onSubmit={submitHandler}>
          <div className="min-h-[150px]">{children}</div>

          {/* Hộp Thông báo Cục bộ */}
          {currentMessage && (
            <motion.p
              key={`msg-page`}
              className={`text-center text-sm mt-4 p-3 rounded-xl ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentMessage}
            </motion.p>
          )}

          {/* Nút Action Chính */}
          <motion.button
            type="submit"
            disabled={flowData.loading}
            className={`w-full flex items-center justify-center mt-6 px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg transition duration-300 ease-in-out transform ${
              flowData.loading
                ? `${currentTheme.loadingButton} cursor-not-allowed`
                : `${currentTheme.button} active:scale-95`
            }`}
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {flowData.loading ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                {actionButtonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>
        </form>

        {/* Social Login Section */}
        {isSocialAvailable && (
          <motion.div
            className="mt-6 space-y-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative flex items-center">
              <div className="grow border-t border-gray-300"></div>
              <span className="shrink mx-4 text-gray-400 text-sm">
                HOẶC
              </span>
              <div className="grow border-t border-gray-300"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SocialButton
                icon={GoogleIcon}
                label="Google"
                bgColor="bg-white hover:bg-gray-100"
                textColor="text-gray-700"
                delay={0.9}
              />
              <SocialButton
                icon={FacebookIcon}
                label="Facebook"
                bgColor="bg-white hover:bg-gray-100"
                textColor="text-gray-700"
                delay={1.0}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-spin {
          border-color: currentColor !important;
          border-top-color: transparent !important;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default PageTemplate;

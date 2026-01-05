import React from "react";
import { motion } from "framer-motion";
import {
  itemVariants,
  Eye,
  EyeOff,
  ThemeConstants,
} from "@/features/client/auth/constants/constantsAuth";

interface InputFieldProps {
  icon: React.ElementType;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  delay: number;
  themeClasses: ThemeConstants;
  toggleVisibility?: () => void;
  isPasswordVisible?: boolean;
}

const InputField = ({
  icon: Icon,
  placeholder,
  type,
  name,
  value,
  onChange,
  delay,
  themeClasses,
  toggleVisibility,
  isPasswordVisible,
}: InputFieldProps) => {
  const isPasswordField = name === "password" || name === "newPassword";
  // Ép kiểu các icon mock thành React.ElementType
  const InputIcon = (isPasswordVisible ? EyeOff : Eye) as React.ElementType;

  return (
    <motion.div
      className="relative w-full"
      variants={itemVariants}
      transition={{ duration: 0.5, delay: delay }}
    >
      <div
        className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none ${themeClasses.icon}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <input
        type={isPasswordField && !isPasswordVisible ? "password" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 pl-12 text-sm rounded-xl transition duration-300 shadow-md ${
          themeClasses.input
        } ${isPasswordField ? "pr-12" : ""}`}
        required
      />

      {isPasswordField && (
        <button
          type="button"
          onClick={toggleVisibility}
          className={`absolute inset-y-0 right-0 flex items-center pr-4 transition duration-300 hover:scale-110 active:scale-95 text-gray-500 hover:text-gray-900`}
          aria-label={isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          <InputIcon className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
};

export default InputField;

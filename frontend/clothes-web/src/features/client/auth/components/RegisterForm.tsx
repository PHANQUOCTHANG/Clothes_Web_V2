// File: src/components/auth/forms/RegisterForm.tsx

import React from "react";
import { motion } from "framer-motion";
import InputField from "@/components/ui/InputField";
import PasswordStrengthMeter from "@/components/ui/PasswordStrengthMeter";

import {
  flowVariants,
  LoginFormState,
  ThemeConstants,
  User,
  Mail,
  Lock,
} from "../constants/constantsAuth";

interface RegisterFormProps {
  form: LoginFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTheme: ThemeConstants;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  form,
  handleChange,
  currentTheme,
  togglePasswordVisibility,
  showPassword,
}) => {
  return (
    <motion.div
      key="register_form"
      initial="exit"
      animate="enter"
      exit="exit"
      variants={flowVariants}
      className="space-y-6"
    >
      <InputField
        icon={User}
        placeholder="Họ và Tên"
        type="text"
        name="name"
        // Dùng || '' để đảm bảo input là controlled component
        value={form.name || ""}
        onChange={handleChange}
        delay={0.4}
        themeClasses={currentTheme}
      />
      <InputField
        icon={Mail}
        placeholder="Địa chỉ Email"
        type="email"
        name="email"
        // Dùng || '' để đảm bảo input là controlled component
        value={form.email || ""}
        onChange={handleChange}
        delay={0.5}
        themeClasses={currentTheme}
      />
      <InputField
        icon={Lock}
        placeholder="Mật khẩu"
        type="password"
        name="password"
        // Dùng || '' để đảm bảo input là controlled component
        value={form.password || ""}
        onChange={handleChange}
        delay={0.6}
        themeClasses={currentTheme}
        toggleVisibility={togglePasswordVisibility}
        isPasswordVisible={showPassword}
      />
      {/* Truyền giá trị password, đảm bảo là string rỗng nếu undefined */}
      <PasswordStrengthMeter password={form.password || ""} />
    </motion.div>
  );
};

export default RegisterForm;

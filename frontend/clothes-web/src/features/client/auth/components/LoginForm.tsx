// File: src/components/auth/forms/LoginForm.tsx

import React from "react";
import { motion } from "framer-motion";
import InputField from "@/components/ui/InputField";

import {
  flowVariants,
  itemVariants,
  LoginFormState,
  ThemeConstants,
  AuthFlow,
  Mail,
  Lock,
} from "../constants/constantsAuth";

interface LoginFormProps {
  form: LoginFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTheme: ThemeConstants;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
  handleFlowChange: (newFlow: AuthFlow) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  form,
  handleChange,
  currentTheme,
  togglePasswordVisibility,
  showPassword,
  handleFlowChange,
}) => {
  return (
    <motion.div
      key="login_form"
      initial="exit"
      animate="enter"
      exit="exit"
      variants={flowVariants}
      className="space-y-6"
    >
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

      <motion.div
        className="text-right text-sm"
        variants={itemVariants}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <button
          type="button"
          onClick={() => handleFlowChange("forgot_email")}
          className={`font-medium ${currentTheme.subHeaderClass} hover:text-gray-900 transition duration-150`}
        >
          Quên mật khẩu?
        </button>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;

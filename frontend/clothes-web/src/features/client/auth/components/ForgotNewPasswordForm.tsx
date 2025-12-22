import React from "react";
import { motion } from "framer-motion";

import InputField from "@/components/ui/InputField";
import PasswordStrengthMeter from "@/components/ui/PasswordStrengthMeter";

import {
  flowVariants,
  LoginFormState,
  ThemeConstants,
  Lock,
} from "../constants/constantsAuth";

interface ForgotNewPasswordFormProps {
  form: LoginFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTheme: ThemeConstants;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
}

const ForgotNewPasswordForm: React.FC<ForgotNewPasswordFormProps> = ({
  form,
  handleChange,
  currentTheme,
  togglePasswordVisibility,
  showPassword,
}) => (
  <motion.div
    key="forgot_new_password_form"
    initial="exit"
    animate="enter"
    exit="exit"
    variants={flowVariants}
    className="space-y-6"
  >
    <InputField
      icon={Lock}
      placeholder="Mật khẩu mới (ít nhất 6 ký tự)"
      type="password"
      name="newPassword"
      // Dùng || '' để đảm bảo input là controlled component
      value={form.newPassword || ""}
      onChange={handleChange}
      delay={0.4}
      themeClasses={currentTheme}
      toggleVisibility={togglePasswordVisibility}
      isPasswordVisible={showPassword}
    />
    {/* Truyền giá trị password, đảm bảo là string rỗng nếu undefined */}
    <PasswordStrengthMeter password={form.newPassword || ""} />
  </motion.div>
);

export default ForgotNewPasswordForm;

import React from "react";
import { motion } from "framer-motion";
import InputField from "@/components/ui/InputField";
import {
  flowVariants,
  LoginFormState,
  Mail,
  ThemeConstants,
} from "../constants/constantsAuth";

interface ForgotEmailFormProps {
  form: LoginFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTheme: ThemeConstants;
}

const ForgotEmailForm: React.FC<ForgotEmailFormProps> = ({
  form,
  handleChange,
  currentTheme,
}) => (
  <motion.div
    key="forgot_email_form"
    initial="exit"
    animate="enter"
    exit="exit"
    variants={flowVariants}
    className="space-y-6"
  >
    <InputField
      icon={Mail}
      placeholder="Nhập Email để nhận mã OTP"
      type="email"
      name="email"
      // Đảm bảo value không phải undefined
      value={form.email || ""}
      onChange={handleChange}
      delay={0.5}
      themeClasses={currentTheme}
    />
  </motion.div>
);

export default ForgotEmailForm;

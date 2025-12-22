import React from "react";
import { motion } from "framer-motion";
import InputField from "@/components/ui/InputField";

import {
  flowVariants,
  itemVariants,
  LoginFormState,
  ThemeConstants,
  Lock,
} from "../constants/constantsAuth";

interface ForgotOTPFormProps {
  form: LoginFormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTheme: ThemeConstants;
  handleSendOtp: (e: React.FormEvent) => void;
}

const ForgotOTPForm: React.FC<ForgotOTPFormProps> = ({
  form,
  handleChange,
  currentTheme,
  handleSendOtp,
}) => (
  <motion.div
    key="forgot_otp_form"
    initial="exit"
    animate="enter"
    exit="exit"
    variants={flowVariants}
    className="space-y-6"
  >
    <p className="text-sm text-center text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
      Mã OTP (123456) đã được gửi tới email: **{form.email}**
    </p>
    <InputField
      icon={Lock}
      placeholder="Mã OTP (6 chữ số)"
      type="text"
      name="otp"
      // Dùng || '' để đảm bảo input là controlled component
      value={form.otp || ""}
      onChange={handleChange}
      delay={0.4}
      themeClasses={currentTheme}
    />
    <motion.button
      type="button"
      onClick={handleSendOtp}
      className={`text-center text-sm ${currentTheme.link} border-b transition duration-150 font-medium mt-2`}
      variants={itemVariants}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      Gửi lại mã OTP
    </motion.button>
  </motion.div>
);

export default ForgotOTPForm;

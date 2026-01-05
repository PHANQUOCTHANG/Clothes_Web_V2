// File: pages/forgot-password.tsx
"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import useForgotPasswordFlow from "@/features/client/auth/hooks/useForgotPassword";
import ForgotEmailForm from "@/features/client/auth/components/ForgotEmailForm";
import ForgotOTPForm from "@/features/client/auth/components/ForgotOTPForm";
import ForgotNewPasswordForm from "@/features/client/auth/components/ForgotNewPasswordForm";
import PageTemplate from "@/features/client/auth/components/PageTemplate";
import { CURRENT_THEME } from "@/features/client/auth/constants/constantsAuth";

const ForgotPasswordPage: React.FC = () => {
  const hook = useForgotPasswordFlow();
  const currentTheme = CURRENT_THEME;
  const [showPassword, setShowPassword] = React.useState(false);

  // Logic hiển thị Form con
  const renderFormContent = () => {
    const commonProps = {
      form: hook.form,
      handleChange: hook.handleChange,
      currentTheme,
      togglePasswordVisibility: () => setShowPassword((prev) => !prev),
      showPassword: showPassword,
    };

    switch (hook.authFlow) {
      case "forgot_email":
        return <ForgotEmailForm key="forgot_email" {...commonProps} />;
      case "forgot_otp":
        return (
          <ForgotOTPForm
            key="forgot_otp"
            {...commonProps}
            handleSendOtp={hook.handleSendOtp}
          />
        );
      case "forgot_new_password":
        return (
          <ForgotNewPasswordForm key="forgot_new_password" {...commonProps} />
        );
      default:
        return null;
    }
  };

  // Logic lấy tiêu đề và action text
  let title = "Quên Mật Khẩu";
  let subtitle = "Nhập email để nhận mã OTP khôi phục.";
  let actionText = "Gửi Mã OTP";

  if (hook.authFlow === "forgot_otp") {
    title = "Xác Thực OTP";
    subtitle = "Nhập mã OTP (123456) đã được gửi tới email.";
    actionText = "Xác Thực OTP";
  } else if (hook.authFlow === "forgot_new_password") {
    title = "Đặt Lại Mật Khẩu";
    subtitle = "Tạo mật khẩu mới cho tài khoản của bạn.";
    actionText = "Đặt Lại Mật Khẩu";
  }

  return (
    <PageTemplate
      flowData={hook}
      flowTitle={title}
      flowSubtitle={subtitle}
      actionButtonText={actionText}
      submitHandler={hook.submitHandler}
      showBackButton={true}
    >
      <AnimatePresence mode="wait">{renderFormContent()}</AnimatePresence>
    </PageTemplate>
  );
};

export default ForgotPasswordPage;

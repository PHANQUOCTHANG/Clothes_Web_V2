"use client";

import React from "react";

// Hằng số và các kiểu dữ liệu
import { CURRENT_THEME } from "@/features/client/auth/constants/constantsAuth";
// Components: Form đăng nhập
import LoginForm from "@/features/client/auth/components/LoginForm";
// Components: Layout
import PageTemplate from "@/features/client/auth/components/PageTemplate";
// Hook: Xử lý logic đăng nhập
import useLogin from "@/features/client/auth/hooks/useLogin";

const LoginPage: React.FC = () => {
  // Hook: Lấy dữ liệu và hàm xử lý đăng nhập
  const hook = useLogin();
  const currentTheme = CURRENT_THEME;

  // State: Hiển thị/ẩn mật khẩu
  const [showPassword, setShowPassword] = React.useState(false);

  // Handler: Chuyển đổi flow (đăng ký, quên mật khẩu, v.v.)
  const handleFormNavigation = (
    newFlow: "login" | "register" | "forgot_email" | "forgot_otp"
  ) => {
    if (newFlow === "register") {
      hook.navigateToRegister();
    } else if (newFlow === "forgot_email") {
      hook.navigateToForgotEmail();
    }
  };

  return (
    // Template trang đăng nhập
    <PageTemplate
      flowData={hook}
      flowTitle="Đăng Nhập"
      flowSubtitle="Tiếp tục mua sắm những bộ sưu tập mới nhất."
      actionButtonText="Đăng Nhập Ngay"
      submitHandler={hook.handleLogin}
      handleTabChange={hook.navigateToRegister}
      isLoginFlow={true}
    >
      {/* Form đăng nhập */}
      <LoginForm
        form={hook.form}
        handleChange={hook.handleChange}
        currentTheme={currentTheme}
        togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
        showPassword={showPassword}
        handleFlowChange={handleFormNavigation}
      />
    </PageTemplate>
  );
};

export default LoginPage;

"use client";
import PageTemplate from "@/features/client/auth/components/PageTemplate";
import RegisterForm from "@/features/client/auth/components/RegisterForm";
import useRegister from "@/features/client/auth/hooks/useRegister";
import { CURRENT_THEME } from "@/features/client/auth/constants/constantsAuth";
import React from "react";

const RegisterPage: React.FC = () => {
  const hook = useRegister();
  const currentTheme = CURRENT_THEME;
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <PageTemplate
      flowData={hook}
      flowTitle="Đăng Ký"
      flowSubtitle="Tạo tài khoản để khám phá ưu đãi độc quyền."
      actionButtonText="Tạo Tài Khoản"
      submitHandler={hook.handleRegister}
      handleTabChange={hook.navigateToLogin} // Chuyển sang /login
      isRegisterFlow={true}
      showBackButton={true}
    >
      <RegisterForm
        form={hook.form}
        handleChange={hook.handleChange}
        currentTheme={currentTheme}
        togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
        showPassword={showPassword}
      />
    </PageTemplate>
  );
};

export default RegisterPage;

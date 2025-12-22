// File: src/hooks/useRegister.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import useAuthForm from "./useAuthForm";
import { authService } from "../services/authService";
import { getPasswordStrength } from "@/features/auth/constants/constantsAuth";
import { useRouter } from "next/navigation";

const useRegister = () => {
  const {
    form,
    handleChange,
    updateMessage,
    setAuthFlow,
    localMessage,
    isError,
  } = useAuthForm("register");
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (formData: typeof form) => authService.register(formData),

    onSuccess: (response) => {
      updateMessage(response.message || "Đăng ký thành công!", false);
      // Chuyển về trang đăng nhập
      setTimeout(() => router.push("/login"), 100);
    },
    onError: (error: Error) => {
      updateMessage(error.message, true);
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage("", false);

    if (!form.name || !form.email || !form.password) {
      updateMessage("Vui lòng điền đầy đủ thông tin.", true);
      return;
    }

    const strength = getPasswordStrength(form.password);
    if (strength.score < 60) {
      updateMessage(
        `Mật khẩu quá yếu (${strength.level}). Vui lòng chọn mật khẩu mạnh hơn.`,
        true
      );
      return;
    }

    registerMutation.mutate(form);
  };

  const navigateToLogin = () => router.push("/login");

  return {
    form,
    handleChange,
    handleRegister,
    loading: registerMutation.isPending,
    passwordStrength: getPasswordStrength(form.password),
    message: registerMutation.isIdle
      ? localMessage
      : registerMutation.error?.message || localMessage,
    isSuccess: registerMutation.isSuccess,
    isError: isError || registerMutation.isError,
    navigateToLogin,
  };
};

export default useRegister;

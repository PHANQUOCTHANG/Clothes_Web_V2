"use client";

import { useMutation } from "@tanstack/react-query";
import useAuthForm from "./useAuthForm";
import { authService } from "../services/authService";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const {
    form,
    handleChange,
    updateMessage,
    setAuthFlow,
    localMessage,
    isError,
  } = useAuthForm("login");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),

    onSuccess: (response) => {
      updateMessage(response.message || "Đăng nhập thành công!", false);
      // Chuyển hướng sau khi thành công
      setTimeout(() => router.push("/dashboard"), 100);
    },
    onError: (error: Error) => {
      updateMessage(error.message, true);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage("", false);

    if (!form.email || !form.password) {
      updateMessage("Vui lòng điền đầy đủ email và mật khẩu.", true);
      return;
    }

    // Kích hoạt React Query Mutation
    loginMutation.mutate({ email: form.email, password: form.password });
  };

  // Các hàm chuyển hướng sử dụng Next.js Router
  const navigateToRegister = () => router.push("/register");
  const navigateToForgotEmail = () => router.push("/forgot-password");

  return {
    form,
    handleChange,
    handleLogin,
    // Trạng thái từ React Query
    loading: loginMutation.isPending,
    message: loginMutation.isIdle
      ? localMessage
      : loginMutation.error?.message || localMessage,
    isSuccess: loginMutation.isSuccess,
    isError: isError || loginMutation.isError,
    navigateToRegister,
    navigateToForgotEmail,
  };
};

export default useLogin;

"use client";

import { useMutation } from "@tanstack/react-query";
import useAuthForm from "./useAuthForm";
import { authService } from "../services/authService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";
import { AuthResponse } from "../types";

const useLogin = () => {
  const { form, handleChange, updateMessage, localMessage, isError } = useAuthForm("login");
  const router = useRouter();
  const dispatch = useDispatch();

  // --- Mutation đăng nhập ---
  const loginMutation = useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      // Hiển thị thông báo thành công
      updateMessage("Đăng nhập thành công!", false);

      // Lưu accessToken + user vào Redux
      dispatch(
        setAuth({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      // Chuyển hướng về trang home
      setTimeout(() => router.push("/"), 500);
    },
    onError: (error) => {
      // Hiển thị thông báo lỗi
      updateMessage(error.message, true);
    },
  });

  // --- Handle form submit ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage("", false);

    if (!form.email || !form.password) {
      updateMessage("Vui lòng điền đầy đủ email và mật khẩu.", true);
      return;
    }

    loginMutation.mutate({ email: form.email, password: form.password });
  };

  // --- Điều hướng ---
  const navigateToRegister = () => router.push("/register");
  const navigateToForgotPassword = () => router.push("/forgot-password");

  return {
    form,
    handleChange,
    handleLogin,
    loading: loginMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    isError: isError || loginMutation.isError,
    message: loginMutation.isError ? loginMutation.error?.message : localMessage,
    navigateToRegister,
    navigateToForgotPassword,
  };
};

export default useLogin;
